import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTABand } from '../components/CTABand';
import { site } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Nova — The Accessible Arm of Novus Africa"
        description="Nova is Novus Africa’s SME brand: same craft standards, faster delivery, fixed pricing. Built for small business owners who need to look credible now."
        path="/about"
      />

      <section className="border-b border-ink/8 bg-ignition-radial py-14">
        <div className="container-nova max-w-3xl">
          <p className="section-label">About</p>
          <h1 className="heading-lg mt-3 text-balance">
            The little sister of Novus — same DNA, different pace.
          </h1>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-nova grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="heading-md">Who Nova is for</h2>
            <p className="text-ink-soft leading-relaxed">
              Nigerian and African SMEs, solopreneurs, and early-stage founders
              who need a logo, a website, or basic brand identity to start
              trading credibly — not a full brand strategy engagement.
            </p>
            <p className="text-ink-soft leading-relaxed">
              You’re budget-conscious and time-poor. You’re often doing
              everything yourself. You don’t need a boardroom. You need a
              workshop table.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="heading-md">Why we exist</h2>
            <p className="text-ink-soft leading-relaxed">
              <a
                href={site.novusUrl}
                className="font-medium text-nova hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Novus Africa
              </a>{' '}
              is the flagship — premium, strategic, editorial. Nova is the
              accessible arm: same craft standards, smaller scope, faster
              delivery, clear fixed pricing.
            </p>
            <p className="text-ink-soft leading-relaxed">
              {site.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark py-14">
        <div className="container-nova max-w-2xl">
          <p className="section-label">The idea</p>
          <h2 className="heading-md mt-3">Ignition</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Nova is a star igniting — small, bright, fast-moving. That’s the
            promise: get your business lit up and looking the part without the
            agency wait. The spark shows up as energy in the design, not as a
            cartoon explosion.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-nova max-w-2xl">
          <p className="section-label">From Victore</p>
          <h2 className="heading-md mt-3">A note from the founder</h2>
          <blockquote className="mt-6 border-l-2 border-nova pl-5">
            <p className="text-lg leading-relaxed text-ink">
              {/* [FOUNDER NOTE — PLACEHOLDER] */}
              “[FOUNDER NOTE] I built Nova because too many sharp founders were
              stuck between DIY Canva and agency invoices they couldn’t justify
              yet. You deserve work that looks serious — without waiting six
              weeks for a proposal. Nova is that middle gear. When you’re ready
              for the full strategy engine, Novus is still here.”
            </p>
            <footer className="mt-4 text-sm text-ink-muted">
              — Victore, Novus Africa / Nova
            </footer>
          </blockquote>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Start a conversation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}
