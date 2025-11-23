import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import type { DiscountsCopy } from "@/types/pages";
import DiscountsContent from "./DiscountsContent";

const mockCopy: DiscountsCopy = {
  metadata: {
    title: "Discounts",
    description: "Description",
  },
  hero: {
    kicker: "Drops",
    title: "Precision rewards",
    description: "Hero copy",
  },
  statusCard: {
    title: "No promos",
    body: "Body",
    reminderLabel: "Remember",
  },
  benefits: [
    { title: "Benefit A", description: "First benefit" },
    { title: "Benefit B", description: "Second benefit" },
    { title: "Benefit C", description: "Third benefit" },
  ],
  privacy: {
    title: "Privacy",
    points: ["Point one", "Point two"],
  },
  form: {
    title: "Email",
    description: "We will reach out soon",
    emailPlaceholder: "you@email.com",
    submitLabel: "Join",
    privacyNote: "Promise",
    successTitle: "Thanks",
    successDescription: "Welcome",
    validation: {
      required: "Required",
      invalid: "Invalid",
      refine: "Refine",
    },
  },
};

describe("DiscountsContent", () => {
  it("unit: renders benefits and privacy commitments", () => {
    render(<DiscountsContent copy={mockCopy} />);

    expect(screen.getByText(/Benefit A/i)).toBeTruthy();
    expect(screen.getByText(/Benefit B/i)).toBeTruthy();
    expect(screen.getByText(/Point one/i)).toBeTruthy();
  });

  it("integration: surfaces the waitlist form input", () => {
    render(<DiscountsContent copy={mockCopy} />);

    expect(screen.getByPlaceholderText(/you@email.com/i)).toBeTruthy();
    expect(screen.getByText(/Promise/i)).toBeTruthy();
  });
});
