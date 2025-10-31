import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import PopularSection from "./PopularSection";

describe("PopularSection", () => {
  it("should render the popular section", () => {
    render(<PopularSection />);
    expect(
      screen.getByRole("region", { name: /Popular right now/i })
    ).toBeTruthy();
  });

  it("should render the title", () => {
    render(<PopularSection />);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: /Popular right now/i,
    });
    expect(heading.textContent).toBe("Popular right now");
  });

  it("should render the women and men buttons", () => {
    render(<PopularSection />);
  expect(screen.getByLabelText(/Show popular women's items/i)).toBeTruthy();
  expect(screen.getByLabelText(/Show popular men's items/i)).toBeTruthy();
  });

  it("should render 3 cards", () => {
    render(<PopularSection />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(3);
  });

  it("should render the card buttons", () => {
    render(<PopularSection />);
    const buttons = screen.getAllByRole("button", { name: /Browse options/i });
    expect(buttons).toHaveLength(3);
  });
});
