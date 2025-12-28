import type { ProductSummary } from "@/types/products";

export const RESISTANCE_BANDS_PRODUCT_ID = "coello-resistance-bands" as const;
export const RESISTANCE_BANDS_NAME = "Coello Resistance Bands" as const;
export const RESISTANCE_BANDS_PRICE_GBP = 20;
export const RESISTANCE_BANDS_PRICE_MINOR = RESISTANCE_BANDS_PRICE_GBP * 100;
export const RESISTANCE_BANDS_IMAGE = "/accessories/resistance-bands.png" as const;
export const RESISTANCE_BANDS_DEFAULT_SIZE = "One Size" as const;
export const RESISTANCE_BANDS_DEFAULT_COLOR = "Trio (green, purple, blue)" as const;
export const RESISTANCE_BANDS_SLUG = "one-sleeve-classic/resistance-bands" as const;
export const RESISTANCE_BANDS_SUBTITLE = "Unisex • Fuel your session" as const;
export const RESISTANCE_BANDS_DESCRIPTION =
  "Three loop bands tuned for progressive overload. Each strap matches our one-sleeve palette and ships in a breathable pouch for post-session ventilation." as const;

export const RESISTANCE_BANDS_STRENGTH_LEVELS = [
  {
    key: "light",
    badge: "Light • Peach",
    resistance: "5-10 kg (10-20 lb)",
    focus: "Mobility, warm-ups, and controlled activation.",
  },
  {
    key: "medium",
    badge: "Medium • Coral",
    resistance: "10-20 kg (20-45 lb)",
    focus: "Strength building, compound reinforcement, tempo work.",
  },
  {
    key: "heavy",
    badge: "Heavy • Merlot",
    resistance: "20-35 kg (45-75 lb)",
    focus: "Power training, athletic conditioning, maximal stability.",
  },
] as const;

export type ResistanceStrengthLevel = (typeof RESISTANCE_BANDS_STRENGTH_LEVELS)[number];

export const RESISTANCE_BANDS_BAG_CONTENTS = [
  "Three tonal bands (Peach, Coral, Merlot)",
  "Breathable mesh carry pouch",
  "Quick-start activation guide",
] as const;

export const RESISTANCE_BANDS_SUMMARY: ProductSummary = {
  id: 6301,
  slug: RESISTANCE_BANDS_SLUG,
  name: RESISTANCE_BANDS_NAME,
  price: RESISTANCE_BANDS_PRICE_GBP,
  priceMinor: RESISTANCE_BANDS_PRICE_MINOR,
  currencyCode: "GBP",
  category: "accessories",
  gender: "Unisex",
  imageUrl: RESISTANCE_BANDS_IMAGE,
  link: {
    type: "accessory",
  },
};
