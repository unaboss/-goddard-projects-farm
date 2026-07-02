"use client";

import { useState } from "react";
import {
  createLivestock,
  deleteLivestock,
} from "@/app/actions/admin/livestock";

interface LivestockItem {
  id: string;
  name: string;
  photoUrl: string;
  priceRange: string;
  availabilityStatus: string;
  displayOrder: number;
}

interface Props {
  items: LivestockItem[];
}

export function LivestockManager({ items }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  async function handleDelete(id: string) {
    await deleteLivestock(id);
    setDeleteConfirm(null);
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "Available":
        return "bg-forest-canopy/20 text-forest-canopy";
      case "ComingSoon":
        return "bg-harvest-gold/20 text-harvest-gold";
      case "Sold":
        return "bg-dusty-clay/20 text-dusty-clay";
      default:
        return "bg-dusty-clay/20 text-dusty-clay";
    }
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Livestock Manager</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-forest-canopy text-white text-sm rounded-lg hover:bg-forest-canopy/80 transition-colors"
        >
          {showAddForm ? "Cancel" : "+ Add New"}
        </button>
      </div>

      {showAddForm && (
        <form
          action={async (formData) => {
            await createLivestock(null, formData);
            setShowAddForm(false);
          }}
          className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3"
        >
          <input
            name="name"
            placeholder="Name"
            required
            className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
          />
          <input
            name="photoUrl"
            placeholder="Photo URL"
            required
            className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="priceRange"
              placeholder="Price range (R1,800 - R2,500)"
              required
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
            <select
              name="availabilityStatus"
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            >
              <option value="Available">Available</option>
              <option value="ComingSoon">Coming Soon</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
          <input
            name="displayOrder"
            type="number"
            placeholder="Display order"
            className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg"
          >
            Save
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-subtle-earth text-dusty-clay text-xs uppercase">
              <th className="pb-2 pr-2">Name</th>
              <th className="pb-2 pr-2">Price</th>
              <th className="pb-2 pr-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-subtle-earth/50">
                <td className="py-2 pr-2 text-warm-cream">{item.name}</td>
                <td className="py-2 pr-2 text-harvest-gold text-sm">
                  {item.priceRange}
                </td>
                <td className="py-2 pr-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass(
                      item.availabilityStatus
                    )}`}
                  >
                    {item.availabilityStatus === "ComingSoon"
                      ? "Coming Soon"
                      : item.availabilityStatus}
                  </span>
                </td>
                <td className="py-2 space-x-2">
                  {deleteConfirm === item.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 text-xs hover:underline"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-dusty-clay text-xs hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      className="text-red-400 text-xs hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
