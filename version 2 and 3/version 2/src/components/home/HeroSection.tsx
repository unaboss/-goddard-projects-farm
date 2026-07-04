import Link from "next/link";
import { FARM } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="bg-deep-earth py-24 md:py-32 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-6xl text-warm-cream mb-4">
          {FARM.tagline}
        </h1>
        <p className="font-body text-lg md:text-xl text-harvest-gold italic mb-2">
          {FARM.subTagline}
        </p>
        <p className="font-body text-sm text-dusty-clay mb-10">
          {FARM.shortName} since {FARM.establishedYear}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/livestock"
            className="px-8 py-4 bg-forest-canopy text-warm-cream font-heading text-lg rounded-lg hover:bg-forest-canopy-light transition-colors"
          >
            Browse Livestock
          </Link>
          <Link
            href="/produce"
            className="px-8 py-4 bg-forest-canopy text-warm-cream font-heading text-lg rounded-lg hover:bg-forest-canopy-light transition-colors"
          >
            Our Produce
          </Link>
        </div>
      </div>
    </section>
  );
}
