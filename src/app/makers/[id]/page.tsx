import { getMakerById, getAllMakers, getProductsByMaker } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import SlimFooter from "@/components/layout/SlimFooter";
import ProductCard from "@/components/shop/ProductCard";
import { makerBannerUrl } from "@/lib/unsplash";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const makers = await getAllMakers();
  return makers.map((m) => ({ id: m.id }));
}

export default async function MakerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const maker = await getMakerById(id);
  if (!maker) notFound();

  const products = await getProductsByMaker(maker.id);

  return (
    <>
      <MetaBar />
      <Header />

      <section style={{ background: "var(--teal-deep)", color: "var(--paper)", padding: "clamp(60px,8vw,100px) var(--gutter) clamp(48px,6vw,80px)", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2, overflow: "hidden" }}>

        {/* Background portrait — real photo if available, SVG fallback otherwise */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", zIndex: 0 }}>
          {maker.unsplashId ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={makerBannerUrl(maker.unsplashId)}
                alt={maker.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
              {/* Fade to teal on the left edge so text stays legible */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, var(--teal-deep) 0%, rgba(19,50,48,0.55) 45%, rgba(19,50,48,0) 100%)",
              }} />
            </>
          ) : (
            /* SVG placeholder — unchanged from original */
            <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="portraitFade" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#133230" stopOpacity="1"/>
                  <stop offset="60%"  stopColor="#133230" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#133230" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="portraitBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#0d2220"/>
                  <stop offset="100%" stopColor="#1a3230"/>
                </linearGradient>
                <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#9a7858"/>
                  <stop offset="100%" stopColor="#6a4838"/>
                </linearGradient>
              </defs>
              <rect width="400" height="600" fill="url(#portraitBg)"/>
              <path d="M0,250 L60,200 L130,230 L200,180 L270,215 L340,185 L400,205 L400,600 L0,600 Z" fill="#1f3530" opacity="0.6"/>
              <path d="M0,320 L80,285 L160,310 L240,275 L320,305 L400,280 L400,600 L0,600 Z" fill="#132825" opacity="0.8"/>
              <ellipse cx="260" cy="220" rx="65" ry="80" fill="url(#skinTone)" opacity="0.35"/>
              <path d="M160,600 Q160,420 200,380 L320,380 Q360,420 360,600 Z" fill="#2a3a36" opacity="0.4"/>
              <rect width="400" height="600" fill="url(#portraitFade)"/>
              <text x="280" y="400" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="8" letterSpacing="2" fill="rgba(200,156,94,0.4)">PHOTO</text>
              <text x="280" y="415" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="8" letterSpacing="2" fill="rgba(200,156,94,0.4)">COMING</text>
            </svg>
          )}
        </div>

        {/* Text content — unchanged from original */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
          <Link href="/makers" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,228,211,0.6)", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
            ← All makers
          </Link>
          <div style={{ display: "grid", gridTemplateColumns: "min(1fr, 600px) 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--gold)" }} />
                {maker.discipline.charAt(0).toUpperCase() + maker.discipline.slice(1)} · {maker.location}
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,6vw,80px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "32px" }}>
                {maker.name}
              </h1>
              <blockquote style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "22px", lineHeight: 1.5, borderLeft: "2px solid var(--gold)", paddingLeft: "24px", color: "rgba(237,228,211,0.9)" }}>
                &ldquo;{maker.quote}&rdquo;
              </blockquote>
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "19px", lineHeight: 1.75, color: "rgba(237,228,211,0.8)", marginBottom: "40px" }}>
                {maker.bio}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "32px", paddingTop: "32px", borderTop: "1px solid rgba(237,228,211,0.2)" }}>
                {[
                  { label: "Based in",      value: maker.location             },
                  { label: "Working since", value: String(maker.workingSince) },
                  { label: "Pieces listed", value: String(products.length)    },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,228,211,0.5)", marginBottom: "6px" }}>{label}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "var(--paper)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(48px,6vw,80px) var(--gutter)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "end", gap: "24px", marginBottom: "56px", borderBottom: "1px solid var(--ink)", paddingBottom: "20px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,48px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 }}>
            {products.length} {products.length === 1 ? "piece" : "pieces"} by{" "}
            <em style={{ fontStyle: "italic", color: "var(--rust)" }}>{maker.name.split(" ")[0]}</em>
          </h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            {maker.discipline} · {maker.location}
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid-3" style={{ gridAutoRows: "1fr" }}>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "20px", color: "var(--ink-soft)" }}>
            No pieces listed yet — check back soon.
          </p>
        )}
      </section>

      <SlimFooter />
    </>
  );
}
