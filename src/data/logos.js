/**
 * Logo Mart inventory — exclusive-sale model.
 * Mark status: 'available' | 'sold'
 * On successful Paystack payment, status should flip to 'sold'
 * (production: webhook + backend; this JSON is the source of truth for display).
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
    a: '[REFUND POLICY — PLACEHOLDER]. Draft something clear before launch (e.g. no refunds after files are delivered; contact within 48 hrs if files are incomplete).',
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

/** Sample inventory — replace thumbnails/mockups with real logo art */
export const logos = [
  {
    id: 'lm-01',
    name: '[LOGO NAME — e.g. Ember Kitchen]', // [PLACEHOLDER]
    industry: 'food',
    style: 'badge',
    price: 25000, // [PRICE]
    status: 'available', // available | sold
    isNew: true,
    thumbnail: '/placeholders/logo-01.svg', // [LOGO THUMBNAIL]
    mockups: [
      '/placeholders/mockup-sign.webp', // [MOCKUP]
      '/placeholders/mockup-card.webp', // [MOCKUP]
      '/placeholders/mockup-phone.webp', // [MOCKUP]
      '/placeholders/mockup-label.webp', // [MOCKUP]
    ],
    colors: ['#FF6B35', '#1A1A1A', '#FAF8F4'],
    description:
      '[Short description of the logo concept — PLACEHOLDER]. Ready for a food or hospitality brand.',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-02',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'fashion',
    style: 'wordmark',
    price: 20000, // [PRICE]
    status: 'available',
    isNew: true,
    thumbnail: '/placeholders/logo-02.svg',
    mockups: [
      '/placeholders/mockup-sign.webp',
      '/placeholders/mockup-card.webp',
      '/placeholders/mockup-phone.webp',
    ],
    colors: ['#1A1A1A', '#C4A484'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-03',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'tech',
    style: 'lettermark',
    price: 30000, // [PRICE]
    status: 'available',
    isNew: false,
    thumbnail: '/placeholders/logo-03.svg',
    mockups: [
      '/placeholders/mockup-sign.webp',
      '/placeholders/mockup-card.webp',
      '/placeholders/mockup-phone.webp',
    ],
    colors: ['#2952E3', '#1A1A1A'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-04',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'services',
    style: 'minimal',
    price: 18000, // [PRICE]
    status: 'sold', // demo sold state
    isNew: false,
    thumbnail: '/placeholders/logo-04.svg',
    mockups: [
      '/placeholders/mockup-sign.webp',
      '/placeholders/mockup-card.webp',
    ],
    colors: ['#1A1A1A', '#6B6B6B'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-05',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'beauty',
    style: 'badge',
    price: 22000, // [PRICE]
    status: 'available',
    isNew: true,
    thumbnail: '/placeholders/logo-05.svg',
    mockups: [
      '/placeholders/mockup-sign.webp',
      '/placeholders/mockup-card.webp',
      '/placeholders/mockup-phone.webp',
      '/placeholders/mockup-label.webp',
    ],
    colors: ['#E8A0BF', '#1A1A1A'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-06',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'faith',
    style: 'badge',
    price: 25000, // [PRICE]
    status: 'available',
    isNew: false,
    thumbnail: '/placeholders/logo-06.svg',
    mockups: [
      '/placeholders/mockup-sign.webp',
      '/placeholders/mockup-card.webp',
      '/placeholders/mockup-phone.webp',
    ],
    colors: ['#1A1A1A', '#D4AF37'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-07',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'food',
    style: 'mascot',
    price: 28000, // [PRICE]
    status: 'available',
    isNew: false,
    thumbnail: '/placeholders/logo-07.svg',
    mockups: [
      '/placeholders/mockup-sign.webp',
      '/placeholders/mockup-label.webp',
      '/placeholders/mockup-phone.webp',
    ],
    colors: ['#FF6B35', '#FAF8F4'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
  {
    id: 'lm-08',
    name: '[LOGO NAME]', // [PLACEHOLDER]
    industry: 'services',
    style: 'wordmark',
    price: 15000, // [PRICE]
    status: 'available',
    isNew: true,
    thumbnail: '/placeholders/logo-08.svg',
    mockups: [
      '/placeholders/mockup-card.webp',
      '/placeholders/mockup-phone.webp',
    ],
    colors: ['#1A1A1A'],
    description: '[PLACEHOLDER description]',
    includes: [
      'SVG + AI source files',
      'PNG (transparent, multiple sizes)',
      '1-page usage mini-guide',
      'Name / tagline swap on request',
      'Minor color tweak included',
    ],
  },
];

export function getLogoById(id) {
  return logos.find((l) => l.id === id);
}

export function formatLogoPrice(naira) {
  return `₦${Number(naira).toLocaleString('en-NG')}`;
}
