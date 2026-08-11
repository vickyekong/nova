import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Logo({ className, compact = false }) {
  return (
    <Link to="/" className={cn('group inline-flex flex-col leading-none', className)}>
      <span className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-nova">
        Nova
      </span>
      {!compact && (
        <span className="mt-0.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-ink-muted">
          by Novus Africa
        </span>
      )}
    </Link>
  );
}
