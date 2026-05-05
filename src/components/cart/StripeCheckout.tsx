"use client";

import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/app/actions/checkout";
import type { CartItem, DeliveryOption } from "@/types";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface StripeCheckoutProps {
  items: CartItem[];
  deliveryOption: DeliveryOption;
}

export default function StripeCheckout({ items, deliveryOption }: StripeCheckoutProps) {
  if (!stripePromise) {
    return (
      <div style={{ padding: "32px", background: "var(--paper-deep)", border: "1px solid rgba(26,36,34,0.2)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rust)" }}>
        Stripe key not configured — add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local
      </div>
    );
  }

  const fetchClientSecret = async () => {
    const { clientSecret } = await createCheckoutSession({ items, deliveryOption });
    return clientSecret;
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
