import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import OneSleeveClassicPage from "./page";

// Mock the OneSleeveClassic component
vi.mock(
  "./OneSleeveClassic",
  () => ({
    __esModule: true,
    default: function MockOneSleeveClassic() {
      return <div data-testid="one-sleeve-classic-mock" />;
    },
  }),
);

describe("OneSleeveClassicPage", () => {
  it("renders the OneSleeveClassic component", () => {
    render(<OneSleeveClassicPage />);
    expect(screen.getByTestId("one-sleeve-classic-mock")).toBeInTheDocument();
  });
});
