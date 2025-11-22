import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { createLocalePath } from "@/utils/createLocalePath";
import InternationalOrdersContent from "./InternationalOrdersContent";

export const metadata: Metadata = {
  title: "International Orders | Coello Help",
  description:
    "Learn how Coello handles duties, currency conversion, and tracking for international one-sleeve orders.",
};

// TEST-WAIVER: Declarative route shell that reuses static datasets; dedicated tests would duplicate component coverage.
export default function InternationalOrdersPage() {
  const withLocalePath = createLocalePath();
  const contactHref = withLocalePath(routes.helpContactUs);

  return (
    <HelpPageShell
      title="Ordering internationally"
      description="We designed a global fulfilment network so your one-sleeve arrives fast, insured, and duty-paid."
      breadcrumb={[
        { title: "Help Centre", href: withLocalePath(routes.help) },
        { title: "International orders" },
      ]}
    >
      <InternationalOrdersContent contactHref={contactHref} />
    </HelpPageShell>
  );
}
