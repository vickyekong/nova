import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { site } from '../../data/site';
import { TextReveal } from '../motion/TextReveal';
import { MagneticLink } from '../motion/MagneticLink';
import { Tilt } from '../motion/Tilt';

export function Hero() {
  const reduce = useReducedMotion();
  const imgRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const imgTransform = useMotionTemplate`translate(${smx}px, ${smy}px) scale(1.06)`;

  function onImgMove(e) {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * -16);
    my.set(py * -12);
  }

  function onImgLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="relative overflow-hidden mesh-bg">
      {/* Diagonal energy streak */}
      <div
        className="pointer-events-none absolute -left-1/4 top-1/3 h-px w-[150%] rotate-[-8deg] bg-gradient-to-r from-transparent via-nova/40 to-transparent"
        aria-hidden
      />

      <div className="container-nova relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-10">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <motion.p
            className="section-label mb-5 inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-nova" />
              <span className="relative h-2 w-2 rounded-full bg-nova" />
            </span>
            Nova · {site.lockup}
          </motion.p>

          <TextReveal
            text={site.positioning}
            className="heading-xl text-balance"
            as="h1"
            delay={0.1}
          />

          <motion.p
            className="body-lg mt-6 max-w-md"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.tagline} Same craft as Novus Africa — scoped for SME budgets
            and timelines.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <MagneticLink to="/pricing" className="btn-primary">
              See Pricing
              <ArrowRight size={16} />
            </MagneticLink>
            <MagneticLink to="/portfolio" className="btn-secondary" strength={0.2}>
              View Our Work
              <ArrowUpRight size={16} />
            </MagneticLink>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center gap-4 text-xs text-ink-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/logo-mart" className="group inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-nova">
              Or grab a ready logo
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Interactive media plane */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <Tilt className="relative" max={6}>
            <div
              ref={imgRef}
              className="relative aspect-[4/5] overflow-hidden rounded-nova-xl sm:aspect-[5/4] lg:aspect-[4/3] lg:min-h-[520px]"
              onMouseMove={onImgMove}
              onMouseLeave={onImgLeave}
              data-cursor="hover"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1400&q=80&auto=format&fit=crop"
                alt="Small business owner working with phone and materials"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ transform: reduce ? undefined : imgTransform }}
                width={1400}
                height={1050}
                fetchPriority="high"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-nova/20"
                aria-hidden
              />
            </div>
          </Tilt>

          {/* Orbiting spark accent */}
          <motion.div
            className="pointer-events-none absolute -right-3 -top-3 hidden h-16 w-16 rounded-full border border-nova/30 sm:block"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-nova" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
