import { render, screen } from "@testing-library/react";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("should render the bottom menu", () => {
    render(<BottomMenu />);
    expect(screen.getByTestId("bottom-menu")).toBeInTheDocument();
  });
});
