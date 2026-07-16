"use client";

import Script from "next/script";

/**
 * Google Analytics 4 — DORMANT until you add a Measurement ID.
 *
 * It reads NEXT_PUBLIC_GA_ID at build time. With no ID set, this renders
 * nothing and the site loads ZERO Google cookies/scripts. The moment you add
 * a `G-XXXXXXXXXX` value (see ANALYTICS.md), GA4 turns on across every page and
 * SPA route change, ready for Google Ads campaign + UTM source tracking.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
