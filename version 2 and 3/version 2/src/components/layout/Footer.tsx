import Link from "next/link";
import { FARM } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-rich-soil border-t border-subtle-earth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-heading text-sm text-warm-cream">
            {FARM.shortName}
          </p>
          <p className="text-xs text-dusty-clay mt-1">{FARM.location}</p>
        </div>
        <Link
          href="/contact"
          className="text-sm text-dusty-clay hover:text-harvest-gold transition-colors"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
