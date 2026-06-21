import { Metadata } from "next";
import { testimonials } from "@/data/testimonials";
import { Star, Quote, MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Traveler Stories — Real Experiences | TravelBug.pk",
  description: "Read real reviews and stories from travelers who have explored Pakistan with TravelBug.pk. Photographer-led memories from across the country.",
  alternates: { canonical: "/traveler-stories" },
};

export default function TravelerStoriesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#060B18", paddingTop: "120px", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{
            color: "#FFC20A", fontSize: "11px", fontWeight: 800,
            letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "14px",
          }}>
            Testimonials
          </p>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: "white", marginBottom: "20px" }}>
            Traveler <span style={{ color: "#FFC20A" }}>Stories</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            We are proud to have hosted travelers from over 30 countries. These are their stories, their memories, and their real experiences on the ground in Pakistan.
          </p>
        </div>

        {/* Stories Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {testimonials.map((t) => (
            <div 
              key={t.id}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
            >
              <Quote style={{ width: 32, height: 32, color: "rgba(255,194,10,0.15)", marginBottom: "20px" }} />
              
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    style={{ 
                      width: 14, height: 14, 
                      fill: i < t.rating ? "#FFC20A" : "transparent", 
                      color: i < t.rating ? "#FFC20A" : "rgba(255,255,255,0.15)" 
                    }} 
                  />
                ))}
              </div>

              <p style={{ 
                color: "rgba(255,255,255,0.8)", 
                fontSize: "15px", 
                lineHeight: 1.8, 
                fontStyle: "italic",
                flex: 1,
                marginBottom: "32px"
              }}>
                &ldquo;{t.review}&rdquo;
              </p>

              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "24px" }} />

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {t.avatar ? (
                  <img loading="lazy" decoding="async"
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,194,10,0.3)" }}
                  />
                ) : (
                  <div aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,194,10,0.15)", border: "2px solid rgba(255,194,10,0.3)", color: "#FFC20A", fontSize: "18px", fontWeight: 800, flexShrink: 0 }}>
                    {t.name?.charAt(0) ?? "T"}
                  </div>
                )}
                <div>
                  <h4 style={{ color: "white", fontSize: "15px", fontWeight: 800, marginBottom: "2px" }}>{t.name}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin style={{ width: 10, height: 10 }} /> {t.location}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar style={{ width: 10, height: 10 }} /> {t.date}</span>
                  </div>
                  <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 700, marginTop: "4px" }}>{t.tour}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div style={{ 
          marginTop: "80px", textAlign: "center", padding: "60px", 
          borderRadius: "32px", background: "linear-gradient(135deg, rgba(255,194,10,0.1), transparent)",
          border: "1px solid rgba(255,194,10,0.2)"
        }}>
          <h2 style={{ color: "white", fontSize: "32px", fontWeight: 900, marginBottom: "16px" }}>Ready for Your Story?</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "600px", margin: "0 auto 32px", lineHeight: 1.7 }}>
            Join the hundreds of happy travelers who have seen the real Pakistan with us. Let's design an itinerary that you'll be telling stories about for years.
          </p>
          <a 
            href="/contact" 
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "16px 44px", borderRadius: "14px",
              background: "#FFC20A", color: "#060B18", fontWeight: 900,
              textDecoration: "none", boxShadow: "0 8px 24px rgba(255,194,10,0.3)"
            }}
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </main>
  );
}
