import type { Metadata } from "next";
import HelpPageShell from "@components/help/HelpPageShell";
import { routes } from "@config/routes";
import { createLocalePath } from "@/utils/createLocalePath";
import KpiDashboardContent from "./KpiDashboardContent";

export const metadata: Metadata = {
  title: "Help KPI Dashboard | Coello Help",
  description:
    "Live analytics for contact and return flows so the concierge team can tune response speed.",
};

// TEST-WAIVER: Shell-only server component; KPI visuals live in separately tested client content.
export default function HelpKpiDashboardPage() {
  const withLocalePath = createLocalePath();

  return (
    <HelpPageShell
      title="Help KPI dashboard"
      description="Monitor conversions and response times for concierge and return flows in real time."
      breadcrumb={[
        { title: "Help Centre", href: withLocalePath(routes.help) },
        { title: "KPI dashboard" },
      ]}
    >
      <KpiDashboardContent />
    </HelpPageShell>
  );
}
