import { getAllProducts } from "@/lib/data";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import type { Category } from "@/types";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "textiles", label: "Textiles" },
  { key: "leather", label: "Leather" },
  { key: "ceramics", label: "Ceramics" },
  { key: "wood", label: "Wood" },
  { key: "provisions", label: "Provisions" },
  { key: "curios", label: "Curios" },
];

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  textiles: "Hand-spun wool, woven throws and natural-dyed cloth from the estancias of Magallanes.",
  leather: "Estancia-tanned hides worked by hand — belts, wallets, mate cups and riding gear.",
  ceramics: "Wheel-thrown stoneware glazed with colours drawn from the Patagonian landscape.",
  wood: "Native lenga and ñire shaped into objects that carry the grain of the southern forest.",
  provisions: "Small-batch preserves, jams and honeys made from wild and cultivated Patagonian produce.",
  curios: "Restored instruments, antique maps and objects with a history worth knowing.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category as Category | undefined;

  const allProducts = await getAllProducts();
  const filtered = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  const activeCategoryLabel = activeCategory
    ? CATEGORIES.find((c) => c.key === activeCategory)?.label
    : null;

  return (
    <>
      <MetaBar />
      <Header />

      {/* Page header */}
      <section style={{ padding: "64px 48px 0", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "end", gap: "32px", marginBottom: "40px", paddingBottom: "24px", borderBottom: "1px solid var(--ink)" }}>
          <div className="section-number">— Shop</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>
            {activeCategoryLabel
              ? <><em style={{ fontStyle: "italic", color: "var(--rust)" }}>{activeCategoryLabel}</em></>
              : <>All <em style={{ fontStyle: "italic", color: "var(--rust)" }}>pieces</em></>
            }
          </h1>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "right" }}>
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </div>
        </div>

        {/* Category description */}
        {activeCategory && CATEGORY_DESCRIPTIONS[activeCategory] && (
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "18px", color: "var(--ink-soft)", maxWidth: "640px", marginBottom: "40px", lineHeight: 1.6 }}>
            {CATEGORY_DESCRIPTIONS[activeCategory]}
          </p>
        )}

        {/* Category filter tabs */}
        <div style={{ display: "flex", gap: "0", overflowX: "auto", marginBottom: "-1px" }}>
          <Link
            href="/products"
            style={{
              padding: "12px 20px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderTop: "1px solid var(--ink)",
              borderLeft: "1px solid var(--ink)",
              borderBottom: !activeCategory ? "1px solid var(--paper)" : "1px solid var(--ink)",
              background: !activeCategory ? "var(--paper)" : "var(--paper-deep)",
              color: !activeCategory ? "var(--ink)" : "var(--ink-soft)",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
          >
            All
          </Link>
          {CATEGORIES.map(({ key, label }, i) => {
            const isActive = activeCategory === key;
            const isLast = i === CATEGORIES.length - 1;
            return (
              <Link
                key={key}
                href={`/products?category=${key}`}
                style={{
                  padding: "12px 20px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderTop: "1px solid var(--ink)",
                  borderLeft: "1px solid var(--ink)",
                  borderRight: isLast ? "1px solid var(--ink)" : "none",
                  borderBottom: isActive ? "1px solid var(--paper)" : "1px solid var(--ink)",
                  background: isActive ? "var(--paper)" : "var(--paper-deep)",
                  color: isActive ? "var(--ink)" : "var(--ink-soft)",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Product grid */}
      <section style={{ padding: "64px 48px 100px", position: "relative", zIndex: 2 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "20px", color: "var(--ink-soft)", marginBottom: "24px" }}>
              Nothing in this category yet — check back soon.
            </p>
            <Link href="/products" style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rust)" }}>
              ← Browse all pieces
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "56px 32px", gridAutoRows: "1fr" }}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
