import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../Logo';
import { MagneticLink } from '../motion/MagneticLink';
import { navLinks } from '../../data/site';
import { cn } from '../../lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const light = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-ink/8 bg-white/92 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="container-nova flex h-16 items-center justify-between lg:h-[4.5rem]">
        <Logo inverted={light} />

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  'group relative px-3 py-2 text-sm font-medium transition-colors',
                  light
                    ? isActive
                      ? 'text-nova'
                      : 'text-white/75 hover:text-white'
                    : isActive
                      ? 'text-nova'
                      : 'text-ink-soft hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={cn(
                      'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-nova transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <MagneticLink to="/contact" className="btn-primary" strength={0.25}>
            Start Your Project
          </MagneticLink>
        </div>

        <button
          type="button"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-nova lg:hidden',
            light ? 'text-white' : 'text-ink',
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-ink/8 bg-white lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-nova flex flex-col gap-1 overflow-hidden py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-nova px-3 py-3 text-base font-medium',
                        isActive ? 'bg-nova/10 text-nova' : 'text-ink',
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/contact" className="btn-primary mt-3 w-full">
                Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
