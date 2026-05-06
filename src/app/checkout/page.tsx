"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import StripeCheckout from "@/components/cart/StripeCheckout";
import Link from "next/link";
import { DELIVERY_ZONES, PICKUP_OPTION, calcDeliveryFee } from "@/lib/delivery";
import type { DeliveryOption } from "@/types";

export default function CheckoutPage() {
  const { items, totalUsd, totalItems, getProduct } = useCart();
  const [delivery, setDelivery] = useState<DeliveryOption>("downtown");
  const [showStripe, setShowStripe] = useState(false);

  const isPickup = delivery === "pickup";
  const fee = isPickup
    ? { feeUsd: 0, feeCents: 0, isFree: true, reason: "No fee" }
    : calcDeliveryFee(delivery, totalUsd);
  const grandTotal = totalUsd + fee.feeUsd;
  const selectedZone = !isPickup ? DELIVERY_ZONES.find((z) => z.id === delivery) : null;

  if (items.length === 0) {
    return (
      <>
        <MetaBar />
        <Header />
        <main style={{ padding: "120px var(--section-pad-h)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "24px", color: "var(--ink-soft)", marginBottom: "32px" }}>
            Your cart is empty.
          </div>
          <Link href="/products" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Browse the Collection →
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <MetaBar />
      <Header />
      <main style={{ padding: "56px var(--section-pad-h) 100px", maxWidth: "1060px", margin: "0 auto" }}>

        {/* Title */}
        <div style={{ marginBottom: "44px", borderBottom: "1px solid var(--ink)", paddingBottom: "20px", display: "flex", alignItems: "baseline", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-soft)" }}>— Checkout</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em" }}>Almost there.</h1>
        </div>

        {/* On mobile: order summary first, then delivery — achieved via column-reverse on mobile in CSS */}
        <div className="checkout-grid">

          {/* LEFT — delivery options */}
          <div>
            {!showStripe ? (
              <>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "20px" }}>
                  Where should we bring it?
                </div>

                {/* Zone options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--ink)", border: "1px solid var(--ink)", marginBottom: "1px" }}>
                  {DELIVERY_ZONES.map((zone) => {
                    const selected = delivery === zone.id;
                    const zoneFee = calcDeliveryFee(zone.id, totalUsd);
                    return (
                      <button
                        key={zone.id}
                        onClick={() => setDelivery(zone.id as DeliveryOption)}
                        style={{ background: selected ? "var(--ink)" : "var(--paper)", color: selected ? "var(--paper)" : "var(--ink)", border: "none", padding: "22px 28px", cursor: "pointer", display: "grid", gridTemplateColumns: "20px 1fr auto", gap: "16px", alignItems: "center", textAlign: "left", transition: "all 0.2s" }}
                      >
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1.5px solid ${selected ? "var(--gold)" : "var(--ink-mute)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {selected && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)" }} />}
                        </div>
                        <div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 500, marginBottom: "4px" }}>{zone.label}</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>
                            {zone.distanceKm} · {zone.etaLabel}
                          </div>
                          {selected && zone.examples && (
                            <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "13px", opacity: 0.65, marginTop: "6px" }}>
                              e.g. {zone.examples}
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {zoneFee.isFree ? (
                            <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: selected ? "var(--gold)" : "var(--moss)" }}>Free</span>
                          ) : (
                            <>
                              <div style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}>${zone.feeUsd}</div>
                              {zone.freeThresholdUsd > 0 && (
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5, marginTop: "2px" }}>
                                  free over ${zone.freeThresholdUsd}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pickup */}
                <div style={{ background: "var(--ink)", border: "1px solid var(--ink)", borderTop: "none", marginBottom: "12px" }}>
                  <button
                    onClick={() => setDelivery("pickup")}
                    style={{ background: delivery === "pickup" ? "var(--teal-deep)" : "var(--paper-deep)", color: delivery === "pickup" ? "var(--paper)" : "var(--ink)", border: "none", padding: "22px 28px", cursor: "pointer", display: "grid", gridTemplateColumns: "20px 1fr auto", gap: "16px", alignItems: "center", textAlign: "left", transition: "all 0.2s", width: "100%" }}
                  >
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `1.5px solid ${delivery === "pickup" ? "var(--gold)" : "var(--ink-mute)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {delivery === "pickup" && <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--gold)" }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 500, marginBottom: "2px" }}>{PICKUP_OPTION.label}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6 }}>{PICKUP_OPTION.etaLabel}</div>
                    </div>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", color: delivery === "pickup" ? "var(--gold)" : "var(--moss)", flexShrink: 0 }}>Free</span>
                  </button>
                </div>

                {/* Nudge */}
                {!isPickup && !fee.isFree && selectedZone?.freeThresholdUsd && selectedZone.freeThresholdUsd > 0 && (
                  <div style={{ padding: "12px 16px", background: "var(--paper-deep)", border: "1px solid rgba(26,36,34,0.15)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-soft)" }}>
                    Add <strong style={{ color: "var(--ink)" }}>${selectedZone.freeThresholdUsd - totalUsd} more</strong> for free delivery to {selectedZone.label}.
                  </div>
                )}
                {!isPickup && fee.isFree && (
                  <div style={{ padding: "12px 16px", background: "rgba(74,93,58,0.08)", border: "1px solid var(--moss)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--moss)" }}>
                    ✓ {fee.reason}
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowStripe(false)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "var(--ink-soft)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", marginBottom: "24px" }}
                >
                  ← Back to delivery options
                </button>
                <StripeCheckout items={items} deliveryOption={delivery} />
              </>
            )}
          </div>

          {/* RIGHT — order summary */}
          <div style={{ position: "sticky", top: "24px" }}>
            <div style={{ background: "var(--paper-deep)", padding: "36px", border: "1px solid var(--ink)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "16px" }}>
                Order summary
              </div>

              <ul style={{ listStyle: "none", marginBottom: "16px" }}>
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <li key={item.productId} style={{ padding: "10px 0", borderBottom: "1px solid rgba(26,36,34,0.08)", display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", alignItems: "start" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 400, lineHeight: 1.2, marginBottom: "2px" }}>{product.name}</div>
                        <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "12px", color: "var(--ink-soft)" }}>— {product.makerName}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</div>
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>${product.priceUsd * item.quantity}</div>
                    </li>
                  );
                })}
              </ul>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(26,36,34,0.08)" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink-soft)" }}>
                  {isPickup ? "Pickup" : selectedZone?.label ?? "Delivery"}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", color: fee.isFree ? "var(--moss)" : "var(--ink)" }}>
                  {fee.isFree ? "Free" : `$${fee.feeUsd}`}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: "16px", marginBottom: "24px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500 }}>Total</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 500 }}>${grandTotal}</span>
              </div>

              {!showStripe && (
                <button
                  onClick={() => setShowStripe(true)}
                  style={{ width: "100%", padding: "16px", background: "var(--rust)", color: "var(--paper)", border: "none", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s", marginBottom: "16px" }}
                >
                  Continue to Payment →
                </button>
              )}

              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", lineHeight: 2 }}>
                <div>✓ Secure payment via Stripe</div>
                <div>✓ Maker notified immediately</div>
                <div>✓ Hand-checked before delivery</div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
