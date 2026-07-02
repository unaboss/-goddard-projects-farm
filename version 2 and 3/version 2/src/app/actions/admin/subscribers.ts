"use server";

import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

interface ExportResult {
  success: boolean;
  error?: string;
  csv?: string;
}

export async function exportSubscribers(): Promise<ExportResult> {
  if (!(await getAdminFromCookies())) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { status: "Active" },
      orderBy: { subscribedAt: "desc" },
    });

    const header = "email,status,subscribedAt";
    const rows = subscribers.map(
      (s) => `"${s.email}","${s.status}","${s.subscribedAt.toISOString()}"`
    );
    const csv = [header, ...rows].join("\n");

    return { success: true, csv };
  } catch {
    return { success: false, error: "Failed to export subscribers." };
  }
}
