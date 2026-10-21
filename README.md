# Geek Services

Albany-based applied technology and research website. The static pages in `geek-services-site/` are published directly by Netlify; no build command is required. The repository root is the configured base directory.

## Maintain the site

Edit shared content and templates in `scripts/refresh_site.py`, then run `python3 scripts/refresh_site.py`. Preserved article source lives in `scripts/legacy-articles/`. Edit CSS and browser behavior in `geek-services-site/styles.css` and `main.js`.

Run `python3 scripts/check_site.py` for metadata, structured data, sitemap, and internal-link checks. Run `npm ci` and `npm run check` for server-side TypeScript checks. Local Netlify emulation uses `netlify dev --port 8889`.

## Platform features

Project inquiries use Netlify Forms, with regional and service-interest fields and an on-screen confirmation. Consultation link clicks use a rate-limited Netlify Function and Netlify Database. Drizzle schema lives in `db/schema.ts`; the deployment platform applies migrations from `netlify/database/migrations/`.

See [launch validation and account handoff](docs/launch-validation.md) for production verification, Google Search Console, Google Business Profile, measurement limits, and research evidence boundaries. Google account actions remain pending.
