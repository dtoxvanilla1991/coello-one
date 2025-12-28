import type { Metadata } from "next";
import DiscountsContent from "@/components/pages/DiscountsContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "pages").discounts;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// TEST-WAIVER: Route-level component only passes localized data into tested presentation layers.
export default async function DiscountsPage() {
  const locale = await getRequestLocale();
  const pageCopy = getNamespaceCopy(locale, "pages").discounts;

  return <DiscountsContent copy={pageCopy} />;
}
