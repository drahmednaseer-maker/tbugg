"use client";

import { motion } from "framer-motion";
import { Shield, MessageCircle, Award, Compass, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    tag: "AWARD-WINNING",
    title: "Led by the Photographers, Not an Agent",
    description:
      "Asmar, Uzair and Dr Usman personally lead every tour. Published in National Geographic and recognized internationally — you travel with the artists, not a hired third party reading from a script.",
    accent: "#FFC20A",
    wide: true,
  },
  {
    icon: Compass,
    tag: "TAILOR-MADE",
    title: "Built Entirely Around You",
    description:
      "No packages. No shared itineraries. Every route, every hotel, every stop is designed from scratch around what you actually want — before you pay a single rupee.",
    accent: "#22c55e",
    wide: false,
  },
  {
    icon: Shield,
    tag: "18+ YEARS",
    title: "Deep Local Expertise",
    description:
      "We know which passes to avoid in monsoon, which camps have the best Milky Way views, and which hidden valleys most operators have never seen. This is hard-earned, on-the-ground knowledge.",
    accent: "#60a5fa",
    wide: false,
  },
  {
    icon: Users,
    tag: "MAX 12 GUESTS",
    title: "Small Groups, Real Connections",
    description:
      "Not a crowd on a bus — a small circle of like-minded travelers experiencing Pakistan the way it was meant to be explored. Personal attention. Genuine moments. Lasting friendships.",
    accent: "#a78bfa",
    wide: false,
  },
  {
    icon: MessageCircle,
    tag: "NO HIDDEN COSTS",
    title: "Complete Transparency, Always",
    description:
      "Your entire journey is planned over WhatsApp. Every detail, every cost, every decision — visible to you. What you agree to is what you pay. No fine print, no surprises.",
    accent: "#f97316",
    wide: false,
  },
  {
    icon: Clock,
    tag: "24/7 SUPPORT",
    title: "With You Every Step of the Way",
    description:
      "From your first message to the moment you arrive home. Flight delayed? Weather changed? Route update needed? We respond — not a call centre, but the people who designed your trip.",
    accent: "#ec4899",
    wide: false,
  },
];

const stats = [
  { value: "18+",    label: "Years on the Ground",    sub: "Foreign & domestic guests" },
  { value: "2,000+", label: "Travelers Guided",        sub: "Across 30+ destinations" },
  { value: "100%",   label: "Custom Itineraries",      sub: "Never a copy-paste package" },
  { value: "12",     label: "Max Group Size",           sub: "Always personal, always real" },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      style={{
        padding: "110px 0 100px",
        background: "linear-gradient(180deg, #070E1C 0%, #060B18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px", height: "800px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,194,10,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* ── Section Header ── */}
        <motion.div
          style={{ maxWidth: "680px", marginBottom: "72px" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            color: "#FFC20A", fontSize: "11px", fontWeight: 800,
            letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px",
          }}>
            Why TravelBug.pk
          </p>
          <h2 style={{
            color: "white", fontWeight: 900,
            fontSize: "clamp(30px, 4.5vw, 52px)",
            lineHeight: 1.1, marginBottom: "20px",
          }}>
            Everything You Need.{" "}
            <span style={{ color: "#FFC20A" }}>Nothing You Don&apos;t.</span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.45)", fontSize: "16px",
            lineHeight: 1.75, maxWidth: "560px",
          }}>
            There are a thousand tour companies. Here&apos;s what makes TravelBug different —
            and why travelers from 30+ countries trust us with their most anticipated trips.
          </p>
        </motion.div>

        {/* ── Feature Grid ── */}
        <div className="why-bento-grid" style={{ marginBottom: "56px" }}>
          {features.map(({ icon: Icon, tag, title, description, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                padding: "32px",
                borderRadius: "20px",
                background: i === 0
                  ? `linear-gradient(135deg, ${accent}10, rgba(255,255,255,0.02))`
                  : "rgba(255,255,255,0.025)",
                border: i === 0
                  ? `1px solid ${accent}35`
                  : "1px solid rgba(255,255,255,0.07)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 32, right: 32, height: "2px",
                background: `linear-gradient(90deg, ${accent}, transparent)`,
                borderRadius: "0 0 2px 2px",
              }} />

              {/* Tag */}
              <p style={{
                color: accent, fontSize: "9px", fontWeight: 900,
                letterSpacing: "0.2em", textTransform: "uppercase",
                marginBottom: "14px",
              }}>
                {tag}
              </p>

              {/* Icon */}
              <div style={{
                width: "46px", height: "46px", borderRadius: "13px",
                background: `${accent}15`,
                border: `1px solid ${accent}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "18px",
              }}>
                <Icon style={{ width: "20px", height: "20px", color: accent }} />
              </div>

              <h3 style={{
                color: "white", fontWeight: 800, fontSize: "16px",
                marginBottom: "10px", lineHeight: 1.35,
              }}>
                {title}
              </h3>
              <p style={{
                color: "rgba(255,255,255,0.42)", fontSize: "13px",
                lineHeight: 1.75, margin: 0,
              }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="why-stats-row"
          style={{
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(255,194,10,0.07), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,194,10,0.18)",
            padding: "44px 56px",
          }}
        >
          {stats.map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                fontSize: "clamp(30px, 3vw, 44px)", fontWeight: 900,
                color: "#FFC20A", lineHeight: 1, marginBottom: "6px",
              }}>
                {value}
              </div>
              <div style={{
                color: "white", fontSize: "13px",
                fontWeight: 700, marginBottom: "4px",
              }}>
                {label}
              </div>
              <div style={{
                color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 400,
              }}>
                {sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
