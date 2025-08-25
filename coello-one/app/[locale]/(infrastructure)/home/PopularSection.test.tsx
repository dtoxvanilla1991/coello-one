import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import PopularSection from "./PopularSection";

describe("PopularSection", () => {
  it("should render the popular section", () => {
    const { container } = render(<PopularSection />);
    expect(
      container.querySelector('[data-testid="popular-section"]')
    ).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<PopularSection />);
    expect(
      (
        container.querySelector(
          '[data-testid="popular-section-title"]'
        ) as HTMLElement
      ).textContent
    ).toBe("Popular right now");
  });

  it("should render the women and men buttons", () => {
    const { container } = render(<PopularSection />);
    expect(
      container.querySelector('[data-testid="popular-section-women-button"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="popular-section-men-button"]')
    ).toBeTruthy();
  });

  it("should render 3 cards", () => {
    const { container } = render(<PopularSection />);
    expect(
      container.querySelector('[data-testid="popular-section-card-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="popular-section-card-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="popular-section-card-2"]')
    ).toBeTruthy();
  });

  it("should render the card buttons", () => {
    const { container } = render(<PopularSection />);
    expect(
      container.querySelector('[data-testid="popular-section-card-button-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="popular-section-card-button-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="popular-section-card-button-2"]')
    ).toBeTruthy();
  });
});
