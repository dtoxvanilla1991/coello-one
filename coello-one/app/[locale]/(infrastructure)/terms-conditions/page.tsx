import type { Metadata } from "next";
import LegalPageContent from "@/components/pages/LegalPageContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "legal").termsConditions;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function TermsConditionsPage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "legal").termsConditions;
  return <LegalPageContent copy={copy} />;
}
