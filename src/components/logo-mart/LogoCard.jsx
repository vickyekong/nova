import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { logoSurface } from '../../lib/brand';
import { SPRING } from '../../lib/motion';
import { isLogoSold } from '../../lib/paystack';
import { cn, formatNaira } from '../../lib/utils';
import { MockLogo } from './MockLogo';

export function LogoCard({ logo }) {
  const sold = isLogoSold(logo);

  return (
    <Link
      to={`/logo-mart/${logo.id}`}
      data-cursor="hover"
      className={cn('group block', sold && 'opacity-80')}
    >
      <motion.div
        className="overflow-hidden rounded-nova-lg border border-ink/8 bg-white"
        whileHover={{ y: -6, borderColor: 'rgba(226,61,40,0.4)' }}
        transition={SPRING}
      >
        <div
          className="relative flex aspect-square items-center justify-center p-6"
          style={{ backgroundColor: logoSurface(logo) }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <MockLogo logo={logo} size="md" />
          </motion.div>

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {logo.isNew && !sold && (
              <span className="rounded-full bg-nova px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white">
                New
              </span>
            )}
            {sold && (
              <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white">
                Sold
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between gap-2 p-4">
          <div>
            <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-nova">
              {logo.name}
            </h3>
            <p className="mt-0.5 text-xs capitalize text-ink-muted">
              {logo.style} · {logo.industry}
            </p>
          </div>
          <p className="price-mono shrink-0 text-sm text-ink">
            {formatNaira(logo.price)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
