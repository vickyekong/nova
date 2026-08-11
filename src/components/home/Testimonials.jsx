import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

export function Testimonials() {
  return (
    <section className="border-t border-ink/8 bg-white py-20 sm:py-28">
      <div className="container-nova">
        <Reveal className="max-w-xl">
          <p className="section-label">From SME owners</p>
          <h2 className="heading-lg mt-3">Short stories. Real businesses.</h2>
        </Reveal>

        <Stagger
          className="mt-12 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-3"
          delay={0.08}
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <motion.blockquote
                className="flex h-full flex-col bg-white p-6 sm:p-8"
                whileHover={{ backgroundColor: '#FFFFFF' }}
                data-cursor="hover"
              >
                <p className="flex-1 text-base leading-relaxed text-ink">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex items-center gap-3 border-t border-ink/10 pt-4">
                  <img
                    src={t.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
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
