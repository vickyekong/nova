const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

/**
 * Submit contact form via Formspree.
 * Set VITE_FORMSPREE_ID in .env — get a free form at https://formspree.io
 */
export async function submitContactForm(payload) {
  if (!FORMSPREE_ID || FORMSPREE_ID === 'your_formspree_id') {
    // Dev / pre-config fallback — still useful for UI testing
    console.info('[Nova contact form — Formspree not configured]', payload);
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
    throw new Error(data.error || 'Something went wrong. Try WhatsApp instead.');
  }

  return { ok: true, demo: false };
}
