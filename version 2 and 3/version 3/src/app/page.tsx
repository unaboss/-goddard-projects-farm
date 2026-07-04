import PublicLayout from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <GalleryPreview />
    </PublicLayout>
  );
}
