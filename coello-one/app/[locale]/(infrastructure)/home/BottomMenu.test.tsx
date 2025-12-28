import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import { LocaleProvider } from "@/localization/LocaleProvider";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("should render the bottom menu", async () => {
    render(
      <LocaleProvider value="en-GB">
        <BottomMenu />
      </LocaleProvider>,
    );
    expect(await screen.findByRole("navigation", { name: /Footer quick links/i })).toBeTruthy();
  });
});
