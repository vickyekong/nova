import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../components/icons';
import { SEO } from '../components/SEO';
import { site } from '../data/site';
import { services } from '../data/services';
import { budgetRanges, timelineOptions } from '../data/pricing';
import { submitContactForm } from '../lib/contact';
import { getWhatsAppLink } from '../lib/utils';

export default function ContactPage() {
  const [params] = useSearchParams();
  const prefillPackage = params.get('package') || '';

  const [form, setForm] = useState({
    businessName: '',
    email: '',
    need: prefillPackage
      ? services.find((s) => s.id === prefillPackage)?.name || prefillPackage
      : '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const whatsapp = getWhatsAppLink(
    site.whatsapp,
    'Hi Nova — I’d like to start a project.',
  );

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'idle', message: '' });
    try {
      const result = await submitContactForm({
        ...form,
        _subject: `Nova enquiry — ${form.businessName || 'New lead'}`,
      });
      setStatus({
        type: 'success',
        message: result.demo
          ? result.message
          : 'Got it. We’ll reply soon — or ping us on WhatsApp if it’s urgent.',
      });
      setForm({
        businessName: '',
        email: '',
        need: '',
        budget: '',
        timeline: '',
        message: '',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Couldn’t send. Try WhatsApp instead.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact — Start Your Project"
        description="Tell Nova what you need — logo, website, or launch bundle. Or message on WhatsApp / Instagram. Fast replies for Nigerian SMEs."
        path="/contact"
      />

      <section className="border-b border-ink/8 bg-ignition-radial py-14">
        <div className="container-nova max-w-3xl">
          <p className="section-label">Contact</p>
          <h1 className="heading-lg mt-3">Tell us what you need. Keep it simple.</h1>
          <p className="body-lg mt-4">
            Forms work. Chat often works better. Pick your lane.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-nova grid gap-10 lg:grid-cols-5">
          {/* Quick contact */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="heading-md text-lg">Prefer chat?</h2>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-nova-lg border border-ink/10 bg-white p-4 transition-colors hover:border-nova/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-nova bg-[#25D366]/15 text-[#128C7E]">
                <MessageCircle size={20} />
              </span>
              <span>
                <span className="block font-display font-semibold text-ink">
                  WhatsApp
                </span>
                <span className="text-sm text-ink-muted">Usually fastest</span>
              </span>
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-nova-lg border border-ink/10 bg-white p-4 transition-colors hover:border-nova/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-nova bg-nova/10 text-nova">
                <InstagramIcon size={20} />
              </span>
              <span>
                <span className="block font-display font-semibold text-ink">
                  Instagram
                </span>
                <span className="text-sm text-ink-muted">{site.instagramHandle}</span>
              </span>
            </a>
            <p className="text-sm text-ink-muted">
              Email:{' '}
              <a href={`mailto:${site.email}`} className="text-nova hover:underline">
                {site.email}
              </a>
            </p>
            <p className="text-sm text-ink-muted">
              Looking for a ready-made logo?{' '}
              <Link to="/logo-mart" className="font-medium text-nova hover:underline">
                Logo Mart →
              </Link>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-nova-lg border border-ink/10 bg-white p-6 sm:p-8 lg:col-span-3"
          >
            <div>
              <label htmlFor="businessName" className="text-sm font-medium text-ink">
                Business name
              </label>
              <input
                id="businessName"
                required
                value={form.businessName}
                onChange={(e) => update('businessName', e.target.value)}
                className="mt-1.5 w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none transition focus:border-nova focus:ring-2 focus:ring-nova/20"
                placeholder="Your business"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="mt-1.5 w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none transition focus:border-nova focus:ring-2 focus:ring-nova/20"
                placeholder="you@business.com"
              />
            </div>

            <div>
              <label htmlFor="need" className="text-sm font-medium text-ink">
                What you need
              </label>
              <select
                id="need"
                required
                value={form.need}
                onChange={(e) => update('need', e.target.value)}
                className="mt-1.5 w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none transition focus:border-nova focus:ring-2 focus:ring-nova/20"
              >
                <option value="">Select…</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Logo Mart">Logo Mart purchase help</option>
                <option value="Not sure">Not sure — help me choose</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="text-sm font-medium text-ink">
                  Budget range
                </label>
                <select
                  id="budget"
                  required
                  value={form.budget}
                  onChange={(e) => update('budget', e.target.value)}
                  className="mt-1.5 w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none transition focus:border-nova focus:ring-2 focus:ring-nova/20"
                >
                  <option value="">Select…</option>
                  {budgetRanges.map((b) => (
                    <option key={b.value} value={b.label}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="text-sm font-medium text-ink">
                  Timeline
                </label>
                <select
                  id="timeline"
                  required
                  value={form.timeline}
                  onChange={(e) => update('timeline', e.target.value)}
                  className="mt-1.5 w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none transition focus:border-nova focus:ring-2 focus:ring-nova/20"
                >
                  <option value="">Select…</option>
                  {timelineOptions.map((t) => (
                    <option key={t.value} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium text-ink">
                Anything else?
              </label>
              <textarea
                id="message"
                rows={4}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="mt-1.5 w-full resize-y rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none transition focus:border-nova focus:ring-2 focus:ring-nova/20"
                placeholder="Links, deadlines, vibes…"
              />
            </div>

            {status.type !== 'idle' && (
              <div
                className={`flex items-start gap-2 rounded-nova px-3 py-2.5 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {status.type === 'success' && (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                )}
                {status.message}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Sending…' : 'Send message'}
            </button>
            <p className="text-center text-xs text-ink-muted">
              Form handler: Formspree — set <code className="font-mono">VITE_FORMSPREE_ID</code> in
              .env
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
