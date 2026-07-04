'use client';

import { useState, useTransition } from 'react';
import { createProduce, updateProduce, deleteProduce } from '@/app/actions/admin/produce';

interface Item { id: string; name: string; description: string; category: string; seasonality: string; inSeason: boolean; imageUrl: string; displayOrder: number; }
interface Props { items: Item[]; }

export function ProduceManager({ items }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | undefined>();
  const [editError, setEditError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  function handleAdd(formData: FormData) { setAddError(undefined); startTransition(async () => { const r = await createProduce(null, formData); if (!r.success) setAddError(r.error); }); }
  function handleEdit(formData: FormData) { setEditError(undefined); startTransition(async () => { const r = await updateProduce(null, formData); if (!r.success) setEditError(r.error); }); }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Produce Manager</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-forest-canopy text-white text-sm rounded-lg hover:bg-forest-canopy/80">{showAddForm ? 'Cancel' : '+ Add New'}</button>
      </div>
      {showAddForm && (
        <form action={handleAdd} className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3">
          <input name="name" placeholder="Name" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <input name="description" placeholder="Description" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <div className="grid grid-cols-2 gap-3">
            <input name="category" placeholder="Category (Vegetables)" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="seasonality" placeholder="Seasonality (Summer)" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="imageUrl" placeholder="Image URL" required className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="displayOrder" type="number" placeholder="Display order" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <label className="flex items-center gap-2 text-sm text-warm-cream"><input type="checkbox" name="inSeason" value="true" defaultChecked className="rounded" /> In season</label>
          <button type="submit" disabled={isPending} className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg">Save</button>
          {addError && <p className="text-red-400 text-sm">{addError}</p>}
        </form>
      )}
      {editingId && (
        <form action={handleEdit} className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3">
          <input type="hidden" name="id" value={editingId} />
          <input name="name" placeholder="Name" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <input name="description" placeholder="Description" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <div className="grid grid-cols-2 gap-3">
            <input name="category" placeholder="Category" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="seasonality" placeholder="Seasonality" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="imageUrl" placeholder="Image URL" required className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
            <input name="displayOrder" type="number" placeholder="Display order" className="px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          </div>
          <label className="flex items-center gap-2 text-sm text-warm-cream"><input type="checkbox" name="inSeason" value="true" className="rounded" /> In season</label>
          <div className="flex gap-2">
            <button type="submit" disabled={isPending} className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg">Update</button>
            <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 text-dusty-clay text-sm hover:text-warm-cream">Cancel</button>
          </div>
          {editError && <p className="text-red-400 text-sm">{editError}</p>}
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-subtle-earth text-dusty-clay text-xs uppercase"><th className="pb-2 pr-2">Name</th><th className="pb-2 pr-2">Category</th><th className="pb-2 pr-2">Season</th><th className="pb-2 pr-2">Status</th><th className="pb-2">Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-subtle-earth/50">
                <td className="py-2 pr-2 text-warm-cream">{item.name}</td>
                <td className="py-2 pr-2 text-dusty-clay">{item.category}</td>
                <td className="py-2 pr-2 text-dusty-clay">{item.seasonality}</td>
                <td className="py-2 pr-2"><span className={`text-xs px-2 py-0.5 rounded-full ${item.inSeason ? 'bg-forest-canopy/20 text-forest-canopy' : 'bg-dusty-clay/20 text-dusty-clay'}`}>{item.inSeason ? 'In Season' : 'Out'}</span></td>
                <td className="py-2 space-x-2">
                  <button onClick={() => setEditingId(item.id)} className="text-harvest-gold text-xs hover:underline">Edit</button>
                  {deleteConfirm === item.id ? (
                    <><button onClick={async () => { await deleteProduce(item.id); setDeleteConfirm(null); }} className="text-red-400 text-xs hover:underline">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-dusty-clay text-xs hover:underline">Cancel</button></>
                  ) : <button onClick={() => setDeleteConfirm(item.id)} className="text-red-400 text-xs hover:underline">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
