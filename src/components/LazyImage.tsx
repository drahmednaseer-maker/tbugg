"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A next/image that is not requested until it is close to the viewport.
 *
 * `loading="lazy"` alone is not enough: Chrome starts fetching a lazy image
 * while it is still 1,250px below the fold, so on the homepage every photo in
 * the first two sections (and the next seven marquee tiles) was requested
 * before the hero had even painted — about 270 KB competing with the hero's
 * JS and font, which Lighthouse's mobile model charges straight to LCP.
 *
 * Until the image is within `margin` of the viewport this renders only its
 * wrapper (sized by the parent, since every caller uses `fill`), so nothing
 * is fetched and nothing shifts when the photo arrives.
 */
export default function LazyImage({
  margin = "200px 400px",
  ...props
}: ImageProps & { margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, near]);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      {near && <Image {...props} />}
    </div>
  );
}
