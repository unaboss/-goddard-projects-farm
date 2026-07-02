'use client';

import { useState } from 'react';
import { createVotingRound, toggleVotingRound, addCrop, removeCrop } from '@/app/actions/admin/voting';

interface CropData { id: string; name: string; photoUrl: string | null; _count: { votes: number }; }
interface RoundData { id: string; title: string; description: string | null; isActive: boolean; startDate: string; endDate: string | null; crops: CropData[]; }
interface Props { rounds: RoundData[]; }

export function VotingManager({ rounds }: Props) {
  const [showNewRound, setShowNewRound] = useState(false);
  const [newCropNames, setNewCropNames] = useState<string[]>(['']);
  const [addCropRoundId, setAddCropRoundId] = useState<string | null>(null);
  const [newCropName, setNewCropName] = useState('');
  const [createError, setCreateError] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  async function handleCreateRound(formData: FormData) {
    setIsPending(true);
    setCreateError(undefined);
    const result = await createVotingRound(null, formData);
    if (!result.success) setCreateError(result.error);
    setIsPending(false);
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-xl text-harvest-gold">Voting Manager</h2>
        <button onClick={() => setShowNewRound(!showNewRound)} className="px-4 py-2 bg-forest-canopy text-white text-sm rounded-lg hover:bg-forest-canopy/80">
          {showNewRound ? 'Cancel' : 'New Round'}
        </button>
      </div>

      {showNewRound && (
        <form action={handleCreateRound} className="mb-6 p-4 bg-subtle-earth rounded-lg space-y-3">
          <input name="title" placeholder="Round title" required className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <input name="description" placeholder="Description (optional)" className="w-full px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
          <div className="space-y-2">
            <p className="text-xs text-dusty-clay">Crops</p>
            {newCropNames.map((name, i) => (
              <div key={i} className="flex gap-2">
                <input name="cropNames" value={name} onChange={(e) => { const n = [...newCropNames]; n[i] = e.target.value; setNewCropNames(n); }}
                  placeholder={`Crop ${i + 1} name`} className="flex-1 px-3 py-2 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream" />
                {newCropNames.length > 1 && <button type="button" onClick={() => setNewCropNames(newCropNames.filter((_, j) => j !== i))} className="text-red-400 px-2">{'\u2715'}</button>}
              </div>
            ))}
            <button type="button" onClick={() => setNewCropNames([...newCropNames, ''])} className="text-xs text-harvest-gold hover:underline">+ Add Crop</button>
          </div>
          <button type="submit" disabled={isPending} className="px-4 py-2 bg-harvest-gold text-deep-earth font-semibold rounded-lg">Create Round</button>
          {createError && <p className="text-red-400 text-sm">{createError}</p>}
        </form>
      )}

      <div className="space-y-6">
        {rounds.map((round) => {
          const totalVotes = round.crops.reduce((s, c) => s + c._count.votes, 0);
          return (
            <div key={round.id} className="border border-subtle-earth rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-warm-cream font-semibold">{round.title}</h3>
                  <p className="text-dusty-clay text-xs">
                    Since {new Date(round.startDate).toLocaleDateString('en-ZA')}
                    {round.endDate ? ` \u2192 ${new Date(round.endDate).toLocaleDateString('en-ZA')}` : ' (no end date)'}
                    {' \u2022 '}{totalVotes} total votes
                  </p>
                </div>
                <button onClick={() => toggleVotingRound(round.id, !round.isActive)}
                  className={`text-xs px-3 py-1 rounded-full ${round.isActive ? 'bg-forest-canopy/20 text-forest-canopy' : 'bg-dusty-clay/20 text-dusty-clay'}`}>
                  {round.isActive ? 'Close Round' : 'Reopen Round'}
                </button>
              </div>
              {round.isActive && (
                <div className="space-y-2 mb-3">
                  {round.crops.map((crop) => (
                    <div key={crop.id} className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-sm text-warm-cream">{crop.name}</span>
                        <span className="text-xs text-harvest-gold">{crop._count.votes}</span>
                      </div>
                      <button onClick={() => removeCrop(crop.id)} className="text-xs text-red-400 hover:underline">{'\u2715'}</button>
                    </div>
                  ))}
                </div>
              )}
              {round.isActive && (
                <div className="flex gap-2 mt-3">
                  {addCropRoundId === round.id ? (
                    <>
                      <input value={newCropName} onChange={(e) => setNewCropName(e.target.value)} placeholder="New crop name"
                        className="flex-1 px-3 py-1.5 bg-deep-earth border border-dusty-clay/20 rounded text-warm-cream text-sm" />
                      <button onClick={() => { if (newCropName.trim()) { addCrop(round.id, newCropName); setNewCropName(''); setAddCropRoundId(null); } }}
                        className="px-3 py-1.5 bg-harvest-gold text-deep-earth text-xs rounded-lg font-semibold">Add</button>
                      <button onClick={() => setAddCropRoundId(null)} className="text-xs text-dusty-clay">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setAddCropRoundId(round.id)} className="text-xs text-harvest-gold hover:underline">+ Add Crop</button>
                  )}
                </div>
              )}
              {!round.isActive && <p className="text-dusty-clay text-xs">This round is closed.</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
