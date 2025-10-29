import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("should render the bottom menu", () => {
    render(<BottomMenu />);
    expect(
      screen.getByRole("navigation", { name: /Footer quick links/i })
    ).toBeTruthy();
  });
});
