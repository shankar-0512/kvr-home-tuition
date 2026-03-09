import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

/**
 * Returns true if the request is allowed, false if rate limited.
 * Falls back to allowing on DB error to avoid blocking legitimate users.
 *
 * Requires a `rate_limits` table in Supabase:
 *   create table rate_limits (
 *     key text primary key,
 *     count integer not null default 0,
 *     reset_at timestamptz not null
 *   );
 */
export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const now = new Date();
    const resetAt = new Date(now.getTime() + windowMs).toISOString();

    const { data } = await supabase
      .from("rate_limits")
      .select("count, reset_at")
      .eq("key", key)
      .maybeSingle();

    if (data && new Date(data.reset_at) > now) {
      if (data.count >= maxAttempts) return false;
      await supabase
        .from("rate_limits")
        .update({ count: data.count + 1 })
        .eq("key", key);
    } else {
      await supabase
        .from("rate_limits")
        .upsert({ key, count: 1, reset_at: resetAt });
    }
    return true;
  } catch {
    return true; // fail open on DB error
  }
}

export async function clearRateLimit(key: string): Promise<void> {
  try {
    const supabase = getSupabase();
    await supabase.from("rate_limits").delete().eq("key", key);
  } catch {
    // ignore
  }
}
