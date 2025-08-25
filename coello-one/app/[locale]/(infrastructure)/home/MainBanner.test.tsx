import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { MainBanner } from "./MainBanner";

describe("MainBanner", () => {
  it("should render the main banner", () => {
    const { container } = render(<MainBanner />);
    expect(container.querySelector('[data-testid="main-banner"]')).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<MainBanner />);
    expect(
      (
        container.querySelector(
          '[data-testid="main-banner-title"]'
        ) as HTMLElement
      ).textContent
    ).toBe("NOW YOU TRULY STAND OUT.");
  });

  it("should render the shop now button", () => {
    const { container } = render(<MainBanner />);
    expect(
      container.querySelector('[data-testid="main-banner-shop-now-button"]')
    ).toBeTruthy();
  });
});
