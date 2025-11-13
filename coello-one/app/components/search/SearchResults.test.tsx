import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { SearchResults } from "./SearchResults";

describe("SearchResults", () => {
  it("shows filtered results that match the query", () => {
    render(<SearchResults locale="en-GB" query="sea blue" />);

    expect(screen.getByText(/showing 3 results for "sea blue"/i)).toBeTruthy();
    const ctaButtons = screen.getAllByRole("link", { name: /view product/i });
    expect(ctaButtons.length).toBe(3);

    ctaButtons.forEach((link) => {
      const href = link.getAttribute("href");
        expect(href).toBeTruthy();
        expect(href).toMatch(/^\/en-GB\/one-sleeve-classic/);
    });

    const targetUrls = ctaButtons
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => Boolean(href))
      .map((href) => new URL(href, "https://example.com"));

    expect(targetUrls.some((url) => url.searchParams.get("color") === "Sea Blue")).toBe(true);
  });

  it("renders a recovery state when no results match", () => {
    render(<SearchResults locale="en-GB" query="hoodie" />);

    expect(screen.getByText(/no matches found/i)).toBeTruthy();
    expect(screen.getByText(/we couldn't find matches for "hoodie"/i)).toBeTruthy();
  });
});
