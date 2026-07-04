'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContact(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string || null;
  const message = formData.get('message') as string;

  if (!name || !name.trim()) return { success: false, error: 'Name is required.' };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Valid email required.' };
  if (!message || !message.trim()) return { success: false, error: 'Message is required.' };

  try {
    await prisma.contactMessage.create({
      data: { name: name.trim(), email: email.trim(), phone: phone?.trim() || null, message: message.trim() },
    });
    revalidatePath('/contact');
    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
