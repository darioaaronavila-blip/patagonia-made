import { Resend } from "resend";
import {
  customerConfirmationHtml,
  customerConfirmationText,
  opsAlertHtml,
  type OrderEmailData,
} from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? "orders@patagoniamade.com";
const OPS = process.env.OPS_EMAIL ?? "hola@patagoniamade.com";

export async function sendOrderConfirmation(data: OrderEmailData) {
  console.log("📧 Sending emails...");
  console.log("   FROM:", FROM);
  console.log("   TO customer:", data.customerEmail);
  console.log("   TO ops:", OPS);
  console.log("   API key present:", !!process.env.RESEND_API_KEY);

  const [customerResult, opsResult] = await Promise.allSettled([
    // Customer confirmation
    resend.emails.send({
      from: `Patagonia & Made <${FROM}>`,
      to: data.customerEmail,
      subject: `Your order is confirmed — ${data.items.length} piece${data.items.length > 1 ? "s" : ""} from Punta Arenas`,
      html: customerConfirmationHtml(data),
      text: customerConfirmationText(data),
    }),
    // Ops alert
    resend.emails.send({
      from: `Patagonia & Made <${FROM}>`,
      to: OPS,
      subject: `New order · $${data.totalUsd} · ${data.items.length} piece${data.items.length > 1 ? "s" : ""}`,
      html: opsAlertHtml(data),
    }),
  ]);

  if (customerResult.status === "rejected") {
    console.error("❌ Failed to send customer confirmation:", customerResult.reason);
  } else {
    console.log("✅ Customer email sent:", JSON.stringify(customerResult.value));
  }
  if (opsResult.status === "rejected") {
    console.error("❌ Failed to send ops alert:", opsResult.reason);
  } else {
    console.log("✅ Ops email sent:", JSON.stringify(opsResult.value));
  }

  return {
    customerSent: customerResult.status === "fulfilled",
    opsSent: opsResult.status === "fulfilled",
  };
}
