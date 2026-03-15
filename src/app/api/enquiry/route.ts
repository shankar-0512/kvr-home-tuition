import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";

type Payload = {
  name: string;
  phone: string;
  parentEmail?: string;

  class: string;
  board: string;
  mode: string;

  subject?: string;
  location?: string;
  message?: string;
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    const m: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return m[c] ?? c;
  });
}

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "local";
}

export async function POST(req: Request) {
  try {
    // Rate limit: 5 submissions per 15 minutes per IP.
    const ip = getClientIp(req);
    const allowed = await checkRateLimit(`enquiry:${ip}`, 5, 15 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Payload;

    if (!body?.name || !body?.phone || !body?.class || !body?.board || !body?.mode) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Length limits to prevent storage abuse.
    if (body.name.length > 100)
      return NextResponse.json({ ok: false, error: "Name too long" }, { status: 400 });
    if (body.phone.length > 20)
      return NextResponse.json({ ok: false, error: "Phone number too long" }, { status: 400 });
    if ((body.subject?.length ?? 0) > 200)
      return NextResponse.json({ ok: false, error: "Subject too long" }, { status: 400 });
    if ((body.location?.length ?? 0) > 200)
      return NextResponse.json({ ok: false, error: "Location too long" }, { status: 400 });
    if ((body.message?.length ?? 0) > 2000)
      return NextResponse.json({ ok: false, error: "Message too long (max 2000 chars)" }, { status: 400 });

    // Email format validation.
    const parentEmail = (body.parentEmail ?? "").trim() || null;
    if (parentEmail && !EMAIL_REGEX.test(parentEmail)) {
      return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("enquiries")
      .insert([
        {
          name: body.name.trim(),
          phone: body.phone.trim(),
          parent_email: parentEmail,

          class: body.class,
          board: body.board,
          mode: body.mode,

          subject: body.subject?.trim() || null,
          location: body.location?.trim() || null,
          message: body.message?.trim() || null,

          user_agent: req.headers.get("user-agent"),
          ip: null,
        },
      ])
      .select("id, created_at")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: "Could not save enquiry" }, { status: 500 });
    }

    const to = process.env.NOTIFY_TO_EMAIL!;
    const from = process.env.NOTIFY_FROM_EMAIL!;

    const subject = `New Enquiry — ${body.name} (${body.class}, ${body.board})`;

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.4">
        <h2 style="margin:0 0 12px">New Enquiry</h2>
        <p style="margin:0 0 10px"><b>Name:</b> ${esc(body.name)}</p>
        <p style="margin:0 0 10px"><b>Phone/WhatsApp:</b> ${esc(body.phone)}</p>
        ${parentEmail ? `<p style="margin:0 0 10px"><b>Parent Email:</b> ${esc(parentEmail)}</p>` : ""}
        <p style="margin:0 0 10px"><b>Class:</b> ${esc(body.class)}</p>
        <p style="margin:0 0 10px"><b>Board:</b> ${esc(body.board)}</p>
        <p style="margin:0 0 10px"><b>Mode:</b> ${esc(body.mode)}</p>
        ${body.subject ? `<p style="margin:0 0 10px"><b>Subject:</b> ${esc(body.subject)}</p>` : ""}
        ${body.location ? `<p style="margin:0 0 10px"><b>Location:</b> ${esc(body.location)}</p>` : ""}
        ${body.message ? `<p style="margin:0 0 10px"><b>Message:</b><br/>${esc(body.message).replace(/\n/g, "<br/>")}</p>` : ""}
        <hr/>
        <p style="margin:0;color:#666;font-size:12px">
          Enquiry ID: ${data.id}<br/>
          Submitted: ${data.created_at}
        </p>
      </div>
    `;

    // Awaited — Vercel terminates the serverless runtime immediately after the
    // response is sent, so fire-and-forget promises are killed mid-flight.
    // Email failure is still non-fatal: the enquiry is already saved to DB.
    await resend.emails
      .send({
        from,
        to,
        subject,
        html,
        replyTo: parentEmail ?? undefined,
      })
      .catch(() => {
        // Email failure is intentionally swallowed here.
      });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
