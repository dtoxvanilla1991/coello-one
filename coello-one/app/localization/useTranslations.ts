"use client";

import { useMemo } from "react";
import type { TranslationNamespace, TranslationNamespaces } from "./dictionary";
import { getNamespaceCopy } from "./dictionary";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";

export function useTranslations<N extends TranslationNamespace>(namespace: N): TranslationNamespaces[N] {
  const locale = useCurrentLocale();

  return useMemo(() => getNamespaceCopy(locale, namespace), [locale, namespace]);
}
