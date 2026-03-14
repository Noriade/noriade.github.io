# Contributing

## Setup
1. Install Node dependencies with `npm install`.
2. Install Ruby gems with `bundle _2.4.19_ install`.

## Validation
1. Run `npm test -- --runInBand`.
2. Run `bundle _2.4.19_ exec jekyll build`.

## Content Changes
- Keep French and English variants aligned when both exist.
- Prefer updating `_config.yml` for navigation and shared labels.
- Use relative URLs in templates so `baseurl` continues to work.

## Commits
- Keep commits scoped to one logical change when possible.
- Mention user-visible effects in the commit message.
