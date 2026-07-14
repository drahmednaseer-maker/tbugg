"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search, X, MapPin, Clock, Users, ChevronDown, ChevronUp,
  ArrowRight, Phone, Mail, Calendar, CheckCircle2,
  Home, Utensils, Car, User, MessageSquare, Send, Globe
} from "lucide-react";
import { tours } from "@/data/tours";
import { Tour } from "@/types";

/* ─────────────────────────────────────────────
   COMPREHENSIVE QUOTE MODAL
───────────────────────────────────────────── */
function QuoteModal({ isOpen, onClose, preselectedTour }: {
  isOpen: boolean; onClose: () => void; preselectedTour?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", isWhatsApp: "yes",
    destination: "", otherPlaces: "",
    startDate: "", nights: "3", adults: "2", children: "0",
    hotelCategory: "", roomType: "", meals: "", transport: "",
    specialRequirements: "", heardFrom: "",
  });

  useEffect(() => {
    if (preselectedTour) setForm(f => ({ ...f, destination: preselectedTour }));
  }, [preselectedTour]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Deliver the full tour inquiry to the business via WhatsApp with all details pre-filled.
    const lines = [
      "*New tour inquiry — TravelBug.pk*",
      "",
      `Name: ${form.name}`,
      `Phone/WhatsApp: ${form.phone}${form.isWhatsApp === "yes" || form.isWhatsApp === "whatsapp" ? " (WhatsApp)" : ""}`,
      form.email ? `Email: ${form.email}` : "",
      "",
      `Destination: ${form.destination || "Not specified"}`,
      form.otherPlaces ? `Other places: ${form.otherPlaces}` : "",
      form.startDate ? `Start date: ${form.startDate}` : "",
      `Nights: ${form.nights}`,
      `Travelers: ${form.adults} adult(s), ${form.children} child(ren)`,
      form.hotelCategory ? `Hotel category: ${form.hotelCategory}` : "",
      form.roomType ? `Room type: ${form.roomType}` : "",
      form.meals ? `Meals: ${form.meals}` : "",
      form.transport ? `Transport: ${form.transport}` : "",
      form.specialRequirements ? `Special requirements: ${form.specialRequirements}` : "",
      form.heardFrom ? `Heard from: ${form.heardFrom}` : "",
    ].filter(Boolean);
    const waUrl = `https://wa.me/923344334411?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    await new Promise(r => setTimeout(r, 600));
    setSubmitted(true);
    setLoading(false);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ name: "", phone: "", email: "", isWhatsApp: "yes", destination: preselectedTour || "", otherPlaces: "", startDate: "", nights: "3", adults: "2", children: "0", hotelCategory: "", roomType: "", meals: "", transport: "", specialRequirements: "", heardFrom: "" });
    onClose();
  };

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "12px 16px", color: "white", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", color: "rgba(255,255,255,0.55)", fontSize: "12px",
    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px",
  };
  const selectStyle: React.CSSProperties = { ...inputStyle, background: "#0f1f38", cursor: "pointer" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "780px",
          background: "linear-gradient(135deg, #0B1628 0%, #0f1f38 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px", overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,194,10,0.1)",
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255,194,10,0.15), rgba(255,194,10,0.05))",
          borderBottom: "1px solid rgba(255,194,10,0.15)",
          padding: "28px 32px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
              ✦ Custom Tour Request
            </div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "white" }}>Plan Your Dream Journey</h2>
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
              Fill in your preferences — we&apos;ll craft a 100% personalized itinerary just for you.
            </p>
          </div>
          <button onClick={onClose} style={{
            width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <X style={{ width: "16px", height: "16px", color: "rgba(255,255,255,0.6)" }} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "32px", maxHeight: "75vh", overflowY: "auto" }}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "40px 20px" }}
            >
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "rgba(255,194,10,0.15)", border: "2px solid rgba(255,194,10,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
              }}>
                <CheckCircle2 style={{ width: "36px", height: "36px", color: "#FFC20A" }} />
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: "22px", fontWeight: 800, color: "white" }}>
                Quote Request Sent!
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
                Thank you, <strong style={{ color: "white" }}>{form.name}</strong>! Our travel experts will contact you within <strong style={{ color: "#FFC20A" }}>2–4 hours</strong> with your personalized itinerary and quote.
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "28px" }}>
                Check your WhatsApp / email for our response.
              </p>
              <button onClick={reset} style={{
                padding: "12px 28px", borderRadius: "12px",
                background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                color: "#0B1628", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "14px",
              }}>
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

              {/* Section 1 — Personal Info */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,194,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
                  </div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>Your Details</span>
                </div>
                <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input required name="name" value={form.name} onChange={handleChange} placeholder="Muhammad Asmar" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp *</label>
                    <input required name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Contact Method</label>
                    <select name="isWhatsApp" value={form.isWhatsApp} onChange={handleChange} style={selectStyle}>
                      <option value="whatsapp">WhatsApp (preferred)</option>
                      <option value="call">Phone Call</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2 — Destination & Dates */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,194,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
                  </div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>Destination & Dates</span>
                </div>
                <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Primary Destination *</label>
                    <select required name="destination" value={form.destination} onChange={handleChange} style={selectStyle}>
                      <option value="">Select a destination...</option>
                      {tours.map(t => <option key={t.id} value={t.title}>{t.title} — {t.destination}</option>)}
                      <option value="custom">I have a custom destination in mind</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Other places / regions you want to visit</label>
                    <input name="otherPlaces" value={form.otherPlaces} onChange={handleChange} placeholder="e.g. Hunza + Skardu + Fairy Meadows" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Start Date *</label>
                    <input required type="date" name="startDate" value={form.startDate} onChange={handleChange} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Number of Nights *</label>
                    <select required name="nights" value={form.nights} onChange={handleChange} style={selectStyle}>
                      {[1,2,3,4,5,6,7,8,9,10,11,12,14,16,18,21].map(n => <option key={n} value={n}>{n} Night{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3 — Group Size */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,194,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
                  </div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>Group Size</span>
                </div>
                <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Number of Adults *</label>
                    <select required name="adults" value={form.adults} onChange={handleChange} style={selectStyle}>
                      {[1,2,3,4,5,6,7,8,9,10,12,15,20,25,30].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Number of Children</label>
                    <select name="children" value={form.children} onChange={handleChange} style={selectStyle}>
                      {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n === 0 ? "No children" : `${n} Child${n > 1 ? "ren" : ""}`}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 4 — Accommodation */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,194,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Home style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
                  </div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>Hotel & Room Preferences</span>
                </div>
                <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Hotel Category *</label>
                    <select required name="hotelCategory" value={form.hotelCategory} onChange={handleChange} style={selectStyle}>
                      <option value="">Select hotel type...</option>
                      <option value="budget-guesthouse">Budget Guesthouse</option>
                      <option value="standard-2star">Standard Hotel (2–3 Star)</option>
                      <option value="comfortable-3star">Comfortable Hotel (3–4 Star)</option>
                      <option value="luxury-4star">Luxury Hotel (4 Star)</option>
                      <option value="premium-5star">Premium Resort / 5 Star</option>
                      <option value="camping">Camping / Tented Stay</option>
                      <option value="mix">Mix (varies by location)</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Room Type *</label>
                    <select required name="roomType" value={form.roomType} onChange={handleChange} style={selectStyle}>
                      <option value="">Select room type...</option>
                      <option value="single">Single Rooms (1 person each)</option>
                      <option value="double">Double / Twin (2 per room)</option>
                      <option value="triple">Triple (3 per room)</option>
                      <option value="family">Family Rooms</option>
                      <option value="mix">Mix as needed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 5 — Meals & Transport */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,194,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Utensils style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
                  </div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>Meals & Transport</span>
                </div>
                <div className="contact-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Meal Plan *</label>
                    <select required name="meals" value={form.meals} onChange={handleChange} style={selectStyle}>
                      <option value="">Select meal plan...</option>
                      <option value="breakfast-only">Breakfast Only</option>
                      <option value="half-board">Half Board (Breakfast + Dinner)</option>
                      <option value="full-board">Full Board (All Meals)</option>
                      <option value="self-catering">Self-Catering / Own arrangement</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Transport Type *</label>
                    <select required name="transport" value={form.transport} onChange={handleChange} style={selectStyle}>
                      <option value="">Select transport...</option>
                      <option value="private-car">Private Car / SUV</option>
                      <option value="jeep">4x4 Jeep (for remote areas)</option>
                      <option value="coaster-ac">AC Coaster / Van</option>
                      <option value="bus">Bus (Groups)</option>
                      <option value="flights-included">Domestic Flights Included</option>
                      <option value="own-transport">Own / Self Transport</option>
                      <option value="mix">Mixed (advise what&apos;s best)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 6 — Notes */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,194,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MessageSquare style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
                  </div>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>Anything Else?</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Special Requirements / Notes</label>
                    <textarea
                      name="specialRequirements" value={form.specialRequirements} onChange={handleChange} rows={4}
                      placeholder="e.g. Wheelchair access needed, vegetarian meals, specific activities like trekking or rafting, honeymoon package, anniversary celebration, photography tour, any health conditions we should know about..."
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>How did you hear about us?</label>
                    <select name="heardFrom" value={form.heardFrom} onChange={handleChange} style={selectStyle}>
                      <option value="">Select...</option>
                      <option value="google">Google Search</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="tiktok">TikTok</option>
                      <option value="friend">Friend / Family Referral</option>
                      <option value="youtube">YouTube</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginBottom: "16px" }}>
                  By submitting you agree to be contacted by our travel team via your preferred method. Your data is kept private and never shared.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    type="submit" disabled={loading}
                    style={{
                      flex: 1, minWidth: "200px", padding: "16px 28px", borderRadius: "14px",
                      background: loading ? "rgba(255,194,10,0.5)" : "linear-gradient(135deg, #FFC20A, #FFD34A)",
                      color: "#0B1628", fontWeight: 800, fontSize: "15px", border: "none",
                      cursor: loading ? "not-allowed" : "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center", gap: "8px",
                      boxShadow: "0 8px 32px rgba(255,194,10,0.3)",
                    }}
                  >
                    {loading ? (
                      <><div style={{ width: "18px", height: "18px", border: "2px solid rgba(11,22,40,0.3)", borderTop: "2px solid #0B1628", borderRadius: "50%", animation: "spin 1s linear infinite" }} />Sending Your Request...</>
                    ) : (
                      <><Send style={{ width: "16px", height: "16px" }} />Get My Custom Quote</>
                    )}
                  </button>
                  {/* WhatsApp alternative */}
                  <a
                    href={`https://wa.me/923344334411?text=Hi!%20I%27d%20like%20to%20plan%20a%20trip%20to%20${encodeURIComponent(form.destination || "Pakistan")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: "16px 20px", borderRadius: "14px", background: "#22c55e",
                      color: "white", fontWeight: 700, fontSize: "14px", border: "none",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                      textDecoration: "none", whiteSpace: "nowrap",
                    }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: "18px", height: "18px", fill: "white" }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DESTINATION CARD
