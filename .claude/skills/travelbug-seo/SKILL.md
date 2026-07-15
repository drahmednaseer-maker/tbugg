---
name: travelbug-seo
description: Full SEO + GEO (Generative Engine Optimization) + AEO (Answer Engine Optimization) toolkit for Travelbug.pk, a Pakistan travel/tourism website. Use this skill whenever the user asks to improve rankings, traffic, visibility, or "SEO" for Travelbug.pk or any Pakistan-tourism content — including requests to audit the site, write or restructure travel pages/blogs, add schema/structured data, target international tourist markets (UK, US, China, GCC, Germany, domestic Pakistan), get cited by ChatGPT/Perplexity/Google AI Overviews/Gemini, build itinerary or destination pages, do keyword research for Pakistan travel, or set up technical SEO (sitemaps, meta tags, Core Web Vitals, robots.txt) in a Claude Code project. Trigger this even if the user just says "help me rank on Google" or "optimize this page" within a travel-site codebase.
---

# Travelbug.pk — SEO + GEO + AEO Skill

Optimizes Travelbug.pk to rank in classic Google search (SEO), get pulled into featured
snippets/AI Overviews (AEO), and get cited/recommended by AI assistants like ChatGPT,
Perplexity, Gemini, and Claude (GEO).

**Core principle for 2026:** SEO is still the foundation — AI engines mostly draw from pages
that already rank well and are technically crawlable. AEO and GEO are additive layers on top
of good SEO, not replacements for it. Never sacrifice real technical/content quality to chase
an "AI hack."

## Step 0 — Orient yourself in the codebase

Before writing anything, figure out what you're working with. Run these checks:

```bash
# Framework / stack
cat package.json 2>/dev/null | grep -E '"(next|react|astro|gatsby|vue|nuxt)"'
find . -maxdepth 2 -iname "*.config.*" -not -path "*/node_modules/*"
# Existing SEO surface area
find . -iname "sitemap*.xml" -o -iname "robots.txt" -not -path "*/node_modules/*"
find . -iname "*.md" -path "*blog*" -not -path "*/node_modules/*" | head -20
```

Identify:
1. **Framework** (Next.js App Router / Pages Router, Astro, plain React SPA, static HTML, WordPress export, etc.) — this determines *how* metadata, sitemaps, and schema get implemented (see `references/technical-seo.md` for framework-specific patterns).
2. **Current pages/routes** — especially destination pages, blog posts, itinerary pages.
3. **Whether there's already a CMS or the content is hardcoded.**

If you can't tell, ask the user in one short question rather than guessing wrong and rewriting the whole routing layer.

## Step 1 — Clarify the target market (only if not already obvious)

Travelbug.pk can optimize for two different intents that use different keywords and different
schema:
- **Inbound**: foreigners researching/planning a trip to Pakistan (source markets below)
- **Domestic**: Pakistanis searching for trips inside Pakistan (Hunza, Skardu, Murree, Swat, Naran, umrah/religious travel, etc.) — this is currently the larger search volume

If the user hasn't said, ask which is the priority (or "both") — see `references/keyword-targeting-by-market.md` for the full breakdown. Don't block on this; if ambiguous, default to building for both and say so.

**Top inbound source markets for Pakistan tourism (2025–2026 data):** UK, USA, and China are
the largest source countries by arrivals. GCC nationals (UAE, Saudi Arabia, Qatar, Kuwait,
Bahrain, Oman) get 30-day visa-free entry, which makes them a high-intent, low-friction segment
worth targeting explicitly. Germany and other EU trekking/adventure travelers are a smaller but
growing niche (Karakoram Highway, K2 base camp, Hunza). Domestic Pakistani travel (~50M
trips/year) dwarfs inbound volume — don't neglect it.

## Step 2 — Run the technical SEO audit

Read `references/technical-seo.md` and work through its checklist against the actual codebase:
title tags, meta descriptions, canonical URLs, sitemap.xml, robots.txt, image alt text, Core
Web Vitals basics, mobile responsiveness, internal linking, URL structure, hreflang (if
multi-language/currency is planned), and HTTPS/redirects. Fix what you can directly in the
codebase; report what needs manual action (e.g., Google Search Console verification, DNS).

## Step 3 — Restructure/write content for AEO + GEO

This is the part that's different from "old SEO." Read `references/geo-aeo-optimization.md`
before writing or editing any page or blog post — it has the exact content patterns (answer-first
openings, FAQ blocks, listicle structure, freshness signals, entity-first definitions) that get
content extracted by answer engines and cited by AI assistants. Apply this to:
- Destination pages (e.g. "Hunza Valley travel guide")
- Itinerary/listicle pages (e.g. "Top 10 places to visit in Pakistan in 2026")
- Practical/logistics pages (visas, best time to visit, costs, safety)
- Comparison pages (e.g. "Hunza vs Skardu", "best time to visit Pakistan")

## Step 4 — Add structured data (schema.org / JSON-LD)

Read `references/schema-templates.md` and inject the right JSON-LD block(s) per page type:
`TouristDestination`, `TouristTrip`, `Article`/`BlogPosting`, `FAQPage`, `ItemList`,
`BreadcrumbList`, `Organization`/`TravelAgency`, `LocalBusiness` (if booking specific
hotels/tours). Stack multiple schema types on ranking/listicle pages (Article + ItemList +
FAQPage together) since that combination has strong extraction data behind it. Validate output
mentally against schema.org — don't invent properties.

## Step 5 — Keyword & content plan by market

Use `references/keyword-targeting-by-market.md` to propose or fill in a content calendar:
topic clusters organized by source market and by search intent (informational → transactional).
When the user asks "what should I write next," pull from this file rather than free-styling
generic travel-blog topics.

## Step 6 — Report back clearly

After any audit or batch of changes, summarize in plain language (the user may not be
SEO-technical):
- What you found broken/missing
- What you fixed directly in the code
- What still needs the user to do manually (e.g., verify Google Search Console, submit sitemap,
  set up Bing Webmaster Tools, get backlinks/PR mentions — GEO leans heavily on third-party
  mentions which Claude can't create for them)
- 3-5 concrete next actions, prioritized

Don't claim you can "guarantee" a ranking or AI citation — no one can. Be honest that GEO/AEO
results take weeks (content needs to be crawled, indexed, and picked up by AI retrieval
pipelines — typically observed in the 1-3 week range, not overnight) and depend partly on
off-site signals (reviews, press mentions, backlinks) that are outside the codebase.

## Reference files

- `references/technical-seo.md` — Framework-specific technical SEO checklist (Next.js, Astro, static HTML, WordPress)
- `references/geo-aeo-optimization.md` — Content patterns that get extracted/cited by AI engines, with before/after examples
- `references/schema-templates.md` — Ready-to-use JSON-LD templates for travel content
- `references/keyword-targeting-by-market.md` — Keyword clusters segmented by source country/market and search intent
