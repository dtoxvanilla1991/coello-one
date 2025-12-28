import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import ContactPageContent from "./ContactPageContent";

describe("ContactPageContent", () => {
  it("renders concierge messaging and FAQ link", () => {
    const faqHref = "/help/faq";

    render(<ContactPageContent faqHref={faqHref} />);

    expect(screen.getByText(/Concierge channels/i)).toBeTruthy();
    expect(screen.getByText(/Send us a message/i)).toBeTruthy();
    const faqLink = screen.getByRole("link", { name: /FAQ/i });
    expect(faqLink).toHaveAttribute("href", faqHref);
  });
});
