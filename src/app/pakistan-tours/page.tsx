import type { Metadata } from "next";
import Link from "next/link";
import { markets } from "@/data/markets";
import { generalFaqs } from "@/data/faqs";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Pakistan Tours for International Travellers",
  description:
    "Photographer-led private Pakistan tours for international travellers — from the UK, USA, Canada, Australia, UAE, Germany, Netherlands & Singapore. Flights, seasons, visas & tailored itineraries to Hunza, Skardu & the Karakoram.",
  alternates: { canonical: "/pakistan-tours" },
  openGraph: {
    title: "Pakistan Tours for International Travellers | TravelBug.pk",
    description:
      "Country-by-country guidance on visiting Pakistan — flights, seasons, visas and photographer-led private tours.",
    images: [{ url: "/destinations/hunza/attabad_lake.jpg", width: 1200, height: 630, alt: "Pakistan tours for international travellers" }],
  },
};

export default function PakistanToursHub() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://travelbug.pk" },
      { "@type": "ListItem", position: 2, name: "Pakistan Tours", item: "https://travelbug.pk/pakistan-tours" },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B1628" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "160px", paddingBottom: "70px" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/destinations/hunza/attabad_lake.jpg" alt="Pakistan tours for international travellers" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,22,40,0.7), #0B1628)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <p style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 16px" }}>
            International Travellers
          </p>
          <h1 style={{ fontSize: "clamp(34px, 6vw, 60px)", fontWeight: 900, color: "white", lineHeight: 1.05, margin: "0 0 22px" }}>
            Pakistan Tours, Wherever You're Travelling From
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "18px", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto" }}>
            Photographer-led, 100% private tours across Pakistan — with country-specific guidance on flights, seasons and visas. Choose your home country to get started.
          </p>
        </div>
      </section>

      {/* Market grid */}
      <section style={{ padding: "20px 40px 90px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: "18px" }}>
          {markets.map((m) => (
            <Link key={m.slug} href={`/pakistan-tours/${m.slug}`} style={{ display: "block", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px", textDecoration: "none" }}>
              <span style={{ fontSize: "34px", display: "block", marginBottom: "16px" }}>{m.flag}</span>
              <h2 style={{ color: "white", fontSize: "19px", fontWeight: 800, margin: "0 0 6px" }}>
                From {m.country}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", margin: "0 0 16px" }}>
                Flights from {m.gatewayCities[0]}
              </p>
              <span style={{ color: "#FFC20A", fontSize: "13px", fontWeight: 800 }}>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={generalFaqs} />
    </div>
  );
}
