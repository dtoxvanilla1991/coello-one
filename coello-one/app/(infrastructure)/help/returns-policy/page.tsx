import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { createLocalePath } from "@/utils/createLocalePath";
import ReturnsPolicyContent from "./ReturnsPolicyContent";

export const metadata: Metadata = {
  title: "Returns Policy | Coello Help",
  description:
    "Understand Coello's returns window, exchange options, and how refunds are processed.",
};

// TEST-WAIVER: Route shell stitches together static policy content; deeper behavior lives in dedicated forms.
export default function ReturnsPolicyPage() {
  const withLocalePath = createLocalePath();

  return (
    <HelpPageShell
      title="Returns policy"
      description="We engineered the returns flow to be as frictionless as your training session."
      breadcrumb={[{ title: "Help Centre", href: withLocalePath("help") }, { title: "Returns" }]}
    >
      <ReturnsPolicyContent />
    </HelpPageShell>
  );
}
