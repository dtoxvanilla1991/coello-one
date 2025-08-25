import { render } from "@testing-library/react";
import BrandListings from "./BrandListings";

describe("BrandListings", () => {
  it("should render the brand listings", () => {
    const { container } = render(<BrandListings />);
    expect(
      container.querySelector('[data-testid="brand-listings"]')
    ).toBeTruthy();
  });

  it("should render the women's line listing", () => {
    const { container } = render(<BrandListings />);
    expect(
      container.querySelector('[data-testid="women-s-line-listing"]')
    ).toBeTruthy();
  });

  it("should render the men's line listing", () => {
    const { container } = render(<BrandListings />);
    expect(
      container.querySelector('[data-testid="men-s-line-listing"]')
    ).toBeTruthy();
  });
});
