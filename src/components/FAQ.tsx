"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Do you offer a trial session?",
    a: "Yes — we offer a free introductory call to understand the student's level and discuss a plan. Sessions begin after that.",
  },
  {
    q: "What are the fees?",
    a: "Fees depend on the class, subject, and online/offline mode. Please enquire and we'll share the details directly.",
  },
  {
    q: "Which boards do you teach?",
    a: "We teach State Board, CBSE, and ICSE for Classes 1–12.",
  },
  {
    q: "What are the available timings?",
    a: "Sessions can be scheduled between 6:00 AM and 9:00 PM, 7 days a week. We work around the student's school schedule.",
  },
  {
    q: "How are online classes conducted?",
    a: "Via Google Meet or Zoom with screen sharing, digital notes, and regular practice sheets sent over WhatsApp.",
  },
  {
    q: "Is it one-on-one or a group class?",
    a: "Primarily 1-on-1 for focused attention. Small groups (2–3 students) are available for online classes.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t bg-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        <p className="mt-2 text-slate-600">Quick answers to common questions.</p>

        <div className="mt-6 space-y-2">
          {FAQS.map((item, i) => (
            <div key={i} className="rounded-2xl border bg-slate-50 overflow-hidden">
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-100"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-slate-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
