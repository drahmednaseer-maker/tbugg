"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, Camera, Globe, Calendar, Clock, Users, Star } from "lucide-react";
import { Destination } from "@/data/destinations";
import { tours } from "@/data/tours";
import { ParallaxY } from "@/components/fx/Parallax";

export default function DestinationClient({ destination }: { destination: Destination }) {
  // Find tours that match this destination
  const relatedTours = tours.filter(t => 
    t.destination.toLowerCase().includes(destination.id.toLowerCase()) ||
    t.destination.toLowerCase().includes(destination.name.toLowerCase().split(" ")[0])
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0B1628" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <ParallaxY amount={70} style={{ position: "absolute", inset: 0 }}>
            <img
              src={destination.images[0]}
              alt={destination.name}
              data-no-fx
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.18)" }}
            />
          </ParallaxY>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(11,22,40,0.3) 0%, rgba(11,22,40,0.9) 100%)"
          }} />
        </motion.div>

        <div style={{
          position: "relative", zIndex: 10, height: "100%",
          maxWidth: "1200px", margin: "0 auto", padding: "0 40px",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          paddingBottom: "80px"
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFC20A", marginBottom: "16px" }}>
              <MapPin style={{ width: 20, height: 20 }} />
              <span style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {destination.region}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(40px, 8vw, 84px)", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: "24px" }}>
              {destination.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px", maxWidth: "600px", lineHeight: 1.6 }}>
              {destination.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px" }}>
            {/* Left: Photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {destination.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  data-cursor="view"
                  data-fx-lift
                  style={{ borderRadius: "20px", overflow: "hidden", height: "300px" }}
                >
                  <img src={img} alt={`${destination.name} ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              ))}
              <div style={{
                background: "rgba(255,194,10,0.05)",
                border: "1px dashed rgba(255,194,10,0.3)",
                borderRadius: "20px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "20px", textAlign: "center"
              }}>
                <Camera style={{ width: 32, height: 32, color: "#FFC20A", marginBottom: "12px" }} />
                <p style={{ color: "white", fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>Photographer's View</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Capturing the soul of {destination.name}</p>
              </div>
            </div>

            {/* Right: Tours */}
            <div>
              <div style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: 900, color: "white", marginBottom: "12px" }}>
                  Available <span style={{ color: "#FFC20A" }}>Tours</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
                  Choose from our photographer-led custom journeys in {destination.name}.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {relatedTours.length > 0 ? (
                  relatedTours.map((tour, i) => (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        href={`/tours/${tour.slug}`}
                        style={{
                          display: "flex", gap: "20px", background: "rgba(255,255,255,0.03)",
                          padding: "20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.08)",
                          textDecoration: "none", transition: "border-color 0.3s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,194,10,0.3)"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                      >
                        <div style={{ width: "100px", height: "100px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                          <img src={tour.image} alt={tour.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                            <h3 style={{ color: "white", fontWeight: 800, fontSize: "16px", margin: 0 }}>{tour.title}</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <Star style={{ width: 12, height: 12, fill: "#FFC20A", color: "#FFC20A" }} />
                              <span style={{ color: "white", fontSize: "12px", fontWeight: 700 }}>{tour.rating}</span>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "12px", color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "12px" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock style={{ width: 12, height: 12 }} /> {tour.duration} Days</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users style={{ width: 12, height: 12 }} /> Max {tour.maxGroupSize}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#FFC20A", fontSize: "13px", fontWeight: 700 }}>
                            View Journey <ArrowRight style={{ width: 14, height: 14 }} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div style={{ padding: "40px", textAlign: "center", background: "rgba(255,255,255,0.02)", borderRadius: "20px", border: "1px dashed rgba(255,255,255,0.1)" }}>
                    <Globe style={{ width: 32, height: 32, color: "rgba(255,255,255,0.2)", marginBottom: "12px", margin: "0 auto" }} />
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Custom itineraries available upon request</p>
                    <Link href="/contact" style={{ color: "#FFC20A", fontSize: "14px", fontWeight: 700, textDecoration: "none", marginTop: "12px", display: "inline-block" }}>
                      Ask for a custom tour →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", background: "linear-gradient(135deg, rgba(255,194,10,0.1) 0%, transparent 100%)", padding: "60px", borderRadius: "32px", border: "1px solid rgba(255,194,10,0.15)" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 900, color: "white", marginBottom: "16px" }}>Not seeing your perfect trip?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginBottom: "32px" }}>
            As photographers, we love exploring off-beat tracks. Tell us where you want to go in {destination.name}, and we'll design it for you.
          </p>
          <Link href="/#tour-builder" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "16px 32px", borderRadius: "14px",
            background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
            color: "#0B1628", fontWeight: 800, textDecoration: "none",
            boxShadow: "0 8px 32px rgba(255,194,10,0.3)"
          }}>
            Plan Your Custom Trip <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
