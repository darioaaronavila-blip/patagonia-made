import { getAllMakers, getProductsByMaker } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import SlimFooter from "@/components/layout/SlimFooter";
import Link from "next/link";

export default async function MakersPage() {
  const makers = await getAllMakers();
  const productCounts = await Promise.all(makers.map(m => getProductsByMaker(m.id)));
  const makersWithCounts = makers.map((maker, i) => ({ maker, productCount: productCounts[i].length }));

  return (
    <>
      <MetaBar />
      <Header />

      {/* Hero */}
      <section style={{
        background: "var(--teal-deep)",
        color: "var(--paper)",
        padding: "100px 48px 80px",
        borderBottom: "1px solid var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.15 }}>
          <svg viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <rect width="1600" height="400" fill="#0d2220"/>
            <path d="M0,200 L160,160 L320,185 L520,140 L720,170 L920,135 L1120,165 L1320,145 L1520,170 L1600,155 L1600,400 L0,400 Z" fill="#1f3530" opacity="0.8"/>
            <path d="M0,260 L140,230 L300,250 L480,210 L680,245 L880,208 L1080,240 L1280,215 L1480,245 L1600,225 L1600,400 L0,400 Z" fill="#132825"/>
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "24px" }}>
            — The makers
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 6vw, 88px)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "32px",
            color: "var(--paper-light)",
          }}>
            The hands<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>behind every piece.</em>
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "20px",
            lineHeight: 1.65,
            color: "rgba(237,228,211,0.75)",
            maxWidth: "580px",
          }}>
            We work only with artisans we know by name and have visited in person.
            {makersWithCounts.reduce((s, m) => s + m.productCount, 0)} pieces,{" "}
            {makers.length} makers, one region at the end of the world.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "80px 48px 0", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "32px" }}>
            {makersWithCounts.map(({ maker, productCount }) => (
              <Link
                key={maker.id}
                href={`/makers/${maker.id}`}
                className="maker-card"
                style={{ background: "var(--paper)", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", border: "1px solid rgba(26,36,34,0.12)", transition: "box-shadow 0.3s", overflow: "hidden" }}
              >
                {/* Photo placeholder */}
                <div style={{
                  aspectRatio: "3/2",
                  background: "var(--teal-deep)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {/* Subtle SVG mountains as placeholder */}
                  <svg viewBox="0 0 300 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }}>
                    <defs>
                      <linearGradient id={`mg-${maker.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3d4d46"/>
                        <stop offset="100%" stopColor="#0d2220"/>
                      </linearGradient>
                    </defs>
                    <rect width="300" height="200" fill={`url(#mg-${maker.id})`}/>
                    <path d="M0,100 L40,70 L80,85 L120,55 L160,75 L200,50 L240,70 L280,55 L300,65 L300,200 L0,200 Z" fill="#1f3530" opacity="0.8"/>
                    <path d="M0,130 L50,105 L100,120 L150,95 L200,115 L250,100 L300,115 L300,200 L0,200 Z" fill="#132825"/>
                  </svg>
                  {/* Person silhouette */}
                  <div style={{ position: "relative", zIndex: 1, textAlign: "center", opacity: 0.45 }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="0.8">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                  {/* Discipline tag */}
                  <div style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    padding: "4px 10px",
                    background: "rgba(26,36,34,0.7)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    backdropFilter: "blur(4px)",
                  }}>
                    {maker.discipline}
                  </div>
                </div>

                {/* Text content */}
                <div style={{ padding: "28px 28px 24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "8px" }}>
                    {maker.location} · Est. {maker.workingSince}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,2.5vw,28px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "14px" }}>
                    {maker.name}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-soft)", marginBottom: "20px", flexGrow: 1 }}>
                    &ldquo;{maker.quote}&rdquo;
                  </p>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rust)", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid rgba(26,36,34,0.1)" }}>
                    <span>{productCount} {productCount === 1 ? "piece" : "pieces"}</span>
                    <span>View maker →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Story pull */}
      <section style={{ padding: "80px 48px", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "20px", lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: "28px" }}>
          Every object in this marketplace was made by someone with a name, a location,
          and a reason for doing things the slow way.
        </p>
        <Link href="/story" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rust)", borderBottom: "1px solid var(--rust)", paddingBottom: "2px" }}>
          Why we built this →
        </Link>
      </section>

      <SlimFooter />
    </>
  );
}

