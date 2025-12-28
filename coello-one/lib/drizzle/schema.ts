import {
  bigint,
  char,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  tinyint,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

const genderEnum = ["male", "female", "unisex"] as const;
const productTypeEnum = ["apparel", "accessory"] as const;

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  publicId: int("public_id").unique(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  productType: mysqlEnum("product_type", productTypeEnum).notNull(),
  description: text("description"),
  priceMinor: int("price_minor").notNull(),
  currencyCode: char("currency_code", { length: 3 }).notNull(),
  heroImage: varchar("hero_image", { length: 512 }),
  defaultGender: mysqlEnum("default_gender", genderEnum).notNull(),
  defaultSize: varchar("default_size", { length: 64 }).notNull(),
  defaultColor: varchar("default_color", { length: 64 }),
  includeInPopularFeed: tinyint("include_in_popular_feed").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const productsSlugIdx = uniqueIndex("products_slug_unique").on(products.slug);
export const productsPublicIdIdx = uniqueIndex("products_public_id_unique").on(products.publicId);

export const productMedia = mysqlTable("product_media", {
  id: serial("id").primaryKey(),
  productId: bigint("product_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 512 }).notNull(),
  altText: varchar("alt_text", { length: 255 }),
  sortOrder: int("sort_order").notNull().default(0),
});

export const productVariants = mysqlTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: bigint("product_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  gender: mysqlEnum("variant_gender", genderEnum).notNull(),
  label: varchar("label", { length: 64 }).notNull(),
  defaultColorName: varchar("default_color_name", { length: 64 }),
  isDefault: tinyint("is_default").notNull().default(0),
});

export const productVariantUniqueIdx = uniqueIndex("product_variant_gender_unique").on(
  productVariants.productId,
  productVariants.gender,
);

export const variantColors = mysqlTable("variant_colors", {
  id: serial("id").primaryKey(),
  variantId: bigint("variant_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  publicId: int("public_id").notNull(),
  colorName: varchar("color_name", { length: 64 }).notNull(),
  swatchClass: varchar("swatch_class", { length: 64 }).notNull(),
  ringClass: varchar("ring_class", { length: 64 }),
  imageUrl: varchar("image_url", { length: 512 }),
  isPopularPick: tinyint("is_popular_pick").notNull().default(0),
  popularRank: int("popular_rank"),
});

export const variantColorPublicIdIdx = uniqueIndex("variant_color_public_id_unique").on(
  variantColors.publicId,
);
export const variantColorNameIdx = uniqueIndex("variant_color_name_unique").on(
  variantColors.variantId,
  variantColors.colorName,
);

export const variantSizeGuides = mysqlTable("variant_size_guides", {
  id: serial("id").primaryKey(),
  variantId: bigint("variant_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
  sizeKey: varchar("size_key", { length: 8 }).notNull(),
  sizeLabel: varchar("size_label", { length: 32 }).notNull(),
  chestCm: varchar("chest_cm", { length: 16 }).notNull(),
  waistCm: varchar("waist_cm", { length: 16 }).notNull(),
  hipsCm: varchar("hips_cm", { length: 16 }).notNull(),
});

export const variantSizeGuideIdx = uniqueIndex("variant_size_key_unique").on(
  variantSizeGuides.variantId,
  variantSizeGuides.sizeKey,
);

export const accessorySpecs = mysqlTable("accessory_specs", {
  id: serial("id").primaryKey(),
  productId: bigint("product_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  subtitle: varchar("subtitle", { length: 128 }),
  description: text("description"),
  defaultFit: varchar("default_fit", { length: 32 }),
});

export const accessorySpecsUniqueIdx = uniqueIndex("accessory_specs_product_unique").on(
  accessorySpecs.productId,
);

export const accessoryStrengthLevels = mysqlTable("accessory_strength_levels", {
  id: serial("id").primaryKey(),
  productId: bigint("product_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  levelKey: varchar("level_key", { length: 32 }).notNull(),
  badgeLabel: varchar("badge_label", { length: 128 }).notNull(),
  resistanceRange: varchar("resistance_range", { length: 64 }).notNull(),
  focusText: varchar("focus_text", { length: 255 }).notNull(),
  sortOrder: int("sort_order").notNull().default(0),
});

export const accessoryStrengthLevelIdx = uniqueIndex("accessory_strength_level_unique").on(
  accessoryStrengthLevels.productId,
  accessoryStrengthLevels.levelKey,
);

export const accessoryKitItems = mysqlTable("accessory_kit_items", {
  id: serial("id").primaryKey(),
  productId: bigint("product_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  description: varchar("description", { length: 255 }).notNull(),
  sortOrder: int("sort_order").notNull().default(0),
});

export const accessoryKitItemIdx = uniqueIndex("accessory_kit_item_unique").on(
  accessoryKitItems.productId,
  accessoryKitItems.sortOrder,
);
