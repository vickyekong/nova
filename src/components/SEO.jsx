import { useEffect } from 'react';
import { site } from '../data/site';

export function SEO({
  title,
  description,
  path = '',
}) {
  const fullTitle = title ? `${title} · Nova` : `Nova · ${site.tagline}`;
  const desc =
    description ||
    'Affordable logo design and small business websites in Nigeria. Fixed pricing, fast turnaround.';

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', `${site.url}${path}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [fullTitle, desc, path]);

  return null;
}
