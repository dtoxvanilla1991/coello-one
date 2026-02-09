"use server";

import { cacheLife, cacheTag } from "next/cache";
import { SQL, sql } from "bun";
import { db } from "@config/db";
import {
  productSummarySchema,
  type ProductSummary,
  type ProductServiceResult,
  type ProductGender,
} from "@/types/products";
import { trackEvent } from "@/utils/trackEvent";
import { createPopularFallbackProducts } from "@/[locale]/(infrastructure)/home/popularCuratedData";

const IS_DEV = Bun.env.NODE_ENV === "development";
// Prevent dev HMR loops from disk cache writes by using in-memory storage.
const CACHE_DB_PATH = IS_DEV ? ":memory:" : (Bun.env.PRODUCT_CACHE_DB_PATH ?? ":memory:");
const CACHE_TTL_MS = Number(Bun.env.PRODUCT_CACHE_TTL_MS ?? 5 * 60 * 1000);
const IS_NEXT_RUNTIME = typeof process !== "undefined" && Boolean(process.env.NEXT_RUNTIME);
const CACHE_LIFE_SECONDS = Math.max(5, Math.floor(CACHE_TTL_MS / 1000));
const CACHE_STALE_SECONDS = Math.max(5, Math.floor(CACHE_LIFE_SECONDS * 0.2));
const CACHE_EXPIRE_SECONDS = Math.max(CACHE_LIFE_SECONDS, CACHE_LIFE_SECONDS * 6);
const PRODUCT_CACHE_DEBUG = Bun.env.PRODUCT_CACHE_DEBUG === "true";

const CACHE_TABLE = "product_cache";
const productSummaryListSchema = productSummarySchema.array();

let cacheHitCount = 0;
let cacheMissCount = 0;
let cacheFallbackCount = 0;
let isPrimingCache = false;

const cacheWarmupCategories = ["all", "popular"] as const;
const MIN_POPULAR_RESULTS = 3;
const ANALYTICS_DISABLED = Bun.env.NODE_ENV === "test";

const POPULAR_FALLBACK_CACHE_SUFFIX = ":popular:fallback";
async function ensurePopularFallback(
  cacheKey: string,
  persistPrimary = false,
): Promise<{ products: ProductSummary[]; updatedAt: number }> {
  const fallbackKey = `${cacheKey}${POPULAR_FALLBACK_CACHE_SUFFIX}`;
  const fallbackRow = await readCache(fallbackKey);
  const cachedFallback = parseCachePayload(fallbackRow);

  if (fallbackRow && cachedFallback && !isExpired(fallbackRow.updated_at)) {
    if (persistPrimary) {
      await writeCache(cacheKey, cachedFallback);
    }
    return { products: cachedFallback, updatedAt: fallbackRow.updated_at };
  }

  const fallbackProducts = createPopularFallbackProducts();
  await writeCache(fallbackKey, fallbackProducts);
  if (persistPrimary) {
    await writeCache(cacheKey, fallbackProducts);
  }
  const refreshedRow = await readCache(fallbackKey);

  return {
    products: fallbackProducts,
    updatedAt: refreshedRow?.updated_at ?? Date.now(),
  };
}

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

const PRODUCT_IMAGE_FALLBACKS = [
  "/athletes/vertical/main-secondary-5.jpg",
  "/athletes/vertical/main-secondary-6.jpg",
  "/athletes/vertical/main-secondary-7.jpg",
  "/athletes/vertical/main-secondary-8.jpg",
  "/athletes/vertical/main-secondary-9.jpg",
  "/athletes/vertical/main-secondary-10.jpg",
  "/athletes/vertical/main-secondary-11.jpg",
  "/athletes/vertical/main-secondary-12.jpg",
] as const;

type ProductSummaryRow = {
  id: number;
  public_id: number | null;
  slug: string;
  name: string;
  price_minor: number;
  currency_code: string;
  category: string;
  default_gender: string | null;
  hero_image: string | null;
};

