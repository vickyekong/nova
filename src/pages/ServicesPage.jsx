import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTABand } from '../components/CTABand';
import { services } from '../data/services';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services — Fixed-Scope Packages for SMEs"
        description="Starter Identity, Nova Website, Launch Bundle, and Social Starter Kit. Affordable logo design and small business websites in Nigeria."
        path="/services"
      />

      <section className="border-b border-ink/8 bg-ignition-radial py-14 sm:py-18">
        <div className="container-nova max-w-3xl">
          <p className="section-label">Services</p>
          <h1 className="heading-lg mt-3 text-balance">
            Packages with a price and a finish line.
          </h1>
          <p className="body-lg mt-4">
            Not bespoke quotes. Not endless discovery calls. Pick a scope, see
            the number, start.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-nova space-y-10">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className={`scroll-mt-28 rounded-nova-lg border p-6 sm:p-8 ${
                s.featured
                  ? 'border-nova/40 bg-nova/[0.04] shadow-soft'
                  : 'border-ink/8 bg-cream'
              }`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl">
                  {s.featured && (
                    <span className="mb-3 inline-block rounded-full bg-nova px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-white">
                      Best value
                    </span>
                  )}
                  <h2 className="heading-md">{s.name}</h2>
                  <p className="mt-2 text-ink-soft">{s.description}</p>
                  <ul className="mt-5 space-y-2">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink">
                        <Check size={16} className="mt-0.5 shrink-0 text-nova" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0 rounded-nova border border-ink/8 bg-cream-dark p-5 lg:w-56">
                  <p className="text-xs text-ink-muted">Starting at</p>
                  <p className="price-mono mt-1 text-2xl text-ink">{s.priceLabel}</p>
                  <p className="mt-3 text-xs text-ink-muted">
                    Typical turnaround
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{s.turnaround}</p>
                  <Link
                    to={`/contact?package=${s.id}`}
                    className="btn-primary mt-5 w-full text-center"
                  >
                    Get This Package
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/8 bg-cream-dark py-12">
        <div className="container-nova flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="heading-md">Need a logo today?</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Browse ready-to-buy exclusive logos on Logo Mart.
            </p>
          </div>
          <Link to="/logo-mart" className="btn-secondary">
            Open Logo Mart
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}
