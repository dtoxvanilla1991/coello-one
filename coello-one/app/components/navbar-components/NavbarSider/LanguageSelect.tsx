"use client";

import { useTransition } from "react";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import type { SupportedLocale } from "@config/i18n";

const LANGUAGE_OPTIONS = [
  { label: "EN", value: "en-GB" },
  { label: "ES", value: "es-ES" },
] satisfies { label: string; value: SupportedLocale }[];

export default function LanguageSelect() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const activeLocale = useCurrentLocale() as SupportedLocale;

  const handleChange = async (value: SupportedLocale) => {
    try {
      const response = await fetch("/api/set-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: value }),
      });

      if (!response.ok) {
        throw new Error(`Locale update failed with status ${response.status}`);
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("language_select_error", error);
    }
  };

  return (
    <Select
      aria-label="Language selector"
      className="w-[4.5em]"
      value={activeLocale}
      loading={isPending}
      disabled={isPending}
      onChange={handleChange}
      options={LANGUAGE_OPTIONS}
    />
  );
}
