CREATE TABLE `stripe_orders` (
  `id` serial AUTO_INCREMENT NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `status` varchar(32),
  `payment_status` varchar(32),
  `currency` char(3),
  `amount_total` int,
  `customer_email` varchar(255),
  `locale` varchar(16),
  `metadata_json` text,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp DEFAULT (now()) ON UPDATE now(),
  CONSTRAINT `stripe_orders_id` PRIMARY KEY(`id`),
  CONSTRAINT `stripe_orders_session_id_unique` UNIQUE(`session_id`)
);

--> statement-breakpoint

CREATE TABLE `stripe_order_events` (
  `id` serial AUTO_INCREMENT NOT NULL,
  `stripe_event_id` varchar(255) NOT NULL,
  `session_id` varchar(255),
  `event_type` varchar(255) NOT NULL,
  `stripe_created` int NOT NULL,
  `payload_json` text NOT NULL,
  `received_at` timestamp DEFAULT (now()),
  CONSTRAINT `stripe_order_events_id` PRIMARY KEY(`id`),
  CONSTRAINT `stripe_order_events_event_id_unique` UNIQUE(`stripe_event_id`)
);

--> statement-breakpoint

CREATE INDEX `stripe_order_events_session_idx` ON `stripe_order_events` (`session_id`);