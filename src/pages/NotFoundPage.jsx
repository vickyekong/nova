import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found" />

      <section className="container-nova flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">404</p>
        <h1 className="heading-lg mt-4">This page doesn’t exist.</h1>
        <p className="body-lg mt-3 max-w-md">
          The link may be old or mistyped. Start from the homepage or browse Logo
          Mart.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/logo-mart" className="btn-secondary">
            Browse Logo Mart
          </Link>
          <Link to="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </section>
    </>
  );
}
