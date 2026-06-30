"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pin }),
    });

    if (!res.ok) {
      if (res.status === 429) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Invalid PIN");
      }
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="sticky top-0 z-[60] w-full bg-navy-deep text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-bold">KVR Brain Point</div>
          <Link
            href="/"
            className="text-sm underline underline-offset-4 hover:text-orange"
          >
            Back to site
          </Link>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
        >
          <h1 className="text-xl font-bold text-ink">Admin Login</h1>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full rounded-xl border border-ink/10 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-navy/20"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-orange px-4 py-3 text-sm font-bold text-ink transition hover:brightness-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
