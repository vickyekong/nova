import { useMemo, useState } from 'react';
import { SEO } from '../components/SEO';
import { CTABand } from '../components/CTABand';
import { PageHero } from '../components/PageHero';
import { FilterPills } from '../components/ui/FilterPills';
import { portfolio, portfolioFilters } from '../data/portfolio';

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

      <PageHero label="Portfolio" title="Transformation stories, not mood boards.">
        SMEs respond to before → after. Here’s a sample of the work.
      </PageHero>

      <section className="py-12 sm:py-16">
        <div className="container-nova">
          <FilterPills
            options={portfolioFilters}
            value={filter}
            onChange={setFilter}
            variant="round"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-nova-lg bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
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
