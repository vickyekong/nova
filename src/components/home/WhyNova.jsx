import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BadgeCheck, Sparkles } from 'lucide-react';
import { whyNova } from '../../data/site';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

const icons = [Zap, BadgeCheck, Sparkles];

export function WhyNova() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 sm:py-24">
      <div className="container-nova">
        <Reveal className="max-w-2xl">
          <p className="section-label">Why Nova</p>
          <h2 className="heading-lg mt-3 text-balance">
            Built for owners who don’t have time for agency theatre.
          </h2>
        </Reveal>

        {/* Mobile: stacked */}
        <Stagger className="mt-12 grid gap-3 sm:hidden" delay={0.1}>
          {whyNova.map((item, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem key={item.title}>
                <div className="rounded-nova-lg border border-ink/8 bg-cream-dark p-5">
                  <Icon className="text-nova" size={22} />
                  <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Desktop: interactive accordion strip */}
        <div className="mt-14 hidden gap-3 sm:grid sm:grid-cols-3">
          {whyNova.map((item, i) => {
            const Icon = icons[i];
            const isActive = active === i;
            return (
              <motion.button
                key={item.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className="relative overflow-hidden rounded-nova-xl border border-ink/8 bg-cream-dark p-6 text-left transition-colors"
                animate={{
                  backgroundColor: isActive ? 'rgba(255,107,53,0.08)' : 'rgba(240,235,227,1)',
                  borderColor: isActive ? 'rgba(255,107,53,0.35)' : 'rgba(26,26,26,0.08)',
                }}
              >
                <motion.div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-nova/10"
                  animate={{ scale: isActive ? 1.4 : 0.6, opacity: isActive ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  aria-hidden
                />
                <Icon className="relative text-nova" size={24} />
                <h3 className="relative mt-5 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      key="body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative mt-3 text-sm leading-relaxed text-ink-soft"
                    >
                      {item.body}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!isActive && (
                  <p className="relative mt-3 line-clamp-2 text-sm text-ink-muted">
                    {item.body}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
