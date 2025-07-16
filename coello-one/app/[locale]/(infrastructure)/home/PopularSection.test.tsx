import { render, screen } from "@testing-library/react";
import PopularSection from "./PopularSection";

describe("PopularSection", () => {
  it("should render the popular section", () => {
    render(<PopularSection />);
    expect(screen.getByTestId("popular-section")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<PopularSection />);
    expect(screen.getByTestId("popular-section-title")).toHaveTextContent(
      "Popular right now"
    );
  });

  it("should render the women and men buttons", () => {
    render(<PopularSection />);
    expect(
      screen.getByTestId("popular-section-women-button")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("popular-section-men-button")
    ).toBeInTheDocument();
  });

  it("should render 3 cards", () => {
    render(<PopularSection />);
    expect(screen.getByTestId("popular-section-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("popular-section-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("popular-section-card-2")).toBeInTheDocument();
  });

  it("should render the card buttons", () => {
    render(<PopularSection />);
    expect(
      screen.getByTestId("popular-section-card-button-0")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("popular-section-card-button-1")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("popular-section-card-button-2")
    ).toBeInTheDocument();
  });
});
