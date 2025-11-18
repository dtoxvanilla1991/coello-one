import type { ProductSummary } from "@/types/products";

export const RESISTANCE_BANDS_PRODUCT_ID = "coello-resistance-bands" as const;
export const RESISTANCE_BANDS_NAME = "Coello Resistance Bands" as const;
export const RESISTANCE_BANDS_PRICE_GBP = 20;
export const RESISTANCE_BANDS_IMAGE = "/accessories/resistance-bands.png" as const;
export const RESISTANCE_BANDS_DEFAULT_SIZE = "One Size" as const;
export const RESISTANCE_BANDS_DEFAULT_COLOR = "Carbon" as const;

export const RESISTANCE_BANDS_SUMMARY: ProductSummary = {
  id: 6301,
  name: RESISTANCE_BANDS_NAME,
  price: RESISTANCE_BANDS_PRICE_GBP,
  category: "accessories",
  gender: "Unisex",
  imageUrl: RESISTANCE_BANDS_IMAGE,
};
