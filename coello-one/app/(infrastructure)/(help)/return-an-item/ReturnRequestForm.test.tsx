import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";

const trackEventMock = mock<(event: string, payload?: unknown) => void>(() => {});

mock.module("@/utils/trackEvent", () => ({
  trackEvent: trackEventMock,
}));

const { default: ReturnRequestForm } = await import("./ReturnRequestForm");

describe("ReturnRequestForm", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: rejects order numbers that are too short", async () => {
  render(<ReturnRequestForm initialValues={{ orderId: "123", email: "member@example.com" }} />);

    fireEvent.click(screen.getByRole("button", { name: /generate return label/i }));

    expect(await screen.findByText(/Order number should be at least 6 characters./i)).toBeTruthy();
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("integration: logs a successful return when the form is valid", async () => {
    render(
      <ReturnRequestForm
        initialValues={{
          orderId: "COELLO777",
          email: "member@example.com",
          notes: "Sleeve stitching issue on arrival",
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /generate return label/i }));

    expect(await screen.findByText(/Return request logged/i)).toBeTruthy();
    expect(screen.getByText(/Order COELLO777/i)).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledWith(
      "help_return_request",
      expect.objectContaining({ resolution: "Refund", courier: "DPD Pickup" }),
    );
  });
});
