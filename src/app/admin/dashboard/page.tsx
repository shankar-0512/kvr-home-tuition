import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue, adminCookie } from "@/lib/adminAuth";
import { createClient } from "@supabase/supabase-js";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const authed = cookieStore.get(adminCookie.name)?.value;

  if (!verifyAdminCookieValue(authed)) {
    redirect("/admin");
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: testimonials } = await supabase
  .from("testimonials")
  .select("*")
  .order("sort_order", { ascending: true })
  .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-[60] w-full bg-[#1F3A5F] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold">KVR Brain Point — Admin</div>
          <div className="flex items-center gap-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Enquiries</h1>
          <p className="text-sm text-slate-600">
            Latest enquiries appear at the top.
          </p>
        </div>

        <div className="mt-6 overflow-auto rounded-2xl border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr className="text-slate-700">
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Class</th>
                <th className="p-3 font-semibold">Board</th>
                <th className="p-3 font-semibold">Mode</th>
                <th className="p-3 font-semibold">Message</th>
              </tr>
            </thead>

            <tbody>
              {data?.length ? (
                data.map((e) => (
                  <tr key={e.id} className="border-t align-top">
                    <td className="p-3 whitespace-nowrap text-slate-600">
                      {new Date(e.created_at).toLocaleString()}
                    </td>

                    <td className="p-3 font-medium">{e.name}</td>

                    <td className="p-3">
                      <a
                        href={`tel:${e.phone}`}
                        className="text-[#1F3A5F] underline underline-offset-4"
                      >
                        {e.phone}
                      </a>
                      {e.parent_email ? (
                        <div className="mt-1 text-xs text-slate-500">
                          {e.parent_email}
                        </div>
                      ) : null}
                    </td>

                    <td className="p-3">{e.class}</td>
                    <td className="p-3">{e.board}</td>
                    <td className="p-3">{e.mode}</td>

                    <td className="p-3 max-w-[420px]">
                      <div className="whitespace-pre-wrap text-slate-700">
                        {e.message || "—"}
                      </div>
                      {e.subject || e.location ? (
                        <div className="mt-2 text-xs text-slate-500">
                          {e.subject ? <span>Subject: {e.subject}</span> : null}
                          {e.subject && e.location ? <span> • </span> : null}
                          {e.location ? <span>Location: {e.location}</span> : null}
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-slate-600" colSpan={7}>
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Testimonials</h2>
          <p className="text-sm text-slate-600">
            Add or remove testimonials shown on the home page.
          </p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Add form */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Add testimonial</h3>

            <form action="/api/admin/testimonials/create" method="post" className="mt-4 space-y-3">
              <input
                name="name"
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Name (e.g., Parent of Class 8)"
              />

              <input
                name="subtitle"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Subtitle (optional) — e.g., CBSE, Online"
              />

              <input
                name="sort_order"
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Sort order (0 first)"
              />

              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Testimonial message"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#1F3A5F] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
              >
                Add testimonial
              </button>
            </form>
          </div>

          {/* List */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Existing</h3>

            <div className="mt-4 space-y-3">
              {testimonials?.length ? (
                testimonials.map((t) => (
                  <div key={t.id} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold text-slate-900">{t.name}</div>
                        {t.subtitle ? <div className="text-xs text-slate-500">{t.subtitle}</div> : null}
                      </div>

                      <form action="/api/admin/testimonials/delete" method="post">
                        <input type="hidden" name="id" value={t.id} />
                        <button
                          type="submit"
                          className="text-xs font-semibold text-red-600 underline underline-offset-4 hover:opacity-80"
                        >
                          Delete
                        </button>
                      </form>
                    </div>

                    <div className="mt-3 text-sm text-slate-700 whitespace-pre-wrap">
                      {t.message}
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Sort: {t.sort_order} • {new Date(t.created_at).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-600">No testimonials yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}
