import { prisma } from '@/lib/prisma';
import { GalleryManager } from '@/components/admin/GalleryManager';

export async function GalleryManagerWrapper() {
  const photos = await prisma.galleryPhoto.findMany({ orderBy: { displayOrder: 'asc' } });
  return <GalleryManager photos={JSON.parse(JSON.stringify(photos))} />;
}
