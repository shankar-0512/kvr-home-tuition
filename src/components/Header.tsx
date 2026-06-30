import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy-deep">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="KVR Brain Point logo"
            width={640}
            height={640}
            priority
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="leading-tight">
            <div className="text-base font-bold text-white">KVR Brain Point</div>
            <div className="text-xs text-white/50">Home Tuition &amp; Online Coaching</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <Link className="hover:text-white" href="/#subjects">Subjects</Link>
          <Link className="hover:text-white" href="/#how">How it works</Link>
          <Link className="hover:text-white" href="/#videos">Videos</Link>
          <Link className="hover:text-white" href="/#faq">FAQ</Link>
          <Link className="hover:text-white" href="/#contact">Enquiry</Link>
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-ink transition hover:brightness-105 md:inline-flex"
        >
          Get a call back
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}
