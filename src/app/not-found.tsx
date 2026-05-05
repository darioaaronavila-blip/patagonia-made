import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <MetaBar />
      <Header />
      <main style={{ padding: "120px 48px", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "96px", fontWeight: 300, fontStyle: "italic", color: "var(--rust)", lineHeight: 1, marginBottom: "24px" }}>
          404
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Lost at <em style={{ fontStyle: "italic" }}>53°S.</em>
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "19px", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "48px" }}>
          Even the wind knows where it&apos;s going. This page doesn&apos;t seem to exist.
        </p>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          Back to the collection →
        </Link>
      </main>
    </>
  );
}
