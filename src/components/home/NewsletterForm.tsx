"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", padding: "16px 0" }}>
        ✓ You&apos;re on the list.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ display: "flex", border: "1px solid rgba(237,228,211,0.3)", width: "100%" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="your@email.com"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "16px 20px",
            background: "transparent",
            border: "none",
            color: "var(--paper)",
            fontFamily: "var(--font-display)",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            flexShrink: 0,
            padding: "16px clamp(14px,3vw,28px)",
            background: "var(--gold)",
            border: "none",
            color: "var(--ink)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
