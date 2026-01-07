import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { PRODUCT_DATA, PRODUCT_NAME_SLUG } from "@/[locale]/(infrastructure)/(products)/one-sleeve-classic/constants";
import type { ProductData } from "@/[locale]/(infrastructure)/(products)/one-sleeve-classic/types";

export type ProductSpecs = {
  slug: string;
  data: ProductData;
};

async function loadProductSpecs(slug: string): Promise<ProductSpecs | null> {
  if (slug === PRODUCT_NAME_SLUG) {
    return { slug, data: PRODUCT_DATA };
  }

  return null;
}

export async function getProductSpecs(slug: string): Promise<ProductSpecs | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 60 * 60, expire: 24 * 60 * 60 });
  cacheTag("product-specs", `product-specs:${slug}`);

  return loadProductSpecs(slug);
}

export async function revalidateProductSpecs(slug: string) {
  revalidateTag(`product-specs:${slug}`, "max");
}
