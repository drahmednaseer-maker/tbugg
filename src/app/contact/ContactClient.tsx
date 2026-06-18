"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";

/* ─── Real TravelBug.pk Contact Details ─── */
const PHONE1 = "+92 324 8888889";
const PHONE2 = "+92 334 4334411";
const EMAIL   = "travelbugpakistan@gmail.com";
const ADDRESS_LINE1 = "B-89, Post Office Rd, Wah Cantt";
const ADDRESS_LINE2 = "Punjab 47040, Pakistan";
const WA_NUM  = "923248888889";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Deliver the lead to the business via WhatsApp with all details pre-filled.
    const lines = [
      "*New inquiry — TravelBug.pk contact form*",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone/WhatsApp: ${form.phone}` : "",
      form.subject ? `Subject: ${form.subject}` : "",
      "",
      `Message: ${form.message}`,
    ].filter(Boolean);
    const waUrl = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "13px 16px", color: "white", fontSize: "14px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", color: "rgba(255,255,255,0.5)", fontSize: "12px",
    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
  };

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "160px", paddingBottom: "72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="/destinations/minimarg/minimarg4.jpg"
            alt="Pakistan mountains"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0B1628 0%, rgba(11,22,40,0.7) 50%, #0B1628 100%)" }} />
        </div>
        <div style={{ position: "relative", maxWidth: "80rem", margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "18px" }}
          >
            <MessageSquare style={{ width: "13px", height: "13px" }} /> Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ margin: "0 0 16px", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.1, color: "white" }}
          >
            Let&apos;s Plan Your <span style={{ color: "#FFC20A" }}>Perfect Trip</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}
          >
            Our Pakistan travel specialists are ready to craft a journey built entirely around you. Reach out — we respond within 2 hours.
          </motion.p>
        </div>
      </section>

      {/* ── QUICK CONTACT CARDS ── */}
      <section style={{ padding: "0 32px 60px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {/* Phone 1 */}
            <motion.a
              href={`tel:+923248888889`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "20px 22px",
                borderRadius: "16px", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,194,10,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone style={{ width: "18px", height: "18px", color: "#FFC20A" }} />
              </div>
              <div>
                <p style={{ margin: "0 0 2px", color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Call Us</p>
                <p style={{ margin: "0 0 1px", color: "white", fontWeight: 700, fontSize: "14px" }}>{PHONE1}</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{PHONE2}</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${EMAIL}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "20px 22px",
                borderRadius: "16px", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,194,10,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail style={{ width: "18px", height: "18px", color: "#FFC20A" }} />
              </div>
              <div>
                <p style={{ margin: "0 0 2px", color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Email</p>
                <p style={{ margin: "0 0 1px", color: "white", fontWeight: 700, fontSize: "14px" }}>{EMAIL}</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>Reply within 2 hours</p>
              </div>
            </motion.a>

            {/* Address */}
            <motion.a
              href="https://maps.google.com/?q=Office+14+Lao+Karachi+Town+Islamabad+Pakistan"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "20px 22px",
                borderRadius: "16px", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,194,10,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin style={{ width: "18px", height: "18px", color: "#FFC20A" }} />
              </div>
              <div>
                <p style={{ margin: "0 0 2px", color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Office</p>
                <p style={{ margin: "0 0 1px", color: "white", fontWeight: 700, fontSize: "14px" }}>{ADDRESS_LINE1}</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>{ADDRESS_LINE2}</p>
              </div>
            </motion.a>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "20px 22px",
                borderRadius: "16px", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Clock style={{ width: "18px", height: "18px", color: "#FFC20A" }} />
              </div>
              <div>
                <p style={{ margin: "0 0 2px", color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Hours</p>
                <p style={{ margin: "0 0 1px", color: "white", fontWeight: 700, fontSize: "14px" }}>Mon – Sat: 9am – 8pm</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "12px" }}>Sunday: 10am – 5pm (PKT)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT: FORM + MAP ── */}
      <section style={{ padding: "0 32px 80px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>

          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ borderRadius: "24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}
          >
            {/* Form header */}
            <div style={{ padding: "28px 32px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 800, color: "white" }}>Send Us a Message</h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>We&apos;ll get back to you within 2 hours</p>
            </div>

            <div style={{ padding: "28px 32px" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "40px 20px" }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,194,10,0.1)", border: "2px solid rgba(255,194,10,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle2 style={{ width: "30px", height: "30px", color: "#FFC20A" }} />
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 800, color: "white" }}>Message Sent!</h3>
                  <p style={{ margin: "0 0 20px", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                    Thank you, <strong style={{ color: "white" }}>{form.name}</strong>! Our team will contact you within 2 hours on WhatsApp or email.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    style={{ padding: "10px 24px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "14px" }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                        style={{ ...inputStyle, borderColor: errors.name ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.1)" }} />
                      {errors.name && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "5px" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com"
                        style={{ ...inputStyle, borderColor: errors.email ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.1)" }} />
                      {errors.email && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "5px" }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={labelStyle}>Phone / WhatsApp</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Topic</label>
                      <select name="subject" value={form.subject} onChange={handleChange}
                        style={{ ...inputStyle, background: "#0d1a2d", cursor: "pointer" }}>
                        <option value="">Select a topic</option>
                        <option value="custom-tour">Custom Tour Inquiry</option>
                        <option value="itinerary">Plan an Itinerary</option>
                        <option value="group">Group Travel</option>
                        <option value="honeymoon">Honeymoon Package</option>
                        <option value="corporate">Corporate Tour</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                      placeholder="Tell us your dream destination, preferred dates, group size, any special requirements..."
                      style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.1)" }} />
                    {errors.message && <p style={{ color: "#f87171", fontSize: "12px", marginTop: "5px" }}>{errors.message}</p>}
                  </div>
                  <button
                    type="submit" id="contact-submit-btn" disabled={loading}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "16px", borderRadius: "14px",
                      background: loading ? "rgba(255,194,10,0.5)" : "linear-gradient(135deg, #FFC20A, #FFD34A)",
                      color: "#0B1628", fontWeight: 800, fontSize: "15px", border: "none",
                      cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 24px rgba(255,194,10,0.25)",
                    }}
                  >
                    {loading
                      ? <><div style={{ width: "18px", height: "18px", border: "2px solid rgba(11,22,40,0.3)", borderTop: "2px solid #0B1628", borderRadius: "50%", animation: "spin 1s linear infinite" }} />Sending...</>
                      : <><Send style={{ width: "16px", height: "16px" }} />Send Message</>
                    }
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right Side: Map + WhatsApp ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* WhatsApp CTA — top of right col */}
            <a
              href={`https://wa.me/${WA_NUM}?text=Hi%20TravelBug.pk!%20I'd%20like%20to%20plan%20a%20customized%20trip%20to%20Pakistan.`}
              target="_blank" rel="noopener noreferrer"
              id="contact-whatsapp-btn"
              style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "20px 24px", borderRadius: "18px",
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                textDecoration: "none", boxShadow: "0 8px 32px rgba(34,197,94,0.25)",
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" style={{ width: "26px", height: "26px", fill: "white" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p style={{ margin: "0 0 2px", color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600 }}>Fastest Response</p>
                <p style={{ margin: "0 0 1px", color: "white", fontWeight: 800, fontSize: "17px" }}>Chat on WhatsApp Now</p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>+92 324 8888889 · Typically replies in minutes</p>
              </div>
            </a>

            {/* Google Maps Embed — Islamabad, Pakistan */}
            <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: "340px" }}>
              <iframe
                title="TravelBug.pk Office — Islamabad, Pakistan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13248.4!2d72.74744!3d33.77678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df93f0d2f61e35%3A0x8f41b53a71b2f831!2sWah%20Cantonment%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2spk!4v1620000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: "invert(92%) hue-rotate(180deg) brightness(0.88) saturate(0.75)", border: 0 }}
              />
            </div>

            {/* Address card */}
            <div style={{
              padding: "20px 22px", borderRadius: "16px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", gap: "14px", alignItems: "flex-start",
            }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin style={{ width: "16px", height: "16px", color: "#FFC20A" }} />
              </div>
              <div>
                <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Office Address</p>
                <p style={{ margin: "0 0 2px", color: "white", fontWeight: 700, fontSize: "15px" }}>B-89, Post Office Rd, Wah Cantt</p>
                <p style={{ margin: "0 0 6px", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Punjab 47040, Pakistan</p>
                <a
                  href="https://maps.google.com/?q=B+89+Post+Office+Rd+Wah+Cantt+Punjab+Pakistan"
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: "#FFC20A", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
