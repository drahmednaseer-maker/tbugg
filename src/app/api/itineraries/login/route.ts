import { NextResponse } from "next/server";
import { COOKIE, hmac, passcode, same } from "@/features/studio/server";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  await new Promise((r) => setTimeout(r, 600));
  if (!passcode() || typeof body?.code !== "string" || !same(body.code.trim(), passcode())) return NextResponse.json({ ok: false }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, hmac("session", "v1"), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return res;
}
