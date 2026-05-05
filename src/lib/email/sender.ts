import { Resend } from "resend";
import {
  customerConfirmationHtml,
  customerConfirmationText,
  opsAlertHtml,
  type OrderEmailData,
} from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "orders@patagoniamade.com";
const OPS = process.env.EMAIL_OPS ?? "hola@patagoniamade.com";

export async function sendOrderConfirmation(data: OrderEmailData) {
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
    console.error("Failed to send customer confirmation:", customerResult.reason);
  }
  if (opsResult.status === "rejected") {
    console.error("Failed to send ops alert:", opsResult.reason);
  }

  return {
    customerSent: customerResult.status === "fulfilled",
    opsSent: opsResult.status === "fulfilled",
  };
}
