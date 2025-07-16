import { render, screen } from "@testing-library/react";
import { Featured } from "./Featured";

describe("Featured", () => {
  it("should render the featured section", () => {
    render(<Featured />);
    expect(screen.getByTestId("featured-section")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Featured />);
    expect(screen.getByTestId("featured-section-title")).toHaveTextContent(
      "Featured"
    );
  });

  it("should render 4 cards", () => {
    render(<Featured />);
    expect(screen.getByTestId("featured-section-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("featured-section-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("featured-section-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("featured-section-card-3")).toBeInTheDocument();
  });
});
