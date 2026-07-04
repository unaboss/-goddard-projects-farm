import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export async function GalleryPreview() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { displayOrder: 'asc' },
    take: 3,
  });

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-3xl text-harvest-gold mb-2 after:block after:w-16 after:h-0.5 after:bg-harvest-gold after:mt-2">
          From the Farm
        </h2>
        <p className="text-dusty-clay mb-8">Glimpses of life and work at Goddard Projects</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href="/contact"
              className="group relative overflow-hidden rounded-lg aspect-video bg-rich-soil"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-deep-earth/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-warm-cream font-heading text-lg">View Gallery &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
