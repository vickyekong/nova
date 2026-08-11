import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { site } from '../../data/site';
import { TextReveal } from '../motion/TextReveal';
import { MagneticLink } from '../motion/MagneticLink';

export function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden bg-ink text-white lg:-mt-[4.5rem]">
      {/* Bold warm-red plane — brand color, not a wash */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-nova lg:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-nova lg:hidden"
        aria-hidden
      />

      {/* Photo sits inside the red plane on desktop */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1400&q=80&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
          width={1400}
          height={1200}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-nova/55" aria-hidden />
      </div>

      <div className="container-nova relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-14 pt-28 sm:pb-16 lg:justify-center lg:py-24">
        <div className="max-w-2xl">
          <motion.div
            className="mb-6 inline-flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="h-2 w-2 rounded-full bg-nova" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-nova">
              Nova
            </p>
          </motion.div>

          <TextReveal
            text={site.positioning}
            className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white text-balance"
            as="h1"
            delay={0.08}
          />

          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {site.tagline} Same craft as Novus Africa — scoped for SME budgets
            and timelines.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.45 }}
          >
            <MagneticLink to="/pricing" className="btn-primary">
              See Pricing
              <ArrowRight size={16} />
            </MagneticLink>
            <MagneticLink
              to="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-nova border-2 border-white px-5 py-3.5 font-display text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              strength={0.2}
            >
              View Our Work
              <ArrowUpRight size={16} />
            </MagneticLink>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <Link
              to="/logo-mart"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-nova"
            >
              Or grab a ready logo from Logo Mart
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
