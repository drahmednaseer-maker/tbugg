"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Star, Clock, Users, ArrowLeft, Check, X, MapPin,
  ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp
} from "lucide-react";
import { Tour } from "@/types";

export default function TourDetailClient({ tour }: { tour: Tour }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [itineraryOpen, setItineraryOpen] = useState(true);

  const images = tour.images?.length ? tour.images : [tour.image];
  const prevImg = () => setImgIndex((p) => (p - 1 + images.length) % images.length);
  const nextImg = () => setImgIndex((p) => (p + 1) % images.length);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Back nav */}
      <div style={{ paddingTop: "120px" }} className="px-4 sm:px-6 lg:px-8 pb-4 max-w-7xl mx-auto">
        <Link href="/tours" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Destinations
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Image Slider */}
            <motion.div className="relative rounded-3xl overflow-hidden aspect-video" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <img src={images[imgIndex]} alt={`${tour.title} - image ${imgIndex + 1}`} className="w-full h-full object-cover transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/50 to-transparent" />

              {/* Rating overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-[#FFC20A] text-[#FFC20A]" />
                <span className="text-white font-bold text-sm">{tour.rating}</span>
                <span className="text-white/50 text-xs">({tour.reviewCount} reviews)</span>
              </div>

              {/* Arrow controls */}
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} id="img-prev" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 flex items-center justify-center transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImg} id="img-next" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 flex items-center justify-center transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setImgIndex(i)} className={`h-1.5 rounded-full transition-all ${i === imgIndex ? "w-6 bg-[#FFC20A]" : "w-1.5 bg-white/40"}`} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Title & Meta */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{tour.title}</h1>
              </div>
              <div className="flex items-center gap-2 text-white/50 mb-4">
                <MapPin className="w-4 h-4 text-[#FFC20A]" />
                <span>{tour.destination}, {tour.country}</span>
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-white/60">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#FFC20A]" />{tour.duration} Days (customizable)</div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#FFC20A]" />Max {tour.maxGroupSize} people</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#FFC20A]" />Year-round</div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${tour.difficulty === "Easy" ? "bg-green-400" : tour.difficulty === "Moderate" ? "bg-yellow-400" : "bg-red-400"}`} />
                  {tour.difficulty}
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-white/4 border border-white/8 p-6">
              <h2 className="text-xl font-bold text-white mb-3">About This Destination</h2>
              <p className="text-white/60 leading-relaxed">{tour.description}</p>
            </motion.div>

            {/* Places to Visit */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-white/4 border border-white/8 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Places to Visit</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFC20A]/20 border border-[#FFC20A]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#FFC20A]" />
                    </div>
                    <span className="text-white/70 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <button
                onClick={() => setItineraryOpen(!itineraryOpen)}
                className="w-full flex items-center justify-between mb-6 text-left"
              >
                <h2 className="text-xl font-bold text-white">Day-by-Day Itinerary</h2>
                {itineraryOpen ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
              </button>
              <AnimatePresence>
                {itineraryOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                    <div className="relative space-y-4">
                      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFC20A]/50 to-transparent" />
                      {tour.itinerary.map((day, i) => (
                        <motion.div key={day.day} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                          className="relative pl-12">
                          <div className="absolute left-2.5 top-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#FFC20A] to-[#FFD34A] flex items-center justify-center">
                            <span className="text-[#0B1628] text-[10px] font-bold">{day.day}</span>
                          </div>
                          <div className="rounded-2xl bg-white/4 border border-white/8 p-5 hover:border-[#FFC20A]/20 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[#FFC20A] text-xs font-bold uppercase tracking-wider">Day {day.day}</span>
                            </div>
                            <h3 className="font-bold text-white mb-2">{day.title}</h3>
                            <p className="text-white/50 text-sm mb-3">{day.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {day.activities.map((act) => (
                                <span key={act} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/50 text-xs">{act}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* What's Included */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-emerald-950/30 border border-emerald-800/30 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Check className="w-5 h-5 text-emerald-400" />What&apos;s Included</h3>
                <ul className="space-y-2.5">
                  {tour.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-red-950/30 border border-red-800/30 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><X className="w-5 h-5 text-red-400" />Not Included</h3>
                <ul className="space-y-2.5">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sticky Quote Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                style={{ borderRadius: "24px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
              >
                <div style={{ background: "linear-gradient(135deg, rgba(255,194,10,0.15), rgba(255,194,10,0.05))", borderBottom: "1px solid rgba(255,194,10,0.15)", padding: "24px" }}>
                  <div style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>✦ 100% Customized Tour</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 800, color: "white" }}>Plan This Trip Your Way</h3>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: 1.6 }}>No fixed pricing — every trip is tailored to your group, dates, and preferences.</p>
                </div>

                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { icon: Users, label: "Group Size", value: `Up to ${tour.maxGroupSize} people (flexible)` },
                    { icon: Clock, label: "Duration", value: `${tour.duration} days (customizable)` },
                    { icon: MapPin, label: "Difficulty", value: tour.difficulty },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,194,10,0.10)", border: "1px solid rgba(255,194,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon style={{ width: "16px", height: "16px", color: "#FFC20A" }} />
                      </div>
                      <div>
                        <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                        <p style={{ margin: 0, color: "white", fontSize: "14px", fontWeight: 600 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Link
                    href="/tours"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "16px", borderRadius: "14px", textDecoration: "none",
                      background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628",
                      fontWeight: 800, fontSize: "15px", boxShadow: "0 8px 24px rgba(255,194,10,0.3)",
                    }}
                    id="get-quote-btn"
                  >
                    ✦ Get a Custom Quote
                  </Link>
                  <a
                    href={`https://wa.me/923001234567?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(tour.title)}.%20Can%20you%20plan%20a%20custom%20trip%20for%20me?`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "13px", borderRadius: "12px", textDecoration: "none",
                      background: "#22c55e", color: "white", fontWeight: 700, fontSize: "14px",
                    }}
                    id="whatsapp-quote-btn"
                  >
                    <svg viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "white" }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>

                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {["100% customized itinerary", "Response within 2–4 hours", "No commitment required"].map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FFC20A", flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
