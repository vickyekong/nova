import { motion, useReducedMotion } from 'framer-motion';

/** Staggered word reveal for headlines */
export function TextReveal({ text, className, as = 'h1', delay = 0 }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const Comp = motion[as] || motion.h1;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Comp className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
