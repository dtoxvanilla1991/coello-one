import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { LocaleProvider } from "@/localization/LocaleProvider";
import { MainBanner } from "./MainBanner";
import { getTestTranslations } from "@test-utils/translations";

const HOME_EN_COPY = getTestTranslations("home", "en-GB");
const HOME_ES_COPY = getTestTranslations("home", "es-ES");

const MAIN_BANNER_EN = HOME_EN_COPY.mainBanner;
const MAIN_BANNER_ES = HOME_ES_COPY.mainBanner;

const renderWithLocale = (locale: "en-GB" | "es-ES" = "en-GB") =>
  render(
    <LocaleProvider value={locale}>
      <MainBanner />
    </LocaleProvider>,
  );

describe("MainBanner", () => {
  it("renders the English headline when the locale is en-GB", () => {
    renderWithLocale("en-GB");
    expect(screen.getByRole("heading", { level: 4, name: MAIN_BANNER_EN.headline })).toBeTruthy();
    expect(screen.getByRole("button", { name: MAIN_BANNER_EN.ctaLabel })).toBeTruthy();
  });

  it("renders the Spanish translation when the locale is es-ES", async () => {
    renderWithLocale("es-ES");
    expect(
      await screen.findByRole("heading", { level: 4, name: MAIN_BANNER_ES.headline }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: MAIN_BANNER_ES.ctaLabel })).toBeTruthy();
  });
});
