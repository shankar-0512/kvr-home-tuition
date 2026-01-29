// src/components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      // Always leave admin area
      router.replace("/admin");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm underline underline-offset-4 hover:opacity-90"
    >
      Logout
    </button>
  );
}