"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Briefcase, Phone, Mail, Home, MapPin, Compass, Users, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const MyTripsPanel = dynamic(() => import("@/components/MyTripsPanel"), { ssr: false });

const tourCategories = [
  {
    href: "/tours?cat=luxury",
    label: "Luxury Tours",
    desc: "5-star resorts & curated experiences",
    icon: "✦",
    accent: "#FACC15",
    bg: "from-yellow-500/10 to-amber-600/5",
    border: "border-yellow-500/20",
    tag: "PREMIUM",
  },
  {
    href: "/tours?cat=adventure",
    label: "Adventure Tours",
    desc: "Trek peaks, trails & hidden gems",
    icon: "⛰",
    accent: "#34D399",
    bg: "from-emerald-500/10 to-teal-600/5",
    border: "border-emerald-500/20",
    tag: "THRILLING",
  },
  {
    href: "/tours?cat=budget",
    label: "Budget Tours",
    desc: "Best value, unforgettable memories",
    icon: "◈",
    accent: "#60A5FA",
    bg: "from-blue-500/10 to-indigo-600/5",
    border: "border-blue-500/20",
    tag: "SMART PICK",
  },
];

const navLinks = [
  { href: "/", label: "HOME", Icon: Home },
  { href: "/destinations", label: "DESTINATIONS", Icon: MapPin },
  { href: "/tours", label: "TOURS", Icon: Compass },
  { href: "/about", label: "ABOUT US", Icon: Users },
  { href: "/contact", label: "CONTACT US", Icon: MessageCircle },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [myTripsOpen, setMyTripsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setToursOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ─── TOP CONTACT STRIP ─────────────────────────────────── */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[61] transition-all duration-300",
          (scrolled || mobileOpen) ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        )}
        style={{
          background: "rgba(250, 204, 21, 0.06)",
          borderBottom: "1px solid rgba(250, 204, 21, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-center gap-1.5 sm:gap-10 px-2 sm:px-4" style={{ height: "36px", width: "100%" }}>
          <a href="tel:+923344334411" className="flex items-center gap-1.5 group" style={{ textDecoration: "none" }}>
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: "#FACC15" }} />
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em", transition: "color 0.2s" }} className="group-hover:!text-white text-[13px] sm:text-[15px] whitespace-nowrap">0334 4334411</span>
          </a>
          <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.15)" }} />
          <a href="tel:+923248888889" className="flex items-center gap-1.5 group" style={{ textDecoration: "none" }}>
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: "#FACC15" }} />
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em", transition: "color 0.2s" }} className="group-hover:!text-white text-[13px] sm:text-[15px] whitespace-nowrap">0324 8888889</span>
          </a>
          <span className="hidden sm:block" style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.15)" }} />
          <a href="mailto:info@travelbug.pk" className="hidden sm:flex items-center gap-1.5 group" style={{ textDecoration: "none" }}>
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: "#FACC15" }} />
            <span style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.02em", transition: "color 0.2s" }} className="group-hover:!text-white text-[13px] sm:text-[15px] whitespace-nowrap">info@travelbug.pk</span>
          </a>
        </div>
      </div>

      {/* ─── FLOATING PILL NAVBAR ─────────────────────────────────── */}
      <motion.header
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 w-[95%] max-w-7xl h-[72px]",
          scrolled ? "top-4" : "top-[44px]"
        )}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Pill background — separate so dropdown can overflow */}
        <div
          style={{
            position: "absolute", inset: 0,
            borderRadius: "999px",
            border: "1.5px solid rgba(255,255,255,0.22)",
            background: "rgba(8, 16, 34, 0.88)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />
        {/* Inner content */}
        <div className="relative z-10 h-full flex items-center justify-between" style={{ paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)' }}>

            {/* 1. LEFT SIDE: Text Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/" id="nav-logo" className="flex items-center group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className="text-white font-black text-xl tracking-tighter leading-none">
                  TRAVEL<span className="text-[#FACC15]">BUG</span><span className="text-white/40 text-[11px] font-bold tracking-widest ml-1">.PK</span>
                </span>
              </Link>
            </div>

            {/* 2. NAVIGATION (Center) */}
            <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
              <ul className="flex items-center gap-8 xl:gap-12">
                {navLinks.map(({ href, label, hasDropdown }) => (
                  <li key={href} className="relative group/nav">
                    {hasDropdown ? (
                      <div
                        onMouseEnter={() => setToursOpen(true)}
                        onMouseLeave={() => setToursOpen(false)}
                        className="py-6"
                      >
                        <button
                          className={cn(
                            "flex items-center gap-1.5 text-[13px] font-bold tracking-[0.1em] transition-all duration-300",
                            isActive(href) ? "text-[#FACC15]" : "text-white/70 hover:text-white"
                          )}
                          id="tours-nav-btn"
                        >
                          {label}
                          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300 opacity-50", toursOpen && "rotate-180 opacity-100")} />
                        </button>

                        <AnimatePresence>
                          {toursOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.97 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute top-[calc(100%-12px)] left-1/2 -translate-x-1/2 z-50 pt-3"
                              style={{ minWidth: "380px" }}
                            >
                              {/* Mega dropdown container */}
                              <div
                                style={{
                                  background: "linear-gradient(135deg, rgba(8,16,34,0.97) 0%, rgba(15,23,42,0.99) 100%)",
                                  backdropFilter: "blur(40px) saturate(200%)",
                                  WebkitBackdropFilter: "blur(40px) saturate(200%)",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  borderRadius: "24px",
                                  boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.12)",
                                  overflow: "hidden",
                                }}
                              >
                                {/* Top header ribbon */}
                                <div style={{ background: "linear-gradient(90deg, rgba(250,204,21,0.08), rgba(250,204,21,0.03))", borderBottom: "1px solid rgba(250,204,21,0.1)", padding: "14px 20px 12px" }} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(250,204,21,0.7)", fontWeight: 800 }}>EXPLORE TOURS</span>
                                  </div>
                                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", fontWeight: 700 }}>PAKISTAN • 2024–25</span>
                                </div>

                                {/* Tour category cards */}
                                <div className="p-3 space-y-2">
                                  {tourCategories.map((cat, i) => (
                                    <motion.div
                                      key={cat.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.06, duration: 0.2, ease: "easeOut" }}
                                    >
                                      <Link
                                        href={cat.href}
                                        className={`flex items-center gap-4 p-3.5 rounded-xl border bg-gradient-to-r ${cat.bg} ${cat.border} group/card transition-all duration-300 hover:scale-[1.02] hover:border-opacity-60 hover:shadow-lg`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        {/* Icon circle */}
                                        <div
                                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl transition-transform duration-300 group-hover/card:scale-110"
                                          style={{ background: `linear-gradient(135deg, ${cat.accent}20, ${cat.accent}08)`, border: `1px solid ${cat.accent}30` }}
                                        >
                                          <span>{cat.icon}</span>
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[13px] font-black text-white tracking-wide group-hover/card:text-white transition-colors">{cat.label}</span>
                                            <span
                                              className="text-[8px] font-black px-1.5 py-0.5 rounded-full tracking-widest"
                                              style={{ background: `${cat.accent}20`, color: cat.accent, border: `1px solid ${cat.accent}30` }}
                                            >{cat.tag}</span>
                                          </div>
                                          <p className="text-[11px] text-white/40 font-medium truncate group-hover/card:text-white/60 transition-colors">{cat.desc}</p>
                                        </div>

                                        {/* Arrow */}
                                        <ArrowRight
                                          className="w-4 h-4 shrink-0 transition-all duration-300 -translate-x-1 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100"
                                          style={{ color: cat.accent }}
                                        />
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Footer CTA */}
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px" }}>
                                  <Link
                                    href="/tours"
                                    className="flex items-center justify-between w-full group/all"
                                  >
                                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.05em" }}>View all tour packages</span>
                                    <span
                                      className="flex items-center gap-1.5 text-[11px] font-black transition-all duration-200 group-hover/all:gap-2.5"
                                      style={{ color: "#FACC15" }}
                                    >
                                      Browse All <ArrowRight className="w-3 h-3" />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={href}
                        className={cn(
                          "relative py-1 text-[13px] font-bold tracking-[0.1em] transition-all duration-300 block",
                          isActive(href) ? "text-[#FACC15]" : "text-white/70 hover:text-white"
                        )}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* 3. RIGHT SIDE: My Trips + Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">

              {/* My Trips pill */}
              <button
                onClick={() => setMyTripsOpen(true)}
                id="my-trips-btn"
                className="hidden lg:flex"
                style={{
                  alignItems: "center", gap: "6px",
                  padding: "8px 16px", borderRadius: "20px",
                  background: "rgba(255,194,10,0.12)",
                  border: "1px solid rgba(255,194,10,0.35)",
                  color: "#FFC20A", fontWeight: 800, fontSize: "11px",
                  cursor: "pointer", letterSpacing: "0.05em",
                  whiteSpace: "nowrap", transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <Briefcase style={{ width: 12, height: 12 }} />
                My Trips
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full bg-[#FACC15] text-slate-950 shadow-lg shadow-[#FACC15]/20"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
      </motion.header>

      {/* ─── MOBILE DRAWER ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} />

            <motion.aside
              className="fixed top-0 right-0 bottom-0 z-[70] w-[86%] max-w-[360px] lg:hidden flex flex-col shadow-2xl overflow-hidden"
              style={{
                backgroundColor: "#0f172a",
                backgroundImage: "linear-gradient(180deg, rgba(9,16,31,0.86) 0%, rgba(9,16,31,0.66) 45%, rgba(9,16,31,0.72) 72%, rgba(6,11,24,0.94) 100%), url('/hero-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="menu-hdr flex items-center justify-between px-6 h-[64px] border-b border-white/10 shrink-0">
                <span className="text-white font-black text-[17px] tracking-tight">TRAVEL<span className="text-[#FACC15]">BUG</span><span className="text-white/40 text-[10px] font-bold tracking-widest ml-0.5">.PK</span></span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body: nav at top, contact + CTA pulled toward the bottom-centre */}
              <div className="menu-body flex-1 overflow-y-auto flex flex-col">
                <nav className="pt-5">
                  <p className="text-[11px] font-black tracking-[0.16em] text-white/30 uppercase mb-3.5 px-2">Explore</p>
                  <ul className="space-y-2">
                    {navLinks.map(({ href, label, Icon }) => {
                      const active = isActive(href);
                      return (
                        <li key={href}>
                          <Link href={href}
                            className={cn(
                              "menu-row flex items-center gap-4 py-3.5 rounded-2xl border transition-all duration-200 group",
                              active ? "bg-[#FACC15]/[0.12] border-[#FACC15]/25" : "border-transparent hover:bg-white/5"
                            )}>
                            <span className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                              active ? "bg-[#FACC15]/20" : "bg-white/[0.06] group-hover:bg-white/10")}>
                              <Icon className="w-[19px] h-[19px]" style={{ color: active ? "#FACC15" : "rgba(255,255,255,0.75)" }} />
                            </span>
                            <span className={cn("flex-1 text-[15px] font-bold tracking-wide", active ? "text-[#FACC15]" : "text-white/90")}>{label}</span>
                            <ArrowRight className={cn("w-4 h-4 shrink-0 transition-all duration-200", active ? "text-[#FACC15]" : "text-white/25 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="menu-lower">
                  <div>
                    <p className="text-[11px] font-black tracking-[0.16em] text-white/30 uppercase mb-3.5 px-2">Get in touch</p>
                    <div className="space-y-1.5">
                      <a href="tel:+923344334411" className="menu-row flex items-center gap-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="w-10 h-10 rounded-xl bg-[#22c55e]/[0.12] border border-[#22c55e]/25 flex items-center justify-center shrink-0">
                          <Phone className="w-[18px] h-[18px]" style={{ color: "#22c55e" }} />
                        </span>
                        <span className="flex flex-col leading-tight">
                          <span className="text-[15px] font-bold text-white/90">0334 4334411</span>
                          <span className="text-[11px] text-white/40 mt-0.5">Call / WhatsApp</span>
                        </span>
                      </a>
                      <a href="tel:+923248888889" className="menu-row flex items-center gap-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
                          <Phone className="w-[18px] h-[18px]" style={{ color: "rgba(255,255,255,0.7)" }} />
                        </span>
                        <span className="text-[15px] font-bold text-white/90">0324 8888889</span>
                      </a>
                      <a href="mailto:info@travelbug.pk" className="menu-row flex items-center gap-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="w-10 h-10 rounded-xl bg-[#FACC15]/[0.1] border border-[#FACC15]/20 flex items-center justify-center shrink-0">
                          <Mail className="w-[18px] h-[18px]" style={{ color: "#FACC15" }} />
                        </span>
                        <span className="text-[15px] font-bold text-white/90">info@travelbug.pk</span>
                      </a>
                    </div>
                  </div>

                  {/* Primary CTA — big, centred near the bottom */}
                  <div className="menu-cta">
                    <a href="https://wa.me/923344334411?text=Hi%20TravelBug!%20I%27d%20like%20to%20plan%20a%20trip%20to%20Pakistan." target="_blank" rel="noopener noreferrer"
                      className="menu-cta-btn flex items-center justify-center gap-2.5 w-full py-5 rounded-2xl bg-[#FACC15] text-slate-950 font-black text-[17px] active:scale-95 transition-transform shadow-lg shadow-[#FACC15]/30">
                      <MessageCircle className="w-6 h-6" /> Plan My Trip on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      {/* ─── MY TRIPS PANEL ─────────────────────────────────────── */}
      <AnimatePresence>
        {myTripsOpen && <MyTripsPanel onClose={() => setMyTripsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
