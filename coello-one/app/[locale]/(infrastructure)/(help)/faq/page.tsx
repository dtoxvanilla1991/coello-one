import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { getNamespaceCopy } from "@/localization/dictionary";
import { createLocalePath } from "@/utils/createLocalePath";
import FAQContent from "./FAQContent";

type FAQPageProps = {
  params: {
    locale?: string;
  };
};

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const copy = getNamespaceCopy(params?.locale, "helpFaq");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Route shell renders FAQContent (covered in future locales) and static metadata only.
export default function FAQPage({ params }: FAQPageProps) {
  const withLocalePath = createLocalePath(params?.locale);
  const faqCopy = getNamespaceCopy(params?.locale, "helpFaq");

  return (
    <HelpPageShell
      title={faqCopy.title}
      description={faqCopy.description}
      breadcrumb={[{ title: faqCopy.breadcrumbLabel, href: withLocalePath("help") }, { title: faqCopy.title }]}
    >
      <FAQContent />
    </HelpPageShell>
  );
}
