import { AnimatePresence, motion } from 'framer-motion';
import { collapse } from '../../lib/motion';
import { cn } from '../../lib/utils';

/** Height-animated disclosure region. */
export function Collapse({ open, className, children }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div {...collapse} className={cn('overflow-hidden', className)}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
