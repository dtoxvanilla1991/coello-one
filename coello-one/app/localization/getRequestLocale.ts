import "server-only";

import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
  isSupportedLocale,
} from "@config/i18n";

function matchAcceptLanguage(headerValue?: string | null): SupportedLocale | null {
  if (!headerValue) {
    return null;
  }

  const candidates = headerValue
    .split(",")
    .map((entry) => {
      const [tagPart, weightPart] = entry.trim().split(";");
      const weight = weightPart?.startsWith("q=") ? Number(weightPart.slice(2)) : 1;
      return { tag: tagPart.toLowerCase(), weight: Number.isFinite(weight) ? weight : 0 };
    })
    .sort((a, b) => b.weight - a.weight);

  for (const candidate of candidates) {
    const locale = mapTagToLocale(candidate.tag);
    if (locale) {
      return locale;
    }
  }

  return null;
}

function mapTagToLocale(tag?: string): SupportedLocale | null {
  if (!tag) {
    return null;
  }

  const normalizedTag = tag.toLowerCase();
  const exactMatch = SUPPORTED_LOCALES.find(
    (supported) => supported.toLowerCase() === normalizedTag,
  );
  if (exactMatch) {
    return exactMatch;
  }

  const languagePart = normalizedTag.split("-")[0];
  if (languagePart === "en") {
    return "en-GB";
  }

  if (languagePart === "es") {
    return "es-ES";
  }

  return null;
}

export async function getRequestLocale(): Promise<SupportedLocale> {
  const headerStore = await headers();

  // 1. Check x-locale header set by proxy.ts (fastest path)
  const proxyLocale = headerStore.get("x-locale");
  if (proxyLocale && isSupportedLocale(proxyLocale)) {
    return proxyLocale;
  }

  // 2. Cookie-based preference
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  if (localeCookie && isSupportedLocale(localeCookie)) {
    return localeCookie;
  }

  // 3. Accept-Language negotiation
  const acceptLanguageLocale = matchAcceptLanguage(headerStore.get("accept-language"));
  if (acceptLanguageLocale) {
    return acceptLanguageLocale;
  }

  return DEFAULT_LOCALE;
}
