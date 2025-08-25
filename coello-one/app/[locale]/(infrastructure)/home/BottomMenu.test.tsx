import { render } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("should render the bottom menu", () => {
    const { container } = render(<BottomMenu />);
    expect(container.querySelector('[data-testid="bottom-menu"]')).toBeTruthy();
  });
});
