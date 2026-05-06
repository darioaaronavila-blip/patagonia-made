import Link from "next/link";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/shop/ProductCard";
import CategoryGrid from "@/components/home/CategoryGrid";
import NewsletterForm from "@/components/home/NewsletterForm";
import { getFeaturedProducts, getFeaturedMaker, getCategoryCounts } from "@/lib/data";
import type { Category } from "@/types";

const CATEGORY_LABELS: { key: Category; label: string }[] = [
  { key: "textiles", label: "Textiles" },
  { key: "leather", label: "Leather" },
  { key: "ceramics", label: "Ceramics" },
  { key: "wood", label: "Wood" },
  { key: "provisions", label: "Provisions" },
  { key: "curios", label: "Curios" },
];

export default async function Home() {
  const products = await getFeaturedProducts(6);
  const featuredMaker = await getFeaturedMaker();
  const counts = await getCategoryCounts();

  const categories = CATEGORY_LABELS.map(({ key, label }) => ({
    key,
    label,
    counts: counts[key] || 0,
  }));

  return (
    <>
      <MetaBar />
      <Header />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          overflow: "hidden",
          borderBottom: "1px solid var(--ink)",
          background: "var(--ink)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2422"/><stop offset="40%" stopColor="#243632"/><stop offset="70%" stopColor="#3a4a44"/><stop offset="100%" stopColor="#5a6660"/>
              </linearGradient>
              <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f2d2a"/><stop offset="100%" stopColor="#0e1614"/>
              </linearGradient>
              <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a3a36"/><stop offset="100%" stopColor="#152220"/>
              </linearGradient>
              <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d4d46"/><stop offset="100%" stopColor="#1a2522"/>
              </linearGradient>
              <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2624"/><stop offset="100%" stopColor="#0a1210"/>
              </linearGradient>
              <linearGradient id="darken" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a2422" stopOpacity="0.95"/><stop offset="40%" stopColor="#1a2422" stopOpacity="0.7"/><stop offset="100%" stopColor="#1a2422" stopOpacity="0.45"/>
              </linearGradient>
            </defs>
            <rect width="1600" height="900" fill="url(#sky)"/>
            <path d="M0,520 L100,450 L180,490 L260,420 L340,460 L450,400 L560,470 L680,410 L800,460 L920,400 L1040,470 L1160,420 L1280,480 L1400,440 L1520,490 L1600,460 L1600,900 L0,900 Z" fill="url(#mtn3)" opacity="0.55"/>
            <path d="M0,580 L80,540 L160,560 L240,470 L340,510 L440,460 L540,520 L660,450 L780,500 L900,440 L1020,510 L1160,460 L1280,520 L1400,480 L1520,540 L1600,510 L1600,900 L0,900 Z" fill="url(#mtn2)" opacity="0.85"/>
            <path d="M0,620 L60,580 L130,610 L200,540 L260,580 L330,510 L420,560 L500,500 L580,540 L660,490 L740,540 L820,510 L900,560 L980,520 L1060,580 L1140,540 L1240,590 L1340,560 L1440,610 L1540,580 L1600,610 L1600,900 L0,900 Z" fill="url(#mtn1)"/>
            <rect y="700" width="1600" height="200" fill="url(#water)"/>
            <rect width="1600" height="900" fill="url(#darken)"/>
          </svg>
        </div>

        {/* Rotating compass — top right */}
        <div className="compass-desktop" style={{ position: "absolute", top: "48px", right: "48px", zIndex: 3, width: "120px", height: "120px", opacity: 0.5, color: "var(--gold)" }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <g stroke="currentColor" fill="none" strokeWidth="0.5" style={{ animation: "slow-rotate 60s linear infinite", transformOrigin: "50px 50px" }}>
              <circle cx="50" cy="50" r="48"/>
              <circle cx="50" cy="50" r="36"/>
              <circle cx="50" cy="50" r="2" fill="currentColor"/>
              <line x1="50" y1="2" x2="50" y2="14"/>
              <line x1="50" y1="86" x2="50" y2="98"/>
              <line x1="2" y1="50" x2="14" y2="50"/>
              <line x1="86" y1="50" x2="98" y2="50"/>
              <polygon points="50,8 46,50 50,30 54,50" fill="#b04a2f" stroke="none"/>
              <polygon points="50,92 46,50 50,70 54,50" fill="currentColor" stroke="none"/>
              <text x="50" y="22" textAnchor="middle" fontSize="6" fontFamily="Fraunces, serif" fontStyle="italic" fill="currentColor">N</text>
              <text x="50" y="83" textAnchor="middle" fontSize="6" fontFamily="Fraunces, serif" fontStyle="italic" fill="currentColor">S</text>
              <text x="22" y="52" textAnchor="middle" fontSize="6" fontFamily="Fraunces, serif" fontStyle="italic" fill="currentColor">W</text>
              <text x="78" y="52" textAnchor="middle" fontSize="6" fontFamily="Fraunces, serif" fontStyle="italic" fill="currentColor">E</text>
            </g>
          </svg>
        </div>

        <div className="grid-hero" style={{ position: "relative", zIndex: 2, padding: "clamp(60px,8vw,100px) var(--gutter) clamp(60px,8vw,120px)", color: "var(--paper)", minHeight: "88vh" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "32px", display: "flex", gap: "24px", color: "var(--gold)" }}>
              <span>Vol. I</span><span>Spring 2026</span><span>Punta Arenas</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8.5vw, 132px)", lineHeight: 0.88, letterSpacing: "-0.04em", fontWeight: 300, marginBottom: "32px", color: "var(--paper-light)" }}>
              Made at the<br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--gold)" }}>edge</em> of the<br />
              <strong style={{ fontWeight: 900 }}>known world.</strong>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "22px", fontStyle: "italic", color: "rgba(237,228,211,0.85)", maxWidth: "540px", marginBottom: "40px", lineHeight: 1.45 }}>
              A curated marketplace of textiles, leather, ceramics and provisions — handcrafted across the windswept south of Chile by the people who still remember how.
            </p>
            <a href="#shop" style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "16px 28px", background: "var(--rust)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid var(--rust)" }}>
              Browse the Collection →
            </a>
          </div>
          <div className="hero-stats" style={{ borderLeft: "1px solid rgba(237,228,211,0.25)", paddingLeft: "40px" }}>
            {[
              { label: "Local Makers", value: "42", unit: "artisans" },
              { label: "Pieces in Stock", value: "316", unit: "handmade" },
              { label: "Latitude", value: "53°S", unit: "southernmost" },
            ].map(({ label, value, unit }) => (
              <div key={label} style={{ marginBottom: "36px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>{label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--paper-light)" }}>
                  {value}<span style={{ fontSize: "14px", fontStyle: "italic", color: "rgba(237,228,211,0.6)", marginLeft: "4px" }}>{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "14px 0", overflow: "hidden", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", animation: "marquee 50s linear infinite", whiteSpace: "nowrap", fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {["Hand-spun Patagonian wool","Smoked king crab preserves","Lenga wood carving","Estancia leather goods","Calafate fruit jams","Hotel delivery within hours",
            "Hand-spun Patagonian wool","Smoked king crab preserves","Lenga wood carving","Estancia leather goods","Calafate fruit jams","Hotel delivery within hours"].map((item, i) => (
            <span key={i} style={{ paddingRight: "60px", display: "inline-flex", alignItems: "center", gap: "60px" }}>
              {item} <span style={{ color: "var(--rust)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section style={{ borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }} className="section-pad" id="shop">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "end", gap: "32px", marginBottom: "64px", borderBottom: "1px solid var(--ink)", paddingBottom: "24px" }}>
          <div className="section-number">— I.</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>
            By <em style={{ fontStyle: "italic", color: "var(--rust)" }}>Trade</em>
          </h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "right" }}>
            Six disciplines · {products.length * 5} works
          </div>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }} className="section-pad">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "end", gap: "32px", marginBottom: "64px", borderBottom: "1px solid var(--ink)", paddingBottom: "24px" }}>
          <div className="section-number">— II.</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>
            This <em style={{ fontStyle: "italic", color: "var(--rust)" }}>Week&apos;s</em> Catch
          </h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "right" }}>
            Curated · Updated Mondays
          </div>
        </div>
        <div className="grid-3" style={{ gridAutoRows: "1fr" }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* MAKER FEATURE */}
      {featuredMaker && (
        <section id="makers" className="grid-maker-feature" style={{ background: "var(--teal-deep)", color: "var(--paper)", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
          <div style={{ background: "#0d2220", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "600px", position: "relative" }}>
            <div style={{ textAlign: "center", opacity: 0.3 }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="0.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "12px", color: "var(--gold)" }}>
                Portrait · {featuredMaker.name}
              </p>
            </div>
            <div style={{ position: "absolute", bottom: "32px", left: "32px", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "14px", color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              — Maker №14 / {featuredMaker.location}
            </div>
          </div>
          <div className="maker-text-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--gold)" }} />
              Maker of the Month
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
              {featuredMaker.name}<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>spins the wind.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", lineHeight: 1.7, marginBottom: "32px", color: "rgba(237,228,211,0.85)", maxWidth: "540px" }}>
              {featuredMaker.bio}
            </p>
            <blockquote style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "24px", lineHeight: 1.4, borderLeft: "2px solid var(--gold)", paddingLeft: "24px", marginBottom: "40px" }}>
              &ldquo;{featuredMaker.quote}&rdquo;
            </blockquote>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(16px,3vw,48px)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(237,228,211,0.6)", paddingTop: "32px", borderTop: "1px solid rgba(237,228,211,0.2)" }}>
              {[["Based in", featuredMaker.location], ["Working since", String(featuredMaker.workingSince)], ["Pieces listed", "14"]].map(([lbl, val]) => (
                <div key={lbl}>{lbl} <b style={{ display: "block", color: "var(--paper)", fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, textTransform: "none", letterSpacing: 0, marginTop: "4px" }}>{val}</b></div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section style={{ borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }} className="section-pad" id="story">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "end", gap: "32px", marginBottom: "64px", borderBottom: "1px solid var(--ink)", paddingBottom: "24px" }}>
          <div className="section-number">— IV.</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>
            How it <em style={{ fontStyle: "italic", color: "var(--rust)" }}>works</em>
          </h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "right" }}>For travelers · simple terms</div>
        </div>
        <div className="grid-3-auto">
          {[
            { num: "i.", title: "Browse anytime, anywhere", body: "Closed shops, late flights, public holidays — the marketplace doesn't sleep. Discover makers across Magallanes from your hotel, your plane, or your sofa back home." },
            { num: "ii.", title: "Pay in your currency", body: "Checkout in USD, EUR, or your card's native currency. We handle the conversion and pay the maker in Chilean pesos. No friction, no surprise fees." },
            { num: "iii.", title: "Choose how it reaches you", body: "Delivery to your hotel or accommodation in Punta Arenas and surrounding areas, or pickup directly at the maker's workshop. Every piece travels with the maker's story and a card hand-signed at origin." },
          ].map(({ num, title, body }) => (
            <div key={num} className="how-step" style={{ background: "var(--paper)", padding: "40px 36px", border: "1px solid rgba(26,36,34,0.12)", boxShadow: "0 2px 12px -4px rgba(26,36,34,0.08)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "96px", lineHeight: 0.8, color: "var(--rust)", marginBottom: "24px", fontWeight: 300 }}>{num}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: "16px" }}>{title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "17px", lineHeight: 1.6, color: "var(--ink-soft)" }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link href="/story" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rust)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Why we built this → Read our story
          </Link>
        </div>
      </section>
      <section className="section-pad" style={{ background: "var(--ink)", color: "var(--paper)", textAlign: "center", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,56px)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "20px" }}>
          Letters from <em style={{ fontStyle: "italic", color: "var(--gold)" }}>the south.</em>
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "19px", color: "rgba(237,228,211,0.7)", maxWidth: "540px", margin: "0 auto 40px" }}>
          One slow email a month. Stories from the workshops, new arrivals, weather from the strait. Nothing else.
        </p>
        <NewsletterForm />
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--ink)", color: "var(--paper)", padding: "clamp(48px,6vw,80px) var(--gutter) 32px", position: "relative", zIndex: 2 }}>
        <div className="grid-footer" style={{ marginBottom: "64px", paddingBottom: "48px", borderBottom: "1px solid rgba(237,228,211,0.2)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "24px", marginBottom: "24px" }}>
              <span style={{ display: "block", fontStyle: "italic", fontWeight: 400, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "6px" }}>Est. 2026 — Magallanes</span>
              Patagonia <span style={{ color: "var(--gold)", fontStyle: "italic" }}>&amp;</span> Made
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "17px", lineHeight: 1.6, color: "rgba(237,228,211,0.7)", maxWidth: "380px" }}>
              A marketplace for the makers of the windswept south. Every piece bears the latitude of the hands that made it.
            </p>
          </div>
          {[
            { title: "Shop", links: [
              { label: "All pieces", href: "/products" },
              { label: "Textiles", href: "/products?category=textiles" },
              { label: "Provisions", href: "/products?category=provisions" },
              { label: "Leather", href: "/products?category=leather" },
            ]},
            { title: "Makers", links: [
              { label: "Meet the artisans", href: "/makers" },
              { label: "Rosa Mansilla", href: "/makers/rosa-mansilla" },
              { label: "Héctor Vargas", href: "/makers/hector-vargas" },
              { label: "Apply to sell", href: null },
            ]},
            { title: "Travelers", links: [
              { label: "How delivery works", href: "/delivery" },
              { label: "Workshop pickup", href: "/delivery" },
              { label: "Our story", href: "/story" },
              { label: "Contact", href: null },
            ]},
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", color: "var(--gold)", fontWeight: 500 }}>{title}</h4>
              <ul style={{ listStyle: "none" }}>
                {links.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: "12px" }}>
                    {href ? (
                      <Link href={href} className="footer-link" style={{ color: "rgba(237,228,211,0.75)", fontFamily: "var(--font-display)", fontSize: "16px", transition: "color 0.2s" }}>
                        {label}
                      </Link>
                    ) : (
                      <span style={{ color: "rgba(237,228,211,0.3)", fontFamily: "var(--font-display)", fontSize: "16px", fontStyle: "italic" }}>
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,228,211,0.5)" }}>
          <span>© 2026 Patagonia &amp; Made · Punta Arenas, Chile</span>
          <span>53°09′S 70°55′W · The Strait of Magellan</span>
        </div>
      </footer>
    </>
  );
}
