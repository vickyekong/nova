import { describe, expect, it } from 'vitest';
import {
  budgetRanges,
  pricingTiers,
  startingPrice,
  startingPriceLabel,
  timelineOptions,
} from './pricing';
import { services } from './services';

describe('pricingTiers', () => {
  it('mirrors services one-for-one', () => {
    expect(pricingTiers.map((t) => t.id)).toEqual(services.map((s) => s.id));
  });

  it('carries the fields the pricing table renders', () => {
    for (const tier of pricingTiers) {
      const service = services.find((s) => s.id === tier.id);
      expect(tier).toEqual({
        id: service.id,
        name: service.name,
        priceFrom: service.priceFrom,
        priceLabel: service.priceLabel,
        turnaround: service.turnaround,
        includes: service.includes,
        featured: service.featured,
        tagline: service.tagline,
      });
    }
  });

  it('features exactly one tier', () => {
    expect(pricingTiers.filter((t) => t.featured)).toHaveLength(1);
  });
});

describe('startingPrice', () => {
  it('is the cheapest package price', () => {
    expect(startingPrice).toBe(Math.min(...services.map((s) => s.priceFrom)));
  });

  it('is labelled in naira', () => {
    expect(startingPriceLabel).toBe(`₦${startingPrice.toLocaleString('en-NG')}`);
  });
});

describe('form option lists', () => {
  it('give every budget range a unique value and label', () => {
    const values = budgetRanges.map((b) => b.value);
    expect(new Set(values).size).toBe(values.length);
    for (const range of budgetRanges) expect(range.label).toBeTruthy();
  });

  it('give every timeline option a unique value and label', () => {
    const values = timelineOptions.map((t) => t.value);
    expect(new Set(values).size).toBe(values.length);
    for (const option of timelineOptions) expect(option.label).toBeTruthy();
  });
});
