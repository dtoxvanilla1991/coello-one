import "server-only";

import type Stripe from "stripe";
import { db } from "@config/db";

type StripeOrderRow = {
  session_id: string;
  status: string | null;
  payment_status: string | null;
  currency: string | null;
  amount_total: number | null;
  customer_email: string | null;
  locale: string | null;
  updated_at: Date | null;
  created_at: Date | null;
};

export type StripeOrderEventRow = {
  stripe_event_id: string;
  session_id: string | null;
  event_type: string;
  stripe_created: number;
  payload_json: string;
  received_at: Date | null;
};

export type CheckoutOrderSnapshot = {
  sessionId: string;
  status: string | null;
  paymentStatus: string | null;
  currency: string | null;
  amountTotal: number | null;
  customerEmail: string | null;
  locale: string | null;
  updatedAt: string | null;
  createdAt: string | null;
  events: Array<{ type: string; created: number }>;
};

function normalizeSessionId(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toIso(value: Date | null | undefined): string | null {
  if (!value) {
    return null;
  }
  return value.toISOString();
}

export async function persistStripeWebhookEvent(event: Stripe.Event): Promise<void> {
  const stripeEventId = event.id;
  const stripeCreated = event.created;
  const eventType = event.type;

  let sessionId: string | null = null;
  if (eventType.startsWith("checkout.session.")) {
    sessionId = normalizeSessionId((event.data.object as { id?: unknown }).id);
  }

  const payloadJson = JSON.stringify(event);

  await db`
    INSERT INTO stripe_order_events (
      stripe_event_id,
      session_id,
      event_type,
      stripe_created,
      payload_json
    )
    VALUES (
      ${stripeEventId},
      ${sessionId},
      ${eventType},
      ${stripeCreated},
      ${payloadJson}
    )
    ON DUPLICATE KEY UPDATE
      event_type = VALUES(event_type),
      stripe_created = VALUES(stripe_created),
      payload_json = VALUES(payload_json)
  `;

  if (!sessionId) {
    return;
  }

  if (!eventType.startsWith("checkout.session.")) {
    return;
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const customerEmail = session.customer_details?.email ?? null;
  const currency = session.currency ?? null;
  const amountTotal = typeof session.amount_total === "number" ? session.amount_total : null;
  const status = session.status ?? null;
  const paymentStatus = session.payment_status ?? null;
  const locale = session.metadata?.locale ?? null;
  const metadataJson = JSON.stringify(session.metadata ?? {});

  await db`
    INSERT INTO stripe_orders (
      session_id,
      status,
      payment_status,
      currency,
      amount_total,
      customer_email,
      locale,
      metadata_json
    )
    VALUES (
      ${sessionId},
      ${status},
      ${paymentStatus},
      ${currency},
      ${amountTotal},
      ${customerEmail},
      ${locale},
      ${metadataJson}
    )
    ON DUPLICATE KEY UPDATE
      status = VALUES(status),
      payment_status = VALUES(payment_status),
      currency = VALUES(currency),
      amount_total = VALUES(amount_total),
      customer_email = VALUES(customer_email),
      locale = VALUES(locale),
      metadata_json = VALUES(metadata_json)
  `;
}

export async function getCheckoutOrderSnapshot(
  sessionId: string,
): Promise<CheckoutOrderSnapshot | null> {
  const [orderRow] = (await db`
    SELECT
      session_id,
      status,
      payment_status,
      currency,
      amount_total,
      customer_email,
      locale,
      updated_at,
      created_at
    FROM stripe_orders
    WHERE session_id = ${sessionId}
    LIMIT 1
  `) as StripeOrderRow[];

  if (!orderRow) {
    return null;
  }

  const eventRows = (await db`
    SELECT
      stripe_event_id,
      session_id,
      event_type,
      stripe_created,
      payload_json,
      received_at
    FROM stripe_order_events
    WHERE session_id = ${sessionId}
    ORDER BY stripe_created DESC
    LIMIT 25
  `) as StripeOrderEventRow[];

  return {
    sessionId: orderRow.session_id,
    status: orderRow.status,
    paymentStatus: orderRow.payment_status,
    currency: orderRow.currency,
    amountTotal: orderRow.amount_total,
    customerEmail: orderRow.customer_email,
    locale: orderRow.locale,
    updatedAt: toIso(orderRow.updated_at),
    createdAt: toIso(orderRow.created_at),
    events: eventRows.map((row) => ({ type: row.event_type, created: row.stripe_created })),
  };
}
