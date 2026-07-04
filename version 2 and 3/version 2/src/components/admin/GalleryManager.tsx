"use client";

import { useState } from "react";
import { createPhoto, deletePhoto } from "@/app/actions/admin/gallery";

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

export function GalleryManager({ photos }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);

  async function handleDelete(id: string) {
    await deletePhoto(id);
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Gallery</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-forest-canopy text-white text-sm rounded-lg hover:bg-forest-canopy/80"
        >
          {showAddForm ? "Cancel" : "+ Add Photo"}
        </button>
      </div>

      {showAddForm && (
        <form
          action={async (formData) => {
            await createPhoto(null, formData);
            setShowAddForm(false);
          }}
          className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3"
        >
          <input
            name="url"
            placeholder="Image URL"
            required
            className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
          />
          <input
            name="alt"
            placeholder="Alt text"
            required
            className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="category"
              placeholder="Category (Fields, People, Livestock)"
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
            <input
              name="displayOrder"
              type="number"
              placeholder="Display order"
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg"
          >
            Add
          </button>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group bg-subtle-earth rounded-lg overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <p className="text-xs text-dusty-clay truncate">{photo.alt}</p>
              {photo.category && (
                <p className="text-xs text-harvest-gold">{photo.category}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(photo.id)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete photo"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
