"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <header style={{
        padding: "28px 48px 24px",
        borderBottom: "1px solid var(--ink)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "32px",
        position: "relative",
        zIndex: 10,
        background: "var(--paper)",
      }}>
        {/* Left nav */}
        <nav style={{ display: "flex", gap: "32px", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em" }}>
          {[
            { label: "Shop", href: "/products" },
            { label: "Makers", href: "/makers" },
            { label: "Our Story", href: "/story" },
            { label: "Delivery", href: "/delivery" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ color: "var(--ink)", textTransform: "uppercase", padding: "6px 0", borderBottom: "1px solid transparent", transition: "all 0.3s" }}
              onMouseEnter={e => {
                const el = e.target as HTMLElement;
                el.style.color = "var(--rust)";
                el.style.borderBottomColor = "var(--rust)";
              }}
              onMouseLeave={e => {
                const el = e.target as HTMLElement;
                el.style.color = "var(--ink)";
                el.style.borderBottomColor = "transparent";
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link href="/" style={{ textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "28px", letterSpacing: "-0.02em", lineHeight: 0.9, textDecoration: "none", color: "inherit" }}>
          <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: "6px", color: "var(--ink-soft)" }}>
            Est. 2026 — Magallanes
          </span>
          <span>Patagonia <span style={{ color: "var(--rust)", fontStyle: "italic", fontWeight: 500 }}>&amp;</span> Made</span>
        </Link>

        {/* Right nav */}
        <nav style={{ display: "flex", gap: "28px", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em", justifyContent: "flex-end", alignItems: "center" }}>
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            style={{ background: "none", border: "none", color: "var(--ink)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: "6px 0" }}
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Search
          </button>

          {/* Cart */}
          <button
            onClick={toggleCart}
            aria-label={`Cart — ${totalItems} items`}
            style={{ background: "none", border: "none", color: "var(--ink)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          >
            Cart
            <span style={{
              background: totalItems > 0 ? "var(--rust)" : "var(--ink-mute)",
              color: "var(--paper)",
              borderRadius: "50%",
              width: "20px", height: "20px",
              fontSize: "10px",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.3s",
            }}>
              {totalItems}
            </span>
          </button>
        </nav>
      </header>
    </>
  );
}
