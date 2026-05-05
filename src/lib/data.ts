// Unified data layer.
// When NEXT_PUBLIC_SANITY_PROJECT_ID is set → reads from Sanity (production).
// Otherwise → reads from local JSON (development / pre-Sanity).
// This means you can run the app before setting up Sanity.

import localProducts from "@/data/products.json";
import localMakers from "@/data/makers.json";
import type { Product, Maker, Category } from "@/types";

const USE_SANITY = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// ── Lazy-load Sanity queries only when needed ─────────────────────────────────

async function sanity() {
  return import("./sanityQueries");
}

// ── Products ──────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (USE_SANITY) return (await sanity()).sanityGetAllProducts();
  return localProducts as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (USE_SANITY) return (await sanity()).sanityGetProductBySlug(slug) ?? undefined;
  return (localProducts as Product[]).find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  if (USE_SANITY) return (await sanity()).sanityGetProductsByCategory(category);
  return (localProducts as Product[]).filter((p) => p.category === category);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (USE_SANITY) return (await sanity()).sanityGetFeaturedProducts(limit);
  return (localProducts as Product[]).slice(0, limit);
}

export async function getProductsByMaker(makerId: string): Promise<Product[]> {
  if (USE_SANITY) return (await sanity()).sanityGetProductsByMaker(makerId);
  return (localProducts as Product[]).filter((p) => p.makerId === makerId);
}

// ── Makers ────────────────────────────────────────────────────────────────────

export async function getAllMakers(): Promise<Maker[]> {
  if (USE_SANITY) return (await sanity()).sanityGetAllMakers();
  return localMakers as Maker[];
}

export async function getMakerById(id: string): Promise<Maker | undefined> {
  if (USE_SANITY) {
    // Sanity uses slug for routing; fall back to find by id
    const makers = await (await sanity()).sanityGetAllMakers();
    return makers.find((m) => m.id === id);
  }
  return (localMakers as Maker[]).find((m) => m.id === id);
}

export async function getFeaturedMaker(): Promise<Maker | undefined> {
  if (USE_SANITY) return (await sanity()).sanityGetFeaturedMaker() ?? undefined;
  return (localMakers as Maker[]).find((m) => m.featured);
}

export async function getCategoryCounts(): Promise<Record<Category, number>> {
  if (USE_SANITY) return (await sanity()).sanityGetCategoryCounts();
  const products = localProducts as Product[];
  return products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);
}

// ── Sync helpers for cart (always from local index — cart runs client-side) ──
// These are non-async for use in CartContext which needs synchronous access.

const _localProductIndex = new Map(
  (localProducts as Product[]).map((p) => [p.id, p])
);

export function getProductByIdSync(id: string): Product | undefined {
  return _localProductIndex.get(id);
}
