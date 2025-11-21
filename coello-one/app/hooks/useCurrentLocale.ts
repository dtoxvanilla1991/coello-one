"use client";

import { useParams } from "next/navigation";
import { normalizeLocale } from "@/localization/config";

export function useCurrentLocale(): string {
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === "string" ? params.locale : undefined;
  return normalizeLocale(locale);
}
