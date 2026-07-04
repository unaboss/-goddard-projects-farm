import { prisma } from "@/lib/prisma";
import { VotingBallot } from "@/components/contact/VotingBallot";

export default async function VotingSection() {
  const activeRound = await prisma.votingRound.findFirst({
    where: { isActive: true },
    include: {
      crops: {
        orderBy: { name: "asc" },
        include: { _count: { select: { votes: true } } },
      },
    },
  });

  if (!activeRound) {
    return (
      <div className="bg-rich-soil rounded-lg p-6 border border-subtle-earth">
        <h2 className="font-heading text-xl text-harvest-gold mb-4">
          What&apos;s Growing This Season?
        </h2>
        <p className="text-dusty-clay text-sm">
          No active voting round right now. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-rich-soil rounded-lg p-6 border border-subtle-earth">
      <h2 className="font-heading text-xl text-harvest-gold mb-2">
        What&apos;s Growing This Season?
      </h2>
      <p className="text-dusty-clay text-sm mb-4">
        Help us decide what to plant next! Select your favourites below.
      </p>
      <VotingBallot
        crops={activeRound.crops}
        votingRoundId={activeRound.id}
      />
    </div>
  );
}
