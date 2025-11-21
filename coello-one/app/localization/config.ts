export const SUPPORTED_LOCALES = ["en-GB", "es-ES"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en-GB";

export function isSupportedLocale(locale?: string | null): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes((locale ?? "") as SupportedLocale);
}

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}
