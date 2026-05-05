export type Category =
  | "textiles"
  | "leather"
  | "ceramics"
  | "wood"
  | "provisions"
  | "curios";

// Delivery mode: either a zone ID from DELIVERY_ZONES or "pickup"
export type DeliveryOption = "downtown" | "greater-pa" | "surroundings" | "pickup";

export interface Maker {
  id: string;
  name: string;
  location: string;
  bio: string;
  quote: string;
  workingSince: number;
  discipline: Category;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  makerId: string;
  makerName: string;
  category: Category;
  subcategory: string; // e.g. "Hand-spun", "Estancia-tanned"
  priceUsd: number;
  priceClp: number;
  badge?: "featured" | "heritage" | "limited" | "new" | "bestseller";
  badgeLabel?: string;
  stock: number; // -1 = unlimited (for now)
  delivery: Array<"delivery" | "pickup">;
  description: string;
  shortDescription: string;
  dimensions?: string;
  material?: string;
  slug: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
