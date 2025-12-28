"use client";

import { useCallback } from "react";
import { addLocaleToPathname, isSupportedLocale } from "@config/i18n";
import { useCurrentLocale } from "./useCurrentLocale";

function normalizePath(path?: string | null): string {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function useLocalePath() {
  const locale = useCurrentLocale();

  return useCallback(
    (path: string) => {
      if (!locale || !isSupportedLocale(locale)) {
        return normalizePath(path);
      }

      return addLocaleToPathname(locale, path);
    },
    [locale],
  );
}
