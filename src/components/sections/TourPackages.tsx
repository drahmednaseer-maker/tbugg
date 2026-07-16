"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Camera, Users, ChevronLeft, ChevronRight, MessageCircle, Star } from "lucide-react";

// All photos from Asmar's photography collection
const slides = [
  {
    image: "/destinations/charakusa/charakusa_basecamp.jpg",
    title: "Charakusa Trek",
    caption: "A vertical wilderness of granite towers and glaciers — the ultimate photographer's playground",
    type: "Exclusive Expedition",
  },
  {
    image: "/spring-passu.jpg",
    title: "Spring Blossoms, Passu — Hunza",
    caption: "Every photo tells a story — we make sure yours is unforgettable",
    type: "Blossoms Tour",
  },
  {
    image: "/hunza-passu-cones.jpg",
    title: "Passu Cones, Hunza Valley",
    caption: "Raw peaks, dramatic skies — captured by eyes that live for this",
    type: "Photography Tour",
  },
  {
    image: "/autumn-katpana.jpg",
    title: "Autumn at Katpana, Skardu",
    caption: "Pakistan's most surreal landscapes, guided by those who know them best",
    type: "Autumn Tour",
  },
  {
    image: "/autumn-skardu.jpg",
    title: "Skardu Valley in Autumn",
    caption: "Golden valleys, crystal rivers — autumn in Pakistan is unlike anywhere on earth",
    type: "Autumn Tour",
  },
  {
    image: "/autumn-machlu.jpg",
    title: "Machlu Valley, Gilgit-Baltistan",
    caption: "We don't just take you there — we show you how to see it",
    type: "Group Trek",
  },
  {
    image: "/autumn-jamalabad.jpg",
    title: "Jamalabad, Hunza",
    caption: "Small groups, no rush, pure immersion in Pakistan's greatest wild places",
    type: "Small Group",
  },
  {
    image: "/autumn-gulmit.jpg",
    title: "Gulmit Village, Upper Hunza",
    caption: "When photographers guide your journey, every moment is worth framing",
    type: "Photography Tour",
  },
  {
    image: "/autumn-daghoni.jpg",
    title: "Daghoni, Gilgit-Baltistan",
    caption: "Hidden valleys known only to those who have spent decades exploring",
    type: "Customised Tour",
  },
  {
    image: "/spring-blossoms.jpg",
    title: "Cherry Blossoms, Gilgit-Baltistan",
    caption: "Blossom season is a window — we make sure you're there for it",
    type: "Seasonal Tour",
  },
  {
    image: "/autumn-indus.jpg",
    title: "Indus River Valley",
    caption: "The ancient Indus — a river of civilisations, still flowing wild",
    type: "Customised Tour",
  },
  {
    image: "/skardu-machlu.jpg",
    title: "Machlu Peaks, Skardu",
    caption: "K2 country — among the most dramatic mountain terrain on the planet",
    type: "High Altitude Trek",
  },
  {
    image: "/chitral-haldi.jpg",
    title: "Haldi, Gilgit-Baltistan",
    caption: "The season is our canvas — sunrise, golden hour, and starlit skies",
    type: "Customised Tour",
  },
];

const highlights = [
  { icon: Camera,        label: "Photographers-Led",  desc: "Every guide is a professional photographer" },
  { icon: Users,         label: "Small Groups",       desc: "Max 12 per group — never a crowd"          },
  { icon: Star,          label: "100% Customised",    desc: "No fixed packages — your journey, your way" },
  { icon: MessageCircle, label: "WhatsApp Planning",  desc: "Plan your entire trip directly with us"     },
];

