import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { createLocalePath } from "@/utils/createLocalePath";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us | Coello Help",
  description: "Reach the Coello concierge team for styling advice, order support, or partnership enquiries.",
};

// TEST-WAIVER: This Next.js route shell only composes tested child components (ContactForm) and static content.
export default function ContactPage() {
  const withLocalePath = createLocalePath();
  const faqHref = withLocalePath(routes.helpFaq);

  return (
    <HelpPageShell
      title="Speak with Coello"
      description="Our concierge advisors love solving fit, styling, and training questions. Choose the channel that suits you best."
      breadcrumb={[{ title: "Help Centre", href: withLocalePath(routes.help) }, { title: "Contact" }]}
    >
      <ContactPageContent faqHref={faqHref} />
    </HelpPageShell>
  );
}
