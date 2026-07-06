"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/data/destinations";

const tagColors: Record<string, { bg: string; text: string; glow: string }> = {
  "Blossoms":    { bg: "#F472B6", text: "#fff", glow: "rgba(244,114,182,0.4)" },
  "Autumn":      { bg: "#F97316", text: "#fff", glow: "rgba(249,115,22,0.4)"  },
  "Cultural":    { bg: "#7C3AED", text: "#fff", glow: "rgba(124,58,237,0.4)"  },
  "Coastal":     { bg: "#0891B2", text: "#fff", glow: "rgba(8,145,178,0.4)"   },
  "Karakorams":  { bg: "#0F766E", text: "#fff", glow: "rgba(15,118,110,0.4)"  },
  "Adventure":   { bg: "#2563EB", text: "#fff", glow: "rgba(37,99,235,0.4)"   },
  "Religious":   { bg: "#D97706", text: "#fff", glow: "rgba(217,119,6,0.4)"   },
  "Sports":      { bg: "#DC2626", text: "#fff", glow: "rgba(220,38,38,0.4)"   },
};

// Preload images so hover switching is instant
function usePreloadImages(srcs: string[]) {
  useEffect(() => {
    srcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);
}

function DestCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  usePreloadImages(dest.images);

  const prev = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx((i) => (i - 1 + dest.images.length) % dest.images.length);
  }, [dest.images.length]);

  const next = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx((i) => (i + 1) % dest.images.length);
  }, [dest.images.length]);

  const tag = dest.tag ? tagColors[dest.tag] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ position: "relative" }}
    >
      <Link
        href={`/destinations/${dest.id}`}
        id={`dest-${dest.id}`}
        data-cursor="view"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          display: "block",
          borderRadius: "22px",
          overflow: "hidden",
          height: "300px",
          cursor: "pointer",
          textDecoration: "none",
          boxShadow: hovered
            ? "0 24px 60px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,194,10,0.5)"
            : "0 8px 32px rgba(0,0,0,0.4)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "box-shadow 0.35s ease, transform 0.35s ease",
        }}
      >
        {/* Images — stacked, GPU accelerated */}
        {dest.images.map((src, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === imgIdx ? 1 : 0,
              transition: "opacity 0.45s ease",
              willChange: "opacity",
            }}
          >
            <img loading="lazy" decoding="async"
              src={src}
              alt={dest.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: i === imgIdx && hovered ? "scale(1.07)" : "scale(1)",
                transition: "transform 6s ease",
                willChange: "transform",
                transformOrigin: i % 2 === 0 ? "center center" : "70% 30%",
              }}
            />
          </div>
        ))}

        {/* Gradient overlays */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(to top, rgba(4,9,20,0.97) 0%, rgba(4,9,20,0.5) 45%, rgba(4,9,20,0.1) 100%)",
        }} />
        {/* Subtle vignette sides */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(4,9,20,0.4) 100%)",
        }} />

        {/* Tag */}
        {dest.tag && tag && (
          <div style={{
            position: "absolute", top: "16px", left: "16px", zIndex: 10,
            padding: "5px 14px", borderRadius: "999px",
            background: tag.bg, color: tag.text,
            fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: `0 2px 12px ${tag.glow}`,
          }}>
            {dest.tag}
          </div>
        )}

        {/* Dot indicators — top right */}
        {dest.images.length > 1 && (
          <div style={{
            position: "absolute", top: "18px", right: "16px", zIndex: 10,
            display: "flex", gap: "5px", alignItems: "center",
          }}>
            {dest.images.map((_, i) => (
              <div key={i} style={{
                height: "6px",
                width: i === imgIdx ? "20px" : "6px",
                borderRadius: "3px",
                background: i === imgIdx ? "#FFC20A" : "rgba(255,255,255,0.35)",
                transition: "all 0.35s ease",
              }} />
            ))}
          </div>
        )}

        {/* Arrow nav — only visible on hover */}
        {dest.images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: "absolute", left: "10px", top: "50%",
                transform: `translateY(-50%) translateX(${hovered ? "0" : "-8px"})`,
                zIndex: 20, width: "34px", height: "34px", borderRadius: "50%",
                background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <ChevronLeft style={{ width: 16, height: 16 }} />
            </button>
            <button
              onClick={next}
              style={{
                position: "absolute", right: "10px", top: "50%",
                transform: `translateY(-50%) translateX(${hovered ? "0" : "8px"})`,
                zIndex: 20, width: "34px", height: "34px", borderRadius: "50%",
                background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)",
                color: "white", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          </>
        )}

        {/* Bottom info */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          zIndex: 10, padding: "22px 22px 20px",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.35s ease",
        }}>
          <p style={{
            color: "rgba(255,255,255,0.65)", fontSize: "13px", lineHeight: 1.6,
            maxHeight: hovered ? "80px" : "0px",
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transition: "max-height 0.4s ease, opacity 0.3s ease",
            marginBottom: hovered ? "10px" : 0,
          }}>
            {dest.description}
          </p>

          {/* Explore CTA — only on hover */}
          <div style={{
            marginTop: hovered ? "4px" : "0",
            opacity: hovered ? 1 : 0,
            maxHeight: hovered ? "40px" : "0",
            overflow: "hidden",
            transition: "all 0.35s ease",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 800, letterSpacing: "0.05em" }}>
              EXPLORE TOURS
            </span>
            <div style={{
              height: "1px", flex: 1,
              background: "linear-gradient(to right, rgba(255,194,10,0.6), transparent)",
            }} />
            <ChevronRight style={{ width: 14, height: 14, color: "#FFC20A" }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedDestinations() {
  return (
    <section style={{ padding: "96px 0" }} id="destinations">
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "60px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            color: "#FFC20A", fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px",
          }}>
            Top Destinations
          </p>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900,
            color: "white", lineHeight: 1.1, marginBottom: "18px",
          }}>
            Where Will You Go{" "}
            <span style={{ color: "#FFC20A" }}>
              Next?
            </span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.5)", maxWidth: "500px",
            margin: "0 auto", lineHeight: 1.7, fontSize: "15px",
          }}>
            Pakistan's most extraordinary destinations. Hover over any card and use arrows to browse photos.
          </p>
        </motion.div>

        {/* Uniform grid */}
        <div className="fd-grid">
          {destinations.map((dest, i) => (
            <DestCard key={dest.id} dest={dest} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          style={{ textAlign: "center", marginTop: "52px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/destinations"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "16px 44px", borderRadius: "14px",
              border: "1.5px solid rgba(255,194,10,0.4)",
              color: "#FFC20A", fontSize: "14px", fontWeight: 700,
              textDecoration: "none", background: "rgba(255,194,10,0.06)",
              letterSpacing: "0.04em",
            }}
          >
            View All Destinations
            <ChevronRight style={{ width: 16, height: 16 }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
