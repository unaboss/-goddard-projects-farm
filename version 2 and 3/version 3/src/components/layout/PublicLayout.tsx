import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/ui/WhatsAppFloatingButton';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
