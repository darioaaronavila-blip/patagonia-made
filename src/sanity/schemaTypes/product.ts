import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
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
      title: "Subcategory",
      type: "string",
      description: 'e.g. "Hand-spun", "Estancia-tanned", "Wheel-thrown"',
    }),
    defineField({
      name: "priceUsd",
      title: "Price (USD)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "priceClp",
      title: "Price (CLP)",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      description: "-1 = unlimited",
      initialValue: -1,
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
      title: "Badge label (override)",
      type: "string",
      description: "Leave empty to use the default badge text",
    }),
    defineField({
      name: "delivery",
      title: "Delivery options",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hotel / accommodation delivery", value: "delivery" },
          { title: "Workshop pickup", value: "pickup" },
        ],
      },
      initialValue: ["delivery", "pickup"],
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "string",
      description: "One line, shown on cards",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});
