import { prisma } from "@/lib/prisma";

export async function VotingPanel() {
  const activeRound = await prisma.votingRound.findFirst({
    where: { isActive: true },
    include: {
      crops: {
        include: {
          _count: { select: { votes: true } },
        },
        orderBy: { name: "asc" },
      },
    },
  });

  if (!activeRound) {
    return (
      <div className="bg-rich-soil rounded-lg p-6">
        <h2 className="font-heading text-xl text-harvest-gold mb-4">
          Voting — Current Round
        </h2>
        <p className="text-dusty-clay text-sm">No active voting round.</p>
      </div>
    );
  }

  const totalVotes = activeRound.crops.reduce(
    (sum, crop) => sum + crop._count.votes,
    0
  );

  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-1">
        Voting — Current Round
      </h2>
      <p className="text-warm-cream font-semibold mb-1">{activeRound.title}</p>
      <p className="text-xs text-dusty-clay mb-4">
        Since {new Date(activeRound.startDate).toLocaleDateString("en-ZA")}
        {activeRound.endDate
          ? ` \u2192 ${new Date(activeRound.endDate).toLocaleDateString("en-ZA")}`
          : " (no end date)"}
      </p>

      <div className="space-y-3">
        {activeRound.crops.map((crop) => {
          const maxVotes = Math.max(
            ...activeRound.crops.map((c) => c._count.votes),
            1
          );
          const pct = (crop._count.votes / maxVotes) * 100;

          return (
            <div key={crop.id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-warm-cream">{crop.name}</span>
                <span className="text-harvest-gold font-semibold">
                  {crop._count.votes}
                </span>
              </div>
              <div className="w-full bg-subtle-earth rounded-full h-2">
                <div
                  className="bg-forest-canopy h-2 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-dusty-clay">
        {totalVotes} total vote{totalVotes !== 1 ? "s" : ""} across{" "}
        {activeRound.crops.length} crop
        {activeRound.crops.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
