import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getLogoById, formatLogoPrice } from '../data/logos';
import { checkoutLogo, isLogoSold } from '../lib/paystack';

export default function LogoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const logo = useMemo(() => getLogoById(id), [id]);
  const sold = logo ? isLogoSold(logo) : true;

  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [tweakNotes, setTweakNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!logo) {
    return (
      <div className="container-nova py-20 text-center">
        <h1 className="heading-md">Logo not found</h1>
        <Link to="/logo-mart" className="btn-primary mt-6 inline-flex">
          Back to Logo Mart
        </Link>
      </div>
    );
  }

  async function handleBuy(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { reference } = await checkoutLogo({
        email,
        logo,
        businessName,
        tweakNotes,
      });
      navigate(`/logo-mart/success?ref=${reference}&logo=${logo.id}`);
    } catch (err) {
      if (err.message !== 'Payment cancelled') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEO
        title={`${logo.name} — Logo Mart`}
        description={`Exclusive ready-to-buy logo: ${logo.name}. ${formatLogoPrice(logo.price)}. Delivered within 24 hours after Paystack checkout.`}
        path={`/logo-mart/${logo.id}`}
      />

      <div className="container-nova py-8 sm:py-12">
        <Link
          to="/logo-mart"
          className="btn-ghost mb-6 inline-flex -ml-2"
        >
          <ArrowLeft size={16} /> Back to Logo Mart
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Preview + mockups */}
          <div>
            <div className="relative flex aspect-square items-center justify-center rounded-nova-lg bg-white p-10 shadow-soft">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-nova border border-dashed border-ink/10 bg-[#F7F7F5]">
                <span className="font-mono text-[10px] uppercase tracking-wider text-nova">
                  [LOGO PREVIEW]
                </span>
                <span className="mt-3 max-w-[70%] text-center font-display text-2xl font-bold text-ink/40">
                  {logo.name}
                </span>
              </div>
              {sold && (
                <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 font-mono text-xs font-semibold uppercase text-cream">
                  Sold
                </span>
              )}
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              Context mockups
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {(logo.mockups?.length ? logo.mockups : [1, 2, 3, 4]).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-nova bg-cream-deeper text-center"
                >
                  <span className="px-2 font-mono text-[9px] uppercase tracking-wider text-ink/35">
                    [MOCKUP {i + 1}]
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buy panel */}
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-cream-dark px-3 py-1 text-xs capitalize text-ink-soft">
                {logo.industry}
              </span>
              <span className="rounded-full bg-cream-dark px-3 py-1 text-xs capitalize text-ink-soft">
                {logo.style}
              </span>
              {logo.isNew && !sold && (
                <span className="rounded-full bg-nova/10 px-3 py-1 text-xs font-medium text-nova">
                  New
                </span>
              )}
            </div>

            <h1 className="heading-lg mt-4">{logo.name}</h1>
            <p className="price-mono mt-3 text-3xl text-nova">
              {formatLogoPrice(logo.price)}
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">{logo.description}</p>

            <div className="mt-6">
              <h2 className="font-display text-sm font-semibold text-ink">
                What’s included
              </h2>
              <ul className="mt-3 space-y-2">
                {logo.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink-soft">
                    <Check size={15} className="mt-0.5 shrink-0 text-nova" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 rounded-nova bg-cream-dark px-3 py-2 text-xs text-ink-muted">
              Request a tweak: minor color/name changes included. Full redesign
              is not — that’s Starter Identity.
            </p>

            {sold ? (
              <div className="mt-8 rounded-nova-lg border border-ink/10 bg-cream-dark p-6 text-center">
                <Lock className="mx-auto text-ink-muted" size={24} />
                <p className="mt-3 font-display font-semibold text-ink">
                  This logo is sold
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Exclusive sale — it’s gone. Browse other available marks.
                </p>
                <Link to="/logo-mart" className="btn-primary mt-5 inline-flex">
                  See available logos
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleBuy}
                className="mt-8 space-y-3 rounded-nova-lg border border-ink/10 bg-white p-5 shadow-soft"
              >
                <h2 className="font-display font-semibold text-ink">Buy this logo</h2>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none focus:border-nova focus:ring-2 focus:ring-nova/20"
                />
                <input
                  type="text"
                  placeholder="Business name (for lockup swap)"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none focus:border-nova focus:ring-2 focus:ring-nova/20"
                />
                <textarea
                  rows={2}
                  placeholder="Tweak notes (optional) — color or name preference"
                  value={tweakNotes}
                  onChange={(e) => setTweakNotes(e.target.value)}
                  className="w-full resize-y rounded-nova border border-ink/15 bg-cream px-3 py-2.5 text-sm outline-none focus:border-nova focus:ring-2 focus:ring-nova/20"
                />
                {error && (
                  <p className="rounded-nova bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Opening Paystack…' : `Buy This Logo · ${formatLogoPrice(logo.price)}`}
                </button>
                <p className="text-center text-[11px] text-ink-muted">
                  Exclusive · Paid via Paystack · Files emailed within 24 hrs
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
