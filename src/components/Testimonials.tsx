import { createClient } from "@supabase/supabase-js";

type Testimonial = {
  id: string;
  created_at: string;
  name: string;
  subtitle: string | null;
  message: string;
  sort_order: number;
};

export async function Testimonials() {
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

  const testimonials = (data ?? []) as Testimonial[];

  if (!testimonials.length) return null;

  return (
    <section className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-1 pb-12">
        <h2 className="text-2xl font-semibold tracking-tight">What Parents Say</h2>
        <p className="mt-2 text-slate-600">
        A few words from parents and students.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-3xl border bg-slate-50 p-6">
                {/* Star rating */}
                <div className="mb-3 flex gap-1 text-yellow-400">
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
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                “{t.message}”
              </p>

              <div className="mt-4 text-sm">
                <div className="font-semibold text-slate-900">{t.name}</div>
                {t.subtitle ? (
                  <div className="text-slate-500">{t.subtitle}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
