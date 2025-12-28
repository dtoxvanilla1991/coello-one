import { z } from "zod";

export const productGenderSchema = z.enum(["Women", "Men", "Unisex"]);
export type ProductGender = z.infer<typeof productGenderSchema>;

const productVariantLinkSchema = z.object({
  type: z.literal("variant"),
  gender: z.enum(["male", "female"]),
  color: z.string(),
});

const productAccessoryLinkSchema = z.object({
  type: z.literal("accessory"),
});

export const productLinkSchema = z.discriminatedUnion("type", [
  productVariantLinkSchema,
  productAccessoryLinkSchema,
]);
export type ProductLink = z.infer<typeof productLinkSchema>;

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
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  priceMinor: z.number(),
  currencyCode: z.string().length(3),
  category: z.string(),
  gender: productGenderSchema.optional(),
  imageUrl: z.string(),
  link: productLinkSchema.optional(),
});

export type ProductSummary = z.infer<typeof productSummarySchema>;

export const productCacheMetadataSchema = z.object({
  source: z.enum(["database", "curated", "cache", "fallback"]),
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
  ariaLabel?: string;
  filter?: (product: ProductSummary) => boolean;
}
