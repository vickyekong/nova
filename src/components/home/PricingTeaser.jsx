import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { startingPriceLabel } from '../../data/pricing';
import { MagneticLink } from '../motion/MagneticLink';

export function PricingTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-nova/40 to-transparent" />
      <motion.div style={{ y }} className="container-nova relative text-center">
        <p className="section-label">Pricing</p>
        <h2 className="heading-lg mt-4">
          Packages from{' '}
          <span className="price-mono text-nova">{startingPriceLabel}</span>
        </h2>
        <p className="body-lg mx-auto mt-4 max-w-lg">
          Transparent tiers. You see what’s included before you pay — the
          opposite of “book a consultation to hear a number.”
        </p>
        <MagneticLink to="/pricing" className="btn-primary mt-9 inline-flex">
          View full pricing
          <ArrowRight size={16} />
        </MagneticLink>
      </motion.div>
    </section>
  );
}
