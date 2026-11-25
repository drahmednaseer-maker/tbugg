import { NextResponse } from "next/server";
import { hmac, MAX_SHARE, passcode, signedIn } from "@/features/studio/server";
export const runtime = "nodejs";
/** Only the signed-in team can create links, so nobody else can publish under our name. */
export async function POST(req: Request) {
  if (!passcode()) return NextResponse.json({ error: "off" }, { status: 503 });
  if (!(await signedIn())) return NextResponse.json({ error: "login" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (typeof body?.data !== "string" || body.data.length > MAX_SHARE) return NextResponse.json({ error: "size" }, { status: 400 });
  return NextResponse.json({ sig: hmac("share", body.data) });
}
