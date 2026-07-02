"use client";

import { useState } from "react";
import { submitVote } from "@/app/actions/voting";

interface VotingCrop {
  id: string;
  name: string;
  photoUrl: string | null;
  _count: { votes: number };
}

interface Props {
  crops: VotingCrop[];
  votingRoundId: string;
}

export function VotingBallot({ crops, votingRoundId }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "voting" | "success" | "already-voted" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function toggleCrop(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error");
      setErrorMessage("Valid email required.");
      return;
    }

    if (selectedIds.size === 0) {
      setStatus("error");
      setErrorMessage("Select at least one crop.");
      return;
    }

    setStatus("voting");
    const result = await submitVote({
      email: email.trim().toLowerCase(),
      votingRoundId,
      cropIds: Array.from(selectedIds),
    });

    if (result.success) {
      setStatus("success");
    } else if (result.error?.includes("already voted")) {
      setStatus("already-voted");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-forest-canopy/10 border border-forest-canopy rounded-lg px-6 py-4 text-forest-canopy text-sm">
        Thanks for voting! Your response has been recorded.
      </div>
    );
  }

  if (status === "already-voted") {
    return (
      <div className="bg-forest-canopy/10 border border-forest-canopy rounded-lg px-6 py-4 text-forest-canopy text-sm">
        You&apos;ve already voted this round. Thanks for participating!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {crops.map((crop) => (
          <label
            key={crop.id}
            className="flex items-center gap-3 bg-subtle-earth rounded-lg px-4 py-3 cursor-pointer hover:bg-subtle-earth/80 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedIds.has(crop.id)}
              onChange={() => toggleCrop(crop.id)}
              className="appearance-none w-5 h-5 border-2 border-harvest-gold rounded checked:bg-harvest-gold checked:border-harvest-gold cursor-pointer"
            />
            <span className="font-body text-warm-cream flex-1">{crop.name}</span>
            <span className="bg-rich-soil text-dusty-clay text-xs px-2 py-0.5 rounded-full">
              {crop._count.votes} vote{crop._count.votes !== 1 ? "s" : ""}
            </span>
          </label>
        ))}
      </div>

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email to vote"
          required
          className="w-full bg-rich-soil border border-subtle-earth rounded-lg px-4 py-3 text-warm-cream placeholder-dusty-clay focus:outline-none focus:border-harvest-gold focus:ring-1 focus:ring-harvest-gold transition-colors"
        />
      </div>

      {status === "error" && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "voting"}
        className="w-full py-3 bg-harvest-gold text-deep-earth font-semibold rounded-lg hover:bg-harvest-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "voting" ? "Voting..." : "Cast Vote"}
      </button>
    </form>
  );
}
