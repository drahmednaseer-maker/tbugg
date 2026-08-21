"use client";

import dynamic from "next/dynamic";

/**
 * The trip builder is a 1,200-line interactive tool, not indexable content —
 * it carries no headings or prose that search engines need. Loading it
 * client-side keeps its JS out of the initial bundle and off the LCP critical
 * path. The placeholder reserves its height so nothing shifts (CLS stays 0).
 */
const TourBuilder = dynamic(() => import("@/components/sections/TourBuilder"), {
  ssr: false,
  loading: () => <div id="tour-builder" aria-hidden="true" style={{ minHeight: "800px" }} />,
});

export default function TourBuilderLazy() {
  return <TourBuilder />;
}
