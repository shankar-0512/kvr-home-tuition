"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteEnquiryButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete enquiry.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs font-semibold text-red-600 underline underline-offset-4 hover:opacity-80 disabled:opacity-40"
    >
      {loading ? "Deleting…" : "Delete"}
    </button>
  );
}
