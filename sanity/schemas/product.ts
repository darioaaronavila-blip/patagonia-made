import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "maker",
      title: "Maker",
      type: "reference",
      to: [{ type: "maker" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Textiles", value: "textiles" },
          { title: "Leather", value: "leather" },
          { title: "Ceramics", value: "ceramics" },
          { title: "Wood", value: "wood" },
          { title: "Provisions", value: "provisions" },
          { title: "Curios", value: "curios" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory / technique",
      description: "e.g. Hand-spun, Wheel-thrown, Estancia-tanned",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "One sentence — shown in product cards",
      type: "string",
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Product images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "First image is the primary. Recommended: 4:5 ratio, min 1200px wide.",
    }),
    defineField({
      name: "priceUsd",
      title: "Price (USD)",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "priceClp",
      title: "Price (CLP)",
      description: "Chilean pesos — shown below USD price",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "stock",
      title: "Stock quantity",
      description: "Use -1 for unlimited",
      type: "number",
      initialValue: -1,
      validation: (r) => r.required().min(-1),
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      options: {
        list: [
          { title: "Featured", value: "featured" },
          { title: "Heritage", value: "heritage" },
          { title: "Limited", value: "limited" },
          { title: "New arrival", value: "new" },
          { title: "Best seller", value: "bestseller" },
        ],
      },
    }),
    defineField({
      name: "badgeLabel",
      title: "Badge label",
      description: "Override default badge text, e.g. 'Limited · 3 left'",
      type: "string",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: "e.g. 150 × 200 cm",
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
    }),
    defineField({
      name: "delivery",
      title: "Available delivery methods",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Delivery (hotel / accommodation)", value: "delivery" },
          { title: "Workshop pickup", value: "pickup" },
        ],
      },
      initialValue: ["delivery", "pickup"],
    }),
    defineField({
      name: "active",
      title: "Active / visible in shop",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
  orderings: [
    { title: "Price (low → high)", name: "priceAsc", by: [{ field: "priceUsd", direction: "asc" }] },
    { title: "Price (high → low)", name: "priceDesc", by: [{ field: "priceUsd", direction: "desc" }] },
    { title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
});
