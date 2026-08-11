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
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-ignition-radial"
        aria-hidden
      />
      <motion.div
        style={{ y, scale }}
        className="container-nova relative text-center"
      >
        <p className="section-label">Pricing</p>
        <h2 className="heading-lg mt-3">
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
