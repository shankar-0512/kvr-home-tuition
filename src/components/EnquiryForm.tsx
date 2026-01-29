"use client";

import { useMemo, useState } from "react";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const canSubmit = useMemo(() => status !== "sending", [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        parentEmail: String(formData.get("parentEmail") ?? ""),

        class: String(formData.get("class") ?? ""),
        board: String(formData.get("board") ?? ""),
        mode: String(formData.get("mode") ?? ""),

        subject: String(formData.get("subject") ?? ""),
        location: String(formData.get("location") ?? ""),
        message: String(formData.get("message") ?? ""),
    };

    const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        setStatus("error");
        return;
    }

    form.reset();
    setStatus("sent");
    } catch {
    setStatus("error");
    }

  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          name="name"
          required
          className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Your name"
        />
        <input
          name="phone"
          required
          className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="Phone / WhatsApp"
        />
        <input
          name="parentEmail"
          type="email"
          className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200 md:col-span-2"
          placeholder="Parent email (optional)"
          />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <select
            name="class"
            required
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
        >
            <option value="">Class / Std</option>
            <option>Class 1–5</option>
            <option>Class 6–8</option>
            <option>Class 9–10</option>
            <option>Class 11–12</option>
        </select>

        <select
            name="board"
            required
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
        >
            <option value="">Select board</option>
            <option>State Board</option>
            <option>CBSE</option>
            <option>ICSE</option>
        </select>

        <select
            name="mode"
            required
            className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
        >
            <option value="">Online or Offline?</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Either (Online or Offline)</option>
        </select>
        </div>

      <input
        name="subject"
        className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Subject (e.g., Physics / Maths)"
      />

      <input
        name="location"
        className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Location (if offline)"
      />

      <textarea
        name="message"
        rows={4}
        className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        placeholder="Any details (syllabus, exam, preferred timing, etc.)"
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-xl bg-[#1F3A5F] px-4 py-3 text-sm font-semibold text-white hover:brightness-95 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-slate-700">
          Thanks! We’ll contact you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or message on WhatsApp.
        </p>
      )}
    </form>
  );
}
