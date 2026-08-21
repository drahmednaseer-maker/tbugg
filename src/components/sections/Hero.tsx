"use client";

import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Star, ArrowRight, MessageCircle, Check } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const particles = [
  { left: "8%",  top: "15%", dur: 4.2, delay: 0.3 },
  { left: "22%", top: "72%", dur: 5.1, delay: 1.1 },
  { left: "35%", top: "40%", dur: 3.8, delay: 0.7 },
  { left: "48%", top: "88%", dur: 6.0, delay: 0.2 },
  { left: "60%", top: "25%", dur: 4.5, delay: 1.5 },
  { left: "72%", top: "60%", dur: 3.5, delay: 0.9 },
  { left: "85%", top: "10%", dur: 5.5, delay: 0.4 },
  { left: "14%", top: "50%", dur: 3.9, delay: 0.5 },
  { left: "55%", top: "80%", dur: 5.2, delay: 1.3 },
  { left: "78%", top: "30%", dur: 4.1, delay: 0.8 },
];

const PHOTOS = [
  /* ─── Existing TravelBug shots ─── */
  { src: "/autumn-gulmit.jpg",     label: "Gulmit, Hunza"              },
  { src: "/spring-blossoms.jpg",   label: "Spring Blossoms"            },
  { src: "/skardu1.jpg",           label: "Hunza"                      },
  { src: "/hunza1.jpg",            label: "Passu Cones"                },
  { src: "/autumn-ghuwari.jpg",    label: "Ghuwari"                    },
  { src: "/skardu-machlu.jpg",     label: "Machlu Peaks"               },
  { src: "/chitral-haldi.jpg",     label: "Haldi Cones, Machlu"        },
  { src: "/autumn-kundus.jpg",     label: "Kundus"                     },
  { src: "/spring-passu.jpg",      label: "Passu Spring"               },
  { src: "/kalash.jpg",            label: "Kalash Valley"              },
  { src: "/mountains-haldi.jpg",   label: "Haldi Cones"                },
  { src: "/skardu-katpana.jpg",    label: "Katpana Desert"             },
  { src: "/autumn-machlu.jpg",     label: "Machlu"                     },
  { src: "/spring-gulshan.jpg",    label: "Gulshan e Kabir"            },
  { src: "/destinations/shandur/shandur1.jpg",      label: "Shandur Polo"               },
  { src: "/autumn-daghoni.jpg",    label: "Daghoni"                    },
  { src: "/hunza-passu-cones.jpg", label: "Passu Cones"                },
  { src: "/autumn-indus.jpg",      label: "Indus River"                },
  { src: "/spring-swat.jpg",       label: "Spring Swat"                },
  { src: "/autumn-skardu.jpg",     label: "Skardu (Autumn)"            },
  /* ─── New Destinations ─── */
  { src: "/destinations/lahore/lahore_fort.jpg",        label: "Lahore Fort"                  },
  { src: "/destinations/lahore/lahore_main.jpg",        label: "Lahore"                       },
  { src: "/destinations/khaplu/khaplu_main.jpg",        label: "Khaplu, Baltistan"            },
  { src: "/destinations/minimarg/minimarg1.jpg",        label: "Minimarg"                     },
  { src: "/destinations/minimarg/minimarg2.jpg",        label: "Minimarg Meadows"             },
  { src: "/destinations/minimarg/minimarg3.jpg",        label: "Minimarg Valley"              },
  { src: "/destinations/minimarg/minimarg4.jpg",        label: "Minimarg Peaks"               },
  { src: "/destinations/minimarg/minimarg5.jpg",        label: "Minimarg Astore"              },
  { src: "/destinations/minimarg/minimarg6.jpg",        label: "Minimarg Rivers"              },
  { src: "/destinations/minimarg/minimarg7.jpg",        label: "Minimarg Wilderness"          },
  { src: "/destinations/minimarg/minimarg8.jpg",        label: "Minimarg Trail"               },
  { src: "/destinations/islamabad/faisal_mosque.jpg",   label: "Faisal Mosque, Islamabad"     },
  { src: "/destinations/nagar/nagar_main.jpg",          label: "Nagar Valley"                 },
  { src: "/destinations/kashmir/kashmir1.jpg",          label: "Taobat, Kashmir"              },
  { src: "/destinations/kashmir/kashmir2.jpg",          label: "Kashmir Autumn"               },
  { src: "/destinations/kashmir/kashmir3.jpg",          label: "Kashmir — Neelum Valley"      },
  { src: "/destinations/kashmir/kashmir_taobat.jpg",    label: "Taobat Meadows"               },
];

