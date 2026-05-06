import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";
import SlimFooter from "@/components/layout/SlimFooter";
import Link from "next/link";

export const metadata = {
  title: "Our Story — Patagonia & Made",
  description: "Why we built a marketplace at the end of the world.",
};

export default function StoryPage() {
  return (
    <>
      <MetaBar />
      <Header />

      {/* HERO */}
      <section style={{
        background: "var(--ink)",
        color: "var(--paper)",
        padding: "clamp(60px,8vw,120px) var(--gutter 100px",
        borderBottom: "1px solid var(--ink)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.18 }}>
          <svg viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d4d46"/>
                <stop offset="100%" stopColor="#1a2422"/>
              </linearGradient>
            </defs>
            <rect width="1600" height="600" fill="url(#sh)"/>
            <path d="M0,300 L120,260 L280,290 L440,230 L620,270 L800,220 L980,260 L1160,230 L1340,270 L1520,240 L1600,260 L1600,600 L0,600 Z" fill="#1f2d2a"/>
            <path d="M0,380 L100,350 L240,370 L400,320 L600,360 L800,310 L1000,350 L1200,320 L1400,360 L1600,330 L1600,600 L0,600 Z" fill="#152220"/>
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "28px" }}>
            — Our Story
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 300, lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "40px", color: "var(--paper-light)" }}>
            The shop was<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>closed.</em><br />
            <span style={{ fontWeight: 900 }}>Again.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "22px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(237,228,211,0.8)", maxWidth: "640px" }}>
            It was a Tuesday in April. A cruise ship had docked at dawn and by ten
            o&apos;clock four hundred people were walking the streets of Punta Arenas
            looking for something real to take home.
          </p>
        </div>
      </section>

      {/* BODY */}
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "clamp(48px,6vw,100px) var(--gutter" }}>

        {/* I */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--rust)" }}/>
            i. The problem
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            María had been up since five. She&apos;d finished a wool throw the night before —
            three days of spinning, two of weaving, one of washing and blocking in the cold
            air behind her house in Río Verde. She drove it into town that morning and hung
            it in her window with a handwritten price tag.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            By noon she had closed for lunch. By two, a German couple had pressed their
            faces against the glass, photographed the throw on their phones, and walked away.
            They had a flight at six.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink)", fontWeight: 400 }}>
            She never knew they were there.
          </p>
        </div>

        {/* II */}
        <div style={{ borderTop: "1px solid var(--ink)", marginBottom: "80px", paddingTop: "80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--rust)" }}/>
            ii. What we saw
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            Punta Arenas sits at 53° south — closer to the South Pole than to Santiago.
            Every year, tens of thousands of travellers pass through on their way to
            Antarctica, to Tierra del Fuego, to Torres del Paine. They arrive on cruise
            ships that dock at dawn and leave by dusk. They arrive on flights that land at
            midnight. They arrive on road trips that end in a cheap hotel on a Sunday.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            And the workshops close at one. And they don&apos;t open on Saturdays. And the
            artisan who makes the only good leather belt in Magallanes doesn&apos;t have a
            website, doesn&apos;t take cards, and doesn&apos;t speak English.
          </p>
          <blockquote style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "26px", lineHeight: 1.4, borderLeft: "2px solid var(--gold)", paddingLeft: "28px", color: "var(--ink)", margin: "48px 0" }}>
            &ldquo;The wind here takes everything eventually. The wool, the wood, the
            reputation of a craftsman nobody outside the city has ever heard of.&rdquo;
          </blockquote>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)" }}>
            The gap between maker and traveller wasn&apos;t a marketing problem.
            It was a timing problem. A geography problem. A language problem.
            And those are exactly the kinds of problems a well-designed marketplace can solve.
          </p>
        </div>

        {/* III */}
        <div style={{ borderTop: "1px solid var(--ink)", marginBottom: "80px", paddingTop: "80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--rust)" }}/>
            iii. What we built
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            Patagonia &amp; Made is a marketplace that never closes. You can be at
            37,000 feet over the Pacific, in a hotel room at two in the morning, or sitting
            in the departure lounge at Carlos Ibáñez Airport with forty minutes to spare —
            and you can still buy the throw María wove this week.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            We collect the piece directly from the maker. We check it. We bring it to your
            hotel before dinner. Or we ship it to your home, wherever in the world that is,
            with insurance and tracking and a card that carries the maker&apos;s name and
            coordinates.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)" }}>
            Every sale pays the artisan within 48 hours. No intermediaries. No consignment.
            No waiting to see if the piece eventually sells from a shelf while the maker
            wonders whether to keep going.
          </p>
        </div>

        {/* IV */}
        <div style={{ borderTop: "1px solid var(--ink)", marginBottom: "80px", paddingTop: "80px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--rust)" }}/>
            iv. The people behind the pieces
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "28px" }}>
            We work only with makers we know by name and have visited in person.
            Rosa Mansilla in Río Verde, who has been spinning the same sheep&apos;s wool
            for twenty-six years. Héctor Vargas, who shapes lenga and ñire into objects
            that smell of the southern forest long after they leave it. Carmen Díaz, whose
            calafate preserves contain more of Patagonia than any photograph ever could.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.8, color: "var(--ink-soft)" }}>
            These are not craft fair curiosities. They are the material culture of one of
            the most remote inhabited places on earth — made with techniques that took
            generations to develop and that exist nowhere else.
          </p>
        </div>

        {/* CTA block */}
        <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "56px 48px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "22px", lineHeight: 1.6, color: "rgba(237,228,211,0.9)", marginBottom: "40px" }}>
            The shop is open now. It will be open at midnight, on Easter Sunday, and when
            the next ship docks in the grey light of a Patagonian morning.
            The wind can&apos;t close it.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/products" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", background: "var(--rust)", color: "var(--paper)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Browse the collection →
            </Link>
            <Link href="/makers" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", background: "transparent", color: "var(--paper)", border: "1px solid rgba(237,228,211,0.3)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Meet the makers
            </Link>
          </div>
        </div>

      </article>
      <SlimFooter />
    </>
  );
}
