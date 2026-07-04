'use client';

import { useState } from 'react';
import { submitVote } from '@/app/actions/voting';

interface Crop { id: string; name: string; photoUrl: string | null; _count: { votes: number }; }
interface Props { crops: Crop[]; votingRoundId: string; }

export function VotingBallot({ crops, votingRoundId }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'voting' | 'already-voted' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [voteCounts, setVoteCounts] = useState(crops.map((c) => c._count.votes));

  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('error'); setErrorMessage('Valid email required.'); return; }
    if (selectedIds.size === 0) { setStatus('error'); setErrorMessage('Select at least one crop.'); return; }

    setStatus('voting');
    const result = await submitVote({ email: email.trim(), votingRoundId, cropIds: Array.from(selectedIds) });

    if (result.success) {
      setStatus('success');
      setVoteCounts((prev) => prev.map((c, i) => selectedIds.has(crops[i].id) ? c + 1 : c));
    } else if (result.error === 'You have already voted this round.') {
      setStatus('already-voted');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong.');
    }
  }

  return (
    <div>
      {status === 'success' && <div className="bg-forest-canopy/10 border border-forest-canopy/30 rounded-lg px-4 py-3 text-forest-canopy text-sm mb-4">Thanks for voting! Here are the current results.</div>}
      {status === 'already-voted' && <div className="bg-harvest-gold/10 border border-harvest-gold/30 rounded-lg px-4 py-3 text-harvest-gold text-sm mb-4">You have already voted this round. Thanks for participating!</div>}
      {status === 'error' && <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">{errorMessage}</div>}

      <div className="space-y-3 mb-4">
        {crops.map((crop, i) => (
          <label key={crop.id} className="flex items-center gap-3 p-3 bg-rich-soil rounded-lg cursor-pointer hover:bg-subtle-earth/50 transition-colors">
            <input type="checkbox" checked={selectedIds.has(crop.id)} onChange={() => toggle(crop.id)} disabled={status === 'success' || status === 'already-voted'}
              className="appearance-none w-5 h-5 border-2 border-harvest-gold rounded checked:bg-harvest-gold checked:border-harvest-gold cursor-pointer" />
            <span className="flex-1 text-warm-cream text-sm">{crop.name}</span>
            <span className="bg-rich-soil text-dusty-clay text-xs px-2 py-0.5 rounded-full">{voteCounts[i]} vote{voteCounts[i] !== 1 ? 's' : ''}</span>
          </label>
        ))}
      </div>

      {status !== 'success' && status !== 'already-voted' && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
            className="flex-1 bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors" />
          <button type="submit" disabled={status === 'voting'} className="px-6 py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 whitespace-nowrap">
            {status === 'voting' ? 'Voting...' : 'Cast Vote'}
          </button>
        </form>
      )}
    </div>
  );
}
