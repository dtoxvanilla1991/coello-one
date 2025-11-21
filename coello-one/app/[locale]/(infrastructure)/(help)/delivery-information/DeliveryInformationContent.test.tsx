import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { DeliveryInformationContent } from "./DeliveryInformationContent";
import type { DeliveryTier, DeliveryPromise, DutyInsight, PackingStep } from "./constants";

const tiers: DeliveryTier[] = [
  {
    id: "uk-standard",
    region: "United Kingdom",
    service: "Standard",
    eta: "1-3 business days",
    cutoff: "Order before 4pm GMT",
    displayCost: "£4.95",
    costValue: 4.95,
    currency: "GBP",
  },
];

const promises: DeliveryPromise[] = [
  { title: "Fast", description: "Lightning fast shipping" },
];

const packingSteps: PackingStep[] = [
  { title: "Pick", description: "Warehouse pick" },
];

const dutyInsights: DutyInsight[] = [
  { market: "EU", detail: "No duties" },
];

describe("DeliveryInformationContent", () => {
  it("unit: renders the calculator, matrix, and promises", () => {
    render(
      <DeliveryInformationContent
        tiers={tiers}
        promises={promises}
        packingSteps={packingSteps}
        dutyInsights={dutyInsights}
      />,
    );

    expect(screen.getByText(/Delivery cost calculator/i)).toBeTruthy();
    expect(screen.getByText(/Shipping speeds at a glance/i)).toBeTruthy();
    expect(screen.getByRole("heading", { level: 4, name: /Fast/i })).toBeTruthy();
  });
});
