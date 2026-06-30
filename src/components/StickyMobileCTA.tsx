import Link from "next/link";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-white px-4 py-3 md:hidden">
      <Link
        href="/#contact"
        className="flex w-full items-center justify-center rounded-full bg-orange px-4 py-3 text-sm font-bold text-ink"
      >
        Enquire now →
      </Link>
    </div>
  );
}
