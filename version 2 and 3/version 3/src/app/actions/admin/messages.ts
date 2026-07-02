'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

async function guard() { return await getAdminFromCookies(); }

export async function markMessageAsRead(messageId: string): Promise<{ success: boolean; error?: string }> {
  if (!(await guard())) return { success: false, error: 'Unauthorized' };
  try { await prisma.contactMessage.update({ where: { id: messageId }, data: { isRead: true } }); revalidatePath('/admin'); return { success: true }; }
  catch { return { success: false, error: 'Failed to update message.' }; }
}
