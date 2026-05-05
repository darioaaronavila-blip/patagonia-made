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
        <main style={{ padding: "120px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "24px", color: "var(--ink-soft)", marginBottom: "32px" }}>
            Your cart is empty.
          </div>
          <Link href="/#shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
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
      <main style={{ padding: "64px 48px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Title */}
        <div style={{ marginBottom: "56px", borderBottom: "1px solid var(--ink)", paddingBottom: "24px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "8px" }}>— Checkout</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em" }}>Almost there.</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "80px", alignItems: "start" }}>

          {/* LEFT */}
          <div>

            {/* Order summary */}
            <div style={{ marginBottom: "48px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "20px" }}>
                Your order · {totalItems} {totalItems === 1 ? "piece" : "pieces"}
              </div>
              <ul style={{ listStyle: "none" }}>
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <li key={item.productId} style={{ padding: "16px 0", borderBottom: "1px solid rgba(26,36,34,0.08)", display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "start" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: "3px" }}>{product.category}</div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, marginBottom: "3px" }}>{product.name}</div>
                        <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "13px", color: "var(--ink-soft)" }}>— {product.makerName}</div>
                        {item.quantity > 1 && (
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--ink-mute)", marginTop: "4px" }}>qty {item.quantity} × ${product.priceUsd}</div>
                        )}
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "19px", fontWeight: 500 }}>${product.priceUsd * item.quantity}</div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Delivery selector + calculator */}
            {!showStripe && (
              <div>
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
                        style={{ background: selected ? "var(--ink)" : "var(--paper)", color: selected ? "var(--paper)" : "var(--ink)", border: "none", padding: "24px 28px", cursor: "pointer", display: "grid", gridTemplateColumns: "20px 1fr auto", gap: "16px", alignItems: "start", textAlign: "left", transition: "all 0.2s" }}
                      >
                        {/* Radio dot */}
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1.5px solid ${selected ? "var(--gold)" : "var(--ink-mute)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3px", flexShrink: 0 }}>
                          {selected && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)" }} />}
                        </div>
                        <div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, marginBottom: "4px" }}>{zone.label}</div>
                          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "14px", opacity: 0.75, marginBottom: "6px" }}>{zone.description}</div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6 }}>
                            {zone.distanceKm} · {zone.etaLabel}
                          </div>
                          {selected && (
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", color: selected ? "rgba(200,156,94,0.9)" : "var(--ink-mute)", marginTop: "8px" }}>
                              e.g. {zone.examples}
                            </div>
                          )}
                        </div>
                        {/* Fee badge */}
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {zoneFee.isFree ? (
                            <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: selected ? "var(--gold)" : "var(--moss)" }}>Free</span>
                          ) : (
                            <>
                              <div style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}>${zone.feeUsd}</div>
                              {zone.freeThresholdUsd > 0 && (
                                <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginTop: "2px" }}>
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

                {/* Pickup option */}
                <div style={{ background: "var(--ink)", border: "1px solid var(--ink)", borderTop: "none" }}>
                  <button
                    onClick={() => setDelivery("pickup")}
                    style={{ background: delivery === "pickup" ? "var(--teal-deep)" : "var(--paper-deep)", color: delivery === "pickup" ? "var(--paper)" : "var(--ink)", border: "none", padding: "24px 28px", cursor: "pointer", display: "grid", gridTemplateColumns: "20px 1fr auto", gap: "16px", alignItems: "start", textAlign: "left", transition: "all 0.2s", width: "100%" }}
                  >
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1.5px solid ${delivery === "pickup" ? "var(--gold)" : "var(--ink-mute)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3px", flexShrink: 0 }}>
                      {delivery === "pickup" && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)" }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 500, marginBottom: "4px" }}>{PICKUP_OPTION.label}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "14px", opacity: 0.75, marginBottom: "6px" }}>{PICKUP_OPTION.description}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6 }}>{PICKUP_OPTION.etaLabel}</div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: delivery === "pickup" ? "var(--gold)" : "var(--moss)" }}>Free</span>
                    </div>
                  </button>
                </div>

                {/* Free delivery nudge */}
                {!isPickup && !fee.isFree && selectedZone?.freeThresholdUsd && selectedZone.freeThresholdUsd > 0 && (
                  <div style={{ marginTop: "16px", padding: "14px 20px", background: "var(--paper-deep)", border: "1px solid rgba(26,36,34,0.15)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-soft)" }}>
                    Add <strong style={{ color: "var(--ink)" }}>${selectedZone.freeThresholdUsd - totalUsd} more</strong> to unlock free delivery to {selectedZone.label}.
                  </div>
                )}
                {!isPickup && fee.isFree && (
                  <div style={{ marginTop: "16px", padding: "14px 20px", background: "rgba(74,93,58,0.08)", border: "1px solid var(--moss)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--moss)" }}>
                    ✓ {fee.reason}
                  </div>
                )}

                <button
                  onClick={() => setShowStripe(true)}
                  style={{ width: "100%", marginTop: "32px", padding: "18px", background: "var(--rust)", color: "var(--paper)", border: "none", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Stripe form */}
            {showStripe && (
              <div>
                <button
                  onClick={() => setShowStripe(false)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "var(--ink-soft)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", marginBottom: "32px" }}
                >
                  ← Back to delivery options
                </button>
                <StripeCheckout items={items} deliveryOption={delivery} />
              </div>
            )}
          </div>

          {/* RIGHT — sticky summary */}
          <div style={{ position: "sticky", top: "40px", background: "var(--paper-deep)", padding: "36px", border: "1px solid var(--ink)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "24px" }}>
              Order total
            </div>

            {/* Line items summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--ink-soft)" }}>
                  {totalItems} {totalItems === 1 ? "piece" : "pieces"}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "18px" }}>${totalUsd}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--ink-soft)" }}>
                  {isPickup ? "Pickup" : selectedZone ? selectedZone.label : "Delivery"}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: fee.isFree ? "var(--moss)" : "var(--ink)" }}>
                  {fee.isFree ? "Free" : `$${fee.feeUsd}`}
                </span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(26,36,34,0.2)", paddingTop: "20px", marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 500 }}>Total</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 500 }}>${grandTotal}</span>
            </div>

            {/* Delivery detail */}
            {selectedZone && (
              <div style={{ padding: "16px", background: "var(--paper)", border: "1px solid rgba(26,36,34,0.1)", marginBottom: "24px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: "6px" }}>
                  Delivery estimate
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink-soft)" }}>
                  {selectedZone.etaLabel}
                </div>
              </div>
            )}

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-mute)", lineHeight: 2 }}>
              <div>✓ Secure payment via Stripe</div>
              <div>✓ Prices in USD</div>
              <div>✓ Maker notified immediately</div>
              <div>✓ Hand-checked before delivery</div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(26,36,34,0.12)", fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.6 }}>
              Every order travels with a hand-written card from the maker.
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
