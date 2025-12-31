import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: __dirname,
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
