import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { FARM } from "@/lib/constants";

export default async function GalleryPreview() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { displayOrder: "asc" },
    take: 3,
  });

  return (
    <section className="py-16 md:py-20 bg-rich-soil">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-heading text-3xl text-harvest-gold mb-2">
          Farm Gallery
        </h2>
        <p className="text-dusty-clay mb-8">A glimpse of life at {FARM.shortName}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href="/gallery"
              className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-subtle-earth"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-deep-earth/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-body text-warm-cream font-medium">
                  Open Gallery &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
