"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Status = "new" | "contacted" | "enrolled" | "not_interested";

const LABELS: Record<Status, string> = {
  new: "New",
  contacted: "Contacted",
  enrolled: "Enrolled",
  not_interested: "Not interested",
};

const COLORS: Record<Status, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  enrolled: "bg-green-100 text-green-800",
  not_interested: "bg-slate-100 text-slate-600",
};

export function StatusSelect({ id, current }: { id: string; current: Status }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const status = e.target.value as Status;
    setLoading(true);
    await fetch("/api/admin/enquiries/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${COLORS[current]}`}>
        {LABELS[current]}
      </span>
      <select
        defaultValue={current}
        onChange={handleChange}
        disabled={loading}
        className="rounded-lg border border-ink/10 bg-white px-2 py-1 text-xs text-ink outline-none focus:ring-2 focus:ring-navy/20 disabled:opacity-50"
      >
        {(Object.keys(LABELS) as Status[]).map((s) => (
          <option key={s} value={s}>{LABELS[s]}</option>
        ))}
      </select>
    </div>
  );
}
