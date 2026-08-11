import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredWork } from '../../data/portfolio';
import { Reveal } from '../motion/Reveal';

export function FeaturedWork() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-nova">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="section-label">Featured work</p>
            <h2 className="heading-lg mt-3">Before chaos. After clarity.</h2>
          </div>
          <Link to="/portfolio" className="btn-ghost self-start">
            Full portfolio <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>

      {/* Horizontal snap gallery — trendy + tactile on mobile */}
      <div className="mt-10 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
        <div className="scroll-x pr-4 sm:pr-6">
          {featuredWork.map((item, i) => (
            <motion.article
              key={item.id}
              className="snap-card w-[78vw] shrink-0 sm:w-[420px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="hover"
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-nova-xl bg-cream-deeper">
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center transition-transform duration-500 group-hover:scale-105">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-nova">
                    [CASE STUDY IMAGE]
                  </span>
                  <span className="font-display text-lg font-semibold text-ink/40">
                    {item.title}
                  </span>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs text-cream/70">{item.problem}</p>
                  <p className="mt-1 text-sm font-medium text-cream">{item.solution}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {item.type} · {item.businessType}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
              </div>
            </motion.article>
          ))}

          <Link
            to="/portfolio"
            className="snap-card flex w-[60vw] shrink-0 items-center justify-center rounded-nova-xl border border-dashed border-ink/20 sm:w-[280px]"
            data-cursor="hover"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm font-semibold text-ink">
              See all work <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
