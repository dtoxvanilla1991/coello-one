import { db } from "../config/db";

type Gender = "male" | "female" | "unisex";
type ProductType = "apparel" | "accessory";

type VariantColorSeed = {
  publicId: number;
  colorName: string;
  swatchClass: string;
  ringClass?: string;
  imageUrl: string;
  isPopularPick?: boolean;
  popularRank?: number;
};

type VariantSizeGuideSeed = {
  sizeKey: string;
  sizeLabel: string;
  chestCm: string;
  waistCm: string;
  hipsCm: string;
};

type VariantSeed = {
  gender: Gender;
  label: string;
  defaultColorName: string;
  isDefault?: boolean;
  colors: VariantColorSeed[];
  sizeGuide: VariantSizeGuideSeed[];
};

type AccessorySeed = {
  subtitle: string;
  description: string;
  defaultFit: string;
  strengthLevels: {
    levelKey: string;
    badgeLabel: string;
    resistanceRange: string;
    focusText: string;
    sortOrder: number;
  }[];
  kitItems: string[];
};

type ProductSeed = {
  product: {
    publicId: number;
    name: string;
    slug: string;
    category: string;
    productType: ProductType;
    description: string;
    priceMinor: number;
    currencyCode: string;
    heroImage: string;
    defaultGender: Gender;
    defaultSize: string;
    defaultColor: string;
    includeInPopularFeed?: boolean;
  };
  media: { imageUrl: string; altText: string; sortOrder: number }[];
  variants?: VariantSeed[];
  accessory?: AccessorySeed;
};

