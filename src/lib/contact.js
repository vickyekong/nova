const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const FALLBACK_MESSAGE = 'Something went wrong. Try WhatsApp instead.';

function isConfigured() {
  return Boolean(FORMSPREE_ID) && FORMSPREE_ID !== 'your_formspree_id';
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
        .filter(Boolean)
        .join(' ')
    : '';
  const message = fromErrors || body?.error || '';

  if (!message) {
    console.error(`[Nova] Formspree returned ${res.status}.`, body);
    return `${FALLBACK_MESSAGE} (error ${res.status})`;
  }
  return message;
}

/**
 * Submit contact form via Formspree.
 * Set VITE_FORMSPREE_ID in .env — get a free form at https://formspree.io
 */
export async function submitContactForm(payload) {
  if (!isConfigured()) {
    // Dev / pre-config fallback — still useful for UI testing.
    const warn = import.meta.env.PROD ? console.error : console.info;
    warn(
      '[Nova] VITE_FORMSPREE_ID is not set — contact form submission was not delivered.',
      payload,
    );
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
