"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, Camera, Globe, Calendar, Clock, Users, Star } from "lucide-react";
import { Destination, Expedition } from "@/data/destinations";
import { tours } from "@/data/tours";
import { generalFaqs, destinationFaqs } from "@/data/faqs";
import FAQSection from "@/components/sections/FAQSection";

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
          <img
            src={destination.images[0]}
            alt={destination.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "60px" }}>
            {/* Left: Photos */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "20px" }}>
              {destination.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
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

      {/* Premium Expedition Itinerary (only when data exists) */}
      {destination.expedition && (
        <ExpeditionSection expedition={destination.expedition} name={destination.name} tourSlug={destination.tourSlug} />
      )}

      {/* FAQ — destination-specific questions plus key travel essentials */}
      <FAQSection
        faqs={[...(destinationFaqs[destination.id] ?? []), ...generalFaqs.slice(0, 3)]}
        heading={`${destination.name} — Travel FAQs`}
        subheading={`Common questions about visiting ${destination.name} with TravelBug.pk.`}
      />

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

function ExpeditionSection({
  expedition,
  name,
  tourSlug,
}: {
  expedition: Expedition;
  name: string;
  tourSlug: string;
}) {
  const matchedTour = tours.find((t) => t.slug === tourSlug);
  const stats = [
    { icon: Clock, label: "Duration", value: `${expedition.durationDays} Days / ${expedition.nights} Nights` },
    { icon: Star, label: "Difficulty", value: expedition.difficulty },
    { icon: Calendar, label: "Best Season", value: expedition.bestSeason },
    { icon: MapPin, label: "Max Altitude", value: expedition.maxAltitude },
    { icon: Users, label: "Departures", value: expedition.groupType },
  ];

  return (
    <section
      id="itinerary"
      style={{
        padding: "100px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "linear-gradient(180deg, rgba(255,194,10,0.03) 0%, transparent 40%)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ width: 30, height: 2, background: "#FFC20A" }} />
            <span style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase" }}>
              The Full Expedition
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 900, color: "white", lineHeight: 1.1, margin: "0 0 18px", maxWidth: "820px" }}>
            {expedition.title}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", lineHeight: 1.6, maxWidth: "760px", margin: 0 }}>
            {expedition.tagline}
          </p>
        </motion.div>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "16px",
            margin: "44px 0",
          }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "22px 20px",
                }}
              >
                <Icon style={{ width: 20, height: 20, color: "#FFC20A", marginBottom: "14px" }} />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>
                  {s.label}
                </p>
                <p style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0, lineHeight: 1.35 }}>
                  {s.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Overview */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: "rgba(255,255,255,0.72)", fontSize: "17px", lineHeight: 1.85, maxWidth: "900px", margin: "0 0 64px" }}
        >
          {expedition.overview}
        </motion.p>

        {/* Highlights */}
        <h3 style={{ fontSize: "24px", fontWeight: 900, color: "white", margin: "0 0 24px" }}>
          Expedition <span style={{ color: "#FFC20A" }}>Highlights</span>
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "16px",
            marginBottom: "72px",
          }}
        >
          {expedition.highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "18px 20px",
              }}
            >
              <Star style={{ width: 18, height: 18, fill: "#FFC20A", color: "#FFC20A", flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: "rgba(255,255,255,0.78)", fontSize: "15px", lineHeight: 1.55 }}>{h}</span>
            </motion.div>
          ))}
        </div>

        {/* Included / Excluded */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "24px",
            marginTop: "72px",
          }}
        >
          <div
            style={{
              background: "rgba(110,231,183,0.04)",
              border: "1px solid rgba(110,231,183,0.15)",
              borderRadius: "20px",
              padding: "28px 30px",
            }}
          >
            <h4 style={{ color: "white", fontSize: "18px", fontWeight: 800, margin: "0 0 20px" }}>What's Included</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {expedition.included.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.5 }}>
                  <span style={{ color: "#6EE7B7", fontWeight: 900, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "28px 30px",
            }}
          >
            <h4 style={{ color: "white", fontSize: "18px", fontWeight: 800, margin: "0 0 20px" }}>Not Included</h4>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {expedition.excluded.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.5 }}>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 900, flexShrink: 0 }}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
              color: "#0B1628",
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(255,194,10,0.3)",
            }}
          >
            Enquire About This Expedition <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
          {matchedTour && (
            <Link
              href={`/tours/${matchedTour.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              View Matching Tour <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
