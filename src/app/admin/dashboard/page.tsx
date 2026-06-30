import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminCookieValue, adminCookie } from "@/lib/adminAuth";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { LogoutButton } from "@/components/LogoutButton";
import { StatusSelect } from "@/components/StatusSelect";
import { DeleteEnquiryButton } from "@/components/DeleteEnquiryButton";

const fieldClass =
  "w-full rounded-xl border border-ink/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-navy/20";

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
    .order("created_at", { ascending: false })
    .limit(200);

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="sticky top-0 z-[60] w-full bg-navy-deep text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-bold">KVR Brain Point - Admin</div>
          <div className="flex items-center gap-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black text-ink">Enquiries</h1>
          <p className="text-sm text-muted">
            Latest enquiries appear at the top.
          </p>
        </div>

        <div className="mt-6 overflow-auto rounded-2xl border border-ink/10 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F5F7FA] text-left">
              <tr className="text-ink">
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Class</th>
                <th className="p-3 font-semibold">Board</th>
                <th className="p-3 font-semibold">Mode</th>
                <th className="p-3 font-semibold">Message</th>
                <th className="p-3 font-semibold"></th>
              </tr>
            </thead>

            <tbody>
              {data?.length ? (
                data.map((e) => (
                  <tr key={e.id} className="border-t border-ink/10 align-top">
                    <td className="p-3">
                      <StatusSelect id={e.id} current={e.status ?? "new"} />
                    </td>
                    <td className="p-3 whitespace-nowrap text-muted">
                      {new Date(e.created_at).toLocaleString()}
                    </td>

                    <td className="p-3 font-medium">{e.name}</td>

                    <td className="p-3">
                      <a
                        href={`tel:${e.phone}`}
                        className="text-navy underline underline-offset-4"
                      >
                        {e.phone}
                      </a>
                      {e.parent_email ? (
                        <div className="mt-1 text-xs text-muted">
                          {e.parent_email}
                        </div>
                      ) : null}
                    </td>

                    <td className="p-3">{e.class}</td>
                    <td className="p-3">{e.board}</td>
                    <td className="p-3">{e.mode}</td>

                    <td className="p-3 max-w-[420px]">
                      <div className="whitespace-pre-wrap text-ink/80">
                        {e.message || "-"}
                      </div>
                      {e.subject || e.location ? (
                        <div className="mt-2 text-xs text-muted">
                          {e.subject ? <span>Subject: {e.subject}</span> : null}
                          {e.subject && e.location ? <span> • </span> : null}
                          {e.location ? <span>Location: {e.location}</span> : null}
                        </div>
                      ) : null}
                    </td>
                    <td className="p-3">
                      <DeleteEnquiryButton id={e.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-muted" colSpan={9}>
                    No enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black text-ink">Testimonials</h2>
            <p className="text-sm text-muted">
              Add or remove testimonials shown on the home page.
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-ink">Add testimonial</h3>

              <form action="/api/admin/testimonials/create" method="post" className="mt-4 space-y-3">
                <input
                  name="name"
                  required
                  className={fieldClass}
                  placeholder="Name (e.g., Parent of Class 8)"
                />

                <input
                  name="subtitle"
                  className={fieldClass}
                  placeholder="Subtitle (optional) - e.g., CBSE, Online"
                />

                <input
                  name="sort_order"
                  type="number"
                  defaultValue={0}
                  className={fieldClass}
                  placeholder="Sort order (0 first)"
                />

                <textarea
                  name="message"
                  required
                  rows={5}
                  className={fieldClass}
                  placeholder="Testimonial message"
                />

                <button
                  type="submit"
                  className="w-full rounded-full bg-orange px-4 py-3 text-sm font-bold text-ink transition hover:brightness-105"
                >
                  Add testimonial
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-ink">Existing</h3>

              <div className="mt-4 space-y-3">
                {testimonials?.length ? (
                  testimonials.map((t) => (
                    <div key={t.id} className="rounded-2xl bg-[#F5F7FA] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-ink">{t.name}</div>
                          {t.subtitle ? <div className="text-xs text-muted">{t.subtitle}</div> : null}
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

                      <div className="mt-3 text-sm text-ink/80 whitespace-pre-wrap">
                        {t.message}
                      </div>

                      <div className="mt-2 text-xs text-muted">
                        Sort: {t.sort_order} • {new Date(t.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted">No testimonials yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black text-ink">Videos</h2>
            <p className="text-sm text-muted">
              Paste a YouTube link to add it to the site. Mark one video as featured to
              highlight it on the homepage and at the top of the Videos page.
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-ink">Add video</h3>

              <form action="/api/admin/videos/create" method="post" className="mt-4 space-y-3">
                <input
                  name="youtubeUrl"
                  required
                  className={fieldClass}
                  placeholder="YouTube video URL"
                />

                <input
                  name="title"
                  required
                  className={fieldClass}
                  placeholder="Video title"
                />

                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    name="featured"
                    className="h-4 w-4 rounded border-ink/20 text-orange focus:ring-orange/30"
                  />
                  Mark as featured
                </label>

                <button
                  type="submit"
                  className="w-full rounded-full bg-orange px-4 py-3 text-sm font-bold text-ink transition hover:brightness-105"
                >
                  Add video
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-ink">Existing</h3>

              <div className="mt-4 space-y-3">
                {videos?.length ? (
                  videos.map((v) => (
                    <div key={v.id} className="rounded-2xl bg-[#F5F7FA] p-4">
                      <div className="flex items-start gap-3">
                        <Image
                          src={`https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`}
                          alt={v.title}
                          width={112}
                          height={63}
                          className="shrink-0 rounded-lg object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="truncate font-semibold text-ink">{v.title}</div>
                            {v.featured ? (
                              <span className="shrink-0 rounded-full bg-orange px-2 py-0.5 text-[10px] font-bold uppercase text-ink">
                                Featured
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-1 text-xs text-muted">
                            {new Date(v.created_at).toLocaleString()}
                          </div>

                          <div className="mt-2 flex items-center gap-3">
                            {!v.featured && (
                              <form action="/api/admin/videos/feature" method="post">
                                <input type="hidden" name="id" value={v.id} />
                                <button
                                  type="submit"
                                  className="text-xs font-semibold text-navy underline underline-offset-4 hover:opacity-80"
                                >
                                  Set as featured
                                </button>
                              </form>
                            )}
                            <form action="/api/admin/videos/delete" method="post">
                              <input type="hidden" name="id" value={v.id} />
                              <button
                                type="submit"
                                className="text-xs font-semibold text-red-600 underline underline-offset-4 hover:opacity-80"
                              >
                                Delete
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted">No videos yet.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
