import { Testimonials } from "./Testimonials";
import { EnquiryFormClientOnly } from "./EnquiryFormClientOnly";


export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Testimonials />
        <Sections />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-[60] w-full bg-[#1F3A5F] text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-4 py-2 text-sm">
        <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
          Admissions Open
        </span>

        <div className="relative flex-1 overflow-hidden">
          <div className="whitespace-nowrap will-change-transform motion-reduce:animate-none animate-marquee">
            <span className="mr-10">
              Admissions open for 2026/27 academic year • Limited slots available •
              Home Tuition (Chennai) & Online • Weekly feedback
            </span>
            <span className="mr-10">
              Admissions open for 2026/27 academic year • Limited slots available •
              Home Tuition (Chennai) & Online • Weekly feedback
            </span>
          </div>
        </div>

        <a
          href="#contact"
          className="shrink-0 rounded-full bg-[#F28C28] px-3 py-1 text-xs font-semibold hover:brightness-95"
        >
          Enquire
        </a>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-10 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="KVR Brain Point logo"
            className="h-14 w-auto"
          />
          <div className="leading-tight">
            <div className="font-semibold">KVR Brain Point</div>
            <div className="text-xs text-slate-500">Home Tuition & Online Coaching</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a className="text-slate-600 hover:text-slate-900" href="#subjects">Subjects</a>
          <a className="text-slate-600 hover:text-slate-900" href="#how">How it works</a>
          <a className="text-slate-600 hover:text-slate-900" href="#contact">Enquiry</a>
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex rounded-xl bg-[#1F3A5F] px-4 py-2 text-sm font-medium text-white hover:brightness-95"
        >
          Get a call back
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-8 pb-10 md:pt-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-slate-600">
            Personal coaching • Doubt clearing • Weekly practice
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Home tuition that builds confidence — not just marks.
          </h1>

          <p className="mt-4 text-slate-600">
            Clear explanations, regular practice, and a simple study plan. Available as online classes
            or offline home visits (Chennai).
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-xl bg-[#1F3A5F] px-5 py-3 text-sm font-medium text-white hover:brightness-95"
            >
              Enquire now
            </a>
            <a
              href="#subjects"
              className="rounded-xl border px-5 py-3 text-sm font-medium text-slate-700 hover:bg-[#1F3A5F]/10"
            >
              View subjects
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600 md:grid-cols-3">
            <Stat title="1–1 or small group" value="Flexible" />
            <Stat title="Online / Offline" value="Both" />
            <Stat title="Weekly feedback" value="Parents" />
          </div>
        </div>

        <div className="rounded-3xl border bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Academic Head</h2>

          <div className="mt-4 flex items-start gap-4">
            <img
              src="/varshan.jpeg"
              alt="Varshan – Tutor"
              className="h-24 w-24 rounded-2xl object-cover border-2 border-[#1F3A5F]"
            />

            <div className="text-sm text-slate-700">
              <div className="font-semibold text-base">Varshan</div>
              <div className="text-slate-600">
                M.Sc. Physics • Currently pursuing B.Ed.
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-600">
            An experienced home tutor focused on building strong foundations,
            confidence, and steady academic improvement.
          </p>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div>
              <span className="font-semibold">Experience:</span>{" "}
              Over 6 years of teaching school students
            </div>

            <div>
              <span className="font-semibold">Boards taught:</span>{" "}
              State Board, CBSE, ICSE
            </div>

          </div>

          <div className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            Individual attention • Structured learning • Consistent results
          </div>

        </div>
      </div>
    </section>
  );
}

function Stat(props: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-3">
      <div className="text-xs text-slate-500">{props.title}</div>
      <div className="mt-1 font-semibold">{props.value}</div>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 py-8 md:grid-cols-3">
        <TrustCard
          title="Concept clarity"
          desc="Simple explanations + step-by-step practice."
        />
        <TrustCard
          title="Regular practice"
          desc="Weekly tests and targeted revision."
        />
        <TrustCard
          title="Reliable updates"
          desc="Clear progress feedback for parents."
        />
      </div>
    </section>
  );
}

function TrustCard(props: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border bg-slate-50 p-6">
      <div className="font-semibold">{props.title}</div>
      <div className="mt-2 text-sm text-slate-600">{props.desc}</div>
    </div>
  );
}

function Sections() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div id="subjects" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Subjects & Classes</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card
            title="Classes 1–10 (All Subjects)"
            items={[
              "Maths, Science, English and more",
              "Strong fundamentals",
              "Exam-focused preparation",
            ]}
          />
          <Card
            title="Classes 11–12"
            items={[
              "Physics",
              "Computer Science",
              "Board exam & concept-focused coaching",
            ]}
          />
        </div>
      </div>

      <div id="how" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Step n="1" title="Enquire" desc="Tell us class, subject, and online/offline preference." />
          <Step n="2" title="Free call" desc="We understand the student level and suggest a plan." />
          <Step n="3" title="Start sessions" desc="Fixed schedule, practice, and regular updates." />
        </div>
      </div>
    </section>
  );
}

function Card(props: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="text-lg font-semibold">{props.title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {props.items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#F28C28]" aria-hidden="true" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Step(props: { n: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border bg-slate-50 p-6">
      <div className="text-sm font-semibold text-slate-900">Step {props.n}</div>
      <div className="mt-2 text-lg font-semibold">{props.title}</div>
      <div className="mt-2 text-sm text-slate-600">{props.desc}</div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Enquiry</h2>
          <p className="mt-2 text-slate-600">
            Share what you need and we’ll contact you soon.
          </p>

          <div className="mt-6 rounded-3xl border bg-slate-50 p-6">
            <EnquiryFormClientOnly />
          </div>

          <div className="mt-6 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Contact</div>
            <div className="mt-1">Phone: +91 8668194510</div>
            <div>Email: kvrchennaihometuition@gmail.com</div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Online & Offline</h3>
          <p className="mt-2 text-sm text-slate-600">
            Online classes via Google Meet/Zoom with screen sharing and notes.
            Offline home visits depend on location and availability.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Areas covered (offline)</div>
            <div className="mt-1">Chennai</div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Timings</div>
            <div className="mt-1">6:00 AM – 9:00 PM (7 days a week)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} KVR Brain Point</div>
        <div className="flex gap-4">
          <a className="hover:text-slate-900" href="#subjects">Subjects</a>
          <a className="hover:text-slate-900" href="#contact">Enquiry</a>
          <a className="hover:text-slate-900" href="/admin">Admin</a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloatingButton() {
  const phone = "918668194510";
  const message = encodeURIComponent("Hi! I want to enquire about tuition.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        flex h-14 w-14 items-center justify-center
        rounded-full bg-[#25D366]
        shadow-lg hover:brightness-95
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M19.11 17.19c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.07-.29-.15-1.24-.46-2.36-1.47-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.11 3.23 5.11 4.53.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.72-.7 1.97-1.37.24-.67.24-1.24.17-1.37-.07-.12-.27-.2-.56-.35zM16.03 3C9.42 3 4 8.42 4 15.03c0 2.64.87 5.08 2.34 7.05L5 29l7.1-1.87c1.9 1.04 4.08 1.64 6.38 1.64 6.61 0 12.03-5.42 12.03-12.03C30.51 8.42 22.64 3 16.03 3z" />
      </svg>
    </a>
  );
}