import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../components/icons';
import { SEO } from '../components/SEO';
import { PageHero } from '../components/PageHero';
import { ExternalLink } from '../components/ui/ExternalLink';
import { SelectField, TextAreaField, TextField } from '../components/ui/Field';
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
      console.error('[Nova] Contact form submission failed.', err);
      setStatus({
        type: 'error',
        message: err?.message || 'Couldn’t send. Try WhatsApp instead.',
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

      <PageHero label="Contact" title="Tell us what you need. Keep it simple.">
        Forms work. Chat often works better. Pick your lane.
      </PageHero>

      <section className="py-14 sm:py-16">
        <div className="container-nova grid gap-10 lg:grid-cols-5">
          {/* Quick contact */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="heading-md text-lg">Prefer chat?</h2>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-nova-lg border border-ink/10 bg-white p-4 transition-colors hover:border-nova"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-nova bg-nova text-white font-display text-sm font-bold">
                @
              </span>
              <span>
                <span className="block font-display font-semibold text-ink">Email</span>
                <span className="text-sm text-ink-muted">{site.email}</span>
              </span>
            </a>
            <ExternalLink
              href={whatsapp}
              className="flex items-center gap-3 rounded-nova-lg border border-ink/10 bg-white p-4 transition-colors hover:border-nova/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-nova bg-ink text-white">
                <MessageCircle size={20} />
              </span>
              <span>
                <span className="block font-display font-semibold text-ink">
                  WhatsApp
                </span>
                <span className="text-sm text-ink-muted">Usually fastest</span>
              </span>
            </ExternalLink>
            <ExternalLink
              href={site.instagram}
              className="flex items-center gap-3 rounded-nova-lg border border-ink/10 bg-white p-4 transition-colors hover:border-nova"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-nova bg-ink text-white">
                <InstagramIcon size={20} />
              </span>
              <span>
                <span className="block font-display font-semibold text-ink">
                  Instagram
                </span>
                <span className="text-sm text-nova">{site.instagramHandle}</span>
              </span>
            </ExternalLink>
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
            <TextField
              id="businessName"
              label="Business name"
              required
              value={form.businessName}
              onChange={(e) => update('businessName', e.target.value)}
              placeholder="Your business"
            />

            <TextField
              id="email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@business.com"
            />

            <SelectField
              id="need"
              label="What you need"
              required
              value={form.need}
              onChange={(e) => update('need', e.target.value)}
              options={services.map((s) => ({ value: s.name, label: s.name }))}
            >
              <option value="Logo Mart">Logo Mart purchase help</option>
              <option value="Not sure">Not sure — help me choose</option>
            </SelectField>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="budget"
                label="Budget range"
                required
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                options={budgetRanges.map((b) => ({ value: b.label, label: b.label }))}
              />
              <SelectField
                id="timeline"
                label="Timeline"
                required
                value={form.timeline}
                onChange={(e) => update('timeline', e.target.value)}
                options={timelineOptions.map((t) => ({ value: t.label, label: t.label }))}
              />
            </div>

            <TextAreaField
              id="message"
              label="Anything else?"
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              placeholder="Links, deadlines, vibes…"
            />

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
