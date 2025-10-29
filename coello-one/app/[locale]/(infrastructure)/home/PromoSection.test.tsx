import { render, screen } from "@testing-library/react";
import { PromoSection } from "./PromoSection";
import { describe, it, expect } from "bun:test";

describe("PromoSection", () => {
  it("should render the promo section", () => {
    render(<PromoSection />);
    expect(
      screen.getByRole("region", { name: /Limited Time Offer/i })
    ).toBeTruthy();
  });

  it("should render the title", () => {
    render(<PromoSection />);
    expect(
      screen.getByRole("heading", { level: 5, name: /Limited Time Offer/i })
    ).toBeTruthy();
  });

  it("should render the text", () => {
    render(<PromoSection />);
    expect(screen.getByText(/Up to 20% off select items/i)).toBeTruthy();
  });

  it("should render the button", () => {
    render(<PromoSection />);
    expect(screen.getByRole("button", { name: /Shop Now/i })).toBeTruthy();
  });
});
