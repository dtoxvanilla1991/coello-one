'use server';

import { Database } from 'bun:sqlite';
import type { ProductSummary, ProductServiceResult } from '@/types/products';

const CACHE_DB_PATH = Bun.env.PRODUCT_CACHE_DB_PATH ?? 'product-cache.sqlite';
const CACHE_TTL_MS = Number(Bun.env.PRODUCT_CACHE_TTL_MS ?? 5 * 60 * 1000);
const PRODUCT_CACHE_DEBUG = Bun.env.PRODUCT_CACHE_DEBUG === 'true';
const FLASK_API_BASE_URL = Bun.env.FLASK_API_BASE_URL ?? 'http://localhost:3500';

const CACHE_TABLE = 'product_cache';

interface CacheRow {
  cache_key: string;
  payload: string;
  updated_at: number;
}

interface FetchProductsOptions {
  category?: string;
}

interface RawProduct {
  id: number;
  name: string;
  price: number;
  [key: string]: unknown;
}

const database = new Database(CACHE_DB_PATH, { create: true, strict: true });

database.run(
  `CREATE TABLE IF NOT EXISTS ${CACHE_TABLE} (
    cache_key TEXT PRIMARY KEY,
    payload TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`
);

database.run(`CREATE INDEX IF NOT EXISTS idx_product_cache_updated_at ON ${CACHE_TABLE} (updated_at DESC)`);

const selectStatement = database.prepare<CacheRow, [string]>(
  `SELECT cache_key, payload, updated_at FROM ${CACHE_TABLE} WHERE cache_key = ?1 LIMIT 1`
);

const upsertStatement = database.prepare(
  `INSERT INTO ${CACHE_TABLE} (cache_key, payload, updated_at)
   VALUES (?1, ?2, ?3)
   ON CONFLICT(cache_key)
   DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at`
);

function buildCacheKey(options?: FetchProductsOptions): string {
  const category = options?.category ? options.category.toLowerCase() : 'all';
  return `products:${category}`;
}

function readCache(cacheKey: string): CacheRow | null {
  try {
    const result = selectStatement.get(cacheKey);
    if (!result) {
      return null;
    }

    return result as CacheRow;
  } catch (error) {
    debugLog('cache_read_error', { cacheKey, error });
    return null;
  }
}

function writeCache(cacheKey: string, payload: ProductSummary[]): void {
  const serializedPayload = JSON.stringify(payload);
  const updatedAt = Date.now();

  try {
    upsertStatement.run(cacheKey, serializedPayload, updatedAt);
  } catch (error) {
    debugLog('cache_write_error', { cacheKey, error });
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
    return JSON.parse(cacheRow.payload) as ProductSummary[];
  } catch (error) {
    debugLog('cache_parse_error', { cacheRow, error });
    return null;
  }
}

function normalizeProducts(products: RawProduct[], category?: string): ProductSummary[] {
  const categoryLabel = category ?? 'all';

  return products.map((product, index) => {
    const gender = index % 2 === 0 ? 'Women' : 'Men';
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
  return [
    {
      id: 9001,
      name: 'Coello One Classic Tee',
      price: 48,
      category: 'fallback',
      gender: 'Women',
      imageUrl: '/athletes/vertical/main-secondary-6.jpg',
    },
    {
      id: 9002,
      name: 'Coello One Training Tee',
      price: 52,
      category: 'fallback',
      gender: 'Men',
      imageUrl: '/athletes/vertical/main-secondary-7.jpg',
    },
    {
      id: 9003,
      name: 'Coello One Performance Tee',
      price: 55,
      category: 'fallback',
      gender: 'Women',
      imageUrl: '/athletes/vertical/main-secondary-8.jpg',
    },
  ];
}

function debugLog(event: string, context: Record<string, unknown>): void {
  if (!PRODUCT_CACHE_DEBUG) {
    return;
  }

  console.debug(`[productsService:${event}]`, context);
}

export async function fetchProducts(options: FetchProductsOptions = {}): Promise<ProductServiceResult> {
  const cacheKey = buildCacheKey(options);
  const cacheRow = readCache(cacheKey);
  const cachedProducts = parseCachePayload(cacheRow);
  const isCacheHit = Boolean(cacheRow && cachedProducts);
  const cacheExpired = cacheRow ? isExpired(cacheRow.updated_at) : true;

  if (isCacheHit && !cacheExpired) {
    debugLog('cache_hit', { cacheKey });

    return {
      products: cachedProducts ?? [],
      cache: {
        source: 'cache',
        updatedAt: cacheRow!.updated_at,
        stale: false,
        hit: true,
      },
    };
  }

  const requestUrl = new URL('/api/products', FLASK_API_BASE_URL);

  if (options.category) {
    requestUrl.searchParams.set('category', options.category);
  }

  try {
    const response = await fetch(requestUrl.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Flask API responded with status ${response.status}`);
    }

    const rawProducts = (await response.json()) as RawProduct[];
    const normalized = normalizeProducts(rawProducts, options.category);

    writeCache(cacheKey, normalized);

    debugLog('network_fetch', { cacheKey, count: normalized.length });

    return {
      products: normalized,
      cache: {
        source: 'network',
        updatedAt: Date.now(),
        stale: false,
        hit: isCacheHit,
      },
    };
  } catch (error) {
    debugLog('network_error', { cacheKey, error });

    if (isCacheHit && cachedProducts) {
      return {
        products: cachedProducts,
        cache: {
          source: 'cache',
          updatedAt: cacheRow!.updated_at,
          stale: true,
          hit: true,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }

    return {
      products: fallbackProducts(),
      cache: {
        source: 'fallback',
        updatedAt: Date.now(),
        stale: true,
        hit: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}
