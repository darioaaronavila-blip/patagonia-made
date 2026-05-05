"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import productsData from "@/data/products.json";
import makersData from "@/data/makers.json";
import type { Product, Maker } from "@/types";

const products = productsData as Product[];
const makers = makersData as Maker[];

interface SearchResult {
  type: "product" | "maker";
  href: string;
  title: string;
  subtitle: string;
  category?: string;
}

function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  const productResults: SearchResult[] = products
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.makerName.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q)
    )
    .slice(0, 5)
    .map(p => ({
      type: "product",
      href: `/products/${p.slug}`,
      title: p.name,
      subtitle: `${p.makerName} · $${p.priceUsd}`,
      category: p.category,
    }));

  const makerResults: SearchResult[] = makers
    .filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q) ||
      m.discipline.toLowerCase().includes(q)
    )
    .slice(0, 3)
    .map(m => ({
      type: "maker",
      href: `/makers/${m.id}`,
      title: m.name,
      subtitle: `${m.discipline} · ${m.location}`,
    }));

  return [...productResults, ...makerResults];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelected(0);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setResults(search(val));
    setSelected(0);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      window.location.href = results[selected].href;
      onClose();
    }
  };

  if (!isOpen) return null;

  const CATEGORY_COLORS: Record<string, string> = {
    textiles: "#9a7a5a",
    leather: "#8a5a38",
    ceramics: "#5a7a8a",
    wood: "#6a5a3a",
    provisions: "#5a7a4a",
    curios: "#7a5a7a",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(26,36,34,0.7)",
          backdropFilter: "blur(4px)",
          animation: "fadeInBackdrop 0.2s ease",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(680px, 96vw)",
        zIndex: 201,
        animation: "slideDown 0.2s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* Search input */}
        <div style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--ink)",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "0 24px",
        }}>
          {/* Search icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products, makers, categories…"
            style={{
              flex: 1,
              padding: "22px 0",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          />

          {/* ESC hint */}
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid rgba(26,36,34,0.2)",
              padding: "4px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Esc
          </button>
        </div>

        {/* Results */}
        {query && (
          <div style={{ background: "var(--paper)", borderTop: "none" }}>
            {results.length === 0 ? (
              <div style={{
                padding: "32px 24px",
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "17px",
                color: "var(--ink-soft)",
              }}>
                Nothing found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul style={{ listStyle: "none" }}>
                {results.map((r, i) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "16px",
                        alignItems: "center",
                        padding: "16px 24px",
                        background: i === selected ? "var(--paper-deep)" : "transparent",
                        borderTop: "1px solid rgba(26,36,34,0.08)",
                        transition: "background 0.15s",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                      onMouseEnter={() => setSelected(i)}
                    >
                      {/* Type indicator */}
                      <div style={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid rgba(26,36,34,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {r.type === "product" ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="m21 15-5-5L5 21"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5">
                            <circle cx="12" cy="8" r="4"/>
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                          </svg>
                        )}
                      </div>

                      {/* Text */}
                      <div>
                        <div style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "17px",
                          fontWeight: 400,
                          marginBottom: "2px",
                        }}>
                          {r.title}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink-soft)",
                        }}>
                          {r.subtitle}
                        </div>
                      </div>

                      {/* Category pill */}
                      {r.category && (
                        <div style={{
                          padding: "3px 8px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--paper)",
                          background: CATEGORY_COLORS[r.category] || "var(--ink-soft)",
                          flexShrink: 0,
                        }}>
                          {r.category}
                        </div>
                      )}
                      {r.type === "maker" && (
                        <div style={{
                          padding: "3px 8px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--paper)",
                          background: "var(--teal-deep)",
                          flexShrink: 0,
                        }}>
                          Maker
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer hint */}
            <div style={{
              padding: "10px 24px",
              borderTop: "1px solid rgba(26,36,34,0.1)",
              display: "flex",
              gap: "20px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
            }}>
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </div>
        )}

        {/* Empty state — show suggestions */}
        {!query && (
          <div style={{ background: "var(--paper)", borderTop: "none", padding: "24px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              marginBottom: "16px",
            }}>
              Try searching for
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["wool", "leather", "mate", "calafate", "lenga", "ceramics"].map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    setResults(search(s));
                    inputRef.current?.focus();
                  }}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid rgba(26,36,34,0.2)",
                    background: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "var(--ink)";
                    (e.currentTarget as HTMLElement).style.color = "var(--paper)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "none";
                    (e.currentTarget as HTMLElement).style.color = "var(--ink-soft)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
