import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Gallery — Goddard Projects Farm",
  description: "Photos from Goddard Projects Farm in Manamane, Limpopo.",
};

export default async function GalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl text-warm-cream mb-2">
        Farm Gallery
      </h1>
      <p className="text-dusty-clay mb-8 max-w-2xl">
        A glimpse of life at Goddard Projects Farm — our people, livestock, and land.
      </p>

      {photos.length === 0 ? (
        <p className="text-dusty-clay text-center py-12">
          No photos yet &mdash; check back soon!
        </p>
      ) : (
        <GalleryGrid photos={photos} />
      )}
    </div>
  );
}
