import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

const defaults = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = 'div',
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({ children, className, delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-6% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: defaults.hidden,
        show: {
          ...defaults.show,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
