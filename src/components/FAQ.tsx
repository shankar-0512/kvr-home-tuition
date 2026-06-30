"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Do you offer a trial session?",
    a: "Yes - we offer a free introductory call to understand the student's level and discuss a plan. Sessions begin after that.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-center text-xs font-semibold tracking-widest text-orange-deep uppercase">FAQ</p>
        <h2 className="mt-3 text-center text-4xl font-black tracking-tight text-ink md:text-5xl">
          Frequently Asked Questions
        </h2>

        <Reveal className="mt-12 border-t border-ink/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={i} className="border-b border-ink/10">
                <h3>
                  <button
                    id={buttonId}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-ink hover:text-navy"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span>{item.q}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 shrink-0 text-navy transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm text-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
