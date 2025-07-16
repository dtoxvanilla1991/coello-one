import { render, screen } from "@testing-library/react";
import BottomMoreAboutSection from "./BottomMoreAboutSection";

describe("BottomMoreAboutSection", () => {
  it("should render the bottom more about section", () => {
    render(<BottomMoreAboutSection />);
    expect(
      screen.getByTestId("bottom-more-about-section")
    ).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<BottomMoreAboutSection />);
    expect(
      screen.getByTestId("bottom-more-about-section-title")
    ).toHaveTextContent("More about Coello One");
  });

  it("should render 3 cards", () => {
    render(<BottomMoreAboutSection />);
    expect(
      screen.getByTestId("bottom-more-about-section-card-0")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("bottom-more-about-section-card-1")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("bottom-more-about-section-card-2")
    ).toBeInTheDocument();
  });
});