const GBP = "GBP";

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    product: {
      publicId: 6000,
      name: "One Sleeve Classic",
      slug: "one-sleeve-classic",
      category: "one-sleeve-classic",
      productType: "apparel",
      description:
        "Signature asymmetrical top cut for artists in motion. Breathable panels, bonded seams, and sweat-wicking mesh keep sessions calm under spotlight heat.",
      priceMinor: 4500,
      currencyCode: GBP,
      heroImage: "/athletes/vertical/coello_one_classic_gray_front.png",
      defaultGender: "male",
      defaultSize: "M",
      defaultColor: "Stone Gray",
      includeInPopularFeed: true,
    },
    media: [
      {
        imageUrl: "/athletes/vertical/coello_one_classic_gray_front.png",
        altText: "One Sleeve Classic primary visual",
        sortOrder: 0,
      },
      {
        imageUrl: "/athletes/vertical/coello_one_classic_gray_back.png",
        altText: "One Sleeve Classic angle 2",
        sortOrder: 1,
      },
      {
        imageUrl: "/athletes/vertical/main-secondary-3.jpg",
        altText: "One Sleeve Classic angle 3",
        sortOrder: 2,
      },
      {
        imageUrl: "/athletes/vertical/main-secondary-4.jpg",
        altText: "One Sleeve Classic angle 4",
        sortOrder: 3,
      },
    ],
    variants: [
      {
        gender: "male",
        label: "Men",
        defaultColorName: "Stone Gray",
        isDefault: true,
        colors: [
          {
            publicId: 6101,
            colorName: "Stone Gray",
            swatchClass: "bg-gray-400",
            ringClass: "ring-gray-400",
            imageUrl: "/athletes/vertical/coello_one_classic_gray_back.png",
            isPopularPick: true,
            popularRank: 1,
          },
          {
            publicId: 6102,
            colorName: "Sea Blue",
            swatchClass: "bg-sky-500",
            ringClass: "ring-sky-400",
            imageUrl: "/athletes/vertical/main-secondary-3.jpg",
            isPopularPick: true,
            popularRank: 2,
          },
          {
            publicId: 6103,
            colorName: "Mild Red",
            swatchClass: "bg-rose-300",
            ringClass: "ring-rose-400",
            imageUrl: "/athletes/vertical/main-secondary-4.jpg",
            isPopularPick: false,
            popularRank: 3,
          },
        ],
        sizeGuide: [
          { sizeKey: "S", sizeLabel: "S", chestCm: "94", waistCm: "76", hipsCm: "92" },
          { sizeKey: "M", sizeLabel: "M", chestCm: "100", waistCm: "82", hipsCm: "98" },
          { sizeKey: "L", sizeLabel: "L", chestCm: "106", waistCm: "88", hipsCm: "104" },
        ],
      },
      {
        gender: "female",
        label: "Women",
        defaultColorName: "Stone Gray",
        colors: [
          {
            publicId: 6201,
            colorName: "Stone Gray",
            swatchClass: "bg-gray-400",
            ringClass: "ring-gray-400",
            imageUrl: "/athletes/vertical/main-secondary-10.jpg",
            isPopularPick: true,
            popularRank: 1,
          },
          {
            publicId: 6202,
            colorName: "Sea Blue",
            swatchClass: "bg-sky-500",
            ringClass: "ring-sky-400",
            imageUrl: "/athletes/vertical/main-secondary-11.jpg",
            isPopularPick: true,
            popularRank: 2,
          },
          {
            publicId: 6203,
            colorName: "Mild Red",
            swatchClass: "bg-rose-300",
            ringClass: "ring-rose-400",
            imageUrl: "/athletes/vertical/main-secondary-9.jpg",
            isPopularPick: false,
            popularRank: 3,
          },
        ],
        sizeGuide: [
          { sizeKey: "S", sizeLabel: "S", chestCm: "84", waistCm: "66", hipsCm: "90" },
          { sizeKey: "M", sizeLabel: "M", chestCm: "90", waistCm: "72", hipsCm: "96" },
          { sizeKey: "L", sizeLabel: "L", chestCm: "96", waistCm: "78", hipsCm: "102" },
        ],
      },
    ],
  },
  {
    product: {
      publicId: 6301,
      name: "Coello Resistance Bands",
      slug: "one-sleeve-classic/resistance-bands",
      category: "accessories",
      productType: "accessory",
      description:
        "Trio of tonal loop bands tuned for progressive overload. Breathable mesh pouch keeps ventilation high between sessions.",
      priceMinor: 2000,
      currencyCode: GBP,
      heroImage: "/accessories/resistance-bands.png",
      defaultGender: "unisex",
      defaultSize: "One Size",
      defaultColor: "Trio (green, purple, blue)",
      includeInPopularFeed: true,
    },
    media: [
      {
        imageUrl: "/accessories/resistance-bands.png",
        altText: "Coello Resistance Bands kit",
        sortOrder: 0,
      },
    ],
    accessory: {
      subtitle: "Unisex • Fuel your session",
      description:
        "Three loop bands tuned to the One Sleeve palette. Built for mobility, tempo strength, and explosive conditioning with zero-slip stitching.",
      defaultFit: "One Size",
      strengthLevels: [
        {
          levelKey: "light",
          badgeLabel: "Light • Peach",
          resistanceRange: "5-10 kg (10-20 lb)",
          focusText: "Mobility, warm-ups, and controlled activation.",
          sortOrder: 0,
        },
        {
          levelKey: "medium",
          badgeLabel: "Medium • Coral",
          resistanceRange: "10-20 kg (20-45 lb)",
          focusText: "Strength building, compound reinforcement, tempo work.",
          sortOrder: 1,
        },
        {
          levelKey: "heavy",
          badgeLabel: "Heavy • Merlot",
          resistanceRange: "20-35 kg (45-75 lb)",
          focusText: "Power training, athletic conditioning, maximal stability.",
          sortOrder: 2,
        },
      ],
      kitItems: [
        "Three tonal bands (Peach, Coral, Merlot)",
        "Breathable mesh carry pouch",
        "Quick-start activation guide",
      ],
    },
  },
];

async function fetchLastInsertId(entity: string): Promise<number> {
  const rows = (await db`SELECT LAST_INSERT_ID() AS lastInsertId`) as {
    lastInsertId: number | bigint;
  }[];
  const lastInsertId = rows[0]?.lastInsertId;
  const resolvedId = Number(lastInsertId ?? 0);

  if (!Number.isFinite(resolvedId) || resolvedId <= 0) {
    throw new Error(`Unable to determine ${entity} id after insert.`);
  }

  return resolvedId;
}

