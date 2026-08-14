import { describe, expect, it } from 'vitest';
import { testimonials } from './testimonials';

describe('testimonials', () => {
  it('has unique ids', () => {
    const ids = testimonials.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every quote an attribution and avatar', () => {
    expect(testimonials.length).toBeGreaterThan(0);
    for (const testimonial of testimonials) {
      expect(testimonial.quote).toBeTruthy();
      expect(testimonial.name).toBeTruthy();
      expect(testimonial.business).toBeTruthy();
      expect(testimonial.avatar).toMatch(/^https:\/\//);
    }
  });
});
