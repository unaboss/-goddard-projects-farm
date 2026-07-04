'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FARM } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/produce', label: 'Produce' },
  { href: '/livestock', label: 'Livestock' },
  { href: '/contact', label: 'Contact' },
];

export function NavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [hidden, setHidden] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setHidden(false);
      return;
    }
    const handleScroll = () => {
      setHidden(window.scrollY <= 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`sticky top-0 z-40 bg-deep-earth/95 backdrop-blur-sm border-b border-subtle-earth transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-harvest-gold/20 flex items-center justify-center text-harvest-gold font-bold text-xs">
            GP
          </div>
          <span className="font-heading text-xl text-harvest-gold hover:text-harvest-gold-light transition-colors">
            {FARM.shortName}
          </span>
        </Link>
        <div className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative pb-1 ${
                pathname === link.href
                  ? 'text-harvest-gold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-harvest-gold'
                  : 'text-dusty-clay hover:text-warm-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
