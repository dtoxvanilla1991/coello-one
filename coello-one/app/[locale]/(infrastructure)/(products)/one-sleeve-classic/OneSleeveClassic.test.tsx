import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import OneSleeveClassic from "./OneSleeveClassic";

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ""} />;
  },
}));

describe("OneSleeveClassic", () => {
  it("renders the product name and price", () => {
    render(<OneSleeveClassic />);
    expect(screen.getByText("One Sleeve Classic")).toBeInTheDocument();
    expect(screen.getByText("$45.00")).toBeInTheDocument();
  });

  it("changes the main image when a thumbnail is clicked", () => {
    render(<OneSleeveClassic />);
    const imageElements = screen.getAllByRole("img");
    // The first image is the main one, the rest are thumbnails
    const secondThumbnailWrapper = imageElements[2].parentElement; // The clickable div

    if (secondThumbnailWrapper) {
      fireEvent.click(secondThumbnailWrapper);
    }

    const mainImage = screen.getAllByRole("img")[0] as HTMLImageElement;
    expect(mainImage.src).toContain("main-secondary-2.jpg");
  });

  it("updates the selected color when a color radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const whiteColorButton = screen.getByDisplayValue("White");

    fireEvent.click(whiteColorButton);

    expect(screen.getByText(/COLOR: White/)).toBeInTheDocument();
  });

  it("updates the selected size when a size radio button is clicked", () => {
    render(<OneSleeveClassic />);
    const largeSizeButton = screen.getByRole("radio", { name: "L" });

    fireEvent.click(largeSizeButton);

    const sizeRadio = screen.getByRole("radio", {
      name: "L",
    }) as HTMLInputElement;
    expect(sizeRadio.checked).toBe(true);
  });
});
