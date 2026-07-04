"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getAdminCookieOptions } from "@/lib/auth";

interface AuthResult {
  success: boolean;
  error?: string;
}

export async function authenticateAdmin(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  if (user.passwordHash !== password) {
    return { success: false, error: "Invalid email or password." };
  }

  const cookieStore = await cookies();
  const opts = getAdminCookieOptions();
  cookieStore.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });

  return { success: true };
}
