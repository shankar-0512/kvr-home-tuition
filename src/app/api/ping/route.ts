import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function GET() {
  const { error } = await supabase.from("enquiries").select("id").limit(1);
  if (error) {
    // Do not expose internal error details publicly.
    return NextResponse.json({ ok: false, error: "Health check failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
