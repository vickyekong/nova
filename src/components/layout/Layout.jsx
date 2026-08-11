import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorSpark } from '../motion/CursorSpark';
import { PageTransition } from '../motion/PageTransition';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.add('has-spark-cursor', 'grain');
    return () => {
      document.body.classList.remove('has-spark-cursor', 'grain');
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <CursorSpark />
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
