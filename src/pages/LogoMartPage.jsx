import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { CTABand } from '../components/CTABand';
import { LogoCard } from '../components/logo-mart/LogoCard';
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
import {
  logos,
  logoIndustries,
  logoStyles,
  logoMartHowItWorks,
  logoMartFaq,
} from '../data/logos';
import { isLogoSold } from '../lib/paystack';
import { cn } from '../lib/utils';

export default function LogoMartPage() {
  const [industry, setIndustry] = useState('all');
  const [style, setStyle] = useState('all');
  const [sort, setSort] = useState('newest');
  const [openFaq, setOpenFaq] = useState(0);

  const filtered = useMemo(() => {
    let list = logos.filter((l) => {
      if (industry !== 'all' && l.industry !== industry) return false;
      if (style !== 'all' && l.style !== style) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'available') {
        return Number(isLogoSold(a)) - Number(isLogoSold(b));
      }
      return Number(b.isNew) - Number(a.isNew) || Number(isLogoSold(a)) - Number(isLogoSold(b));
    });

    return list;
  }, [industry, style, sort]);

  return (
    <>
      <SEO
        title="Logo Mart — Ready-to-Buy Exclusive Logos"
        description="Browse pre-made exclusive logos for Nigerian SMEs. Buy today via Paystack, get files within 24 hours. Can't wait for custom? Launch today."
        path="/logo-mart"
      />

      <section className="mesh-bg border-b border-ink/8 py-14 sm:py-16">
        <div className="container-nova max-w-3xl">
          <Reveal>
            <p className="section-label">Logo Mart</p>
            <h1 className="heading-lg mt-3 text-balance">
              Can’t wait for custom? Grab a logo, make it yours, launch today.
            </h1>
            <p className="body-lg mt-4">
              Pre-made marks. Exclusive once sold. Pay with Paystack — files in
              your inbox within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-ink/8 py-12">
        <Stagger className="container-nova grid gap-8 sm:grid-cols-3">
          {logoMartHowItWorks.map((step) => (
            <StaggerItem key={step.step}>
              <p className="font-mono text-sm font-semibold text-nova">{step.step}</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                {step.title}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="py-12 sm:py-14">
        <div className="container-nova">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {logoIndustries.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => setIndustry(i.id)}
                  data-cursor="hover"
                  className={cn(
                    'rounded-nova px-3.5 py-2 text-sm font-medium transition-colors',
                    industry === i.id
                      ? 'bg-nova text-white'
                      : 'bg-cream-dark text-ink-soft hover:bg-cream-deeper',
                  )}
                >
                  {i.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {logoStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id)}
                  data-cursor="hover"
                  className={cn(
                    'rounded-nova border px-3 py-1.5 text-xs font-medium transition-colors',
                    style === s.id
                      ? 'border-nova bg-nova/10 text-nova'
                      : 'border-ink/10 text-ink-muted hover:border-ink/20',
                  )}
                >
                  {s.label}
                </button>
              ))}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-auto rounded-nova border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-nova"
                aria-label="Sort logos"
              >
                <option value="newest">Newest</option>
                <option value="available">Available first</option>
                <option value="price-asc">Price: low → high</option>
                <option value="price-desc">Price: high → low</option>
              </select>
            </div>
          </div>

          <p className="mt-5 text-sm text-ink-muted">
            {filtered.length} logo{filtered.length === 1 ? '' : 's'}
          </p>

          <LayoutGroup>
            <motion.div
              layout
              className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((logo) => (
                  <motion.div
                    key={logo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LogoCard logo={logo} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-ink-muted">
              No logos match those filters. Try clearing industry or style.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-ink/8 bg-cream-dark py-14">
        <div className="container-nova max-w-2xl">
          <p className="section-label">FAQ</p>
          <h2 className="heading-md mt-3">Before you buy</h2>
          <div className="mt-8 space-y-2">
            {logoMartFaq.map((item, i) => (
              <div
                key={item.q}
                className="overflow-hidden rounded-nova border border-ink/8 bg-cream"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  aria-expanded={openFaq === i}
                  data-cursor="hover"
                >
                  <span className="font-display text-sm font-semibold text-ink sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'shrink-0 text-ink-muted transition-transform',
                      openFaq === i && 'rotate-180',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-ink/5 px-4 text-sm leading-relaxed text-ink-soft"
                    >
                      <span className="block pb-4 pt-2">{item.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-muted">
            Want something built from scratch?{' '}
            <Link to="/services#starter-identity" className="font-medium text-nova hover:underline">
              See Starter Identity →
            </Link>
          </p>
        </div>
      </section>

      <CTABand
        headline="Ready to lock in a mark?"
        sub="Browse above, or talk to us if you want custom instead."
        primaryTo="/logo-mart"
        primaryLabel="Keep browsing"
        secondaryTo="/contact"
        secondaryLabel="Ask about custom"
      />
    </>
  );
}
