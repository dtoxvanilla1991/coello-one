import type { ProductSummary } from "@/types/products";
import { PRODUCT_DATA, PRODUCT_NAME_SLUG } from "../(products)/one-sleeve-classic/constants";
import type { Gender } from "../(products)/one-sleeve-classic/types";
import { RESISTANCE_BANDS_SUMMARY } from "../(products)/one-sleeve-classic/resistance-bands/constants";

const ONE_SLEEVE_PRICE = Number(PRODUCT_DATA.price.replace(/[^\d.]/g, "")) || 45;

const GENDER_LABEL: Record<Gender, "Men" | "Women"> = {
  male: "Men",
  female: "Women",
};

export type PopularVariantDefinition = {
  id: number;
  color: string;
  imageUrl: string;
};

export const ONE_SLEEVE_POPULAR_VARIANTS: Record<Gender, PopularVariantDefinition[]> = {
  male: [
    { id: 6101, color: "Stone Gray", imageUrl: "/athletes/vertical/main-secondary-2.jpg" },
    { id: 6102, color: "Sea Blue", imageUrl: "/athletes/vertical/main-secondary-3.jpg" },
    { id: 6103, color: "Mild Red", imageUrl: "/athletes/vertical/main-secondary-4.jpg" },
  ],
  female: [
    { id: 6201, color: "Stone Gray", imageUrl: "/athletes/vertical/main-secondary-10.jpg" },
    { id: 6202, color: "Sea Blue", imageUrl: "/athletes/vertical/main-secondary-11.jpg" },
    { id: 6203, color: "Mild Red", imageUrl: "/athletes/vertical/main-secondary-9.jpg" },
  ],
};

const POPULAR_VARIANT_LINK_INDEX: Record<number, { gender: Gender; color: string }> = Object.entries(
  ONE_SLEEVE_POPULAR_VARIANTS,
).reduce((accumulator, [genderKey, variantList]) => {
  variantList.forEach((variant) => {
    accumulator[variant.id] = {
      gender: genderKey as Gender,
      color: variant.color,
    };
  });
  return accumulator;
}, {} as Record<number, { gender: Gender; color: string }>);

export const RESISTANCE_BANDS_PATH_SEGMENT = `${PRODUCT_NAME_SLUG}/resistance-bands` as const;

export const POPULAR_ACCESSORY_PRODUCT: ProductSummary = {
  ...RESISTANCE_BANDS_SUMMARY,
};

function pickPopularVariant(gender: Gender, randomFn: () => number): PopularVariantDefinition {
  const variants = ONE_SLEEVE_POPULAR_VARIANTS[gender];
  const index = Math.min(variants.length - 1, Math.floor(randomFn() * variants.length));
  return variants[index] ?? variants[0];
}

function createVariantSummary(variant: PopularVariantDefinition, gender: Gender): ProductSummary {
  return {
    id: variant.id,
    name: `One Sleeve Classic – ${variant.color}`,
    price: ONE_SLEEVE_PRICE,
    category: PRODUCT_NAME_SLUG,
    gender: GENDER_LABEL[gender],
    imageUrl: variant.imageUrl,
  } satisfies ProductSummary;
}

const DEFAULT_VARIANT_SELECTOR = () => 0;

export function createCuratedPopularProducts(
  randomFn: () => number = DEFAULT_VARIANT_SELECTOR,
): ProductSummary[] {
  const femaleVariant = createVariantSummary(pickPopularVariant("female", randomFn), "female");
  const maleVariant = createVariantSummary(pickPopularVariant("male", randomFn), "male");

  return [femaleVariant, maleVariant, POPULAR_ACCESSORY_PRODUCT];
}

export function extractCuratedPopularProducts(products: ProductSummary[]): ProductSummary[] | null {
  const curated = products.filter((product) => {
    const normalizedName = product.name.toLowerCase();
    return (
      product.category === PRODUCT_NAME_SLUG ||
      normalizedName.includes("one sleeve") ||
      normalizedName.includes("coello one classic")
    );
  });

  const hasFemale = curated.some((product) => product.gender === "Women");
  const hasMale = curated.some((product) => product.gender === "Men");

  if (!hasFemale || !hasMale) {
    return null;
  }

  return createCuratedPopularProducts();
}

export type PopularProductLinkInfo =
  | { type: "variant"; gender: Gender; color: string }
  | { type: "accessory" };

export function getPopularProductLinkInfo(productId: number): PopularProductLinkInfo | null {
  const variantLink = POPULAR_VARIANT_LINK_INDEX[productId];

  if (variantLink) {
    return { type: "variant", ...variantLink };
  }

  if (productId === POPULAR_ACCESSORY_PRODUCT.id) {
    return { type: "accessory" };
  }

  return null;
}
