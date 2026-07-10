# TravelBug.pk — SEO Launch Checklist

The website's on-page, technical, schema, AEO and programmatic SEO are **done in code**. These are the steps that must be done **on the live site / external platforms** to actually rank and get cited by AI. Do these after deploying from the account-connected PC.

## 1. Deploy & verify the build is live
- [ ] Push to GitHub and confirm Vercel deploys the latest commit (Deployments tab → "Ready").
- [ ] Set **`travelbug.pk` as the Primary domain** in Vercel → Settings → Domains, so it stops redirecting to `www` (our canonicals point to the non-www version).
- [ ] Spot-check: view-source on `https://travelbug.pk/about` → canonical should read `.../about`.

## 2. Google Search Console (critical for indexing)
- [ ] Add the property at [search.google.com/search-console](https://search.google.com/search-console) for `travelbug.pk`.
- [ ] Get the verification code → in Vercel add env var **`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`** = the code → redeploy. (The meta tag is already wired up in the site.)
- [ ] Submit the sitemap: `https://travelbug.pk/sitemap.xml`.
- [ ] Use "URL Inspection" → Request indexing for the homepage and key pages.

## 3. Bing Webmaster Tools
- [ ] Add the site at [bing.com/webmasters](https://www.bing.com/webmasters).
- [ ] Add env var **`NEXT_PUBLIC_BING_SITE_VERIFICATION`** in Vercel → redeploy.
- [ ] Submit the same sitemap. (Bing powers ChatGPT search results too — worth doing.)

## 4. Google Business Profile (huge for GEO / local & "Pakistan travel agency" searches)
- [ ] Create/claim a profile at [business.google.com](https://business.google.com) for TravelBug.pk (Wah Cantt address, phone, website, photos).
- [ ] Add categories: Travel Agency, Tour Operator.
- [ ] This is the single biggest lever for local/geo visibility and appears in Maps + AI answers.

## 5. Real reviews (boosts trust + rich results)
- [ ] Ask past clients to leave **Google reviews** (far stronger than on-site testimonials).
- [ ] Consider a TripAdvisor / Google listing so the star ratings are third-party verified.

## 6. AI search / AEO (already strong — keep it fed)
- [x] FAQ schema, `llms.txt`, structured content — done in code.
- [ ] After deploy, confirm `https://travelbug.pk/llms.txt` loads.
- [ ] Test: ask ChatGPT / Perplexity "best photographer-led tours in Pakistan" over time and see if TravelBug.pk gets cited (improves as the site gains authority).

## 7. Authority & backlinks (the long game — biggest factor for competitive terms)
- [ ] Get listed in Pakistan travel directories and tourism sites.
- [ ] Guest posts / features on travel blogs and photography communities.
- [ ] Share destination guides on Instagram/Facebook/YouTube linking back to the site.

## 8. Remaining code optimisation (optional, do with visual QA)
- [ ] Migrate remaining `<img>` tags to `next/image` for full Core Web Vitals gains (homepage hero already done). Do this as a focused pass and eyeball each page.
- [ ] Consider re-enabling `typescript.ignoreBuildErrors` / `eslint.ignoreDuringBuilds` = false in `next.config.ts` and fixing what surfaces.

---
**Reality check:** On-page SEO is ready and strong. Ranking on page 1 for competitive terms ("Pakistan tours") also needs steps 4–7 and **time** (weeks to months) as the domain earns authority. Long-tail terms and AI citations should come much faster once indexed.
