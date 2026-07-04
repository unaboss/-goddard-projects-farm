'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

interface ActionResult { success: boolean; error?: string; }
async function guard() { return await getAdminFromCookies(); }

export async function createPhoto(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  const url = formData.get('url')?.toString().trim();
  const alt = formData.get('alt')?.toString().trim();
  const category = formData.get('category')?.toString().trim() || null;
  const displayOrder = parseInt(formData.get('displayOrder')?.toString() || '0', 10);
  if (!url || !alt) return { success: false, error: 'URL and alt text are required.' };
  try { await prisma.galleryPhoto.create({ data: { url, alt, category, displayOrder } }); revalidatePath('/admin'); revalidatePath('/'); return { success: true }; }
  catch { return { success: false, error: 'Failed to add photo.' }; }
}

export async function deletePhoto(id: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  try { await prisma.galleryPhoto.delete({ where: { id } }); revalidatePath('/admin'); revalidatePath('/'); return { success: true }; }
  catch { return { success: false, error: 'Failed to delete photo.' }; }
}
