import { render } from "@testing-library/react";
import SalesBlock from "./SalesBlock";
import { describe, it, expect } from "bun:test";

describe("SalesBlock", () => {
  it("should render the sales block", () => {
    const { container } = render(<SalesBlock />);
    expect(container.querySelector('[data-testid="sales-block"]')).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<SalesBlock />);
    expect(
      (
        container.querySelector(
          '[data-testid="sales-block-title"]'
        ) as HTMLElement
      ).textContent
    ).toBe("GET AN EXTRA 10% OFF SALE ITEMS");
  });

  it("should render the text", () => {
    const { container } = render(<SalesBlock />);
    expect(
      (
        container.querySelector(
          '[data-testid="sales-block-text"]'
        ) as HTMLElement
      ).textContent
    ).toBe("Drop code extra10 and thank us with a tagged photo in the gym");
  });

  it("should render the women and men buttons", () => {
    const { container } = render(<SalesBlock />);
    expect(
      container.querySelector('[data-testid="sales-block-women-button"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="sales-block-men-button"]')
    ).toBeTruthy();
  });
});
