"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, X, GripVertical, ChevronRight, Users,
  Star, Check, MessageCircle, Plus, Minus, Hotel, Moon, ArrowRight, Mail,
  Camera, Sparkles
} from "lucide-react";
import { DEST_ELEVATION, DEST_COORDS } from "@/components/MapRoute";
import { saveItinerary, rememberPhone, recallPhone, normalizePhone } from "@/lib/itineraryStore";

// Leaflet map — loaded client-side only (no SSR)
const MapRoute = dynamic(() => import("@/components/MapRoute"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#f0f0f0", borderRadius: "16px",
      color: "#999", gap: "12px",
    }}>
      <div style={{ fontSize: "28px" }}>🗺️</div>
      <p style={{ fontSize: "13px", margin: 0, fontFamily: "system-ui" }}>Loading Pakistan map…</p>
    </div>
  ),
});

// ─── Types ──────────────────────────────────────────────────────────────────

type DestItem = {
  id: string;
  name: string;
  region: string;
  image: string;
  nights: number;
};

type HotelChoice = Record<string, { stars: 4 | 5; hotel: string }>;

// ─── Static Data ─────────────────────────────────────────────────────────────

const DESTS = [
  { id: "hunza",   name: "Hunza Valley",     region: "Gilgit-Baltistan", image: "/spring-passu.jpg" },
  { id: "skardu",  name: "Skardu",           region: "Gilgit-Baltistan", image: "/autumn-skardu.jpg" },
  { id: "fairy",   name: "Fairy Meadows",    region: "Gilgit-Baltistan", image: "/skardu-machlu.jpg" },
  { id: "naran",   name: "Naran Kaghan",     region: "KPK",              image: "/autumn-kundus.jpg" },
  { id: "swat",    name: "Swat Valley",      region: "KPK",              image: "/spring-swat.jpg" },
  { id: "chitral", name: "Chitral & Kalash", region: "KPK",              image: "/chitral-haldi.jpg" },
  { id: "lahore",  name: "Lahore",           region: "Punjab",           image: "/kalash.jpg" },
  { id: "gilgit",  name: "Gilgit",           region: "Gilgit-Baltistan", image: "/mountains-haldi.jpg" },
  { id: "murree",  name: "Murree",           region: "Punjab",           image: "/autumn-jamalabad.jpg" },
  { id: "ajk",     name: "Azad Kashmir",     region: "AJK",              image: "/autumn-ghuwari.jpg" },
  { id: "deosai",  name: "Deosai Plains",    region: "Gilgit-Baltistan", image: "/autumn-daghoni.jpg" },
  { id: "k2",      name: "K2 Base Camp",     region: "Gilgit-Baltistan", image: "/mountains-haldi2.jpg" },
  { id: "shandur", name: "Shandur Polo",     region: "Chitral / Gilgit", image: "/shandur-polo.jpg" },
  { id: "gwadar",  name: "Gwadar",           region: "Balochistan",      image: "/skardu-katpana.jpg" },
];

const HOTELS: Record<string, { fiveStar: string[]; fourStar: string[] }> = {
  hunza:   { fiveStar: ["Eagle's Nest Hotel, Duikar", "Serena Hunza Hotel"], fourStar: ["Old Hunza Inn", "Hunza Serena Inn", "Karimabad Fort Hotel"] },
  skardu:  { fiveStar: ["Shangrila Resort Hotel", "Pearl Continental Skardu"], fourStar: ["K2 Motel Skardu", "Himalaya Hotel Skardu"] },
  fairy:   { fiveStar: ["Raikot Sarai (Luxury Camp)"], fourStar: ["Fairy Meadows Inn", "Nanga Parbat View Camp"] },
  naran:   { fiveStar: ["Pine Park Hotel Naran"], fourStar: ["PTDC Motel Naran", "Naran View Hotel"] },
  swat:    { fiveStar: ["Pearl Continental Saidu Sharif"], fourStar: ["Miandam Inn", "Green Valley Hotel"] },
  chitral: { fiveStar: ["Mountain Inn Chitral"], fourStar: ["PTDC Motel Chitral", "Rock City Hotel"] },
  lahore:  { fiveStar: ["Pearl Continental Lahore", "Avari Hotel Lahore"], fourStar: ["Ambassador Hotel", "Hotel One Gulberg"] },
  gilgit:  { fiveStar: ["Serena Hotel Gilgit"], fourStar: ["PTDC Motel Gilgit", "Madina Hotel"] },
  murree:  { fiveStar: ["Cecil Hotel Murree", "Pearl Continental Bhurban"], fourStar: ["Shangrila Resort Murree"] },
  ajk:     { fiveStar: ["Greens Hotel Muzaffarabad"], fourStar: ["PTDC Motel Muzaffarabad", "Neelum View Hotel"] },
  deosai:  { fiveStar: ["Deosai Luxury Camp"], fourStar: ["Deosai Plains Camp"] },
  k2:      { fiveStar: ["Concordia Luxury Camp"], fourStar: ["Askole Base Camp Hotel"] },
  shandur: { fiveStar: ["Chitral Serena Hotel"], fourStar: ["PTDC Motel Mastuj", "Shandur Camp"] },
  gwadar:  { fiveStar: ["Pearl Continental Gwadar"], fourStar: ["Holiday Inn Gwadar"] },
};

// ─── Transport Options ────────────────────────────────────────────────────────

const TRANSPORT_OPTIONS = [
  { id: "sedan",   icon: "🚗", label: "Sedan Car",          cap: "1–4 pax",   tag: "ECONOMY",     tagClr: "#22c55e", desc: "Comfortable saloon — ideal for small groups on main highways" },
  { id: "prado",   icon: "🚙", label: "4×4 Prado / SUV",    cap: "1–7 pax",   tag: "MOUNTAIN",   tagClr: "#FFC20A", desc: "Best for mountain terrain — KKH, Deosai & Fairy Meadows" },
  { id: "coaster", icon: "🚐", label: "Coaster (Mini Bus)",  cap: "8–20 pax",  tag: "GROUP",      tagClr: "#60a5fa", desc: "Perfect for mid-size groups — spacious & affordable" },
  { id: "coach",   icon: "🚌", label: "Coach (Full Bus)",    cap: "21–45 pax",  tag: "LARGE GROUP",tagClr: "#a78bfa", desc: "Full-size coach for large groups — maximum comfort" },
  { id: "air",     icon: "✈️", label: "By Air + Transfer",   cap: "Any size",  tag: "FASTEST",    tagClr: "#06b6d4", desc: "Fly into Gilgit / Skardu airport, ground transfers included" },
  { id: "road",    icon: "🛣️", label: "Full Road Journey",   cap: "Any size",  tag: "SCENIC",     tagClr: "#f97316", desc: "Scenic road trip — KKH, Karakoram & Indus Highway" },
];

