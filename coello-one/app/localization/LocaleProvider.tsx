"use client";

import { useMemo, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { extractLocaleFromPathname, normalizeLocale, type SupportedLocale } from "@config/i18n";
import { LocaleContext } from "./LocaleContext";

type LocaleProviderProps = {
  value: SupportedLocale;
  children: ReactNode;
};

export function LocaleProvider({ value, children }: LocaleProviderProps) {
  const pathname = usePathname();
  const resolvedLocale = useMemo(() => {
    const localeFromPath = pathname ? extractLocaleFromPathname(pathname) : null;
    return normalizeLocale(localeFromPath ?? value);
  }, [pathname, value]);

  return <LocaleContext.Provider value={resolvedLocale}>{children}</LocaleContext.Provider>;
}
