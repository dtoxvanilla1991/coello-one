import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BottomMoreAboutSection from "./BottomMoreAboutSection";
import { clickWithAct } from "@test-utils/clickWithAct";

describe("BottomMoreAboutSection", () => {
  it("should render the bottom more about section", () => {
    render(<BottomMoreAboutSection />);
    const region = screen.getByRole("region", {
      name: /More about Coello One/i,
    });
    expect(region).toBeTruthy();
  });

  it("should render the title", () => {
    render(<BottomMoreAboutSection />);
    const heading = screen.getByRole("heading", {
      level: 5,
      name: /More about Coello One/i,
    });
    expect(heading.textContent).toBe("More about Coello One");
  });

  it("should render 3 cards", () => {
    render(<BottomMoreAboutSection />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(3);
  });

  it("opens the promo signup modal from the email card", async () => {
    render(<BottomMoreAboutSection />);

    const emailCardLabel = screen.getByText(/Email sign up/i);
    const interactiveCard = emailCardLabel.closest('[role="listitem"]');
    expect(interactiveCard).toBeTruthy();

    await clickWithAct(interactiveCard as HTMLElement);

    expect(await screen.findByRole("dialog", { name: /Reserve your future code/i })).toBeTruthy();
  });
});
