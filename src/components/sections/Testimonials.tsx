"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import { testimonials } from "@/data/testimonials";

/** Get initials from a full name */
function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Deterministic accent colour per testimonial */
const palette = ["#FFC20A", "#4ECDC4", "#FF6B6B", "#A78BFA", "#F472B6", "#38BDF8", "#34D399", "#FB923C"];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => { setDirection(-1); setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setDirection(1);  setCurrent((p) => (p + 1) % testimonials.length); };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      style={{
        padding: "100px 0",
        background: "linear-gradient(180deg, #060B18 0%, #070E1C 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse, rgba(255,194,10,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* ── Header ── */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "64px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            color: "#FFC20A", fontSize: "11px", fontWeight: 800,
            letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "14px",
          }}>
            Traveler Stories
          </p>
          <h2 style={{
            color: "white", fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.08, marginBottom: "16px",
          }}>
            Real{" "}
            <span style={{
              color: "#FFC20A"
            }}>
              Experiences
            </span>
          </h2>

          {/* Google Rating Badge */}
          <a
            href="https://www.google.com/search?q=TravelBug.pk+reviews"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "10px 20px", borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
              transition: "border-color 0.2s",
              marginTop: "20px",
            }}
          >
            {/* Google coloured dots */}
            <span style={{ display: "flex", gap: "2px" }}>
              {["#4285F4","#EA4335","#FBBC05","#34A853"].map((c, i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "block" }} />
              ))}
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 600 }}>
              5.0 on Google Reviews
            </span>
            <div style={{ display: "flex", gap: "2px" }}>
              {[1,2,3,4,5].map((i) => (
                <Star key={i} style={{ width: 12, height: 12, fill: "#FBBC05", color: "#FBBC05" }} />
              ))}
            </div>
            <ExternalLink style={{ width: 12, height: 12, color: "rgba(255,255,255,0.3)" }} />
          </a>
        </motion.div>

        {/* ── Carousel ── */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter:  (dir: number) => ({ opacity: 0, x: dir * 50 }),
                center: { opacity: 1, x: 0 },
                exit:   (dir: number) => ({ opacity: 0, x: -dir * 50 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: "easeOut" }}
              style={{
                borderRadius: "24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "48px 52px",
              }}
            >
              {/* Quote icon */}
              <Quote style={{ width: 40, height: 40, color: "rgba(255,194,10,0.25)", marginBottom: "24px" }} />

              {/* Review text */}
              <p style={{
                color: "rgba(255,255,255,0.8)", fontSize: "17px",
                lineHeight: 1.85, fontStyle: "italic",
                marginBottom: "36px",
              }}>
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "28px" }} />

              {/* Author row — no avatar image, just name & details */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {/* Initials circle */}
                  <div style={{
                    width: "46px", height: "46px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${palette[current % palette.length]}33, ${palette[current % palette.length]}66)`,
                    border: `2px solid ${palette[current % palette.length]}55`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{
                      color: palette[current % palette.length],
                      fontWeight: 800,
                      fontSize: "14px",
                      letterSpacing: "0.05em",
                    }}>
                      {getInitials(t.name)}
                    </span>
                  </div>
                  <div>
                    <p style={{ color: "white", fontWeight: 800, fontSize: "15px", marginBottom: "3px" }}>{t.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "4px" }}>{t.location}</p>
                    <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700 }}>{t.tour}</p>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "3px", justifyContent: "flex-end", marginBottom: "6px" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        style={{ width: 15, height: 15, fill: i < t.rating ? "#FFC20A" : "transparent", color: i < t.rating ? "#FFC20A" : "rgba(255,255,255,0.15)" }}
                      />
                    ))}
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px" }}>{t.date}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow buttons */}
          {[
            { fn: prev, side: "-60px", id: "testimonial-prev", icon: ChevronLeft },
            { fn: next, side: "-60px", id: "testimonial-next", icon: ChevronRight },
          ].map(({ fn, id, icon: Icon }, i) => (
            <button
              key={id}
              id={id}
              onClick={fn}
              style={{
                position: "absolute",
                top: "50%", transform: "translateY(-50%)",
                [i === 0 ? "left" : "right"]: "-56px",
                width: "44px", height: "44px", borderRadius: "50%",
                background: "rgba(11,22,40,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.6)", cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,194,10,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#FFC20A"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
            >
              <Icon style={{ width: 18, height: 18 }} />
            </button>
          ))}
        </div>

        {/* ── Dots only (no avatar strip) ── */}
        <div style={{ marginTop: "36px", display: "flex", justifyContent: "center", gap: "8px", alignItems: "center" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "28px" : "7px",
                height: "7px", borderRadius: "999px",
                background: i === current ? "#FFC20A" : "rgba(255,255,255,0.15)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