async function truncateTables() {
  console.log("🧹 Clearing relational tables...");
  await db`SET FOREIGN_KEY_CHECKS = 0`;
  await db`TRUNCATE TABLE accessory_kit_items`;
  await db`TRUNCATE TABLE accessory_strength_levels`;
  await db`TRUNCATE TABLE accessory_specs`;
  await db`TRUNCATE TABLE variant_size_guides`;
  await db`TRUNCATE TABLE variant_colors`;
  await db`TRUNCATE TABLE product_variants`;
  await db`TRUNCATE TABLE product_media`;
  await db`TRUNCATE TABLE products`;
  await db`SET FOREIGN_KEY_CHECKS = 1`;
}

async function seedProduct(productSeed: ProductSeed) {
  const {
    publicId,
    name,
    slug,
    category,
    productType,
    description,
    priceMinor,
    currencyCode,
    heroImage,
    defaultGender,
    defaultSize,
    defaultColor,
    includeInPopularFeed,
  } = productSeed.product;

  await db`
    INSERT INTO products (
      public_id,
      name,
      slug,
      category,
      product_type,
      description,
      price_minor,
      currency_code,
      hero_image,
      default_gender,
      default_size,
      default_color,
      include_in_popular_feed
    ) VALUES (
      ${publicId},
      ${name},
      ${slug},
      ${category},
      ${productType},
      ${description},
      ${priceMinor},
      ${currencyCode},
      ${heroImage},
      ${defaultGender},
      ${defaultSize},
      ${defaultColor},
      ${includeInPopularFeed ? 1 : 0}
    )
  `;

  const productId = await fetchLastInsertId("product");

  for (const media of productSeed.media) {
    await db`
      INSERT INTO product_media (product_id, image_url, alt_text, sort_order)
      VALUES (${productId}, ${media.imageUrl}, ${media.altText}, ${media.sortOrder})
    `;
  }

  if (productSeed.variants) {
    for (const variant of productSeed.variants) {
      await db`
        INSERT INTO product_variants (
          product_id,
          variant_gender,
          label,
          default_color_name,
          is_default
        ) VALUES (
          ${productId},
          ${variant.gender},
          ${variant.label},
          ${variant.defaultColorName},
          ${variant.isDefault ? 1 : 0}
        )
      `;

      const variantId = await fetchLastInsertId("product_variant");

      for (const color of variant.colors) {
        await db`
          INSERT INTO variant_colors (
            variant_id,
            public_id,
            color_name,
            swatch_class,
            ring_class,
            image_url,
            is_popular_pick,
            popular_rank
          ) VALUES (
            ${variantId},
            ${color.publicId},
            ${color.colorName},
            ${color.swatchClass},
            ${color.ringClass ?? null},
            ${color.imageUrl},
            ${color.isPopularPick ? 1 : 0},
            ${color.popularRank ?? null}
          )
        `;
      }

      for (const row of variant.sizeGuide) {
        await db`
          INSERT INTO variant_size_guides (
            variant_id,
            size_key,
            size_label,
            chest_cm,
            waist_cm,
            hips_cm
          ) VALUES (
            ${variantId},
            ${row.sizeKey},
            ${row.sizeLabel},
            ${row.chestCm},
            ${row.waistCm},
            ${row.hipsCm}
          )
        `;
      }
    }
  }

  if (productSeed.accessory) {
    const accessory = productSeed.accessory;
    await db`
      INSERT INTO accessory_specs (
        product_id,
        subtitle,
        description,
        default_fit
      ) VALUES (
        ${productId},
        ${accessory.subtitle},
        ${accessory.description},
        ${accessory.defaultFit}
      )
    `;

    for (const level of accessory.strengthLevels) {
      await db`
        INSERT INTO accessory_strength_levels (
          product_id,
          level_key,
          badge_label,
          resistance_range,
          focus_text,
          sort_order
        ) VALUES (
          ${productId},
          ${level.levelKey},
          ${level.badgeLabel},
          ${level.resistanceRange},
          ${level.focusText},
          ${level.sortOrder}
        )
      `;
    }

    for (const [index, item] of accessory.kitItems.entries()) {
      await db`
        INSERT INTO accessory_kit_items (product_id, description, sort_order)
        VALUES (${productId}, ${item}, ${index})
      `;
    }
  }

  console.log(`✅ Seeded ${name}`);
}

async function main() {
  console.log("🌱 Seeding Coello Database...");

  try {
    await truncateTables();
    for (const seed of PRODUCT_SEEDS) {
      await seedProduct(seed);
    }
    console.log("🎉 Seed complete");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }

  process.exit(0);
}

main();
