import { Suspense } from "react";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import OrderConfirmedContent from "./OrderConfirmedContent";

export default function OrderConfirmedPage() {
  return (
    <>
      <MetaBar />
      <Header />
      <Suspense fallback={
        <main style={{ padding: "120px 48px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "20px", color: "var(--ink-soft)" }}>
            Confirming your order…
          </div>
        </main>
      }>
        <OrderConfirmedContent />
      </Suspense>
    </>
  );
}
