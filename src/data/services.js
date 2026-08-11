/** Services packages — edit prices & inclusions without touching layout */
export const services = [
  {
    id: 'starter-identity',
    name: 'Starter Identity',
    tagline: 'A logo and the basics so you can show up looking real.',
    description:
      'Logo + brand basics (colors, fonts, simple guide). Enough to put on your storefront, WhatsApp, and invoices.',
    includes: [
      'Primary logo + alternate lockup',
      'Color palette (3–5 colors)',
      'Font pairing',
      'Simple 1-page brand guide',
      'PNG + SVG file package',
    ],
    turnaround: '[3–7] business days', // [PLACEHOLDER]
    priceFrom: 75000, // [PLACEHOLDER] ₦
    priceLabel: 'From ₦75,000', // [PLACEHOLDER]
    featured: false,
    icon: 'spark',
  },
  {
    id: 'nova-website',
    name: 'Nova Website',
    tagline: 'A clean 1–5 page site that makes you look open for business.',
    description:
      'Templated-but-custom build. Mobile-first, fast, and ready for Instagram traffic.',
    includes: [
      '1–5 page website',
      'Mobile-first responsive layout',
      'Contact / WhatsApp CTA',
      'Basic SEO setup',
      '1 round of revisions',
    ],
    turnaround: '[5–10] business days', // [PLACEHOLDER]
    priceFrom: 150000, // [PLACEHOLDER]
    priceLabel: 'From ₦150,000', // [PLACEHOLDER]
    featured: false,
    icon: 'layout',
  },
  {
    id: 'launch-bundle',
    name: 'Launch Bundle',
    tagline: 'Identity + website together — the fastest way to look legit.',
    description:
      'Starter Identity and Nova Website combined, at a discounted bundle rate.',
    includes: [
      'Everything in Starter Identity',
      'Everything in Nova Website',
      'Matched brand-to-site handoff',
      'Priority scheduling',
      'Discount vs buying separately',
    ],
    turnaround: '[7–14] business days', // [PLACEHOLDER]
    priceFrom: 200000, // [PLACEHOLDER]
    priceLabel: 'From ₦200,000', // [PLACEHOLDER]
    featured: true,
    icon: 'rocket',
  },
  {
    id: 'social-starter',
    name: 'Social Starter Kit',
    tagline: 'Templates so your feed looks consistent without a designer on retainer.',
    description:
      'Ready-to-edit graphics for posts, stories, and highlights — built around your brand.',
    includes: [
      'Post templates (Canva or Figma)',
      'Story / highlight covers',
      'Profile picture + cover options',
      'Brand color & font applied',
      'Quick usage notes',
    ],
    turnaround: '[2–5] business days', // [PLACEHOLDER]
    priceFrom: 45000, // [PLACEHOLDER]
    priceLabel: 'From ₦45,000', // [PLACEHOLDER]
    featured: false,
    icon: 'share',
  },
];

export const servicesSnapshot = services.map(({ id, name, tagline, icon, priceLabel }) => ({
  id,
  name,
  tagline,
  icon,
  priceLabel,
}));
