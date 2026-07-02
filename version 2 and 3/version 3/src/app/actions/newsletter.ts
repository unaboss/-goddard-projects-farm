'use server';

import { prisma } from '@/lib/prisma';

export async function subscribeEmail(email: string): Promise<{ success: boolean; error?: string; isDuplicate?: boolean }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Valid email required.' };

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      if (existing.status === 'Active') return { success: false, isDuplicate: true, error: 'Already subscribed.' };
      await prisma.subscriber.update({ where: { email }, data: { status: 'Active' } });
      return { success: true };
    }

    await prisma.subscriber.create({ data: { email } });
    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong.' };
  }
}
