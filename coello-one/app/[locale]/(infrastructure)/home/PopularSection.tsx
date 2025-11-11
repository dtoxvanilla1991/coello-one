import PopularSectionClient from "./PopularSectionClient";
import { fetchProducts } from "@services/productsService";
import type { ProductCacheMetadata } from "@/types/products";

function createFallbackMetadata(error?: unknown): ProductCacheMetadata {
  return {
    source: "fallback",
    updatedAt: Date.now(),
    stale: true,
    hit: false,
    errorMessage:
      error instanceof Error ? error.message : "Popular products are temporarily unavailable.",
  };
}

async function loadPopularProducts() {
  try {
    return await fetchProducts({ category: "popular" });
  } catch (error) {
    console.error("[PopularSection] failed to load products", error);
    return { error } as const;
  }
}

export default async function PopularSection() {
  const result = await loadPopularProducts();

  if ("error" in result) {
    const errorMetadata = createFallbackMetadata(result.error);

    return <PopularSectionClient products={[]} cache={errorMetadata} />;
  }

  return <PopularSectionClient products={result.products} cache={result.cache} />;
}
