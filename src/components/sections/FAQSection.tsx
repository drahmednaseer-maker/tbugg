import type { FAQ } from "@/data/faqs";

/* A native <details>/<summary> accordion. This used to be a client component
   holding the open index in useState; the browser tracks that itself, so the
   section now ships no JavaScript, works before hydration, and gets correct
   expand/collapse semantics for screen readers for free. The shared `name`
   keeps the original behaviour of only one panel being open at a time. */

export default function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  subheading = "Everything you need to know before you travel to Pakistan.",
}: {
  faqs: FAQ[];
  heading?: string;
  subheading?: string;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" style={{ padding: "96px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#FFC20A", fontSize: "12px", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>
            Good to Know
          </p>
          <h2 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 900, color: "white", lineHeight: 1.1, margin: "0 0 14px" }}>
            {heading}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: 1.6, margin: 0 }}>
            {subheading}
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((f, i) => (
            <details key={i} className="tb-faq" name="tb-faq" open={i === 0}>
              <summary>
                <span className="tb-faq-q">{f.question}</span>
                <span className="tb-faq-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="tb-faq-a">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
