import "server-only";

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@utils/stripe";

const PRODUCT_PRICE_ID = "price_1SjsBbDv2pIVjuXc4Zz0oDOW";
const DEFAULT_RETURN_HOST = "http://localhost:3000";
const EU_AND_UK_ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
];

function resolveReturnUrl(request: NextRequest): string {
  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_RETURN_HOST;
  const normalizedOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin;
  return `${normalizedOrigin}/return?session_id={CHECKOUT_SESSION_ID}`;
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      automatic_tax: { enabled: true },
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: EU_AND_UK_ALLOWED_COUNTRIES,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Standard Shipping",
            fixed_amount: { amount: 500, currency: "gbp" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      line_items: [{ price: PRODUCT_PRICE_ID, quantity: 1 }],
      return_url: resolveReturnUrl(request),
    });

    if (!session.client_secret) {
      throw new Error("Embedded checkout session is missing a client secret");
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("Stripe checkout session creation failed", error);
    }
    return NextResponse.json(
      { error: "Unable to initialize the checkout session." },
      { status: 500 },
    );
  }
}
