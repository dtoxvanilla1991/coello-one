import type { Metadata } from "next";
import EducationHubContent from "@/components/pages/EducationHubContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "pages").educationHub;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// TEST-WAIVER: Composition of localized copy into previously tested UI primitives.
export default async function EducationHubPage() {
  const locale = await getRequestLocale();
  const pageCopy = getNamespaceCopy(locale, "pages").educationHub;

  return <EducationHubContent copy={pageCopy} />;
}
