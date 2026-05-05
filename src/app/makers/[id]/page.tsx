import { getMakerById, getAllMakers, getProductsByMaker } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/shop/ProductCard";
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

      <section style={{ background: "var(--teal-deep)", color: "var(--paper)", padding: "100px 48px 80px", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Link href="/makers" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(237,228,211,0.6)", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "48px" }}>
            ← All makers
          </Link>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
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
                  { label: "Based in", value: maker.location },
                  { label: "Working since", value: String(maker.workingSince) },
                  { label: "Pieces listed", value: String(products.length) },
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

      <section style={{ padding: "80px 48px", maxWidth: "1200px", margin: "0 auto" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "56px 32px" }}>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "20px", color: "var(--ink-soft)" }}>
            No pieces listed yet — check back soon.
          </p>
        )}
      </section>
    </>
  );
}
