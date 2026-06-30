"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        className="relative z-50 rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
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

      <button
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="mobile-nav-panel"
        inert={!open}
        className={`absolute left-0 right-0 top-full z-50 origin-top border-b border-white/10 bg-navy-deep shadow-md transition-all duration-200 ease-out motion-reduce:transition-none md:hidden ${
          open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          <Link href="/#subjects" onClick={close} className="border-b border-white/10 py-3 text-sm font-medium text-white/80 hover:text-orange">Subjects</Link>
          <Link href="/#how"      onClick={close} className="border-b border-white/10 py-3 text-sm font-medium text-white/80 hover:text-orange">How it works</Link>
          <Link href="/#videos"  onClick={close} className="border-b border-white/10 py-3 text-sm font-medium text-white/80 hover:text-orange">Videos</Link>
          <Link href="/#faq"     onClick={close} className="border-b border-white/10 py-3 text-sm font-medium text-white/80 hover:text-orange">FAQ</Link>
          <Link href="/#contact" onClick={close} className="py-3 text-sm font-medium text-white/80 hover:text-orange">Enquiry</Link>
        </nav>
      </div>
    </>
  );
}
