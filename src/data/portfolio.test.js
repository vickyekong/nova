import { describe, expect, it } from 'vitest';
import { featuredWork, portfolio, portfolioFilters } from './portfolio';

describe('portfolio', () => {
  it('has unique ids', () => {
    const ids = portfolio.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('only uses types that exist as filters', () => {
    const filterIds = new Set(portfolioFilters.map((f) => f.id));
    for (const item of portfolio) expect(filterIds).toContain(item.type);
  });

  it('gives every case a problem, solution and image', () => {
    for (const item of portfolio) {
      expect(item.problem).toBeTruthy();
      expect(item.solution).toBeTruthy();
      expect(item.image).toMatch(/^https:\/\//);
    }
  });

  it('offers an "all" filter first', () => {
    expect(portfolioFilters[0].id).toBe('all');
  });
});

describe('featuredWork', () => {
  it('contains exactly the featured cases', () => {
    expect(featuredWork).toEqual(portfolio.filter((p) => p.featured));
    expect(featuredWork.length).toBeGreaterThan(0);
    for (const item of featuredWork) expect(item.featured).toBe(true);
  });
});