export default function TourPackages() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const total = slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [autoplay, next]);

  return (
    <section id="tours" style={{ padding: "96px 0", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>

        {/* ── Header ────────────────────────────── */}
        <motion.div
          style={{ marginBottom: "64px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>
            About Our Tours
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "white", lineHeight: 1.1 }}>
              Journeys Crafted by{" "}
              <span style={{ color: "#FFC20A" }}>
                Photographers
              </span>
            </h2>
            <Link
              href="/tours"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "14px",
                background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                color: "#0B1628", fontSize: "14px", fontWeight: 800,
                textDecoration: "none", whiteSpace: "nowrap",
                boxShadow: "0 8px 24px rgba(255,194,10,0.3)",
              }}
            >
              <MessageCircle style={{ width: 16, height: 16 }} />
              Plan My Tour
            </Link>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: 1.75, maxWidth: "640px", marginTop: "20px" }}>
            TravelBug.pk is run by professional photographers who have spent years exploring every corner of Pakistan.
            We don't sell packages — we craft every journey uniquely around <em style={{ color: "rgba(255,255,255,0.75)", fontStyle: "normal", fontWeight: 600 }}>your dates, your group, and your vision</em>.
          </p>
        </motion.div>

        {/* ── Highlights row ─────────────────────── */}
        <motion.div
          className="tp-grid"
          style={{ marginBottom: "64px" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {highlights.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              style={{
                padding: "24px 20px", borderRadius: "20px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", flexDirection: "column", gap: "10px",
              }}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "14px",
                background: "rgba(255,194,10,0.15)", border: "1px solid rgba(255,194,10,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon style={{ width: 20, height: 20, color: "#FFC20A" }} />
              </div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "14px" }}>{label}</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Cinematic Slideshow ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Slideshow label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Camera style={{ width: 16, height: 16, color: "#FFC20A" }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 600 }}>
                Asmar's Photography — Pakistan Through Our Lens
              </span>
            </div>
            {/* Arrow controls */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => { prev(); setAutoplay(false); }}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <ChevronLeft style={{ width: 18, height: 18 }} />
              </button>
              <button
                onClick={() => { next(); setAutoplay(false); }}
                style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <ChevronRight style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>

          {/* Main slide */}
          <Link
            href="/tours"
            style={{ position: "relative", borderRadius: "28px", overflow: "hidden", height: "520px", cursor: "pointer", display: "block", textDecoration: "none" }}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                style={{ position: "absolute", inset: 0 }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Cinematic gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(4,9,20,0.9) 0%, rgba(4,9,20,0.3) 50%, rgba(4,9,20,0.15) 100%)",
                }} />
                {/* Left side vignette */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, rgba(4,9,20,0.7) 0%, transparent 50%)",
                }} />
              </motion.div>
            </AnimatePresence>

            {/* Slide text */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "40px 44px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${current}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Type pill */}
                  <span style={{
                    display: "inline-block", padding: "5px 16px", borderRadius: "999px",
                    background: "rgba(255,194,10,0.2)", border: "1px solid rgba(255,194,10,0.4)",
                    color: "#FFC20A", fontSize: "11px", fontWeight: 800,
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px",
                  }}>
                    {slides[current].type}
                  </span>
                  <h3 style={{ color: "white", fontWeight: 900, fontSize: "clamp(22px, 4vw, 36px)", lineHeight: 1.1, marginBottom: "12px" }}>
                    {slides[current].title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.6, maxWidth: "540px" }}>
                    {slides[current].caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot progress */}
            <div style={{
              position: "absolute", bottom: "44px", right: "44px", zIndex: 10,
              display: "flex", gap: "6px", alignItems: "center",
            }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setAutoplay(false); }}
                  style={{
                    height: "6px",
                    width: i === current ? "28px" : "6px",
                    borderRadius: "3px",
                    background: i === current ? "#FFC20A" : "rgba(255,255,255,0.3)",
                    border: "none", cursor: "pointer",
                    transition: "all 0.35s ease", padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Thumbnail strip — next 3 */}
            <div style={{
              position: "absolute", top: "20px", right: "20px", zIndex: 10,
              display: "flex", flexDirection: "column", gap: "8px",
            }}>
              {[1, 2, 3].map((offset) => {
                const idx = (current + offset) % total;
                return (
                  <button
                    key={offset}
                    onClick={() => { setCurrent(idx); setAutoplay(false); }}
                    style={{
                      width: "72px", height: "52px", borderRadius: "10px", overflow: "hidden",
                      border: "2px solid rgba(255,255,255,0.15)", cursor: "pointer", padding: 0,
                      opacity: 0.75, transition: "opacity 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#FFC20A"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.75"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                  >
                    <img
                      src={slides[idx].image}
                      alt={slides[idx].title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </button>
                );
              })}
            </div>
          </Link>




          <div style={{
            marginTop: "24px", padding: "28px 36px", borderRadius: "20px",
            background: "rgba(255,194,10,0.06)", border: "1px solid rgba(255,194,10,0.2)",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px",
          }}>
            <div>
              <p style={{ color: "white", fontWeight: 800, fontSize: "18px", marginBottom: "4px" }}>
                Ready to travel Pakistan — your way?
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>
                Tell us your dates & preferences. We'll design the perfect itinerary — for free.
              </p>
            </div>
            <Link
              href="#tour-builder"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 36px", borderRadius: "14px",
                background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                color: "#0B1628", fontSize: "14px", fontWeight: 900,
                textDecoration: "none", boxShadow: "0 8px 24px rgba(255,194,10,0.25)",
                whiteSpace: "nowrap",
              }}
            >
              <MessageCircle style={{ width: 16, height: 16 }} />
              Start Planning — It's Free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
