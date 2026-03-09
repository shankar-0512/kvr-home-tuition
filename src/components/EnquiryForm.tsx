"use client";

import { useMemo, useState } from "react";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const canSubmit = useMemo(() => status !== "sending", [status]);

  const phone = "918668194510";
  const waHref = `https://wa.me/${phone}?text=${encodeURIComponent("Hi! I just submitted an enquiry and wanted to follow up.")}`;

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

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">Enquiry received!</h3>
        <p className="mt-1 text-sm text-slate-600">
          We'll call you within 24 hours. Meanwhile, feel free to reach us on WhatsApp.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-5 w-5" aria-hidden="true">
            <path d="M19.11 17.19c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.47-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.11 3.23 5.11 4.53.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.72-.7 1.97-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35zM16.03 3C9.42 3 4 8.42 4 15.03c0 2.64.87 5.08 2.34 7.05L5 29l7.1-1.87c1.9 1.04 4.08 1.64 6.38 1.64 6.61 0 12.03-5.42 12.03-12.03C30.51 8.42 22.64 3 16.03 3z" />
          </svg>
          Chat on WhatsApp
        </a>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 text-xs text-slate-500 underline underline-offset-4 hover:text-slate-700"
        >
          Submit another enquiry
        </button>
      </div>
    );
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

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or message on WhatsApp.
        </p>
      )}
    </form>
  );
}
