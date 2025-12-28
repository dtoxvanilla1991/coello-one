import { beforeEach, describe, expect, it, mock } from "bun:test";
import { createPopularFallbackProducts } from "@/[locale]/(infrastructure)/home/popularCuratedData";

const variantRows: MockVariantRow[] = [];
const accessoryRows: MockAccessoryRow[] = [];

// Disable cache persistence between tests so each scenario hits the primary source logic.
process.env.PRODUCT_CACHE_TTL_MS = "-1";
process.env.PRODUCT_CACHE_DB_PATH = ":memory:";
process.env.PRODUCT_CACHE_WARMUP = "false";
(Bun.env as Record<string, string | undefined>).PRODUCT_CACHE_TTL_MS = "-1";
(Bun.env as Record<string, string | undefined>).PRODUCT_CACHE_DB_PATH = ":memory:";
(Bun.env as Record<string, string | undefined>).PRODUCT_CACHE_WARMUP = "false";

const dbQueryMock = mock(async (strings: TemplateStringsArray) => {
  const statement = strings.join(" ").replace(/\s+/g, " ").trim();

  if (statement.includes("FROM products p") && statement.includes("variant_colors")) {
    return [...variantRows];
  }

  if (statement.includes("product_type = 'accessory'")) {
    return [...accessoryRows];
  }

  return [];
});

mock.module("@config/db", () => ({
  __esModule: true,
  db: ((strings: TemplateStringsArray) => dbQueryMock(strings)) as unknown,
}));

type MockVariantRow = {
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

type MockAccessoryRow = {
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

function primeVariantRows(rows: MockVariantRow[]) {
  variantRows.splice(0, variantRows.length, ...rows);
}

function primeAccessoryRows(rows: MockAccessoryRow[]) {
  accessoryRows.splice(0, accessoryRows.length, ...rows);
}

const serviceModule = await import("@services/productsService");
const { fetchProducts } = serviceModule;

describe("fetchProducts popular integration", () => {
  beforeEach(() => {
    variantRows.splice(0, variantRows.length);
    accessoryRows.splice(0, accessoryRows.length);
    dbQueryMock.mockClear();
  });

  it("uses database results when at least three products exist", async () => {
    primeVariantRows([
      buildVariantRow({ id: 6101, gender: "male", color: "Stone Gray", popular_rank: 1 }),
      buildVariantRow({ id: 6201, gender: "female", color: "Sea Blue", popular_rank: 1 }),
    ]);
    primeAccessoryRows([
      buildAccessoryRow({ id: 6301, name: "Resistance Bands", priceMinor: 2800 }),
    ]);

    const result = await fetchProducts({ category: "popular" }, { skipAnalytics: true });

    expect(result.cache.source).toBe("database");
    expect(result.products).toHaveLength(3);
    expect(result.products.map((product) => product.link?.type)).toEqual([
      "variant",
      "variant",
      "accessory",
    ]);
  });

  it("falls back to curated products when fewer than three rows return", async () => {
    primeVariantRows([
      buildVariantRow({ id: 6101, gender: "male", color: "Stone Gray", popular_rank: 1 }),
    ]);
    primeAccessoryRows([]);

    const result = await fetchProducts({ category: "popular" }, { skipAnalytics: true });

    expect(result.cache.source).toBe("curated");
    const curatedFallback = createPopularFallbackProducts();
    expect(result.products).toEqual(curatedFallback);
  });
});

function buildVariantRow({
  id,
  gender,
  color,
  popular_rank,
}: {
  id: number;
  gender: "male" | "female";
  color: string;
  popular_rank: number | null;
}): MockVariantRow {
  return {
    slug: "one-sleeve-classic",
    product_name: "One Sleeve Classic",
    price_minor: 4500,
    currency_code: "GBP",
    category: "one-sleeve-classic",
    hero_image: "/athletes/vertical/main-secondary-1.jpg",
    variant_gender: gender,
    color_public_id: id,
    color_name: color,
    color_image_url: `/athletes/vertical/main-secondary-${gender === "male" ? 2 : 10}.jpg`,
    popular_rank,
  } satisfies MockVariantRow;
}

function buildAccessoryRow({
  id,
  name,
  priceMinor,
}: {
  id: number;
  name: string;
  priceMinor: number;
}): MockAccessoryRow {
  return {
    id,
    public_id: id,
    slug: "one-sleeve-classic/resistance-bands",
    name,
    price_minor: priceMinor,
    currency_code: "GBP",
    category: "accessories",
    hero_image: "/athletes/vertical/main-secondary-5.jpg",
    default_gender: "unisex",
  } satisfies MockAccessoryRow;
}
