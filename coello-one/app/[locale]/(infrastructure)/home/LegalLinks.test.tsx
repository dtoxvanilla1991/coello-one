import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "bun:test";
import LegalLinks from "./LegalLinks";
import { getTestTranslations } from "@test-utils/translations";

const LEGAL_COPY = getTestTranslations("legal");
const LEGAL_ARIA_LABEL = LEGAL_COPY.navigation.ariaLabel;
const EXPECTED_LINK_COUNT = LEGAL_COPY.navigation.links.length;

describe("LegalLinks", () => {
  it("should render the legal links", () => {
    render(<LegalLinks />);
    expect(screen.getByLabelText(LEGAL_ARIA_LABEL)).toBeTruthy();
  });

  it("should render 4 links", () => {
    render(<LegalLinks />);
    const container = screen.getByLabelText(LEGAL_ARIA_LABEL);
    const links = within(container).getAllByRole("link");
    expect(links).toHaveLength(EXPECTED_LINK_COUNT);
  });
});
