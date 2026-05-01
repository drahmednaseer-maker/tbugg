"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  { src: "/autumn-gulmit.jpg",      label: "Gulmit, Hunza" },
  { src: "/spring-blossoms.jpg",    label: "Spring Blossoms, Hunza" },
  { src: "/skardu1.jpg",            label: "Skardu" },
  { src: "/hunza1.jpg",             label: "Passu, Hunza" },
  { src: "/autumn-ghuwari.jpg",     label: "Ghuwari Valley" },
  { src: "/skardu-machlu.jpg",      label: "Machlu Peaks, Skardu" },
  { src: "/chitral-haldi.jpg",      label: "Haldi, Chitral" },
  { src: "/autumn-kundus.jpg",      label: "Kundus Valley" },
  { src: "/spring-passu.jpg",       label: "Passu Cones, Spring" },
  { src: "/kalash.jpg",             label: "Kalash Valley" },
  { src: "/mountains-haldi.jpg",    label: "Haldi Cones" },
  { src: "/skardu-katpana.jpg",     label: "Katpana Desert" },
  { src: "/autumn-machlu.jpg",      label: "Machlu, Autumn" },
  { src: "/spring-gulshan.jpg",     label: "Gulshan-e-Kabir" },
  { src: "/shandur-polo.jpg",       label: "Shandur Polo Ground" },
  { src: "/autumn-daghoni.jpg",     label: "Daghoni Village" },
  { src: "/hunza-passu-cones.jpg",  label: "Passu Cones" },
  { src: "/autumn-indus.jpg",       label: "Indus River" },
  { src: "/spring-swat.jpg",        label: "Swat Valley" },
  { src: "/autumn-skardu.jpg",      label: "Skardu Basin, Autumn" },
];

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused,   setPaused]   = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  // Pause marquee on page scroll via IntersectionObserver + scroll
  useEffect(() => {
    const onScroll = () => setPaused(true);
    const onScrollEnd = () => { setTimeout(() => setPaused(false), 800); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % PHOTOS.length : null);

  // Keyboard nav in lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     closeLightbox();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section
      id="gallery"
      style={{
        background: "linear-gradient(180deg, #060B18 0%, #070E1C 100%)",
        padding: "80px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: "48px", padding: "0 40px" }}
      >
        <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>
          Through the Lens
        </p>
        <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.1, margin: "0 0 14px" }}>
          Pakistan in Every Frame
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
          Every image is shot on location by our photographer-guides. Click any photo to explore it full screen.
        </p>
      </motion.div>

      {/* ── Marquee strip ─────────────────────────────────────────────────── */}
      <div
        ref={stripRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ overflow: "hidden", width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            gap: "14px",
            width: "max-content",
            animation: "marquee 60s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {/* Images duplicated for seamless loop */}
          {[...PHOTOS, ...PHOTOS].map((photo, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i % PHOTOS.length)}
              style={{
                flex: "0 0 240px",
                height: "160px",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                cursor: "zoom-in",
                border: "1.5px solid rgba(255,255,255,0.07)",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,194,10,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <img
                src={photo.src}
                alt={photo.label}
                draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
              />
              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 35%, transparent 100%)",
                opacity: 0, transition: "opacity 0.3s",
              }}
                className="gallery-overlay"
              />
              <div style={{ position: "absolute", bottom: 10, left: 12, right: 12, opacity: 0, transition: "opacity 0.3s", pointerEvents: "none" }}
                className="gallery-label">
                <p style={{ color: "white", fontSize: "12px", fontWeight: 700, margin: 0 }}>{photo.label}</p>
              </div>
              {/* Zoom icon */}
              <div style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(255,194,10,0.85)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.25s", transform: "scale(0.8)", transition: "opacity 0.25s, transform 0.25s" }}
                className="gallery-zoom">
                <ZoomIn style={{ width: 13, height: 13, color: "#0B1628" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(16px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
            >
              <X style={{ width: 18, height: 18 }} />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
            >
              <ChevronLeft style={{ width: 20, height: 20 }} />
            </button>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}
            >
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>

            {/* Image */}
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3}}
              style={{ position: "relative", maxWidth: "min(90vw, 1100px)", maxHeight: "85vh", borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox}
                  src={PHOTOS[lightbox].src}
                  alt={PHOTOS[lightbox].label}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ display: "block", maxWidth: "min(90vw, 1100px)", maxHeight: "82vh", objectFit: "contain" }}
                />
              </AnimatePresence>
              {/* Caption */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                <p style={{ color: "#FFC20A", fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px" }}>TravelBug.pk</p>
                <p style={{ color: "white", fontSize: "16px", fontWeight: 800, margin: 0 }}>{PHOTOS[lightbox].label}</p>
              </div>
              {/* Counter */}
              <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "4px 12px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 700, margin: 0 }}>{lightbox + 1} / {PHOTOS.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee keyframe + hover effects injected via style tag */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        div:hover > .gallery-overlay { opacity: 1 !important; }
        div:hover > .gallery-label   { opacity: 1 !important; }
        div:hover > .gallery-zoom    { opacity: 1 !important; transform: scale(1) !important; }
      `}</style>
    </section>
  );
}
