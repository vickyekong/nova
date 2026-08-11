import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Desktop-only ignition cursor — a soft amber spark that follows the pointer.
 * Hidden on touch / reduced-motion.
 */
export function CursorSpark() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 28, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 400, damping: 28, mass: 0.3 });

  useEffect(() => {
    if (reduce) return undefined;
    const mq = window.matchMedia('(pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return undefined;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      setHovering(Boolean(t.closest('a, button, [data-cursor="hover"]')));
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-multiply"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="rounded-full bg-nova/35"
        animate={{
          width: hovering ? 48 : 18,
          height: hovering ? 48 : 18,
          opacity: hovering ? 0.45 : 0.7,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
}
