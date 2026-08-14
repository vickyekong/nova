/** Brand palette — the only colors used by site chrome. */
export const BRAND = {
  nova: '#E23D28',
  ink: '#2D3436',
  surface: '#FFFFFF',
};

const FALLBACK = [BRAND.nova, BRAND.ink, BRAND.surface];

/**
 * A logo's [primary, secondary, surface] colors, filled in from the brand
 * palette when the catalogue entry omits them.
 */
export function logoColors(logo) {
  const [primary = FALLBACK[0], secondary = FALLBACK[1], surface = FALLBACK[2]] =
    logo.colors || FALLBACK;
  return [primary, secondary, surface];
}

/** Background color a logo preview sits on. */
export function logoSurface(logo) {
  return logoColors(logo)[2];
}
