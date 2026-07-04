"use client";

import { useState } from "react";
import {
  createProduce,
  updateProduce,
  deleteProduce,
} from "@/app/actions/admin/produce";

interface ProduceItem {
  id: string;
  name: string;
  description: string;
  category: string;
  seasonality: string;
  inSeason: boolean;
  imageUrl: string;
  displayOrder: number;
}

interface Props {
  items: ProduceItem[];
}

export function ProduceManager({ items }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  async function handleDelete(id: string) {
    await deleteProduce(id);
    setDeleteConfirm(null);
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Produce Manager</h2>
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
            await createProduce(null, formData);
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
            name="description"
            placeholder="Description"
            required
            className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="category"
              placeholder="Category (Vegetables)"
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
            <input
              name="seasonality"
              placeholder="Seasonality (Summer)"
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              name="imageUrl"
              placeholder="Image URL"
              required
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
            <input
              name="displayOrder"
              type="number"
              placeholder="Display order"
              className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-warm-cream">
            <input
              type="checkbox"
              name="inSeason"
              value="true"
              defaultChecked
              className="rounded"
            />
            In season
          </label>
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
              <th className="pb-2 pr-2">Category</th>
              <th className="pb-2 pr-2">Season</th>
              <th className="pb-2 pr-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-subtle-earth/50">
                <td className="py-2 pr-2 text-warm-cream">{item.name}</td>
                <td className="py-2 pr-2 text-dusty-clay">{item.category}</td>
                <td className="py-2 pr-2 text-dusty-clay">{item.seasonality}</td>
                <td className="py-2 pr-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      item.inSeason
                        ? "bg-forest-canopy/20 text-forest-canopy"
                        : "bg-dusty-clay/20 text-dusty-clay"
                    }`}
                  >
                    {item.inSeason ? "In Season" : "Out"}
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
