import { cookies } from "next/headers";
import { NextResponse } from "next/server";
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

  const name = String(form.get("name") ?? "").trim();
  const subtitle = String(form.get("subtitle") ?? "").trim() || null;
  const message = String(form.get("message") ?? "").trim();
  const sortOrderRaw = String(form.get("sort_order") ?? "").trim();

  const sort_order_num = Number(sortOrderRaw);
  const sort_order = Number.isFinite(sort_order_num) ? sort_order_num : 0;

  if (!name || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { error } = await supabase.from("testimonials").insert([
    { name, subtitle, message, sort_order },
  ]);

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/admin/dashboard", req.url), { status: 303 });
}
