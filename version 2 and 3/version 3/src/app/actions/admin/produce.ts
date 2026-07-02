'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult { success: boolean; error?: string; }
async function guard() { return await getAdminFromCookies(); }

export async function createProduce(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const category = formData.get('category')?.toString().trim() || 'Vegetables';
  const seasonality = formData.get('seasonality')?.toString().trim() || 'Year-round';
  const inSeason = formData.get('inSeason') === 'true';
  const imageUrl = formData.get('imageUrl')?.toString().trim();
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);
  if (!name || !description || !imageUrl) return { success: false, error: 'Name, description, and image URL are required.' };
  try {
    await prisma.produceItem.create({ data: { name, description, category, seasonality, inSeason, imageUrl, displayOrder } });
    revalidatePath('/admin'); revalidatePath('/produce');
    return { success: true };
  } catch { return { success: false, error: 'Failed to create produce item.' }; }
}

export async function updateProduce(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  const id = formData.get('id')?.toString();
  if (!id) return { success: false, error: 'Missing item ID.' };
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const category = formData.get('category')?.toString().trim();
  const seasonality = formData.get('seasonality')?.toString().trim();
  const inSeason = formData.get('inSeason') === 'true';
  const imageUrl = formData.get('imageUrl')?.toString().trim();
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);
  if (!name || !description || !imageUrl) return { success: false, error: 'Name, description, and image URL are required.' };
  try {
    await prisma.produceItem.update({ where: { id }, data: { name, description, category, seasonality, inSeason, imageUrl, displayOrder } });
    revalidatePath('/admin'); revalidatePath('/produce');
    return { success: true };
  } catch { return { success: false, error: 'Failed to update produce item.' }; }
}

export async function deleteProduce(id: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  try { await prisma.produceItem.delete({ where: { id } }); revalidatePath('/admin'); revalidatePath('/produce'); return { success: true }; }
  catch { return { success: false, error: 'Failed to delete produce item.' }; }
}
