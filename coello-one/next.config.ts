import path from "node:path";
import type { NextConfig } from "next";

/**
 * Next.js App Router Configuration
 *
 * Coello uses domain-based routing for i18n:
 * - coelloone.uk → en-GB
 * - coelloone.co → es-ES
 *
 * Routes have NO locale path prefixes (e.g., /bag not /en-GB/bag).
 * Locale detection happens in proxy.ts via domain → cookie → Accept-Language.
 * Server components access locale via getRequestLocale() using x-locale header.
 */

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    cacheComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    // Deduplicate jotai across the monorepo to avoid multiple default stores in dev.
    config.resolve.alias.jotai = path.resolve(__dirname, "node_modules/jotai");
    return config;
  },
};

export default nextConfig;
