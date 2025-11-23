import { z } from "zod";

export const productGenderSchema = z.enum(["Women", "Men", "Unisex"]);
export type ProductGender = z.infer<typeof productGenderSchema>;

export const flaskProductSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    category: z.string().optional(),
    gender: z.string().optional(),
    imageUrl: z.string().optional(),
  })
  .passthrough();

export type FlaskProduct = z.infer<typeof flaskProductSchema>;

export const flaskProductListSchema = z.array(flaskProductSchema);
export type FlaskProductList = z.infer<typeof flaskProductListSchema>;

export const productSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  category: z.string().optional(),
  gender: productGenderSchema.optional(),
  imageUrl: z.string().optional(),
});

export type ProductSummary = z.infer<typeof productSummarySchema>;

export const productCacheMetadataSchema = z.object({
  source: z.enum(["network", "cache", "fallback"]),
  updatedAt: z.number(),
  stale: z.boolean(),
  hit: z.boolean(),
  errorMessage: z.string().optional(),
  debug: z.record(z.string(), z.unknown()).optional(),
});

export type ProductCacheMetadata = z.infer<typeof productCacheMetadataSchema>;

export const productServiceResultSchema = z.object({
  products: z.array(productSummarySchema),
  cache: productCacheMetadataSchema,
});

export type ProductServiceResult = z.infer<typeof productServiceResultSchema>;

export interface ProductCollectionConfig {
  key: string;
  label: string;
  analyticsId: string;
  filter?: (product: ProductSummary) => boolean;
}
