# Development

## Repository status
- This checkout is the static export currently published by GitHub Pages.
- The Astro rebuild is maintained separately in `Noriade/noriade-next`.
- No Gemfile, Jekyll source tree, or local Jekyll build is present here.

## Tests
- Contact form tests: `npm test -- --runInBand`

## Notes
- The repository uses a small Jest suite only for JavaScript behavior checks.
- Public HTML, assets, sitemap, robots and llms files are already in the checkout.
- Preserve root-relative public URLs and update `REDIRECTS.md` before changing them.
