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

/** Error codes on thrown checkout errors, so callers don't match on messages. */
export const CHECKOUT_CANCELLED = 'checkout_cancelled';
export const CHECKOUT_UNCONFIGURED = 'checkout_unconfigured';
export const CHECKOUT_SOLD_OUT = 'checkout_sold_out';
export const CHECKOUT_SCRIPT_FAILED = 'checkout_script_failed';
export const CHECKOUT_INVALID_INPUT = 'checkout_invalid_input';

function checkoutError(code, message, cause) {
  const error = new Error(message, cause ? { cause } : undefined);
  error.code = code;
  return error;
}

let scriptPromise = null;

function loadPaystackScript() {
  if (window.PaystackPop) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PAYSTACK_SRC;
    script.async = true;
    script.onload = () => {
      if (!window.PaystackPop) {
        reject(
          checkoutError(
            CHECKOUT_SCRIPT_FAILED,
            'Paystack loaded but is unavailable. Reload the page and try again.',
          ),
        );
        return;
      }
      resolve();
    };
    script.onerror = () =>
      reject(
        checkoutError(
          CHECKOUT_SCRIPT_FAILED,
          'Couldn’t reach Paystack. Check your connection and try again.',
        ),
      );
    document.body.appendChild(script);
  }).catch((err) => {
    // Don't cache a failed load — otherwise every retry replays the same rejection.
    scriptPromise = null;
    throw err;
  });

  return scriptPromise;
}

const SOLD_KEY = 'nova_logo_mart_sold';

export function getLocallySoldIds() {
  let raw;
  try {
    raw = localStorage.getItem(SOLD_KEY);
  } catch (err) {
    console.warn('[Nova] localStorage unavailable — sold logos not read.', err);
    return [];
  }
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error(`Expected an array, got ${typeof parsed}`);
    }
    return parsed.filter((id) => typeof id === 'string');
  } catch (err) {
    console.warn(`[Nova] Corrupt "${SOLD_KEY}" entry ignored.`, err);
    return [];
  }
}

/**
 * Persist a sold logo id locally.
 * @returns {boolean} whether the write succeeded (storage can be full or blocked)
 */
export function markLogoSoldLocally(logoId) {
  if (typeof logoId !== 'string' || !logoId) return false;
  const ids = new Set(getLocallySoldIds());
  ids.add(logoId);
  try {
    localStorage.setItem(SOLD_KEY, JSON.stringify([...ids]));
    return true;
  } catch (err) {
    console.warn(`[Nova] Couldn’t persist sold logo "${logoId}" locally.`, err);
    return false;
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
    throw checkoutError(
      CHECKOUT_UNCONFIGURED,
      'Paystack is not configured. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file.',
    );
  }

  if (isLogoSold(logo)) {
    throw checkoutError(CHECKOUT_SOLD_OUT, 'This logo has already been sold.');
  }

  if (!isValidEmail(email)) {
    throw checkoutError(
      CHECKOUT_INVALID_INPUT,
      'Enter a valid email address to continue.',
    );
  }

  const amount = Number(logo.price);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw checkoutError(
      CHECKOUT_INVALID_INPUT,
      'This logo is not available for checkout right now.',
    );
  }

  await loadPaystackScript();

  return new Promise((resolve, reject) => {
    let settled = false;

    try {
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
          settled = true;
          // A storage failure must never hide a completed payment.
          markLogoSoldLocally(logo.id);
          resolve({ reference: response?.reference || '' });
        },
        onClose() {
          if (settled) return;
          settled = true;
          reject(checkoutError(CHECKOUT_CANCELLED, 'Payment cancelled'));
        },
      });

      handler.openIframe();
    } catch (err) {
      if (settled) {
        console.error('[Nova] Paystack error after checkout completed.', err);
        return;
      }
      settled = true;
      reject(
        checkoutError(
          CHECKOUT_SCRIPT_FAILED,
          'Couldn’t open Paystack checkout. Reload the page and try again.',
          err,
        ),
      );
    }
  });
}
