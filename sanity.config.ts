import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "patagonia-made",
  title: "Patagonia & Made",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Products")
              .child(S.documentTypeList("product").title("All products")),
            S.divider(),
            S.listItem()
              .title("Makers")
              .child(S.documentTypeList("maker").title("All makers")),
          ]),
    }),
    visionTool(), // GROQ query explorer — remove in production if desired
  ],
  schema: { types: schemaTypes },
});
