import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import FadeInScript from "@/components/layout/FadeInScript";

export const metadata: Metadata = {
  title: "Patagonia & Made — Handcrafted at the End of the World",
  description:
    "A curated marketplace of textiles, leather, ceramics and provisions — handcrafted across the windswept south of Chile by the people who still remember how.",
  openGraph: {
    title: "Patagonia & Made",
    description: "Handcrafted at the End of the World. Punta Arenas, Chile.",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
          <FadeInScript />
        </CartProvider>
      </body>
    </html>
  );
}
