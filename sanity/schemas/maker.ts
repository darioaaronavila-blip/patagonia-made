import { defineType, defineField } from "sanity";

export const makerSchema = defineType({
  name: "maker",
  title: "Maker",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
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
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. Río Verde, Punta Arenas",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "discipline",
      title: "Discipline",
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
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quote",
      title: "Signature quote",
      description: "Shown in the maker spotlight and profile header",
      type: "string",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "portrait",
      title: "Portrait photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "workingSince",
      title: "Working since (year)",
      type: "number",
      validation: (r) => r.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: "featured",
      title: "Featured maker?",
      description: "Shows in the homepage spotlight",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "portrait" },
  },
});
