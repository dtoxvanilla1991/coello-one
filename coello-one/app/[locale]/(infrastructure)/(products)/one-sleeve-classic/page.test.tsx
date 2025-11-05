import { render, screen } from "@testing-library/react";
import { describe, it, expect, mock } from "bun:test";
import OneSleeveClassicPage from "./page";

const replaceMock = mock<(path: string, options?: { scroll?: boolean }) => void>(() => {});

mock.module("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    replace: replaceMock,
    push: () => {},
    prefetch: () => Promise.resolve(),
  }),
  usePathname: () => "/en-GB/products/one-sleeve-classic",
  useSearchParams: () => new URLSearchParams(),
}));

describe("OneSleeveClassicPage", () => {
  it("renders the OneSleeveClassic component", () => {
    render(<OneSleeveClassicPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /One Sleeve Classic/i })
    ).toBeTruthy();
    expect(screen.getByText("$45.00")).toBeTruthy();
  });
});
