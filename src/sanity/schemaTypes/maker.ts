import { defineField, defineType } from "sanity";

export const makerSchema = defineType({
  name: "maker",
  title: "Maker",
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
      title: "Slug (ID)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Río Verde", "Punta Arenas"',
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
      title: "Bio",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "string",
      description: "Short quote from the maker — shown in italics throughout the site",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "workingSince",
      title: "Working since (year)",
      type: "number",
      validation: (r) => r.required().min(1900).max(2030),
    }),
    defineField({
      name: "portrait",
      title: "Portrait photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured maker (shown on homepage)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "location",
      media: "portrait",
    },
  },
});
