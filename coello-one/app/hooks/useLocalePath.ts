"use client";

import { useParams } from "next/navigation";

/**
 * Returns a helper that prefixes paths with the current locale segment.
 * Falls back to "en-GB" when the locale param is missing.
 */
export function useLocalePath() {
  const params = useParams<{ locale?: string }>();
  const locale =
    typeof params?.locale === "string" && params.locale.length > 0 ? params.locale : "en-GB";

  return (path: string) => {
    const trimmed = path.startsWith("/") ? path.slice(1) : path;
    if (!trimmed) {
      return `/${locale}`;
    }

    if (trimmed === locale || trimmed.startsWith(`${locale}/`)) {
      return `/${trimmed}`;
    }

    return `/${locale}/${trimmed}`;
  };
}
