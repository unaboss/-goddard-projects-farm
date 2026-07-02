"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-dusty-clay hover:text-warm-cream transition-colors"
    >
      Logout
    </button>
  );
}
