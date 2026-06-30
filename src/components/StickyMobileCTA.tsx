"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyMobileCTA() {
  // Visible by default. Only the homepage Hero (#top) has its own "Enquire now"
  // button, so that's the only section this bar should hide behind.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-white px-4 py-3 transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/#contact"
        className="flex w-full items-center justify-center rounded-full bg-orange px-4 py-3 text-sm font-bold text-ink"
      >
        Enquire now →
      </Link>
    </div>
  );
}
