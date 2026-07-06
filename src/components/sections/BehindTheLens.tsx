"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { ParallaxY } from "@/components/fx/Parallax";

const team = [
  {
    name: "Muhammad Asmar Hussain",
    role: "Co-Founder · Travel Photographer · Sony Brand Ambassador",
    handle: "@asmarsphotography",
    years: "18 Years",
    quote: "Pakistan is the most breathtaking, underrated country on earth. For 18 years I have been showing the world what they are missing.",
    credentials: [
      "🏆 Best Travel Photographer of Pakistan",
      "📷 Sony Brand Ambassador",
      "🌍 Published in National Geographic",
      "🏅 Numerous National & International Awards",
    ],
    specialties: ["Landscape", "Cultural Photography", "Photo Tours", "National Geographic"],
    photo: "/asmar.png",
    bg: "/hunza1.jpg",
  },
  {
    name: "Uzair Ahmed",
    role: "Founder · High Altitude Guide · Landscape Photographer",
    handle: "@uzairphotography",
    years: "12 Years",
    quote: "The Karakorams are not just a place — they are a feeling. I have spent 12 years making sure every traveler gets to feel exactly that.",
    credentials: [
      "⛰️ 5,000m+ Mountain Trek Specialist",
      "📸 Karakoram Landscape Photography",
      "🌐 Foreign & Domestic Tourist Guide",
      "🏔️ Nation-wide Fame for GB Photography",
    ],
    specialties: ["High Altitude Treks", "Karakorams", "Group Tours", "Foreign Tourists"],
    photo: "/uzair.png",
    bg: "/skardu1.jpg",
  },
];

export default function BehindTheLens() {
  return (
    <section id="team" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "52px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1, marginBottom: "16px" }}>
            Your Journey —{" "}
            <span style={{ color: "#FFC20A" }}>
              Our Experience
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
            With decades of experience travelling all of Pakistan, We will take you to the most Beautiful &amp; breathtaking landscapes of Pakistan.
          </p>
        </motion.div>

        {/* Team cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {team.map((person, i) => (
            <ParallaxY key={person.name} amount={i === 0 ? 26 : -26}>
            <motion.div
              data-fx-lift
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                position: "relative", borderRadius: "24px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {/* Background blurred landscape */}
              <img
                src={person.bg}
                alt=""
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", opacity: 0.12, filter: "blur(2px)",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(4,9,20,0.88)" }} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, padding: "36px 36px 32px" }}>

                {/* Portrait + name row */}
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <img
                      src={person.photo}
                      alt={person.name}
                      style={{
                        width: "96px", height: "96px", borderRadius: "50%",
                        objectFit: "cover", objectPosition: "top center",
                        border: "3px solid rgba(255,194,10,0.5)",
                        boxShadow: "0 0 0 6px rgba(255,194,10,0.1)",
                      }}
                    />
                    <div style={{
                      position: "absolute", bottom: -4, right: -4,
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "2px solid #070E1C",
                    }}>
                      <Camera style={{ width: 13, height: 13, color: "#0B1628" }} />
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", flexWrap: "wrap" }}>
                      <h3 style={{ color: "white", fontWeight: 900, fontSize: "19px" }}>{person.name}</h3>
                      <span style={{
                        padding: "2px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 800,
                        background: "rgba(255,194,10,0.2)", color: "#FFC20A",
                        border: "1px solid rgba(255,194,10,0.3)", whiteSpace: "nowrap",
                      }}>
                        {person.years}
                      </span>
                    </div>
                    <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, marginBottom: "5px", lineHeight: 1.4 }}>{person.role}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{person.handle}</p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote style={{
                  borderLeft: "3px solid rgba(255,194,10,0.5)", paddingLeft: "16px",
                  color: "rgba(255,255,255,0.65)", fontSize: "13px",
                  lineHeight: 1.75, fontStyle: "italic", marginBottom: "20px",
                }}>
                  "{person.quote}"
                </blockquote>

                {/* Credentials */}
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {person.credentials.map((c) => (
                    <div key={c} style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                      {c}
                    </div>
                  ))}
                </div>

                {/* Specialties */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {person.specialties.map((s) => (
                    <span key={s} style={{
                      padding: "4px 12px", borderRadius: "999px", fontSize: "11px",
                      fontWeight: 700, letterSpacing: "0.04em",
                      background: "rgba(255,194,10,0.1)",
                      border: "1px solid rgba(255,194,10,0.25)",
                      color: "#FFC20A",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            </ParallaxY>
          ))}
        </div>


      </div>
    </section>
  );
}
