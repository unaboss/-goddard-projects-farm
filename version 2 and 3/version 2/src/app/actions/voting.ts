"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SubmitVoteInput {
  email: string;
  votingRoundId: string;
  cropIds: string[];
}

export async function submitVote(
  input: SubmitVoteInput
): Promise<{ success: boolean; error?: string; votesCast?: number }> {
  const { email, votingRoundId, cropIds } = input;

  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    return { success: false, error: "Valid email required." };
  if (!cropIds || cropIds.length === 0)
    return { success: false, error: "Select at least one crop." };
  if (!votingRoundId)
    return { success: false, error: "No active voting round." };

  const alreadyVoted = await prisma.vote.findFirst({
    where: { email, votingRoundId },
  });
  if (alreadyVoted)
    return { success: false, error: "You have already voted this round." };

  try {
    await prisma.$transaction(
      cropIds.map((cropId) =>
        prisma.vote.create({
          data: { email, votingRoundId, votingCropId: cropId },
        })
      )
    );
    revalidatePath("/contact");
    return { success: true, votesCast: cropIds.length };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
