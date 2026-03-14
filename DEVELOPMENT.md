# Development

## Local Preview
- Build: `bundle _2.4.19_ exec jekyll build`
- Serve on localhost: `bundle _2.4.19_ exec jekyll serve --host 127.0.0.1 --port 4000`
- Serve on LAN: `bundle _2.4.19_ exec jekyll serve --host 192.168.2.2 --port 4000`

## Tests
- Contact form tests: `npm test -- --runInBand`

## Notes
- The repository uses a small Jest suite only for JavaScript behavior checks.
- The generated site is written to `_site/`.
- `site.baseurl` must remain respected by templates and scripts.
