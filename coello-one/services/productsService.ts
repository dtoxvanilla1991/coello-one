'use server';

import { SQL, sql } from "bun";
import {
  flaskProductListSchema,
  type FlaskProductList,
  productSummarySchema,
  type ProductSummary,
  type ProductServiceResult,
} from '@/types/products';
import { trackEvent } from '@/utils/trackEvent';

const CACHE_DB_PATH = Bun.env.PRODUCT_CACHE_DB_PATH ?? ":memory:";
const CACHE_TTL_MS = Number(Bun.env.PRODUCT_CACHE_TTL_MS ?? 5 * 60 * 1000);
const PRODUCT_CACHE_DEBUG = Bun.env.PRODUCT_CACHE_DEBUG === 'true';
const FLASK_API_BASE_URL = Bun.env.FLASK_API_BASE_URL ?? 'http://localhost:3500';

const CACHE_TABLE = 'product_cache';
const productSummaryListSchema = productSummarySchema.array();

let cacheHitCount = 0;
let cacheMissCount = 0;
let cacheFallbackCount = 0;
let isPrimingCache = false;

const cacheWarmupCategories = ['all', 'popular'] as const;

interface CacheRow {
  cache_key: string;
  payload: string;
  updated_at: number;
}

interface FetchProductsOptions {
  category?: string;
}

const cacheDb = (() => {
  const normalizedPath = CACHE_DB_PATH.trim();
  const isUri = normalizedPath.startsWith("sqlite://") || normalizedPath.startsWith("file://");

  if (normalizedPath === ":memory:" || isUri) {
    return new SQL(normalizedPath);
  }

  return new SQL({
    adapter: "sqlite",
    filename: normalizedPath,
    create: true,
    readwrite: true,
    strict: true,
  });
})();

const cacheSetupPromise = (async () => {
  try {
    await cacheDb`PRAGMA strict = ON`;

    await cacheDb`
      CREATE TABLE IF NOT EXISTS ${sql(CACHE_TABLE)} (
        cache_key TEXT PRIMARY KEY,
        payload TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `;

    await cacheDb`
      CREATE INDEX IF NOT EXISTS idx_product_cache_updated_at
      ON ${sql(CACHE_TABLE)} (updated_at DESC)
    `;
  } catch (error) {
    debugLog("cache_setup_error", { error });
  }
})();

function buildCacheKey(options?: FetchProductsOptions): string {
  const category = options?.category ? options.category.toLowerCase() : "all";
  return `products:${category}`;
}

async function readCache(cacheKey: string): Promise<CacheRow | null> {
  await cacheSetupPromise;
  try {
    const [result] = await cacheDb`
      SELECT cache_key, payload, updated_at
      FROM ${sql(CACHE_TABLE)}
      WHERE cache_key = ${cacheKey}
      LIMIT 1
    `;

    if (!result) {
      return null;
    }

    return result as CacheRow;
  } catch (error) {
    debugLog("cache_read_error", { cacheKey, error });
    return null;
  }
}

async function writeCache(cacheKey: string, payload: ProductSummary[]): Promise<void> {
  await cacheSetupPromise;
  const parsedPayload = productSummaryListSchema.safeParse(payload);

  if (!parsedPayload.success) {
    debugLog("cache_write_validation_error", { cacheKey, issues: parsedPayload.error.issues });
    return;
  }

  const serializedPayload = JSON.stringify(parsedPayload.data);
  const updatedAt = Date.now();

  try {
    await cacheDb`
      INSERT INTO ${sql(CACHE_TABLE)} (cache_key, payload, updated_at)
      VALUES (${cacheKey}, ${serializedPayload}, ${updatedAt})
      ON CONFLICT(cache_key)
      DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at
    `;
  } catch (error) {
    debugLog("cache_write_error", { cacheKey, error });
  }
}

function isExpired(updatedAt: number): boolean {
  return Date.now() - updatedAt > CACHE_TTL_MS;
}

function parseCachePayload(cacheRow: CacheRow | null): ProductSummary[] | null {
  if (!cacheRow) {
    return null;
  }

  try {
    const rawPayload = JSON.parse(cacheRow.payload);
    const parsedPayload = productSummaryListSchema.safeParse(rawPayload);

    if (!parsedPayload.success) {
      debugLog("cache_validation_error", { cacheRow, issues: parsedPayload.error.issues });
      return null;
    }

    return parsedPayload.data;
  } catch (error) {
    debugLog("cache_parse_error", { cacheRow, error });
    return null;
  }
}

function normalizeProducts(products: FlaskProductList, category?: string): ProductSummary[] {
  const categoryLabel = category ?? "all";

  return products.map((product, index) => {
    const gender = index % 2 === 0 ? "Women" : "Men";
    const imageIndex = (index % 8) + 1;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: categoryLabel,
      gender,
      imageUrl: `/athletes/vertical/main-secondary-${imageIndex}.jpg`,
    } as ProductSummary;
  });
}

function fallbackProducts(): ProductSummary[] {
  const fallback = [
    {
      id: 9001,
      name: "Coello One Classic Tee",
      price: 48,
      category: "fallback",
      gender: "Women",
      imageUrl: "/athletes/vertical/main-secondary-6.jpg",
    },
    {
      id: 9002,
      name: "Coello One Training Tee",
      price: 52,
      category: "fallback",
      gender: "Men",
      imageUrl: "/athletes/vertical/main-secondary-7.jpg",
    },
    {
      id: 9003,
      name: "Coello One Performance Tee",
      price: 55,
      category: "fallback",
      gender: "Women",
      imageUrl: "/athletes/vertical/main-secondary-8.jpg",
    },
  ];

  const parsedFallback = productSummaryListSchema.safeParse(fallback);

  if (!parsedFallback.success) {
    debugLog("fallback_validation_error", { issues: parsedFallback.error.issues });
    throw new Error("Fallback products failed validation");
  }

  return parsedFallback.data;
}

