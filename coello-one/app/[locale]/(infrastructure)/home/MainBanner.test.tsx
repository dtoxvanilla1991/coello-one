import { render, screen } from "@testing-library/react";
import { MainBanner } from "./MainBanner";

describe("MainBanner", () => {
  it("should render the main banner", () => {
    render(<MainBanner />);
    expect(screen.getByTestId("main-banner")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<MainBanner />);
    expect(screen.getByTestId("main-banner-title")).toHaveTextContent(
      "NOW YOU TRULY STAND OUT."
    );
  });

  it("should render the shop now button", () => {
    render(<MainBanner />);
    expect(
      screen.getByTestId("main-banner-shop-now-button")
    ).toBeInTheDocument();
  });
});
