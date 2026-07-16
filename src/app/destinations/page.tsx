import { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { MapPin, ArrowRight, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinations — Photographers-Led Tours | TravelBug.pk",
  description: "Explore Pakistan's most extraordinary destinations. From the blossom-filled valleys of Hunza to the granite giants of Charakusa.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#060B18", paddingTop: "120px", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{ 
            display: "inline-flex", alignItems: "center", gap: "10px", 
            color: "#FFC20A", fontSize: "12px", fontWeight: 800, 
            letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" 
          }}>
            <MapPin style={{ width: 14, height: 14 }} /> Discover Pakistan
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: "white", marginBottom: "20px" }}>
            The <span style={{ color: "#FFC20A" }}>Great</span> Escape
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Every destination in Pakistan has a soul. We take you beyond the postcards to the hidden viewpoints and living traditions that only local photographers know.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "32px" }}>
          {destinations.map((dest) => (
            <Link 
              key={dest.id}
              href={`/destinations/${dest.id}`}
              style={{
                position: "relative", height: "450px", borderRadius: "24px", 
                overflow: "hidden", display: "block", textDecoration: "none"
              }}
            >
              {/* Image */}
              <img loading="lazy" decoding="async" 
                src={dest.images[0]} 
                alt={dest.name} 
                className="hover-scale"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              
              {/* Overlays */}
              <div style={{ 
                position: "absolute", inset: 0, 
                background: "linear-gradient(to top, rgba(6,11,24,0.95) 0%, rgba(6,11,24,0.4) 50%, transparent 100%)" 
              }} />

              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", zIndex: 10 }}>
                <div style={{ 
                  display: "inline-block", padding: "4px 12px", borderRadius: "20px", 
                  background: "rgba(255,194,10,0.15)", color: "#FFC20A", 
                  fontSize: "11px", fontWeight: 800, textTransform: "uppercase", 
                  letterSpacing: "0.1em", marginBottom: "12px"
                }}>
                  {dest.tag}
                </div>
                <h2 style={{ color: "white", fontSize: "28px", fontWeight: 900, marginBottom: "10px" }}>{dest.name}</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                  {dest.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FFC20A", fontSize: "14px", fontWeight: 700 }}>
                  Explore Destination <ArrowRight style={{ width: 16, height: 16 }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Global Footer Card */}
        <div style={{ 
          marginTop: "80px", padding: "60px", borderRadius: "32px", 
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center"
        }}>
          <Camera style={{ width: 40, height: 40, color: "#FFC20A", margin: "0 auto 20px" }} />
          <h2 style={{ color: "white", fontSize: "32px", fontWeight: 900, marginBottom: "16px" }}>The Photographer's Advantage</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "700px", margin: "0 auto 32px", lineHeight: 1.7 }}>
            We don't just visit these places; we live in them. Our tours are timed for the best light, the quietest trails, and the most authentic local interactions. Every destination above is a personal recommendation from our own expeditions.
          </p>
          <Link href="/contact" 
            className="hover-bg-white-10"
            style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "16px 40px", borderRadius: "14px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "white", fontWeight: 700, textDecoration: "none"
          }}>
            Chat with Asmar, Uzair & Dr Usman <ArrowRight style={{ width: 18, height: 18 }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
