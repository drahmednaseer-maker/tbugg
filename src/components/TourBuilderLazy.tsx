"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * The trip builder is a 1,200-line interactive tool with no indexable prose, so
 * it is loaded on demand rather than shipped with the first render.
 *
 * What it must never do is show a blank gap. It used to render an empty 800px
 * box while it waited, which on a slow phone meant several seconds of nothing —
 * and if the chunk failed outright, nothing for good. Anyone following a link
 * to #tour-builder was scrolled directly to that emptiness.
 *
 * So the heading is real, server-rendered markup that is always present, and it
 * matches the heading the loaded builder renders, so nothing moves when the
 * real thing arrives. Underneath it is a skeleton while loading, or a way to
 * reach us if the tool could not load at all.
 */
const TourBuilder = dynamic(() => import("@/components/sections/TourBuilder"), {
  ssr: false,
  loading: () => <Placeholder state="loading" />,
});

const EVENTS = ["scroll", "pointerdown", "touchstart", "keydown"] as const;

const TARGETED = () =>
  typeof window !== "undefined" && window.location.hash === "#tour-builder";

function Placeholder({ state }: { state: "idle" | "loading" | "failed" }) {
  return (
    <section style={{ padding: "80px 0 80px", background: "linear-gradient(180deg, #070E1C 0%, #060B18 100%)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div className="tb-header" style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: "#FFC20A", fontSize: "11px", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>
            Design Your Journey
          </p>
          <h2 style={{ color: "white", fontWeight: 900, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, marginBottom: "12px" }}>
            Build Your <span style={{ color: "#FFC20A" }}>Custom Tour</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
            Click destinations → set nights → drag to reorder → choose hotels → we&apos;ll plan it all.
          </p>
        </div>

        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ borderRadius: "24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,194,10,0.2)", padding: "40px 36px", minHeight: "420px" }}>
            {state === "failed" ? (
              <div style={{ textAlign: "center" }}>
                <h3 style={{ color: "white", fontWeight: 900, fontSize: "clamp(22px, 5vw, 28px)", margin: "0 0 10px" }}>
                  The trip planner didn&apos;t load
                </h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, margin: "0 0 24px" }}>
                  Check your connection and reload the page — or just tell us where you
                  want to go and we&apos;ll plan it with you directly.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                  <a href="https://wa.me/923344334411" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 24px", borderRadius: "999px", background: "#25D366", color: "#0B1628", fontWeight: 800, fontSize: "14px", textDecoration: "none" }}>
                    Plan on WhatsApp
                  </a>
                  <a href="mailto:info@travelbug.pk"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 24px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.18)", color: "white", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                    Email us
                  </a>
                </div>
              </div>
            ) : (
              <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div className="tb-skel" style={{ height: "30px", width: "62%", margin: "0 auto", borderRadius: "8px" }} />
                <div className="tb-skel" style={{ height: "15px", width: "85%", margin: "0 auto 14px", borderRadius: "6px" }} />
                <div className="tb-skel" style={{ height: "48px", borderRadius: "12px" }} />
                <div className="tb-skel" style={{ height: "48px", borderRadius: "12px" }} />
                <div className="tb-skel" style={{ height: "48px", borderRadius: "12px" }} />
                <div className="tb-skel" style={{ height: "52px", borderRadius: "14px" }} />
              </div>
            )}
            {state === "loading" && (
              <p role="status" style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", textAlign: "center", marginTop: "20px" }}>
                Loading the trip planner…
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TourBuilderLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const start = () => {
      setShow(true);
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("hashchange", onHash);
      io?.disconnect();
    };
    // Someone following a link straight to #tour-builder is asking for this
    // section by name, so don't make them scroll to earn it.
    function onHash() { if (TARGETED()) start(); }

    if (TARGETED()) { start(); return; }

    window.addEventListener("hashchange", onHash);
    EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    if (typeof IntersectionObserver !== "undefined" && ref.current) {
      io = new IntersectionObserver(
        (entries) => { if (entries.some((e) => e.isIntersecting)) start(); },
        { rootMargin: "0px" },
      );
      io.observe(ref.current);
    }
    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener("hashchange", onHash);
      io?.disconnect();
    };
  }, []);

  // If the chunk cannot be fetched, next/dynamic keeps showing the loading
  // state forever. Give it a generous window, then offer a way through.
  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(() => {
      if (!ref.current?.querySelector(".tb-form-wrap, .tb-header ~ *")) setFailed(true);
    }, 20000);
    return () => window.clearTimeout(t);
  }, [show]);

  return (
    <div ref={ref} id="tour-builder">
      {failed ? <Placeholder state="failed" /> : show ? <TourBuilder /> : <Placeholder state="idle" />}
    </div>
  );
}
