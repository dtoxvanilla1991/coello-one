"use client";

import { useMemo } from "react";
import { Flex } from "antd";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export type CheckoutFormProps = {
  clientSecret: string;
};

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured");
}

const stripePromise = loadStripe(publishableKey);

export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  return (
    <Flex vertical className="min-h-130 w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Flex>
  );
}
