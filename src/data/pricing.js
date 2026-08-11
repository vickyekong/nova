import { services } from './services';

/** Pricing tiers — keep in sync with services.js */
export const pricingTiers = services.map((s) => ({
  id: s.id,
  name: s.name,
  priceFrom: s.priceFrom,
  priceLabel: s.priceLabel,
  turnaround: s.turnaround,
  includes: s.includes,
  featured: s.featured,
  tagline: s.tagline,
}));

export const pricingNote = {
  headline: 'Clear prices. No consultation maze.',
  body: 'Nova sells fixed-scope packages. You pick what you need, see the number, and go. Need something more bespoke or strategic? That’s what Novus Africa is for.',
  novusCta: 'Explore Novus Africa →',
};

/** Lowest package price for teasers — update when prices change */
export const startingPrice = Math.min(...services.map((s) => s.priceFrom));
export const startingPriceLabel = `₦${startingPrice.toLocaleString('en-NG')}`;

export const budgetRanges = [
  { value: 'under-50k', label: 'Under ₦50,000' },
  { value: '50k-100k', label: '₦50,000 – ₦100,000' },
  { value: '100k-200k', label: '₦100,000 – ₦200,000' },
  { value: '200k-plus', label: '₦200,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export const timelineOptions = [
  { value: 'asap', label: 'ASAP / this week' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within a month' },
  { value: 'flexible', label: 'Flexible' },
];
