import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";
const COOKIE_VALUE = "admin.session";

export async function getAdminFromCookies(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === COOKIE_VALUE;
}

export function getAdminCookieOptions() {
  return {
    name: COOKIE_NAME,
    value: COOKIE_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24,
  };
}
