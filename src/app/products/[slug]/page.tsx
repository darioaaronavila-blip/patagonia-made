import Link from "next/link";
import { getProductBySlug, getAllProducts, getMakerById } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { productDetailUrl } from "@/lib/unsplash";
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
      <main style={{ padding: "clamp(32px,4vw,80px) var(--gutter)", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2 product-detail-grid" style={{ alignItems: "start" }}>

          {/* Image */}
          <div
            className="product-detail-image"
            style={{
              aspectRatio: "4/5",
              overflow: "hidden",
              background: "var(--paper-deep)",
              border: "1px solid rgba(26,36,34,0.12)",
              position: "relative",
              ...(!product.unsplashId && {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "12px",
                opacity: 0.4,
              }),
            }}
          >
            {product.unsplashId ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={productDetailUrl(product.unsplashId)}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />
                <div className="product-img-gradient" style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(26,36,34,0.85) 0%, rgba(26,36,34,0.3) 50%, transparent 100%)",
                  pointerEvents: "none",
                }} />
              </>
            ) : (
              <>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="m21 15-5-5L5 21"/>
                </svg>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Photo coming
                </span>
              </>
            )}
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
            <p style={{ fontFamily: "var(--font-body)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "640px", marginBottom: "32px" }}>
              {maker.bio}
            </p>
            <Link href={`/makers/${maker.id}`} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rust)", borderBottom: "1px solid var(--rust)", paddingBottom: "2px" }}>
              All pieces by {maker.name.split(" ")[0]} →
            </Link>
          </div>
        )}
      </main>

      <footer style={{ background: "var(--ink)", color: "var(--paper)", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginTop: "80px" }}>
        <Link href="/" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "18px", letterSpacing: "-0.02em", color: "var(--paper)" }}>
          Patagonia <span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>&amp;</span> Made
        </Link>
        <div style={{ display: "flex", gap: "24px", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", flexWrap: "wrap" }}>
          {[
            { label: "All pieces", href: "/products" },
            { label: "Makers",     href: "/makers"   },
            { label: "Delivery",   href: "/delivery" },
            { label: "Our Story",  href: "/story"    },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{ color: "rgba(237,228,211,0.6)", transition: "color 0.2s" }} className="footer-link">{label}</Link>
          ))}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.35 }}>
          53°09′S 70°55′W
        </div>
      </footer>
    </>
  );
}
