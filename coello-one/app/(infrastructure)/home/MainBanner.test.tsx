import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { LocaleProvider } from "@/localization/LocaleProvider";
import { MainBanner } from "./MainBanner";

const renderWithLocale = (locale: "en-GB" | "es-ES" = "en-GB") =>
  render(
    <LocaleProvider value={locale}>
      <MainBanner />
    </LocaleProvider>,
  );

describe("MainBanner", () => {
  it("renders the English headline when the locale is en-GB", () => {
    renderWithLocale("en-GB");
    expect(
      screen.getByRole("heading", { level: 4, name: /NOW YOU TRULY STAND OUT\./i }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /shop now/i })).toBeTruthy();
  });

  it("renders the Spanish translation when the locale is es-ES", async () => {
    renderWithLocale("es-ES");
    expect(
      await screen.findByRole("heading", { level: 4, name: /AHORA TU HISTORIA RESALTA\./i }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /comprar ahora/i })).toBeTruthy();
  });
});