function resolveProductGender(rawGender: string | null): ProductGender | undefined {
  if (!rawGender) {
    return undefined;
  }

  switch (rawGender.toLowerCase()) {
    case "male":
      return "Men";
    case "female":
      return "Women";
    case "unisex":
      return "Unisex";
    default:
      return undefined;
  }
}

function mapRowToSummary(row: ProductSummaryRow, index: number): ProductSummary {
  const priceMinor = row.price_minor;
  const resolvedPrice = Number((priceMinor ?? 0) / 100);
  const fallbackImage = PRODUCT_IMAGE_FALLBACKS[index % PRODUCT_IMAGE_FALLBACKS.length];

  return productSummarySchema.parse({
    id: row.public_id ?? row.id,
    slug: row.slug,
    name: row.name,
    price: resolvedPrice,
    priceMinor,
    currencyCode: row.currency_code,
    category: row.category,
    gender: resolveProductGender(row.default_gender),
    imageUrl: row.hero_image ?? fallbackImage,
  });
}

function countProductLinks(products: ProductSummary[]): { variant: number; accessory: number } {
  return products.reduce(
    (acc, product) => {
      if (product.link?.type === "variant") {
        acc.variant += 1;
      }
      if (product.link?.type === "accessory") {
        acc.accessory += 1;
      }
      return acc;
    },
    { variant: 0, accessory: 0 },
  );
}

async function fetchProductsFromDatabase(category?: string): Promise<ProductSummary[]> {
  let rows: ProductSummaryRow[];

  if (category) {
    rows = (await db`
      SELECT
        id,
        public_id,
        slug,
        name,
        price_minor,
        currency_code,
        category,
        default_gender,
        hero_image
      FROM products
      WHERE category = ${category}
      ORDER BY include_in_popular_feed DESC, id ASC
    `) as ProductSummaryRow[];
  } else {
    rows = (await db`
      SELECT
        id,
        public_id,
        slug,
        name,
        price_minor,
        currency_code,
        category,
        default_gender,
        hero_image
      FROM products
      ORDER BY include_in_popular_feed DESC, id ASC
    `) as ProductSummaryRow[];
  }

  return rows.map(mapRowToSummary);
}

type PopularVariantRow = {
  slug: string;
  product_name: string;
  price_minor: number;
  currency_code: string;
  category: string;
  hero_image: string | null;
  variant_gender: string;
  color_public_id: number;
  color_name: string;
  color_image_url: string | null;
  popular_rank: number | null;
};

type PopularAccessoryRow = {
  id: number;
  public_id: number | null;
  slug: string;
  name: string;
  price_minor: number;
  currency_code: string;
  category: string;
  hero_image: string | null;
  default_gender: string | null;
};

