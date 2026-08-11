import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesSnapshot } from '../../data/services';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

export function ServicesSnapshot() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-nova/10 blur-3xl"
        aria-hidden
      />
      <div className="container-nova relative">
        <Reveal className="flex flex-col gap-4 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="section-label">Services</p>
            <h2 className="heading-lg mt-3">Fixed-scope packages. No vague quotes.</h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-nova"
          >
            All packages <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Stagger className="mt-2" delay={0.05}>
          {servicesSnapshot.map((s, i) => (
            <StaggerItem key={s.id}>
              <Link
                to={`/services#${s.id}`}
                data-cursor="hover"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink/10 py-6 sm:gap-8 sm:py-7"
              >
                <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-nova sm:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 truncate text-sm text-ink-muted sm:text-base">
                    {s.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-6">
                  <span className="price-mono hidden text-sm text-ink sm:inline">
                    {s.priceLabel}
                  </span>
                  <motion.span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors group-hover:border-nova group-hover:bg-nova group-hover:text-white"
                    whileHover={{ rotate: 45 }}
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
