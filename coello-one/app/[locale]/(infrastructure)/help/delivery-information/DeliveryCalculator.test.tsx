import { beforeEach, describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import type { DeliveryTier } from "./constants";
import { DELIVERY_MATRIX } from "./constants";
import { trackEventMock } from "@test-utils/trackEventMock";
import { clickWithAct } from "@test-utils/clickWithAct";

const { default: DeliveryCalculator } = await import("./DeliveryCalculator");

describe("DeliveryCalculator", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: shows paid shipping when below the free threshold", async () => {
    render(
      <DeliveryCalculator
        tiers={DELIVERY_MATRIX}
        initialValues={{ region: "United Kingdom", service: "Standard", orderValue: 10 }}
      />,
    );

    await clickWithAct(screen.getByRole("button", { name: /calculate shipping/i }));

    expect(
      await screen.findByText("Your shipping is £4.95", {
        selector: ".ant-result-title",
      }),
    ).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });

  it("integration: unlocks complimentary shipping when the spend meets the threshold", async () => {
    render(
      <DeliveryCalculator
        tiers={DELIVERY_MATRIX}
        initialValues={{ region: "United Kingdom", service: "Standard", orderValue: 250 }}
      />,
    );

    await clickWithAct(screen.getByRole("button", { name: /calculate shipping/i }));

    expect(
      await screen.findByText("Your shipping is Complimentary", {
        selector: ".ant-result-title",
      }),
    ).toBeTruthy();
    expect(await screen.findByText("Saved £4.95 shipping with your spend.")).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });

  it("shows a helpful error when no tier matches the submitted combination", async () => {
    const limitedTiers: DeliveryTier[] = [
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
      {
        id: "eu-express",
        region: "European Union",
        service: "Express",
        eta: "2-3 business days",
        cutoff: "Order before 18:00 CET",
        displayCost: "€19.00",
        costValue: 19,
        currency: "EUR",
      },
    ];

    render(
      <DeliveryCalculator
        tiers={limitedTiers}
        initialValues={{ region: "European Union", service: "Standard", orderValue: 10 }}
      />,
    );

    await clickWithAct(screen.getByRole("button", { name: /calculate shipping/i }));

    expect(
      await screen.findByText(/We do not currently ship that combination—choose another option./i),
    ).toBeTruthy();
    expect(trackEventMock).not.toHaveBeenCalled();
  });
});
