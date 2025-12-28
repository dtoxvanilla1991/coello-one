import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, expect } from "bun:test";
import { resetNavigationMocks, setNavigationState } from "@test-utils/navigation";
import OneSleeveClassicPage from "./page";

describe("OneSleeveClassicPage", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({
      pathname: "/products/one-sleeve-classic",
      searchParams: new URLSearchParams(),
    });
  });

  it("renders the OneSleeveClassic component", () => {
    render(<OneSleeveClassicPage />);
    expect(screen.getByRole("heading", { level: 2, name: /One Sleeve Classic/i })).toBeTruthy();
    expect(screen.getByText("£45.00")).toBeTruthy();
  });
});
