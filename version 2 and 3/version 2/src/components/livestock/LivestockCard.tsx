"use client";

import Image from "next/image";

interface LivestockItem {
  id: string;
  name: string;
  photoUrl: string;
  priceRange: string;
  availabilityStatus: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LivestockCardProps {
  livestock: LivestockItem;
}

function getAvailabilityClass(status: string) {
  switch (status) {
    case "Available":
      return "bg-forest-canopy text-warm-cream";
    case "ComingSoon":
      return "bg-harvest-gold text-deep-earth";
    case "Sold":
      return "bg-dusty-clay/30 text-dusty-clay";
    default:
      return "bg-dusty-clay/20 text-dusty-clay";
  }
}

export function LivestockCard({ livestock }: LivestockCardProps) {
  return (
    <div className="bg-rich-soil rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="relative aspect-square bg-rich-soil">
        <Image
          src={livestock.photoUrl}
          alt={livestock.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-heading text-xl text-warm-cream">
          {livestock.name}
        </h3>
        <p className="font-semibold text-harvest-gold text-lg">
          {livestock.priceRange}
        </p>
        <span
          className={`inline-block text-xs rounded-full px-3 py-1 ${getAvailabilityClass(
            livestock.availabilityStatus
          )}`}
        >
          {livestock.availabilityStatus === "ComingSoon"
            ? "Coming Soon"
            : livestock.availabilityStatus}
        </span>
      </div>
    </div>
  );
}
