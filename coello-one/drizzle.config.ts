import { defineConfig } from "drizzle-kit";
import { isProd, isLocalHost } from "./utils/env";

// Logic: Use Aiven if we are deploying, otherwise use Local Docker.
const isProduction = isProd();
const localHost = process.env.DB_HOST_DEV ?? "127.0.0.1";
const normalizedLocalHost = isLocalHost(localHost) ? "127.0.0.1" : localHost;
const localUrl =
  process.env.DB_URL_DEV ??
  `mysql://${process.env.DB_USER_DEV ?? "root"}:${process.env.DB_PASS_DEV ?? "secret"}@${normalizedLocalHost}:3306/${process.env.DB_NAME_DEV ?? "coello"}`;

export default defineConfig({
  dialect: "mysql",
  schema: "./lib/drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: isProduction ? process.env.DB_URL_PROD! : localUrl,
  },
  // For now, adding verbose logging to see exactly what it's doing
  verbose: true,
  strict: true,
});
