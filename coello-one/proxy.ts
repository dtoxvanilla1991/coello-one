import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
  getLocaleFromHost,
  isSupportedLocale,
} from "@config/i18n";

/**
 * Matches Accept-Language header values against supported locales.
 */
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

/**
 * Maps a language tag to a supported locale.
 */
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

/**
 * Determines locale from request using domain → cookie → Accept-Language chain.
 */
function getLocaleFromRequest(request: NextRequest): SupportedLocale {
  const host = request.headers.get("host");

  // 1. Domain-based detection (primary for Coello's multi-domain setup)
  const hostLocale = getLocaleFromHost(host);
  if (hostLocale) {
    return hostLocale;
  }

  // 2. Cookie-based preference
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && isSupportedLocale(localeCookie)) {
    return localeCookie;
  }

  // 3. Accept-Language negotiation
  const acceptLanguageLocale = matchAcceptLanguage(request.headers.get("accept-language"));
  if (acceptLanguageLocale) {
    return acceptLanguageLocale;
  }

  return DEFAULT_LOCALE;
}

const PUBLIC_FILE = /\.(.*)$/;

/**
 * App Router Proxy for locale detection.
 *
 * Sets x-locale header for server components to read via getRequestLocale().
 * Does NOT redirect to /{locale}/ paths since Coello uses domain-based routing.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths, API routes, and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Detect locale and pass it via header
  const locale = getLocaleFromRequest(request);

  // Clone response and add locale header for server components
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  // Set/refresh NEXT_LOCALE cookie for sticky preference
  const existingCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (existingCookie !== locale) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and internal paths
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
