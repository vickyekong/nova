import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion.create(Link);

/**
 * Magnetic CTA — pulls toward cursor on desktop.
 */
export function MagneticLink({
  to,
  href,
  children,
  className,
  strength = 0.35,
  external = false,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 });

  function onMove(e) {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const motionProps = {
    ref,
    className,
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink {...motionProps} to={to}>
      {children}
    </MotionLink>
  );
}
