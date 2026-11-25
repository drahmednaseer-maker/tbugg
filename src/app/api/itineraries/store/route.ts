import { NextResponse } from "next/server";
import { redis, signedIn, teamOn } from "@/features/studio/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const ID = /^[a-z0-9-]{4,64}$/i, SHA = /^[a-f0-9]{64}$/, MAX = 900_000;
/** Saves only when nobody else saved since this editor last loaded it. */
const SAVE = `local c=redis.call('HGET',KEYS[1],ARGV[1]); local cur=0; if c then cur=cjson.decode(c).rev end
if cur~=tonumber(ARGV[2]) then return {0,cur} end
local n=cur+1; local m=cjson.decode(ARGV[4]); m.rev=n; redis.call('HSET',KEYS[1],ARGV[1],cjson.encode(m)); redis.call('HSET',KEYS[2],ARGV[1],ARGV[3]); return {1,n}`;
const bad = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s });
export async function POST(req: Request) {
  if (!teamOn()) return bad("off", 503);
  if (!(await signedIn())) return bad("login", 401);
  const b = await req.json().catch(() => null); if (!b) return bad("body");
  try {
    switch (b.op) {
      case "list": { const [m, h] = await Promise.all([redis<string[]>("HVALS", "tb:meta"), redis<string[]>("HVALS", "tb:hotels")]); return NextResponse.json({ trips: m.map((x) => JSON.parse(x)), hotels: h.map((x) => JSON.parse(x)) }); }
      case "get": { if (!ID.test(b.id)) return bad("id"); const [t, m] = await Promise.all([redis<string | null>("HGET", "tb:trips", b.id), redis<string | null>("HGET", "tb:meta", b.id)]); return t && m ? NextResponse.json({ trip: JSON.parse(t), meta: JSON.parse(m) }) : bad("gone", 404); }
      case "save": {
        const t = JSON.stringify(b.trip ?? null); if (!ID.test(b.trip?.id ?? "") || !Array.isArray(b.trip.days) || typeof b.rev !== "number" || t.length > MAX) return bad(t.length > MAX ? "size" : "trip");
        // The card is stored as text inside "c" so Redis' JSON handling cannot change it.
        const meta = JSON.stringify({ id: b.trip.id, rev: 0, by: String(b.by ?? "").slice(0, 40), at: Date.now(), c: JSON.stringify(b.card ?? {}) }); if (meta.length > 120_000) return bad("size");
        const [ok, rev] = await redis<[number, number]>("EVAL", SAVE, 2, "tb:meta", "tb:trips", b.trip.id, b.rev, t, meta); return ok ? NextResponse.json({ rev }) : NextResponse.json({ error: "conflict", rev }, { status: 409 });
      }
      case "del": { if (!ID.test(b.id)) return bad("id"); await redis("HDEL", "tb:meta", b.id); await redis("HDEL", "tb:trips", b.id); return NextResponse.json({ ok: true }); }
      case "have": { const l = (Array.isArray(b.ids) ? b.ids : []).filter((x: unknown) => typeof x === "string" && SHA.test(x)).slice(0, 200) as string[]; const r = await Promise.all(l.map((x) => redis<number>("EXISTS", `tb:ph:${x}`))); return NextResponse.json({ missing: l.filter((_, i) => !r[i]) }); }
      case "photo": { if (!SHA.test(b.id) || typeof b.data !== "string" || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(b.data) || b.data.length > MAX) return bad("photo"); await redis("SET", `tb:ph:${b.id}`, b.data); return NextResponse.json({ ok: true }); }
      case "pic": { if (!SHA.test(b.id)) return bad("id"); const d = await redis<string | null>("GET", `tb:ph:${b.id}`); return d ? NextResponse.json({ data: d }) : bad("gone", 404); }
      case "hotel": { const h = JSON.stringify(b.hotel ?? null); if (!ID.test(b.hotel?.id ?? "") || !b.hotel.name || h.length > MAX) return bad("hotel"); await redis("HSET", "tb:hotels", b.hotel.id, h); return NextResponse.json({ ok: true }); }
      case "hotelDel": { if (!ID.test(b.id)) return bad("id"); await redis("HDEL", "tb:hotels", b.id); return NextResponse.json({ ok: true }); }
    }
    return bad("op");
  } catch (e) { console.error("itinerary store", e); return bad("storage", 502); }
}
