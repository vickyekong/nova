import { validateContactForm, cleanText, LIMITS } from './validation';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const FALLBACK_MESSAGE = 'Something went wrong. Try WhatsApp instead.';

/** Formspree IDs are short alphanumeric slugs; anything else is a misconfiguration. */
function isConfigured() {
  return (
    typeof FORMSPREE_ID === 'string' &&
    /^[A-Za-z0-9]{4,32}$/.test(FORMSPREE_ID) &&
    FORMSPREE_ID !== 'your_formspree_id'
  );
}

/** Formspree replies with `{ errors: [{ field, message }] }` on validation failures. */
async function readErrorMessage(res) {
  let body;
  try {
    body = await res.json();
  } catch (err) {
    console.error(`[Nova] Formspree returned ${res.status} with an unreadable body.`, err);
    return `${FALLBACK_MESSAGE} (error ${res.status})`;
  }

  const fromErrors = Array.isArray(body?.errors)
    ? body.errors
        .map((e) => e?.message)
        .filter((message) => typeof message === 'string' && message)
        .join(' ')
    : '';
  const message = fromErrors || (typeof body?.error === 'string' ? body.error : '');

  if (!message) {
    console.error(`[Nova] Formspree returned ${res.status}.`, body);
    return `${FALLBACK_MESSAGE} (error ${res.status})`;
  }
  return cleanText(message, LIMITS.shortText);
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

  if (!isConfigured()) {
    // Dev / pre-config fallback. Never log the submission itself — it contains PII.
    const warn = import.meta.env.PROD ? console.error : console.info;
    warn('[Nova] VITE_FORMSPREE_ID is not set — contact form submission was not delivered.');
    await new Promise((r) => setTimeout(r, 600));
    return {
      ok: true,
      demo: true,
      message:
        'Form received locally. Connect Formspree (VITE_FORMSPREE_ID) before launch.',
    };
  }

  let res;
  try {
    res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[Nova] Contact form request failed to reach Formspree.', err);
    throw new Error('Couldn’t reach the server. Check your connection or use WhatsApp.', {
      cause: err,
    });
  }

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return { ok: true, demo: false };
}
