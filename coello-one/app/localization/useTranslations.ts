"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import type { TranslationNamespace, TranslationNamespaces } from "./dictionary";
import { getNamespaceCopy } from "./dictionary";

export function useTranslations<N extends TranslationNamespace>(namespace: N): TranslationNamespaces[N] {
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === "string" ? params.locale : undefined;

  return useMemo(() => getNamespaceCopy(locale, namespace), [locale, namespace]);
}
