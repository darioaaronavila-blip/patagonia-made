"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./SearchOverlay";

const NAV = [
  { label: "Shop", href: "/products" },
  { label: "Makers", href: "/makers" },
  { label: "Our Story", href: "/story" },
  { label: "Delivery", href: "/delivery" },
];

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" onClick={() => setMobileOpen(false)}
            style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "20px", color: "var(--paper)", letterSpacing: "-0.02em" }}>
            Patagonia <span style={{ color: "var(--gold)", fontStyle: "italic" }}>&amp;</span> Made
          </Link>
          <button onClick={() => setMobileOpen(false)}
            style={{ background: "none", border: "none", color: "var(--paper)", padding: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <nav>
          {NAV.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</Link>
          ))}
        </nav>
        <div style={{ marginTop: "auto", paddingTop: "40px", display: "flex", gap: "24px" }}>
          <button onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
            style={{ background: "none", border: "1px solid rgba(237,228,211,0.3)", color: "var(--paper)", padding: "12px 20px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Search
          </button>
          <button onClick={() => { setMobileOpen(false); toggleCart(); }}
            style={{ background: "var(--rust)", border: "none", color: "var(--paper)", padding: "12px 20px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "8px" }}>
            Cart
            <span style={{ background: "rgba(237,228,211,0.25)", borderRadius: "50%", width: "20px", height: "20px", fontSize: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {totalItems}
            </span>
          </button>
        </div>
        <div style={{ marginTop: "24px", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,228,211,0.35)" }}>
          53°09′S — 70°55′W · Punta Arenas
        </div>
      </div>

      <header className="site-header">
        {/* Left nav */}
        <nav className="header-nav-left" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em" }}>
          {NAV.map(({ label, href }) => (
            <Link key={label} href={href}
              style={{ color: "var(--ink)", textTransform: "uppercase", padding: "6px 0", borderBottom: "1px solid transparent", transition: "all 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--rust)"; el.style.borderBottomColor = "var(--rust)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--ink)"; el.style.borderBottomColor = "transparent"; }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Logo — always visible */}
        <Link href="/" style={{ textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(18px,2.5vw,28px)", letterSpacing: "-0.02em", lineHeight: 0.9, color: "inherit" }}>
          <span style={{ fontStyle: "italic", fontWeight: 400, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", display: "block", marginBottom: "6px", color: "var(--ink-soft)" }}>
            Est. 2026 — Magallanes
          </span>
          Patagonia <span style={{ color: "var(--rust)", fontStyle: "italic", fontWeight: 500 }}>&amp;</span> Made
        </Link>

        {/* Right nav — desktop */}
        <nav className="header-nav-right" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em" }}>
          <button onClick={() => setSearchOpen(true)}
            style={{ background: "none", border: "none", color: "var(--ink)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", padding: "6px 0" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Search
          </button>
          <button onClick={toggleCart}
            style={{ background: "none", border: "none", color: "var(--ink)", textTransform: "uppercase", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.12em", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
            Cart
            <span style={{ background: totalItems > 0 ? "var(--rust)" : "var(--ink-mute)", color: "var(--paper)", borderRadius: "50%", width: "20px", height: "20px", fontSize: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
              {totalItems}
            </span>
          </button>
        </nav>

        {/* Mobile — cart + hamburger */}
        <div className="header-nav-mobile">
          <button onClick={toggleCart}
            style={{ background: "none", border: "none", color: "var(--ink)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span style={{ background: "var(--rust)", color: "var(--paper)", borderRadius: "50%", width: "18px", height: "18px", fontSize: "9px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)}
            style={{ background: "none", border: "none", color: "var(--ink)", cursor: "pointer", padding: "4px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
