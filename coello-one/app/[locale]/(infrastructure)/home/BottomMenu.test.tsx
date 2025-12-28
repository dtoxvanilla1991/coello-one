import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { LocaleProvider } from "@/localization/LocaleProvider";
import BottomMenu from "./BottomMenu";
import { getTestTranslations } from "@test-utils/translations";

const NAVIGATION_COPY = getTestTranslations("navigation");
const FOOTER_ARIA_LABEL = NAVIGATION_COPY.footerMenu.ariaLabel ?? "Footer quick links";

describe("BottomMenu", () => {
  it("should render the bottom menu", async () => {
    render(
      <LocaleProvider value="en-GB">
        <BottomMenu />
      </LocaleProvider>,
    );
    expect(await screen.findByRole("navigation", { name: FOOTER_ARIA_LABEL })).toBeTruthy();
  });
});