function suggestTransport(pax: number): string {
  if (pax <= 4)  return "sedan";
  if (pax <= 7)  return "prado";
  if (pax <= 20) return "coaster";
  return "coach";
}


// ─── Helpers ─────────────────────────────────────────────────────────────────

const gold = "linear-gradient(135deg, #FFC20A, #FFD34A)";

// WMO weather code → emoji + short label
function weatherEmoji(code: number): { icon: string; label: string } {
  if (code === 0)          return { icon: "☀️",  label: "Clear" };
  if (code <= 2)           return { icon: "🌤️",  label: "Partly Cloudy" };
  if (code === 3)          return { icon: "☁️",  label: "Overcast" };
  if (code <= 48)          return { icon: "🌫️",  label: "Foggy" };
  if (code <= 55)          return { icon: "🌦️",  label: "Drizzle" };
  if (code <= 65)          return { icon: "🌧️",  label: "Rainy" };
  if (code <= 77)          return { icon: "❄️",  label: "Snowy" };
  if (code <= 82)          return { icon: "🌦️",  label: "Showers" };
  if (code <= 86)          return { icon: "🌨️",  label: "Snow Showers" };
  return                          { icon: "⛈️",  label: "Thunderstorm" };
}

// Short day label from ISO date
function shortDay(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
}

// Weather data type
type WeatherData = {
  temp: number;
  code: number;
  forecast: { date: string; max: number; min: number; code: number }[];
};

function pill(active: boolean) {
  return {
    padding: "12px 18px", borderRadius: "14px", cursor: "pointer",
    border: `1px solid ${active ? "rgba(255,194,10,0.55)" : "rgba(255,255,255,0.07)"}`,
    background: active ? "rgba(255,194,10,0.1)" : "rgba(255,255,255,0.03)",
    display: "flex", alignItems: "center", gap: "12px",
    textAlign: "left" as const, width: "100%", minWidth: 0, overflow: "hidden", transition: "all 0.2s",
  };
}

// ─── Sub: Step Indicator ─────────────────────────────────────────────────────

