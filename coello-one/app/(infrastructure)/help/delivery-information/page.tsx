import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";
import { DeliveryInformationContent } from "./DeliveryInformationContent";

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpDelivery");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Route shell defers behavior to DeliveryInformationContent and createLocalePath, both covered in tests.
export default async function DeliveryInformationPage() {
  const locale = await getRequestLocale();
  const withLocalePath = createLocalePath();
  const copy = getNamespaceCopy(locale, "helpDelivery");

  return (
    <HelpPageShell
      title={copy.title}
      description={copy.description}
      breadcrumb={[
        { title: copy.breadcrumbLabel, href: withLocalePath("help") },
        { title: copy.title },
      ]}
    >
      <DeliveryInformationContent />
    </HelpPageShell>
  );
}
