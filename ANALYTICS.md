# TravelBug.pk — Your Analytics (LIVE ✅)

Your website tracks every visitor with **Google Analytics 4**, and only you can
see it — it lives in your **info@asmarphotography.com** Google account.

- **Property:** TravelBug.pk
- **Measurement ID:** `G-W3MTQXZH2F` (wired into the site, live on every page)
- **Owner account:** info@asmarphotography.com

It shows **where visitors are from** (country/city), **which source** sent them
(direct, Google, Facebook, Instagram, referrals, and your ad campaigns via UTM
tags), what pages they view, on phone vs computer, and more.

---

## How to SEE your visitors

1. Go to **https://analytics.google.com**
2. Sign in as **info@asmarphotography.com**
3. Pick the **TravelBug.pk** property if asked.

Useful spots in the left menu:
- **Reports → Realtime** — who's on the site *right now* (great instant check)
- **Reports → Acquisition → Traffic acquisition** — **which source** sent visitors
- **Reports → User → Demographics → Country/City** — **where** they're from
- **Reports → Engagement → Pages** — most-visited pages

> New data takes a few minutes to appear; full daily reports settle after ~24–48h.
> Realtime is instant. On your phone, the **Google Analytics** app works too.

---

## Tracking your ads (UTM tags) — do this for every ad/link

When you run an ad or post a link, tag the URL so GA tells you exactly which
ad/source drove the visit. Format:

```
https://travelbug.pk/?utm_source=facebook&utm_medium=cpc&utm_campaign=hunza-spring
```

- `utm_source` = where (facebook, instagram, google, youtube, whatsapp)
- `utm_medium` = type (cpc = paid click, social, email)
- `utm_campaign` = your campaign name (hunza-spring, k2-2026)

Build these in seconds with Google's **Campaign URL Builder**:
https://ga-dev-tools.google/campaign-url-builder/ — then use that tagged link in
your ad. GA breaks visitors down by these tags, so you'll know which ad actually
works before spending more.

---

## For your developer (technical notes)

- GA4 is loaded by `src/components/GoogleAnalytics.tsx`, rendered in
  `src/app/layout.tsx`. The Measurement ID is hardcoded (it's non-secret /
  client-exposed) so it stays live on every `git push` deploy — **no Vercel
  dashboard access required**. `NEXT_PUBLIC_GA_ID` env var overrides it if set.
- A second layer, **Vercel Web Analytics** (`<Analytics/>` in the layout), is
  also wired in but stays inactive until someone with Vercel dashboard access
  clicks **Enable Web Analytics** on the project. It's harmless if left off.

### Next steps you can ask for
- **Cookie-consent banner** for EU/UK visitors (GA4 sets cookies).
- A GA4 **conversion event** when someone submits the trip planner, so Google
  Ads can optimise toward real enquiries — not just clicks.
- Link GA4 to a **Google Ads** account when you start advertising.
