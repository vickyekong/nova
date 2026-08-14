import { afterEach, describe, expect, it, vi } from 'vitest';
import { navLinks, site, stats, whyNova } from './site';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('site', () => {
  it('exposes the contact channels the footer links to', () => {
    expect(site.email).toMatch(/@/);
    expect(site.instagram).toMatch(/^https:\/\//);
    expect(site.novusUrl).toMatch(/^https:\/\//);
    expect(site.url).toMatch(/^https:\/\//);
  });

  it('uses an international WhatsApp number without a plus sign', () => {
    expect(site.whatsapp).toMatch(/^\d+$/);
  });

  it('prefers VITE_WHATSAPP_NUMBER over the placeholder', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '2349099999999');
    vi.resetModules();
    const { site: configured } = await import('./site');
    expect(configured.whatsapp).toBe('2349099999999');
  });
});

describe('navLinks', () => {
  it('starts at home and uses unique root-relative paths', () => {
    expect(navLinks[0].path).toBe('/');
    const paths = navLinks.map((l) => l.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const link of navLinks) {
      expect(link.path.startsWith('/')).toBe(true);
      expect(link.name).toBeTruthy();
    }
  });
});

describe('stats and whyNova', () => {
  it('give every stat a value and label', () => {
    expect(stats.length).toBeGreaterThan(0);
    for (const stat of stats) {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
    }
  });

  it('give every reason a title and body', () => {
    expect(whyNova.length).toBeGreaterThan(0);
    for (const reason of whyNova) {
      expect(reason.title).toBeTruthy();
      expect(reason.body).toBeTruthy();
    }
  });
});
