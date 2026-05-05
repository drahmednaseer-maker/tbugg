"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function CTABanner() {
  const whatsappUrl = "https://wa.me/923001234567?text=Hi%20TravelBug!%20I'd%20like%20to%20plan%20a%20custom%20tour%20of%20Pakistan.";

  return (
    <section id="cta" style={{ padding: "80px 40px", background: "#070E1C" }} className="tb-section-pad">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative",
            borderRadius: "28px",
            overflow: "hidden",
            minHeight: "280px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Background photo */}
          <img
            src="/spring-passu.jpg"
            alt="Pakistan landscape"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(105deg, rgba(7,14,28,0.97) 0%, rgba(7,14,28,0.88) 50%, rgba(7,14,28,0.65) 100%)",
          }} />
          {/* Gold glow */}
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,194,10,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Content */}
          <div
            className="cta-flex"
            style={{
              position: "relative", zIndex: 2,
              width: "100%",
              padding: "60px 72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            {/* Left text */}
            <div style={{ maxWidth: "560px" }}>
              <p style={{
                color: "#FFC20A", fontSize: "11px", fontWeight: 800,
                letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px",
              }}>
                Plan Your Tour Today — It's Free
              </p>
              <h2 style={{
                color: "white", fontWeight: 900,
                fontSize: "clamp(28px, 4vw, 46px)",
                lineHeight: 1.1, marginBottom: "18px",
              }}>
                Ready to Discover{" "}
                <span style={{
                  color: "#FFC20A"
                }}>
                  Pakistan?
                </span>
              </h2>
              <p style={{
                color: "rgba(255,255,255,0.5)", fontSize: "15px",
                lineHeight: 1.75,
              }}>
                Tell us your dates and interests. We will design a completely personalised itinerary — no packages, no fixed prices, just your perfect journey.
              </p>
            </div>

            {/* Right buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flexShrink: 0 }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-whatsapp-btn"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  gap: "10px",
                  padding: "16px 32px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                  color: "#0B1628", fontWeight: 800, fontSize: "15px",
                  textDecoration: "none", whiteSpace: "nowrap",
                  boxShadow: "0 8px 32px rgba(255,194,10,0.3)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
              >
                <MessageCircle style={{ width: 18, height: 18 }} />
                Start Planning on WhatsApp
                <ArrowRight style={{ width: 16, height: 16 }} />
              </a>
              <Link
                href="/about#team"
                id="cta-team-btn"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "15px 32px", borderRadius: "14px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: "14px",
                  textDecoration: "none", whiteSpace: "nowrap",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
              >
                Meet the Photographers
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
