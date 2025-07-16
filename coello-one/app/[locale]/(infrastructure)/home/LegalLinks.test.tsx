import { render, screen } from "@testing-library/react";
import LegalLinks from "./LegalLinks";

describe("LegalLinks", () => {
  it("should render the legal links", () => {
    render(<LegalLinks />);
    expect(screen.getByTestId("legal-links")).toBeInTheDocument();
  });

  it("should render 4 links", () => {
    render(<LegalLinks />);
    expect(screen.getByTestId("legal-links-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("legal-links-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("legal-links-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("legal-links-item-3")).toBeInTheDocument();
  });
});
