# TravelBug.pk — Your Private Analytics

Two owner-only dashboards are wired into the site. **Only you can see the data** —
each one sits behind a login that is yours. Nothing is public.

| | **Vercel Web Analytics** | **Google Analytics 4** |
|---|---|---|
| Best for | Quick daily check | Running & measuring ads |
| Setup | 1 click (below) | ~10 min (below) |
| Cookies / consent banner | None needed | Yes — plan for one |
| Where you view it | vercel.com | analytics.google.com |
| Cost to start | Free | Free |

Both show **where visitors come from** (country) and **which source** sent them
(direct, Google, Facebook, Instagram, referrals, and your ad campaigns via UTM tags).

---

## 1. Vercel Web Analytics — turn on now (1 click)

The code is already live. Just switch it on:

1. Go to **https://vercel.com** and log in (the account that owns the `tbugg` project).
2. Open the **travelbug** project → top menu **Analytics** tab.
3. Click **Enable Web Analytics**. Done.

Data starts flowing within a minute of the next visitor. You'll see: visitors,
page views, top pages, **top referrers**, **countries**, devices, browsers, OS.
Filter by any of these. Free tier covers ~2,500 events/month; upgrade only if
traffic outgrows it.

> This is cookieless and privacy-friendly, so it needs **no cookie banner**.

---

## 2. Google Analytics 4 — for when you run ads (~10 min)

GA4 is what connects to **Google Ads**, tracks conversions, builds audiences, and
gives the richest "source / medium / campaign" reports. It stays **completely off**
until you complete these steps:

1. Go to **https://analytics.google.com** → **Admin** (bottom-left gear).
2. **Create Property** → name it "TravelBug.pk", set timezone **Pakistan** and
   currency **PKR** → Next → pick *Travel* / *Online tools*.
3. Under the new property: **Data Streams** → **Add stream** → **Web** →
   URL `https://travelbug.pk`, name "TravelBug Web" → **Create stream**.
4. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`.
5. In **Vercel** → travelbug project → **Settings → Environment Variables**:
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: your `G-XXXXXXXXXX`
   - Environments: **Production** (and Preview if you like) → **Save**.
6. **Redeploy**: Vercel → **Deployments** → latest → **⋯ → Redeploy**
   (env vars only apply to builds made *after* they're set).

That's it — GA4 turns on across every page automatically. Check **Reports →
Realtime** and open the site to confirm your own visit appears.

### Cookie consent note
Once GA4 is live it sets cookies, so for EU/UK visitors you should show a small
consent banner. Tell me when you reach this step and I'll add a lightweight one.

---

## 3. Tracking your ads (UTM tags) — the important part

When you run **any** ad or post a link, tag the URL so you can see exactly which
ad/source drove the visit and (later) the booking. Format:

```
https://travelbug.pk/?utm_source=facebook&utm_medium=cpc&utm_campaign=hunza-spring&utm_content=video-a
```

- `utm_source` = where (facebook, instagram, google, youtube, whatsapp)
- `utm_medium` = type (cpc = paid click, social, email)
- `utm_campaign` = your campaign name (hunza-spring, k2-2026)
- `utm_content` = which creative (video-a, image-b) — optional, for A/B tests

Build these easily with Google's **Campaign URL Builder**
(https://ga-dev-tools.google/campaign-url-builder/). Both dashboards above break
down visitors by these tags, so you'll know which ad is actually working before
you spend more.

### Turn visits into measurable leads (do this before scaling ad spend)
Your "Start Planning" WhatsApp/email hand-off is the goal. When you're ready, I
can add a GA4 **conversion event** that fires when someone submits the trip
planner — so Google Ads can optimise toward real enquiries, not just clicks.
