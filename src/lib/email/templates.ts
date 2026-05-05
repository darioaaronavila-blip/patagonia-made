// All email templates live here.
// Plain HTML strings — no JSX, no extra deps beyond Resend.
// Styled inline so Gmail/Outlook don't strip the CSS.

const PALETTE = {
  paper: "#ede4d3",
  paperDeep: "#e2d6bf",
  ink: "#1a2422",
  inkSoft: "#4a5450",
  rust: "#b04a2f",
  gold: "#c89c5e",
  moss: "#4a5d3a",
};

function base(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${PALETTE.paper};font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${PALETTE.paper};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:${PALETTE.ink};padding:32px 40px;text-align:center;border-bottom:3px solid ${PALETTE.gold};">
          <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:${PALETTE.gold};">Est. 2026 — Magallanes</p>
          <h1 style="margin:0;font-size:28px;font-weight:400;color:${PALETTE.paper};letter-spacing:-0.02em;">Patagonia <span style="color:${PALETTE.gold};font-style:italic;">&amp;</span> Made</h1>
          <p style="margin:8px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.2em;color:rgba(237,228,211,0.5);text-transform:uppercase;">53°09′S · Punta Arenas, Chile</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:${PALETTE.paper};padding:48px 40px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:${PALETTE.paperDeep};padding:24px 40px;border-top:1px solid rgba(26,36,34,0.15);">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:${PALETTE.inkSoft};text-align:center;">
            Patagonia &amp; Made · Punta Arenas, Chile · patagoniamade.com
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Customer confirmation ─────────────────────────────────────────────────────

export interface OrderEmailData {
  customerEmail: string;
  sessionId: string;
  items: Array<{
    name: string;
    makerName: string;
    quantity: number;
    priceUsd: number;
  }>;
  deliveryLabel: string;
  deliveryEta: string;
  accommodationName?: string;
  roomNumber?: string;
  subtotalUsd: number;
  deliveryFeeUsd: number;
  totalUsd: number;
}

export function customerConfirmationHtml(data: OrderEmailData): string {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid rgba(26,36,34,0.08);">
          <p style="margin:0 0 2px;font-size:16px;color:${PALETTE.ink};font-weight:400;">${item.name}</p>
          <p style="margin:0;font-size:13px;color:${PALETTE.inkSoft};font-style:italic;">— ${item.makerName}${item.quantity > 1 ? ` · qty ${item.quantity}` : ""}</p>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid rgba(26,36,34,0.08);text-align:right;font-size:16px;color:${PALETTE.ink};white-space:nowrap;">
          $${item.priceUsd * item.quantity}
        </td>
      </tr>`
    )
    .join("");

  const deliveryRow =
    data.deliveryFeeUsd > 0
      ? `<tr>
          <td style="padding:10px 0;font-size:14px;color:${PALETTE.inkSoft};">Delivery</td>
          <td style="padding:10px 0;text-align:right;font-size:14px;color:${PALETTE.inkSoft};">$${data.deliveryFeeUsd}</td>
        </tr>`
      : `<tr>
          <td style="padding:10px 0;font-size:14px;color:${PALETTE.moss};">Delivery</td>
          <td style="padding:10px 0;text-align:right;font-size:14px;color:${PALETTE.moss};">Free</td>
        </tr>`;

  const accommodationBlock =
    data.accommodationName
      ? `<tr><td colspan="2" style="padding:16px;background:rgba(26,36,34,0.04);border:1px solid rgba(26,36,34,0.1);">
          <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${PALETTE.inkSoft};">Delivering to</p>
          <p style="margin:0;font-size:15px;color:${PALETTE.ink};">${data.accommodationName}${data.roomNumber ? ` · Room ${data.roomNumber}` : ""}</p>
         </td></tr>`
      : "";

  const content = `
    <h2 style="margin:0 0 8px;font-size:32px;font-weight:300;letter-spacing:-0.02em;color:${PALETTE.ink};">Your order is confirmed.</h2>
    <p style="margin:0 0 32px;font-size:18px;color:${PALETTE.inkSoft};font-style:italic;line-height:1.6;">
      The maker has been notified. Your piece is being prepared with care at the end of the world.
    </p>

    <!-- Items table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${itemRows}
      <tr><td colspan="2" style="padding:4px 0;"></td></tr>
      ${deliveryRow}
      <tr>
        <td style="padding:16px 0 0;border-top:1px solid ${PALETTE.ink};font-size:18px;font-weight:500;color:${PALETTE.ink};">Total</td>
        <td style="padding:16px 0 0;border-top:1px solid ${PALETTE.ink};text-align:right;font-size:24px;font-weight:500;color:${PALETTE.ink};">$${data.totalUsd}</td>
      </tr>
      ${accommodationBlock}
    </table>

    <!-- Delivery info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;background:rgba(26,36,34,0.03);border:1px solid rgba(26,36,34,0.12);">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${PALETTE.inkSoft};">Delivery</p>
        <p style="margin:0 0 4px;font-size:16px;color:${PALETTE.ink};">${data.deliveryLabel}</p>
        <p style="margin:0;font-size:13px;color:${PALETTE.inkSoft};font-style:italic;">${data.deliveryEta}</p>
      </td></tr>
    </table>

    <!-- Sign-off -->
    <p style="margin:0 0 8px;font-size:16px;color:${PALETTE.inkSoft};line-height:1.7;">
      Your piece will arrive with a hand-written card from the maker — a small fragment of Patagonia traveling with it.
    </p>
    <p style="margin:0;font-size:14px;color:${PALETTE.inkSoft};font-family:'Courier New',monospace;letter-spacing:0.05em;">
      Questions? Reply to this email or write to hola@patagoniamade.com
    </p>

    <p style="margin:40px 0 0;font-size:22px;color:${PALETTE.ink};font-style:italic;">— The team at Patagonia &amp; Made</p>
  `;

  return base(content);
}

export function customerConfirmationText(data: OrderEmailData): string {
  const items = data.items
    .map((i) => `  ${i.name} — ${i.makerName} · $${i.priceUsd * i.quantity}`)
    .join("\n");
  return `Order confirmed — Patagonia & Made

${data.items.length} piece${data.items.length > 1 ? "s" : ""} on their way.

${items}

Delivery: ${data.deliveryLabel}
Estimated: ${data.deliveryEta}
${data.accommodationName ? `Delivering to: ${data.accommodationName}${data.roomNumber ? ` · Room ${data.roomNumber}` : ""}` : ""}

Total: $${data.totalUsd} USD

Questions? hola@patagoniamade.com
— Patagonia & Made · Punta Arenas, Chile`;
}

// ── Ops alert (internal) ──────────────────────────────────────────────────────

export function opsAlertHtml(data: OrderEmailData): string {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(26,36,34,0.08);font-size:15px;color:${PALETTE.ink};">${item.name}<br><span style="font-size:12px;color:${PALETTE.inkSoft};font-style:italic;">— ${item.makerName}</span></td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(26,36,34,0.08);text-align:right;font-size:15px;color:${PALETTE.ink};">×${item.quantity} · $${item.priceUsd * item.quantity}</td>
      </tr>`
    )
    .join("");

  const content = `
    <div style="background:${PALETTE.rust};color:${PALETTE.paper};padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">New order received</p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${itemRows}
      <tr>
        <td style="padding:14px 0 0;border-top:1px solid ${PALETTE.ink};font-size:16px;font-weight:500;">Total</td>
        <td style="padding:14px 0 0;border-top:1px solid ${PALETTE.ink};text-align:right;font-size:20px;font-weight:500;">$${data.totalUsd} USD</td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(26,36,34,0.04);border:1px solid rgba(26,36,34,0.12);margin-bottom:24px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${PALETTE.inkSoft};">Delivery details</p>
        <p style="margin:0 0 4px;font-size:15px;color:${PALETTE.ink};">${data.deliveryLabel}</p>
        <p style="margin:0 0 4px;font-size:13px;color:${PALETTE.inkSoft};">${data.deliveryEta}</p>
        ${data.accommodationName ? `<p style="margin:8px 0 0;font-size:15px;color:${PALETTE.ink};font-weight:500;">${data.accommodationName}${data.roomNumber ? ` · Room ${data.roomNumber}` : ""}</p>` : ""}
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(26,36,34,0.04);border:1px solid rgba(26,36,34,0.12);">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:${PALETTE.inkSoft};">Customer</p>
        <p style="margin:0 0 8px;font-size:15px;color:${PALETTE.ink};">${data.customerEmail}</p>
        <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;color:${PALETTE.inkSoft};">Stripe session: ${data.sessionId}</p>
      </td></tr>
    </table>
  `;

  return base(content);
}
