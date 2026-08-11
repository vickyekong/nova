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
    <section className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-nova/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-ignition-line opacity-80"
        aria-hidden
      />
      <div className="container-nova relative text-center">
        <motion.h2
          className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-[-0.025em] text-cream text-balance"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline}
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-base text-cream/65"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {sub}
        </motion.p>
        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          <MagneticLink to={primaryTo} className="btn-primary">
            {primaryLabel}
            <ArrowRight size={16} />
          </MagneticLink>
          <MagneticLink
            to={secondaryTo}
            className="inline-flex items-center justify-center gap-2 rounded-nova border border-cream/20 px-5 py-3 font-display text-sm font-semibold text-cream transition-colors hover:border-cream/40 hover:bg-cream/5"
            strength={0.2}
          >
            {secondaryLabel}
          </MagneticLink>
        </motion.div>
      </div>
    </section>
  );
}
