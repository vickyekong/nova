import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

/** Nova logo mark. Use inverted on dark surfaces. */
export function Logo({ className, inverted = false }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center', className)}>
      <img
        src="/nova-logo.png"
        alt="Nova"
        className={cn(
          'h-9 w-auto object-contain sm:h-10',
          inverted && 'brightness-0 invert',
        )}
        width={104}
        height={150}
      />
    </Link>
  );
}
