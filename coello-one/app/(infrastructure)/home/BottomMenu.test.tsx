import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("should render the bottom menu", async () => {
    render(<BottomMenu />);
    expect(await screen.findByRole("navigation", { name: /Footer quick links/i })).toBeTruthy();
  });
});
