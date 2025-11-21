import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";

const trackEventMock = mock<(event: string, payload?: unknown) => void>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

const { default: ContactForm } = await import("./ContactForm");

describe("ContactForm", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: surfaces schema validation errors for short messages", async () => {
    render(
      <ContactForm
        initialValues={{
          name: "Alex Member",
          email: "alex@example.com",
          message: "short",
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/Let us know how we can help—add at least 10 characters./i),
    ).toBeTruthy();
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("integration: shows the success state and tracks the request when inputs are valid", async () => {
    render(
      <ContactForm
        defaultEmail="member@coello.one"
        initialValues={{
          name: "Serena Member",
          email: "member@coello.one",
          message: "I would like to confirm courier availability for a same-day delivery.",
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Message received/i)).toBeTruthy();
    expect(screen.getByText(/We will reply via email shortly./i)).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledWith("help_contact_request", expect.any(Object));
  });
});
