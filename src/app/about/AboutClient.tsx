"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mountain, Award, Users, ArrowRight, CheckCircle2, MapPin, Star, Phone, Mail } from "lucide-react";

/* ── Our Guides ── */
const guides = [
  {
    name: "Mr. Asmar Hussain",
    role: "Lead Tour Guide & Founder",
    expertise: "Gilgit-Baltistan, Karakoram, Hunza, Skardu, K2 Region",
    bio: "A seasoned mountaineer and cultural expert with years of experience leading private expeditions across Pakistan's most extraordinary landscapes. Asmar's deep local knowledge and passion for storytelling transform every journey into an unforgettable experience.",
    image: "/asmar.png",
  },
  {
    name: "Uzair Ahmed",
    role: "Senior Tour Guide",
    expertise: "Kashmir, Neelum Valley, Swat, Chitral, Lahore Heritage",
    bio: "With extensive field experience across Pakistan's diverse terrains, Uzair specialises in culturally immersive itineraries. His attention to detail and genuine warmth make every client feel like a guest, not a tourist.",
    image: "/uzair.png",
  },
];

/* ── Core Values ── */
const values = [
  {
    icon: Heart,
    title: "Truly Customized",
    desc: "We design every itinerary from the ground up — around your group's interests, travel style, and timeline. Not a template. Not a compromise.",
  },
  {
    icon: Mountain,
    title: "Pakistan Specialists",
    desc: "We operate exclusively within Pakistan, giving us unmatched knowledge of terrain, seasons, logistics, and hidden gems most operators never reach.",
  },
  {
    icon: Users,
    title: "Private Departures Only",
    desc: "Your journey belongs to you. We run exclusively private trips — no shared groups, no strangers, no diluted experiences.",
  },
  {
    icon: Award,
    title: "Uncompromising Standards",
    desc: "From handpicked accommodations to vetted field guides — quality is non-negotiable. Every detail is reviewed, confirmed, and held to the highest bar.",
  },
];

/* ── Stats ── */
const stats = [
  { value: "2", label: "Expert Licensed Guides" },
  { value: "1,000+", label: "Happy Travellers" },
  { value: "12+", label: "Destinations Across Pakistan" },
  { value: "65%", label: "Repeat Client Rate" },
];

/* ── Pakistan Regions We Cover ── */
const regions = [
  { name: "Gilgit-Baltistan", places: "Hunza, Skardu, Shigar, Passu, Attabad Lake", image: "/destinations/hunza/attabad_lake.jpg" },
  { name: "Khyber Pakhtunkhwa", places: "Swat, Nathia Gali, Kalash Valley, Neelum", image: "/destinations/chitral/haldi_cones.jpg" },
  { name: "Punjab & Lahore", places: "Lahore Heritage, Cholistan Desert, Rohtas Fort", image: "/destinations/lahore/lahore_fort.jpg" },
  { name: "Balochistan Coast", places: "Gwadar, Ormara, Makran Coastal Highway", image: "/autumn-indus.jpg" },
];

