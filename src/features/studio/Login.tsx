"use client";
import { useState } from "react";
import { Logo } from "./Doc";
export default function Login() {
  const [code, setCode] = useState(""), [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  return <div className="st login"><form onSubmit={async (e) => { e.preventDefault(); setBusy(true); setErr(""); try { const r = await fetch("/api/itineraries/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) }); if (r.ok) { location.reload(); return; } setErr("That passcode is not right. Try again."); } catch { setErr("No connection. Check your internet and try again."); } setBusy(false); }}>
    <Logo w={240} /><h1>Itinerary Studio</h1><label className="f">Team passcode<input type="password" autoFocus value={code} onChange={(e) => setCode(e.target.value)} autoComplete="current-password" /></label>{err && <p role="alert" className="err">{err}</p>}<button className="btn pri" disabled={busy || !code}>{busy ? "Checking…" : "Open studio"}</button></form></div>;
}
