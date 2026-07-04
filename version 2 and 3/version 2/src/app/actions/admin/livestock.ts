"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

interface ActionResult {
  success: boolean;
  error?: string;
}

async function guard() {
  return await getAdminFromCookies();
}

export async function createLivestock(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: "Unauthorized" };

  const name = formData.get("name")?.toString().trim();
  const photoUrl = formData.get("photoUrl")?.toString().trim();
  const priceRange = formData.get("priceRange")?.toString().trim();
  const availabilityStatus =
    formData.get("availabilityStatus")?.toString().trim() || "Available";
  const displayOrder = parseInt(
    formData.get("displayOrder")?.toString() || "0",
    10
  );

  if (!name || !photoUrl || !priceRange) {
    return {
      success: false,
      error: "Name, photo URL, and price range are required.",
    };
  }

  try {
    await prisma.livestockItem.create({
      data: { name, photoUrl, priceRange, availabilityStatus, displayOrder },
    });
    revalidatePath("/admin");
    revalidatePath("/livestock");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create livestock item." };
  }
}

export async function updateLivestock(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: "Unauthorized" };

  const id = formData.get("id")?.toString();
  if (!id) return { success: false, error: "Missing item ID." };

  const name = formData.get("name")?.toString().trim();
  const photoUrl = formData.get("photoUrl")?.toString().trim();
  const priceRange = formData.get("priceRange")?.toString().trim();
  const availabilityStatus = formData.get("availabilityStatus")?.toString().trim();
  const displayOrder = parseInt(
    formData.get("displayOrder")?.toString() || "0",
    10
  );

  if (!name || !photoUrl || !priceRange) {
    return {
      success: false,
      error: "Name, photo URL, and price range are required.",
    };
  }

  try {
    await prisma.livestockItem.update({
      where: { id },
      data: { name, photoUrl, priceRange, availabilityStatus, displayOrder },
    });
    revalidatePath("/admin");
    revalidatePath("/livestock");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update livestock item." };
  }
}

export async function deleteLivestock(id: string): Promise<ActionResult> {
  if (!(await guard())) return { success: false, error: "Unauthorized" };

  try {
    await prisma.livestockItem.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/livestock");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete livestock item." };
  }
}
