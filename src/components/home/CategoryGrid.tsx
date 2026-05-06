"use client";

import Link from "next/link";
import type { Category } from "@/types";

interface CategoryItem {
  key: Category;
  label: string;
  counts: number;
}

const ICONS: Record<Category, React.ReactNode> = {
  textiles: <path d="M12 2c-3 4-3 8 0 12 3-4 3-8 0-12zM4 14c4-2 8-2 12 0M4 18c4-2 8-2 12 0M6 22c2-1 4-1 6 0" />,
  leather: <><path d="M4 8c0-2 2-4 4-4h8c2 0 4 2 4 4v10c0 2-2 4-4 4H8c-2 0-4-2-4-4V8z"/><path d="M9 4v4M15 4v4"/></>,
  ceramics: <path d="M8 4h8v3c0 1-1 2-2 2h-1v9c0 2 1 3 2 4H7c1-1 2-2 2-4V9H8c-1 0-2-1-2-2V4z" />,
  wood: <path d="M12 2v20M8 6l4-4 4 4M6 12l6-6 6 6M4 18l8-8 8 8" />,
  provisions: <><rect x="6" y="8" width="12" height="14" rx="1"/><path d="M9 8V4c0-1 1-2 2-2h2c1 0 2 1 2 2v4"/><path d="M6 12h12"/></>,
  curios: <><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M12 6l3 6-3 6-3-6 3-6z"/></>,
};

export default function CategoryGrid({ categories }: { categories: CategoryItem[] }) {
  return (
    <div className="category-grid">
      {categories.map(({ key, label, counts }) => (
        <Link
          key={key}
          href={`/products?category=${key}`}
          className="fade-in"
          style={{ background: "var(--paper)", padding: "36px 24px", cursor: "pointer", textAlign: "center", textDecoration: "none", color: "inherit", display: "block", transition: "background 0.3s, color 0.3s" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--ink)";
            el.style.color = "var(--paper)";
            const icon = el.querySelector(".cat-icon") as SVGElement | null;
            if (icon) icon.style.color = "var(--gold)";
            const count = el.querySelector(".cat-count") as HTMLElement | null;
            if (count) count.style.color = "var(--gold)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--paper)";
            el.style.color = "var(--ink)";
            const icon = el.querySelector(".cat-icon") as SVGElement | null;
            if (icon) icon.style.color = "var(--rust)";
            const count = el.querySelector(".cat-count") as HTMLElement | null;
            if (count) count.style.color = "var(--ink-soft)";
          }}
        >
          <svg className="cat-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 14px", color: "var(--rust)", transition: "color 0.3s" }}>
            {ICONS[key]}
          </svg>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
          <div className="cat-count" style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "13px", color: "var(--ink-soft)", transition: "color 0.3s" }}>{counts} pieces</div>
        </Link>
      ))}
    </div>
  );
}
