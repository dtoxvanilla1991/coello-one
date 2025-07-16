import { render, screen } from "@testing-library/react";
import Training from "./Training";

describe("Training", () => {
  it("should render the training section", () => {
    render(<Training />);
    expect(screen.getByTestId("training-section")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Training />);
    expect(screen.getByTestId("training-section-title")).toHaveTextContent(
      "Our athletes workouts"
    );
  });

  it("should render 3 cards", () => {
    render(<Training />);
    expect(screen.getByTestId("training-section-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("training-section-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("training-section-card-2")).toBeInTheDocument();
  });

  it("should render the card buttons", () => {
    render(<Training />);
    expect(
      screen.getByTestId("training-section-card-button-0")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("training-section-card-button-1")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("training-section-card-button-2")
    ).toBeInTheDocument();
  });
});
