import { prisma } from "@/lib/prisma";
import { VotingPanel } from "@/components/admin/VotingPanel";

export default async function VotingPanelWrapper() {
  return <VotingPanel />;
}
