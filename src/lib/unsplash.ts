/**
 * Unsplash image utilities for Patagonia & Made.
 *
 * IDs live in products.json / makers.json as `unsplashId`.
 * This helper builds the CDN URL with the right crop and size.
 *
 * HOW TO FIND AN ID:
 *   1. Go to unsplash.com and find a photo
 *   2. The URL is: unsplash.com/photos/{ID}
 *   3. Copy the ID (e.g. "1544441893-675173785232-2a7e7e483c80")
 *   4. Paste it into the relevant entry in products.json or makers.json
 *
 * GOOD SEARCH TERMS FOR EACH CATEGORY:
 *   textiles  → "wool yarn spinning" "handwoven textile" "natural dye fabric"
 *   leather   → "leather craft" "leatherworking" "vegetable tanned leather"
 *   ceramics  → "handmade pottery" "stoneware glaze" "ceramic wheel throwing"
 *   wood      → "woodworking craft" "live edge wood" "hand plane workshop"
 *   provisions→ "jam jars preserve" "artisan food" "berries rustic"
 *   curios    → "vintage compass brass" "antique navigation"
 *   makers    → "artisan portrait" "craftsperson workshop natural light"
 */

/**
 * Returns an Unsplash CDN URL for a given photo ID.
 * Works in the browser without an API key.
 *
 * @param id        - Unsplash photo ID (from the URL: unsplash.com/photos/{id})
 * @param w         - Width in px (default 800)
 * @param h         - Height in px (default 1000)
 * @param crop      - Crop strategy (default "entropy" = most interesting area)
 */
export function unsplashUrl(
  id: string,
  w = 800,
  h = 1000,
  crop: "entropy" | "faces" | "center" | "top" = "entropy"
): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&fit=crop&crop=${crop}&auto=format`;
}

/** 4:5 product card — matches the aspectRatio in ProductCard */
export function productCardUrl(id: string) {
  return unsplashUrl(id, 640, 800);
}

/** Full-size product detail image */
export function productDetailUrl(id: string) {
  return unsplashUrl(id, 960, 1200);
}

/** Maker card — 3:2 landscape */
export function makerCardUrl(id: string) {
  return unsplashUrl(id, 720, 480, "faces");
}

/** Maker banner portrait — tall, crops to face */
export function makerBannerUrl(id: string) {
  return unsplashUrl(id, 800, 1000, "faces");
}
