import { render, screen } from "@testing-library/react";
import Training from "./Training";
import { describe, it, expect } from "bun:test";
import { getTestTranslations } from "@test-utils/translations";

const HOME_COPY = getTestTranslations("home");
const TRAINING_COPY = HOME_COPY.training;

describe("Training", () => {
  it("should render the training section", () => {
    render(<Training />);
    expect(screen.getByRole("region", { name: TRAINING_COPY.title })).toBeTruthy();
  });

  it("should render the title", () => {
    render(<Training />);
    const heading = screen.getByRole("heading", {
      level: 4,
      name: TRAINING_COPY.title,
    });
    expect(heading.textContent).toBe(TRAINING_COPY.title);
  });

  it("should render 3 cards", () => {
    render(<Training />);
    const list = screen.getByRole("list", { name: TRAINING_COPY.ariaLabel });
    const topLevelCards = list.querySelectorAll(':scope > [role="listitem"]');
    expect(topLevelCards).toHaveLength(3);
  });

  it("should render the card buttons", () => {
    render(<Training />);
    const buttons = screen.getAllByRole("button", { name: TRAINING_COPY.buttonLabel });
    expect(buttons).toHaveLength(3);
  });
});
