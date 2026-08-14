import { describe, expect, it } from 'vitest';
import { cn, formatNaira, getWhatsAppLink } from './utils';

describe('cn', () => {
  it('joins truthy class names with a space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('drops falsy values', () => {
    expect(cn('a', false, undefined, null, '', 0, 'b')).toBe('a b');
  });

  it('returns an empty string with no usable classes', () => {
    expect(cn()).toBe('');
    expect(cn(false, undefined)).toBe('');
  });
});

describe('formatNaira', () => {
  it('formats numbers with the naira sign and thousands separators', () => {
    expect(formatNaira(45000)).toBe('₦45,000');
    expect(formatNaira(0)).toBe('₦0');
  });

  it('coerces numeric strings', () => {
    expect(formatNaira('150000')).toBe('₦150,000');
  });
});

describe('getWhatsAppLink', () => {
  it('builds a bare wa.me link when no message is given', () => {
    expect(getWhatsAppLink('2348012345678')).toBe('https://wa.me/2348012345678');
  });

  it('url-encodes the prefilled message', () => {
    expect(getWhatsAppLink('2348012345678', 'Hi Nova & co')).toBe(
      'https://wa.me/2348012345678?text=Hi%20Nova%20%26%20co',
    );
  });

  it('ignores an empty message', () => {
    expect(getWhatsAppLink('2348012345678', '')).toBe('https://wa.me/2348012345678');
  });
});
