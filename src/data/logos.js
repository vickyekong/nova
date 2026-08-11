/**
 * Logo Mart inventory — exclusive-sale model.
 * Mock catalogue for design preview.
 * Logo product colors may vary; site chrome uses warm red / Outerspace / white only.
 */

export const logoIndustries = [
  { id: 'all', label: 'All industries' },
  { id: 'food', label: 'Food & drink' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'tech', label: 'Tech' },
  { id: 'services', label: 'Services' },
  { id: 'faith', label: 'Faith-based' },
  { id: 'beauty', label: 'Beauty' },
];

export const logoStyles = [
  { id: 'all', label: 'All styles' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'badge', label: 'Badge / emblem' },
  { id: 'wordmark', label: 'Wordmark' },
  { id: 'lettermark', label: 'Lettermark' },
  { id: 'mascot', label: 'Mascot' },
];

export const logoMartFaq = [
  {
    q: 'Is each logo exclusive?',
    a: 'Yes. Logo Mart uses an exclusive-sale model — once a logo is bought, it’s marked Sold and won’t be sold again. That’s part of what you’re paying for.',
  },
  {
    q: 'What files do I get?',
    a: 'Primary logo (SVG/AI), transparent PNGs in multiple sizes, and a simple 1-page usage mini-guide (colors, fonts, spacing). Name/tagline swap included if you request it at checkout.',
  },
  {
    q: 'Can the name be changed?',
    a: 'Yes — minor name and color tweaks are included. A full redesign is not; that’s what Starter Identity is for.',
  },
  {
    q: 'When do I get my files?',
    a: 'Within 24 hours of payment by email. Instant self-serve download can be enabled later; for now Victore lightly checks the lockup before sending.',
  },
  {
    q: 'What’s the refund policy?',
    a: 'No refunds after files are delivered. If anything is missing from the package, contact us within 48 hours and we’ll make it right.',
  },
  {
    q: 'Logo Mart vs Starter Identity?',
    a: 'Logo Mart = pre-made, buy today, exclusive once sold. Starter Identity = custom logo + brand basics designed for your business from scratch.',
  },
];

export const logoMartHowItWorks = [
  {
    step: '01',
    title: 'Browse',
    body: 'Filter by industry and style. Find a mark that already feels like you.',
  },
  {
    step: '02',
    title: 'Buy',
    body: 'Pay once via Paystack. That logo is yours — exclusive, marked Sold for everyone else.',
  },
  {
    step: '03',
    title: 'Launch',
    body: 'Get your file package within 24 hours. Put it on your sign, WhatsApp, and packaging.',
  },
];

const sharedIncludes = [
  'SVG + AI source files',
  'PNG (transparent, multiple sizes)',
  '1-page usage mini-guide',
  'Name / tagline swap on request',
  'Minor color tweak included',
];

const R = '#E23D28';
const O = '#2D3436';
const W = '#FFFFFF';

/** Mock inventory — marks use brand triad only */
export const logos = [
  {
    id: 'lm-01',
    name: 'Ember Kitchen',
    monogram: 'EK',
    mark: 'badge',
    industry: 'food',
    style: 'badge',
    price: 25000,
    status: 'available',
    isNew: true,
    colors: [R, O, W],
    description:
      'Warm badge mark for a kitchen brand that wants to feel fire-lit and trustworthy — not generic “food clipart.”',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-02',
    name: 'Nneka Line',
    monogram: 'NL',
    mark: 'wordmark',
    industry: 'fashion',
    style: 'wordmark',
    price: 20000,
    status: 'available',
    isNew: true,
    colors: [O, R, W],
    description:
      'Elegant wordmark for a ready-to-wear label — quiet luxury without the agency invoice.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-03',
    name: 'Orbit Labs',
    monogram: 'OL',
    mark: 'lettermark',
    industry: 'tech',
    style: 'lettermark',
    price: 30000,
    status: 'available',
    isNew: false,
    colors: [R, O, W],
    description:
      'Geometric lettermark for a SaaS or studio that needs to look shipped, not sketched.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-04',
    name: 'ClearPath Advisors',
    monogram: 'CP',
    mark: 'minimal',
    industry: 'services',
    style: 'minimal',
    price: 18000,
    status: 'sold',
    isNew: false,
    colors: [O, R, W],
    description:
      'Minimal mark for consultants who want calm authority on decks and LinkedIn.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-05',
    name: 'Bloom & Balm',
    monogram: 'BB',
    mark: 'badge',
    industry: 'beauty',
    style: 'badge',
    price: 22000,
    status: 'available',
    isNew: true,
    colors: [R, O, W],
    description:
      'Soft emblem for a skincare or bodycare line — feminine without the glitter overload.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1571781926291-c77df809d559?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-06',
    name: 'Anchor Faith',
    monogram: 'AF',
    mark: 'badge',
    industry: 'faith',
    style: 'badge',
    price: 25000,
    status: 'available',
    isNew: false,
    colors: [O, R, W],
    description:
      'Steady emblem for a church media arm or faith-based nonprofit that needs presence.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1438232999694-caa4f15fc9bd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-07',
    name: 'Pepper Bird',
    monogram: 'PB',
    mark: 'mascot',
    industry: 'food',
    style: 'mascot',
    price: 28000,
    status: 'available',
    isNew: false,
    colors: [R, O, W],
    description:
      'Playful mascot energy for a spice brand, snack line, or street-food pop-up.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    ],
  },
  {
    id: 'lm-08',
    name: 'Kora Studio',
    monogram: 'KS',
    mark: 'wordmark',
    industry: 'services',
    style: 'wordmark',
    price: 15000,
    status: 'available',
    isNew: true,
    colors: [O, R, W],
    description:
      'Tight wordmark for a creative or architecture studio that wants crisp type, nothing cute.',
    includes: sharedIncludes,
    mockups: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
    ],
  },
];

export function getLogoById(id) {
  return logos.find((l) => l.id === id);
}

export function formatLogoPrice(naira) {
  return `₦${Number(naira).toLocaleString('en-NG')}`;
}
