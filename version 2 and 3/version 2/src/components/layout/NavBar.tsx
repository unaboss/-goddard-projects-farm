"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FARM } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/produce", label: "Produce" },
  { href: "/livestock", label: "Livestock" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [hidden, setHidden] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setHidden(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`sticky top-0 z-40 bg-deep-earth/95 backdrop-blur border-b border-subtle-earth transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <span className="font-heading text-lg text-warm-cream">
            {FARM.shortName}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-sm transition-colors hover:text-harvest-gold ${
                pathname === link.href
                  ? "text-harvest-gold"
                  : "text-dusty-clay"
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
