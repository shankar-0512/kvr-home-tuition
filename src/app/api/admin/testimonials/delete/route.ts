import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue, adminCookie } from "@/lib/adminAuth";

async function requireAdmin() {
  const cookieStore = await cookies();
  const value = cookieStore.get(adminCookie.name)?.value;
  return verifyAdminCookieValue(value);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const form = await req.formData();
  const id = String(form.get("id") ?? "").trim();

  if (!id) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/admin/dashboard", req.url), { status: 303 });
}
