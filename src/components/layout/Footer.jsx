import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../icons';
import { Logo } from '../Logo';
import { site, navLinks } from '../../data/site';
import { services } from '../../data/services';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="h-1.5 w-full bg-nova" />
      <div className="container-nova py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Design for SMEs who need to look credible now — faster, clearer,
              and priced for where you are.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-nova">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-nova">
              Packages
            </p>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-nova">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-nova"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-nova"
                >
                  <InstagramIcon size={16} />
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={site.novusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/75 transition-colors hover:text-nova"
          >
            Ready for the next level? Meet Novus Africa
            <ArrowUpRight size={16} />
          </a>
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Nova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