───────────────────────────────────────────── */
function DestinationCard({ tour, onGetQuote }: { tour: Tour; onGetQuote: (title: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "20px",
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
        width: "100%",
      }}
      whileHover={{ borderColor: "rgba(255,194,10,0.25)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
    >
      {/* Image — clicking navigates to full details */}
      <Link href={`/tours/${tour.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{ position: "relative", height: "240px", overflow: "hidden", cursor: "pointer" }}>
          <img
            src={tour.image}
            alt={tour.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(11,22,40,0.95) 0%, rgba(11,22,40,0.3) 50%, transparent 100%)",
            transition: "background 0.3s",
          }} />
          {/* "View Details" hover hint */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0, transition: "opacity 0.3s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
          >
            <span style={{
              background: "rgba(255,194,10,0.9)", color: "#0B1628",
              padding: "10px 20px", borderRadius: "30px",
              fontWeight: 700, fontSize: "13px", letterSpacing: "0.05em",
            }}>
              View Full Details →
            </span>
          </div>
          {/* Destination label */}
          <div style={{ position: "absolute", bottom: "16px", left: "18px", right: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
              <MapPin style={{ width: "13px", height: "13px", color: "#FFC20A" }} />
              <span style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 600 }}>{tour.destination}, Pakistan</span>
            </div>
            <h3 style={{ margin: 0, color: "white", fontSize: "18px", fontWeight: 800, lineHeight: 1.3 }}>{tour.title}</h3>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: "22px 22px 0" }}>
        {/* Stats row */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
            <Clock style={{ width: "14px", height: "14px", color: "#FFC20A" }} /> {tour.duration} Days
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
            <Users style={{ width: "14px", height: "14px", color: "#FFC20A" }} /> Max {tour.maxGroupSize}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: tour.difficulty === "Easy" ? "#4ade80" : tour.difficulty === "Moderate" ? "#facc15" : "#f87171", display: "inline-block" }} />
            {tour.difficulty}
          </div>
        </div>

        {/* Description */}
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.7, margin: "0 0 16px" }}>
          {tour.shortDescription}
        </p>

        {/* Places to visit tags */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
            Places to Visit
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tour.highlights.slice(0, 5).map(h => (
              <span key={h} style={{
                padding: "4px 10px", borderRadius: "20px", fontSize: "12px",
                background: "rgba(255,194,10,0.08)", border: "1px solid rgba(255,194,10,0.2)",
                color: "rgba(255,255,255,0.65)",
              }}>
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Itinerary accordion toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex", alignItems: "center", gap: "6px", width: "100%",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px", padding: "10px 14px", cursor: "pointer",
            color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 600,
            marginBottom: "0", transition: "all 0.2s",
          }}
        >
          <Calendar style={{ width: "14px", height: "14px", color: "#FFC20A" }} />
          {expanded ? "Hide" : "View"} Day-by-Day Itinerary
          {expanded ? <ChevronUp style={{ width: "14px", height: "14px", marginLeft: "auto" }} /> : <ChevronDown style={{ width: "14px", height: "14px", marginLeft: "auto" }} />}
        </button>

        {/* Itinerary expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {tour.itinerary.map((day, i) => (
                  <div key={day.day} style={{
                    display: "flex", gap: "12px", padding: "12px",
                    background: "rgba(255,255,255,0.03)", borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                      background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ color: "#0B1628", fontSize: "11px", fontWeight: 800 }}>{day.day}</span>
                    </div>
                    <div>
                      <p style={{ margin: "0 0 3px", color: "white", fontSize: "13px", fontWeight: 700 }}>{day.title}</p>
                      <p style={{ margin: "0 0 6px", color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>{day.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {day.activities.map(act => (
                          <span key={act} style={{ padding: "2px 8px", borderRadius: "20px", fontSize: "11px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>{act}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Footer */}
      <div style={{
        padding: "18px 22px 22px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        marginTop: "18px",
        display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
      }}>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
          Fully customizable — any duration, group size, budget
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link
            href={`/tours/${tour.slug}`}
            style={{
              padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex",
              alignItems: "center", gap: "6px",
            }}
          >
            Full Details <ArrowRight style={{ width: "12px", height: "12px" }} />
          </Link>
          <button
            onClick={() => onGetQuote(tour.title)}
            style={{
              padding: "10px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 700,
              background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628",
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
              boxShadow: "0 4px 16px rgba(255,194,10,0.3)",
            }}
          >
            ✦ Get a Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ToursClient() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme") || "";
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [preselectedTour, setPreselectedTour] = useState("");

  // Reset search when theme changes
  useEffect(() => { setSearch(""); }, [themeParam]);

  const filtered = useMemo(() => {
    let list = tours;
    // Filter by category (Luxury, Adventure, Budget)
    const catParam = searchParams.get("cat");
    if (catParam) {
      list = list.filter(t => t.category === catParam);
    }
    // Filter by theme (from landing page category cards)
    if (themeParam) {
      list = list.filter(t => t.themes?.includes(themeParam));
    }
    // Then filter by search
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(s) ||
        t.destination.toLowerCase().includes(s) ||
        t.shortDescription.toLowerCase().includes(s) ||
        t.category.toLowerCase().includes(s)
      );
    }
    return list;
  }, [search, themeParam, searchParams]);

  const openQuote = useCallback((tourTitle = "") => {
    setPreselectedTour(tourTitle);
    setQuoteOpen(true);
  }, []);

  // Theme display info
  const themeColors: Record<string, { bg: string; text: string; label: string; desc: string }> = {
    Blossoms:   { bg: "#F472B6", text: "#fff", label: "🌸 Blossom Season Tours", desc: "Cherry & apricot blossoms paint the valleys pink — Pakistan's most magical spring spectacle" },
    Autumn:     { bg: "#F97316", text: "#fff", label: "🍂 Autumn Colour Tours", desc: "Golden forests, amber deserts, and mirror-still rivers — Pakistan at its most painterly" },
    Cultural:   { bg: "#7C3AED", text: "#fff", label: "🏛 Cultural Experience Tours", desc: "Mughal forts, Sufi shrines, and living indigenous cultures — Pakistan's 5,000-year heritage" },
    Coastal:    { bg: "#0891B2", text: "#fff", label: "🌊 Coastal & Beach Tours", desc: "Arabian Sea coastlines, pristine beaches, and dramatic rock formations of Balochistan" },
    Karakorams: { bg: "#0F766E", text: "#fff", label: "⛰ Karakoram Peaks Tours", desc: "K2, Broad Peak, Charakusa — the world's greatest concentration of high peaks" },
    Adventure:  { bg: "#2563EB", text: "#fff", label: "🧗 Adventure Tours", desc: "Glacier crossings, high-altitude treks, and remote valleys far from the tourist trail" },
    Religious:  { bg: "#D97706", text: "#fff", label: "🕌 Religious & Heritage Tours", desc: "Ancient Buddhist ruins, grand mosques, and Sufi dargahs — Pakistan's sacred landscape" },
    Sports:     { bg: "#DC2626", text: "#fff", label: "🏇 Sports & Festival Tours", desc: "Polo at 3,700m, mountain marathons, and electrifying cultural festivals" },
    Expedition: { bg: "#374151", text: "#fff", label: "🏔 Expedition Tours", desc: "Serious multi-day wilderness expeditions to Pakistan's most remote peaks" },
  };
  const activeTheme = themeParam ? themeColors[themeParam] : null;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Quote Modal */}
      <AnimatePresence>
        {quoteOpen && <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} preselectedTour={preselectedTour} />}
      </AnimatePresence>

      {/* Themed banner — shown only when arriving from a category card */}
      {activeTheme && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `linear-gradient(135deg, ${activeTheme.bg}22, ${activeTheme.bg}08)`,
            borderBottom: `1px solid ${activeTheme.bg}44`,
            padding: "100px 32px 28px",
          }}
        >
          <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <span style={{
                display: "inline-block", padding: "4px 14px", borderRadius: "20px",
                background: activeTheme.bg, color: activeTheme.text,
                fontSize: "12px", fontWeight: 800, letterSpacing: "0.08em",
                textTransform: "uppercase", marginBottom: "8px",
              }}>{themeParam}</span>
              <h2 style={{ margin: "0 0 4px", color: "white", fontSize: "22px", fontWeight: 900 }}>{activeTheme.label}</h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{activeTheme.desc}</p>
            </div>
            <Link
              href="/tours"
              style={{
                padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)", textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              ← View All Tours
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero — hidden when a theme is active */}
      {!activeTheme && (
      <section style={{ paddingTop: "160px", paddingBottom: "60px", position: "relative", overflow: "hidden", paddingLeft: "32px", paddingRight: "32px" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/destinations/hunza/rakaposhi_sunset.jpg" alt="Pakistan mountains" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0B1628, rgba(11,22,40,0.7) 50%, #0B1628)" }} />
        </div>
        <div style={{ position: "relative", maxWidth: "80rem", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#FFC20A", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px" }}
          >
            <Globe style={{ width: "14px", height: "14px" }} /> Customized Tours Across Pakistan
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ margin: "0 0 16px", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, color: "white" }}
          >
            Explore Pakistan,<br />
            <span style={{ color: "#FFC20A" }}>Your Way.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px", margin: "0 0 28px" }}
          >
            We don&apos;t sell fixed packages — every journey we plan is 100% tailored to you. Browse our destinations, explore the itinerary, then get a custom quote built around your group, dates, and preferences.
          </motion.p>
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            onClick={() => openQuote()}
            style={{
              padding: "16px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700,
              background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628",
              border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(255,194,10,0.35)",
              display: "inline-flex", alignItems: "center", gap: "8px",
            }}
          >
            ✦ Start Planning My Trip
          </motion.button>
        </div>
      </section>
      )}

      {/* Search Bar */}
      <section style={{
        position: "sticky", top: "80px", zIndex: 30,
        backgroundColor: "rgba(11,22,40,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 32px",
      }}>
        <div className="tours-searchbar" style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: "12px",
            background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: "14px", padding: "13px 18px",
          }}>
            <Search style={{ width: "18px", height: "18px", color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search destinations — Hunza, Skardu, Lahore, Neelum Valley..."
              id="tours-search"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: "14px" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X style={{ width: "16px", height: "16px", color: "rgba(255,255,255,0.4)" }} />
              </button>
            )}
          </div>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>
            {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={() => openQuote()}
            style={{
              padding: "13px 22px", borderRadius: "12px",
              background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
              color: "#0B1628", fontWeight: 700, fontSize: "14px",
              border: "none", cursor: "pointer", whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(255,194,10,0.25)",
            }}
          >
            Get a Quote
          </button>
        </div>
      </section>

      {/* Destinations Grid */}
      <section style={{ padding: "48px 32px 80px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px", marginBottom: "12px" }}>No destinations match your search.</p>
              <button onClick={() => setSearch("")} style={{ padding: "10px 24px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                Clear Search
              </button>
            </div>
          ) : (
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "28px",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map(tour => (
                  <DestinationCard key={tour.id} tour={tour} onGetQuote={openQuote} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{
        margin: "0 32px 60px", borderRadius: "24px",
        background: "linear-gradient(135deg, rgba(255,194,10,0.12) 0%, rgba(255,194,10,0.04) 100%)",
        border: "1px solid rgba(255,194,10,0.2)",
        padding: "40px 48px",
        maxWidth: "80rem", marginLeft: "auto", marginRight: "auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px",
      }}>
        <div>
          <h2 style={{ margin: "0 0 8px", fontSize: "22px", fontWeight: 800, color: "white" }}>
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            Tell us your dream destination — we plan <strong style={{ color: "white" }}>any route across Pakistan</strong>, fully customized.
          </p>
        </div>
        <button
          onClick={() => openQuote()}
          style={{
            padding: "16px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700,
            background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628",
            border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,194,10,0.3)",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          ✦ Plan a Custom Trip
        </button>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
