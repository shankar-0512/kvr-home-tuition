"use client";

import { useEffect } from "react";

// "top" is the Hero - when it's the active region, the hash is cleared instead of set.
const SECTION_IDS = ["top", "subjects", "how", "videos", "faq", "contact"];

export function ScrollSpy() {
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    // Tracks every section currently intersecting the activation band, across
    // observer firings - not just whichever changed in the latest batch.
    const intersecting = new Map<Element, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.set(entry.target, entry);
          } else {
            intersecting.delete(entry.target);
          }
        }

        if (intersecting.size === 0) return;

        // Among currently-intersecting sections, the one furthest down the page
        // (largest top, i.e. most recently scrolled into the band) is "current".
        const current = [...intersecting.values()].reduce((a, b) =>
          a.boundingClientRect.top > b.boundingClientRect.top ? a : b
        );

        const id = current.target.id;
        const hash = id === "top" ? "" : `#${id}`;
        const url = window.location.pathname + window.location.search + hash;

        if (window.location.hash !== hash) {
          history.replaceState(null, "", url);
        }
      },
      {
        // A thin band just below the sticky header, near the top of the viewport.
        rootMargin: `-${headerHeight + 8}px 0px -70% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
