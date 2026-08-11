import { Marquee } from '../motion/Marquee';
import { stats } from '../../data/site';

export function TrustBar() {
  const items = [...stats, ...stats];

  return (
    <section className="relative border-y border-ink/8 bg-ink text-cream">
      <div className="mask-fade-x py-5 sm:py-6">
        <Marquee speed={32}>
          {items.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap px-2"
            >
              <span className="price-mono text-lg text-nova sm:text-xl">
                {stat.value}
              </span>
              <span className="text-sm text-cream/60">{stat.label}</span>
              <span className="ml-6 h-1 w-1 rounded-full bg-nova/60" aria-hidden />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
