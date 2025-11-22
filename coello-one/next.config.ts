import type { NextConfig } from "next";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  PRODUCTION_DOMAIN_LOCALES,
  LOCAL_DEVELOPMENT_DOMAIN_LOCALES,
} from "./config/i18n";

const isProduction = process.env.NODE_ENV === "production";
const activeDomainLocales = isProduction
  ? PRODUCTION_DOMAIN_LOCALES
  : LOCAL_DEVELOPMENT_DOMAIN_LOCALES;

const nextConfig: NextConfig = {
  i18n: {
    locales: [...SUPPORTED_LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    domains: activeDomainLocales,
  },
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
      {
        source: "/:locale(en-GB|es-ES)",
        destination: "/",
        permanent: false,
      },
      {
        source: "/:locale(en-GB|es-ES)/:path*",
        destination: "/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
