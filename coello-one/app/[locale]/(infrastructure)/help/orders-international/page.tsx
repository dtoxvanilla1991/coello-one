import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";
import InternationalOrdersContent from "./InternationalOrdersContent";

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpOrdersInternational");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Declarative route shell that reuses localized datasets; dedicated tests would duplicate component coverage.
export default async function InternationalOrdersPage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "helpOrdersInternational");
  const withLocalePath = createLocalePath();
  const contactHref = withLocalePath(routes.helpContactUs);

  return (
    <HelpPageShell
      title={copy.title}
      description={copy.description}
      breadcrumb={[
        { title: copy.breadcrumbLabel, href: withLocalePath(routes.help) },
        { title: copy.title },
      ]}
    >
      <InternationalOrdersContent contactHref={contactHref} />
    </HelpPageShell>
  );
}
