import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, LayoutTemplate, Rocket, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesSnapshot } from '../../data/services';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

const iconMap = {
  spark: Sparkles,
  layout: LayoutTemplate,
  rocket: Rocket,
  share: Share2,
};

export function ServicesSnapshot() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.18),transparent_50%)]"
        aria-hidden
      />
      <div className="container-nova relative">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-nova">
              Services
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.025em] text-cream">
              Fixed-scope packages. No vague quotes.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-display text-sm font-medium text-cream/70 transition-colors hover:text-nova"
          >
            All packages <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" delay={0.1}>
          {servicesSnapshot.map((s, i) => {
            const Icon = iconMap[s.icon] || Sparkles;
            return (
              <StaggerItem key={s.id}>
                <Link to={`/services#${s.id}`} data-cursor="hover">
                  <motion.div
                    className="group h-full rounded-nova-xl border border-cream/10 bg-cream/[0.04] p-5 transition-colors hover:border-nova/40 hover:bg-cream/[0.07]"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    <div className="flex items-start justify-between">
                      <Icon className="text-nova" size={22} />
                      <span className="font-mono text-[10px] text-cream/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-semibold text-cream group-hover:text-nova">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/55">
                      {s.tagline}
                    </p>
                    <p className="price-mono mt-5 text-sm text-cream/90">
                      {s.priceLabel}
                    </p>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
