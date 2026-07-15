# Structured Data (JSON-LD) Templates

Inject these as `<script type="application/ld+json">` blocks. Fill placeholders with real data
only — never invent ratings, review counts, or prices. Omit a property entirely if you don't
have a real value for it, rather than guessing.

## TouristDestination (destination pages: Hunza, Skardu, Lahore, etc.)

```json
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Hunza Valley",
  "description": "A mountain valley in Gilgit-Baltistan, northern Pakistan, known for panoramic views of Rakaposhi peak, apricot orchards, and Baltit Fort.",
  "url": "https://travelbug.pk/destinations/hunza-valley",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 36.3167,
    "longitude": 74.6500
  },
  "touristType": ["Adventure travelers", "Trekkers", "Photographers"],
  "includesAttraction": [
    { "@type": "TouristAttraction", "name": "Baltit Fort" },
    { "@type": "TouristAttraction", "name": "Attabad Lake" }
  ]
}
```

## Article / BlogPosting (blog posts, guides)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Time to Visit Pakistan: A Month-by-Month Guide (2026)",
  "description": "When to visit Pakistan for trekking, cherry blossoms, or avoiding monsoon rain, region by region.",
  "author": { "@type": "Organization", "name": "Travelbug.pk" },
  "publisher": {
    "@type": "Organization",
    "name": "Travelbug.pk",
    "logo": { "@type": "ImageObject", "url": "https://travelbug.pk/logo.png" }
  },
  "datePublished": "2026-01-10",
  "dateModified": "2026-07-01",
  "mainEntityOfPage": "https://travelbug.pk/blog/best-time-to-visit-pakistan",
  "image": "https://travelbug.pk/images/best-time-to-visit-pakistan.jpg"
}
```

## FAQPage (add to any page with an FAQ section)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a visa to visit Pakistan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most nationalities need an e-visa, applied for online in advance. GCC nationals (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman) can enter visa-free for 30 days."
      }
    },
    {
      "@type": "Question",
      "name": "Is northern Pakistan safe for foreign tourists?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main tourist areas — Islamabad, Lahore, Hunza Valley, and Skardu — have strong safety records for foreign visitors. Some other regions carry travel advisories; check current guidance before planning a route."
      }
    }
  ]
}
```

Only include FAQ items that actually appear as visible text on the page — schema must match
visible content, not add hidden questions purely for SEO.

## ItemList (listicle / "Top N" pages) — combine with Article + FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Top 10 Places to Visit in Pakistan in 2026",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "TouristAttraction",
        "name": "Hunza Valley",
        "url": "https://travelbug.pk/destinations/hunza-valley"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "TouristAttraction",
        "name": "Skardu",
        "url": "https://travelbug.pk/destinations/skardu"
      }
    }
  ]
}
```

**Best practice for ranking/listicle pages**: stack Article + ItemList + FAQPage as separate
JSON-LD blocks (or one array) on the same page — this combination has shown notably higher
citation rates than Article schema alone in independent tracking.

## BreadcrumbList (every page below the homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://travelbug.pk" },
    { "@type": "ListItem", "position": 2, "name": "Destinations", "item": "https://travelbug.pk/destinations" },
    { "@type": "ListItem", "position": 3, "name": "Hunza Valley", "item": "https://travelbug.pk/destinations/hunza-valley" }
  ]
}
```

## Organization / TravelAgency (homepage / about page, once)

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Travelbug.pk",
  "url": "https://travelbug.pk",
  "logo": "https://travelbug.pk/logo.png",
  "sameAs": [
    "https://www.instagram.com/travelbug.pk",
    "https://www.facebook.com/travelbug.pk"
  ]
}
```
Fill `sameAs` only with real, live social profiles — this helps establish entity identity
across the web, which matters for GEO trust signals.

## TouristTrip (specific packaged itineraries, if Travelbug.pk sells them)

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "7-Day Hunza & Skardu Adventure",
  "description": "A 7-day guided trip covering Hunza Valley, Attabad Lake, and Skardu's cold desert.",
  "touristType": "Adventure travelers",
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Islamabad to Hunza (drive)" },
      { "@type": "ListItem", "position": 2, "name": "Hunza sightseeing: Baltit Fort, Attabad Lake" }
    ]
  }
}
```

Only use `Product`/`Offer` schema with real prices if Travelbug.pk actually sells bookable
packages directly — don't add pricing schema for informational content with no real
transaction.

## Implementation notes

- Framework-specific: in Next.js, render via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` in the page/layout component; in Astro, inline directly in the `.astro` file's frontmatter-rendered HTML.
- One page can have multiple `<script type="application/ld+json">` blocks — no need to merge everything into one object unless preferred.
- Double-check JSON validity (no trailing commas, matching brackets) since a malformed block gets silently ignored by parsers.
