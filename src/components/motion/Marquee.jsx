import { cn } from '../../lib/utils';

/** Infinite horizontal marquee — pauses on hover */
export function Marquee({ children, className, speed = 40, reverse = false }) {
  return (
    <div
      className={cn('group relative overflow-hidden', className)}
      data-cursor="hover"
    >
      <div
        className={cn(
          'flex w-max gap-10 py-1',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          'group-hover:[animation-play-state:paused]',
        )}
        style={{ '--marquee-duration': `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
