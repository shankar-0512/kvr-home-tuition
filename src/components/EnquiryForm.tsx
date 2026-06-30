"use client";

import { useMemo, useState } from "react";
import { WhatsAppIcon } from "./icons";

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
        <h3 className="mt-4 text-lg font-bold text-ink">Enquiry received!</h3>
        <p className="mt-1 text-sm text-muted">
          We&apos;ll call you within 24 hours. Meanwhile, feel free to reach us on WhatsApp.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-95"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Chat on WhatsApp
        </a>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 text-xs text-muted underline underline-offset-4 hover:text-navy"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-navy/20";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <input name="name" required className={fieldClass} placeholder="Your name" />
        <input name="phone" required className={fieldClass} placeholder="Phone / WhatsApp" />
        <input
          name="parentEmail"
          type="email"
          className={`${fieldClass} md:col-span-2`}
          placeholder="Parent email (optional)"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <select name="class" required className={fieldClass} defaultValue="">
          <option value="">Class / Std</option>
          <option>Class 1–5</option>
          <option>Class 6–8</option>
          <option>Class 9–10</option>
          <option>Class 11–12</option>
        </select>

        <select name="board" required className={fieldClass} defaultValue="">
          <option value="">Select board</option>
          <option>State Board</option>
          <option>CBSE</option>
          <option>ICSE</option>
        </select>

        <select name="mode" required className={fieldClass} defaultValue="">
          <option value="">Online or Offline?</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Either (Online or Offline)</option>
        </select>
      </div>

      <input name="subject" className={fieldClass} placeholder="Subject (e.g., Physics / Maths)" />

      <input name="location" className={fieldClass} placeholder="Location (if offline)" />

      <textarea
        name="message"
        rows={4}
        className={fieldClass}
        placeholder="Any details (syllabus, exam, preferred timing, etc.)"
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-full bg-orange px-4 py-3 text-sm font-bold text-ink transition hover:brightness-105 disabled:opacity-60"
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
