import { useMemo, useState } from 'react';
import { SEO } from '../components/SEO';
import { CTABand } from '../components/CTABand';
import { portfolio, portfolioFilters } from '../data/portfolio';
import { cn } from '../lib/utils';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');

  const items = useMemo(() => {
    if (filter === 'all') return portfolio;
    return portfolio.filter((p) => p.type === filter);
  }, [filter]);

  return (
    <>
      <SEO
        title="Portfolio — SME Brand & Website Work"
        description="See how Nova helps Nigerian small businesses go from makeshift to credible — logos, websites, and full launch bundles."
        path="/portfolio"
      />

      <section className="border-b border-ink/8 bg-ignition-radial py-14">
        <div className="container-nova max-w-3xl">
          <p className="section-label">Portfolio</p>
          <h1 className="heading-lg mt-3">Transformation stories, not mood boards.</h1>
          <p className="body-lg mt-4">
            SMEs respond to before → after. Here’s the work — swap in real case
            studies before launch.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-nova">
          <div className="flex flex-wrap gap-2">
            {portfolioFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  filter === f.id
                    ? 'bg-nova text-white'
                    : 'bg-cream-dark text-ink-soft hover:bg-cream-deeper',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id}>
                <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-nova-lg bg-cream-deeper p-6 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-nova">
                    [CASE STUDY IMAGE]
                  </span>
                  <span className="mt-2 font-display text-lg font-semibold text-ink/35">
                    {item.title}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                    {item.type} · {item.businessType}
                  </p>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h2>
                  <p className="text-sm text-ink-muted">
                    <span className="font-medium text-ink">Problem:</span>{' '}
                    {item.problem}
                  </p>
                  <p className="text-sm text-ink-muted">
                    <span className="font-medium text-ink">Solution:</span>{' '}
                    {item.solution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
