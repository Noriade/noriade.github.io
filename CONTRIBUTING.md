# Contributing

## Setup
1. Install Node dependencies with `npm ci`.
2. Do not install Ruby gems: this checkout is a static export and has no Gemfile.

## Validation
1. Run `npm test -- --runInBand`.
2. Validate the exported pages and metadata against the intended public paths.

## Content Changes
- Keep French and English variants aligned when both exist.
- Preserve the existing static paths and update `REDIRECTS.md` before any URL change.
- Keep FR/EN pages and their canonical/hreflang metadata aligned.

## Commits
- Keep commits scoped to one logical change when possible.
- Mention user-visible effects in the commit message.
