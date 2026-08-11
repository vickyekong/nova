import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../icons';
import { site, navLinks } from '../../data/site';
import { services } from '../../data/services';

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-ink text-cream">
      <div className="container-nova py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex flex-col leading-none">
              <span className="font-display text-2xl font-bold tracking-tight text-cream">
                Nova
              </span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-cream/50">
                by Novus Africa
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
              Novus-grade design for SMEs who need to look credible now — faster,
              clearer, and priced for where you are.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-nova">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-nova">
              Packages
            </p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-nova">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                >
                  <InstagramIcon size={16} />
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={site.novusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cream/80 transition-colors hover:text-nova"
          >
            Ready for the next level? Meet Novus Africa
            <ArrowUpRight size={16} />
          </a>
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} Nova by Novus Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
