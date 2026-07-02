"use client";

import Image from "next/image";

interface ProduceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  seasonality: string;
  inSeason: boolean;
  imageUrl: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProduceCardProps {
  produce: ProduceItem;
}

export function ProduceCard({ produce }: ProduceCardProps) {
  return (
    <div className="bg-rich-soil rounded-lg overflow-hidden">
      <div className="relative aspect-square bg-rich-soil">
        <Image
          src={produce.imageUrl}
          alt={produce.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-heading text-xl text-warm-cream">
          {produce.name}
        </h3>
        <p className="text-dusty-clay text-sm line-clamp-2">
          {produce.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-subtle-earth text-dusty-clay text-xs rounded-full px-3 py-1">
            {produce.category}
          </span>
          <span
            className={`text-xs rounded-full px-3 py-1 ${
              produce.inSeason
                ? "bg-forest-canopy text-warm-cream"
                : "bg-dusty-clay/20 text-dusty-clay"
            }`}
          >
            {produce.inSeason ? "In Season" : "Out of Season"}
          </span>
        </div>
      </div>
    </div>
  );
}
