import { DELIVERY_ZONES, PICKUP_OPTION } from "@/lib/delivery";
import MetaBar from "@/components/layout/MetaBar";
import Header from "@/components/layout/Header";

export default function DeliveryPage() {
  return (
    <>
      <MetaBar />
      <Header />

      <section style={{ padding: "clamp(40px,5vw,80px) var(--gutter)", borderBottom: "1px solid var(--ink)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* Title */}
          <div style={{ marginBottom: "64px", borderBottom: "1px solid var(--ink)", paddingBottom: "24px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "8px" }}>— III.</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,5vw,64px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1 }}>
              Delivered, <em style={{ fontStyle: "italic", color: "var(--rust)" }}>your way</em>
            </h1>
          </div>

          {/* Intro */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "640px", marginBottom: "64px" }}>
            We deliver across Punta Arenas and surrounding areas — from city-centre hotels to remote estancias. Order before 18:00 and we pick up directly from the maker that day.
          </p>

          {/* Zones */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--ink)", border: "1px solid var(--ink)", marginBottom: "1px" }}>
            {DELIVERY_ZONES.map((zone) => (
              <div key={zone.id} style={{ background: "var(--paper)", padding: "clamp(20px,3vw,40px)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: "8px" }}>
                      {zone.distanceKm}
                    </div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "8px" }}>
                      {zone.label}
                    </h2>
                    <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "17px", color: "var(--ink-soft)", marginBottom: "12px" }}>
                      {zone.description}
                    </p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "var(--ink-mute)" }}>
                      e.g. {zone.examples}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300 }}>
                      ${zone.feeUsd}
                    </div>
                    {zone.freeThresholdUsd > 0 && (
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--moss)", marginTop: "4px" }}>
                        free over ${zone.freeThresholdUsd}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(26,36,34,0.1)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rust)" }}>
                    {zone.etaLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pickup */}
          <div style={{ background: "var(--teal-deep)", color: "var(--paper)", padding: "clamp(20px,3vw,40px)", borderBottom: "none", marginBottom: "64px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "24px", alignItems: "start" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>
                  Alternative
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 500, marginBottom: "8px" }}>
                  {PICKUP_OPTION.label}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "17px", color: "rgba(237,228,211,0.8)", marginBottom: "12px" }}>
                  {PICKUP_OPTION.description}
                </p>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
                  {PICKUP_OPTION.etaLabel}
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "var(--gold)", flexShrink: 0 }}>
                Free
              </div>
            </div>
          </div>

          {/* How it works */}
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "32px" }}>
              How delivery works
            </h3>
            <div style={{ display: "grid", gap: "1px", background: "var(--ink)", border: "1px solid var(--ink)" }}>
              {[
                { num: "i.", title: "You order", body: "Select your items, choose a delivery zone. We show you the exact fee before you pay." },
                { num: "ii.", title: "We pick up", body: "We collect directly from the maker, inspect the piece, and pack it carefully." },
                { num: "iii.", title: "Delivered", body: "Hand-delivered to your hotel reception or accommodation, with the maker's card inside." },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ background: "var(--paper)", padding: "clamp(20px,3vw,36px) clamp(16px,2vw,28px)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "56px", lineHeight: 0.9, color: "var(--rust)", marginBottom: "16px", fontWeight: 300 }}>{num}</div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 500, marginBottom: "10px" }}>{title}</h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-soft)" }}>{body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
