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
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          padding: "16px 0",
        }}
      >
        ✓ You&apos;re on the list.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "480px",
        margin: "0 auto",
        border: "1px solid rgba(237,228,211,0.3)",
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="your@email.com"
        style={{
          flex: 1,
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
          padding: "16px 28px",
          background: "var(--gold)",
          border: "none",
          color: "var(--ink)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--paper)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "var(--gold)";
        }}
      >
        Subscribe
      </button>
    </div>
  );
}
