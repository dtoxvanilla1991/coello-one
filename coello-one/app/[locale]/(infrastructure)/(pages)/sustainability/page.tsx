import type { Metadata } from "next";
import SustainabilityContent from "@/components/pages/SustainabilityContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "pages").sustainability;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// TEST-WAIVER: This server component only feeds localized data into covered UI components.
export default async function SustainabilityPage() {
  const locale = await getRequestLocale();
  const pageCopy = getNamespaceCopy(locale, "pages").sustainability;

  return <SustainabilityContent copy={pageCopy} />;
}
