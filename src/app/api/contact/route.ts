import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Delivers contact-form enquiries to the TravelBug inbox over SMTP.
 *
 * The form used to open a WhatsApp link and then show "message sent"
 * regardless of what happened next, so an enquiry was lost silently whenever
 * the visitor had no WhatsApp, had the popup blocked, or closed the tab
 * without pressing send. Nothing ever reached info@travelbug.pk.
 *
 * Mail goes through the SiteGround mailbox the domain already has, so there is
 * no second provider to pay for and no new DNS: the domain's existing SPF and
 * DKIM already authorise it, which is what keeps these messages out of spam.
 *
 * Configure in Vercel → Settings → Environment Variables:
 *   SMTP_HOST  mail.travelbug.pk
 *   SMTP_PORT  465
 *   SMTP_USER  info@travelbug.pk
 *   SMTP_PASS  <that mailbox's password>
 *   MAIL_TO    info@travelbug.pk        (optional, defaults to SMTP_USER)
 *
 * Until those exist the route reports itself unconfigured and the form falls
 * back to WhatsApp, so deploying this ahead of the mailbox changes nothing.
 */

export const runtime = "nodejs";

const MAX = { name: 120, email: 200, phone: 60, subject: 200, message: 5000 };

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Header injection guard: a newline in a header field lets a sender append
// their own headers, so these values are only ever used on a single line.
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Bots fill in every field they find; a real visitor never sees this one.
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const subject = clean(body.subject, MAX.subject);
  const message = clean(body.message, MAX.message);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      // The envelope sender must be the authenticated mailbox or SPF fails;
      // the visitor's address goes in Reply-To so hitting reply still works.
      from: `"TravelBug.pk website" <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: `"${oneLine(name)}" <${oneLine(email)}>`,
      subject: oneLine(subject ? `Website enquiry — ${subject}` : `Website enquiry from ${name}`),
      text: [
        `Name:    ${oneLine(name)}`,
        `Email:   ${oneLine(email)}`,
        phone ? `Phone:   ${oneLine(phone)}` : "",
        subject ? `Subject: ${oneLine(subject)}` : "",
        "",
        message,
      ].filter(Boolean).join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Never surface SMTP internals — they name the host and mailbox.
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
