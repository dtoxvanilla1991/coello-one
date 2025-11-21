import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import type { DeliveryTier } from "./constants";
import { DELIVERY_MATRIX } from "./constants";

const trackEventMock = mock<(event: string, payload?: unknown) => void>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

const { default: DeliveryCalculator } = await import("./DeliveryCalculator");

describe("DeliveryCalculator", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: shows paid shipping when below the free threshold", async () => {
    render(
      <DeliveryCalculator
        tiers={DELIVERY_MATRIX}
        initialValues={{ region: "United Kingdom", service: "Standard", orderValue: 120 }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /calculate shipping/i }));

    expect(await screen.findByText(/Your shipping is £4.95/i)).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });

  it("integration: unlocks complimentary shipping when the spend meets the threshold", async () => {
    render(
      <DeliveryCalculator
        tiers={DELIVERY_MATRIX}
        initialValues={{ region: "United Kingdom", service: "Standard", orderValue: 250 }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /calculate shipping/i }));

    expect(await screen.findByText(/Your shipping is Complimentary/i)).toBeTruthy();
    expect(await screen.findByText(/Saved £4.95 shipping/i)).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });

  it("shows a helpful error when no tier matches the submitted combination", async () => {
    const limitedTiers: DeliveryTier[] = [];

    render(
      <DeliveryCalculator
        tiers={limitedTiers}
        initialValues={{ region: "United Kingdom", service: "Standard", orderValue: 10 }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /calculate shipping/i }));

    expect(
      await screen.findByText(/We do not currently ship that combination—choose another option./i),
    ).toBeTruthy();
    expect(trackEventMock).not.toHaveBeenCalled();
  });
});
