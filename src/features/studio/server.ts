import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "tb_studio";
export const passcode = () => process.env.ITINERARY_PASSCODE?.trim() ?? "";
export const hmac = (purpose: string, v: string) => createHmac("sha256", `${passcode()}:${purpose}`).update(v).digest("base64url");
export const same = (a: string, b: string) => { const x = Buffer.from(hmac("cmp", a)), y = Buffer.from(hmac("cmp", b)); return timingSafeEqual(x, y); };
export const signedIn = async () => !!passcode() && same((await cookies()).get(COOKIE)?.value ?? "", hmac("session", "v1"));
export const MAX_SHARE = 200_000;
