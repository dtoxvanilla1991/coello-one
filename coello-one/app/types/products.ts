export type ProductGender = "Women" | "Men" | "Unisex";

export interface ProductSummary {
  id: number;
  name: string;
  price: number;
  category?: string;
  gender?: ProductGender;
  imageUrl?: string;
}

export interface ProductCacheMetadata {
  source: "network" | "cache" | "fallback";
  updatedAt: number;
  stale: boolean;
  hit: boolean;
  errorMessage?: string;
  debug?: Record<string, unknown>;
}

export interface ProductServiceResult {
  products: ProductSummary[];
  cache: ProductCacheMetadata;
}

export interface ProductCollectionConfig {
  key: string;
  label: string;
  analyticsId: string;
  filter?: (product: ProductSummary) => boolean;
}
