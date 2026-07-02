import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Goddard Projects Farm — From Our Soil to Your Table',
  description: 'Goddard Projects Farm — farming made better. Fresh produce and quality livestock from Manamane, Thohoyandou, Limpopo.',
  openGraph: {
    title: 'Goddard Projects Farm',
    description: 'From Our Soil to Your Table — farming made better',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased min-h-screen bg-deep-earth text-warm-cream">
        {children}
      </body>
    </html>
  );
}
