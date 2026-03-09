"use client";

import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b bg-white shadow-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            <a href="#subjects" onClick={close} className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border-b">Subjects</a>
            <a href="#how"      onClick={close} className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border-b">How it works</a>
            <a href="#faq"      onClick={close} className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 border-b">FAQ</a>
            <a href="#contact"  onClick={close} className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900">Enquiry</a>
          </nav>
        </div>
      )}
    </>
  );
}
