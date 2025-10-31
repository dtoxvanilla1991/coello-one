import { render, screen } from "@testing-library/react";
import SalesBlock from "./SalesBlock";
import { describe, it, expect } from "bun:test";

describe("SalesBlock", () => {
  it("should render the sales block", () => {
    render(<SalesBlock />);
    expect(
      screen.getByRole("region", { name: /GET AN EXTRA 10% OFF SALE ITEMS/i })
    ).toBeTruthy();
  });

  it("should render the title", () => {
    render(<SalesBlock />);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: /GET AN EXTRA 10% OFF SALE ITEMS/i,
    });
    expect(heading.textContent).toBe("GET AN EXTRA 10% OFF SALE ITEMS");
  });

  it("should render the text", () => {
    render(<SalesBlock />);
    expect(
      screen.getByText(
        /Drop code extra10 and thank us with a tagged photo in the gym/i
      )
    ).toBeTruthy();
  });

  it("should render the women and men buttons", () => {
    render(<SalesBlock />);
    expect(screen.getByRole("button", { name: /Shop women/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Shop men/i })).toBeTruthy();
  });
});
