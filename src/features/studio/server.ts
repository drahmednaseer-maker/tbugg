import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "tb_studio";
export const passcode = () => process.env.ITINERARY_PASSCODE?.trim() ?? "";
export const hmac = (purpose: string, v: string) => createHmac("sha256", `${passcode()}:${purpose}`).update(v).digest("base64url");
export const same = (a: string, b: string) => { const x = Buffer.from(hmac("cmp", a)), y = Buffer.from(hmac("cmp", b)); return timingSafeEqual(x, y); };
export const signedIn = async () => !!passcode() && same((await cookies()).get(COOKIE)?.value ?? "", hmac("session", "v1"));
export const MAX_SHARE = 200_000;

/* Team storage: an Upstash Redis database connected in Vercel. Off unless the passcode is also set, because it holds client data. */
const env = (...k: string[]) => k.map((x) => process.env[x]?.trim()).find(Boolean) ?? "";
const dbUrl = () => env("KV_REST_API_URL", "UPSTASH_REDIS_REST_URL"), dbToken = () => env("KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN");
export const teamOn = () => !!(passcode() && dbUrl() && dbToken());
export async function redis<T>(...cmd: (string | number)[]): Promise<T> {
  const r = await fetch(dbUrl(), { method: "POST", headers: { Authorization: `Bearer ${dbToken()}`, "Content-Type": "application/json" }, body: JSON.stringify(cmd), cache: "no-store" });
  const o = await r.json(); if (!r.ok || o.error) throw new Error(o.error ?? `storage ${r.status}`); return o.result as T;
}
