import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import InfrastructureLayout from "../layout";
import { setNavigationState } from "@test-utils/navigation";
import { POST as setLanguage } from "../api/set-language/route";
import { LocaleProvider } from "@/localization/LocaleProvider";
import { MainBanner } from "./MainBanner";
import { getTestTranslations } from "@test-utils/translations";

const HOME_ES_COPY = getTestTranslations("home", "es-ES");
const MAIN_BANNER_ES = HOME_ES_COPY.mainBanner;

const buildRequest = (body: unknown) =>
  new Request("http://localhost/api/set-language", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

describe("Home route integration", () => {
  it("keeps the Navbar visible when the root path is loaded", async () => {
    setNavigationState({ pathname: "/" });

    render(
      <InfrastructureLayout>
        <div>Home content</div>
      </InfrastructureLayout>,
    );

    expect(await screen.findByAltText(/coello one logo/i)).toBeTruthy();
  });

  it("shows Spanish home copy after the locale API flips to es-ES", async () => {
    const response = await setLanguage(buildRequest({ locale: "es-ES" }));
    const cookieHeader = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(cookieHeader).toContain("NEXT_LOCALE=es-ES");

    render(
      <LocaleProvider value="es-ES">
        <MainBanner />
      </LocaleProvider>,
    );

    expect(await screen.findByText(MAIN_BANNER_ES.headline)).toBeTruthy();
    expect(screen.getByRole("button", { name: MAIN_BANNER_ES.ctaLabel })).toBeTruthy();
  });
});
