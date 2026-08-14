/**
 * Paystack Inline checkout for Logo Mart (exclusive sales).
 *
 * Production checklist:
 * 1. Set VITE_PAYSTACK_PUBLIC_KEY in .env
 * 2. Add a backend webhook to mark logos sold on charge.success
 *    (client-side localStorage is a demo fallback only — not secure inventory)
 * 3. Fulfillment: email file package within 24 hrs (current SLA)
 *
 * Security: amount, logo and "sold" state all originate in the browser, so a
 * tampered client can change either. The Paystack webhook in step 2 must be the
 * authority on price and inventory before any files are delivered.
 */
import { isValidEmail, normalizeEmail, cleanText, LIMITS } from './validation';

const PAYSTACK_SRC = 'https://js.paystack.co/v1/inline.js';

let scriptPromise = null;

function loadPaystackScript() {
  if (window.PaystackPop) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PAYSTACK_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Paystack'));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

const SOLD_KEY = 'nova_logo_mart_sold';

export function getLocallySoldIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SOLD_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === 'string');
  } catch {
    return [];
  }
}

export function markLogoSoldLocally(logoId) {
  if (typeof logoId !== 'string' || !logoId) return;
  const ids = new Set(getLocallySoldIds());
  ids.add(logoId);
  try {
    localStorage.setItem(SOLD_KEY, JSON.stringify([...ids]));
  } catch {
    // Storage unavailable (private mode / quota) — inventory is server-owned anyway
  }
}

export function isLogoSold(logo) {
  if (logo.status === 'sold') return true;
  return getLocallySoldIds().includes(logo.id);
}

/**
 * Open Paystack popup for a logo purchase.
 * @returns {Promise<{reference: string}>}
 */
export async function checkoutLogo({ email, logo, businessName, tweakNotes }) {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  if (!publicKey || publicKey.includes('xxxx')) {
    throw new Error(
      'Paystack is not configured. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file.',
    );
  }

  if (isLogoSold(logo)) {
    throw new Error('This logo has already been sold.');
  }

  if (!isValidEmail(email)) {
    throw new Error('Enter a valid email address to continue.');
  }

  const amount = Number(logo.price);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('This logo is not available for checkout right now.');
  }

  await loadPaystackScript();

  return new Promise((resolve, reject) => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: normalizeEmail(email),
      amount: Math.round(amount * 100), // kobo
      currency: 'NGN',
      ref: `nova-lm-${logo.id}-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: 'Logo ID', variable_name: 'logo_id', value: logo.id },
          { display_name: 'Logo Name', variable_name: 'logo_name', value: logo.name },
          {
            display_name: 'Business Name',
            variable_name: 'business_name',
            value: cleanText(businessName, LIMITS.name),
          },
          {
            display_name: 'Tweak Notes',
            variable_name: 'tweak_notes',
            value: cleanText(tweakNotes, LIMITS.message, { multiline: true }),
          },
        ],
      },
      callback(response) {
        markLogoSoldLocally(logo.id);
        resolve({ reference: response.reference });
      },
      onClose() {
        reject(new Error('Payment cancelled'));
      },
    });

    handler.openIframe();
  });
}
