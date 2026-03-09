import { NextResponse } from "next/server";
import { createAdminCookieValue, adminCookie } from "@/lib/adminAuth";
import { checkRateLimit, clearRateLimit } from "@/lib/rateLimit";
import crypto from "crypto";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "local";
}

// Constant-time comparison that does not leak length information.
function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  const len = Math.max(aa.length, bb.length);
  const paddedA = Buffer.concat([aa, Buffer.alloc(len - aa.length)]);
  const paddedB = Buffer.concat([bb, Buffer.alloc(len - bb.length)]);
  return crypto.timingSafeEqual(paddedA, paddedB) && aa.length === bb.length;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateLimitKey = `admin-login:${ip}`;

  // Persistent rate limiting (Supabase-backed, survives restarts and scales
  // across instances). Falls back to allowing if the DB is unavailable.
  const allowed = await checkRateLimit(rateLimitKey, MAX_ATTEMPTS, WINDOW_MS);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  let body: { pin?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const pin = String(body?.pin ?? "").trim();
  const adminPin = String(process.env.ADMIN_PIN ?? "").trim();

  if (!adminPin) {
    return NextResponse.json({ ok: false, error: "ADMIN_PIN not configured" }, { status: 500 });
  }

  // Enforce a minimum PIN strength at runtime.
  if (adminPin.length < 8) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_PIN must be at least 8 characters" },
      { status: 500 }
    );
  }

  if (!pin) {
    return NextResponse.json({ ok: false, error: "PIN required" }, { status: 401 });
  }

  const ok = safeEqual(pin, adminPin);

  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid PIN" }, { status: 401 });
  }

  // Clear rate limit on successful login.
  await clearRateLimit(rateLimitKey);

  const res = NextResponse.json({ ok: true });
  // sameSite:"strict" also provides CSRF protection for all admin endpoints —
  // cross-origin requests will not include this cookie.
  res.cookies.set(adminCookie.name, createAdminCookieValue(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminCookie.maxAgeSeconds,
  });

  return res;
}
