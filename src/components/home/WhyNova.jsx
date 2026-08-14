import { useState } from 'react';
import { whyNova } from '../../data/site';
import { Reveal } from '../motion/Reveal';
import { Collapse } from '../ui/Collapse';

export function WhyNova() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-nova">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="section-label">Why Nova</p>
            <h2 className="heading-lg mt-4 text-balance">
              Built for owners who don’t have time for agency theatre.
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">
              Hover a line. We keep the pitch short — your day is already full.
            </p>
            <div className="mt-8 flex gap-2" aria-hidden>
              <span className="h-3 w-10 bg-nova" />
              <span className="h-3 w-10 bg-ink" />
              <span className="h-3 w-10 border border-ink/20 bg-white" />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {whyNova.map((item, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-cursor="hover"
                    className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8"
                  >
                    <span
                      className={`font-mono text-sm font-semibold tabular-nums ${
                        isActive ? 'text-nova' : 'text-ink-muted'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`font-display text-xl font-semibold transition-colors sm:text-2xl ${
                          isActive ? 'text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <Collapse
                        open={isActive}
                        className="text-sm leading-relaxed text-ink-soft sm:text-base"
                      >
                        <p className="mt-3 max-w-xl border-l-2 border-nova pl-4">
                          {item.body}
                        </p>
                      </Collapse>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
