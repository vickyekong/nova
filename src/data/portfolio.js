/** Portfolio cases — replace image paths with real assets before launch */
export const portfolioFilters = [
  { id: 'all', label: 'All' },
  { id: 'logo', label: 'Logo' },
  { id: 'website', label: 'Website' },
  { id: 'bundle', label: 'Full Bundle' },
];

export const portfolio = [
  {
    id: 'case-01',
    title: '[CASE STUDY NAME]', // [PLACEHOLDER]
    businessType: '[e.g. Fashion boutique]', // [PLACEHOLDER]
    type: 'bundle',
    problem: '[What they had before — e.g. no logo, WhatsApp-only sales]', // [PLACEHOLDER]
    solution: '[What Nova delivered — e.g. identity + 3-page site in 10 days]', // [PLACEHOLDER]
    image: '/placeholders/case-01.webp', // [CASE STUDY IMAGE]
    featured: true,
  },
  {
    id: 'case-02',
    title: '[CASE STUDY NAME]', // [PLACEHOLDER]
    businessType: '[e.g. Catering service]', // [PLACEHOLDER]
    type: 'logo',
    problem: '[Before state]', // [PLACEHOLDER]
    solution: '[After state]', // [PLACEHOLDER]
    image: '/placeholders/case-02.webp', // [CASE STUDY IMAGE]
    featured: true,
  },
  {
    id: 'case-03',
    title: '[CASE STUDY NAME]', // [PLACEHOLDER]
    businessType: '[e.g. Tech solopreneur]', // [PLACEHOLDER]
    type: 'website',
    problem: '[Before state]', // [PLACEHOLDER]
    solution: '[After state]', // [PLACEHOLDER]
    image: '/placeholders/case-03.webp', // [CASE STUDY IMAGE]
    featured: true,
  },
  {
    id: 'case-04',
    title: '[CASE STUDY NAME]', // [PLACEHOLDER]
    businessType: '[e.g. Faith-based brand]', // [PLACEHOLDER]
    type: 'bundle',
    problem: '[Before state]', // [PLACEHOLDER]
    solution: '[After state]', // [PLACEHOLDER]
    image: '/placeholders/case-04.webp', // [CASE STUDY IMAGE]
    featured: false,
  },
  {
    id: 'case-05',
    title: '[CASE STUDY NAME]', // [PLACEHOLDER]
    businessType: '[e.g. Beauty brand]', // [PLACEHOLDER]
    type: 'logo',
    problem: '[Before state]', // [PLACEHOLDER]
    solution: '[After state]', // [PLACEHOLDER]
    image: '/placeholders/case-05.webp', // [CASE STUDY IMAGE]
    featured: false,
  },
  {
    id: 'case-06',
    title: '[CASE STUDY NAME]', // [PLACEHOLDER]
    businessType: '[e.g. Local restaurant]', // [PLACEHOLDER]
    type: 'website',
    problem: '[Before state]', // [PLACEHOLDER]
    solution: '[After state]', // [PLACEHOLDER]
    image: '/placeholders/case-06.webp', // [CASE STUDY IMAGE]
    featured: false,
  },
];

export const featuredWork = portfolio.filter((p) => p.featured);
