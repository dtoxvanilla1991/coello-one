import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";
import FAQContent from "./FAQContent";

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpFaq");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Route shell renders FAQContent (covered in future locales) and static metadata only.
export default async function FAQPage() {
  const locale = await getRequestLocale();
  const withLocalePath = createLocalePath();
  const faqCopy = getNamespaceCopy(locale, "helpFaq");

  return (
    <HelpPageShell
      title={faqCopy.title}
      description={faqCopy.description}
      breadcrumb={[
        { title: faqCopy.breadcrumbLabel, href: withLocalePath("help") },
        { title: faqCopy.title },
      ]}
    >
      <FAQContent />
    </HelpPageShell>
  );
}
