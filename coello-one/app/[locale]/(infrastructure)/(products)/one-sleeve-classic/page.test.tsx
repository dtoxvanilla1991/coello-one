import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import OneSleeveClassicPage from "./page";

describe("OneSleeveClassicPage", () => {
  it("renders the OneSleeveClassic component", () => {
    render(<OneSleeveClassicPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /One Sleeve Classic/i })
    ).toBeTruthy();
    expect(screen.getByText("$45.00")).toBeTruthy();
  });
});
