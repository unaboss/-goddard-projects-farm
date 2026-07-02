import Link from 'next/link';
import { FARM } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-rich-soil border-t border-subtle-earth mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-heading text-harvest-gold text-lg">{FARM.shortName}</p>
          <p className="text-dusty-clay text-sm">{FARM.location}</p>
        </div>
        <div className="flex gap-6 text-sm text-dusty-clay">
          <Link href="/contact" className="hover:text-warm-cream transition-colors">Contact</Link>
          <span>{FARM.email}</span>
        </div>
        <p className="text-dusty-clay text-xs">
          &copy; {FARM.establishedYear}&ndash;{currentYear} {FARM.shortName}
        </p>
      </div>
    </footer>
  );
}
