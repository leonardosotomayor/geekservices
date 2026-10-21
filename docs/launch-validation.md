# Launch and account handoff

The official URL format is `https://geekservicesny.com/`. The generated site uses this host in canonicals, Open Graph URLs, structured data, robots.txt, and sitemap.xml. Redirects preserve the former founder URL and send www and the production Netlify hostname to the official domain. Deploy preview hosts remain available for review.

## Google Search Console

The owner did not provide Search Console status. An authenticated Search Console connection was not available during implementation. Submission and indexing inspection have not been performed. After deployment, use the verified domain property or the matching HTTPS URL-prefix property. Submit `https://geekservicesny.com/sitemap.xml` in Sitemaps. Inspect the homepage, every service page, both location pages, founder page, contact page, research indexes, all three project summaries, the orientation demo, both methods briefs, the article index, and all articles. The thank-you page intentionally requests no indexing. Record the submitted sitemap status and inspection results; request indexing where appropriate. A sitemap in robots.txt helps discovery but does not constitute Search Console submission or guarantee indexing.

## Google Business Profile and regional authority

The owner confirmed that Geek Services currently operates online and has no operating business location. No Google Business Profile was created or modified. An online-only business does not qualify for a profile solely by choosing a Capital Region address. Do not use a placeholder address, virtual office, or invented location. An internal future-location plan may identify the Capital Region as a target, but it must not be published as an operating address or included as an address in structured data.

If the business later begins eligible in-person service, reassess the current Google eligibility rules before creating or claiming a profile. A legitimate service-area business can hide its address when appropriate, but must actually serve customers in person. Confirm the real-world business name, contact details, operating arrangements, hours, and category first. The current site describes remote delivery and does not publish a street address, map pin, or LocalBusiness location claim.

Keep the same verified identity across legitimate profiles. Consider relevant Albany business networks, founder communities, professional organizations, community projects, and collaborators for genuine listings and earned links. University affiliation alone does not imply endorsement or partnership. Do not publish invented partnerships, reviews, locations, or link claims.

## Inquiry and consultation measurement

Netlify Forms is enabled. `project-inquiry` records name, email, organization, region, service interest, message, and source path. The Local Starter Pack link preselects its interest; Albany and Yonkers links preselect the region. Fields remain editable. Successful submissions redirect to `/thank-you/`; errors retain the entered message. Native POST submission also works without JavaScript. Confirmation is on-screen, not an automated email receipt. Configure owner notifications in the Netlify dashboard if desired.

After deployment, send one legitimate owner-controlled inquiry, confirm its receipt in Netlify Forms, and verify the thank-you redirect. Remove any test submission afterward. No real inquiry was sent during implementation.

Consultation clicks are stored in the Netlify Database `consultation_clicks` table, with a timestamp and the fixed `/contact/` path. No IP address, email, query string, or cookie identifier is stored by this tracking code. The endpoint rejects other paths and cross-origin requests and has platform rate limits. Clicks are best-effort measures of booking interest, not evidence of scheduled or attended appointments. Browser blockers, network failures, and repeated clicks affect totals. The table is not publicly readable. The platform applies the included migration during deployment; it was not applied manually.

For an authorized internal count, query the database in the Netlify dashboard, for example:

```sql
SELECT date_trunc('day', created_at) AS day, count(*) AS consultation_clicks
FROM consultation_clicks
GROUP BY 1
ORDER BY 1 DESC;
```

## Research evidence

Three project summaries derive from existing founder materials. No measured outcomes, unpublished code, or institutional recognition was invented. Two methods briefs and a separate interactive orientation model are published as educational material. The model includes assumptions, limitations, a chart, and Python source. It does not estimate annual solar yield or reproduce the founder's original study. Full original project reports, datasets, and reproducible implementations still require founder-provided source material.

## Editing and checks

Edit `scripts/refresh_site.py` for shared templates and current content, and `scripts/legacy-articles/` for preserved articles. Run `python3 scripts/refresh_site.py` to refresh the committed static pages. This is an editorial generation script, not a deployment build requirement. CSS, browser scripts, and downloadable model code live in the publish directory. Run `python3 scripts/check_site.py` and `npm run check` to check static content and server-side types. Do not run a build command for this workflow; deployment validation is handled by the platform.
