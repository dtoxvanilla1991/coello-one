import "server-only";

import Stripe from "stripe";

const API_VERSION: Stripe.StripeConfig["apiVersion"] = "2026-01-28.clover";

let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (cachedClient) {
    return cachedClient;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  cachedClient = new Stripe(secretKey, { apiVersion: API_VERSION });
  return cachedClient;
}

// Test hook replaced via mock.module inside route tests.
export const __stripeTestMocks = null;
