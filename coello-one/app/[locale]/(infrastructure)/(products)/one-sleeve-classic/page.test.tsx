import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import OneSleeveClassicPage from "./page";

describe("OneSleeveClassicPage", () => {
  it("renders the OneSleeveClassic component", () => {
    const { container } = render(<OneSleeveClassicPage />);
    expect(
      container.querySelector('[data-testid="product-name"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="product-price"]')
    ).toBeTruthy();
  });
});
