"use server";

import { stripe } from "@/lib/stripe";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { calcDeliveryFee, getZoneById, PICKUP_OPTION } from "@/lib/delivery";
import type { CartItem, DeliveryOption } from "@/types";

const productById = new Map((productsData as Product[]).map((p) => [p.id, p]));

interface CreateSessionInput {
  items: CartItem[];
  deliveryOption: DeliveryOption;
  customerEmail?: string;
}

export async function createCheckoutSession(input: CreateSessionInput) {
  const { items, deliveryOption, customerEmail } = input;

  if (!items.length) throw new Error("Cart is empty");

  const orderTotalUsd = items.reduce((sum, item) => {
    const product = productById.get(item.productId);
    return sum + (product ? product.priceUsd * item.quantity : 0);
  }, 0);

  // Line items — prices always sourced server-side
  const lineItems = items.map((item) => {
    const product = productById.get(item.productId);
    if (!product) throw new Error(`Unknown product: ${item.productId}`);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: `${product.makerName} · ${product.subcategory}`,
          metadata: { productId: product.id, makerId: product.makerId, slug: product.slug },
        },
        unit_amount: product.priceUsd * 100,
      },
      quantity: item.quantity,
    };
  });

  // Delivery fee line item
  const isPickup = deliveryOption === "pickup";
  const fee = isPickup
    ? { feeUsd: 0, feeCents: 0, isFree: true, reason: "Workshop pickup — no fee" }
    : calcDeliveryFee(deliveryOption, orderTotalUsd);

  const zone = isPickup ? null : getZoneById(deliveryOption);
  const deliveryLabel = isPickup
    ? PICKUP_OPTION.label
    : `Delivery · ${zone?.label ?? deliveryOption}`;

  if (fee.feeCents > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: deliveryLabel,
          description: zone?.etaLabel ?? "",
          metadata: {} as { productId: string; makerId: string; slug: string },
        },
        unit_amount: fee.feeCents,
      },
      quantity: 1,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded",
    line_items: lineItems,
    customer_email: customerEmail || undefined,
    billing_address_collection: "auto",
    return_url: `${siteUrl}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      deliveryOption,
      deliveryLabel,
      deliveryFeeUsd: String(fee.feeUsd),
      itemCount: String(items.reduce((s, i) => s + i.quantity, 0)),
    },
    // Collect hotel/accommodation name for delivery orders
    custom_fields: !isPickup
      ? [
          {
            key: "accommodation_name",
            label: { type: "custom", custom: "Hotel or accommodation name" },
            type: "text",
          },
          {
            key: "room_number",
            label: { type: "custom", custom: "Room number (optional)" },
            type: "text",
            optional: true,
          },
        ]
      : undefined,
  });

  if (!session.client_secret) throw new Error("Stripe did not return a client_secret");

  return { clientSecret: session.client_secret };
}
