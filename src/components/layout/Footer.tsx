"use client";

import Link from "next/link";
import { Camera, Share2, Link2, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const destinations = [
  { href: "/destinations/hunza", label: "Hunza Valley" },
  { href: "/destinations/skardu", label: "Skardu & Baltistan" },
  { href: "/destinations/chitral", label: "Chitral & Kalash" },
  { href: "/destinations/karakorams", label: "Karakoram Peaks" },
  { href: "/destinations/shandur", label: "Shandur Polo" },
];

const quickLinks = [
  { href: "/about#team",    label: "Meet the Photographers" },
  { href: "/destinations",    label: "Destinations" },
  { href: "/why-travelbug",  label: "Why TravelBug" },
  { href: "/traveler-stories", label: "Traveler Stories" },
  { href: "/#cta",           label: "Plan My Tour" },
];

const socials = [
  { icon: Camera,         href: "https://www.instagram.com/asmarsphotography", label: "Instagram" },
  { icon: Share2,         href: "https://www.facebook.com/asmarsphotography",  label: "Facebook" },
  { icon: Link2,          href: "#",                                            label: "YouTube"   },
  { icon: MessageCircle,  href: "https://wa.me/923248888889",                  label: "WhatsApp"  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#060B18", borderTop: "1px solid rgba(255,255,255,0.05)" }}>

      {/* Main */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="footer-inner">
        <div className="footer-main-grid">


          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "20px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: "linear-gradient(135deg, #FFC20A, #FFD34A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, color: "#0B1628", fontSize: "16px",
              }}>
                TB
              </div>
              <span style={{ fontSize: "20px", fontWeight: 900, color: "white" }}>
                Travel<span style={{ color: "#FFC20A" }}>Bug</span>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontWeight: 500 }}>.pk</span>
              </span>
            </Link>

            <p style={{
              color: "rgba(255,255,255,0.4)", fontSize: "13px",
              lineHeight: 1.8, maxWidth: "280px", marginBottom: "28px",
            }}>
              Photographer-led custom tours across Pakistan. Every journey is designed personally by award-winning photographers Asmar &amp; Uzair.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#FFC20A";
                    el.style.borderColor = "rgba(255,194,10,0.35)";
                    el.style.background = "rgba(255,194,10,0.08)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "rgba(255,255,255,0.4)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: "#FFC20A", fontSize: "11px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px",
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      color: "rgba(255,255,255,0.45)", fontSize: "13px",
                      textDecoration: "none", transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 style={{
              color: "#FFC20A", fontSize: "11px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px",
            }}>
              Destinations
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {destinations.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      color: "rgba(255,255,255,0.45)", fontSize: "13px",
                      textDecoration: "none", transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              color: "#FFC20A", fontSize: "11px", fontWeight: 800,
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "20px",
            }}>
              Get In Touch
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin style={{ width: 15, height: 15, color: "#FFC20A", marginTop: "2px", flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.6 }}>
                  B-89, Post Office Rd, Wah Cantt,<br />Punjab 47040, Pakistan
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Phone style={{ width: 15, height: 15, color: "#FFC20A", flexShrink: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <a
                    href="tel:+923248888889"
                    style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    +92 324 8888889
                  </a>
                  <a
                    href="tel:+923344334411"
                    style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    +92 334 4334411
                  </a>
                </div>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Mail style={{ width: 15, height: 15, color: "#FFC20A", flexShrink: 0 }} />
                <a
                  href="mailto:travelbugpakistan@gmail.com"
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                >
                  travelbugpakistan@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "20px 40px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "16px",
          flexWrap: "wrap",
        }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
            Designed by{" "}
            <a href="https://theagentech.com" target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700, textDecoration: "none" }}
              onMouseOver={e => (e.currentTarget.style.color = "#FFC20A")}
              onMouseOut={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >Theagentech.com</a>
          </p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
            Photographer-led custom tours of Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
