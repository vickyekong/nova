import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getLogoById } from '../data/logos';
import { site } from '../data/site';

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const ref = params.get('ref');
  const logoId = params.get('logo');
  const logo = logoId ? getLogoById(logoId) : null;

  return (
    <>
      <SEO title="Payment successful" path="/logo-mart/success" />

      <section className="container-nova flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="text-nova" size={48} strokeWidth={1.5} />
        <h1 className="heading-lg mt-6">You’re locked in.</h1>
        <p className="body-lg mt-3 max-w-md">
          {logo
            ? `Thanks for buying ${logo.name}. `
            : 'Thanks for your purchase. '}
          Your exclusive logo package will be emailed within 24 hours.
        </p>
        {ref && (
          <p className="mt-4 font-mono text-xs text-ink-muted">
            Reference: {ref}
          </p>
        )}
        <p className="mt-6 max-w-sm text-sm text-ink-muted">
          Questions? Email{' '}
          <a href={`mailto:${site.email}`} className="text-nova hover:underline">
            {site.email}
          </a>{' '}
          or DM {site.instagramHandle}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/logo-mart" className="btn-secondary">
            Back to Logo Mart
          </Link>
          <Link to="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </section>
    </>
  );
}
