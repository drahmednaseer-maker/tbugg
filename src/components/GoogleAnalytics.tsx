"use client";

import Script from "next/script";

/**
 * Google Analytics 4 — LIVE.
 *
 * Tracking runs under the "TravelBug.pk" property in the
 * info@asmarphotography.com Google Analytics account. The Measurement ID is not
 * a secret (it ships to every browser anyway), so it's hardcoded here — that
 * keeps GA4 working on every `git push` deploy with no Vercel dashboard access
 * needed. An optional NEXT_PUBLIC_GA_ID env var overrides it if ever set.
 *
 * View visitors at https://analytics.google.com (sign in as
 * info@asmarphotography.com). See ANALYTICS.md.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-W3MTQXZH2F";

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
