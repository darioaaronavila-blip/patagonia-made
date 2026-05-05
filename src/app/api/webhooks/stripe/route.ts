import { stripe } from "@/lib/stripe";
import { sendOrderConfirmation } from "@/lib/email/sender";
import { getZoneById, PICKUP_OPTION } from "@/lib/delivery";
import productsData from "@/data/products.json";
import type { Product } from "@/types";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const productById = new Map((productsData as Product[]).map((p) => [p.id, p]));

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe-signature header", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      try {
        // Fetch full line items from Stripe (session object doesn't include them)
        const lineItemsResult = await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 100 }
        );

        const deliveryOption = session.metadata?.deliveryOption ?? "downtown";
        const isPickup = deliveryOption === "pickup";
        const zone = isPickup ? null : getZoneById(deliveryOption);

        const deliveryLabel = isPickup
          ? PICKUP_OPTION.label
          : session.metadata?.deliveryLabel ?? `Delivery · ${zone?.label ?? deliveryOption}`;

        const deliveryEta = isPickup
          ? PICKUP_OPTION.etaLabel
          : zone?.etaLabel ?? "See confirmation for details";

        const deliveryFeeUsd = parseFloat(session.metadata?.deliveryFeeUsd ?? "0");

        // Extract accommodation from Stripe custom fields
        const fields = session.custom_fields ?? [];
        const accommodationName = fields.find((f) => f.key === "accommodation_name")?.text?.value ?? undefined;
        const roomNumber = fields.find((f) => f.key === "room_number")?.text?.value ?? undefined;

        // Reconstruct order items from line items + product metadata
        const items = lineItemsResult.data
          .filter((li) => li.price?.product_data?.metadata?.productId)
          .map((li) => {
            const productId = li.price!.product_data!.metadata!.productId;
            const product = productById.get(productId);
            return {
              name: li.description ?? product?.name ?? "Unknown",
              makerName: product?.makerName ?? li.price?.product_data?.metadata?.makerId ?? "",
              quantity: li.quantity ?? 1,
              priceUsd: product?.priceUsd ?? Math.round((li.amount_total ?? 0) / 100),
            };
          });

        const subtotalUsd = items.reduce((s, i) => s + i.priceUsd * i.quantity, 0);
        const totalUsd = Math.round((session.amount_total ?? 0) / 100);

        await sendOrderConfirmation({
          customerEmail: session.customer_email ?? "",
          sessionId: session.id,
          items,
          deliveryLabel,
          deliveryEta,
          accommodationName,
          roomNumber,
          subtotalUsd,
          deliveryFeeUsd,
          totalUsd,
        });

        console.log(`✅ Order confirmed & emails sent: ${session.id} · $${totalUsd}`);
      } catch (err) {
        // Log but don't return 500 — Stripe would retry and re-send emails
        console.error("Error processing checkout.session.completed:", err);
      }

      break;
    }

    case "checkout.session.expired":
      console.log("⏰ Session expired:", event.data.object.id);
      break;

    default:
      break;
  }

  return new NextResponse(null, { status: 200 });
}
