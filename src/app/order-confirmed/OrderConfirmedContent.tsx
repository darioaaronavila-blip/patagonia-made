"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (sessionId && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  if (!sessionId) {
    return (
      <main style={{ padding: "120px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "20px", color: "var(--ink-soft)" }}>
          No order found.
        </p>
        <Link href="/" style={{ display: "inline-block", marginTop: "24px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          ← Back to shop
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "120px 48px", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
      {/* Compass */}
      <svg width="80" height="80" viewBox="0 0 100 100" style={{ margin: "0 auto 40px", color: "var(--gold)", opacity: 0.8 }}>
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <polygon points="50,12 46,50 50,34 54,50" fill="var(--rust)"/>
        <polygon points="50,88 46,50 50,66 54,50" fill="currentColor" opacity="0.5"/>
        <circle cx="50" cy="50" r="4" fill="currentColor"/>
      </svg>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>
        Order confirmed
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,60px)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "28px" }}>
        Your piece is on<br />
        <em style={{ fontStyle: "italic" }}>its way south.</em>
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", fontStyle: "italic", color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: "16px" }}>
        The maker has been notified. A confirmation email is on its way to your inbox.
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: "56px" }}>
        Every order travels with a hand-written card from the maker — a small piece of Patagonia traveling with your piece.
      </p>

      <div style={{ background: "var(--paper-deep)", padding: "20px 28px", border: "1px solid rgba(26,36,34,0.15)", marginBottom: "56px", display: "inline-block" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-mute)", marginBottom: "6px" }}>
          Reference
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--ink)", letterSpacing: "0.05em" }}>
          {sessionId.slice(0, 24)}…
        </div>
      </div>

      <div>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Back to the collection →
        </Link>
      </div>
    </main>
  );
}
