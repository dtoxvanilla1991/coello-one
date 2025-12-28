import type { ProductSummary } from "@/types/products";
import { PRODUCT_DATA, PRODUCT_NAME_SLUG } from "../(products)/one-sleeve-classic/constants";
import type { Gender } from "../(products)/one-sleeve-classic/types";
import { RESISTANCE_BANDS_SUMMARY } from "../(products)/one-sleeve-classic/resistance-bands/constants";

const ONE_SLEEVE_PRICE = Number(PRODUCT_DATA.price.replace(/[^\d.]/g, "")) || 45;
const ONE_SLEEVE_PRICE_MINOR = Math.round(ONE_SLEEVE_PRICE * 100);

const GENDER_LABEL: Record<Gender, "Men" | "Women"> = {
  male: "Men",
  female: "Women",
};

type PopularVariantDefinition = {
  id: number;
  color: string;
  imageUrl: string;
};

const ONE_SLEEVE_POPULAR_VARIANTS: Record<Gender, PopularVariantDefinition[]> = {
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

export function createPopularFallbackProducts(): ProductSummary[] {
  const buildVariant = (variant: PopularVariantDefinition, gender: Gender): ProductSummary => ({
    id: variant.id,
    slug: PRODUCT_NAME_SLUG,
    name: `One Sleeve Classic – ${variant.color}`,
    price: ONE_SLEEVE_PRICE,
    priceMinor: ONE_SLEEVE_PRICE_MINOR,
    currencyCode: "GBP",
    category: PRODUCT_NAME_SLUG,
    gender: GENDER_LABEL[gender],
    imageUrl: variant.imageUrl,
    link: {
      type: "variant",
      gender,
      color: variant.color,
    },
  });

  const femaleVariant = ONE_SLEEVE_POPULAR_VARIANTS.female[0];
  const maleVariant = ONE_SLEEVE_POPULAR_VARIANTS.male[0];

  return [
    buildVariant(femaleVariant, "female"),
    buildVariant(maleVariant, "male"),
    {
      ...RESISTANCE_BANDS_SUMMARY,
    },
  ];
}
