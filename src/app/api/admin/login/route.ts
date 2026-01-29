import { NextResponse } from "next/server";
import { createAdminCookieValue, adminCookie } from "@/lib/adminAuth";
import crypto from "crypto";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "local";
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();

  const bucket = buckets.get(ip);
  if (bucket && bucket.resetAt > now && bucket.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const pin = String(body?.pin ?? "").trim();
  const adminPin = String(process.env.ADMIN_PIN ?? "").trim();

  if (!adminPin) {
    return NextResponse.json({ ok: false, error: "ADMIN_PIN not set" }, { status: 500 });
  }

  if (!pin) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // init or reset window
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 0, resetAt: now + WINDOW_MS });
  }

  const current = buckets.get(ip)!;

  const ok = safeEqual(pin, adminPin);

  if (!ok) {
    current.count += 1;
    buckets.set(ip, current);
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  buckets.delete(ip);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookie.name, createAdminCookieValue(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminCookie.maxAgeSeconds,
  });

  return res;
}
