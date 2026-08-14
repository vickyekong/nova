import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { MagneticLink } from '../motion/MagneticLink';
import { MockLogo } from '../logo-mart/MockLogo';
import { logos } from '../../data/logos';
import { fadeInView } from '../../lib/motion';
import { isLogoSold } from '../../lib/paystack';
import { formatNaira } from '../../lib/utils';

export function LogoMartTeaser() {
  const preview = logos.filter((l) => !isLogoSold(l)).slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-nova sm:w-2" aria-hidden />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 bg-nova"
        aria-hidden
      />
      <div className="container-nova relative">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="section-label">Logo Mart</p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold tracking-[-0.03em] text-white text-balance">
              Can’t wait for custom? Grab a logo, make it yours, launch today.
            </h2>
          </div>
          <MagneticLink to="/logo-mart" className="btn-primary shrink-0">
            Browse Logo Mart
            <ArrowRight size={16} />
          </MagneticLink>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {preview.map((logo, i) => (
            <Link
              key={logo.id}
              to={`/logo-mart/${logo.id}`}
              data-cursor="hover"
              className="group"
            >
              <motion.div
                className="aspect-square border border-white/15 bg-white p-4 transition-colors group-hover:border-nova"
                {...fadeInView({ y: 20, delay: i * 0.06 })}
                whileHover={{ y: -4 }}
              >
                <div className="flex h-full flex-col items-center justify-between">
                  <div className="flex flex-1 items-center justify-center scale-90">
                    <MockLogo logo={logo} size="sm" />
                  </div>
                  <div className="w-full text-center">
                    <p className="line-clamp-1 font-display text-sm font-semibold text-ink">
                      {logo.name}
                    </p>
                    <p className="price-mono mt-1 text-xs text-nova">
                      {formatNaira(logo.price)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
