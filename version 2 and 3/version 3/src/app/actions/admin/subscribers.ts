'use server';

import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

export async function exportSubscribers(): Promise<{ success: boolean; error?: string; csv?: string }> {
  if (!(await getAdminFromCookies())) return { success: false, error: 'Unauthorized' };
  try {
    const subscribers = await prisma.subscriber.findMany({ where: { status: 'Active' }, orderBy: { subscribedAt: 'desc' } });
    const header = 'email,status,subscribedAt';
    const rows = subscribers.map((s) => `"${s.email}","${s.status}","${s.subscribedAt.toISOString()}"`);
    return { success: true, csv: [header, ...rows].join('\n') };
  } catch { return { success: false, error: 'Failed to export subscribers.' }; }
}
