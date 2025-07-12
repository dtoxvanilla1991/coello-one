import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en-GB", "es-ES"],
    defaultLocale: "en-GB",
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

export default nextConfig;
