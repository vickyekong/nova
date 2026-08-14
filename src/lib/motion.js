/** Shared framer-motion presets so timings stay consistent site-wide. */

export const EASE = [0.22, 1, 0.36, 1];

export const SPRING = { type: 'spring', stiffness: 320, damping: 22 };

/** Fade + rise as the element scrolls into view. */
export function fadeInView({ y = 24, delay = 0, duration = 0.55 } = {}) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration, ease: EASE },
  };
}

/** Fade + rise on mount — for above-the-fold content. */
export function fadeIn({ y = 16, delay = 0, duration = 0.5 } = {}) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration, ease: EASE },
  };
}

/** Animated height collapse, shared by accordions. */
export const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

/** True when the pointer can't hover — skip cursor-driven effects. */
export function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches;
}