async function fetchPopularProductsFromDatabase(): Promise<ProductSummary[]> {
  const variantRows = (await db`
    SELECT
      p.slug,
      p.name AS product_name,
      p.price_minor,
      p.currency_code,
      p.category,
      p.hero_image,
      pv.variant_gender,
      vc.public_id AS color_public_id,
      vc.color_name,
      vc.image_url AS color_image_url,
      vc.popular_rank
    FROM products p
    INNER JOIN product_variants pv ON pv.product_id = p.id
    INNER JOIN variant_colors vc ON vc.variant_id = pv.id
    WHERE p.include_in_popular_feed = 1
      AND p.product_type = 'apparel'
      AND vc.is_popular_pick = 1
    ORDER BY pv.variant_gender ASC, vc.popular_rank ASC, vc.public_id ASC
  `) as PopularVariantRow[];

  const seenVariants = new Set<string>();
  const variantSummaries: ProductSummary[] = [];

  variantRows.forEach((row, index) => {
    const genderKey = row.variant_gender.toLowerCase();
    if (seenVariants.has(genderKey)) {
      return;
    }
    seenVariants.add(genderKey);

    const genderLabel: ProductGender =
      genderKey === "female" ? "Women" : genderKey === "male" ? "Men" : "Unisex";
    const linkGender = genderKey === "female" ? "female" : "male";
    const fallbackImage =
      row.color_image_url ??
      row.hero_image ??
      PRODUCT_IMAGE_FALLBACKS[index % PRODUCT_IMAGE_FALLBACKS.length];

    variantSummaries.push(
      productSummarySchema.parse({
        id: row.color_public_id,
        slug: row.slug,
        name: `${row.product_name} – ${row.color_name}`,
        price: row.price_minor / 100,
        priceMinor: row.price_minor,
        currencyCode: row.currency_code,
        category: row.category,
        gender: genderLabel,
        imageUrl: fallbackImage,
        link: {
          type: "variant",
          gender: linkGender,
          color: row.color_name,
        },
      }),
    );
  });

  const accessoryRows = (await db`
    SELECT
      id,
      public_id,
      slug,
      name,
      price_minor,
      currency_code,
      category,
      hero_image,
      default_gender
    FROM products
    WHERE include_in_popular_feed = 1
      AND product_type = 'accessory'
    ORDER BY id ASC
  `) as PopularAccessoryRow[];

  const accessorySummaries = accessoryRows.map((row, index) => {
    const fallbackImage =
      row.hero_image ?? PRODUCT_IMAGE_FALLBACKS[index % PRODUCT_IMAGE_FALLBACKS.length];
    return productSummarySchema.parse({
      id: row.public_id ?? row.id,
      slug: row.slug,
      name: row.name,
      price: row.price_minor / 100,
      priceMinor: row.price_minor,
      currencyCode: row.currency_code,
      category: row.category,
      gender: resolveProductGender(row.default_gender) ?? "Unisex",
      imageUrl: fallbackImage,
      link: {
        type: "accessory",
      },
    });
  });

  const databaseMix = [...variantSummaries, ...accessorySummaries];

  emitPopularMixSnapshot({
    source: "database",
    curatedFallback: false,
    variantCount: variantSummaries.length,
    accessoryCount: accessorySummaries.length,
    totalCount: databaseMix.length,
    dbVariantRows: variantRows.length,
    dbAccessoryRows: accessoryRows.length,
    reason: databaseMix.length < MIN_POPULAR_RESULTS ? "below_threshold" : undefined,
  });

  return databaseMix;
}

type PrimarySourceResult = {
  products: ProductSummary[];
  source: "database" | "curated";
};

async function loadProductsFromPrimarySource(category: string): Promise<PrimarySourceResult> {
  if (category === "popular") {
    const popularProducts = await fetchPopularProductsFromDatabase();

    if (popularProducts.length >= MIN_POPULAR_RESULTS) {
      return {
        products: popularProducts,
        source: "database",
      } as const;
    }

    emitPopularFallbackEvent({
      category,
      reason: "insufficient_db_rows",
      dbCount: popularProducts.length,
      minRequired: MIN_POPULAR_RESULTS,
    });

    const curatedProducts = createPopularFallbackProducts();
    const curatedCounts = countProductLinks(curatedProducts);
    const dbCounts = countProductLinks(popularProducts);

    emitPopularMixSnapshot({
      source: "curated",
      curatedFallback: true,
      variantCount: curatedCounts.variant,
      accessoryCount: curatedCounts.accessory,
      totalCount: curatedProducts.length,
      dbVariantRows: dbCounts.variant,
      dbAccessoryRows: dbCounts.accessory,
      reason: "curated_fallback",
    });

    return {
      products: curatedProducts,
      source: "curated",
    } as const;
  }

  const normalizedCategory = category === "all" ? undefined : category;
  const databaseProducts = await fetchProductsFromDatabase(normalizedCategory);

  return {
    products: databaseProducts,
    source: "database",
  } as const;
}

