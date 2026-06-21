# TravelBug.pk — SEO Action Plan

Prioritized fixes from the SEO audit (Health Score: **74/100**). See `FULL-AUDIT-REPORT.md` for full findings.

## 🔴 Critical (do now)
1. **Add an `<h1>` to every page missing one** (currently start at `<h2>`):
   - `components/sections/Hero.tsx` (homepage)
   - `app/tours/ToursClient.tsx`
   - `app/about/AboutClient.tsx`
   - `app/contact/ContactClient.tsx`
   - `app/why-travelbug/page.tsx`
   - One H1 per page, containing the primary keyword (e.g. "Photographer-Led Custom Tours of Pakistan").
2. **Prioritize the hero LCP image** — add `fetchpriority="high"` to the above-fold hero `<img>` (or migrate it to `next/image` with `priority`).

## 🟠 High (within 1 week)
3. **Migrate images to `next/image`** — replace raw `<img>` across the 15 files. Start with hero + featured/gallery sections. Gets WebP/AVIF, responsive `srcset`, lazy-loading, and CLS-safe sizing automatically. `remotePatterns` already permit unsplash + wikimedia.
4. **Add per-page canonicals** — set `alternates: { canonical: <url> }` in each route's metadata / `generateMetadata`.
5. **Re-enable build safety** — flip `ignoreBuildErrors` and `ignoreDuringBuilds` to `false` in `next.config.ts`; fix what surfaces. Prevents silent SEO regressions.

## 🟡 Medium (within 1 month)
6. **Per-page Open Graph images** — set `openGraph.images` on tour & destination pages (use the tour/destination hero), instead of all sharing the root Attabad Lake image.
7. **Populate `sameAs`** in the `TravelAgency` schema (`src/app/layout.tsx`) with Instagram/Facebook/YouTube URLs.
8. **Add `width`/`height`** to all images for CLS stability (automatic if you complete #3).
9. **Add security headers** via `headers()` in `next.config.ts` (HSTS, X-Content-Type-Options, basic CSP).

## 🟢 Low (backlog)
10. **Add `Review`/`aggregateRating` schema** sourced from the Traveler Stories page → review rich results.
11. **Add `FAQPage` schema** for common trip questions → AI-search & SERP visibility.
12. **Audit `alt=""`** in `components/sections/BehindTheLens.tsx:83` — confirm decorative.
13. **Run Lighthouse** on `npm run dev` / production for real Core Web Vitals (LCP/INP/CLS) numbers.
