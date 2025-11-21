export const SUPPORTED_LOCALES = ["en-GB", "es-ES"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en-GB";

export type DomainLocaleConfig = {
  domain: string;
  defaultLocale: SupportedLocale;
  locales?: SupportedLocale[];
  http?: true;
};

export const PRODUCTION_DOMAIN_LOCALES: DomainLocaleConfig[] = [
  {
    domain: "coelloone.uk",
    defaultLocale: "en-GB",
    locales: ["en-GB"],
  },
  {
    domain: "coelloone.co",
    defaultLocale: "es-ES",
    locales: ["es-ES"],
  },
];

export const LOCAL_DEVELOPMENT_DOMAIN_LOCALES: DomainLocaleConfig[] = [
  {
    domain: "localhost.uk",
    defaultLocale: "en-GB",
    locales: ["en-GB"],
    http: true,
  },
  {
    domain: "localhost.co",
    defaultLocale: "es-ES",
    locales: ["es-ES"],
    http: true,
  },
];

export const ALL_DOMAIN_LOCALES = [
  ...PRODUCTION_DOMAIN_LOCALES,
  ...LOCAL_DEVELOPMENT_DOMAIN_LOCALES,
];

export function isSupportedLocale(locale?: string | null): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes((locale ?? "") as SupportedLocale);
}

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getLocaleFromHost(host?: string | null): SupportedLocale {
  const cleanHost = host?.split(":")[0]?.toLowerCase();
  if (!cleanHost) {
    return DEFAULT_LOCALE;
  }

  const matched = ALL_DOMAIN_LOCALES.find(({ domain }) => domain.toLowerCase() === cleanHost);
  return matched?.defaultLocale ?? DEFAULT_LOCALE;
}
