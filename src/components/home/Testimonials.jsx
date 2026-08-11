import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

export function Testimonials() {
  return (
    <section className="bg-cream-dark py-20 sm:py-24">
      <div className="container-nova">
        <Reveal>
          <p className="section-label">From SME owners</p>
          <h2 className="heading-lg mt-3 max-w-xl">Short stories. Real businesses.</h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3" delay={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <motion.blockquote
                className="flex h-full flex-col rounded-nova-xl border border-ink/8 bg-cream p-6"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                data-cursor="hover"
              >
                <span className="font-display text-4xl leading-none text-nova/40">“</span>
                <p className="mt-2 flex-1 text-base leading-relaxed text-ink">{t.quote}</p>
                <footer className="mt-6 border-t border-ink/8 pt-4">
                  <cite className="not-italic">
                    <span className="block font-display text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-muted">
                      {t.business}
                    </span>
                  </cite>
                </footer>
              </motion.blockquote>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
