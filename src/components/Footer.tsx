import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy-deep pb-20 text-white md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="text-xl font-bold">KVR Brain Point</div>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Home tuition in Chennai and online coaching across Tamil Nadu
            for Classes 1–12 - concept clarity, regular practice, and weekly feedback
            for parents.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-widest text-orange uppercase">Explore</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link className="hover:text-white" href="/#subjects">Subjects</Link></li>
            <li><Link className="hover:text-white" href="/#how">How it works</Link></li>
            <li><Link className="hover:text-white" href="/#videos">Videos</Link></li>
            <li><Link className="hover:text-white" href="/#faq">FAQ</Link></li>
            <li><Link className="hover:text-white" href="/#contact">Enquiry</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-widest text-orange uppercase">Contact</div>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <div>+91 8668194510</div>
            <div>kvrchennaihometuition@gmail.com</div>
            <a
              className="block hover:text-white"
              href="https://www.youtube.com/@Kvr_brain_point"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
            <Link className="block underline underline-offset-4 hover:text-white" href="/admin">Admin</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} KVR Brain Point
      </div>
    </footer>
  );
}
