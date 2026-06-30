import Image from "next/image";
import { Testimonials } from "./Testimonials";
import { EnquiryForm } from "./EnquiryForm";
import { FAQ } from "./FAQ";
import { YouTubeTeaser } from "./YouTubeTeaser";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { ScrollSpy } from "./ScrollSpy";
import { Reveal } from "./Reveal";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <ScrollSpy />
      <Header />
      <main>
        <Hero />
        <Programme />
        <HowItWorks />
        <Testimonials />
        <YouTubeTeaser />
        <FAQ />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="clip-diagonal-down relative bg-gradient-to-br from-navy-deep via-navy to-orange pb-32 pt-16 md:pt-20">
      <div className="mx-auto max-w-6xl px-4">
        <span className="animate-fade-in-up inline-flex items-center rounded-full bg-orange px-3 py-1 text-xs font-semibold text-ink">
          Admissions open for 2026/27
        </span>

        <h1 className="animate-fade-in-up mt-6 max-w-3xl text-5xl font-black leading-[1.03] tracking-tight text-white [animation-delay:80ms] md:text-7xl">
          Home tuition that builds <span className="text-orange">confidence</span>, not just marks.
        </h1>

        <p className="animate-fade-in-up mt-6 max-w-xl text-lg text-white/80 [animation-delay:160ms]">
          Clear explanations, regular practice, and a simple study plan. Online classes
          across Tamil Nadu, or offline home visits across Chennai.
        </p>

        <div className="animate-fade-in-up mt-8 flex flex-wrap gap-4 [animation-delay:240ms]">
          <a
            href="#contact"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-navy transition hover:bg-orange hover:text-ink"
          >
            Enquire now
          </a>
          <a
            href="#subjects"
            className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View subjects
          </a>
        </div>

        <div className="animate-fade-in-up mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 [animation-delay:320ms]">
          <HeroStat value="6+" label="Years teaching" />
          <HeroStat value="3" label="Boards covered" />
          <HeroStat value="1:1" label="Or small group" />
        </div>

        <div className="animate-fade-in-up mt-12 flex max-w-md items-center gap-4 rounded-2xl bg-white p-5 shadow-xl [animation-delay:400ms]">
          <Image
            src="/varshan.jpeg"
            alt="Varshan – Tutor"
            width={300}
            height={300}
            priority
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
          <div>
            <div className="text-xs font-semibold tracking-wide text-orange-deep uppercase">Academic Head</div>
            <div className="text-base font-bold text-ink">Varshan</div>
            <div className="text-xs text-muted">M.Sc. Physics &middot; 6+ yrs &middot; State, CBSE, ICSE</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat(props: { value: string; label: string }) {
  return (
    <div>
      <span className="text-2xl font-black text-orange">{props.value}</span>
      <span className="ml-2 text-sm text-white/70">{props.label}</span>
    </div>
  );
}

function Programme() {
  return (
    <section id="subjects" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-orange-deep uppercase">The Programme</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
            Subjects &amp; Classes
          </h2>
        </div>

        <div className="mt-16 space-y-16">
          <Reveal>
            <ProgrammeRow
              num="01"
              title="Classes 1–10 (All Subjects)"
              items={[
                "Maths, Science, English and more",
                "Strong fundamentals",
                "Exam-focused preparation",
              ]}
            />
          </Reveal>
          <Reveal delayMs={100}>
            <ProgrammeRow
              num="02"
              title="Classes 11–12"
              items={[
                "Physics",
                "Computer Science",
                "Board exam & concept-focused coaching",
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProgrammeRow(props: { num: string; title: string; items: string[] }) {
  return (
    <div className="relative grid gap-6 border-t border-ink/10 pt-10 md:grid-cols-12 md:items-start">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-0 select-none text-[7rem] font-black leading-none text-orange/[0.10] md:text-[9rem]"
      >
        {props.num}
      </span>

      <div className="relative md:col-span-4">
        <div className="text-2xl font-bold text-ink">{props.title}</div>
      </div>

      <ul className="relative grid gap-3 text-sm text-muted sm:grid-cols-2 md:col-span-8">
        {props.items.map((x) => (
          <li key={x} className="flex gap-2.5">
            <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-[#F5F7FA] py-24">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold tracking-widest text-orange-deep uppercase">Getting started</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">How it works</h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          <Reveal>
            <HowStep num="01" title="Enquire" desc="Tell us class, subject, and online/offline preference." />
          </Reveal>
          <Reveal delayMs={100}>
            <HowStep num="02" title="Free call" desc="We understand the student level and suggest a plan." />
          </Reveal>
          <Reveal delayMs={200}>
            <HowStep num="03" title="Start sessions" desc="Fixed schedule, practice, and regular updates." />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HowStep(props: { num: string; title: string; desc: string }) {
  return (
    <div className="relative pt-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 select-none text-[6rem] font-black leading-none text-orange/[0.12]"
      >
        {props.num}
      </span>
      <div className="relative text-lg font-bold text-ink">{props.title}</div>
      <div className="relative mt-2 text-sm text-muted">{props.desc}</div>
    </div>
  );
}

function CtaBand() {
  return (
    <section className="bg-orange py-16">
      <Reveal className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-3 text-ink/70">
          Tell us the class and subject - we&apos;ll call you back within 24 hours.
        </p>
        <a
          href="#contact"
          className="mt-7 inline-flex rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navy-deep"
        >
          Enquire now →
        </a>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <p className="text-xs font-semibold tracking-widest text-orange-deep uppercase">Enquiry</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink">Tell us what you need</h2>
          <p className="mt-3 text-muted">Share a few details and we&apos;ll contact you soon.</p>

          <div className="mt-8 rounded-3xl border border-ink/10 bg-[#FAF9FF] p-6">
            <EnquiryForm />
          </div>

          <div className="mt-6 text-sm text-muted">
            <div className="font-semibold text-ink">Contact</div>
            <div className="mt-1">Phone: +91 8668194510</div>
            <div>Email: kvrchennaihometuition@gmail.com</div>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="rounded-3xl bg-navy p-8 text-white md:col-span-2">
          <h3 className="text-xl font-bold">Online &amp; Offline</h3>
          <p className="mt-2 text-sm text-white/80">
            Online classes via Google Meet/Zoom with screen sharing and notes.
            Offline home visits depend on location and availability.
          </p>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm">
            <div className="font-semibold text-white">Areas covered (offline)</div>
            <div className="mt-1 text-white/70">Chennai</div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm">
            <div className="font-semibold text-white">Areas covered (online)</div>
            <div className="mt-1 text-white/70">Tamil Nadu</div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm">
            <div className="font-semibold text-white">Timings</div>
            <div className="mt-1 text-white/70">6:00 AM – 9:00 PM (7 days a week)</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

