import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { MagneticLink } from '../motion/MagneticLink';
import { logos, formatLogoPrice } from '../../data/logos';
import { isLogoSold } from '../../lib/paystack';

export function LogoMartTeaser() {
  const preview = logos.filter((l) => !isLogoSold(l)).slice(0, 5);

  return (
    <section className="relative overflow-hidden border-y border-ink/8 py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-ignition-line"
        aria-hidden
      />
      <div className="container-nova relative">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="section-label">Logo Mart</p>
            <h2 className="heading-lg mt-3 text-balance">
              Can’t wait for custom? Grab a logo, make it yours, launch today.
            </h2>
            <p className="mt-3 text-ink-soft">
              Exclusive marks. Buy once — it’s yours. Hover a tile to peek.
            </p>
          </div>
          <MagneticLink to="/logo-mart" className="btn-primary shrink-0">
            Browse Logo Mart
            <ArrowRight size={16} />
          </MagneticLink>
        </Reveal>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-5 sm:overflow-visible">
          {preview.map((logo, i) => (
            <Link
              key={logo.id}
              to={`/logo-mart/${logo.id}`}
              data-cursor="hover"
              className="group relative aspect-square w-[42vw] shrink-0 overflow-hidden rounded-nova-lg bg-white sm:w-auto"
            >
              <motion.div
                className="flex h-full flex-col items-center justify-center border border-ink/8 p-4 transition-colors group-hover:border-nova/30"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="font-mono text-[8px] uppercase tracking-wider text-ink/25">
                  [LOGO]
                </span>
                <span className="mt-2 line-clamp-2 text-center font-display text-xs font-semibold text-ink/45">
                  {logo.name}
                </span>
                <span className="price-mono mt-auto pt-3 text-xs text-nova opacity-0 transition-opacity group-hover:opacity-100">
                  {formatLogoPrice(logo.price)}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
