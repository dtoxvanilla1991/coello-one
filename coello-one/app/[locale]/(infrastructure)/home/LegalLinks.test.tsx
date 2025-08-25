import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import LegalLinks from "./LegalLinks";

describe("LegalLinks", () => {
  it("should render the legal links", () => {
    const { container } = render(<LegalLinks />);
    expect(container.querySelector('[data-testid="legal-links"]')).toBeTruthy();
  });

  it("should render 4 links", () => {
    const { container } = render(<LegalLinks />);
    expect(
      container.querySelector('[data-testid="legal-links-item-0"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="legal-links-item-1"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="legal-links-item-2"]')
    ).toBeTruthy();
    expect(
      container.querySelector('[data-testid="legal-links-item-3"]')
    ).toBeTruthy();
  });
});
