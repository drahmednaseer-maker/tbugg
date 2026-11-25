import { NextResponse } from "next/server";
import { hmac, MAX_SHARE, passcode, same } from "@/features/studio/server";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const ok = !!passcode() && typeof b?.data === "string" && b.data.length <= MAX_SHARE && typeof b?.sig === "string" && same(b.sig, hmac("share", b.data));
  return NextResponse.json({ ok }, { status: ok ? 200 : 403 });
}
