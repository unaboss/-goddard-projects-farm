"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  category: string | null;
  displayOrder: number;
}

interface Props {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prevPhoto() {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1);
  }

  function nextPhoto() {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === photos.length - 1 ? 0 : lightboxIndex + 1);
  }

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-[4/3] bg-rich-soil rounded-lg overflow-hidden group cursor-pointer hover:ring-2 hover:ring-harvest-gold transition-all text-left"
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-deep-earth/0 group-hover:bg-deep-earth/40 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-deep-earth/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-warm-cream text-sm truncate">{photo.alt}</p>
              {photo.category && (
                <p className="text-dusty-clay text-xs">{photo.category}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && current && (
        <div
          className="fixed inset-0 z-50 bg-deep-earth/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-rich-soil/80 rounded-full flex items-center justify-center text-warm-cream hover:bg-rich-soil transition-colors z-10"
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-rich-soil/80 rounded-full flex items-center justify-center text-warm-cream hover:bg-rich-soil transition-colors z-10"
          >
            ←
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-rich-soil/80 rounded-full flex items-center justify-center text-warm-cream hover:bg-rich-soil transition-colors z-10"
          >
            →
          </button>

          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.url}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-warm-cream font-body">{current.alt}</p>
            <p className="text-dusty-clay text-xs">
              {lightboxIndex + 1} / {photos.length}
              {current.category ? ` · ${current.category}` : ""}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
