import { describe, expect, it } from 'vitest';
import {
  formatLogoPrice,
  getLogoById,
  logoIndustries,
  logoStyles,
  logos,
} from './logos';

describe('getLogoById', () => {
  it('returns the matching logo', () => {
    const logo = getLogoById('lm-01');
    expect(logo).toBeDefined();
    expect(logo.id).toBe('lm-01');
  });

  it('returns undefined for an unknown id', () => {
    expect(getLogoById('does-not-exist')).toBeUndefined();
    expect(getLogoById(undefined)).toBeUndefined();
  });
});

describe('formatLogoPrice', () => {
  it('formats prices in naira', () => {
    expect(formatLogoPrice(18000)).toBe('₦18,000');
    expect(formatLogoPrice('30000')).toBe('₦30,000');
  });
});

describe('logo inventory', () => {
  it('has unique ids', () => {
    const ids = logos.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses statuses the storefront understands', () => {
    for (const logo of logos) {
      expect(['available', 'sold']).toContain(logo.status);
    }
  });

  it('uses industries and styles that exist as filters', () => {
    const industries = new Set(logoIndustries.map((i) => i.id));
    const styles = new Set(logoStyles.map((s) => s.id));

    for (const logo of logos) {
      expect(industries).toContain(logo.industry);
      expect(styles).toContain(logo.style);
    }
  });

  it('exposes filter groups that start with an "all" option', () => {
    expect(logoIndustries[0].id).toBe('all');
    expect(logoStyles[0].id).toBe('all');
  });

  it('prices every logo as a positive number and ships mockups', () => {
    for (const logo of logos) {
      expect(typeof logo.price).toBe('number');
      expect(logo.price).toBeGreaterThan(0);
      expect(logo.mockups.length).toBeGreaterThan(0);
      expect(logo.includes.length).toBeGreaterThan(0);
    }
  });
});
