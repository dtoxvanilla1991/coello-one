import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import OneSleeveClassic from "./OneSleeveClassic";

describe("OneSleeveClassic", () => {
  it("renders the product name and price", () => {
    render(<OneSleeveClassic />);
    expect(
      screen.getByRole("heading", { level: 2, name: "One Sleeve Classic" })
    ).toBeTruthy();
    expect(screen.getByText("$45.00")).toBeTruthy();
  });

  it("changes the main image when a thumbnail is clicked", () => {
    render(<OneSleeveClassic />);
    const secondThumbnail = screen.getByAltText(
      "One Sleeve Classic thumbnail 2"
    );
    fireEvent.click(secondThumbnail);
    const mainImage = screen.getByAltText("One Sleeve Classic") as HTMLImageElement;
    expect(mainImage.getAttribute("src") || "").toContain(
      "main-secondary-2.jpg"
    );
  });

  it("updates the selected color when a color radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const grayColorButton = screen.getByRole("radio", {
      name: "Color Gray",
    });
    fireEvent.click(grayColorButton);
    expect(screen.getByText(/COLOR:/).textContent).toMatch(/Gray/);
  });

  it("updates the selected size when a size radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const largeSizeButton = screen.getByRole("radio", { name: "Size L" });
    fireEvent.click(largeSizeButton);
    expect(largeSizeButton.getAttribute("aria-checked")).toBe("true");
  });
});
