import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";
import ContactPageContent from "./ContactPageContent";

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpContact");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: This Next.js route shell only composes tested child components (ContactForm) and static content.
export default async function ContactPage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "helpContact");
  const withLocalePath = createLocalePath();
  const faqHref = withLocalePath(routes.helpFaq);

  return (
    <HelpPageShell
      title={copy.title}
      description={copy.description}
      breadcrumb={[
        { title: copy.breadcrumbLabel, href: withLocalePath(routes.help) },
        { title: copy.title },
      ]}
    >
      <ContactPageContent faqHref={faqHref} />
    </HelpPageShell>
  );
}
