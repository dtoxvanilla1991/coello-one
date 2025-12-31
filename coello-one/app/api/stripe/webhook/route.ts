import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@utils/stripe";
import { persistStripeWebhookEvent } from "./persistStripeEvent";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook signature." }, { status: 400 });
  }

  let event;
  try {
    const rawBody = Buffer.from(await request.arrayBuffer());
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("Stripe webhook verification failed", error);
    }
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    await persistStripeWebhookEvent(event);
    return NextResponse.json({ received: true });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("Stripe webhook persistence failed", error);
    }
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
