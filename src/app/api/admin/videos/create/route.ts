import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue, adminCookie } from "@/lib/adminAuth";
import { extractYouTubeId } from "@/lib/youtube";
import { isStandard } from "@/lib/standards";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const cookieStore = await cookies();
  const value = cookieStore.get(adminCookie.name)?.value;
  return verifyAdminCookieValue(value);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();

  const youtubeUrl = String(form.get("youtubeUrl") ?? "").trim();
  const title = String(form.get("title") ?? "").trim();
  const featured = form.get("featured") === "on";
  const standards = form.getAll("standards").map(String).filter(isStandard);

  if (!youtubeUrl || !title) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  if (title.length > 200) {
    return NextResponse.json({ ok: false, error: "Title too long (max 200)" }, { status: 400 });
  }

  const youtubeId = extractYouTubeId(youtubeUrl);
  if (!youtubeId) {
    return NextResponse.json({ ok: false, error: "Could not parse a YouTube video ID from that link" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  if (featured) {
    await supabase.from("videos").update({ featured: false }).eq("featured", true);
  }

  const { error } = await supabase.from("videos").insert([
    { youtube_id: youtubeId, title, featured, standards },
  ]);

  if (error) {
    return NextResponse.json({ ok: false, error: "Could not save video" }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/videos");

  return NextResponse.redirect(new URL("/admin/dashboard", req.url), { status: 303 });
}
