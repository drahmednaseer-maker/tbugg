"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * The trip builder is a 1,200-line interactive tool, not indexable content —
 * it carries no headings or prose that search engines need, and with ssr:false
 * it has never been in the HTML.
 *
 * Mounting it on load meant its dynamic import resolved during hydration, which
 * pulled an 11 KB CSS chunk. A stylesheet inserted into <head> blocks rendering
 * while it is pending, so the builder was holding up the first paint of the
 * page above it — measured live, that chunk landed at 732ms and first paint
 * followed at ~900ms. It also fired fourteen weather requests on load.
 *
 * It now waits for the reader to do something — scroll, tap, type — which is
 * the same gate the hero photo strip and the analytics tag use. The builder
 * begins about 150px below the fold, so "first scroll" is the same moment the
 * reader starts heading towards it, and it is mounting while they travel. The
 * IntersectionObserver is the fallback for the case where it is on screen
 * without any scrolling, on a short hero or a tall window.
 *
 * The placeholder reserves its height so nothing shifts (CLS stays 0). The
 * wrapper owns #tour-builder permanently rather than handing it over on mount:
 * the hero's "Plan My Trip" button links there, and Lenis resolves that anchor
 * to an element once and then animates towards it, so an id that moves
 * mid-animation leaves the scroll stranded. The wrapper is a single stable node
 * in the same place in the flow, so the anchor lands whether the builder has
 * mounted yet or not.
 */
const TourBuilder = dynamic(() => import("@/components/sections/TourBuilder"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "800px" }} />,
});

const EVENTS = ["scroll", "pointerdown", "touchstart", "keydown"] as const;

export default function TourBuilderLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let io: IntersectionObserver | undefined;
    const start = () => {
      setShow(true);
      EVENTS.forEach((e) => window.removeEventListener(e, start));
      io?.disconnect();
    };
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
      io?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} id="tour-builder" style={{ minHeight: show ? undefined : "800px" }}>
      {show ? <TourBuilder /> : null}
    </div>
  );
}
