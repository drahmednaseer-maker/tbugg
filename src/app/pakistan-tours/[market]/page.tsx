import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { markets, getMarket } from "@/data/markets";
import { tours } from "@/data/tours";
import { generalFaqs } from "@/data/faqs";
import FAQSection from "@/components/sections/FAQSection";

interface Props {
  params: Promise<{ market: string }>;
}

export function generateStaticParams() {
  return markets.map((m) => ({ market: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { market } = await params;
  const m = getMarket(market);
  if (!m) return { title: "Pakistan Tours" };
  const title = `Pakistan Tours from ${m.country} — Photographer-Led Private Trips`;
  const description = `Planning a trip to Pakistan from ${m.country}? Discover flights, best seasons, visa guidance and photographer-led private tours to Hunza, Skardu & the Karakoram with TravelBug.pk.`;
  return {
    title,
    description,
    alternates: { canonical: `/pakistan-tours/${m.slug}` },
    openGraph: {
      title: `${title} | TravelBug.pk`,
      description,
      images: [{ url: "/destinations/hunza/attabad_lake.jpg", width: 1200, height: 630, alt: `Pakistan tours from ${m.country}` }],
    },
  };
}

export default async function MarketPage({ params }: Props) {
  const { market } = await params;
  const m = getMarket(market);
  if (!m) notFound();

  const topTours = [...tours].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const url = `https://travelbug.pk/pakistan-tours/${m.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://travelbug.pk" },
      { "@type": "ListItem", position: 2, name: "Pakistan Tours", item: "https://travelbug.pk/pakistan-tours" },
      { "@type": "ListItem", position: 3, name: `From ${m.country}`, item: url },
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Pakistan tours for travellers from ${m.country}`,
    provider: { "@id": "https://travelbug.pk/#organization" },
    areaServed: { "@type": "Country", name: "Pakistan" },
    audience: { "@type": "Audience", audienceType: `${m.demonym} travellers` },
    url,
    description: m.intro,
  };

  const marketFaqs = [
    {
      question: `How do I get to Pakistan from ${m.country}?`,
      answer: m.routeNote,
    },
    {
      question: `Do ${m.demonym} travellers need a visa for Pakistan?`,
      answer: m.visaNote,
    },
    {
      question: `When is the best time to visit Pakistan from ${m.country}?`,
      answer: m.bestSeasonNote,
    },
    ...generalFaqs.slice(0, 3),
  ];

  const infoCards = [
    { label: "Getting There", value: m.gatewayCities.join(" · "), detail: m.routeNote },
    { label: "Best Season", value: "Spring · Summer · Autumn", detail: m.bestSeasonNote },
    { label: "Visa", value: "Online e-visa", detail: m.visaNote },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0B1628" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "160px", paddingBottom: "80px" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/destinations/hunza/attabad_lake.jpg" alt={`Pakistan tours from ${m.country}`} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,22,40,0.7), #0B1628)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: "980px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(255,194,10,0.1)", border: "1px solid rgba(255,194,10,0.3)", borderRadius: "999px", padding: "8px 18px", marginBottom: "24px" }}>
            <span style={{ fontSize: "18px" }}>{m.flag}</span>
            <span style={{ color: "#FFC20A", fontSize: "13px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Travelling from {m.country}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(34px, 6vw, 62px)", fontWeight: 900, color: "white", lineHeight: 1.05, margin: "0 0 22px" }}>
            Pakistan Tours from {m.country}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "19px", lineHeight: 1.7, maxWidth: "760px", margin: 0 }}>
            {m.intro}
          </p>
          <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", borderRadius: "14px", background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628", fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 32px rgba(255,194,10,0.3)" }}>
              Plan My Trip
            </Link>
            <Link href="/tours" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 30px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontWeight: 700, textDecoration: "none" }}>
              Browse All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Why Pakistan */}
      <section style={{ padding: "20px 40px 80px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "white", margin: "0 0 28px" }}>
            Why {m.demonym} travellers choose <span style={{ color: "#FFC20A" }}>Pakistan</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "16px" }}>
            {m.whyPakistan.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px" }}>
                <span style={{ color: "#FFC20A", fontWeight: 900, fontSize: "18px", flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ color: "rgba(255,255,255,0.78)", fontSize: "15px", lineHeight: 1.55 }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info cards: flights / season / visa */}
      <section style={{ padding: "0 40px 90px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px" }}>
          {infoCards.map((c, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
              <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>{c.label}</p>
              <p style={{ color: "white", fontSize: "18px", fontWeight: 800, margin: "0 0 12px" }}>{c.value}</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended tours */}
      <section style={{ padding: "0 40px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "white", margin: "0 0 10px" }}>
            Recommended <span style={{ color: "#FFC20A" }}>Tours</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", margin: "0 0 32px" }}>
            Hand-picked, top-rated private journeys — every one fully customisable to your dates and interests.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "22px" }}>
            {topTours.map((t) => (
              <Link key={t.id} href={`/tours/${t.slug}`} style={{ display: "block", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", textDecoration: "none" }}>
                <div style={{ height: "180px", overflow: "hidden" }}>
                  <img src={t.image} alt={t.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ color: "white", fontSize: "17px", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.3 }}>{t.title}</h3>
                  <div style={{ display: "flex", gap: "14px", color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>
                    <span>{t.duration} Days</span>
                    <span style={{ textTransform: "capitalize" }}>{t.category}</span>
                    <span style={{ color: "#FFC20A" }}>★ {t.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={marketFaqs}
        heading={`Pakistan Travel FAQs for ${m.demonym} Travellers`}
        subheading={`Flights, visas, seasons and safety — everything travellers from ${m.country} ask before booking.`}
      />

      {/* CTA */}
      <section style={{ padding: "80px 40px 100px", textAlign: "center" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", background: "linear-gradient(135deg, rgba(255,194,10,0.1) 0%, transparent 100%)", padding: "56px 40px", borderRadius: "28px", border: "1px solid rgba(255,194,10,0.15)" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, color: "white", margin: "0 0 16px" }}>
            Ready to explore Pakistan from {m.country}?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1.7, margin: "0 0 30px" }}>
            Tell us your dates and dreams — we'll design a private, photographer-led journey just for you. No fixed packages, no pressure.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 36px", borderRadius: "14px", background: "linear-gradient(135deg, #FFC20A, #FFD34A)", color: "#0B1628", fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 32px rgba(255,194,10,0.3)" }}>
            Start Planning Your Trip
          </Link>
        </div>
      </section>
    </div>
  );
}
