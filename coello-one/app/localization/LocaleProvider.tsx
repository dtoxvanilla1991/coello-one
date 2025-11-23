"use client";

import type { ReactNode } from "react";
import type { SupportedLocale } from "@config/i18n";
import { LocaleContext } from "./LocaleContext";

type LocaleProviderProps = {
  value: SupportedLocale;
  children: ReactNode;
};

export function LocaleProvider({ value, children }: LocaleProviderProps) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
