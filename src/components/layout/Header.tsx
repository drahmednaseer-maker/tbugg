"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Briefcase, Phone, Mail } from "lucide-react";
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
  { href: "/", label: "HOME" },
  { href: "/destinations", label: "DESTINATIONS" },
  { href: "/tours", label: "TOURS", hasDropdown: true },
  { href: "/about", label: "ABOUT US" },
  { href: "/contact", label: "CONTACT US" },
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
          scrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        )}
        style={{
          background: "rgba(250, 204, 21, 0.06)",
          borderBottom: "1px solid rgba(250, 204, 21, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-center gap-4 sm:gap-10 px-4" style={{ height: "32px", width: "100%" }}>
          <a href="tel:+923248888889" className="flex items-center gap-1 sm:gap-1.5 group" style={{ textDecoration: "none" }}>
            <Phone className="w-3 h-3 shrink-0" style={{ color: "#FACC15" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em", transition: "color 0.2s" }} className="group-hover:!text-white sm:text-[11px]">0324 8888889</span>
          </a>
          <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.15)" }} />
          <a href="tel:+923344334411" className="flex items-center gap-1 sm:gap-1.5 group" style={{ textDecoration: "none" }}>
            <Phone className="w-3 h-3 shrink-0" style={{ color: "#FACC15" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em", transition: "color 0.2s" }} className="group-hover:!text-white sm:text-[11px]">0334 4334411</span>
          </a>
          <span className="hidden sm:block" style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.15)" }} />
          <a href="mailto:travelbugpakistan@gmail.com" className="hidden sm:flex items-center gap-1.5 group" style={{ textDecoration: "none" }}>
            <Mail className="w-3 h-3 shrink-0" style={{ color: "#FACC15" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.02em", transition: "color 0.2s" }} className="group-hover:!text-white">travelbugpakistan@gmail.com</span>
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
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4" aria-label="Main navigation">
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
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 lg:hidden flex flex-col pt-8 bg-slate-900 shadow-2xl"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-8 pb-8 border-b border-white/5">
                <div className="flex items-center">
                  <span className="text-white font-black text-[16px] tracking-tight">TRAVEL<span className="text-[#FACC15]">BUG</span><span className="text-white/40 text-[11px] font-bold tracking-widest">.PK</span></span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/50">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-10">
                <ul className="space-y-8">
                  {navLinks.map(({ href, label, hasDropdown }) => (
                    <li key={href}>
                      {hasDropdown ? (
                        <div className="space-y-4">
                          <button onClick={() => setToursOpen(!toursOpen)}
                            className={cn("w-full flex items-center justify-between text-[16px] font-black tracking-widest transition-colors", toursOpen ? "text-[#FACC15]" : "text-white")}>
                            {label}
                            <ChevronDown className={cn("w-5 h-5 transition-transform", toursOpen && "rotate-180")} />
                          </button>
                          {toursOpen && (
                            <ul className="pl-4 space-y-6 pt-2 border-l border-white/5">
                              {tourCategories.map(c => (
                                <li key={c.href}>
                                  <Link href={c.href} className="text-white/50 font-bold block text-sm hover:text-[#FACC15] transition-colors">{c.label.toUpperCase()}</Link>
                                </li>
                              ))}
                              <li>
                                <Link href="/tours" className="text-[#FACC15] font-black block text-sm hover:text-white transition-colors">VIEW ALL TOURS →</Link>
                              </li>
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link href={href} className={cn("text-[16px] font-black tracking-widest block transition-colors", isActive(href) ? "text-[#FACC15]" : "text-white opacity-60 hover:opacity-100")}>{label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 border-t border-white/5 space-y-8 bg-black/20">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#FACC15] flex items-center justify-center text-slate-900">
                      <Phone className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Call Now</span>
                      <a href="tel:+923248888889" className="text-white text-[16px] font-black tracking-tight">0324 8888889</a>
                      <a href="tel:+923344334411" className="text-white text-[16px] font-black tracking-tight">0334 4334411</a>
                    </div>
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
