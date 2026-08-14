import { describe, expect, it } from 'vitest';
import { services, servicesSnapshot } from './services';

describe('services', () => {
  it('has unique ids', () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prices every package as a positive number', () => {
    for (const service of services) {
      expect(typeof service.priceFrom).toBe('number');
      expect(service.priceFrom).toBeGreaterThan(0);
    }
  });

  it('labels prices consistently with priceFrom', () => {
    for (const service of services) {
      expect(service.priceLabel).toBe(
        `From ₦${service.priceFrom.toLocaleString('en-NG')}`,
      );
    }
  });

  it('lists inclusions and a turnaround for each package', () => {
    for (const service of services) {
      expect(service.includes.length).toBeGreaterThan(0);
      expect(service.turnaround).toBeTruthy();
      expect(service.icon).toBeTruthy();
    }
  });
});

describe('servicesSnapshot', () => {
  it('keeps the same order as services', () => {
    expect(servicesSnapshot.map((s) => s.id)).toEqual(services.map((s) => s.id));
  });

  it('exposes only the teaser fields', () => {
    for (const snapshot of servicesSnapshot) {
      expect(Object.keys(snapshot).sort()).toEqual([
        'icon',
        'id',
        'name',
        'priceLabel',
        'tagline',
      ]);
    }
  });
});
