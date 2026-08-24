# TODO

## Next
- Verify the local preview on `http://192.168.2.2:4000/` across FR and EN pages.
- Verify that the email-only contact links open the configured mail client on FR and EN pages.

## Short Term
- Keep `REDIRECTS.md` updated before any permalink change.

## Audit de cohérence — 2026-08-18
- Le checkout contient actuellement l’export HTML statique du site legacy ; les
  sources Jekyll (`_config.yml`, `Gemfile`, `_pages/`, `_posts/`) ne sont pas
  présents dans ce dépôt.
- La production `https://noriade.com/` sert encore ce legacy depuis GitHub
  Pages. Les tâches Vikunja #19, #20, #28, #29, #30 et #31 restent ouvertes
  jusqu’à la bascule ou à une correction publiée.
- Les anciens scripts de contact ne sont plus chargés par les pages publiées ; ils
  restent conservés uniquement pour compatibilité legacy et couverts par
  `test/contact_form.test.js` ; `npm test -- --runInBand` passe.
