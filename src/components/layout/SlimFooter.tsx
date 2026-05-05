import Link from "next/link";

export default function SlimFooter() {
  return (
    <footer style={{
      background: "var(--ink)",
      color: "var(--paper)",
      padding: "24px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      marginTop: "80px",
    }}>
      <Link href="/" style={{
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "18px",
        letterSpacing: "-0.02em",
        color: "var(--paper)",
        textDecoration: "none",
      }}>
        Patagonia <span style={{ color: "var(--gold)", fontStyle: "italic", fontWeight: 500 }}>&amp;</span> Made
      </Link>
      <div style={{
        display: "flex",
        gap: "24px",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        flexWrap: "wrap",
      }}>
        {[
          { label: "All pieces", href: "/products" },
          { label: "Makers", href: "/makers" },
          { label: "Delivery", href: "/delivery" },
          { label: "Our Story", href: "/story" },
        ].map(({ label, href }) => (
          <Link key={label} href={href} className="footer-link" style={{ color: "rgba(237,228,211,0.6)", transition: "color 0.2s" }}>
            {label}
          </Link>
        ))}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        opacity: 0.35,
        color: "var(--paper)",
      }}>
        53°09′S 70°55′W
      </div>
    </footer>
  );
}
