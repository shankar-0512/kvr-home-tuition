import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { Reveal } from "./Reveal";

type Testimonial = {
  id: string;
  created_at: string;
  name: string;
  subtitle: string | null;
  message: string;
  sort_order: number;
};

// Cache testimonials for 1 hour. Invalidated immediately when admin adds/deletes
// a testimonial via revalidateTag("testimonials") in the admin routes.
const getTestimonials = unstable_cache(
  async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data } = await supabase
      .from("testimonials")
      .select("id, created_at, name, subtitle, message, sort_order")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(6);

    return (data ?? []) as Testimonial[];
  },
  ["testimonials-list"],
  { revalidate: 3600 }
);

export async function Testimonials() {
  const testimonials = await getTestimonials();

  if (!testimonials.length) return null;

  const [featured, ...rest] = testimonials;

  return (
    <section className="clip-diagonal-both bg-orange py-32">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold tracking-widest text-ink/60 uppercase">Social proof</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">What Parents Say</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className={rest.length === 0 ? "lg:col-span-5" : "lg:col-span-3"}>
            <FeaturedQuote t={featured} />
          </Reveal>

          {rest.length > 0 && (
            <div className="flex flex-col gap-5 lg:col-span-2">
              {rest.map((t, i) => (
                <Reveal key={t.id} delayMs={(i + 1) * 100}>
                  <CompactQuote t={t} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stars({ className }: { className?: string }) {
  return (
    <div className={`flex gap-1 text-orange-deep ${className ?? ""}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.377-2.455a1 1 0 00-1.176 0l-3.377 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.287-3.966z" />
        </svg>
      ))}
    </div>
  );
}

function FeaturedQuote({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl transition-transform duration-300 hover:-translate-y-1 md:p-10">
      <Stars />
      <p className="mt-5 text-2xl font-medium leading-snug text-ink whitespace-pre-wrap md:text-3xl">
        &ldquo;{t.message}&rdquo;
      </p>

      <div className="mt-6 text-sm">
        <div className="font-semibold text-navy">{t.name}</div>
        {t.subtitle ? <div className="text-muted">{t.subtitle}</div> : null}
      </div>
    </div>
  );
}

function CompactQuote({ t }: { t: Testimonial }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <Stars className="mb-3" />
      <p className="text-sm leading-relaxed text-ink/80 whitespace-pre-wrap">
        &ldquo;{t.message}&rdquo;
      </p>

      <div className="mt-4 text-sm">
        <div className="font-semibold text-navy">{t.name}</div>
        {t.subtitle ? <div className="text-muted">{t.subtitle}</div> : null}
      </div>
    </div>
  );
}
