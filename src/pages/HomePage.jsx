import { SEO } from '../components/SEO';
import { Hero } from '../components/home/Hero';
import { TrustBar } from '../components/home/TrustBar';
import { WhyNova } from '../components/home/WhyNova';
import { ServicesSnapshot } from '../components/home/ServicesSnapshot';
import { LogoMartTeaser } from '../components/home/LogoMartTeaser';
import { FeaturedWork } from '../components/home/FeaturedWork';
import { PricingTeaser } from '../components/home/PricingTeaser';
import { Testimonials } from '../components/home/Testimonials';
import { CTABand } from '../components/CTABand';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Affordable Logo & Website Design for SMEs"
        description="Nova by Novus Africa — Novus-grade design for small businesses in Nigeria. Fixed pricing, fast turnaround, Logo Mart ready-to-buy logos."
        path="/"
      />
      <Hero />
      <TrustBar />
      <WhyNova />
      <ServicesSnapshot />
      <LogoMartTeaser />
      <FeaturedWork />
      <PricingTeaser />
      <Testimonials />
      <CTABand />
    </>
  );
}
