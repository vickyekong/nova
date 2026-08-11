import { Reveal } from './motion/Reveal';

/** Shared page intro — Outerspace + warm red */
export function PageHero({ label, title, children }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-nova sm:w-2" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-48 w-48 bg-nova"
        aria-hidden
      />
      <div className="container-nova relative max-w-3xl py-16 sm:py-20">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-nova" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-nova">
              {label}
            </p>
          </div>
          <h1 className="font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white text-balance">
            {title}
          </h1>
          {children && (
            <div className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {children}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