function fallbackProducts(): ProductSummary[] {
  const fallback = [
    {
      id: 9001,
      slug: "fallback-classic",
      name: "Coello One Classic Tee",
      price: 48,
      priceMinor: 4800,
      currencyCode: "GBP",
      category: "fallback",
      gender: "Women",
      imageUrl: "/athletes/vertical/main-secondary-6.jpg",
    },
    {
      id: 9002,
      slug: "fallback-training",
      name: "Coello One Training Tee",
      price: 52,
      priceMinor: 5200,
      currencyCode: "GBP",
      category: "fallback",
      gender: "Men",
      imageUrl: "/athletes/vertical/main-secondary-7.jpg",
    },
    {
      id: 9003,
      slug: "fallback-performance",
      name: "Coello One Performance Tee",
      price: 55,
      priceMinor: 5500,
      currencyCode: "GBP",
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

function configureNextCacheControls(category: string): void {
  if (!IS_NEXT_RUNTIME) {
    return;
  }

  try {
    cacheLife({
      stale: CACHE_STALE_SECONDS,
      revalidate: CACHE_LIFE_SECONDS,
      expire: CACHE_EXPIRE_SECONDS,
    });

    cacheTag("products");
    cacheTag("products", `category:${category}`);
  } catch (error) {
    debugLog("next_cache_configuration_error", { category, error });
  }
}

function emitCacheAnalytics(
  event: "product_cache_hit" | "product_cache_miss" | "product_cache_fallback",
  payload: Record<string, unknown>,
): void {
  if (ANALYTICS_DISABLED) {
    return;
  }

  trackEvent(event, payload);
}

type PopularMixSnapshotPayload = {
  source: "database" | "curated" | "fallback";
  curatedFallback: boolean;
  variantCount: number;
  accessoryCount: number;
  totalCount: number;
  dbVariantRows: number;
  dbAccessoryRows: number;
  reason?: string;
};

type PopularFallbackPayload = {
  category: string;
  reason: "insufficient_db_rows" | "error";
  dbCount: number;
  minRequired: number;
};

function emitPopularMixSnapshot(payload: PopularMixSnapshotPayload): void {
  if (ANALYTICS_DISABLED) {
    return;
  }

  trackEvent("popular_feed_mix_snapshot", payload);
}

function emitPopularFallbackEvent(payload: PopularFallbackPayload): void {
  if (ANALYTICS_DISABLED) {
    return;
  }

  trackEvent("popular_feed_fallback", payload);
}

type FetchProductsInternalOptions = {
  skipAnalytics?: boolean;
};

type FetchProductsRuntimeOptions = {
  enableNextCacheDirectives: boolean;
};

async function runFetchProducts(
  options: FetchProductsOptions = {},
  internalOptions: FetchProductsInternalOptions = {},
  runtimeOptions: FetchProductsRuntimeOptions,
): Promise<ProductServiceResult> {
  const { skipAnalytics = false } = internalOptions;
  const category = (options.category ?? "all").toLowerCase();

  if (runtimeOptions.enableNextCacheDirectives) {
    configureNextCacheControls(category);
  }

  const cacheKey = buildCacheKey({ category });
  const cacheRow = await readCache(cacheKey);
  const cachedProducts = parseCachePayload(cacheRow);
  const isCacheHit = Boolean(cacheRow && cachedProducts);
  const cacheExpired = cacheRow ? isExpired(cacheRow.updated_at) : true;
  const analyticsContext = {
    cacheKey,
    category,
  } as const;

  if (isCacheHit && !cacheExpired) {
    const productsFromCache = cachedProducts ?? [];

    debugLog("cache_hit", { cacheKey });

    cacheHitCount += 1;
    const analyticsPayload = {
      ...analyticsContext,
      stale: false,
      hitCount: cacheHitCount,
      missCount: cacheMissCount,
      fallbackCount: cacheFallbackCount,
      cacheSource: "cache",
      productCount: productsFromCache.length,
      cacheUpdatedAt: cacheRow!.updated_at,
    } as const;
    if (!skipAnalytics) {
      emitCacheAnalytics("product_cache_hit", analyticsPayload);
    }

    return {
      products: productsFromCache,
      cache: {
        source: "cache",
        updatedAt: cacheRow!.updated_at,
        stale: false,
        hit: true,
        debug: analyticsPayload,
      },
    };
  }

  try {
    const primaryResult = await loadProductsFromPrimarySource(category);
    const validProducts = productSummaryListSchema.parse(primaryResult.products);

    await writeCache(cacheKey, validProducts);

    debugLog("primary_fetch", {
      cacheKey,
      count: validProducts.length,
      source: primaryResult.source,
    });

    cacheMissCount += 1;
    const analyticsPayload = {
      ...analyticsContext,
      stale: false,
      hitCount: cacheHitCount,
      missCount: cacheMissCount,
      fallbackCount: cacheFallbackCount,
      cacheSource: primaryResult.source,
      productCount: validProducts.length,
      cacheUpdatedAt: Date.now(),
    };
    if (!skipAnalytics) {
      emitCacheAnalytics("product_cache_miss", analyticsPayload);
    }

    return {
      products: validProducts,
      cache: {
        source: primaryResult.source,
        updatedAt: Date.now(),
        stale: false,
        hit: false,
        debug: analyticsPayload,
      },
    };
  } catch (error) {
    debugLog("primary_error", { cacheKey, error });

    if (isCacheHit && cachedProducts) {
      cacheHitCount += 1;
      const analyticsPayload = {
        ...analyticsContext,
        stale: true,
        hitCount: cacheHitCount,
        missCount: cacheMissCount,
        fallbackCount: cacheFallbackCount,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        cacheSource: "cache",
        productCount: cachedProducts.length,
        cacheUpdatedAt: cacheRow!.updated_at,
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

    if (category === "popular") {
      emitPopularFallbackEvent({
        category,
        reason: "error",
        dbCount: 0,
        minRequired: MIN_POPULAR_RESULTS,
      });

      const fallbackResult = await ensurePopularFallback(cacheKey, true);
      const fallbackCounts = countProductLinks(fallbackResult.products);

      emitPopularMixSnapshot({
        source: "fallback",
        curatedFallback: true,
        variantCount: fallbackCounts.variant,
        accessoryCount: fallbackCounts.accessory,
        totalCount: fallbackResult.products.length,
        dbVariantRows: 0,
        dbAccessoryRows: 0,
        reason: "popular_primary_error",
      });

      cacheFallbackCount += 1;
      const analyticsPayload = {
        ...analyticsContext,
        stale: true,
        hitCount: cacheHitCount,
        missCount: cacheMissCount,
        fallbackCount: cacheFallbackCount,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        reason: "popular_fallback",
        cacheSource: "fallback",
        productCount: fallbackResult.products.length,
        cacheUpdatedAt: fallbackResult.updatedAt,
      };
      if (!skipAnalytics) {
        emitCacheAnalytics("product_cache_fallback", analyticsPayload);
      }

      return {
        products: fallbackResult.products,
        cache: {
          source: "fallback",
          updatedAt: fallbackResult.updatedAt,
          stale: true,
          hit: false,
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
      cacheSource: "fallback",
      productCount: fallback.length,
      cacheUpdatedAt: Date.now(),
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

export async function fetchProducts(
  options: FetchProductsOptions = {},
  internalOptions: FetchProductsInternalOptions = {},
): Promise<ProductServiceResult> {
  "use cache";
  return runFetchProducts(options, internalOptions, { enableNextCacheDirectives: true });
}

async function fetchProductsWithoutNextCache(
  options: FetchProductsOptions = {},
  internalOptions: FetchProductsInternalOptions = {},
) {
  return runFetchProducts(options, internalOptions, { enableNextCacheDirectives: false });
}

export async function primeProductCache(): Promise<void> {
  if (isPrimingCache) {
    return;
  }

  isPrimingCache = true;

  await Promise.allSettled(
    cacheWarmupCategories.map((category) =>
      fetchProductsWithoutNextCache({ category }, { skipAnalytics: true })
        .then((result) => {
          debugLog("warmup_success", {
            category,
            cacheSource: result.cache.source,
            count: result.products.length,
          });
        })
        .catch((error) => {
          debugLog("warmup_error", { category, error });
        }),
    ),
  );

  isPrimingCache = false;
}

const shouldPrimeCache = Bun.env.PRODUCT_CACHE_WARMUP !== "false" && Bun.env.NODE_ENV !== "test";

if (shouldPrimeCache) {
  void primeProductCache();
}
