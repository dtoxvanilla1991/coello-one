import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { Featured } from "./Featured";

describe("Featured", () => {
  it("should render the featured section", () => {
    render(<Featured />);
    expect(screen.getByRole("region", { name: /Featured/i })).toBeTruthy();
  });

  it("should render the title", () => {
    render(<Featured />);
    const heading = screen.getByRole("heading", {
      level: 4,
      name: /Featured/i,
    });
    expect(heading.textContent).toBe("Featured");
  });

  it("should render 4 cards", () => {
    render(<Featured />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(4);
  });
});
