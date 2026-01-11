import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, expect } from "bun:test";
import { resetNavigationMocks, setNavigationState } from "@test-utils/navigation";
import OneSleeveClassic from "./OneSleeveClassic";

describe("OneSleeveClassic", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({
      pathname: "/products/one-sleeve-classic",
      searchParams: new URLSearchParams(),
    });
  });

  it("renders the product name and price", () => {
    render(<OneSleeveClassic />);
    expect(screen.getByRole("heading", { level: 2, name: "One Sleeve Classic" })).toBeTruthy();
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
    const secondThumbnail = screen.getByAltText("One Sleeve Classic thumbnail 2");
    fireEvent.click(secondThumbnail);
    const mainImage = screen.getByAltText("One Sleeve Classic") as HTMLImageElement;
    expect(mainImage.getAttribute("src") || "").toContain("coello_one_classic_gray_back.png");
  });

  it("updates the selected color when a color radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const seaBlueButton = screen.getByRole("radio", {
      name: "Color Sea Blue",
    });
    fireEvent.click(seaBlueButton);
    expect(screen.getByText(/COLOR:/).textContent).toMatch(/Sea Blue/);

    const mainImage = screen.getByAltText("One Sleeve Classic") as HTMLImageElement;
    expect(mainImage.getAttribute("src") || "").toContain("coello_one_classic_blue_front.png");

    const thumb1 = screen.getByAltText("One Sleeve Classic thumbnail 1") as HTMLImageElement;
    const thumb2 = screen.getByAltText("One Sleeve Classic thumbnail 2") as HTMLImageElement;
    const thumb3 = screen.getByAltText("One Sleeve Classic thumbnail 3") as HTMLImageElement;

    expect(thumb1.getAttribute("src") || "").toContain("coello_one_classic_blue_front.png");
    expect(thumb2.getAttribute("src") || "").toContain("coello_one_classic_blue_back.png");
    expect(thumb3.getAttribute("src") || "").toContain("coello_one_classic_blue_side.png");
  });

  it("updates the image gallery when Mild Red is selected", () => {
    render(<OneSleeveClassic />);
    const mildRedButton = screen.getByRole("radio", {
      name: "Color Mild Red",
    });
    fireEvent.click(mildRedButton);
    expect(screen.getByText(/COLOR:/).textContent).toMatch(/Mild Red/);

    const mainImage = screen.getByAltText("One Sleeve Classic") as HTMLImageElement;
    expect(mainImage.getAttribute("src") || "").toContain("coello_one_classic_red_front.png");

    const thumb1 = screen.getByAltText("One Sleeve Classic thumbnail 1") as HTMLImageElement;
    const thumb2 = screen.getByAltText("One Sleeve Classic thumbnail 2") as HTMLImageElement;
    const thumb3 = screen.getByAltText("One Sleeve Classic thumbnail 3") as HTMLImageElement;

    expect(thumb1.getAttribute("src") || "").toContain("coello_one_classic_red_front.png");
    expect(thumb2.getAttribute("src") || "").toContain("coello_one_classic_red_back.png");
    expect(thumb3.getAttribute("src") || "").toContain("coello_one_classic_red_side.png");
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
