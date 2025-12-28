CREATE TABLE `accessory_kit_items` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`description` varchar(255) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `accessory_kit_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accessory_specs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`subtitle` varchar(128),
	`description` text,
	`default_fit` varchar(32),
	CONSTRAINT `accessory_specs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `accessory_strength_levels` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`level_key` varchar(32) NOT NULL,
	`badge_label` varchar(128) NOT NULL,
	`resistance_range` varchar(64) NOT NULL,
	`focus_text` varchar(255) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `accessory_strength_levels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_media` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`image_url` varchar(512) NOT NULL,
	`alt_text` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `product_media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_variants` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`product_id` bigint unsigned NOT NULL,
	`variant_gender` enum('male','female','unisex') NOT NULL,
	`label` varchar(64) NOT NULL,
	`default_color_name` varchar(64),
	`is_default` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `product_variants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `variant_colors` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`variant_id` bigint unsigned NOT NULL,
	`public_id` int NOT NULL,
	`color_name` varchar(64) NOT NULL,
	`swatch_class` varchar(64) NOT NULL,
	`ring_class` varchar(64),
	`image_url` varchar(512),
	`is_popular_pick` tinyint NOT NULL DEFAULT 0,
	`popular_rank` int,
	CONSTRAINT `variant_colors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `variant_size_guides` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`variant_id` bigint unsigned NOT NULL,
	`size_key` varchar(8) NOT NULL,
	`size_label` varchar(32) NOT NULL,
	`chest_cm` varchar(16) NOT NULL,
	`waist_cm` varchar(16) NOT NULL,
	`hips_cm` varchar(16) NOT NULL,
	CONSTRAINT `variant_size_guides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` DROP INDEX `products_slug_unique`;--> statement-breakpoint
ALTER TABLE `products` ADD `public_id` int;--> statement-breakpoint
ALTER TABLE `products` ADD `category` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `product_type` enum('apparel','accessory') NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `price_minor` int NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `currency_code` char(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `hero_image` varchar(512);--> statement-breakpoint
ALTER TABLE `products` ADD `default_gender` enum('male','female','unisex') NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `default_size` varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `default_color` varchar(64);--> statement-breakpoint
ALTER TABLE `products` ADD `include_in_popular_feed` tinyint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_public_id_unique` UNIQUE(`public_id`);--> statement-breakpoint
ALTER TABLE `accessory_kit_items` ADD CONSTRAINT `accessory_kit_items_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `accessory_specs` ADD CONSTRAINT `accessory_specs_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `accessory_strength_levels` ADD CONSTRAINT `accessory_strength_levels_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_media` ADD CONSTRAINT `product_media_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_variants` ADD CONSTRAINT `product_variants_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `variant_colors` ADD CONSTRAINT `variant_colors_variant_id_product_variants_id_fk` FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `variant_size_guides` ADD CONSTRAINT `variant_size_guides_variant_id_product_variants_id_fk` FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `price`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `image_url`;