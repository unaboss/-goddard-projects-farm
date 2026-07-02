'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult { success: boolean; error?: string; roundId?: string; cropId?: string; }
async function guard() { return await getAdminFromCookies(); }

export async function createVotingRound(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  const title = formData.get('title')?.toString().trim();
  const description = formData.get('description')?.toString().trim() || null;
  const cropNames = formData.getAll('cropNames').map((c) => c.toString().trim()).filter(Boolean);
  if (!title) return { success: false, error: 'Round title is required.' };
  if (cropNames.length === 0) return { success: false, error: 'Add at least one crop.' };
  try {
    await prisma.votingRound.updateMany({ where: { isActive: true }, data: { isActive: false } });
    const round = await prisma.votingRound.create({ data: { title, description, isActive: true, crops: { create: cropNames.map((name) => ({ name })) } } });
    revalidatePath('/admin'); revalidatePath('/contact');
    return { success: true, roundId: round.id };
  } catch { return { success: false, error: 'Failed to create voting round.' }; }
}

export async function toggleVotingRound(roundId: string, setActive: boolean): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  try {
    if (setActive) await prisma.votingRound.updateMany({ where: { isActive: true }, data: { isActive: false } });
    await prisma.votingRound.update({ where: { id: roundId }, data: { isActive: setActive } });
    revalidatePath('/admin'); revalidatePath('/contact');
    return { success: true };
  } catch { return { success: false, error: 'Failed to update round.' }; }
}

export async function addCrop(roundId: string, name: string, photoUrl?: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  if (!name.trim()) return { success: false, error: 'Crop name is required.' };
  try {
    const crop = await prisma.votingCrop.create({ data: { votingRoundId: roundId, name: name.trim(), photoUrl: photoUrl || null } });
    revalidatePath('/admin'); revalidatePath('/contact');
    return { success: true, cropId: crop.id };
  } catch { return { success: false, error: 'Failed to add crop.' }; }
}

export async function removeCrop(cropId: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  try { await prisma.votingCrop.delete({ where: { id: cropId } }); revalidatePath('/admin'); revalidatePath('/contact'); return { success: true }; }
  catch { return { success: false, error: 'Failed to remove crop.' }; }
}
