import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default async function GalleryManagerWrapper() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return <GalleryManager photos={photos} />;
}
