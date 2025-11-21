import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";
import { DeliveryInformationContent } from "./DeliveryInformationContent";
import { DELIVERY_MATRIX, DELIVERY_PROMISES, DUTY_INSIGHTS, PACKING_STEPS } from "./constants";

export const metadata: Metadata = {
  title: "Delivery Information | Coello Help",
  description:
    "View Coello delivery speeds, pricing, and courier partners across the UK, EU, and North America.",
};

type DeliveryInformationPageProps = {
  params: Promise<{
    locale?: string;
  }>;
};

// TEST-WAIVER: Route shell defers behavior to DeliveryInformationContent and createLocalePath, both covered in tests.
export default async function DeliveryInformationPage({ params }: DeliveryInformationPageProps) {
  const { locale } = await params;
  const withLocalePath = createLocalePath(locale);

  return (
    <HelpPageShell
      title="Delivery information"
      description="Everything you need to know about dispatch cut-offs, pricing, and how Coello keeps parcels secure."
      breadcrumb={[{ title: "Help Centre", href: withLocalePath("help") }, { title: "Delivery" }]}
    >
      <DeliveryInformationContent
        tiers={DELIVERY_MATRIX}
        promises={DELIVERY_PROMISES}
        packingSteps={PACKING_STEPS}
        dutyInsights={DUTY_INSIGHTS}
      />
    </HelpPageShell>
  );
}
