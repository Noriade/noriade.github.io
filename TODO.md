# TODO

## Next
- Verify the local preview on `http://192.168.2.2:4000/` across FR and EN pages.
- Verify that the email-only contact links open the configured mail client on FR and EN pages.
- Review social profiles still exposed publicly and remove any no longer maintained.

## Short Term
- Clean old partner links that do not match the current company image.
- Remove obsolete contact-form references from the remaining project notes.
- Keep `REDIRECTS.md` updated before any permalink change.

## Audit de cohérence — 2026-08-18
- Le checkout contient actuellement l’export HTML statique du site legacy ; les
  sources Jekyll (`_config.yml`, `Gemfile`, `_pages/`, `_posts/`) ne sont pas
  présents dans ce dépôt.
- La production `https://noriade.com/` sert encore ce legacy depuis GitHub
  Pages. Les tâches Vikunja #19, #20, #28, #29, #30 et #31 restent ouvertes
  jusqu’à la bascule ou à une correction publiée.
- La couverture de `js/contact_me_static.js` existe désormais dans
  `test/contact_form.test.js` ; `npm test -- --runInBand` passe.
