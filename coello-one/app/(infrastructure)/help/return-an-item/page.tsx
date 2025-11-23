import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { createLocalePath } from "@/utils/createLocalePath";
import ReturnAnItemContent from "./ReturnAnItemContent";

export const metadata: Metadata = {
  title: "Return an Item | Coello Help",
  description:
    "Start a return or exchange for your Coello one-sleeve essential in a few quick steps.",
};

// TEST-WAIVER: Route shell simply wraps ReturnRequestForm (which is tested) plus static copy.
export default function ReturnAnItemPage() {
  const withLocalePath = createLocalePath();
  const contactHref = withLocalePath(routes.helpContactUs);

  return (
    <HelpPageShell
      title="Return or exchange an item"
      description="Log your return, print a label, and choose between refund, exchange, or instant credit."
      breadcrumb={[
        { title: "Help Centre", href: withLocalePath(routes.help) },
        { title: "Return an item" },
      ]}
    >
      <ReturnAnItemContent contactHref={contactHref} />
    </HelpPageShell>
  );
}
