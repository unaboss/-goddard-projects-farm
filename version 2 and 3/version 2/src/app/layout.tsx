import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goddard Projects Farm",
  description: "Fresh produce and quality livestock from the heart of Limpopo, South Africa.",
  openGraph: {
    title: "Goddard Projects Farm",
    description: "Fresh produce and quality livestock from the heart of Limpopo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-deep-earth text-warm-cream antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
