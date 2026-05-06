import type { Product } from "@/types";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { productCardUrl } from "@/lib/unsplash";

interface ProductCardProps {
  product: Product;
}

const badgeStyles: Record<string, React.CSSProperties> = {
  featured:   { background: "var(--rust)",  color: "var(--paper)", borderColor: "var(--rust)" },
  heritage:   { background: "var(--ink)",   color: "var(--gold)",  borderColor: "var(--ink)"  },
  limited:    { background: "var(--paper)", color: "var(--ink)",   borderColor: "var(--ink)"  },
  new:        { background: "var(--paper)", color: "var(--ink)",   borderColor: "var(--ink)"  },
  bestseller: { background: "var(--rust)",  color: "var(--paper)", borderColor: "var(--rust)" },
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer", position: "relative", textDecoration: "none", color: "inherit", height: "100%" }}
      className="fade-in"
    >
      {/* Image area */}
      <div
        style={{
          aspectRatio: "4/5",
          overflow: "hidden",
          marginBottom: "20px",
          position: "relative",
          background: "var(--paper-deep)",
          border: "1px solid rgba(26,36,34,0.12)",
        }}
      >
        {product.unsplashId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={productCardUrl(product.unsplashId)}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
            }}
            className="product-card-img"
          />
        ) : (
          /* Fallback placeholder — shown until unsplashId is set */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              opacity: 0.35,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Photo coming
            </span>
          </div>
        )}

        {/* Category tag */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          padding: "4px 10px",
          background: "rgba(26,36,34,0.72)",
          color: "var(--paper)",
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          zIndex: 2,
          backdropFilter: "blur(4px)",
        }}>
          {product.category}
        </div>

        {/* Badge */}
        {product.badge && product.badgeLabel && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              padding: "6px 12px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "1px solid",
              zIndex: 2,
              ...badgeStyles[product.badge],
            }}
          >
            {product.badgeLabel}
          </div>
        )}
      </div>

      {/* Info — unchanged from original */}
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "start", marginBottom: "16px", flexGrow: 1 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "6px" }}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)} · {product.subcategory}
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, lineHeight: 1.15, marginBottom: "8px" }}>
              {product.name}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-soft)" }}>
              — {product.makerName}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 500 }}>
              ${product.priceUsd}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-soft)", marginTop: "4px" }}>
              CLP {product.priceClp.toLocaleString("es-CL")}
            </div>
          </div>
        </div>
        <AddToCartButton productId={product.id} stock={product.stock} />
      </div>
    </Link>
  );
}
