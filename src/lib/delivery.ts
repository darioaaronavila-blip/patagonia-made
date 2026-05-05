// Delivery zones for Punta Arenas & surrounding areas.
// All fees in USD cents (for Stripe) and USD (for display).
// Expand zones here as coverage grows — nothing else needs to change.

export type DeliveryMode = "delivery" | "pickup";

export interface DeliveryZone {
  id: string;
  label: string;               // Shown in selector
  description: string;         // Shown as subtitle
  examples: string;            // "e.g. Hotel José Nogueira, Enjoy Punta Arenas"
  distanceKm: string;          // Displayed range
  feeUsd: number;              // 0 = free
  feeCents: number;            // feeUsd * 100
  freeThresholdUsd: number;    // order total above which delivery is free (0 = never)
  etaLabel: string;            // "Same day before 18:00"
  available: boolean;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "downtown",
    label: "Punta Arenas city centre",
    description: "Hotels, hostels and addresses within the city grid",
    examples: "Hotel José Nogueira, Enjoy Punta Arenas, Dreams, Cabo de Hornos",
    distanceKm: "0 – 5 km",
    feeUsd: 8,
    feeCents: 800,
    freeThresholdUsd: 150,
    etaLabel: "Same day · delivered before 18:00",
    available: true,
  },
  {
    id: "greater-pa",
    label: "Greater Punta Arenas",
    description: "Outlying neighbourhoods, airport hotels and port lodges",
    examples: "Aeropuerto area, Zona Franca, Puerto Hambre road",
    distanceKm: "5 – 25 km",
    feeUsd: 15,
    feeCents: 1500,
    freeThresholdUsd: 250,
    etaLabel: "Same day · delivered before 20:00",
    available: true,
  },
  {
    id: "surroundings",
    label: "Surrounding estancias & lodges",
    description: "Estancias, eco-lodges and rural accommodation near Punta Arenas",
    examples: "Estancia Río Verde, Parque del Estrecho, Reserva Laguna Parrillar",
    distanceKm: "25 – 80 km",
    feeUsd: 35,
    feeCents: 3500,
    freeThresholdUsd: 0,     // Never free — distance too large
    etaLabel: "Next morning · confirmed by 09:00",
    available: true,
  },
];

export const PICKUP_OPTION = {
  id: "pickup",
  label: "Pickup at the maker's workshop",
  description: "Reserve online, collect in person — see the workshop",
  examples: "Hours and address shown on each product page",
  feeUsd: 0,
  feeCents: 0,
  etaLabel: "At your convenience · during opening hours",
};

// ── Fee calculator ────────────────────────────────────────────────────────────

export function calcDeliveryFee(
  zoneId: string,
  orderTotalUsd: number
): { feeUsd: number; feeCents: number; isFree: boolean; reason: string } {
  const zone = DELIVERY_ZONES.find((z) => z.id === zoneId);
  if (!zone) {
    return { feeUsd: 0, feeCents: 0, isFree: true, reason: "Pickup — no fee" };
  }

  const qualifiesForFree =
    zone.freeThresholdUsd > 0 && orderTotalUsd >= zone.freeThresholdUsd;

  if (qualifiesForFree) {
    return {
      feeUsd: 0,
      feeCents: 0,
      isFree: true,
      reason: `Free delivery on orders over $${zone.freeThresholdUsd}`,
    };
  }

  return {
    feeUsd: zone.feeUsd,
    feeCents: zone.feeCents,
    isFree: false,
    reason: `Delivery to ${zone.label}`,
  };
}

export function getZoneById(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}
