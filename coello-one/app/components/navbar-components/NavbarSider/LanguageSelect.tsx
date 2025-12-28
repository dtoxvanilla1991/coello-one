"use client";

import { useTransition } from "react";
import { Select, message } from "antd";
import { trackEvent } from "@/utils/trackEvent";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { addLocaleToPathname, DEFAULT_LOCALE, type SupportedLocale } from "@config/i18n";
import { useTranslations } from "@/localization/useTranslations";

const LANGUAGE_OPTIONS = [
  { label: "EN", value: "en-GB" },
  { label: "ES", value: "es-ES" },
] satisfies { label: string; value: SupportedLocale }[];

export default function LanguageSelect() {
  const [isPending, startTransition] = useTransition();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const activeLocale = (useCurrentLocale() as SupportedLocale) ?? DEFAULT_LOCALE;
  const navigationCopy = useTranslations("navigation");
  const siderCopy = navigationCopy.sider;

  const handleChange = async (value: SupportedLocale) => {
    const targetLocale = value ?? DEFAULT_LOCALE;
    const setLanguageEndpoint = addLocaleToPathname(targetLocale, "/api/set-language");
    const destinationPath = addLocaleToPathname(targetLocale, pathname);

    try {
      const response = await fetch(setLanguageEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: targetLocale }),
      });

      if (!response.ok) {
        throw new Error(`Locale update failed with status ${response.status}`);
      }

      startTransition(() => {
        router.replace(destinationPath);
      });
    } catch (error) {
      console.error("language_select_error", error);
      trackEvent("locale_switch_failed", {
        locale: targetLocale,
        reason: error instanceof Error ? error.message : "unknown",
      });
      messageApi.error({
        key: "language-switch-error",
        content:
          siderCopy.languageSwitchError ??
          "Unable to switch language. Check your connection and try again.",
        duration: 4,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Select
        aria-label={siderCopy.languageSelectorAriaLabel ?? "Language selector"}
        className="w-[4.5em]"
        value={activeLocale}
        loading={isPending}
        disabled={isPending}
        onChange={handleChange}
        options={LANGUAGE_OPTIONS}
      />
    </>
  );
}
