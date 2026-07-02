import Link from 'next/link';
import { FARM } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative bg-deep-earth py-24 md:py-40 text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpeg)' }}
      />
      <div className="absolute inset-0 bg-deep-earth/70" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-harvest-gold/20 flex items-center justify-center">
          <span className="text-3xl font-heading text-harvest-gold">GP</span>
        </div>
        <h1 className="font-heading text-4xl md:text-6xl text-harvest-gold mb-4">
          {FARM.tagline}
        </h1>
        <p className="text-dusty-clay text-lg md:text-xl mb-10 capitalize">
          {FARM.subTagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/livestock"
            className="bg-forest-canopy text-warm-cream rounded-lg px-8 py-4 font-heading text-lg hover:bg-forest-canopy-light transition-colors"
          >
            Browse Livestock
          </Link>
          <Link
            href="/produce"
            className="bg-forest-canopy text-warm-cream rounded-lg px-8 py-4 font-heading text-lg hover:bg-forest-canopy-light transition-colors"
          >
            Our Produce
          </Link>
        </div>
      </div>
    </section>
  );
}
