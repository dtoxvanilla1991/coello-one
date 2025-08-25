import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import OneSleeveClassic from "./OneSleeveClassic";

describe("OneSleeveClassic", () => {
  it("renders the product name and price", () => {
    const { container } = render(<OneSleeveClassic />);
    const name = container.querySelector(
      '[data-testid="product-name"]'
    ) as HTMLElement;
    const price = container.querySelector(
      '[data-testid="product-price"]'
    ) as HTMLElement;
    expect(name?.textContent).toBe("One Sleeve Classic");
    expect(price?.textContent).toBe("$45.00");
  });

  it("changes the main image when a thumbnail is clicked", () => {
    const { container } = render(<OneSleeveClassic />);
    const secondThumbnailWrapper = container.querySelector(
      '[data-testid="thumbnail-2"]'
    ) as HTMLElement | null;
    if (!secondThumbnailWrapper) throw new Error("thumbnail-2 not found");
    fireEvent.click(secondThumbnailWrapper);
    const mainImage = container.querySelector(
      '[data-testid="main-image"]'
    ) as HTMLImageElement;
    expect(mainImage.getAttribute("src") || "").toContain(
      "main-secondary-2.jpg"
    );
  });

  it("updates the selected color when a color radio button is clicked", () => {
    const { container } = render(<OneSleeveClassic />);
    const whiteColorButton = container.querySelector(
      '[data-testid="color-radio-White"]'
    ) as HTMLElement | null;
    if (!whiteColorButton) throw new Error("color-radio-White not found");
    fireEvent.click(whiteColorButton);
    expect(
      (container.querySelector('[data-testid="selected-color"]') as HTMLElement)
        .textContent
    ).toMatch(/COLOR: .*White/);
  });

  it("updates the selected size when a size radio button is clicked", () => {
    const { container } = render(<OneSleeveClassic />);
    const largeSizeButton = container.querySelector(
      '[data-testid="size-radio-L"]'
    ) as HTMLElement | null;
    if (!largeSizeButton) throw new Error("size-radio-L not found");
    fireEvent.click(largeSizeButton);
    // AntD controls the checked state via aria-checked on the button wrapper
    expect(largeSizeButton.getAttribute("aria-checked")).toBe("true");
  });
});
