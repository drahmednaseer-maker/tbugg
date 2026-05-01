"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Moon, Users, Truck, Phone, ChevronDown, ChevronUp, Trash2, MessageCircle } from "lucide-react";
import {
  SavedItinerary,
  loadItineraries,
  deleteItinerary,
  recallPhone,
  rememberPhone,
  normalizePhone,
} from "@/lib/itineraryStore";

const TRANSPORT_LABELS: Record<string, string> = {
  sedan: "🚗 Sedan Car",
  prado: "🚙 4×4 Prado",
  coaster: "🚐 Coaster",
  coach: "🚌 Coach",
  air: "✈️ By Air",
  road: "🛣️ Full Road",
};

const STATUS_STYLES: Record<SavedItinerary["status"], { label: string; bg: string; color: string }> = {
  pending:   { label: "Awaiting Review",  bg: "rgba(255,194,10,0.12)",  color: "#FFC20A" },
  confirmed: { label: "Confirmed ✓",      bg: "rgba(34,197,94,0.12)",   color: "#22c55e" },
  modified:  { label: "Updated by Team",  bg: "rgba(96,165,250,0.12)",  color: "#60a5fa" },
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Single Itinerary Card ────────────────────────────────────────────────────

function ItineraryCard({
  it,
  phone,
  onDelete,
  onLoad,
}: {
  it: SavedItinerary;
  phone: string;
  onDelete: () => void;
  onLoad:   () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_STYLES[it.status];

  const waLines = [
    `Hi TravelBug! I'd like to review my itinerary (Ref: ${it.id.slice(-6)}).\n`,
    "🗺 ROUTE:",
    ...it.route.map((d, i) => `${i + 1}. ${d.name} — ${d.nights} nights`),
    "",
    `👥 ${it.maleAdults}M · ${it.femaleAdults}F${it.children > 0 ? ` · ${it.children} child(ren)` : ""}`,
    `🚗 ${TRANSPORT_LABELS[it.transport] ?? it.transport}`,
    `🏙️ From ${it.departure === "islamabad" ? "Islamabad" : "Lahore"}`,
    `📅 Total: ${it.totalNights} nights`,
  ];

  return (
    <div style={{
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.025)",
      overflow: "hidden",
      marginBottom: "12px",
    }}>
      {/* Header row */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "10px" }}
      >
        {/* Thumbnail stack */}
        <div style={{ display: "flex", position: "relative", width: 44, height: 36, flexShrink: 0 }}>
          {it.route.slice(0, 3).map((d, i) => (
            <img
              key={d.id}
              src={d.image}
              alt={d.name}
              style={{
                position: "absolute",
                left: i * 10,
                width: 28, height: 36,
                borderRadius: "8px",
                objectFit: "cover",
                border: "1.5px solid #0D1B2E",
              }}
              onError={e => { (e.target as HTMLImageElement).style.background = "#1a2740"; }}
            />
          ))}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "white", fontWeight: 800, fontSize: "13px", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {it.tripName}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ background: status.bg, color: status.color, fontSize: "9px", fontWeight: 800, padding: "2px 8px", borderRadius: "20px", letterSpacing: "0.06em" }}>
              {status.label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>{fmt(it.createdAt)}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>·</span>
            <span style={{ color: "#FFC20A", fontSize: "10px", fontWeight: 700 }}>{it.totalNights}N</span>
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0, marginTop: 2 }}>
          {expanded
            ? <ChevronUp style={{ width: 14, height: 14 }} />
            : <ChevronDown style={{ width: 14, height: 14 }} />
          }
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>

              {/* Route stops */}
              <div style={{ paddingTop: "12px", marginBottom: "12px" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Route</p>
                {it.route.map((d, i) => (
                  <div key={d.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFC20A", color: "#0B1628", fontSize: "8px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    <span style={{ color: "white", fontSize: "12px", fontWeight: 700, flex: 1 }}>{d.name}</span>
                    <span style={{ color: "#FFC20A", fontSize: "10px", fontWeight: 700 }}>{d.nights}N</span>
                  </div>
                ))}
              </div>

              {/* Info grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                {[
                  { icon: "👥", label: `${it.maleAdults}M · ${it.femaleAdults}F${it.children > 0 ? ` · ${it.children} child` : ""}` },
                  { icon: "🚗", label: TRANSPORT_LABELS[it.transport] ?? it.transport },
                  { icon: "🏙️", label: it.departure === "islamabad" ? "From Islamabad" : "From Lahore" },
                  { icon: "🌙", label: `${it.totalNights} Nights Total` },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "14px" }}>{icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", fontWeight: 600 }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Hotels */}
              {Object.keys(it.hotels).length > 0 && (
                <div style={{ marginBottom: "12px" }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Hotels</p>
                  {it.route.map(d => it.hotels[d.id] && (
                    <p key={d.id} style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", margin: "0 0 3px" }}>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{d.name}:</span> {it.hotels[d.id].hotel} ({it.hotels[d.id].stars}★)
                    </p>
                  ))}
                </div>
              )}

              {/* Note from TravelBug */}
              {it.note && (
                <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "10px", padding: "10px 12px", marginBottom: "12px" }}>
                  <p style={{ color: "#60a5fa", fontSize: "9px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>📋 Note from TravelBug</p>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", margin: 0, lineHeight: 1.5 }}>{it.note}</p>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                {/* Open in Planner */}
                <button
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("travelbug:load-itinerary", { detail: it })
                    );
                    onLoad();
                  }}
                  style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "linear-gradient(135deg, #FFC20A, #FFD34A)", border: "none", color: "#0B1628", fontWeight: 800, fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  🗺️ Open in Planner
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/923248888889?text=${encodeURIComponent(waLines.join("\n"))}`, "_blank")}
                  style={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg, #25D366, #128C7E)", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  title="Discuss on WhatsApp"
                >
                  <MessageCircle style={{ width: 13, height: 13 }} />
                </button>
                <button
                  onClick={() => { deleteItinerary(phone, it.id); onDelete(); }}
                  style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <Trash2 style={{ width: 13, height: 13 }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────

export default function MyTripsPanel({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);
  const [version, setVersion] = useState(0); // bump to re-load

  // Recall last-used phone on mount
  useEffect(() => {
    const saved = recallPhone();
    if (saved) { setPhone(saved); setSubmitted(true); }
  }, []);

  useEffect(() => {
    if (submitted && phone) {
      setItineraries(loadItineraries(phone));
    }
  }, [submitted, phone, version]);

  const handleSubmit = () => {
    if (!phone.trim()) return;
    rememberPhone(phone.trim());
    setSubmitted(true);
  };

  const reload = () => setVersion(v => v + 1);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 9990, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 9995,
          width: "min(380px, 95vw)",
          background: "#0D1B2E",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column",
          boxShadow: "8px 0 48px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: 40, height: 40, borderRadius: "12px", background: "rgba(255,194,10,0.12)", border: "1px solid rgba(255,194,10,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MapPin style={{ width: 18, height: 18, color: "#FFC20A" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "white", fontWeight: 900, fontSize: "16px", margin: 0 }}>My Itineraries</p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", margin: 0 }}>TravelBug trip planner</p>
          </div>
          <button
            onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X style={{ width: 14, height: 14 }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>

          {/* Phone lookup */}
          {!submitted ? (
            <div style={{ padding: "24px 0" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📱</div>
                <p style={{ color: "white", fontWeight: 800, fontSize: "17px", margin: "0 0 6px" }}>Enter your number</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>
                  Your trips are saved by your WhatsApp number.<br />Enter it to view your itineraries.
                </p>
              </div>
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <Phone style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "rgba(255,255,255,0.3)" }} />
                <input
                  type="tel"
                  placeholder="e.g. 0324 8888889"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  autoFocus
                  style={{
                    width: "100%", padding: "14px 14px 14px 42px",
                    borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)", color: "white",
                    fontSize: "15px", fontWeight: 700, outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                onClick={handleSubmit}
                style={{ width: "100%", padding: "14px", borderRadius: "14px", background: "linear-gradient(135deg, #FFC20A, #FFD34A)", border: "none", color: "#0B1628", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}
              >
                View My Trips →
              </button>
            </div>
          ) : (
            <>
              {/* Logged-in phone info */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", padding: "10px 12px", background: "rgba(255,194,10,0.07)", border: "1px solid rgba(255,194,10,0.2)", borderRadius: "12px" }}>
                <span style={{ fontSize: "13px" }}>📱</span>
                <span style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 700, flex: 1 }}>{phone}</span>
                <button
                  onClick={() => { setSubmitted(false); setItineraries([]); }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
                >
                  Change
                </button>
              </div>

              {/* Itinerary list */}
              {itineraries.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: "40px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
                  <p style={{ color: "white", fontWeight: 800, fontSize: "15px", margin: "0 0 8px" }}>No trips yet</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", margin: "0 0 24px", lineHeight: 1.5 }}>
                    Build a tour with the planner below and send it to WhatsApp — it'll appear here automatically.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById("tour-builder")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 350);
                    }}
                    style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #FFC20A, #FFD34A)", border: "none", color: "#0B1628", fontWeight: 800, fontSize: "13px", cursor: "pointer" }}
                  >
                    Start Planning ↓
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                    {itineraries.length} saved trip{itineraries.length !== 1 ? "s" : ""}
                  </p>
                  {itineraries.map(it => (
                    <ItineraryCard
                      key={it.id}
                      it={it}
                      phone={phone}
                      onDelete={reload}
                      onLoad={() => {
                        onClose();
                        setTimeout(() => {
                          document.getElementById("tour-builder")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 350);
                      }}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", margin: 0 }}>Trips saved privately in your browser</p>
          </div>
          <button
            onClick={() => window.open("https://wa.me/923248888889", "_blank")}
            style={{ padding: "8px 14px", borderRadius: "10px", background: "linear-gradient(135deg, #25D366, #128C7E)", border: "none", color: "white", fontWeight: 700, fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <MessageCircle style={{ width: 11, height: 11 }} />
            Chat
          </button>
        </div>
      </motion.aside>
    </>
  );
}
