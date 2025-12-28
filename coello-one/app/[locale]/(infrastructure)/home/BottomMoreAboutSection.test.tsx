import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BottomMoreAboutSection from "./BottomMoreAboutSection";
import { clickWithAct } from "@test-utils/clickWithAct";
import { getTestTranslations } from "@test-utils/translations";

const HOME_COPY = getTestTranslations("home");
const BOTTOM_MORE_COPY = HOME_COPY.bottomMoreAbout;
const EMAIL_CARD_DESCRIPTION =
  BOTTOM_MORE_COPY.cards.find((card) => card.id === "email")?.description ?? "Email sign up";

describe("BottomMoreAboutSection", () => {
  it("should render the bottom more about section", () => {
    render(<BottomMoreAboutSection />);
    const region = screen.getByRole("region", {
      name: BOTTOM_MORE_COPY.title,
    });
    expect(region).toBeTruthy();
  });

  it("should render the title", () => {
    render(<BottomMoreAboutSection />);
    const heading = screen.getByRole("heading", {
      level: 5,
      name: BOTTOM_MORE_COPY.title,
    });
    expect(heading.textContent).toBe(BOTTOM_MORE_COPY.title);
  });

  it("should render 3 cards", () => {
    render(<BottomMoreAboutSection />);
    const cards = screen.getAllByRole("listitem");
    expect(cards).toHaveLength(3);
  });

  it("opens the promo signup modal from the email card", async () => {
    render(<BottomMoreAboutSection />);

    const emailCardLabel = screen.getByText(EMAIL_CARD_DESCRIPTION);
    const interactiveCard = emailCardLabel.closest('[role="listitem"]');
    expect(interactiveCard).toBeTruthy();

    await clickWithAct(interactiveCard as HTMLElement);

    expect(await screen.findByRole("dialog", { name: /Reserve your future code/i })).toBeTruthy();
  });
});
