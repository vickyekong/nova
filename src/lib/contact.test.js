import { afterEach, describe, expect, it, vi } from 'vitest';

const payload = { name: 'Ada', email: 'ada@example.com', message: 'Hi' };

/** Fresh module instance — contact.js reads VITE_FORMSPREE_ID at module scope. */
async function loadModule(formspreeId) {
  vi.stubEnv('VITE_FORMSPREE_ID', formspreeId);
  vi.resetModules();
  return import('./contact');
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('submitContactForm — Formspree not configured', () => {
  it('resolves with a demo result when the id is missing', async () => {
    vi.useFakeTimers();
    const info = vi.spyOn(console, 'info').mockImplementation(() => {});
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const { submitContactForm } = await loadModule('');

    const pending = submitContactForm(payload);
    await vi.advanceTimersByTimeAsync(600);
    const result = await pending;

    expect(result.ok).toBe(true);
    expect(result.demo).toBe(true);
    expect(result.message).toMatch(/Connect Formspree/);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalledWith(
      '[Nova contact form — Formspree not configured]',
      payload,
    );
  });

  it('treats the placeholder id as unconfigured', async () => {
    vi.useFakeTimers();
    vi.spyOn(console, 'info').mockImplementation(() => {});
    const { submitContactForm } = await loadModule('your_formspree_id');

    const pending = submitContactForm(payload);
    await vi.advanceTimersByTimeAsync(600);

    await expect(pending).resolves.toMatchObject({ ok: true, demo: true });
  });
});

describe('submitContactForm — Formspree configured', () => {
  it('posts the payload as JSON to the form endpoint', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    const { submitContactForm } = await loadModule('abc123');

    await expect(submitContactForm(payload)).resolves.toEqual({ ok: true, demo: false });

    expect(fetchSpy).toHaveBeenCalledWith('https://formspree.io/f/abc123', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  });

  it('throws the Formspree error message on a failed response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Form is disabled' }),
    });
    const { submitContactForm } = await loadModule('abc123');

    await expect(submitContactForm(payload)).rejects.toThrow('Form is disabled');
  });

  it('throws a generic message when the error body cannot be parsed', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error('invalid json');
      },
    });
    const { submitContactForm } = await loadModule('abc123');

    await expect(submitContactForm(payload)).rejects.toThrow(
      'Something went wrong. Try WhatsApp instead.',
    );
  });
});
