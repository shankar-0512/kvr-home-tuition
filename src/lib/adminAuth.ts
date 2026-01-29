import crypto from "crypto";

const COOKIE_NAME = "admin-auth";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

function sign(input: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export function createAdminCookieValue() {
  const secret = String(process.env.ADMIN_COOKIE_SECRET ?? "");
  if (!secret) throw new Error("ADMIN_COOKIE_SECRET not set");

  const issuedAt = Date.now().toString(); // ms
  const sig = sign(issuedAt, secret);
  return `${issuedAt}.${sig}`;
}

export function verifyAdminCookieValue(value: string | undefined) {
  if (!value) return false;

  const secret = String(process.env.ADMIN_COOKIE_SECRET ?? "");
  if (!secret) return false;

  const parts = value.split(".");
  if (parts.length !== 2) return false;

  const [issuedAtStr, sig] = parts;

  // check age
  const issuedAt = Number(issuedAtStr);
  if (!Number.isFinite(issuedAt)) return false;

  const ageSeconds = (Date.now() - issuedAt) / 1000;
  if (ageSeconds < 0 || ageSeconds > MAX_AGE_SECONDS) return false;

  // verify signature
  const expected = sign(issuedAtStr, secret);
  return safeEqual(sig, expected);
}

export const adminCookie = {
  name: COOKIE_NAME,
  maxAgeSeconds: MAX_AGE_SECONDS,
};