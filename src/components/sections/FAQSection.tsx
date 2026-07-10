"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import type { FAQ } from "@/data/faqs";

export default function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  subheading = "Everything you need to know before you travel to Pakistan.",
}: {
  faqs: FAQ[];
  heading?: string;
  subheading?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

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
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOpen ? "rgba(255,194,10,0.35)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "border-color 0.25s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "22px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ color: "white", fontSize: "16px", fontWeight: 700, lineHeight: 1.4 }}>{f.question}</span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isOpen ? "#FFC20A" : "rgba(255,255,255,0.08)",
                      color: isOpen ? "#0B1628" : "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease, background 0.25s",
                    }}
                  >
                    <Plus style={{ width: 16, height: 16 }} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.75, margin: 0, padding: "0 24px 24px" }}>
                        {f.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
