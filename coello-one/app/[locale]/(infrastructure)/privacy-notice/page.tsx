import type { Metadata } from "next";
import LegalPageContent from "@/components/pages/LegalPageContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "legal").privacyNotice;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function PrivacyNoticePage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "legal").privacyNotice;
  return <LegalPageContent copy={copy} />;
}
