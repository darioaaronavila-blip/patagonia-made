import Link from "next/link";
import MetaBar from "@/components/layout/MetaBar";
import ProductCard from "@/components/shop/ProductCard";
import { getAllProducts } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You just arrived — Patagonia & Made",
  description:
    "Here's what Punta Arenas makes by hand. Browse the collection and get it delivered to your hotel today.",
};

export default async function WelcomePage() {
  const allProducts = await getAllProducts();

  return (
    <>
      <MetaBar />

      {/* ── HERO ── */}
      <section className="welcome-hero">
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e1614"/>
                <stop offset="55%" stopColor="#1a2a26"/>
                <stop offset="100%" stopColor="#2a3a36"/>
              </linearGradient>
              <linearGradient id="wwater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2624"/>
                <stop offset="100%" stopColor="#0a1210"/>
              </linearGradient>
              <linearGradient id="wdarken" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0e1614" stopOpacity="0.98"/>
                <stop offset="50%" stopColor="#0e1614" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#0e1614" stopOpacity="0.25"/>
              </linearGradient>
            </defs>
            <rect width="1600" height="900" fill="url(#wsky)"/>
            <path d="M0,480 L140,420 L300,460 L480,390 L660,430 L840,375 L1020,415 L1200,380 L1380,425 L1520,395 L1600,415 L1600,900 L0,900 Z" fill="#1f2d2a" opacity="0.7"/>
            <path d="M0,540 L120,500 L260,525 L420,470 L600,510 L780,460 L960,500 L1140,468 L1320,510 L1480,480 L1600,505 L1600,900 L0,900 Z" fill="#152220"/>
            <rect y="680" width="1600" height="220" fill="url(#wwater)"/>
            <rect width="1600" height="900" fill="url(#wdarken)"/>
          </svg>
        </div>

        {/* Top: coordinates */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "24px", paddingTop: "28px", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.8 }}>
            53°09′S — 70°55′W
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,228,211,0.5)" }}>
            <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", background: "var(--moss)", animation: "pulse 2s ease-in-out infinite" }}/>
            Open now
          </div>
        </div>

        {/* Centre: headline */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto", textAlign: "center", padding: "40px 0" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 7.5vh, 96px)",
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginBottom: "28px",
            color: "var(--paper-light)",
          }}>
            You just arrived.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Welcome</em>
            <br />
            <strong style={{ fontWeight: 900 }}>to the end of the world.</strong>
          </h1>

          <p style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgba(237,228,211,0.7)",
            marginBottom: "40px",
            lineHeight: 1.6,
            maxWidth: "540px",
            margin: "0 auto 40px",
          }}>
            Here&apos;s what Punta Arenas makes by hand —
            available right now, delivered to your hotel before dinner.
          </p>

          <Link
            href="#catalog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 36px",
              background: "transparent",
              color: "var(--paper)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid rgba(237,228,211,0.4)",
            }}
          >
            See the collection ↓
          </Link>
        </div>

        {/* Bottom: three maker names */}
        <div className="welcome-makers-row">
          {[
            { name: "Rosa Mansilla", craft: "Wool · Río Verde", since: "Est. 1998" },
            { name: "Héctor Vargas", craft: "Lenga wood · Punta Arenas", since: "Est. 2003" },
            { name: "Carmen Díaz", craft: "Preserves · Magallanes", since: "Est. 2011" },
          ].map(({ name, craft, since }) => (
            <div key={name}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: 400, color: "rgba(237,228,211,0.7)", marginBottom: "4px" }}>{name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(237,228,211,0.35)" }}>{craft} · {since}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DELIVERY BANNER ── */}
      <div className="delivery-banner">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ flexShrink: 0, opacity: 0.9 }}>
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>
          <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/>
          <path d="M9 14h6"/>
        </svg>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(15px,2.2vw,22px)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "4px" }}>
            Same-day hotel delivery in Punta Arenas
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.85 }}>
            Order before 18:00 · Delivered to your hotel tonight · Free over $150
          </div>
        </div>
        <div style={{ width: "1px", height: "36px", background: "rgba(237,228,211,0.3)", flexShrink: 0 }}/>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85, textAlign: "center" }}>
          Or pick up<br/>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>
            directly at the workshop
          </span>
        </div>
      </div>

      {/* ── CATALOG ── */}
      <section id="catalog" className="catalog-section">
        {/* Section header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: "24px", marginBottom: "56px", borderBottom: "1px solid var(--ink)", paddingBottom: "20px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>
            {allProducts.length} pieces,{" "}
            <em style={{ fontStyle: "italic", color: "var(--rust)" }}>ready now</em>
          </h2>
          <Link href="/products" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", paddingBottom: "4px", borderBottom: "1px solid var(--ink-soft)" }}>
            Full catalog →
          </Link>
        </div>

        {/* Category quick-links */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "56px" }}>
          {(["textiles","leather","ceramics","wood","provisions","curios"] as const).map((cat) => (
            <Link key={cat} href={`/products?category=${cat}`} style={{ padding: "8px 16px", border: "1px solid rgba(26,36,34,0.25)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-soft)", transition: "all 0.2s" }}>
              {cat}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div className="product-grid">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── TRUST FOOTER ── */}
      <section className="trust-footer">
        {[
          {
            icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />,
            title: "Made here",
            body: "Every piece comes from an artisan in the Magallanes region. We know each maker by name.",
          },
          {
            icon: (<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
            title: "Delivered tonight",
            body: "Order before 18:00 and your piece arrives at your hotel reception the same evening.",
          },
          {
            icon: (<><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></>),
            title: "Pay in USD",
            body: "Checkout in USD with any card. No conversion fees, no cash, no waiting.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="1.4">{icon}</svg>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 500, letterSpacing: "-0.01em" }}>{title}</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink-soft)" }}>{body}</p>
          </div>
        ))}
      </section>

      {/* ── SLIM FOOTER ── */}
      <footer style={{ background: "var(--ink)", color: "var(--paper)", padding: "24px var(--section-pad-h)" }}>
        <div className="slim-footer-root">
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "18px", letterSpacing: "-0.02em" }}>
            Patagonia{" "}<span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>&amp;</span>{" "}Made
          </div>
          <div style={{ display: "flex", gap: "24px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.6, flexWrap: "wrap" }}>
            <Link href="/story" style={{ color: "inherit" }}>Our Story</Link>
            <Link href="/makers" style={{ color: "inherit" }}>Makers</Link>
            <Link href="/delivery" style={{ color: "inherit" }}>Delivery</Link>
            <Link href="/products" style={{ color: "inherit" }}>Full Catalog</Link>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.4 }}>
            53°09′S 70°55′W
          </div>
        </div>
      </footer>
    </>
  );
}
