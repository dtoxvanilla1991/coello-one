import type { Metadata } from "next";
import AboutUsContent from "@/components/pages/AboutUsContent";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";

export function generateMetadata(): Metadata {
  const { metadata } = getNamespaceCopy(undefined, "pages").about;
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// TEST-WAIVER: Route shell stitches localized copy into tested visual components. Duplicate rendering tests would add little signal.
export default async function AboutUsPage() {
  const locale = await getRequestLocale();
  const pageCopy = getNamespaceCopy(locale, "pages").about;
  const withLocalePath = createLocalePath();

  return <AboutUsContent copy={pageCopy} ctaHref={withLocalePath(pageCopy.cta.href)} />;
}
