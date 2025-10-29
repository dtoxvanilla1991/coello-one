import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BrandListings from "./BrandListings";

describe("BrandListings", () => {
  it("should render the brand listings", () => {
    render(<BrandListings />);
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThanOrEqual(2);
  });

  it("should render the women's line listing", () => {
    render(<BrandListings />);
    const womensHeading = screen.getByRole("heading", {
      level: 5,
      name: /women's line/i,
    });
    const womensList = womensHeading.nextElementSibling as HTMLElement;
    expect(within(womensList).getByText("Women's Passion")).toBeTruthy();
  });

  it("should render the men's line listing", () => {
    render(<BrandListings />);
    const mensHeading = screen.getByRole("heading", {
      level: 5,
      name: /men's line/i,
    });
    const mensList = mensHeading.nextElementSibling as HTMLElement;
    expect(within(mensList).getByText("Mens's Passion")).toBeTruthy();
  });
});
