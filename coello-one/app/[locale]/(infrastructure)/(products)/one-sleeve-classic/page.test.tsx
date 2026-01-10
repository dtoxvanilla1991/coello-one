import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, expect } from "bun:test";
import { resetNavigationMocks, setNavigationState } from "@test-utils/navigation";
import OneSleeveClassic from "./OneSleeveClassic";

describe("OneSleeveClassicPage", () => {
  beforeEach(() => {
    resetNavigationMocks();
    setNavigationState({
      pathname: "/products/one-sleeve-classic",
      searchParams: new URLSearchParams(),
    });
  });

  it("renders the OneSleeveClassic component", () => {
    render(<OneSleeveClassic />);
    expect(screen.getByText(/One Sleeve Classic/i)).toBeTruthy();
    expect(screen.getByText("£45.00")).toBeTruthy();
  });
});
