import type { Metadata } from 'next';
import { LogoutButton } from '@/components/admin/LogoutButton';

export const metadata: Metadata = {
  title: 'Admin — Goddard Projects Farm',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-deep-earth text-warm-cream antialiased min-h-screen">
        <header className="border-b border-subtle-earth bg-rich-soil/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="font-heading text-xl text-harvest-gold">Admin — Goddard Projects</h1>
            <LogoutButton />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
