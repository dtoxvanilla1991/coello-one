import { beforeEach, describe, expect, it, mock, vi } from "bun:test";
import { NextRequest } from "next/server";

const constructEventSpy = vi.fn();
const dbSpy = vi.fn(async () => [] as unknown[]);

mock.module("@utils/stripe", () => ({
  getStripeClient: () => ({
    webhooks: {
      constructEvent: constructEventSpy,
    },
  }),
}));

mock.module("@config/db", () => ({
  db: dbSpy,
}));

const { POST } = await import("./route");

describe("POST /api/stripe/webhook", () => {
  beforeEach(() => {
    constructEventSpy.mockReset();
    dbSpy.mockClear();
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
  });

  it("verifies the event and persists it", async () => {
    constructEventSpy.mockReturnValue({
      id: "evt_test",
      created: 1700000000,
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test",
          status: "complete",
          payment_status: "paid",
          currency: "gbp",
          amount_total: 1234,
          metadata: { locale: "en-GB" },
          customer_details: { email: "test@example.com" },
        },
      },
    });

    const request = new NextRequest("http://localhost:3000/api/stripe/webhook", {
      method: "POST",
      headers: new Headers({
        "stripe-signature": "t=123,v1=fake",
      }),
      body: "{}",
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.received).toBe(true);
    expect(constructEventSpy).toHaveBeenCalledTimes(1);
    expect(dbSpy).toHaveBeenCalled();
  });

  it("rejects requests with no signature", async () => {
    const request = new NextRequest("http://localhost:3000/api/stripe/webhook", {
      method: "POST",
      body: "{}",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
