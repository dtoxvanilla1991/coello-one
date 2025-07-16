import { render, screen } from "@testing-library/react";
import { PromoSection } from "./PromoSection";

describe("PromoSection", () => {
  it("should render the promo section", () => {
    render(<PromoSection />);
    expect(screen.getByTestId("promo-section")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<PromoSection />);
    expect(screen.getByTestId("promo-section-title")).toHaveTextContent(
      "Limited Time Offer"
    );
  });

  it("should render the text", () => {
    render(<PromoSection />);
    expect(screen.getByTestId("promo-section-text")).toHaveTextContent(
      "Up to 20% off select items"
    );
  });

  it("should render the button", () => {
    render(<PromoSection />);
    expect(screen.getByTestId("promo-section-button")).toBeInTheDocument();
  });
});
