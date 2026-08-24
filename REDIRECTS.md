# Redirects

## Policy
- Existing public URLs must remain stable whenever possible.
- If a permalink changes, record the old URL here before merging the change.
- Every retired URL should have an explicit redirect target and status.
- Prefer permanent redirects (`301`) for replaced content.

## Current Public URLs To Preserve

### Core Pages
- `/`
- `/en/`
- `/services/`
- `/en/services/`
- `/contact/`
- `/en/contact/`
- `/blog/`
- `/en/blog/`
- `/mentions-legales/`
- `/en/terms-and-conditions/`

### Services
- `/services/conseil-audit/`
- `/services/hebergement-web/`
- `/services/infogerance/`
- `/services/web-marketing/`
- `/en/services/audit-it-consulting/`
- `/en/services/web-hosting/`
- `/en/services/outsourcing/`
- `/en/services/web-marketing/`

### References
- `/references/youscribe/`
- `/references/le-bonbon/`
- `/references/orange-applications-for-business/`
- `/references/wynd/`

### Blog URL Pattern
- `/blog/:year-:month-:day-:title/`

## Change Log
- `2026-08-24`: corrected stale English internal links (`/en/hosting/mail/` ->
  `/en/hosting/mails/` and `/en/services/consulting/` ->
  `/en/services/audit-it-consulting/`). These were link fixes only; no public
  URL was changed and no new redirect was required. Updated `sitemap.xml`
  `lastmod` values for the cleaned public pages.
- `2026-08-24`: retired `/partenaires/` and `/en/partners/` (no 301 —
  no valid replacement target). Zero remaining SEO/link-exchange value:
  the two "Référencement" directory links had been repurposed for spam
  (offshore hosting link farm, hijacked domain serving a default admin
  template) and the six "Boutiques" links were unrelated e-commerce
  (jewelry, phone cases, sneakers). Pages deleted, footer links removed
  sitewide, entries removed from `sitemap.xml`. 404 accepted per policy
  exception: Google treats 404 and 410 near-identically for
  deindexing, and there is no legitimate content to redirect to.
- `2026-03-14`: restored legacy blog posts from production into `_posts` for:
  - `/blog/2019-01-24-nouveau-site-lebonbon/`
  - `/en/blog/2019-01-24-new-website-lebonbon/`
  - `/blog/2019-04-25-creation-site-samathi-lake/`
  - `/en/blog/2019-04-25-new-customer-samathi-lake/`
  - `/blog/2019-06-06-offres-office365/`
  - `/en/blog/2019-06-06-office365-offers/`
- `2026-03-14`: added maintained redirects for legacy aliases:
  - `/blog/2015-03-12-website-opening/` -> `/en/blog/2015-03-12-website-opening/`
  - `/blog/2015-03-18-piwik-installation/` -> `/en/blog/2015-03-18-piwik-installation/`
  - `/blog/2019-01-24-new-website-lebonbon/` -> `/en/blog/2019-01-24-new-website-lebonbon/`
  - `/blog/2019-04-25-new-customer-samathi-lake/` -> `/en/blog/2019-04-25-new-customer-samathi-lake/`
  - `/services/marketing-web/` -> `/services/web-marketing/`
  - `/en/services/it-consulting/` -> `/en/services/audit-it-consulting/`
  - `/fr/services/hebergement-web/` -> `/services/hebergement-web/`
  - `/en/legal-disclaimer/` -> `/en/terms-and-conditions/`
  - `/sitemap/` -> `/sitemap.xml`
  - `/en/sitemap/` -> `/sitemap.xml`
