"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

interface ActionResult {
  success: boolean;
  error?: string;
}

async function guard(): Promise<boolean> {
  return await getAdminFromCookies();
}

export async function markMessageAsRead(
  messageId: string
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: "Unauthorized" };

  try {
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update message." };
  }
}
