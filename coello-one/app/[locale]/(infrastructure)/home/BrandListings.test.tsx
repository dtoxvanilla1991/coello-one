import { render, screen } from "@testing-library/react";
import BrandListings from "./BrandListings";

describe("BrandListings", () => {
  it("should render the brand listings", () => {
    render(<BrandListings />);
    expect(screen.getByTestId("brand-listings")).toBeInTheDocument();
  });

  it("should render the women's line listing", () => {
    render(<BrandListings />);
    expect(screen.getByTestId("women-s-line-listing")).toBeInTheDocument();
  });

  it("should render the men's line listing", () => {
    render(<BrandListings />);
    expect(screen.getByTestId("men-s-line-listing")).toBeInTheDocument();
  });
});
