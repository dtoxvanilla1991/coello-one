import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "Help Centre FAQ | Coello",
  description:
    "Get answers to common Coello questions, from sleeve fit guidance to delivery speeds and returns policies.",
};

type FAQPageProps = {
  params: {
    locale?: string;
  };
};

// TEST-WAIVER: Route shell renders FAQContent (covered in future locales) and static metadata only.
export default function FAQPage({ params }: FAQPageProps) {
  const withLocalePath = createLocalePath(params?.locale);

  return (
    <HelpPageShell
      title="Help Centre FAQ"
      description="Premium answers to the most-requested Coello questions, updated weekly by the concierge team."
      breadcrumb={[{ title: "Help Centre", href: withLocalePath("help") }, { title: "FAQ" }]}
    >
      <FAQContent />
    </HelpPageShell>
  );
}
