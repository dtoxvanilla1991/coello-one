import { render } from "@testing-library/react";
import Training from "./Training";
import { describe, it, expect } from "bun:test";

describe("Training", () => {
  it("should render the training section", () => {
    const { container } = render(<Training />);
    expect(
      container.querySelector('[data-testid="training-section"]')
    ).toBeTruthy();
  });

  it("should render the title", () => {
    const { container } = render(<Training />);
    expect(
      (
        container.querySelector(
          '[data-testid="training-section-title"]'
        ) as HTMLElement
      ).textContent
    ).toBe("Our athletes workouts");
  });

  it("should render 3 cards", () => {
    const { container } = render(<Training />);
    expect(
      container.querySelector('[data-testid="training-section-card-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="training-section-card-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="training-section-card-2"]')
    ).toBeTruthy();
  });

  it("should render the card buttons", () => {
    const { container } = render(<Training />);
    expect(
      container.querySelector('[data-testid="training-section-card-button-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="training-section-card-button-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="training-section-card-button-2"]')
    ).toBeTruthy();
  });
});
