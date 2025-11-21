import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { getNamespaceCopy } from "@/localization/dictionary";
import { createLocalePath } from "@/utils/createLocalePath";
import { DeliveryInformationContent } from "./DeliveryInformationContent";

type DeliveryInformationPageProps = {
  params: Promise<{
    locale?: string;
  }>;
};

export async function generateMetadata({ params }: DeliveryInformationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = getNamespaceCopy(locale, "helpDelivery");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Route shell defers behavior to DeliveryInformationContent and createLocalePath, both covered in tests.
export default async function DeliveryInformationPage({ params }: DeliveryInformationPageProps) {
  const { locale } = await params;
  const withLocalePath = createLocalePath(locale);
  const copy = getNamespaceCopy(locale, "helpDelivery");

  return (
    <HelpPageShell
      title={copy.title}
      description={copy.description}
      breadcrumb={[{ title: copy.breadcrumbLabel, href: withLocalePath("help") }, { title: copy.title }]}
    >
      <DeliveryInformationContent />
    </HelpPageShell>
  );
}
