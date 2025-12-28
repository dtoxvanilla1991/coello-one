export const SUPPORTED_LOCALES = ["en-GB", "es-ES"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en-GB";

const SUPPORTED_LOCALE_MATCHERS = SUPPORTED_LOCALES.map((locale) => locale.toLowerCase());

function matchLocaleSegment(segment?: string | null): SupportedLocale | null {
  if (!segment) {
    return null;
  }

  const normalized = segment.toLowerCase();
  const matchedIndex = SUPPORTED_LOCALE_MATCHERS.findIndex((candidate) => candidate === normalized);

  if (matchedIndex === -1) {
    return null;
  }

  return SUPPORTED_LOCALES[matchedIndex];
}

function normalizePathname(pathname?: string | null): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function isSupportedLocale(locale?: string | null): locale is SupportedLocale {
  if (!locale) {
    return false;
  }

  return matchLocaleSegment(locale) !== null;
}

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return matchLocaleSegment(locale) ?? DEFAULT_LOCALE;
}

export function extractLocaleFromPathname(pathname?: string | null): SupportedLocale | null {
  const normalizedPath = normalizePathname(pathname);
  if (normalizedPath === "/") {
    return null;
  }

  const [, potentialLocale] = normalizedPath.split("/");
  return matchLocaleSegment(potentialLocale);
}

export function stripLocaleFromPathname(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);
  const localeFromPath = extractLocaleFromPathname(normalizedPath);

  if (!localeFromPath) {
    return normalizedPath;
  }

  const withoutLocale = normalizedPath.replace(new RegExp(`^/${localeFromPath}`), "");
  return withoutLocale === "" ? "/" : withoutLocale;
}

export function addLocaleToPathname(locale: SupportedLocale, pathname?: string | null): string {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath === "/") {
    return `/${normalizedLocale}`;
  }

  if (normalizedPath.startsWith(`/${normalizedLocale}`)) {
    return normalizedPath;
  }

  const pathWithoutLocale = stripLocaleFromPathname(normalizedPath);
  return pathWithoutLocale === "/"
    ? `/${normalizedLocale}`
    : `/${normalizedLocale}${pathWithoutLocale.startsWith("/") ? pathWithoutLocale : `/${pathWithoutLocale}`}`;
}

export const LANGUAGE_ALTERNATES = SUPPORTED_LOCALES.reduce(
  (map, locale) => {
    map[locale] = `/${locale}`;
    return map;
  },
  {} as Record<SupportedLocale, string>,
);
