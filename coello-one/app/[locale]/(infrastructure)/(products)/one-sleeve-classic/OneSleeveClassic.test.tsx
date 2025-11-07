import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, expect } from "bun:test";
import { resetNavigationMocks, setNavigationState } from "@test-utils/navigation";
import OneSleeveClassic from "./OneSleeveClassic";

describe("OneSleeveClassic", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({
      locale: "en-GB",
      pathname: "/en-GB/products/one-sleeve-classic",
      params: { locale: "en-GB" },
      searchParams: new URLSearchParams(),
    });
  });

  it("renders the product name and price", () => {
    render(<OneSleeveClassic />);
    expect(
      screen.getByRole("heading", { level: 2, name: "One Sleeve Classic" })
    ).toBeTruthy();
  expect(screen.getByText("£45.00")).toBeTruthy();
  });

  it("hydrates defaults from configuration", () => {
    render(<OneSleeveClassic />);
    expect(screen.getByText(/COLOR:/).textContent).toMatch(/Gray/);
    const mediumSizeButton = screen.getByRole("radio", { name: "Size M" });
    expect(mediumSizeButton.getAttribute("aria-checked")).toBe("true");
  });

  it("changes the main image when a thumbnail is clicked", () => {
    render(<OneSleeveClassic />);
    const secondThumbnail = screen.getByAltText(
      "One Sleeve Classic thumbnail 2"
    );
    fireEvent.click(secondThumbnail);
    const mainImage = screen.getByAltText(
      "One Sleeve Classic"
    ) as HTMLImageElement;
    expect(mainImage.getAttribute("src") || "").toContain(
      "main-secondary-2.jpg"
    );
  });

  it("updates the selected color when a color radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const seaBlueButton = screen.getByRole("radio", {
      name: "Color Sea Blue",
    });
    fireEvent.click(seaBlueButton);
    expect(screen.getByText(/COLOR:/).textContent).toMatch(/Sea Blue/);
  });

  it("updates the selected size when a size radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const largeSizeButton = screen.getByRole("radio", { name: "Size L" });
    fireEvent.click(largeSizeButton);
    expect(largeSizeButton.getAttribute("aria-checked")).toBe("true");
  });

  it("allows switching between male and female fits", () => {
    render(<OneSleeveClassic />);
    const femaleFitButton = screen.getByRole("radio", { name: /Female/ });
    fireEvent.click(femaleFitButton);
    expect(screen.getByRole("radio", { name: "Color Mild Red" })).toBeTruthy();
  });

  it("opens a size guide modal when requested", async () => {
    render(<OneSleeveClassic />);
    const sizeGuideTrigger = screen.getByRole("button", { name: /Size Guide/ });
    fireEvent.click(sizeGuideTrigger);

    await waitFor(() => {
      expect(screen.getByText(/Chest \(cm\)/)).toBeTruthy();
    });
  });
});
