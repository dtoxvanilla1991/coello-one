import { z } from "zod";

export const SUPPORTED_LOCALES = ["en-GB", "es-ES"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en-GB";

export type DomainLocaleConfig = {
  domain: string;
  defaultLocale: SupportedLocale;
  locales?: SupportedLocale[];
  http?: true;
};

const FALLBACK_PRODUCTION_DOMAIN_LOCALES: DomainLocaleConfig[] = [
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

const FALLBACK_LOCAL_DOMAIN_LOCALES: DomainLocaleConfig[] = [
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

const domainLocaleSchema = z.object({
  domain: z.string().min(1),
  defaultLocale: z.enum(SUPPORTED_LOCALES),
  locales: z.array(z.enum(SUPPORTED_LOCALES)).optional(),
  http: z.literal(true).optional(),
});

const domainLocaleArraySchema = z.array(domainLocaleSchema);

function parseDomainLocalesFromEnv(
  envKey: "NEXT_PUBLIC_PRODUCTION_DOMAIN_LOCALES" | "NEXT_PUBLIC_LOCAL_DOMAIN_LOCALES",
  fallback: DomainLocaleConfig[],
): DomainLocaleConfig[] {
  const rawValue = process.env[envKey];
  if (!rawValue) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(rawValue);
    return domainLocaleArraySchema.parse(parsed);
  } catch (error) {
    console.warn(`[i18n] Failed to parse ${envKey}. Falling back to defaults.`, error);
    return fallback;
  }
}

export const PRODUCTION_DOMAIN_LOCALES = parseDomainLocalesFromEnv(
  "NEXT_PUBLIC_PRODUCTION_DOMAIN_LOCALES",
  FALLBACK_PRODUCTION_DOMAIN_LOCALES,
);

export const LOCAL_DEVELOPMENT_DOMAIN_LOCALES = parseDomainLocalesFromEnv(
  "NEXT_PUBLIC_LOCAL_DOMAIN_LOCALES",
  FALLBACK_LOCAL_DOMAIN_LOCALES,
);

export const ALL_DOMAIN_LOCALES = [
  ...PRODUCTION_DOMAIN_LOCALES,
  ...LOCAL_DEVELOPMENT_DOMAIN_LOCALES,
];

function toAbsoluteDomainUrl(config: DomainLocaleConfig): string {
  if (config.domain.startsWith("http://") || config.domain.startsWith("https://")) {
    return config.domain;
  }

  const protocol = config.http ? "http" : "https";
  return `${protocol}://${config.domain}`;
}

export function buildLocaleAlternateMap(
  domainLocales: DomainLocaleConfig[],
): Record<SupportedLocale, string> {
  return domainLocales.reduce(
    (map, config) => {
      const url = toAbsoluteDomainUrl(config);
      const locales = config.locales ?? [config.defaultLocale];

      locales.forEach((locale) => {
        if (!map[locale]) {
          map[locale] = url;
        }
      });

      if (!map[config.defaultLocale]) {
        map[config.defaultLocale] = url;
      }

      return map;
    },
    {} as Record<SupportedLocale, string>,
  );
}

export const PRODUCTION_LANGUAGE_ALTERNATES = buildLocaleAlternateMap(PRODUCTION_DOMAIN_LOCALES);

export function isSupportedLocale(locale?: string | null): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes((locale ?? "") as SupportedLocale);
}

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getLocaleFromHost(host?: string | null): SupportedLocale | null {
  const cleanHost = host?.split(":")[0]?.toLowerCase();
  if (!cleanHost) {
    return null;
  }

  const matched = ALL_DOMAIN_LOCALES.find(({ domain }) => domain.toLowerCase() === cleanHost);
  return matched?.defaultLocale ?? null;
}