export default function AboutClient() {
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "160px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="/destinations/hunza/hunza_autumn1.jpg"
            alt="Hunza Valley Pakistan"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0B1628 0%, rgba(11,22,40,0.6) 50%, #0B1628 100%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: "56rem", margin: "0 auto", textAlign: "center", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#FFC20A", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "20px" }}
          >
            <MapPin style={{ width: "14px", height: "14px" }} /> Expert-Led Journeys · Wah Cantt, Pakistan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ margin: "0 0 20px", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, color: "white" }}
          >
            Pakistan&apos;s Most Trusted<br />
            <span style={{ color: "#FFC20A" }}>Customized Tour Specialists</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 36px" }}
          >
            Pakistan is one of the world’s most extraordinary travel destinations — a land where impossible mountain ranges meet ancient civilizations, where remote valleys rival anything you’ve seen in a lifetime of travel. TravelBug.pk is the specialist operator locals trust to show Pakistan at its most authentic.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}
          >
            {stats.map(({ value, label }) => (
              <div key={label} style={{
                padding: "16px 24px", borderRadius: "16px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center", minWidth: "120px",
              }}>
                <p style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: 900, color: "#FFC20A" }}>{value}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR STORY / MISSION ── */}
      <section style={{ padding: "80px 32px", background: "rgba(6,14,26,0.8)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px" }}>Our Mission</p>
            <h2 style={{ margin: "0 0 20px", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "white", lineHeight: 1.2 }}>
              Unveiling Pakistan&apos;s Greatest Wonders —
              <br /><span style={{ color: "#FFC20A" }}>Crafted Around You.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "24px", fontSize: "15px" }}>
              Pakistan is not just a destination — it is an experience unlike anything else on earth. From the savage beauty of the Karakoram, where five of the world&apos;s 14 eight-thousanders pierce the sky, to the timeless grandeur of Mughal architecture in Lahore, to the untouched coastline of Makran — this country rewards those who truly explore it.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "28px", fontSize: "15px" }}>
              At TravelBug.pk, we don&apos;t sell tours — <strong style={{ color: "white" }}>we architect journeys.</strong> Every itinerary is built from scratch around your vision, your group, and your pace. No fixed schedules. No shared buses. No compromises. Just pure, purposeful travel designed entirely for you.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Bespoke itineraries — built from scratch, never off-the-shelf",
                "Vetted local guides with region-specific expertise",
                "Exclusive private departures — your group, your rules",
                "Full transparency — every detail confirmed before we proceed",
                "Round-the-clock field support across every destination",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <CheckCircle2 style={{ width: "18px", height: "18px", color: "#FFC20A", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
            <div style={{ borderRadius: "24px", overflow: "hidden", height: "420px" }}>
              <img
                src="/destinations/skardu/machlu_peaks.jpg"
                alt="Pakistan Mountains - Karakoram Range"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute", bottom: "-20px", left: "-20px",
              background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
              borderRadius: "18px", padding: "18px 22px",
              boxShadow: "0 16px 48px rgba(255,194,10,0.4)",
            }}>
              <p style={{ margin: "0 0 2px", fontSize: "15px", fontWeight: 900, color: "#0B1628" }}>Expert-Led</p>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(11,22,40,0.7)", fontWeight: 600 }}>Asmar Hussain &amp; Uzair</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHERE WE OPERATE ── */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>Our Coverage</p>
            <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "white" }}>
              Every Corner of <span style={{ color: "#FFC20A" }}>Pakistan</span>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {regions.map(({ name, places, image }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{
                  borderRadius: "18px", overflow: "hidden", position: "relative", height: "260px",
                  cursor: "default",
                }}
              >
                <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(11,22,40,0.95) 0%, rgba(11,22,40,0.3) 60%, transparent 100%)",
                }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <MapPin style={{ width: "12px", height: "12px", color: "#FFC20A" }} />
                    <span style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{name}</span>
                  </div>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{places}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "80px 32px", background: "rgba(6,14,26,0.8)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>What We Stand For</p>
            <h2 style={{ margin: 0, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "white" }}>
              Our Core <span style={{ color: "#FFC20A" }}>Principles</span>
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{
                  padding: "28px", borderRadius: "18px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                whileHover={{ borderColor: "rgba(255,194,10,0.3)", y: -4 }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px",
                }}>
                  <Icon style={{ width: "22px", height: "22px", color: "#FFC20A" }} />
                </div>
                <h3 style={{ margin: "0 0 10px", fontWeight: 700, color: "white", fontSize: "16px" }}>{title}</h3>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR GUIDES ── */}
      <section id="team" style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "56px" }}
          >
            <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px" }}>Meet the Team</p>
            <h2 style={{ margin: "0 0 16px", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "white" }}>
              Experienced Tour <span style={{ color: "#FFC20A" }}>Guides</span>
            </h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "15px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
              Every TravelBug journey is led personally by one of our expert guides — people who know Pakistan intimately and care deeply about your experience.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
            {guides.map(({ name, role, expertise, bio, image }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  padding: "32px", borderRadius: "24px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,194,10,0.15)",
                  display: "flex", flexDirection: "column", gap: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Avatar + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0,
                    overflow: "hidden",
                    border: "3px solid #FFC20A",
                    boxShadow: "0 8px 24px rgba(255,194,10,0.35)",
                    background: "#0B1628",
                  }}>
                    <img 
                      src={image} 
                      alt={name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} 
                    />
                  </div>
                  <div>
                    <p style={{ margin: "0 0 3px", color: "white", fontWeight: 900, fontSize: "20px" }}>{name}</p>
                    <p style={{ margin: 0, color: "#FFC20A", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{role}</p>
                  </div>
                </div>
                
                {/* Expertise */}
                <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(255,194,10,0.05)", border: "1px solid rgba(255,194,10,0.1)" }}>
                  <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.4)", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>Expertise</p>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 600, lineHeight: 1.4 }}>{expertise}</p>
                </div>

                {/* Bio */}
                <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.75 }}>{bio}</p>

                {/* Subtle Glow */}
                <div style={{ 
                  position: "absolute", top: "-50px", right: "-50px", 
                  width: "120px", height: "120px", borderRadius: "50%", 
                  background: "rgba(255,194,10,0.05)", filter: "blur(40px)",
                  pointerEvents: "none"
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (Testimonial bar) ── */}
      <section style={{ padding: "60px 32px", background: "rgba(6,14,26,0.9)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(255,194,10,0.1) 0%, rgba(255,194,10,0.03) 100%)",
            border: "1px solid rgba(255,194,10,0.2)",
            padding: "48px",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center",
          }}>
            <div>
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: "20px", height: "20px", fill: "#FFC20A", color: "#FFC20A" }} />)}
              </div>
              <p style={{ margin: "0 0 20px", color: "white", fontSize: "20px", fontWeight: 700, lineHeight: 1.5, fontStyle: "italic" }}>
                &ldquo;TravelBug.pk planned our family trip to Hunza and Skardu perfectly. Every hotel, every transfer, every detail was exactly as we requested. Our kids still talk about it as the best holiday of their lives.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#FFC20A", fontWeight: 800, fontSize: "16px" }}>FA</span>
                </div>
                <div>
                  <p style={{ margin: 0, color: "white", fontWeight: 700, fontSize: "14px" }}>Farhan Ahmed</p>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Karachi → Hunza + Skardu, July 2024</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { num: "100%", text: "Custom-built itineraries — no fixed packages ever" },
                { num: "2", text: "Expert licensed guides — Asmar Hussain & Uzair" },
                { num: "24/7", text: "On-trip support from our Pakistan-based team" },
                { num: "65%", text: "Clients who come back for a second journey with us" },
              ].map(({ num, text }) => (
                <div key={num} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span style={{ color: "#FFC20A", fontWeight: 900, fontSize: "18px", minWidth: "60px" }}>{num}</span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section style={{ padding: "60px 32px" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          <div style={{
            flex: "1 1 280px", padding: "28px", borderRadius: "18px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", gap: "16px", alignItems: "center",
          }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Phone style={{ width: "20px", height: "20px", color: "#22c55e" }} />
            </div>
            <div>
              <p style={{ margin: "0 0 3px", color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Call / WhatsApp</p>
              <p style={{ margin: 0, color: "white", fontWeight: 700, fontSize: "16px" }}>+92 324 8888889</p>
              <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>+92 334 4334411</p>
            </div>
          </div>
          <div style={{
            flex: "1 1 280px", padding: "28px", borderRadius: "18px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", gap: "16px", alignItems: "center",
          }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Mail style={{ width: "20px", height: "20px", color: "#FFC20A" }} />
            </div>
            <div>
              <p style={{ margin: "0 0 3px", color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email Us</p>
              <p style={{ margin: 0, color: "white", fontWeight: 700, fontSize: "16px" }}>travelbugpakistan@gmail.com</p>
            </div>
          </div>
          <div style={{
            flex: "1 1 280px", padding: "28px", borderRadius: "18px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", gap: "16px", alignItems: "center",
          }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MapPin style={{ width: "20px", height: "20px", color: "#FFC20A" }} />
            </div>
            <div>
              <p style={{ margin: "0 0 3px", color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Based In</p>
              <p style={{ margin: 0, color: "white", fontWeight: 700, fontSize: "16px" }}>B-89, Post Office Rd, Wah Cantt, Punjab</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "40px 32px 80px" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 12px", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "white" }}>
            Your Next Great Adventure<br />
            <span style={{ color: "#FFC20A" }}>Begins With a Conversation.</span>
          </h2>
          <p style={{ margin: "0 0 28px", color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.7, maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>
            Tell us where you want to go. We&apos;ll handle everything else — from the first night to the final kilometre.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/tours"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 32px", borderRadius: "14px",
                background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628",
                fontWeight: 800, fontSize: "15px", textDecoration: "none",
                boxShadow: "0 8px 32px rgba(255,194,10,0.3)",
              }}
              id="about-explore-btn"
            >
              Explore Destinations <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "16px 28px", borderRadius: "14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                color: "white", fontWeight: 700, fontSize: "15px", textDecoration: "none",
              }}
              id="about-contact-btn"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
