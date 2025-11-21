import { render, screen } from "@testing-library/react";
import Training from "./Training";
import { describe, it, expect } from "bun:test";

describe("Training", () => {
  it("should render the training section", () => {
    render(<Training />);
    expect(screen.getByRole("region", { name: /Our athletes workouts/i })).toBeTruthy();
  });

  it("should render the title", () => {
    render(<Training />);
    const heading = screen.getByRole("heading", {
      level: 4,
      name: /Our athletes workouts/i,
    });
    expect(heading.textContent).toBe("Our athletes workouts");
  });

  it("should render 3 cards", () => {
    render(<Training />);
    const list = screen.getByRole("list", { name: /Training plans/i });
    const topLevelCards = list.querySelectorAll(':scope > [role="listitem"]');
    expect(topLevelCards).toHaveLength(3);
  });

  it("should render the card buttons", () => {
    render(<Training />);
    const buttons = screen.getAllByRole("button", { name: /View weekly plan/i });
    expect(buttons).toHaveLength(3);
  });
});
