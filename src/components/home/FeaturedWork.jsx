import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { featuredWork } from '../../data/portfolio';
import { Reveal } from '../motion/Reveal';

export function FeaturedWork() {
  return (
    <section className="bg-white py-20 sm:py-28">
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

      <div className="mt-12 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
        <div className="scroll-x pr-4 sm:pr-6">
          {featuredWork.map((item, i) => (
            <motion.article
              key={item.id}
              className="snap-card w-[78vw] shrink-0 sm:w-[400px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="hover"
            >
              <div className="group relative aspect-[5/6] overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute left-0 top-0 z-10 h-full w-1 bg-nova opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white">
                    {item.type}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{item.businessType}</p>
                  <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                    <p className="text-xs text-white/55">{item.problem}</p>
                    <p className="mt-1 text-sm font-medium text-white">{item.solution}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          <Link
            to="/portfolio"
            className="snap-card flex w-[55vw] shrink-0 items-center justify-center border border-dashed border-ink/20 bg-white sm:w-[240px]"
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
