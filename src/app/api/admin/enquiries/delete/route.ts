import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue, adminCookie } from "@/lib/adminAuth";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function requireAdmin() {
  const cookieStore = await cookies();
  const value = cookieStore.get(adminCookie.name)?.value;
  return verifyAdminCookieValue(value);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const id = String(body.id ?? "").trim();

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from("enquiries")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ ok: false, error: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
