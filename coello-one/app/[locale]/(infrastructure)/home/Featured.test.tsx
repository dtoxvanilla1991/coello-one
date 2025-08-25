import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { Featured } from "./Featured";

describe("Featured", () => {
  it("should render the featured section", () => {
    const { container } = render(<Featured />);
    expect(
      container.querySelector('[data-testid="featured-section"]')
    ).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<Featured />);
    expect(
      (
        container.querySelector(
          '[data-testid="featured-section-title"]'
        ) as HTMLElement
      ).textContent
    ).toBe("Featured");
  });

  it("should render 4 cards", () => {
    const { container } = render(<Featured />);
    expect(
      container.querySelector('[data-testid="featured-section-card-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="featured-section-card-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="featured-section-card-2"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="featured-section-card-3"]')
    ).toBeTruthy();
  });
});
