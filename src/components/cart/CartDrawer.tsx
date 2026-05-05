"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalUsd, getProduct } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,36,34,0.5)",
            zIndex: 90,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(480px, 100vw)",
          background: "var(--paper)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "-20px 0 60px rgba(26,36,34,0.2)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "28px 32px 24px", borderBottom: "1px solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 500, lineHeight: 1 }}>
              Your Cart
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", marginTop: "6px" }}>
              {totalItems} {totalItems === 1 ? "piece" : "pieces"}
            </div>
          </div>
          <button
            onClick={closeCart}
            style={{ background: "none", border: "1px solid var(--ink)", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--ink)" }}
            aria-label="Close cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0" }}>
          {items.length === 0 ? (
            <div style={{ padding: "80px 32px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "19px", color: "var(--ink-soft)", marginBottom: "24px" }}>
                Nothing here yet.
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
                Browse the collection below
              </p>
              <button
                onClick={closeCart}
                style={{ marginTop: "32px", padding: "12px 24px", background: "var(--ink)", color: "var(--paper)", border: "none", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul style={{ listStyle: "none", borderBottom: "1px solid rgba(26,36,34,0.12)" }}>
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <li
                    key={item.productId}
                    style={{ padding: "24px 32px", borderBottom: "1px solid rgba(26,36,34,0.08)", display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "start" }}
                  >
                    <div>
                      {/* Category tag */}
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: "6px" }}>
                        {product.category} · {product.subcategory}
                      </div>
                      {/* Name */}
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={closeCart}
                        style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, lineHeight: 1.2, display: "block", marginBottom: "4px" }}
                      >
                        {product.name}
                      </Link>
                      {/* Maker */}
                      <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "13px", color: "var(--ink-soft)", marginBottom: "16px" }}>
                        — {product.makerName}
                      </div>
                      {/* Quantity controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          style={{ width: "32px", height: "32px", border: "1px solid var(--ink)", background: "none", fontFamily: "var(--font-mono)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span style={{ width: "40px", height: "32px", border: "1px solid var(--ink)", borderLeft: "none", borderRight: "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          style={{ width: "32px", height: "32px", border: "1px solid var(--ink)", background: "none", fontFamily: "var(--font-mono)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          style={{ marginLeft: "12px", background: "none", border: "none", color: "var(--ink-mute)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 0" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 500 }}>
                        ${product.priceUsd * item.quantity}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-mute)", marginTop: "2px" }}>
                          ${product.priceUsd} each
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div style={{ padding: "24px 32px 32px", borderTop: "1px solid var(--ink)", background: "var(--paper-light)" }}>
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                Subtotal
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 500 }}>
                ${totalUsd}
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--ink-mute)", letterSpacing: "0.1em", marginBottom: "24px" }}>
              Delivery calculated at checkout · Prices in USD
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{ display: "block", width: "100%", padding: "18px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center", marginBottom: "12px", transition: "background 0.3s" }}
            >
              Proceed to Checkout →
            </Link>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              style={{ display: "block", width: "100%", padding: "14px", background: "none", border: "1px solid rgba(26,36,34,0.3)", color: "var(--ink-soft)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
