import { getAllMakers, getProductsByMaker } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default async function MakersPage() {
  const makers = await getAllMakers();
  const productCounts = await Promise.all(makers.map(m => getProductsByMaker(m.id)));
  const makersWithCounts = makers.map((maker, i) => ({ maker, productCount: productCounts[i].length }));

  return (
    <>
      <MetaBar />
      <Header />

      <section style={{ padding: "80px 48px", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "end", gap: "24px", marginBottom: "64px", borderBottom: "1px solid var(--ink)", paddingBottom: "24px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontStyle: "italic", color: "var(--ink-soft)" }}>— II.</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>
              The <em style={{ fontStyle: "italic", color: "var(--rust)" }}>makers</em>
            </h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "var(--ink)", border: "1px solid var(--ink)" }}>
            {makersWithCounts.map(({ maker, productCount }) => {
              const products = { length: productCount };
              return (
                <Link
                  key={maker.id}
                  href={`/makers/${maker.id}`}
                  style={{ background: "var(--paper)", padding: "48px 40px", display: "block", transition: "background 0.3s" }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "12px" }}>
                    {maker.discipline} · {maker.location}
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "20px" }}>
                    {maker.name}
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "17px", lineHeight: 1.6, color: "var(--ink-soft)", marginBottom: "24px", maxWidth: "440px" }}>
                    &ldquo;{maker.quote}&rdquo;
                  </p>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rust)", display: "flex", alignItems: "center", gap: "8px" }}>
                    {products.length} {products.length === 1 ? "piece" : "pieces"} →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
