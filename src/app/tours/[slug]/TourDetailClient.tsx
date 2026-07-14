"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Clock, Users, ArrowLeft, Check, X, MapPin,
  ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp,
  Mountain, Compass, Camera,
} from "lucide-react";
import { Tour } from "@/types";

/* ─── tiny style helpers ─────────────────────────────── */
const card = {
  borderRadius: "24px",
  padding: "40px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
} as React.CSSProperties;

const sectionLabel = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.15em",
  color: "#FFC20A",
  marginBottom: "10px",
};

const sectionTitle = {
  color: "white",
  fontWeight: 800,
  fontSize: "22px",
  margin: 0,
} as React.CSSProperties;

/* ─── component ──────────────────────────────────────── */
export default function TourDetailClient({ tour }: { tour: Tour }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [openDay, setOpenDay] = useState<number | null>(1);

  const images = tour.images?.length ? tour.images : [tour.image];
  const prevImg = () => setImgIndex((p) => (p - 1 + images.length) % images.length);
  const nextImg = () => setImgIndex((p) => (p + 1) % images.length);

  const diffColor =
    tour.difficulty === "Easy" ? "#4ade80" :
    tour.difficulty === "Moderate" ? "#facc15" : "#f87171";

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "100px" }}>

      {/* Back link */}
      <div style={{ paddingTop: "130px" }} className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pb-8">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#FFC20A] text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Destinations
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
          className="lg:grid-cols-3">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

            {/* ── Hero Image ── */}
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{ width: "100%", maxWidth: "620px", aspectRatio: "16/9", margin: "0 auto" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src={images[imgIndex]} alt={tour.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Difficulty */}
              <div className="absolute top-5 right-5 px-4 py-2 rounded-full backdrop-blur-md border text-xs font-bold uppercase tracking-widest"
                style={{ background: `${diffColor}20`, borderColor: `${diffColor}40`, color: diffColor }}>
                {tour.difficulty}
              </div>

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} id="img-prev"
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 flex items-center justify-center transition-all border border-white/10">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImg} id="img-next"
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 flex items-center justify-center transition-all border border-white/10">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setImgIndex(i)}
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: i === imgIndex ? "28px" : "7px", background: i === imgIndex ? "#FFC20A" : "rgba(255,255,255,0.35)" }}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* ── Title + Meta ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 style={{ fontSize: "clamp(2rem,5vw,3.25rem)", fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: "14px" }}>
                {tour.title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.45)", marginBottom: "40px" }}>
                <MapPin style={{ width: "16px", height: "16px", color: "#FFC20A", flexShrink: 0 }} />
                <span style={{ fontSize: "15px" }}>{tour.destination}, {tour.country}</span>
              </div>

              {/* Meta cards */}
              <div className="td-info-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "12px" }}>
                {[
                  { icon: Clock,    label: "Duration",   value: `${tour.duration} Days` },
                  { icon: Users,    label: "Group Size", value: `Max ${tour.maxGroupSize}` },
                  { icon: Calendar, label: "Season",     value: "Jun – Sep" },
                  { icon: Mountain, label: "Difficulty", value: tour.difficulty },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{
                    borderRadius: "16px", padding: "20px 18px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", flexDirection: "column", gap: "10px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "rgba(255,255,255,0.38)" }}>
                      <Icon style={{ width: "13px", height: "13px", color: "#FFC20A" }} />
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>{label}</span>
                    </div>
                    <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── About ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              style={card}
            >
              <div style={{ marginBottom: "24px" }}>
                <span style={sectionLabel}>✦ Overview</span>
                <h2 style={sectionTitle}>About This Destination</h2>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: "15px", margin: 0 }}>{tour.description}</p>
            </motion.div>

            {/* ── Highlights ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={card}
            >
              <div style={{ marginBottom: "32px" }}>
                <span style={sectionLabel}>✦ What You&apos;ll Experience</span>
                <h2 style={sectionTitle}>Trip Highlights</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {tour.highlights.map((h, i) => (
                  <div key={h} style={{
                    display: "flex", alignItems: "center", gap: "18px",
                    padding: "18px 0",
                    borderBottom: i < tour.highlights.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(255,194,10,0.10)", border: "1px solid rgba(255,194,10,0.25)",
                    }}>
                      <Check style={{ width: "15px", height: "15px", color: "#FFC20A" }} />
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Day-by-Day Itinerary ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={card}
            >
              <div style={{ marginBottom: "32px" }}>
                <span style={sectionLabel}>✦ Your Journey</span>
                <h2 style={sectionTitle}>Day-by-Day Itinerary</h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {tour.itinerary.map((day) => {
                  const isOpen = openDay === day.day;
                  return (
                    <div key={day.day} style={{
                      borderRadius: "16px", overflow: "hidden",
                      border: isOpen ? "1px solid rgba(255,194,10,0.3)" : "1px solid rgba(255,255,255,0.07)",
                      background: isOpen ? "rgba(255,194,10,0.04)" : "rgba(255,255,255,0.03)",
                      transition: "border-color 0.2s, background 0.2s",
                    }}>
                      {/* Row header */}
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day.day)}
                        style={{
                          width: "100%", display: "flex", alignItems: "center",
                          gap: "16px", padding: "20px 24px", textAlign: "left",
                          background: "transparent", border: "none", cursor: "pointer",
                        }}
                      >
                        <div style={{
                          width: "40px", height: "40px", borderRadius: "12px", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 800, fontSize: "14px",
                          background: isOpen ? "#FFC20A" : "rgba(255,255,255,0.06)",
                          color: isOpen ? "#0B1628" : "rgba(255,255,255,0.45)",
                        }}>
                          {day.day}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFC20A", marginBottom: "5px" }}>
                            Day {day.day}
                          </div>
                          <div style={{ color: "white", fontWeight: 600, fontSize: "15px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {day.title}
                          </div>
                        </div>

                        <div style={{ flexShrink: 0, color: "rgba(255,255,255,0.3)" }}>
                          {isOpen ? <ChevronUp style={{ width: "18px", height: "18px" }} /> : <ChevronDown style={{ width: "18px", height: "18px" }} />}
                        </div>
                      </button>

                      {/* Expanded body */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ padding: "0 24px 28px 24px" }}>
                              <div style={{ height: "1px", background: "rgba(255,194,10,0.18)", marginBottom: "20px" }} />
                              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.85, margin: "0 0 20px 0" }}>
                                {day.description}
                              </p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {day.activities.map((act) => (
                                  <span key={act} style={{
                                    padding: "7px 16px", borderRadius: "100px",
                                    fontSize: "12px", fontWeight: 500,
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "rgba(255,255,255,0.65)",
                                    whiteSpace: "nowrap",
                                  }}>
                                    {act}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Included / Excluded ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}
            >
              {/* Included */}
              <div style={{ borderRadius: "24px", padding: "36px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <h3 style={{ color: "white", fontWeight: 700, fontSize: "17px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(16,185,129,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check style={{ width: "15px", height: "15px", color: "#4ade80" }} />
                  </div>
                  What&apos;s Included
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", margin: 0, padding: 0 }}>
                  {tour.included.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>
                      <Check style={{ width: "15px", height: "15px", color: "#4ade80", flexShrink: 0, marginTop: "2px" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div style={{ borderRadius: "24px", padding: "36px", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <h3 style={{ color: "white", fontWeight: 700, fontSize: "17px", display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(239,68,68,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <X style={{ width: "15px", height: "15px", color: "#f87171" }} />
                  </div>
                  Not Included
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", margin: 0, padding: 0 }}>
                  {tour.excluded.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>
                      <X style={{ width: "15px", height: "15px", color: "#f87171", flexShrink: 0, marginTop: "2px" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>{/* end left column */}

          {/* ══════════════ RIGHT SIDEBAR ══════════════ */}
          <div className="lg:col-span-1">
            <div style={{ position: "sticky", top: "110px", display: "flex", flexDirection: "column", gap: "20px" }}>

              <motion.div
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
              >
                {/* Header */}
                <div style={{ padding: "32px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "linear-gradient(135deg,rgba(255,194,10,0.12),rgba(255,194,10,0.04))" }}>
                  <div style={sectionLabel}>✦ 100% Customized Tour</div>
                  <h3 style={{ color: "white", fontWeight: 800, fontSize: "20px", marginBottom: "10px" }}>Plan This Trip Your Way</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                    No fixed pricing — every trip is tailored to your group, dates, and preferences.
                  </p>
                </div>

                {/* Stats */}
                <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", display: "flex", flexDirection: "column", gap: "22px" }}>
                  {[
                    { icon: Users,    label: "Group Size", value: `Up to ${tour.maxGroupSize} people` },
                    { icon: Clock,    label: "Duration",   value: `${tour.duration} days (customizable)` },
                    { icon: Compass,  label: "Difficulty", value: tour.difficulty },
                    { icon: Camera,   label: "Best Season",value: "June – September" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,194,10,0.10)", border: "1px solid rgba(255,194,10,0.2)" }}>
                        <Icon style={{ width: "16px", height: "16px", color: "#FFC20A" }} />
                      </div>
                      <div>
                        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "4px" }}>{label}</p>
                        <p style={{ color: "white", fontWeight: 600, fontSize: "14px", margin: 0 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ padding: "28px 32px", background: "rgba(255,255,255,0.03)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Link
                    href="/contact"
                    id="get-quote-btn"
                    style={{
                      display: "block", width: "100%", textAlign: "center",
                      padding: "16px", borderRadius: "14px", fontWeight: 700, fontSize: "15px",
                      color: "#0B1628", textDecoration: "none",
                      background: "linear-gradient(135deg,#FFC20A,#FFD34A)",
                      boxShadow: "0 8px 28px rgba(255,194,10,0.35)",
                    }}
                  >
                    ✦ Get a Custom Quote
                  </Link>

                  <a
                    href={`https://wa.me/923344334411?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(tour.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    id="whatsapp-quote-btn"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      width: "100%", padding: "16px", borderRadius: "14px", fontWeight: 700, fontSize: "15px",
                      color: "white", textDecoration: "none",
                      background: "#22c55e", boxShadow: "0 6px 20px rgba(34,197,94,0.3)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: "18px", height: "18px", fill: "white", flexShrink: 0 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>

                {/* Trust */}
                <div style={{ padding: "20px 32px 28px", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {["100% customized itinerary", "Response within 2–4 hours", "No commitment required"].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.38)", fontSize: "12px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFC20A", flexShrink: 0 }} />
                      {t}
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>{/* end right column */}

        </div>
      </div>
    </div>
  );
}
