'use client';

import Image from 'next/image';

interface Props { livestock: { id: string; name: string; photoUrl: string; priceRange: string; availabilityStatus: string; displayOrder: number; }; }

const STATUS_STYLES: Record<string, string> = {
  Available: 'bg-forest-canopy text-warm-cream',
  ComingSoon: 'bg-harvest-gold text-deep-earth',
  Sold: 'bg-dusty-clay/30 text-dusty-clay',
};

export function LivestockCard({ livestock }: Props) {
  return (
    <div className="bg-rich-soil rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="relative aspect-square bg-rich-soil">
        <Image src={livestock.photoUrl} alt={livestock.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-xl text-warm-cream mb-1">{livestock.name}</h3>
        <p className="font-semibold text-harvest-gold text-lg mb-3">{livestock.priceRange}</p>
        <span className={`text-xs rounded-full px-3 py-1 ${STATUS_STYLES[livestock.availabilityStatus] || 'bg-dusty-clay/20 text-dusty-clay'}`}>
          {livestock.availabilityStatus === 'ComingSoon' ? 'Coming Soon' : livestock.availabilityStatus}
        </span>
      </div>
    </div>
  );
}
