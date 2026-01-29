"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-[60] w-full bg-[#1F3A5F] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold">KVR Brain Point</div>
          <a
            href="/"
            className="text-sm underline underline-offset-4 hover:opacity-90"
          >
            Back to site
          </a>
        </div>
      </div>

      {/* Login card */}
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h1 className="text-xl font-semibold">Admin Login</h1>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-slate-200"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#1F3A5F] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
