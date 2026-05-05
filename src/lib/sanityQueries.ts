import { sanityClient } from "./sanity";
import type { Product, Maker, Category } from "@/types";

// ── Types for Sanity documents ────────────────────────────────────────────────

// Sanity stores maker as a reference; after projection it's inlined
type SanityProduct = Omit<Product, "makerId" | "makerName"> & {
  maker: { _id: string; name: string; slug: { current: string } };
};

// ── Projections ───────────────────────────────────────────────────────────────

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name,
  "makerId": maker->_id,
  "makerName": maker->name,
  category,
  subcategory,
  shortDescription,
  description,
  "images": images[].asset->url,
  priceUsd,
  priceClp,
  stock,
  badge,
  badgeLabel,
  dimensions,
  material,
  delivery,
  active
}`;

const MAKER_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name,
  location,
  discipline,
  bio,
  quote,
  "portrait": portrait.asset->url,
  workingSince,
  featured
}`;

// ── Queries ───────────────────────────────────────────────────────────────────

export async function sanityGetAllProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && active == true] | order(_createdAt desc) ${PRODUCT_PROJECTION}`
  );
}

export async function sanityGetProductBySlug(slug: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug && active == true][0] ${PRODUCT_PROJECTION}`,
    { slug }
  );
}

export async function sanityGetProductsByCategory(category: Category): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && category == $category && active == true] | order(_createdAt desc) ${PRODUCT_PROJECTION}`,
    { category }
  );
}

export async function sanityGetFeaturedProducts(limit = 6): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && active == true] | order(_createdAt desc) [0...$limit] ${PRODUCT_PROJECTION}`,
    { limit }
  );
}

export async function sanityGetAllMakers(): Promise<Maker[]> {
  return sanityClient.fetch(
    `*[_type == "maker"] | order(name asc) ${MAKER_PROJECTION}`
  );
}

export async function sanityGetMakerBySlug(slug: string): Promise<Maker | null> {
  return sanityClient.fetch(
    `*[_type == "maker" && slug.current == $slug][0] ${MAKER_PROJECTION}`,
    { slug }
  );
}

export async function sanityGetFeaturedMaker(): Promise<Maker | null> {
  return sanityClient.fetch(
    `*[_type == "maker" && featured == true][0] ${MAKER_PROJECTION}`
  );
}

export async function sanityGetProductsByMaker(makerId: string): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && maker._ref == $makerId && active == true] | order(_createdAt desc) ${PRODUCT_PROJECTION}`,
    { makerId }
  );
}

export async function sanityGetCategoryCounts(): Promise<Record<Category, number>> {
  const results: Array<{ category: Category; count: number }> = await sanityClient.fetch(
    `*[_type == "product" && active == true]{category} | {
      "category": category
    }`
  );
  return results.reduce((acc, { category }) => {
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {} as Record<Category, number>);
}
