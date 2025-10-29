import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import LegalLinks from "./LegalLinks";

describe("LegalLinks", () => {
  it("should render the legal links", () => {
    render(<LegalLinks />);
    expect(screen.getByLabelText(/legal policies/i)).toBeTruthy();
  });

  it("should render 4 links", () => {
    render(<LegalLinks />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(4);
  });
});
