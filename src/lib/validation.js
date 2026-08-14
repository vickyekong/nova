/** Shared input validation for user-submitted forms. */

export const LIMITS = {
  email: 254,
  name: 120,
  shortText: 200,
  message: 2000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Strip control characters, collapse whitespace, and cap length. */
export function cleanText(value, maxLength = LIMITS.shortText, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex -- stripping control characters is the point
  const controlChars = multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g;
  const stripped = value.replace(controlChars, ' ');
  const collapsed = multiline
    ? stripped.replace(/ {2,}/g, ' ').replace(/\n{3,}/g, '\n\n')
    : stripped.replace(/\s{2,}/g, ' ');
  return collapsed.trim().slice(0, maxLength);
}

export function isValidEmail(value) {
  const email = cleanText(value, LIMITS.email);
  return EMAIL_RE.test(email) && email.length <= LIMITS.email;
}

export function normalizeEmail(value) {
  return cleanText(value, LIMITS.email).toLowerCase();
}

/**
 * Validate + normalize a contact enquiry.
 * @returns {{ ok: true, value: object } | { ok: false, error: string }}
 */
export function validateContactForm(form) {
  const businessName = cleanText(form.businessName, LIMITS.name);
  const email = normalizeEmail(form.email);

  if (!businessName) return { ok: false, error: 'Business name is required.' };
  if (!isValidEmail(email)) return { ok: false, error: 'Enter a valid email address.' };

  return {
    ok: true,
    value: {
      businessName,
      email,
      need: cleanText(form.need, LIMITS.shortText),
      budget: cleanText(form.budget, LIMITS.shortText),
      timeline: cleanText(form.timeline, LIMITS.shortText),
      message: cleanText(form.message, LIMITS.message, { multiline: true }),
    },
  };
}