function Steps({ step }: { step: number }) {
  const labels = ["Route", "Travelers", "Hotels", "Summary"];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "44px", gap: 0 }}>
      {labels.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: done ? "#FFC20A" : active ? "rgba(255,194,10,0.15)" : "rgba(255,255,255,0.05)",
                border: `2px solid ${done || active ? "#FFC20A" : "rgba(255,255,255,0.1)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: done ? "#0B1628" : active ? "#FFC20A" : "rgba(255,255,255,0.25)",
                fontWeight: 800, fontSize: "14px",
              }}>
                {done ? <Check style={{ width: 15, height: 15 }} /> : num}
              </div>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: active ? "#FFC20A" : "rgba(255,255,255,0.25)" }}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ width: "clamp(6px, 5vw, 72px)", height: "1px", marginBottom: "20px", background: step > num + 1 ? "#FFC20A" : "rgba(255,255,255,0.07)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Sub: Night Modal ────────────────────────────────────────────────────────

function NightModal({
  dest, weather, onConfirm, onClose,
}: {
  dest: { id: string; name: string; image: string };
  weather?: WeatherData;
  onConfirm: (n: number) => void;
  onClose: () => void;
}) {
  const [nights, setNights] = useState(2);
  const elev = DEST_ELEVATION[dest.id];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        style={{
          width: "360px", borderRadius: "24px",
          background: "#0D1B2E",
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          boxShadow: "0 48px 96px rgba(0,0,0,0.7)",
        }}
      >
        {/* Photo header */}
        <div style={{ position: "relative", height: "140px" }}>
          <img loading="lazy" decoding="async" src={dest.image} alt={dest.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0D1B2E 0%, transparent 55%)" }} />
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12, width: 30, height: 30,
              borderRadius: "50%", background: "rgba(0,0,0,0.55)",
              border: "none", color: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <X style={{ width: 14, height: 14 }} />
          </button>
          {/* Elevation + live temp badge */}
          <div style={{ position: "absolute", bottom: 14, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <p style={{ color: "white", fontWeight: 900, fontSize: "18px", margin: 0 }}>{dest.name}</p>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
              {elev && (
                <span style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: "12px", padding: "3px 9px", fontSize: "11px", fontWeight: 700, color: "#FFC20A" }}>
                  ⛰ {elev.toLocaleString()}m
                </span>
              )}
              {weather && (
                <span style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderRadius: "12px", padding: "3px 9px", fontSize: "11px", fontWeight: 700, color: "white" }}>
                  {weatherEmoji(weather.code).icon} {weather.temp}°C
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Moon style={{ width: 15, height: 15, color: "#FFC20A" }} />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: 0 }}>
              How many nights in <strong style={{ color: "white" }}>{dest.name}</strong>?
            </p>
          </div>

          {/* Counter */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "28px", padding: "16px 0 20px" }}>
            <button
              onClick={() => setNights(n => Math.max(1, n - 1))}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Minus style={{ width: 16, height: 16 }} />
            </button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, fontWeight: 900, color: "#FFC20A", lineHeight: 1 }}>{nights}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{nights === 1 ? "night" : "nights"}</div>
            </div>
            <button
              onClick={() => setNights(n => Math.min(30, n + 1))}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(255,194,10,0.12)", border: "1px solid rgba(255,194,10,0.35)",
                color: "#FFC20A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Plus style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Quick picks */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "20px" }}>
            {[1, 2, 3, 4, 5, 7, 10].map(n => (
              <button
                key={n}
                onClick={() => setNights(n)}
                style={{
                  padding: "4px 10px", borderRadius: "20px", border: "none",
                  cursor: "pointer", fontSize: "12px", fontWeight: 700,
                  background: nights === n ? "rgba(255,194,10,0.2)" : "rgba(255,255,255,0.05)",
                  color: nights === n ? "#FFC20A" : "rgba(255,255,255,0.35)",
                  outline: nights === n ? "1px solid rgba(255,194,10,0.4)" : "1px solid transparent",
                }}
              >{n}N</button>
            ))}
          </div>

          <button
            onClick={() => onConfirm(nights)}
            style={{
              width: "100%", padding: "15px", borderRadius: "14px",
              background: gold, border: "none",
              color: "#0B1628", fontWeight: 800, fontSize: "15px",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px",
            }}
          >
            Add {nights} {nights === 1 ? "Night" : "Nights"} in {dest.name}
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>

          {/* 7-day weather forecast strip */}
          {weather?.forecast && weather.forecast.length > 0 && (
            <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>7-Day Forecast</p>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "4px" }}>
                {weather.forecast.slice(0, 7).map((day) => (
                  <div key={day.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase" }}>{shortDay(day.date)}</span>
                    <span style={{ fontSize: "18px", lineHeight: 1.2 }}>{weatherEmoji(day.code).icon}</span>
                    <span style={{ fontSize: "10px", color: "white", fontWeight: 700 }}>{day.max}°</span>
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>{day.min}°</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Counter Row ─────────────────────────────────────────────────────────────

function CountRow({ label, sub, value, onDec, onInc }: {
  label: string; sub: string; value: number;
  onDec: () => void; onInc: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div>
        <p style={{ color: "white", fontWeight: 700, fontSize: "15px", margin: "0 0 2px" }}>{label}</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", margin: 0 }}>{sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button onClick={onDec} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Minus style={{ width: 14, height: 14 }} />
        </button>
        <span style={{ color: "#FFC20A", fontWeight: 900, fontSize: "22px", minWidth: "28px", textAlign: "center" }}>{value}</span>
        <button onClick={onInc} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.3)", color: "#FFC20A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Plus style={{ width: 14, height: 14 }} />
        </button>
      </div>
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "14px 22px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
      ← Back
    </button>
  );
}

function NextBtn({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1, padding: "14px", borderRadius: "14px",
        background: disabled ? "rgba(255,255,255,0.05)" : gold,
        border: "none",
        color: disabled ? "rgba(255,255,255,0.3)" : "#0B1628",
        fontWeight: 800, fontSize: "14px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
      }}
    >
      {children}
    </button>
  );
}

// ─── Country dial codes ───────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: "🇵🇰", name: "Pakistan",       dialCode: "+92"  },
  { flag: "🇬🇧", name: "United Kingdom",  dialCode: "+44"  },
  { flag: "🇺🇸", name: "United States",   dialCode: "+1"   },
  { flag: "🇦🇪", name: "UAE",             dialCode: "+971" },
  { flag: "🇸🇦", name: "Saudi Arabia",    dialCode: "+966" },
  { flag: "🇩🇪", name: "Germany",         dialCode: "+49"  },
  { flag: "🇫🇷", name: "France",          dialCode: "+33"  },
  { flag: "🇳🇱", name: "Netherlands",     dialCode: "+31"  },
  { flag: "🇧🇪", name: "Belgium",         dialCode: "+32"  },
  { flag: "🇨🇭", name: "Switzerland",     dialCode: "+41"  },
  { flag: "🇦🇹", name: "Austria",         dialCode: "+43"  },
  { flag: "🇮🇹", name: "Italy",           dialCode: "+39"  },
  { flag: "🇪🇸", name: "Spain",           dialCode: "+34"  },
  { flag: "🇵🇱", name: "Poland",          dialCode: "+48"  },
  { flag: "🇳🇴", name: "Norway",          dialCode: "+47"  },
  { flag: "🇸🇪", name: "Sweden",          dialCode: "+46"  },
  { flag: "🇩🇰", name: "Denmark",         dialCode: "+45"  },
  { flag: "🇨🇦", name: "Canada",          dialCode: "+1"   },
  { flag: "🇦🇺", name: "Australia",       dialCode: "+61"  },
  { flag: "🇿🇦", name: "South Africa",    dialCode: "+27"  },
  { flag: "🇮🇳", name: "India",           dialCode: "+91"  },
  { flag: "🇨🇳", name: "China",           dialCode: "+86"  },
  { flag: "🇯🇵", name: "Japan",           dialCode: "+81"  },
  { flag: "🇰🇷", name: "South Korea",     dialCode: "+82"  },
  { flag: "🇲🇾", name: "Malaysia",        dialCode: "+60"  },
  { flag: "🇸🇬", name: "Singapore",       dialCode: "+65"  },
  { flag: "🇹🇭", name: "Thailand",        dialCode: "+66"  },
  { flag: "🇹🇷", name: "Turkey",          dialCode: "+90"  },
  { flag: "🇷🇺", name: "Russia",          dialCode: "+7"   },
  { flag: "🇶🇦", name: "Qatar",           dialCode: "+974" },
  { flag: "🇰🇼", name: "Kuwait",          dialCode: "+965" },
  { flag: "🇧🇭", name: "Bahrain",         dialCode: "+973" },
  { flag: "🇴🇲", name: "Oman",            dialCode: "+968" },
  { flag: "🇯🇴", name: "Jordan",          dialCode: "+962" },
  { flag: "🇮🇷", name: "Iran",            dialCode: "+98"  },
  { flag: "🇮🇩", name: "Indonesia",       dialCode: "+62"  },
  { flag: "🇵🇭", name: "Philippines",     dialCode: "+63"  },
  { flag: "🇧🇩", name: "Bangladesh",      dialCode: "+880" },
  { flag: "🇳🇿", name: "New Zealand",     dialCode: "+64"  },
] as const;
type Country = typeof COUNTRIES[number];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TourBuilder() {
  const [step, setStep] = useState(1);
  const [route, setRoute] = useState<DestItem[]>([]);
  const [modal, setModal] = useState<{ id: string; name: string; image: string } | null>(null);
  const [maleAdults,   setMaleAdults]   = useState(1);
  const [femaleAdults, setFemaleAdults] = useState(1);
  const [children,    setChildren]     = useState(0);
  const [childAges,   setChildAges]    = useState<number[]>([]);
  const [transport,   setTransport]    = useState("");
  const [departure,   setDeparture]    = useState<"islamabad"|"lahore">("islamabad");

  const totalAdults = maleAdults + femaleAdults;
  const totalPax    = totalAdults + children;
  const suggested   = suggestTransport(totalPax);
  const needs4x4    = route.some(d => ["fairy","deosai","k2","shandur"].includes(d.id));
  const [hotels, setHotels] = useState<HotelChoice>({});
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragTo, setDragTo] = useState<number | null>(null);
  const [weather, setWeather] = useState<Record<string, WeatherData>>({});
  const [guestPhone,    setGuestPhone]    = useState(""); // kept for recall compat
  const [localPhone,    setLocalPhone]    = useState("");
  const [country,       setCountry]       = useState<Country>(COUNTRIES[0]);
  const [ccOpen,        setCcOpen]        = useState(false);
  const [ccSearch,      setCcSearch]      = useState("");
  const [contactMethod, setContactMethod] = useState<"whatsapp"|"email">("whatsapp");
  const [guestEmail,    setGuestEmail]    = useState("");
  const [guestName,     setGuestName]     = useState("");
  const [contactCollected, setContactCollected] = useState(false);
  const [mapExpanded,      setMapExpanded]      = useState(false);
  const [sent,          setSent]          = useState(false);

  // Full E.164 number — handles:
  //   "3001234567"  → "+923248888889"
  //   "03001234567" → "+923248888889"  (strips leading 0)
  //   "+923248888889" → "+923248888889" (user typed full number)
  //   "923248888889"  → "+923248888889" (user omitted +)
  const fullPhone = (() => {
    const raw = localPhone.trim();
    if (!raw) return "";
    if (raw.startsWith("+")) return raw; // already E.164
    const dialDigits = country.dialCode.replace("+", "");
    if (raw.startsWith(dialDigits)) return "+" + raw; // e.g. 923248888889
    return country.dialCode + raw.replace(/^0+/, "");  // normal local number
  })();

  // Recall phone number from previous session
  useEffect(() => {
    const p = recallPhone();
    if (!p) return;
    // If stored as full E.164 (starts +), just put it raw — fullPhone derivation handles it
    setLocalPhone(p);
  }, []);

  // ── Load saved itinerary from MyTripsPanel ────────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const it = (e as CustomEvent).detail;
      if (!it) return;
      setRoute((it.route ?? []).map((r: { id: string; name: string; region: string; image: string; nights: number }) => ({
        id: r.id, name: r.name, region: r.region, image: r.image, nights: r.nights,
      })));
      setMaleAdults(it.maleAdults   ?? 1);
      setFemaleAdults(it.femaleAdults ?? 1);
      setChildren(it.children  ?? 0);
      setChildAges(it.childAges ?? []);
      setTransport(it.transport ?? "");
      setDeparture(it.departure ?? "islamabad");
      setHotels(it.hotels ?? {});
      setGuestPhone(it.phone   ?? "");
      setSent(false);
      setStep(1); // start at Step 1 — Route tab with the map
    };
    window.addEventListener("travelbug:load-itinerary", handler);
    return () => window.removeEventListener("travelbug:load-itinerary", handler);
  }, []);

  // ── Fetch live weather for all destinations on mount ─────────────────────

  useEffect(() => {
    DESTS.forEach(async (d) => {
      const coords = DEST_COORDS[d.id];
      if (!coords) return;
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
        const res  = await fetch(url);
        const data = await res.json();
        const forecast = (data.daily?.time ?? []).map((date: string, i: number) => ({
          date,
          max:  Math.round(data.daily?.temperature_2m_max?.[i] ?? 0),
          min:  Math.round(data.daily?.temperature_2m_min?.[i] ?? 0),
          code: data.daily?.weather_code?.[i] ?? 0,
        }));
        const temp = Math.round(data.current?.temperature_2m ?? 0);
        const code = data.current?.weather_code as number ?? 0;
        if (!data.current) return; // skip if API didn't return current data
        setWeather(prev => ({
          ...prev,
          [d.id]: { temp, code, forecast },
        }));
      } catch { /* silently fail — weather is supplementary */ }
    });
  }, []);


  const totalNights = route.reduce((s, d) => s + d.nights, 0);
  const allHotelsSelected = route.length > 0 && route.every(d => hotels[d.id]);

  // Destination click
  const clickDest = (d: typeof DESTS[0]) => {
    if (route.find(r => r.id === d.id)) {
      setRoute(r => r.filter(x => x.id !== d.id));
      setHotels(h => { const n = { ...h }; delete n[d.id]; return n; });
    } else {
      setModal({ id: d.id, name: d.name, image: d.image });
    }
  };

  const confirmNights = (nights: number) => {
    if (!modal) return;
    const dest = DESTS.find(d => d.id === modal.id)!;
    setRoute(r => [...r, { ...dest, nights }]);
    setModal(null);
  };

  // Drag
  const doDragEnd = () => {
    if (dragFrom !== null && dragTo !== null && dragFrom !== dragTo) {
      const next = [...route];
      const [moved] = next.splice(dragFrom, 1);
      next.splice(dragTo, 0, moved);
      setRoute(next);
    }
    setDragFrom(null);
    setDragTo(null);
  };

  // Children
  const addChild = () => { setChildren(c => c + 1); setChildAges(a => [...a, 5]); };
  const removeChild = () => {
    if (children === 0) return;
    setChildren(c => c - 1);
    setChildAges(a => a.slice(0, -1));
  };

  // Hotels
  const pickHotel = (destId: string, stars: 4 | 5, hotel: string) =>
    setHotels(h => ({ ...h, [destId]: { stars, hotel } }));

  // Navigate between steps and always scroll back to the top of the builder
  const goToStep = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => {
      document.getElementById("tour-builder")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // WhatsApp + auto-save itinerary
  const sendToWhatsApp = () => {
    const phone = fullPhone || guestPhone.trim();
    const lines = [
      `Hi TravelBug! I'd like to plan a custom tour.${phone ? ` My WhatsApp: ${phone}` : ""}\n`,
      "🗺 ROUTE:",
      ...route.map((d, i) => `${i + 1}. ${d.name} — ${d.nights} nights`),
      "",
      `👥 TRAVELERS: ${maleAdults} male · ${femaleAdults} female${children > 0 ? ` · ${children} child${children !== 1 ? "ren" : ""} (ages: ${childAges.join(", ")})` : ""} · Total: ${totalPax} pax`,
      `🚗 TRANSPORT: ${TRANSPORT_OPTIONS.find(t => t.id === transport)?.label ?? "TBD"}`,
      `🏙️ DEPARTURE: ${departure === "islamabad" ? "Islamabad" : "Lahore"}`,
      "",
      "🏨 HOTELS:",
      ...route.map(d => `  • ${d.name}: ${hotels[d.id]?.hotel ?? "TBD"} (${hotels[d.id]?.stars ?? "?"}★)`),
      "",
      `📅 Total: ${totalNights} nights`,
    ];

    // Auto-save itinerary to localStorage
    if (phone) {
      rememberPhone(phone);
      saveItinerary({
        id: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2),
        phone: normalizePhone(phone),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tripName: route.map(d => d.name).join(" · "),
        route: route.map(d => ({ id: d.id, name: d.name, region: d.region, image: d.image, nights: d.nights })),
        maleAdults, femaleAdults, children, childAges,
        transport, departure,
        hotels: hotels as Record<string, { stars: 4 | 5; hotel: string }>,
        totalNights,
        status: "pending",
      });
    }

    setSent(true);
    window.open(`https://wa.me/923344334411?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  };

  // Email enquiry
  const sendEmail = () => {
    const phone = fullPhone || guestPhone.trim();
    const subject = encodeURIComponent("Tour Enquiry — " + (route.map(d => d.name).join(" · ") || "Custom Tour"));
    const bodyLines = [
      "Hi TravelBug Team," + (guestEmail ? " My email: " + guestEmail : "") + (phone ? "  |  WhatsApp: " + phone : ""),
      "",
      "ROUTE:",
      ...route.map((d, i) => (i+1) + ". " + d.name + " — " + d.nights + " nights"),
      "",
      "TRAVELERS: " + maleAdults + " male · " + femaleAdults + " female" + (children > 0 ? " · " + children + " child(ren)" : "") + " · Total: " + totalPax + " pax",
      "TRANSPORT: " + (TRANSPORT_OPTIONS.find(t => t.id === transport)?.label ?? "TBD"),
      "DEPARTURE: " + (departure === "islamabad" ? "Islamabad" : "Lahore"),
      "",
      "HOTELS:",
      ...route.map(d => "  • " + d.name + ": " + (hotels[d.id]?.hotel ?? "TBD") + " (" + (hotels[d.id]?.stars ?? "?") + "★)"),
      "",
      "Total: " + totalNights + " nights",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));

    // Save itinerary to localStorage
    const phone2 = fullPhone || guestPhone.trim();
    if (phone2 || guestEmail) {
      const contactKey = phone2 ? normalizePhone(phone2) : ("email:" + guestEmail.trim().toLowerCase());
      rememberPhone(phone2 || guestEmail);
      saveItinerary({
        id: Date.now().toString(36) + '-' + Math.random().toString(36).slice(2),
        phone: contactKey,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tripName: route.map(d => d.name).join(" · "),
        route: route.map(d => ({ id: d.id, name: d.name, region: d.region, image: d.image, nights: d.nights })),
        maleAdults, femaleAdults, children, childAges,
        transport, departure,
        hotels: hotels as Record<string, { stars: 4 | 5; hotel: string }>,
        totalNights,
        status: "pending",
      });
    }

    setSent(true);
    window.open("mailto:Info@travelbug.pk?subject=" + subject + "&body=" + body, "_blank");
  };

  // ─── Card wrapper shared style ─────────────────────────────────────────────
  const card: React.CSSProperties = {
    borderRadius: "20px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    padding: "36px 40px",
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Night modal renders OUTSIDE section, at root level */}
      <AnimatePresence>
        {modal && (
          <NightModal
            dest={modal}
            weather={weather[modal.id]}
            onConfirm={confirmNights}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      <section id="tour-builder" style={{ padding: "80px 0 80px", background: "linear-gradient(180deg, #070E1C 0%, #060B18 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

          {/* ── Tour Builder Header ─────────────────────────────────────── */}
          <div className="tb-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>
              Design Your Journey
            </p>
            <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, marginBottom: "12px" }}>
              Build Your <span style={{ color: "#FFC20A" }}>Custom Tour</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
              Click destinations → set nights → drag to reorder → choose hotels → we&apos;ll plan it all.
            </p>
          </div>

          {/* ─── STEP 0: Contact Gate ─── */}
          {!contactCollected && (
            <div className="tb-form-wrap">
              <div style={{ borderRadius: "24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,194,10,0.2)", padding: "40px 36px" }}>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗺️</div>
                  <h3 style={{ color: "white", fontWeight: 900, fontSize: "20px", margin: "0 0 6px" }}>Let&apos;s Start Planning!</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>Leave your contact so we can follow up and craft your perfect trip.</p>
                </div>

                {/* Name */}
                <div style={{ marginBottom: "14px" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Your Name (optional)</p>
                  <input type="text" placeholder="e.g. Ali Khan" value={guestName} onChange={e => setGuestName(e.target.value)}
                    style={{ width: "100%", padding: "13px 14px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "white", fontSize: "14px", fontWeight: 600, outline: "none", boxSizing: "border-box" }} />
                </div>

                {/* Contact method */}
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Contact (required) *</p>
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    {(["whatsapp", "email"] as const).map(m => (
                      <button key={m} type="button" onClick={() => setContactMethod(m)}
                        style={{ flex: 1, padding: "10px", borderRadius: "12px", fontWeight: 800, fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", border: contactMethod === m ? "1px solid rgba(255,194,10,0.5)" : "1px solid rgba(255,255,255,0.08)", background: contactMethod === m ? "rgba(255,194,10,0.1)" : "rgba(255,255,255,0.02)", color: contactMethod === m ? "#FFC20A" : "rgba(255,255,255,0.4)", transition: "all 0.2s" }}>
                        {m === "whatsapp" ? <><MessageCircle style={{ width: 13, height: 13 }} /> WhatsApp</> : <><Mail style={{ width: 13, height: 13 }} /> Email</>}
                      </button>
                    ))}
                  </div>

                  {contactMethod === "whatsapp" && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <button type="button" onClick={() => { setCcOpen(o => !o); setCcSearch(""); }}
                          style={{ height: "100%", minHeight: 48, padding: "0 12px", borderRadius: "14px", border: `1px solid ${ccOpen ? "rgba(255,194,10,0.5)" : "rgba(255,255,255,0.1)"}`, background: "rgba(255,255,255,0.04)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontWeight: 700, fontSize: "12px", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: "16px" }}>{country.flag}</span>
                          <span style={{ color: "#FFC20A" }}>{country.dialCode}</span>
                          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>&#9662;</span>
                        </button>
                        {ccOpen && (
                          <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 200, width: 240, maxHeight: 260, overflowY: "auto", background: "#0D1B2E", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 16px 48px rgba(0,0,0,0.6)", padding: "8px" }}>
                            <input autoFocus type="text" placeholder="Search country..." value={ccSearch} onChange={e => setCcSearch(e.target.value)} onClick={e => e.stopPropagation()} style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: "12px", outline: "none", marginBottom: "6px", boxSizing: "border-box" }} />
                            {COUNTRIES.filter(c => c.name.toLowerCase().includes(ccSearch.toLowerCase()) || c.dialCode.includes(ccSearch)).map(c => (
                              <button key={c.name} type="button" onClick={() => { setCountry(c); setCcOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "10px", background: country.name === c.name ? "rgba(255,194,10,0.1)" : "transparent", border: "1px solid transparent", cursor: "pointer", textAlign: "left" }}>
                                <span style={{ fontSize: "15px" }}>{c.flag}</span>
                                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", flex: 1 }}>{c.name}</span>
                                <span style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700 }}>{c.dialCode}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {ccOpen && <div onClick={() => setCcOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />}
                      </div>
                      <input type="tel" placeholder="3XX XXXXXXX" value={localPhone} onChange={e => { setLocalPhone(e.target.value); setGuestPhone(e.target.value); }}
                        style={{ flex: 1, padding: "13px 14px", borderRadius: "14px", border: `1px solid ${localPhone ? "rgba(255,194,10,0.4)" : "rgba(255,255,255,0.1)"}`, background: "rgba(255,255,255,0.04)", color: "white", fontSize: "14px", fontWeight: 700, outline: "none" }} />
                    </div>
                  )}

                  {contactMethod === "email" && (
                    <input type="email" placeholder="your@email.com" value={guestEmail} onChange={e => setGuestEmail(e.target.value)}
                      style={{ width: "100%", padding: "13px 14px", borderRadius: "14px", border: `1px solid ${guestEmail ? "rgba(255,194,10,0.4)" : "rgba(255,255,255,0.1)"}`, background: "rgba(255,255,255,0.04)", color: "white", fontSize: "14px", fontWeight: 600, outline: "none", boxSizing: "border-box" }} />
                  )}
                </div>

                <button type="button"
                  onClick={() => {
                    const hasContact = contactMethod === "whatsapp" ? !!localPhone.trim() : !!guestEmail.trim();
                    if (!hasContact) return;
                    if (localPhone.trim()) rememberPhone(fullPhone || localPhone);
                    setContactCollected(true);
                  }}
                  style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "linear-gradient(135deg, #FFC20A, #FFD34A)", border: "none", color: "#0B1628", fontWeight: 900, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  Start Planning your Trip &#8594;
                </button>
              </div>
            </div>
          )}



          {contactCollected && <Steps step={step} />}

          {/* ─── STEP 1: Route builder ─── */}
          {step === 1 && contactCollected && (
            <div className="tb-step1-grid">

              {/* Destination grid */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "14px" }}>
                  <MapPin style={{ width: 13, height: 13, display: "inline", marginRight: 5 }} />
                  Click a destination to add it — click again to remove
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "10px" }}>
                  {DESTS.map(d => {
                    const selected = !!route.find(r => r.id === d.id);
                    const w = weather[d.id];
                    return (
                      <button key={d.id} onClick={() => clickDest(d)} style={pill(selected)}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
                          <img loading="lazy" decoding="async" src={d.image} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={e => { (e.target as HTMLImageElement).style.background = "#1a2740"; }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: selected ? "#FFC20A" : "white", fontWeight: 700, fontSize: "13px", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", margin: 0, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.region}</p>
                            {w && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", flexShrink: 0, whiteSpace: "nowrap" }}>{weatherEmoji(w.code).icon} {w.temp}°C</span>}
                          </div>
                        </div>
                        {selected && <Check style={{ width: 14, height: 14, color: "#FFC20A", flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Route sidebar */}
              <div className="tb-map-col" style={{ position: "sticky", top: "100px" }}>
                <div style={{ borderRadius: "20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "24px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <MapPin style={{ width: 16, height: 16, color: "#FFC20A" }} />
                    <p style={{ color: "white", fontWeight: 800, fontSize: "14px", margin: 0 }}>Your Route</p>
                    <span style={{ marginLeft: "auto", color: "#FFC20A", fontSize: "12px", fontWeight: 700 }}>{totalNights}N</span>
                  </div>

                  {route.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", textAlign: "center", padding: "24px 0" }}>Select destinations →</p>
                  ) : (
                    <div>
                      {route.map((d, i) => (
                        <div
                          key={d.id}
                          draggable
                          onDragStart={() => setDragFrom(i)}
                          onDragEnter={() => setDragTo(i)}
                          onDragEnd={doDragEnd}
                          onDragOver={e => e.preventDefault()}
                          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px", borderRadius: "10px", marginBottom: "6px", background: dragTo === i ? "rgba(255,194,10,0.07)" : "transparent", border: "1px solid transparent", transition: "all 0.15s", cursor: "grab" }}
                        >
                          <GripVertical style={{ width: 14, height: 14, color: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                          <img loading="lazy" decoding="async" src={d.image} alt={d.name} style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover", flexShrink: 0 }} />
                          <span style={{ flex: 1, color: "white", fontSize: "12px", fontWeight: 700 }}>{d.name}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Moon style={{ width: 11, height: 11, color: "#FFC20A" }} />
                            <span style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700 }}>{d.nights}</span>
                          </div>
                          <button onClick={() => clickDest(d)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.25)", padding: "2px" }}>
                            <X style={{ width: 12, height: 12 }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {route.length >= 1 && (
                    <button onClick={() => goToStep(2)} style={{ width: "100%", marginTop: "14px", padding: "13px", borderRadius: "14px", background: gold, border: "none", color: "#0B1628", fontWeight: 800, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                      Continue — {route.length} stop{route.length !== 1 ? "s" : ""} · {totalNights}N <ChevronRight style={{ width: 15, height: 15 }} />
                    </button>
                  )}
                </div>

                {/* Map — visible in Step 1 on desktop, click to expand (hidden on mobile) */}
                <div
                  className="tb-map"
                  onClick={() => setMapExpanded(true)}
                  style={{ borderRadius: "20px", overflow: "hidden", height: "280px", marginTop: "0", cursor: "pointer", position: "relative" }}
                >
                  <MapRoute route={route} />
                  {/* Expand hint overlay */}
                  <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(7,14,28,0.75)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "6px 12px", display: "flex", alignItems: "center", gap: "6px", pointerEvents: "none" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    <span style={{ color: "white", fontSize: "10px", fontWeight: 700 }}>Click to expand</span>
                  </div>
                </div>

                {/* Full-screen map modal */}
                {mapExpanded && (
                  <div
                    onClick={() => setMapExpanded(false)}
                    style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}
                  >
                    <div
                      onClick={e => e.stopPropagation()}
                      style={{ width: "min(95vw, 1100px)", height: "min(85vh, 700px)", borderRadius: "24px", overflow: "hidden", position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
                    >
                      <MapRoute route={route} />
                      {/* Close button */}
                      <button
                        onClick={() => setMapExpanded(false)}
                        style={{ position: "absolute", top: 14, right: 14, zIndex: 10, width: 36, height: 36, borderRadius: "50%", background: "rgba(7,14,28,0.85)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <X style={{ width: 16, height: 16 }} />
                      </button>
                      {/* Route label */}
                      {route.length > 0 && (
                        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 10, background: "rgba(7,14,28,0.85)", border: "1px solid rgba(255,194,10,0.3)", borderRadius: "12px", padding: "8px 14px" }}>
                          <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 800, margin: 0 }}>
                            {route.map(d => d.name).join(" → ")}
                          </p>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", margin: "2px 0 0" }}>
                            {totalNights} nights · {route.length} stop{route.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      )}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginTop: "16px" }}>Click anywhere outside to close</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP 2: Travelers & Transport ─── */}
          {step === 2 && contactCollected && (
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={{ borderRadius: "20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "36px 40px" }}>

                {/* Travelers */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users style={{ width: 20, height: 20, color: "#FFC20A" }} />
                  </div>
                  <div>
                    <h3 style={{ color: "white", fontWeight: 900, fontSize: "19px", margin: 0 }}>Group Composition</h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>Tell us who&apos;s travelling</p>
                  </div>
                </div>

                {/* Male / Female adults */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "12px", marginBottom: "20px" }}>
                  {[{ label: "Male Adults 👨", val: maleAdults, set: setMaleAdults }, { label: "Female Adults 👩", val: femaleAdults, set: setFemaleAdults }].map(({ label, val, set }) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px" }}>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 700, marginBottom: "12px" }}>{label}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button type="button" onClick={() => set(v => Math.max(0, v - 1))} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus style={{ width: 13, height: 13 }} /></button>
                        <span style={{ color: "white", fontWeight: 900, fontSize: "22px", minWidth: "24px", textAlign: "center" }}>{val}</span>
                        <button type="button" onClick={() => set(v => v + 1)} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,194,10,0.15)", border: "1px solid rgba(255,194,10,0.3)", color: "#FFC20A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus style={{ width: 13, height: 13 }} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Children */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "16px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: children > 0 ? "12px" : 0 }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 700, margin: 0 }}>Children 👧 (under 12)</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button type="button" onClick={removeChild} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus style={{ width: 11, height: 11 }} /></button>
                      <span style={{ color: "white", fontWeight: 900, fontSize: "18px" }}>{children}</span>
                      <button type="button" onClick={addChild} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,194,10,0.15)", border: "1px solid rgba(255,194,10,0.3)", color: "#FFC20A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus style={{ width: 11, height: 11 }} /></button>
                    </div>
                  </div>
                  {children > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {childAges.map((age, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "6px 10px" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Child {i + 1}:</span>
                          <select value={age} onChange={e => { const a = [...childAges]; a[i] = +e.target.value; setChildAges(a); }} style={{ background: "transparent", border: "none", color: "#FFC20A", fontWeight: 700, fontSize: "12px", outline: "none", cursor: "pointer" }}>
                            {Array.from({ length: 12 }, (_, k) => <option key={k} value={k + 1} style={{ background: "#0D1B2E" }}>{k + 1} yr</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Smart suggest */}
                {totalPax > 0 && (
                  <div style={{ padding: "10px 14px", borderRadius: "12px", background: "rgba(255,194,10,0.05)", border: "1px solid rgba(255,194,10,0.15)", marginBottom: "20px" }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", margin: 0 }}>
                      Based on your group of {totalPax}, we recommend:{" "}
                      <span style={{ color: "#FFC20A", fontWeight: 800 }}>{TRANSPORT_OPTIONS.find(t => t.id === suggested)?.label}</span>
                    </p>
                  </div>
                )}

                {/* Transport grid */}
                <div style={{ marginBottom: "24px" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "14px" }}>Select Transport</p>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "10px" }}>
                    {TRANSPORT_OPTIONS.map(t => {
                      const sel = transport === t.id;
                      return (
                        <button key={t.id} type="button" onClick={() => setTransport(t.id)}
                          style={{ borderRadius: "16px", padding: "18px", border: `1px solid ${sel ? "rgba(255,194,10,0.6)" : "rgba(255,255,255,0.06)"}`, background: sel ? "rgba(255,194,10,0.08)" : "rgba(255,255,255,0.02)", cursor: "pointer", textAlign: "left", position: "relative" }}>
                          {sel && <div style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: "50%", background: "#FFC20A", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 11, height: 11, color: "#0B1628" }} /></div>}
                          <div style={{ fontSize: "26px", marginBottom: "8px" }}>{t.icon}</div>
                          <p style={{ color: sel ? "#FFC20A" : "white", fontWeight: 800, fontSize: "14px", margin: "0 0 4px" }}>{t.label}</p>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: "0 0 10px", lineHeight: 1.4 }}>{t.desc}</p>
                          <span style={{ background: `${t.tagClr}18`, color: t.tagClr, fontSize: "9px", fontWeight: 800, letterSpacing: "0.1em", padding: "4px 10px", borderRadius: "20px", border: `1px solid ${t.tagClr}40` }}>{t.tag} · {t.cap}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Needs 4x4 warning */}
                {needs4x4 && transport && !["prado","air"].includes(transport) && (
                  <div style={{ padding: "10px 14px", borderRadius: "12px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", marginBottom: "20px" }}>
                    <p style={{ color: "#ef4444", fontSize: "11px", margin: 0, fontWeight: 700 }}>⚠️ Your route includes a 4×4-only destination. We recommend upgrading to Prado / SUV.</p>
                  </div>
                )}

                {/* Departure */}
                <div style={{ marginBottom: "28px" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Departure City</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {(["islamabad", "lahore"] as const).map(city => (
                      <button key={city} type="button" onClick={() => setDeparture(city)}
                        style={{ flex: 1, padding: "12px", borderRadius: "14px", border: `1px solid ${departure === city ? "rgba(255,194,10,0.5)" : "rgba(255,255,255,0.08)"}`, background: departure === city ? "rgba(255,194,10,0.1)" : "rgba(255,255,255,0.02)", color: departure === city ? "#FFC20A" : "rgba(255,255,255,0.5)", fontWeight: 800, fontSize: "13px", cursor: "pointer" }}>
                        {city === "islamabad" ? "🏙️ Islamabad" : "🌆 Lahore"}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button type="button" onClick={() => goToStep(1)} style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700 }}>←</button>
                  <button type="button" onClick={() => goToStep(3)} disabled={totalAdults < 1 || !transport}
                    style={{ flex: 1, padding: "14px", borderRadius: "14px", background: totalAdults < 1 || !transport ? "rgba(255,255,255,0.05)" : gold, border: "none", color: totalAdults < 1 || !transport ? "rgba(255,255,255,0.25)" : "#0B1628", fontWeight: 800, fontSize: "14px", cursor: totalAdults < 1 || !transport ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    Choose Hotels <ChevronRight style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Hotels ─── */}
          {step === 3 && contactCollected && (
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={{ borderRadius: "20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "36px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Hotel style={{ width: 20, height: 20, color: "#FFC20A" }} />
                  </div>
                  <div>
                    <h3 style={{ color: "white", fontWeight: 900, fontSize: "19px", margin: 0 }}>Hotel Preferences</h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>Choose accommodation for each destination</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {route.map(dest => {
                    const h = HOTELS[dest.id] ?? { fiveStar: [], fourStar: [] };
                    const chosen = hotels[dest.id];
                    return (
                      <div key={dest.id} style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <img loading="lazy" decoding="async" src={dest.image} alt={dest.name} style={{ width: 34, height: 34, borderRadius: 9, objectFit: "cover" }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ color: "white", fontWeight: 800, fontSize: "14px", margin: "0 0 2px" }}>{dest.name}</p>
                            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", margin: 0 }}>{dest.nights} night{dest.nights !== 1 ? "s" : ""}</p>
                          </div>
                          {chosen && <span style={{ background: "rgba(255,194,10,0.12)", border: "1px solid rgba(255,194,10,0.3)", color: "#FFC20A", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px" }}>✓ Selected</span>}
                        </div>
                        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                          {([5, 4] as const).flatMap(stars =>
                            (stars === 5 ? h.fiveStar : h.fourStar).map(name => (
                              <button type="button" key={name}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const sy = window.scrollY;
                                  pickHotel(dest.id, stars, name);
                                  requestAnimationFrame(() => window.scrollTo({ top: sy, behavior: "instant" as ScrollBehavior }));
                                }}
                                style={{ padding: "11px 14px", borderRadius: "12px", background: chosen?.hotel === name ? "rgba(255,194,10,0.1)" : "rgba(255,255,255,0.02)", border: `1px solid ${chosen?.hotel === name ? "rgba(255,194,10,0.4)" : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div style={{ display: "flex", gap: "2px" }}>
                                    {Array.from({ length: stars }).map((_, k) => <Star key={k} style={{ width: 10, height: 10, fill: "#FFC20A", color: "#FFC20A" }} />)}
                                  </div>
                                  <span style={{ color: chosen?.hotel === name ? "#FFC20A" : "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: 600 }}>{name}</span>
                                </div>
                                {chosen?.hotel === name && <Check style={{ width: 14, height: 14, color: "#FFC20A" }} />}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                  <button type="button" onClick={() => goToStep(2)} style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700 }}>←</button>
                  <button type="button" onClick={() => goToStep(4)} disabled={!allHotelsSelected}
                    style={{ flex: 1, padding: "14px", borderRadius: "14px", background: !allHotelsSelected ? "rgba(255,255,255,0.05)" : gold, border: "none", color: !allHotelsSelected ? "rgba(255,255,255,0.25)" : "#0B1628", fontWeight: 800, fontSize: "14px", cursor: !allHotelsSelected ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    {allHotelsSelected ? <>Review &amp; Confirm <ChevronRight style={{ width: 16, height: 16 }} /></> : `Select hotels for all ${route.length} stops`}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 4: Summary ─── */}
          {step === 4 && contactCollected && (
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={{ borderRadius: "20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", padding: "36px 40px" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight style={{ width: 20, height: 20, color: "#FFC20A" }} />
                  </div>
                  <div>
                    <h3 style={{ color: "white", fontWeight: 900, fontSize: "19px", margin: 0 }}>Your Trip Summary</h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>Review and send</p>
                  </div>
                </div>

                {/* Route list */}
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>Route</p>
                  {route.map((d, i) => (
                    <div key={d.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#FFC20A", color: "#0B1628", fontSize: "10px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                      <img loading="lazy" decoding="async" src={d.image} alt={d.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }} />
                      <span style={{ flex: 1, color: "white", fontSize: "13px", fontWeight: 700 }}>{d.name}</span>
                      <span style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700 }}>{d.nights}N</span>
                    </div>
                  ))}
                </div>

                {/* Travelers + Hotels grid */}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "12px", marginBottom: "24px" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "16px" }}>
                    <p style={{ color: "#FFC20A", fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Travelers</p>
                    <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: "0 0 3px" }}>👨 {maleAdults} Male · 👩 {femaleAdults} Female</p>
                    {children > 0 && <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", margin: "0 0 3px" }}>👧 {children} Child{children !== 1 ? "ren" : ""} · Ages: {childAges.join(", ")}</p>}
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", margin: "0 0 3px" }}>🚗 {TRANSPORT_OPTIONS.find(t => t.id === transport)?.label ?? "—"}</p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", margin: 0 }}>🏙️ From {departure === "islamabad" ? "Islamabad" : "Lahore"}</p>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "16px" }}>
                    <p style={{ color: "#FFC20A", fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Hotels</p>
                    {route.map(d => hotels[d.id] && (
                      <p key={d.id} style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", margin: "0 0 3px" }}>{d.name}: {hotels[d.id].stars}★</p>
                    ))}
                  </div>
                </div>

                {/* Contact chip */}
                <div style={{ marginBottom: "16px", padding: "14px 16px", borderRadius: "16px", background: "rgba(255,194,10,0.06)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(255,194,10,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {contactMethod === "whatsapp" ? <MessageCircle style={{ width: 15, height: 15, color: "#FFC20A" }} /> : <Mail style={{ width: 15, height: 15, color: "#FFC20A" }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "9px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 3px" }}>
                      Sending via {contactMethod === "whatsapp" ? "WhatsApp" : "Email"}
                    </p>
                    <p style={{ color: "#FFC20A", fontWeight: 800, fontSize: "13px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {contactMethod === "whatsapp" ? (fullPhone || localPhone) : guestEmail}
                      {guestName && <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600 }}> &nbsp;&middot;&nbsp; {guestName}</span>}
                    </p>
                  </div>
                  <button type="button" onClick={() => { setContactCollected(false); setSent(false); }}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, cursor: "pointer", flexShrink: 0, padding: "4px 8px", borderRadius: "8px" }}>Edit</button>
                </div>

                {/* Sent success message */}
                {sent && (
                  <div style={{ background: contactMethod === "email" ? "rgba(255,194,10,0.08)" : "rgba(37,211,102,0.08)", border: `1px solid ${contactMethod === "email" ? "rgba(255,194,10,0.25)" : "rgba(37,211,102,0.25)"}`, borderRadius: "14px", padding: "12px 16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>{contactMethod === "email" ? "📧" : "✅"}</span>
                    <div>
                      <p style={{ color: contactMethod === "email" ? "#FFC20A" : "#22c55e", fontWeight: 800, fontSize: "13px", margin: "0 0 2px" }}>{contactMethod === "email" ? "Email Sent!" : "Itinerary sent!"}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: 0 }}>
                        {contactMethod === "email"
                          ? "Thank you for your inquiry! Our team will contact you soon—let’s make your trip memorable."
                          : (fullPhone ? "Saved to My Trips — click the button in the top navbar to view." : "Enter your number above to save for later.")}
                      </p>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="button" onClick={() => goToStep(3)} style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700 }}>←</button>
                  <button
                    onClick={contactMethod === "whatsapp" ? sendToWhatsApp : sendEmail}
                    style={{ flex: 1, padding: "14px", borderRadius: "14px", background: sent ? (contactMethod === "email" ? "linear-gradient(135deg, #a16207, #713f12)" : "linear-gradient(135deg, #128C7E, #0a6159)") : (contactMethod === "email" ? "linear-gradient(135deg, #FFC20A, #FFD34A)" : "linear-gradient(135deg, #25D366, #128C7E)"), border: "none", color: contactMethod === "email" && !sent ? "#0B1628" : "white", fontWeight: 800, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: contactMethod === "email" ? "0 8px 24px rgba(255,194,10,0.2)" : "0 8px 24px rgba(37,211,102,0.25)" }}
                  >
                    {contactMethod === "whatsapp"
                      ? <><MessageCircle style={{ width: 18, height: 18 }} />{sent ? "Resend to TravelBug" : "Send to TravelBug on WhatsApp"}</>
                      : <><Mail style={{ width: 18, height: 18 }} />{sent ? "Resend Email" : "Send Enquiry via Email"}</>
                    }
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
