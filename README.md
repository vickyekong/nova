# Nova — by Novus Africa

Accessible design brand for SMEs: fixed-scope packages, transparent pricing, and **Logo Mart** (exclusive ready-to-buy logos).

**Stack:** React (Vite) + Tailwind CSS + React Router  
**Positioning:** *Novus-grade design, sized for where you are right now.*

## Quick start

```bash
npm install
cp .env.example .env   # add Formspree + Paystack keys
npm run dev
```

Build: `npm run build` · Preview: `npm run preview`

## Commerce decisions (locked in this build)

| Decision | Choice |
|----------|--------|
| Accent | Warm red `#E23D28` |
| Ink / dark | Outerspace `#2D3436` |
| Surface | Perfect white `#FFFFFF` |

The site UI uses **only** these three colors (Outerspace may appear at reduced opacity for secondary text).
| Logo Mart model | **Exclusive sale** — sold logos marked Sold |
| Payments | **Paystack** Inline (NGN) |
| Fulfillment | Email within **24 hours** (not instant download yet) |
| Contact form | **Formspree** via `VITE_FORMSPREE_ID` |

## Env vars

See `.env.example`:

- `VITE_FORMSPREE_ID` — Formspree form ID
- `VITE_PAYSTACK_PUBLIC_KEY` — Paystack public key
- `VITE_WHATSAPP_NUMBER` — international format, no `+`

**Production note:** Logo “sold” status uses data in `src/data/logos.js` plus a localStorage fallback after client checkout. For real exclusivity, add a Paystack webhook + backend that flips `status` to `sold` on `charge.success`.

## Security notes

- Only `VITE_*` values reach the browser — never put a Paystack **secret** key (`sk_…`) or Formspree API token in `.env`; `VITE_PAYSTACK_PUBLIC_KEY` is public by design.
- `vercel.json` sets CSP and hardening headers. When adding a third-party script, image host, or API, add its origin to the matching CSP directive or it will be blocked.
- **Unverified by design (needs a backend):** checkout amount, logo identity and “sold” state are all client-supplied, so a tampered browser can pay the wrong amount or re-buy a sold logo. Verify every `charge.success` server-side against the catalogue price before delivering files.

## CMS-lite data files

Edit these without touching layout:

| File | Contents |
|------|----------|
| `src/data/site.js` | Nav, stats, why Nova, contact |
| `src/data/services.js` | Packages & inclusions |
| `src/data/pricing.js` | Pricing table helpers |
| `src/data/portfolio.js` | Case studies |
| `src/data/testimonials.js` | Quotes |
| `src/data/logos.js` | Logo Mart inventory |

Placeholder content is flagged with `[PLACEHOLDER]`, `[PRICE]`, `[CASE STUDY IMAGE]`, etc.

## Routes

`/` · `/services` · `/logo-mart` · `/logo-mart/:id` · `/logo-mart/success` · `/pricing` · `/portfolio` · `/about` · `/contact`

## Deploy

`vercel.json` rewrites all paths to `index.html` for SPA routing. Connect the repo to Vercel and set the env vars above.
