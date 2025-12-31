import { beforeEach, describe, expect, it, mock, vi } from "bun:test";
import { NextRequest } from "next/server";

const createSpy = vi.fn();

mock.module("@utils/stripe", () => ({
  getStripeClient: () => ({
    checkout: {
      sessions: {
        create: createSpy,
      },
    },
  }),
  __stripeTestMocks: {
    createSpy,
  },
}));

const { POST } = await import("./route");
const { __stripeTestMocks } = await import("@utils/stripe");

describe("POST /api/checkout/session", () => {
  beforeEach(() => {
    createSpy.mockReset();
  });

  it("creates an embedded checkout session", async () => {
    __stripeTestMocks.createSpy.mockResolvedValue({ client_secret: "cs_test_ready" });

    const request = new NextRequest("http://localhost:3000/api/checkout/session", {
      method: "POST",
      headers: new Headers({ origin: "https://checkout.coello.com" }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.clientSecret).toBe("cs_test_ready");
    expect(__stripeTestMocks.createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ui_mode: "embedded",
        line_items: [{ price: "price_1SjsBbDv2pIVjuXc4Zz0oDOW", quantity: 1 }],
        shipping_options: [
          expect.objectContaining({
            shipping_rate_data: expect.objectContaining({
              display_name: "Standard Shipping",
            }),
          }),
        ],
      }),
    );
  });

  it("returns a 500 when Stripe fails", async () => {
    __stripeTestMocks.createSpy.mockRejectedValueOnce(new Error("stripe unavailable"));

    const request = new NextRequest("http://localhost:3000/api/checkout/session", {
      method: "POST",
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload.error).toContain("Unable to initialize");
  });
});
