import { getProductBySlug, getAllProducts, getMakerById } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const maker = await getMakerById(product.makerId);

  return (
    <>
      <MetaBar />
      <Header />
      <main style={{ padding: "80px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          {/* Image placeholder */}
          <div style={{ aspectRatio: "4/5", background: "var(--paper-deep)", border: "1px solid rgba(26,36,34,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px", opacity: 0.4 }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Photo coming</span>
          </div>

          {/* Product info */}
          <div style={{ paddingTop: "24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "8px" }}>
              {product.category} · {product.subcategory}
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,42px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              {product.name}
            </h1>
            <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "17px", color: "var(--ink-soft)", marginBottom: "32px" }}>
              — {product.makerName}{maker ? `, ${maker.location}` : ""}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "42px", fontWeight: 500, marginBottom: "4px" }}>
              ${product.priceUsd}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-soft)", marginBottom: "40px" }}>
              CLP {product.priceClp.toLocaleString("es-CL")}
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-soft)", marginBottom: "40px" }}>
              {product.description}
            </p>
            {(product.dimensions || product.material) && (
              <div style={{ borderTop: "1px solid rgba(26,36,34,0.15)", paddingTop: "24px", marginBottom: "40px" }}>
                {product.dimensions && (
                  <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", minWidth: "100px" }}>Dimensions</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "16px" }}>{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div style={{ display: "flex", gap: "16px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", minWidth: "100px" }}>Material</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "16px" }}>{product.material}</span>
                  </div>
                )}
              </div>
            )}
            <AddToCartButton productId={product.id} stock={product.stock} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "center" }}>
              {product.delivery.includes("delivery") && "Hotel delivery · "}
              {product.delivery.includes("pickup") && "Pickup · "}
              Punta Arenas region
            </div>
          </div>
        </div>

        {maker && (
          <div style={{ marginTop: "120px", paddingTop: "64px", borderTop: "1px solid var(--ink)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "24px" }}>
              About the maker
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,42px)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: "24px" }}>
              {maker.name}
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "640px" }}>
              {maker.bio}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
