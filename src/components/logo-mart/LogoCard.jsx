import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatLogoPrice } from '../../data/logos';
import { isLogoSold } from '../../lib/paystack';
import { cn } from '../../lib/utils';

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
        whileHover={{ y: -6, borderColor: 'rgba(255,107,53,0.35)' }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <div className="relative flex aspect-square items-center justify-center bg-[#F7F7F5] p-8">
          <motion.div
            className="flex h-full w-full flex-col items-center justify-center rounded-nova bg-white shadow-sm"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink/30">
              [LOGO THUMBNAIL]
            </span>
            <span className="mt-2 max-w-[80%] text-center font-display text-sm font-semibold text-ink/50">
              {logo.name}
            </span>
          </motion.div>

          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {logo.isNew && !sold && (
              <span className="rounded-full bg-nova px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white">
                New
              </span>
            )}
            {sold && (
              <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-cream">
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
            {formatLogoPrice(logo.price)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
