import { prisma } from '@/lib/prisma';
import { VotingBallot } from '@/components/contact/VotingBallot';

export async function VotingSection() {
  const activeRound = await prisma.votingRound.findFirst({
    where: { isActive: true },
    include: {
      crops: {
        orderBy: { name: 'asc' },
        include: { _count: { select: { votes: true } } },
      },
    },
  });

  if (!activeRound) return <p className="text-dusty-clay text-sm">No active voting round right now. Check back soon!</p>;

  return <VotingBallot crops={activeRound.crops} votingRoundId={activeRound.id} />;
}
