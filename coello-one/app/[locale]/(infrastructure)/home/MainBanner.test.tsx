import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { MainBanner } from "./MainBanner";

describe("MainBanner", () => {
  it("should render the main banner", () => {
    render(<MainBanner />);
    expect(screen.getByRole("region", { name: /NOW YOU TRULY STAND OUT\./i })).toBeTruthy();
  });

  it("should render the title", () => {
    render(<MainBanner />);
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /NOW YOU TRULY STAND OUT\./i,
      }).textContent,
    ).toBe("NOW YOU TRULY STAND OUT.");
  });

  it("should render the shop now button", () => {
    render(<MainBanner />);
    expect(screen.getByRole("button", { name: /shop now/i })).toBeTruthy();
  });
});
