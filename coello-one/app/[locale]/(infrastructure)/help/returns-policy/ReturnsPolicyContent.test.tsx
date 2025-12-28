import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import ReturnsPolicyContent from "./ReturnsPolicyContent";

describe("ReturnsPolicyContent", () => {
  it("renders highlights and FAQs", () => {
    render(<ReturnsPolicyContent />);

    expect(screen.getByText(/Your 30-day promise/i)).toBeTruthy();
    expect(screen.getByText(/Refund timing snapshot/i)).toBeTruthy();
    expect(screen.getByText(/Eligibility checklist/i)).toBeTruthy();
    expect(screen.getByText(/Quick answers/i)).toBeTruthy();
  });
});
