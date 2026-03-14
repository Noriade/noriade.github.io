# AGENTS

## Purpose
This repository contains the Noriade marketing website built with Jekyll.

## Stack
- Jekyll `4.4.x`
- Ruby via Bundler
- Small Node/Jest test suite for contact form behavior

## Working Rules
- Prefer small, reviewable changes.
- Keep paths compatible with `baseurl`.
- Do not change an existing public URL without recording the old path and adding a redirect plan.
- Preserve bilingual content consistency when editing FR and EN pages.
- Use `bundle _2.4.19_ exec jekyll build` to validate site rendering.
- Use `npm test -- --runInBand` to validate contact form behavior.

## Important Files
- `_config.yml`: site settings, navigation, translations
- `_includes/`: shared partials
- `_pages/`: standalone pages
- `_posts/`: blog posts
- `_services/`: service detail pages
- `mail/contact_me.php`: legacy contact backend kept only for non-static deployments

## Current Priorities
- Keep content current and remove obsolete external links.
- Improve contact flow without breaking static hosting compatibility.
- Maintain lightweight project documentation in `BACKLOG.md` and `TODO.md`.
- Preserve SEO equity by tracking URL history in `REDIRECTS.md`.
