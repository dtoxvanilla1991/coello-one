import { beforeEach, describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { trackEventMock } from "@test-utils/trackEventMock";
import { clickWithAct } from "@test-utils/clickWithAct";

const { default: ReturnRequestForm } = await import("./ReturnRequestForm");

describe("ReturnRequestForm", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
  });

  it("unit: rejects order numbers that are too short", async () => {
    render(<ReturnRequestForm initialValues={{ orderId: "123", email: "member@example.com" }} />);

    await clickWithAct(screen.getByRole("button", { name: /generate return label/i }));

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

    await clickWithAct(screen.getByRole("button", { name: /generate return label/i }));

    expect(await screen.findByText(/Return request logged/i)).toBeTruthy();
    expect(screen.getByText(/Order COELLO777/i)).toBeTruthy();
    expect(trackEventMock).toHaveBeenCalledWith(
      "help_return_request",
      expect.objectContaining({ resolution: "Refund", courier: "DPD Pickup" }),
    );
  });
});
