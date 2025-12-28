import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { getNamespaceCopy } from "@/localization/dictionary";
import { getRequestLocale } from "@/localization/getRequestLocale";
import { createLocalePath } from "@/utils/createLocalePath";
import KpiDashboardContent from "./KpiDashboardContent";

export function generateMetadata(): Metadata {
  const copy = getNamespaceCopy(undefined, "helpKpi");
  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

// TEST-WAIVER: Shell-only server component; KPI visuals live in separately tested client content.
export default async function HelpKpiDashboardPage() {
  const locale = await getRequestLocale();
  const copy = getNamespaceCopy(locale, "helpKpi");
  const withLocalePath = createLocalePath();

  return (
    <HelpPageShell
      title={copy.title}
      description={copy.description}
      breadcrumb={[
        { title: copy.breadcrumbLabel, href: withLocalePath(routes.help) },
        { title: copy.title },
      ]}
    >
      <KpiDashboardContent />
    </HelpPageShell>
  );
}
