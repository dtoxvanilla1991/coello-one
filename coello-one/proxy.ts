import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  addLocaleToPathname,
  extractLocaleFromPathname,
  isSupportedLocale,
  type SupportedLocale,
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

function getPreferredLocale(request: NextRequest): SupportedLocale {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (localeCookie && isSupportedLocale(localeCookie)) {
    return localeCookie;
  }

  const acceptLanguageLocale = matchAcceptLanguage(request.headers.get("accept-language"));
  if (acceptLanguageLocale) {
    return acceptLanguageLocale;
  }

  return DEFAULT_LOCALE;
}

const PUBLIC_FILE = /\.(.*)$/;

function shouldBypassPath(pathname: string): boolean {
  return pathname.startsWith("/_next") || pathname.startsWith("/api") || PUBLIC_FILE.test(pathname);
}

function applyLocaleArtifacts(
  response: NextResponse,
  request: NextRequest,
  locale: SupportedLocale,
) {
  response.headers.set("x-locale", locale);

  const existingCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (existingCookie !== locale) {
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypassPath(pathname)) {
    return NextResponse.next();
  }

  const pathLocale = extractLocaleFromPathname(pathname);

  if (pathLocale) {
    return applyLocaleArtifacts(NextResponse.next(), request, pathLocale);
  }

  const preferredLocale = getPreferredLocale(request);
  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = addLocaleToPathname(preferredLocale, pathname);

  return applyLocaleArtifacts(NextResponse.redirect(targetUrl), request, preferredLocale);
}

export const config = {
  matcher: [
    // Match all paths except static files and internal paths
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    // Explicitly include the root path so "/" gets localized
    "/",
  ],
};
