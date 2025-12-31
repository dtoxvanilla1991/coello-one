import type Stripe from "stripe";

export type CheckoutRedirectState = "success" | "processing" | "open" | "error";

export function getCheckoutReturnState(
  session?: Stripe.Checkout.Session | null,
): CheckoutRedirectState {
  if (!session) {
    return "error";
  }

  if (session.status === "complete") {
    return session.payment_status === "paid" ? "success" : "processing";
  }

  if (session.status === "open") {
    return "open";
  }

  return "error";
}
