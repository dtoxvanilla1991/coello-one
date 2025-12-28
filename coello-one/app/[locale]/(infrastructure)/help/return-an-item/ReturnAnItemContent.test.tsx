import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import ReturnAnItemContent from "./ReturnAnItemContent";

describe("ReturnAnItemContent", () => {
  it("shows return steps and concierge link", () => {
    const contactHref = "/help/contact-us";

    render(<ReturnAnItemContent contactHref={contactHref} />);

    expect(screen.getByText(/How the return flow works/i)).toBeTruthy();
    expect(screen.getByText(/Helpful reminders/i)).toBeTruthy();
    const conciergeLink = screen.getByRole("link", { name: /speak with us/i });
    expect(conciergeLink).toHaveAttribute("href", contactHref);
  });
});