export default function Hero() {
  const [paused,   setPaused]   = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* Pause marquee while page is scrolling */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => { setPaused(true); clearTimeout(timer); timer = setTimeout(() => setPaused(false), 900); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timer); };
  }, []);

  /* Keyboard nav in lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowLeft")  setLightbox(i => i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null);
      if (e.key === "ArrowRight") setLightbox(i => i !== null ? (i + 1) % PHOTOS.length : null);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [lightbox]);

  /* ── Draggable auto-scroll marquee ──────────────────────────────────────
     Auto-scrolls gently; a finger swipe (or mouse drag) takes control and
     pauses it, and it resumes as soon as the touch/drag is released. */
  const marqueeRef = useRef<HTMLDivElement>(null);
  const pausedRef  = useRef(false);
  const dragRef    = useRef({ x: 0, left: 0, active: false });
  const movedRef   = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  /* Hold the auto-scroll until the page has loaded and the main thread is
     idle. While the strip is scrolling, fresh thumbnails keep entering the
     viewport and loading, which stretches visual completion well past the
     point the page is actually usable (Speed Index was ~4.6s on production,
     with a thumbnail still arriving at 5.1s). Static during load, moving
     immediately after. */
  const [autoScroll, setAutoScroll] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    const schedule = () => {
      idleId = "requestIdleCallback" in window
        ? window.requestIdleCallback(() => setAutoScroll(true), { timeout: 2500 })
        : window.setTimeout(() => setAutoScroll(true), 900);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) {
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
      }
    };
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    const el = marqueeRef.current;
    if (!el) return;
    const SPEED = 90; // px per second
    let pos  = el.scrollLeft;
    let last = performance.now();
    let raf  = 0;
    const step = (now: number) => {
      const dt = now - last; last = now;
      if (!pausedRef.current) {
        pos += (SPEED * dt) / 1000;
        const half = el.scrollWidth / 2;          // one copy of the (duplicated) set
        if (half > 0 && pos >= half) pos -= half;  // seamless loop
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;                        // stay in sync with the user's finger
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll]);
  const onMarqueeDown = (e: React.MouseEvent) => {
    const el = marqueeRef.current; if (!el) return;
    dragRef.current = { x: e.clientX, left: el.scrollLeft, active: true };
    movedRef.current = false;
    el.style.cursor = "grabbing";
    setPaused(true);
  };
  const onMarqueeMove = (e: React.MouseEvent) => {
    const el = marqueeRef.current;
    if (!el || !dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    if (Math.abs(dx) > 5) movedRef.current = true;
    el.scrollLeft = dragRef.current.left - dx;
  };
  const endMarqueeDrag = () => {
    const el = marqueeRef.current;
    dragRef.current.active = false;
    if (el) el.style.cursor = "grab";
  };

  return (
    <section className="relative lg:min-h-screen flex flex-col overflow-hidden" id="hero">

      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-bg.jpg" alt="Scenic mountain landscape in northern Pakistan" fill priority sizes="100vw" className="object-cover scale-110"
          style={{ animation: "float 20s ease-in-out infinite" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1628]/95 via-[#0B1628]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-transparent to-[#0B1628]/20" />
      </div>

      {/* ── Particles ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-[#FFC20A]/20"
            style={{ left: p.left, top: p.top, animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite` }} />
        ))}
      </div>


      {/* ── Hero text ──────────────────────────────────────────────────────── */}
      <div className="hero-content relative z-10 w-full lg:flex-1 flex flex-col items-center justify-start lg:justify-end text-center" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "132px", paddingBottom: "24px" }}>
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">

          {/* Eyebrow badge */}
          <div
            className="hero-rise"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", marginBottom: "26px", borderRadius: "999px", background: "rgba(255,194,10,0.10)", border: "1px solid rgba(255,194,10,0.28)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}>
            <Star style={{ width: 13, height: 13, color: "#FFC20A", fill: "#FFC20A" }} />
            <span style={{ color: "#FFD34A", fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Photographers-Led Custom Tours</span>
          </div>

          <div className="overflow-hidden mb-3">
            <h1 className="hero-rise text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white"
              style={{ animationDelay: "0.06s" }}>
              Explore Pakistan
              <span className="sr-only"> — Your Next Adventure Destination. Photographers-led, 100% customized tours of Pakistan.</span>
            </h1>
          </div>
          <div className="overflow-hidden mb-2" aria-hidden="true">
            <div className="hero-rise text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white"
              style={{ animationDelay: "0.12s" }}>
              Your Next
            </div>
          </div>
          <div className="overflow-hidden mb-7" aria-hidden="true">
            <div className="hero-rise text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
              style={{ animationDelay: "0.18s" }}>
              <span style={{ color: "#FFC20A" }}>Adventure Destination</span>
            </div>
          </div>

          <p className="hero-rise text-lg text-white/65 leading-loose max-w-xl mx-auto" style={{ textAlign: "center", animationDelay: "0.24s" }}>
            From the majestic peaks of Karakorams &amp; Hindukush to the serene landscapes of Gwadar —
            we design unforgettable journeys across Pakistan.
          </p>

          {/* Primary CTAs */}
          <div
            className="hero-rise"
            style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginTop: "36px", animationDelay: "0.3s" }}>
            <a href="#tour-builder"
              style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 30px", borderRadius: "999px", background: "linear-gradient(135deg, #FFD34A, #FFC20A)", color: "#0B1628", fontSize: "15px", fontWeight: 800, textDecoration: "none", boxShadow: "0 10px 30px rgba(255,194,10,0.28)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 14px 40px rgba(255,194,10,0.45)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 10px 30px rgba(255,194,10,0.28)"; }}>
              Plan My Trip
              <ArrowRight style={{ width: 17, height: 17 }} />
            </a>
            <a href="https://wa.me/923344334411?text=Hi%20TravelBug!%20I%27d%20like%20to%20plan%20a%20custom%20tour%20of%20Pakistan." target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "15px 28px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "white", fontSize: "15px", fontWeight: 700, textDecoration: "none", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", transition: "background 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "rgba(37,211,102,0.16)"; el.style.borderColor = "rgba(37,211,102,0.55)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.06)"; el.style.borderColor = "rgba(255,255,255,0.18)"; }}>
              <MessageCircle style={{ width: 17, height: 17, color: "#25D366" }} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="hero-rise"
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "38px", animationDelay: "0.36s" }}>
            {["100% Customized", "Photographers-Led", "Karakoram to Gwadar"].map((t, i) => (
              <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "8px 15px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <Check style={{ width: 14, height: 14, color: "#FFC20A" }} />
                <span style={{ color: "rgba(255,255,255,0.78)", fontSize: "13px", fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── PHOTO MARQUEE STRIP ────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0 }}
        style={{ position: "relative", zIndex: 20, width: "100%" }}
      >
        {/* Fade gradient above */}
        <div style={{ height: "18px", background: "linear-gradient(to bottom, transparent, rgba(6,11,24,0.85))", pointerEvents: "none" }} />

        <div style={{ background: "rgba(6,11,24,0.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px 0 20px" }}>

          {/* Strip label */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 40px", marginBottom: "14px" }}>
            <div style={{ width: 3, height: 16, background: "#FFC20A", borderRadius: 2 }} />
            <p style={{ color: "white", fontSize: "13px", fontWeight: 800, margin: 0, letterSpacing: "0.15em", textTransform: "uppercase" }}>Destinations</p>
          </div>

          {/* Marquee */}
          <div
            ref={marqueeRef}
            className="hero-marquee"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { endMarqueeDrag(); setPaused(false); }}
            onMouseDown={onMarqueeDown}
            onMouseMove={onMarqueeMove}
            onMouseUp={endMarqueeDrag}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            onTouchCancel={() => setPaused(false)}
            style={{ overflowX: "auto", overflowY: "hidden", width: "100%", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", touchAction: "pan-x", cursor: "grab" }}
          >
            <div style={{
              display: "flex",
              gap: "12px",
              width: "max-content",
            }}>
              {[...PHOTOS, ...PHOTOS].map((photo, i) => (
                <div
                  key={i}
                  onClick={() => { if (movedRef.current) { movedRef.current = false; return; } setLightbox(i % PHOTOS.length); }}
                  style={{
                    flex: "0 0 clamp(190px, 25vw, 400px)",
                    height: "clamp(150px, 19.5vw, 310px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "zoom-in",
                    border: "1.5px solid rgba(255,255,255,0.07)",
                    flexShrink: 0,
                    transition: "border-color 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(255,194,10,0.5)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    draggable={false}
                    fill
                    loading="lazy"
                    quality={60}
                    sizes="(max-width: 760px) 190px, (max-width: 1600px) 25vw, 400px"
                    style={{ objectFit: "cover", pointerEvents: "none" }}
                  />

                  {/* Location label */}
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "30px 14px 12px", background: "linear-gradient(to top, rgba(6,11,24,0.94), rgba(6,11,24,0))", pointerEvents: "none" }}>
                    <p style={{ color: "white", fontSize: "13.5px", fontWeight: 700, margin: 0, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>{photo.label}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </m.div>

      {/* ── LIGHTBOX ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.93)", backdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          >
            {/* Close */}
            <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X style={{ width: 18, height: 18 }} />
            </button>
            {/* Prev */}
            <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null); }}
              style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronLeft style={{ width: 20, height: 20 }} />
            </button>
            {/* Next */}
            <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % PHOTOS.length : null); }}
              style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>

            {/* Image */}
            <m.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: "relative", maxWidth: "min(90vw,1100px)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }}
            >
              <AnimatePresence mode="wait">
                <m.img key={lightbox} src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].label}
                  initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ display: "block", maxWidth: "min(90vw,1100px)", maxHeight: "82vh", objectFit: "contain" }}
                />
              </AnimatePresence>
              <div style={{ position: "absolute", bottom: 0, right: 0, padding: "20px 24px", textAlign: "right" }}>
                <p style={{ color: "#FFC20A", fontSize: "10px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>TravelBug.pk</p>
                <p style={{ color: "white", fontSize: "16px", fontWeight: 800, margin: 0, textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>{PHOTOS[lightbox].label}</p>
              </div>
              <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.6)", borderRadius: "20px", padding: "4px 12px" }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", fontWeight: 700, margin: 0 }}>{lightbox + 1} / {PHOTOS.length}</p>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <style>{`
        .hero-marquee::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
