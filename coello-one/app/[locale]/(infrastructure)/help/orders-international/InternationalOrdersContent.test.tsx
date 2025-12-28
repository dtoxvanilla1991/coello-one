import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import InternationalOrdersContent from "./InternationalOrdersContent";

describe("InternationalOrdersContent", () => {
  it("renders fulfilment highlights and contact link", () => {
    const contactHref = "/help/contact-us";

    render(<InternationalOrdersContent contactHref={contactHref} />);

    expect(screen.getByText(/Fulfilment network/i)).toBeTruthy();
    expect(screen.getByText(/Currency coverage/i)).toBeTruthy();
    const contactLink = screen.getByRole("link", { name: /Contact Us/i });
    expect(contactLink).toHaveAttribute("href", contactHref);
  });
});