function debugLog(event: string, context: Record<string, unknown>): void {
  if (!PRODUCT_CACHE_DEBUG) {
    return;
  }

  console.debug(`[productsService:${event}]`, context);
}

function emitCacheAnalytics(
  event: "product_cache_hit" | "product_cache_miss" | "product_cache_fallback",
  payload: Record<string, unknown>,
): void {
  if (Bun.env.NODE_ENV === "test") {
    return;
  }

  trackEvent(event, payload);
}

type FetchProductsInternalOptions = {
  skipAnalytics?: boolean;
};

export async function fetchProducts(
  options: FetchProductsOptions = {},
  internalOptions: FetchProductsInternalOptions = {},
): Promise<ProductServiceResult> {
  const { skipAnalytics = false } = internalOptions;
  const category = options.category ?? "all";
  const cacheKey = buildCacheKey(options);
  const cacheRow = await readCache(cacheKey);
  const cachedProducts = parseCachePayload(cacheRow);
  const isCacheHit = Boolean(cacheRow && cachedProducts);
  const cacheExpired = cacheRow ? isExpired(cacheRow.updated_at) : true;
  const analyticsContext = {
    cacheKey,
    category,
  } as const;

  if (isCacheHit && !cacheExpired) {
    debugLog("cache_hit", { cacheKey });

    cacheHitCount += 1;
    const analyticsPayload = {
      ...analyticsContext,
      stale: false,
      hitCount: cacheHitCount,
      missCount: cacheMissCount,
      fallbackCount: cacheFallbackCount,
    };
    if (!skipAnalytics) {
      emitCacheAnalytics("product_cache_hit", analyticsPayload);
    }

    return {
      products: cachedProducts ?? [],
      cache: {
        source: "cache",
        updatedAt: cacheRow!.updated_at,
        stale: false,
        hit: true,
        debug: analyticsPayload,
      },
    };
  }

  const requestUrl = new URL("/api/products", FLASK_API_BASE_URL);

  if (options.category) {
    requestUrl.searchParams.set("category", options.category);
  }

  try {
    const response = await fetch(requestUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Flask API responded with status ${response.status}`);
    }

    const jsonPayload = await response.json();
    const networkProducts = flaskProductListSchema.parse(jsonPayload);
    const normalized = normalizeProducts(networkProducts, options.category);
    const validProducts = productSummaryListSchema.parse(normalized);

    await writeCache(cacheKey, validProducts);

    debugLog("network_fetch", { cacheKey, count: validProducts.length });

    cacheMissCount += 1;
    const analyticsPayload = {
      ...analyticsContext,
      stale: false,
      hitCount: cacheHitCount,
      missCount: cacheMissCount,
      fallbackCount: cacheFallbackCount,
    };
    if (!skipAnalytics) {
      emitCacheAnalytics("product_cache_miss", analyticsPayload);
    }

    return {
      products: validProducts,
      cache: {
        source: "network",
        updatedAt: Date.now(),
        stale: false,
        hit: isCacheHit,
        debug: analyticsPayload,
      },
    };
  } catch (error) {
    debugLog("network_error", { cacheKey, error });

    if (isCacheHit && cachedProducts) {
      cacheHitCount += 1;
      const analyticsPayload = {
        ...analyticsContext,
        stale: true,
        hitCount: cacheHitCount,
        missCount: cacheMissCount,
        fallbackCount: cacheFallbackCount,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      };
      if (!skipAnalytics) {
        emitCacheAnalytics("product_cache_hit", analyticsPayload);
      }

      return {
        products: cachedProducts,
        cache: {
          source: "cache",
          updatedAt: cacheRow!.updated_at,
          stale: true,
          hit: true,
          errorMessage: error instanceof Error ? error.message : "Unknown error",
          debug: analyticsPayload,
        },
      };
    }

    const fallback = fallbackProducts();

    cacheFallbackCount += 1;
    const analyticsPayload = {
      ...analyticsContext,
      stale: true,
      hitCount: cacheHitCount,
      missCount: cacheMissCount,
      fallbackCount: cacheFallbackCount,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    };
    if (!skipAnalytics) {
      emitCacheAnalytics("product_cache_fallback", analyticsPayload);
    }

    return {
      products: fallback,
      cache: {
        source: "fallback",
        updatedAt: Date.now(),
        stale: true,
        hit: false,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        debug: analyticsPayload,
      },
    };
  }
}

export async function primeProductCache(): Promise<void> {
  if (isPrimingCache) {
    return;
  }

  isPrimingCache = true;

  await Promise.allSettled(
    cacheWarmupCategories.map((category) =>
      fetchProducts({ category }, { skipAnalytics: true })
        .then((result) => {
          debugLog('warmup_success', {
            category,
            cacheSource: result.cache.source,
            count: result.products.length,
          });
        })
        .catch((error) => {
          debugLog('warmup_error', { category, error });
        }),
    ),
  );

  isPrimingCache = false;
}

const shouldPrimeCache = Bun.env.PRODUCT_CACHE_WARMUP !== 'false' && Bun.env.NODE_ENV !== 'test';

if (shouldPrimeCache) {
  void primeProductCache();
}
