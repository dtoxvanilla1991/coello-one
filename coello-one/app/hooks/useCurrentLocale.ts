"use client";

import { useContext } from "react";
import { LocaleContext } from "@/localization/LocaleContext";

export function useCurrentLocale(): string {
  return useContext(LocaleContext);
}
