import { render } from "@testing-library/react";
import { PromoSection } from "./PromoSection";
import { describe, it, expect } from "bun:test";

describe("PromoSection", () => {
  it("should render the promo section", () => {
    const { container } = render(<PromoSection />);
    expect(
      container.querySelector('[data-testid="promo-section"]')
    ).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<PromoSection />);
    expect(
      container.querySelector('[data-testid="promo-section-title"]')
    ).toBeTruthy();
  });

  it("should render the text", () => {
    const { container } = render(<PromoSection />);
    expect(
      container.querySelector('[data-testid="promo-section-text"]')
    ).toBeTruthy();
  });

  it("should render the button", () => {
    const { container } = render(<PromoSection />);
    expect(
      container.querySelector('[data-testid="promo-section-button"]')
    ).toBeTruthy();
  });
});
