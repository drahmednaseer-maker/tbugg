# Technical SEO Checklist

Work through this list against the real codebase. Fix directly in code where possible.

## 1. Metadata (every page needs unique title + description)

Bad: same `<title>Travelbug.pk</title>` on every page.
Good: unique, keyword-front-loaded, under ~60 chars for title, ~155 chars for description.

Example pattern for a destination page:
- Title: `Hunza Valley Travel Guide 2026 — Best Time, Cost & Itinerary | Travelbug.pk`
- Description: `Plan your Hunza Valley trip: best months to visit, 5-day itinerary, hotel costs in PKR/USD, and how to get there from Islamabad. Updated for 2026.`

### Next.js App Router
Use the `generateMetadata` export per route, or static `metadata` object:
```ts
export const metadata: Metadata = {
  title: "Hunza Valley Travel Guide 2026 — Best Time, Cost & Itinerary | Travelbug.pk",
  description: "...",
  alternates: { canonical: "https://travelbug.pk/destinations/hunza-valley" },
  openGraph: { title: "...", description: "...", images: ["/og/hunza.jpg"] },
};
```
For dynamic routes (e.g. `[slug]`), use `generateMetadata(props)` pulling from the CMS/data file — never leave it static across all slugs.

### Next.js Pages Router
Use `next/head` per page, or a shared `<SEO>` component wrapping `<Head>` that takes title/description/canonical/OG props — apply it on every page, especially dynamic `[slug].tsx` pages.

### Astro
Set `<title>` and meta tags in a shared `<Layout>` component with props passed from each `.astro` or `.md` page's frontmatter.

### Static HTML / plain React SPA
If it's a pure client-rendered SPA with no SSR, **flag this as the single biggest SEO risk**. Search engines and AI crawlers largely need server-rendered or pre-rendered HTML to reliably read title/description/content. Recommend migrating to a framework with SSR/SSG (Next.js, Astro) or at minimum pre-rendering key pages, before investing further in content.

## 2. Canonical URLs
Every page should self-canonicalize to avoid duplicate-content splitting (e.g. `travelbug.pk/hunza` vs `travelbug.pk/hunza/` vs `travelbug.pk/hunza?ref=...`). Set `<link rel="canonical">` pointing to the clean URL on every page.

## 3. robots.txt
Should exist at the domain root and:
- Allow crawling of all real content
- Disallow admin/internal routes (`/admin`, `/api`, `/cart` if irrelevant to indexing)
- Reference the sitemap: `Sitemap: https://travelbug.pk/sitemap.xml`

Note: don't bother creating `llms.txt` files or other "AI-specific" markup files — Google has
explicitly said these aren't used for AI Overview visibility, and there's no evidence other
major AI crawlers rely on them either. Focus effort on real content and standard SEO signals
instead.

## 4. XML Sitemap
Must include every real, indexable page (destinations, blog posts, itineraries) with accurate
`lastmod` dates. Regenerate automatically on build/deploy, don't hand-maintain it.
- Next.js: use `app/sitemap.ts` (App Router) returning a `MetadataRoute.Sitemap` array generated from your content source.
- Astro: use `@astrojs/sitemap` integration.
- Submit the sitemap URL in Google Search Console and Bing Webmaster Tools (manual step for the user — you can't do this from the codebase).

## 5. URL structure
Use clean, descriptive, keyword-containing slugs:
- Good: `/destinations/hunza-valley`, `/blog/best-time-to-visit-pakistan`
- Bad: `/page?id=482`, `/destinations/d1`

Keep a consistent pattern (e.g. `/destinations/[slug]`, `/blog/[slug]`, `/itineraries/[slug]`) so internal linking and breadcrumbs stay predictable.

## 6. Internal linking
Every destination/blog page should link to 3-5 related pages (other destinations in the same
region, relevant itineraries, practical guides like visa/safety). This helps both classic
crawlers and AI retrieval systems understand topical clusters. Avoid orphan pages with zero
inbound internal links.

## 7. Images
- Descriptive `alt` text on every image (`alt="Rakaposhi peak view from Hunza Valley, Pakistan"`, not `alt="img1"`)
- Use modern formats (WebP/AVIF) and Next.js `<Image>` (or framework equivalent) for automatic optimization/lazy-loading
- Compress hero images — large unoptimized images are a common Core Web Vitals killer on travel sites full of photography

## 8. Core Web Vitals basics
- Lazy-load below-the-fold images
- Avoid render-blocking fonts/scripts; use `font-display: swap`
- Check bundle size if it's a heavy JS framework — travel sites with huge image galleries often ship too much JS on first load
- Test with PageSpeed Insights or Lighthouse after changes (mention to the user, or run Lighthouse via CLI if available in the environment)

## 9. Mobile responsiveness
Pakistani and most international travel searches are majority-mobile. Verify layouts don't break on small viewports, tap targets are large enough, and text is readable without zooming.

## 10. HTTPS & redirects
- Confirm the whole site serves over HTTPS with no mixed content
- If any URL structure changed recently, confirm old URLs 301-redirect to new ones rather than 404ing — lost backlinks/rankings are a common cause of traffic drops

## 11. Structured data validity
After adding any JSON-LD (see `schema-templates.md`), sanity-check required properties are
present (don't invent schema.org properties) and that it's valid JSON. Recommend the user run
pages through Google's Rich Results Test as a final check — you can't hit that tool
programmatically, but you can catch malformed JSON yourself.

## 12. Language/currency signals (if relevant)
If Travelbug.pk serves both PKR-pricing domestic content and USD-pricing content for
international visitors, make sure currency and pricing context is stated explicitly in text
(not just a toggle UI element) — AI engines summarizing your page need it in the text/schema,
not hidden behind JS state.
