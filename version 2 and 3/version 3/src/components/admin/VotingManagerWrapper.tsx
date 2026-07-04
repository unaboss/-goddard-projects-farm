import { prisma } from '@/lib/prisma';
import { VotingManager } from '@/components/admin/VotingManager';

export async function VotingManagerWrapper() {
  const rounds = await prisma.votingRound.findMany({
    include: { crops: { include: { _count: { select: { votes: true } } }, orderBy: { name: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  });
  return <VotingManager rounds={JSON.parse(JSON.stringify(rounds))} />;
}
