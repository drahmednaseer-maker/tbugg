"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, Users, MessageCircle, Mail,
  User, ChevronDown, CheckCircle, Loader2
} from "lucide-react";

const WHATSAPP_NUMBER = "923344334411";

const destinations = [
  "Hunza Valley", "Skardu", "Fairy Meadows", "Naran Kaghan",
  "Swat Valley", "Chitral", "Lahore", "Gilgit", "Murree",
  "Azad Kashmir", "Gwadar", "Deosai Plains", "K2 Base Camp", "Custom Destination"
];

const budgetOptions = [
  "Under PKR 30K", "PKR 30K – 60K", "PKR 60K – 100K",
  "PKR 100K – 200K", "PKR 200K+", "Flexible / Let us suggest"
];

const gold = "linear-gradient(135deg, #FFC20A, #FFD34A)";
const goldLight = "rgba(255,194,10,0.15)";
const goldBorder = "rgba(255,194,10,0.4)";
const fieldBg = "rgba(255,255,255,0.05)";
const fieldBorder = "rgba(255,255,255,0.12)";

export default function SearchBar() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", contact: "", contactType: "whatsapp",
    destination: "", customDest: "", travelDate: "",
    travelers: "2", budget: "", requirements: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const buildMessage = () => {
    const dest = form.destination === "Custom Destination" ? form.customDest : form.destination;
    return encodeURIComponent(
      `🌏 *New Tour Enquiry — TravelBug.pk*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📱 *${form.contactType === "whatsapp" ? "WhatsApp" : "Email"}:* ${form.contact}\n` +
      `📍 *Destination:* ${dest}\n` +
      `📅 *Travel Date:* ${form.travelDate || "Flexible"}\n` +
      `👥 *Travelers:* ${form.travelers}\n` +
      `💰 *Budget:* ${form.budget || "Not specified"}\n` +
      `📝 *Requirements:* ${form.requirements || "None"}\n\n` +
      `_Sent via TravelBug.pk Trip Planner_`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMessage()}`, "_blank");
    }, 1200);
  };

  const canNext1 = form.name.trim() && form.contact.trim();
  const canNext2 = form.destination && (form.destination !== "Custom Destination" || form.customDest.trim());

  // Shared field style
  const fieldStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "16px",
    background: fieldBg, border: `1px solid ${fieldBorder}`,
    borderRadius: "16px", padding: "18px 24px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", color: "white",
    fontSize: "14px", outline: "none", border: "none",
  };

  return (
    <section style={{ padding: "80px 0", background: "linear-gradient(180deg, transparent 0%, #070E1C 25%)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>

        {/* Heading */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "48px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: "12px" }}>
            Plan Your Dream<br />
            <span style={{ color: "#FFC20A" }}>
              Pakistan Trip
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
            Tell us your travel details and we'll reach out on WhatsApp with a custom itinerary within hours.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          style={{
            background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px",
            overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)"
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Step tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { n: 1, label: "Your Info" },
              { n: 2, label: "Destination" },
              { n: 3, label: "Details" }
            ].map(({ n, label }) => (
              <div key={n} style={{ flex: 1, borderRight: n < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ height: "3px", background: step >= n ? gold : "rgba(255,255,255,0.06)", transition: "all 0.4s" }} />
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 900, transition: "all 0.3s",
                    background: step >= n ? gold : "rgba(255,255,255,0.08)",
                    color: step >= n ? "#0B1628" : "rgba(255,255,255,0.3)",
                  }}>
                    {step > n ? <CheckCircle style={{ width: 16, height: 16 }} /> : n}
                  </div>
                  <span style={{
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: step >= n ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)"
                  }}>
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit}>
            <div style={{ padding: "48px 48px 32px" }}>
              <AnimatePresence mode="wait">

                {/* STEP 1 */}
                {step === 1 && !submitted && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <p style={{ color: "white", fontWeight: 800, fontSize: "20px", marginBottom: "32px" }}>How can we reach you?</p>

                    {/* Name */}
                    <div style={{ ...fieldStyle, marginBottom: "20px" }}>
                      <User style={{ color: "#FFC20A", width: 20, height: 20, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "6px", letterSpacing: "0.05em" }}>Your Full Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Ahmed Khan"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          style={{ ...inputStyle }}
                          id="planner-name"
                          required
                        />
                      </div>
                    </div>

                    {/* Toggle */}
                    <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                      {["whatsapp", "email"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => update("contactType", type)}
                          style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "8px", padding: "16px", borderRadius: "14px", fontWeight: 700,
                            fontSize: "14px", cursor: "pointer", border: "1px solid",
                            transition: "all 0.25s",
                            background: form.contactType === type ? goldLight : "rgba(255,255,255,0.03)",
                            borderColor: form.contactType === type ? goldBorder : fieldBorder,
                            color: form.contactType === type ? "#FFC20A" : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {type === "whatsapp" ? <MessageCircle style={{ width: 16, height: 16 }} /> : <Mail style={{ width: 16, height: 16 }} />}
                          {type === "whatsapp" ? "WhatsApp" : "Email"}
                        </button>
                      ))}
                    </div>

                    {/* Contact */}
                    <div style={fieldStyle}>
                      {form.contactType === "whatsapp"
                        ? <MessageCircle style={{ color: "#FFC20A", width: 20, height: 20, flexShrink: 0 }} />
                        : <Mail style={{ color: "#FFC20A", width: 20, height: 20, flexShrink: 0 }} />
                      }
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "6px", letterSpacing: "0.05em" }}>
                          {form.contactType === "whatsapp" ? "WhatsApp Number" : "Email Address"}
                        </label>
                        <input
                          type={form.contactType === "email" ? "email" : "tel"}
                          placeholder={form.contactType === "whatsapp" ? "+92 3XX XXXXXXX" : "you@example.com"}
                          value={form.contact}
                          onChange={(e) => update("contact", e.target.value)}
                          style={inputStyle}
                          id="planner-contact"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && !submitted && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <p style={{ color: "white", fontWeight: 800, fontSize: "20px", marginBottom: "32px" }}>Where would you like to go?</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: form.destination === "Custom Destination" ? "20px" : "0" }}>
                      {destinations.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => update("destination", d)}
                          style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            padding: "14px 16px", borderRadius: "12px", fontSize: "13px",
                            fontWeight: 600, textAlign: "left", cursor: "pointer",
                            border: "1px solid", transition: "all 0.2s",
                            background: form.destination === d ? goldLight : "rgba(255,255,255,0.03)",
                            borderColor: form.destination === d ? goldBorder : "rgba(255,255,255,0.08)",
                            color: form.destination === d ? "#FFC20A" : "rgba(255,255,255,0.55)",
                          }}
                        >
                          <MapPin style={{ width: 13, height: 13, flexShrink: 0 }} />
                          {d}
                        </button>
                      ))}
                    </div>
                    {form.destination === "Custom Destination" && (
                      <div style={{ ...fieldStyle, borderColor: goldBorder, background: "rgba(255,194,10,0.05)" }}>
                        <MapPin style={{ color: "#FFC20A", width: 18, height: 18, flexShrink: 0 }} />
                        <input
                          type="text"
                          placeholder="Type your destination..."
                          value={form.customDest}
                          onChange={(e) => update("customDest", e.target.value)}
                          style={inputStyle}
                          autoFocus
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && !submitted && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <p style={{ color: "white", fontWeight: 800, fontSize: "20px", marginBottom: "32px" }}>Tell us about your trip</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                      <div style={fieldStyle}>
                        <Calendar style={{ color: "#FFC20A", width: 20, height: 20, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "6px" }}>Travel Date</label>
                          <input
                            type="date"
                            value={form.travelDate}
                            onChange={(e) => update("travelDate", e.target.value)}
                            style={{ ...inputStyle, colorScheme: "dark" } as React.CSSProperties}
                          />
                        </div>
                      </div>
                      <div style={fieldStyle}>
                        <Users style={{ color: "#FFC20A", width: 20, height: 20, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "6px" }}>Travelers</label>
                          <input
                            type="number"
                            min="1" max="50"
                            value={form.travelers}
                            onChange={(e) => update("travelers", e.target.value)}
                            style={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ ...fieldStyle, marginBottom: "20px" }}>
                      <span style={{ color: "#FFC20A", fontWeight: 900, fontSize: "16px", flexShrink: 0 }}>₨</span>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "6px" }}>Budget per Person</label>
                        <select
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          style={{ ...inputStyle, cursor: "pointer", colorScheme: "dark" } as React.CSSProperties}
                        >
                          <option value="" disabled style={{ background: "#0B1628" }}>Select budget range</option>
                          {budgetOptions.map((b) => <option key={b} value={b} style={{ background: "#0B1628" }}>{b}</option>)}
                        </select>
                      </div>
                      <ChevronDown style={{ color: "rgba(255,255,255,0.3)", width: 16, height: 16, flexShrink: 0 }} />
                    </div>
                    <div style={{ ...fieldStyle, alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "10px" }}>Special Requirements (optional)</label>
                        <textarea
                          rows={3}
                          placeholder="e.g. halal food, honeymoon package, photography tour..."
                          value={form.requirements}
                          onChange={(e) => update("requirements", e.target.value)}
                          style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {submitted && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: gold, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                      <CheckCircle style={{ width: 36, height: 36, color: "#0B1628" }} />
                    </div>
                    <h3 style={{ color: "white", fontWeight: 900, fontSize: "24px", marginBottom: "12px" }}>WhatsApp Opened! 🎉</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.6 }}>
                      Your trip details were sent to our team. We'll reply with a custom itinerary within hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", contact: "", contactType: "whatsapp", destination: "", customDest: "", travelDate: "", travelers: "2", budget: "", requirements: "" }); }}
                      style={{ marginTop: "32px", color: "#FFC20A", fontSize: "14px", fontWeight: 700, textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Plan Another Trip
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {!submitted && (
              <div style={{ padding: "24px 48px 40px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontWeight: 700, background: "none", border: "none", cursor: "pointer", visibility: step === 1 ? "hidden" : "visible" }}
                >
                  ← Back
                </button>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={step === 1 ? !canNext1 : !canNext2}
                    style={{
                      background: gold, color: "#0B1628", fontWeight: 900, fontSize: "14px",
                      padding: "16px 40px", borderRadius: "14px", border: "none", cursor: "pointer",
                      opacity: (step === 1 ? !canNext1 : !canNext2) ? 0.3 : 1,
                      transition: "all 0.2s",
                    }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    id="planner-submit-btn"
                    style={{
                      background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white",
                      fontWeight: 900, fontSize: "14px", padding: "16px 40px", borderRadius: "14px",
                      border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                    }}
                  >
                    {loading ? <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> Sending...</> : <><MessageCircle style={{ width: 16, height: 16 }} /> Send to WhatsApp</>}
                  </button>
                )}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
