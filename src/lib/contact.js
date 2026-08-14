import { validateContactForm, cleanText, LIMITS } from './validation';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

/** Formspree IDs are short alphanumeric slugs; anything else is a misconfiguration. */
function isConfigured(id) {
  return typeof id === 'string' && /^[A-Za-z0-9]{4,32}$/.test(id) && id !== 'your_formspree_id';
}

/**
 * Submit contact form via Formspree.
 * Set VITE_FORMSPREE_ID in .env — get a free form at https://formspree.io
 */
export async function submitContactForm(input) {
  const validated = validateContactForm(input);
  if (!validated.ok) {
    throw new Error(validated.error);
  }

  const payload = {
    ...validated.value,
    _subject: cleanText(input._subject, LIMITS.shortText),
  };

  if (!isConfigured(FORMSPREE_ID)) {
    // Dev / pre-config fallback — never log the submission itself (contains PII)
    console.info('[Nova contact form] Formspree not configured — submission not sent.');
    await new Promise((r) => setTimeout(r, 600));
    return {
      ok: true,
      demo: true,
      message:
        'Form received locally. Connect Formspree (VITE_FORMSPREE_ID) before launch.',
    };
  }

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      typeof data.error === 'string' && data.error
        ? cleanText(data.error, LIMITS.shortText)
        : 'Something went wrong. Try WhatsApp instead.',
    );
  }

  return { ok: true, demo: false };
}
