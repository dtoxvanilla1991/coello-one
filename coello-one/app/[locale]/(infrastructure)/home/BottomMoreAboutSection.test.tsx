import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BottomMoreAboutSection from "./BottomMoreAboutSection";

describe("BottomMoreAboutSection", () => {
  it("should render the bottom more about section", () => {
    const { container } = render(<BottomMoreAboutSection />);
    expect(
      container.querySelector('[data-testid="bottom-more-about-section"]')
    ).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<BottomMoreAboutSection />);
    expect(
      (
        container.querySelector(
          '[data-testid="bottom-more-about-section-title"]'
        ) as HTMLElement
      ).textContent
    ).toBe("More about Coello One");
  });

  it("should render 3 cards", () => {
    const { container } = render(<BottomMoreAboutSection />);
    expect(
      container.querySelector(
        '[data-testid="bottom-more-about-section-card-0"]'
      )
    ).toBeTruthy();
    expect(
      container.querySelector(
        '[data-testid="bottom-more-about-section-card-1"]'
      )
    ).toBeTruthy();
    expect(
      container.querySelector(
        '[data-testid="bottom-more-about-section-card-2"]'
      )
    ).toBeTruthy();
  });
});
