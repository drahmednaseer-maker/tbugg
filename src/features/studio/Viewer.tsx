"use client";
import { useEffect, useRef, useState } from "react";
import { Download, MessageCircle } from "lucide-react";
import Doc, { Logo } from "./Doc";
import { Scaled } from "./Scaled";
import type { Company, Trip } from "./types";
import { exportPages, unpack } from "./util";
export default function Viewer() {
  const [v, setV] = useState<{ t: Trip; c: Company } | null>(null), [err, setErr] = useState(""), [busy, setBusy] = useState(""), ref = useRef<HTMLDivElement>(null);
  useEffect(() => { (async () => {
    try {
      const q = new URLSearchParams(location.hash.slice(1)); const data = q.get("d") ?? "", sig = q.get("s") ?? "";
      const r = await fetch("/api/itineraries/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data, sig }) });
      if (!r.ok) throw 0; setV(await unpack(data));
    } catch { setErr("This itinerary link is incomplete or no longer valid. Please ask Travel Bug for a new one."); }
  })(); }, []);
  if (!v) return <div className="st login"><div><Logo w={240} /><p role="status">{err || "Opening your itinerary…"}</p></div></div>;
  return <div className="st viewer"><style>{"@page{size:810px 1012px;margin:0}"}</style><div className="vbar noprint"><Logo w={104} /><span /><button className="btn" disabled={!!busy} onClick={async () => { try { setBusy("Preparing"); await exportPages(ref.current!, v.t.name, "pdf", setBusy); } catch { alert("The PDF could not be made. Please try again."); } setBusy(""); }}><Download size={17} />{busy || "Save PDF"}</button><a className="btn pri" href={`https://wa.me/${v.c.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello Travel Bug, I am writing about “${v.t.title}”.`)}`} target="_blank" rel="noreferrer"><MessageCircle size={17} />WhatsApp us</a></div><div ref={ref}><Scaled><Doc t={v.t} c={v.c} /></Scaled></div></div>;
}
