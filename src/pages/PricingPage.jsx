import { Link } from 'react-router-dom';
import { ArrowRight, Check, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTABand } from '../components/CTABand';
import { PageHero } from '../components/PageHero';
import { pricingTiers, pricingNote } from '../data/pricing';
import { site } from '../data/site';

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing — Transparent Packages for Small Businesses"
        description="Clear fixed pricing for logo design, websites, and launch bundles in Nigeria. No consultation maze — see what you get and what it costs."
        path="/pricing"
      />

      <PageHero label="Pricing" title={pricingNote.headline}>
        {pricingNote.body}
      </PageHero>

      <section className="py-14 sm:py-16">
        <div className="container-nova grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-nova-lg border p-6 ${
                tier.featured
                  ? 'border-nova bg-white shadow-spark'
                  : 'border-ink/10 bg-white'
              }`}
            >
              {tier.featured && (
                <span className="mb-3 w-fit rounded-full bg-nova/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-nova">
                  Popular
                </span>
              )}
              <h2 className="font-display text-xl font-semibold text-ink">
                {tier.name}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">{tier.tagline}</p>
              <p className="price-mono mt-5 text-3xl text-ink">
                {tier.priceLabel.replace('From ', '')}
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                From · {tier.turnaround}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink-soft">
                    <Check size={15} className="mt-0.5 shrink-0 text-nova" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?package=${tier.id}`}
                className={tier.featured ? 'btn-primary mt-8 w-full' : 'btn-secondary mt-8 w-full'}
              >
                Get started
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="container-nova mt-12">
          <div className="rounded-nova-lg border border-dashed border-ink/20 bg-white px-6 py-5 text-center sm:px-8">
            <p className="text-sm text-ink-soft">
              Need something more bespoke or strategic? That’s what{' '}
              <a
                href={site.novusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-medium text-nova hover:underline"
              >
                Novus Africa
                <ArrowUpRight size={14} />
              </a>{' '}
              is for.
            </p>
          </div>
        </div>

        <div className="container-nova mt-8 text-center">
          <p className="text-sm text-ink-muted">
            Or skip the wait —{' '}
            <Link to="/logo-mart" className="font-medium text-nova hover:underline">
              browse Logo Mart from ₦15,000
            </Link>{' '}
            {/* [PRICE] — sync with lowest logo price */}
          </p>
        </div>
      </section>

      <CTABand secondaryTo="/logo-mart" secondaryLabel="Browse Logo Mart" />
    </>
  );
}
