import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const SOLD_KEY = 'nova_logo_mart_sold';

const logo = { id: 'lm-01', name: 'Test Logo', price: 20000, status: 'available' };

/** Fresh module instance — paystack.js caches the script promise at module scope. */
async function loadModule() {
  vi.resetModules();
  return import('./paystack');
}

function fakePaystackPop({ mode = 'success', reference = 'ref_123' } = {}) {
  return {
    setup: vi.fn((options) => ({
      openIframe: () => {
        if (mode === 'success') options.callback({ reference });
        else options.onClose();
      },
    })),
  };
}

beforeEach(() => {
  localStorage.clear();
  vi.stubEnv('VITE_PAYSTACK_PUBLIC_KEY', 'pk_test_valid');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  delete window.PaystackPop;
});

describe('getLocallySoldIds', () => {
  it('returns an empty array when nothing is stored', async () => {
    const { getLocallySoldIds } = await loadModule();
    expect(getLocallySoldIds()).toEqual([]);
  });

  it('returns stored ids', async () => {
    localStorage.setItem(SOLD_KEY, JSON.stringify(['lm-01', 'lm-02']));
    const { getLocallySoldIds } = await loadModule();
    expect(getLocallySoldIds()).toEqual(['lm-01', 'lm-02']);
  });

  it('returns an empty array when stored value is not valid JSON', async () => {
    localStorage.setItem(SOLD_KEY, 'not-json');
    const { getLocallySoldIds } = await loadModule();
    expect(getLocallySoldIds()).toEqual([]);
  });
});

describe('markLogoSoldLocally', () => {
  it('persists an id', async () => {
    const { markLogoSoldLocally, getLocallySoldIds } = await loadModule();
    markLogoSoldLocally('lm-01');
    expect(getLocallySoldIds()).toEqual(['lm-01']);
  });

  it('appends without duplicating', async () => {
    const { markLogoSoldLocally, getLocallySoldIds } = await loadModule();
    markLogoSoldLocally('lm-01');
    markLogoSoldLocally('lm-02');
    markLogoSoldLocally('lm-01');
    expect(getLocallySoldIds()).toEqual(['lm-01', 'lm-02']);
  });
});

describe('isLogoSold', () => {
  it('is true when the catalogue marks it sold', async () => {
    const { isLogoSold } = await loadModule();
    expect(isLogoSold({ id: 'lm-04', status: 'sold' })).toBe(true);
  });

  it('is true when sold locally after checkout', async () => {
    const { isLogoSold, markLogoSoldLocally } = await loadModule();
    markLogoSoldLocally('lm-01');
    expect(isLogoSold(logo)).toBe(true);
  });

  it('is false for an available logo', async () => {
    const { isLogoSold } = await loadModule();
    expect(isLogoSold(logo)).toBe(false);
  });
});

describe('checkoutLogo', () => {
  it('rejects when the public key is missing', async () => {
    vi.stubEnv('VITE_PAYSTACK_PUBLIC_KEY', '');
    const { checkoutLogo } = await loadModule();
    await expect(checkoutLogo({ email: 'a@b.com', logo })).rejects.toThrow(
      /Paystack is not configured/,
    );
  });

  it('rejects when the public key is still the placeholder', async () => {
    vi.stubEnv('VITE_PAYSTACK_PUBLIC_KEY', 'pk_test_xxxxxxxx');
    const { checkoutLogo } = await loadModule();
    await expect(checkoutLogo({ email: 'a@b.com', logo })).rejects.toThrow(
      /Paystack is not configured/,
    );
  });

  it('rejects when the logo is already sold', async () => {
    const { checkoutLogo } = await loadModule();
    await expect(
      checkoutLogo({ email: 'a@b.com', logo: { ...logo, status: 'sold' } }),
    ).rejects.toThrow('This logo has already been sold.');
  });

  it('resolves with the reference and marks the logo sold locally', async () => {
    window.PaystackPop = fakePaystackPop({ reference: 'ref_success' });
    const { checkoutLogo, getLocallySoldIds } = await loadModule();

    const result = await checkoutLogo({
      email: 'buyer@example.com',
      logo,
      businessName: 'Buyer Co',
      tweakNotes: 'Swap the name',
    });

    expect(result).toEqual({ reference: 'ref_success' });
    expect(getLocallySoldIds()).toEqual(['lm-01']);
  });

  it('passes amount in kobo, NGN currency and purchase metadata to Paystack', async () => {
    window.PaystackPop = fakePaystackPop();
    const { checkoutLogo } = await loadModule();

    await checkoutLogo({
      email: 'buyer@example.com',
      logo,
      businessName: 'Buyer Co',
      tweakNotes: 'Swap the name',
    });

    const options = window.PaystackPop.setup.mock.calls[0][0];
    expect(options).toMatchObject({
      key: 'pk_test_valid',
      email: 'buyer@example.com',
      amount: 2000000,
      currency: 'NGN',
    });
    expect(options.ref).toMatch(/^nova-lm-lm-01-\d+$/);
    expect(options.metadata.custom_fields).toEqual([
      { display_name: 'Logo ID', variable_name: 'logo_id', value: 'lm-01' },
      { display_name: 'Logo Name', variable_name: 'logo_name', value: 'Test Logo' },
      { display_name: 'Business Name', variable_name: 'business_name', value: 'Buyer Co' },
      { display_name: 'Tweak Notes', variable_name: 'tweak_notes', value: 'Swap the name' },
    ]);
  });

  it('sends empty strings when optional fields are omitted', async () => {
    window.PaystackPop = fakePaystackPop();
    const { checkoutLogo } = await loadModule();

    await checkoutLogo({ email: 'buyer@example.com', logo });

    const fields = window.PaystackPop.setup.mock.calls[0][0].metadata.custom_fields;
    expect(fields[2].value).toBe('');
    expect(fields[3].value).toBe('');
  });

  it('rejects and leaves the logo unsold when the popup is closed', async () => {
    window.PaystackPop = fakePaystackPop({ mode: 'close' });
    const { checkoutLogo, getLocallySoldIds } = await loadModule();

    await expect(checkoutLogo({ email: 'buyer@example.com', logo })).rejects.toThrow(
      'Payment cancelled',
    );
    expect(getLocallySoldIds()).toEqual([]);
  });

  it('injects the Paystack script once when it is not loaded yet', async () => {
    const appendChild = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation((element) => {
        window.PaystackPop = fakePaystackPop();
        element.onload();
        return element;
      });

    const { checkoutLogo } = await loadModule();

    await checkoutLogo({ email: 'buyer@example.com', logo });
    await checkoutLogo({ email: 'buyer@example.com', logo: { ...logo, id: 'lm-02' } });

    expect(appendChild).toHaveBeenCalledTimes(1);
    const script = appendChild.mock.calls[0][0];
    expect(script.src).toBe('https://js.paystack.co/v1/inline.js');
    expect(script.async).toBe(true);
  });

  it('rejects when the Paystack script fails to load', async () => {
    vi.spyOn(document.body, 'appendChild').mockImplementation((element) => {
      element.onerror();
      return element;
    });

    const { checkoutLogo } = await loadModule();

    await expect(checkoutLogo({ email: 'buyer@example.com', logo })).rejects.toThrow(
      'Failed to load Paystack',
    );
  });
});
