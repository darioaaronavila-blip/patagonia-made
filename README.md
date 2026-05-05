# Patagonia & Made

Marketplace for Patagonian artisan goods. Built with Next.js 15 (App Router), TypeScript, plain CSS custom properties.

## Stack
- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: CSS custom properties (no Tailwind)
- **Payments**: Stripe Embedded Checkout
- **Email**: Resend
- **Data**: Local JSON → database later
- **Deployment**: Vercel (region: gru1 São Paulo)

## Routes
| Route | Description |
|---|---|
| `/` | Home — hero, categories, featured products, maker spotlight |
| `/products/[slug]` | Product detail + add to cart |
| `/makers` | All makers index |
| `/makers/[id]` | Maker profile + their products |
| `/checkout` | Delivery zone selector + Stripe Embedded Checkout |
| `/order-confirmed` | Post-payment confirmation |
| `/delivery` | Delivery zones & pricing info |
| `/api/webhooks/stripe` | Stripe webhook handler |

## Delivery zones
Defined in `src/lib/delivery.ts` — single source of truth.
| Zone | Range | Fee | Free over |
|---|---|---|---|
| Punta Arenas city centre | 0–5 km | $8 | $150 |
| Greater Punta Arenas | 5–25 km | $15 | $250 |
| Surrounding estancias & lodges | 25–80 km | $35 | Never |
| Workshop pickup | — | Free | — |

## Setup

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.local.example .env.local
# Fill in: STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, RESEND_API_KEY

# 3. Run
npm run dev

# 4. In a second terminal — forward Stripe webhooks locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Paste the whsec_... value as STRIPE_WEBHOOK_SECRET in .env.local
```

## Deployment (Vercel)
```bash
# 1. Push to GitHub
# 2. Import repo at vercel.com/new
# 3. Add all env vars from .env.local.example in Vercel dashboard
# 4. Set NEXT_PUBLIC_SITE_URL to your production domain
# 5. Add production webhook endpoint in Stripe dashboard:
#    https://yourdomain.com/api/webhooks/stripe
```

## What's next
- [ ] Database (Supabase) for order history once volume grows
- [ ] Customer accounts
- [ ] Maker admin panel to manage inventory
- [ ] Puerto Natales expansion (new delivery zone)
- [ ] Real maker photography replacing SVG placeholders
