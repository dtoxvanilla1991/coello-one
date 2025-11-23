import { beforeEach, describe, expect, it, mock } from "bun:test";
import { render, screen, waitFor } from "@testing-library/react";
import { clickWithAct } from "@test-utils/clickWithAct";
import { trackEventMock } from "@test-utils/trackEventMock";
import DiscountWaitlistForm from "./DiscountWaitlistForm";
import type { DiscountsCopy } from "@/types/pages";

const formCopy: DiscountsCopy["form"] = {
  title: "Email",
  description: "Add your email",
  emailPlaceholder: "you@email.com",
  submitLabel: "Join",
  privacyNote: "Promise",
  successTitle: "Success",
  successDescription: "Welcome",
  validation: {
    required: "Required",
    invalid: "Invalid",
    refine: "Refine",
  },
};

describe("DiscountWaitlistForm", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: shows validation when the email is empty", async () => {
    render(<DiscountWaitlistForm copy={formCopy} />);

    await clickWithAct(screen.getByRole("button", { name: /Join/i }));

    expect(await screen.findByText(/Required/i)).toBeTruthy();
  });

  it("integration: submits the email when the schema passes", async () => {
    const onSubscribe = mock(async () => ({ success: true }));

    render(
      <DiscountWaitlistForm
        copy={formCopy}
        onSubscribe={onSubscribe}
        initialEmail="athlete@coello.one"
      />,
    );

    const input = screen.getByPlaceholderText(/you@email.com/i) as HTMLInputElement;

    expect(input.value).toBe("athlete@coello.one");

    await clickWithAct(screen.getByRole("button", { name: /Join/i }));

    await waitFor(() => {
      expect(onSubscribe).toHaveBeenCalledWith("athlete@coello.one");
    });

    expect(await screen.findByText(/Success/i)).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledWith(
      "discount_waitlist_join",
      { channel: "email" },
      expect.objectContaining({
        locale: "en-GB",
        translationKey: "pages.discounts.form.submitLabel",
      }),
    );
  });
});
