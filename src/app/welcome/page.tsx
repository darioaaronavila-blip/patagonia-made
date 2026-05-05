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

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "72px 48px 64px",
          borderBottom: "1px solid rgba(237,228,211,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background mountains — same SVG language as the main site */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.2 }}>
          <svg
            viewBox="0 0 1600 500"
            preserveAspectRatio="xMidYMid slice"
            style={{ width: "100%", height: "100%" }}
          >
            <defs>
              <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2422" />
                <stop offset="100%" stopColor="#3a4a44" />
              </linearGradient>
            </defs>
            <rect width="1600" height="500" fill="url(#wsky)" />
            <path
              d="M0,280 L120,230 L260,260 L400,200 L560,240 L720,190 L880,230 L1040,195 L1200,240 L1360,210 L1520,250 L1600,225 L1600,500 L0,500 Z"
              fill="#2a3a36"
              opacity="0.7"
            />
            <path
              d="M0,340 L100,305 L240,330 L400,275 L580,315 L760,270 L940,310 L1120,275 L1300,320 L1480,290 L1600,315 L1600,500 L0,500 Z"
              fill="#1a2a26"
            />
          </svg>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "880px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--moss)",
                boxShadow: "0 0 0 3px rgba(74,93,58,0.3)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            53°09′S · Punta Arenas, Chile
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 80px)",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: "28px",
              color: "var(--paper-light)",
            }}
          >
            You just arrived.
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              Here&apos;s what Punta Arenas
            </em>
            <br />
            <strong style={{ fontWeight: 900 }}>makes by hand.</strong>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(17px, 2vw, 21px)",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "rgba(237,228,211,0.8)",
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}
          >
            Wool, leather, ceramics and provisions — made by local artisans, available
            right now, delivered to your hotel before dinner.
          </p>

          {/* Primary CTA */}
          <Link
            href="#catalog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 36px",
              background: "var(--rust)",
              color: "var(--paper)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid var(--rust)",
            }}
          >
            Browse the collection ↓
          </Link>
        </div>
      </section>

      {/* ── DELIVERY BANNER ────────────────────────────────────────── */}
      <div
        style={{
          background: "var(--rust)",
          color: "var(--paper)",
          padding: "20px 48px",
          borderBottom: "1px solid var(--ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
        }}
      >
        {/* Icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          style={{ flexShrink: 0, opacity: 0.9 }}
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
          <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
          <path d="M9 14h6" />
        </svg>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              marginBottom: "4px",
            }}
          >
            Same-day hotel delivery in Punta Arenas
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Order before 18:00 · We bring it to your hotel reception tonight ·{" "}
            Free over $150
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "rgba(237,228,211,0.3)",
            flexShrink: 0,
          }}
        />

        {/* Pickup option */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.85,
            textAlign: "center",
          }}
        >
          Or pick up
          <br />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontStyle: "italic", textTransform: "none", letterSpacing: 0, opacity: 1 }}>
            directly at the workshop
          </span>
        </div>
      </div>

      {/* ── CATALOG ────────────────────────────────────────────────── */}
      <section
        id="catalog"
        style={{
          padding: "80px 48px 120px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: "24px",
            marginBottom: "56px",
            borderBottom: "1px solid var(--ink)",
            paddingBottom: "20px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {allProducts.length} pieces,{" "}
            <em style={{ fontStyle: "italic", color: "var(--rust)" }}>
              ready now
            </em>
          </h2>
          <Link
            href="/products"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
              paddingBottom: "4px",
              borderBottom: "1px solid var(--ink-soft)",
            }}
          >
            Full catalog →
          </Link>
        </div>

        {/* Category quick-links */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "56px",
          }}
        >
          {(
            [
              "textiles",
              "leather",
              "ceramics",
              "wood",
              "provisions",
              "curios",
            ] as const
          ).map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              style={{
                padding: "8px 16px",
                border: "1px solid rgba(26,36,34,0.25)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-soft)",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "56px 32px",
            gridAutoRows: "1fr",
          }}
        >
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── TRUST FOOTER ───────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--paper-deep)",
          borderTop: "1px solid var(--ink)",
          padding: "56px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
        }}
      >
        {[
          {
            icon: (
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            ),
            title: "Made here",
            body: "Every piece comes from an artisan in the Magallanes region. We know each maker by name.",
          },
          {
            icon: (
              <>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </>
            ),
            title: "Delivered tonight",
            body: "Order before 18:00 and your piece arrives at your hotel reception the same evening.",
          },
          {
            icon: (
              <>
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </>
            ),
            title: "Pay in USD",
            body: "Checkout in USD with any card. No conversion fees, no cash, no waiting.",
          },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--rust)"
              strokeWidth="1.4"
            >
              {icon}
            </svg>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                lineHeight: 1.65,
                color: "var(--ink-soft)",
              }}
            >
              {body}
            </p>
          </div>
        ))}
      </section>

      {/* ── SLIM FOOTER ────────────────────────────────────────────── */}
      <footer
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "-0.02em",
          }}
        >
          Patagonia{" "}
          <span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>
            &amp;
          </span>{" "}
          Made
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.6,
            flexWrap: "wrap",
          }}
        >
          <Link href="/story" style={{ color: "inherit" }}>Our Story</Link>
          <Link href="/makers" style={{ color: "inherit" }}>Makers</Link>
          <Link href="/delivery" style={{ color: "inherit" }}>Delivery</Link>
          <Link href="/products" style={{ color: "inherit" }}>Full Catalog</Link>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          53°09′S 70°55′W
        </div>
      </footer>
    </>
  );
}
