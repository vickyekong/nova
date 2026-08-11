import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticLink } from './motion/MagneticLink';

export function CTABand({
  headline = "Let's get your business looking the part.",
  sub = 'Pick a package or grab a Logo Mart mark — either way, you leave looking ready.',
  primaryTo = '/contact',
  primaryLabel = 'Start Your Project',
  secondaryTo = '/pricing',
  secondaryLabel = 'See Pricing',
}) {
  return (
    <section className="relative overflow-hidden bg-nova py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[30%] bg-ink hidden sm:block"
        aria-hidden
      />
      <div className="container-nova relative">
        <div className="max-w-2xl">
          <motion.h2
            className="font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-white text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-lg text-base text-white/85"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {sub}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            <MagneticLink
              to={primaryTo}
              className="inline-flex items-center justify-center gap-2 rounded-nova bg-ink px-5 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-ink/90"
            >
              {primaryLabel}
              <ArrowRight size={16} />
            </MagneticLink>
            <MagneticLink
              to={secondaryTo}
              className="inline-flex items-center justify-center gap-2 rounded-nova border-2 border-white px-5 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-white hover:text-nova"
              strength={0.2}
            >
              {secondaryLabel}
            </MagneticLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
