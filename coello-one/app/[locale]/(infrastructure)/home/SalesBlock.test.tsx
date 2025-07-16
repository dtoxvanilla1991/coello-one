import { render, screen } from "@testing-library/react";
import SalesBlock from "./SalesBlock";

describe("SalesBlock", () => {
  it("should render the sales block", () => {
    render(<SalesBlock />);
    expect(screen.getByTestId("sales-block")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<SalesBlock />);
    expect(screen.getByTestId("sales-block-title")).toHaveTextContent(
      "GET AN EXTRA 10% OFF SALE ITEMS"
    );
  });

  it("should render the text", () => {
    render(<SalesBlock />);
    expect(screen.getByTestId("sales-block-text")).toHaveTextContent(
      "Drop code extra10 and thank us with a tagged photo in the gym"
    );
  });

  it("should render the women and men buttons", () => {
    render(<SalesBlock />);
    expect(screen.getByTestId("sales-block-women-button")).toBeInTheDocument();
    expect(screen.getByTestId("sales-block-men-button")).toBeInTheDocument();
  });
});
