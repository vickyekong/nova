import { Marquee } from '../motion/Marquee';
import { stats } from '../../data/site';

export function TrustBar() {
  const items = [...stats, ...stats];

  return (
    <section className="bg-nova text-white">
      <div className="mask-fade-x py-5 sm:py-6">
        <Marquee speed={28}>
          {items.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap px-2"
            >
              <span className="price-mono text-xl text-white sm:text-2xl">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-white/85">{stat.label}</span>
              <span
                className="ml-6 inline-block h-2 w-2 rotate-45 bg-white"
                aria-hidden
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
