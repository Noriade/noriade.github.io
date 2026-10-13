# TODO

## Next
- Verify the local preview on `http://192.168.2.2:4000/` across FR and EN pages.
- Verify that the email-only contact links open the configured mail client on FR and EN pages.

## Short Term
- Keep `REDIRECTS.md` updated before any permalink change.

## Audit de cohérence — 2026-10-13
- Le dépôt courant est un export statique legacy : aucun `Gemfile`, aucune source Jekyll et aucun binaire `bundle` ne sont disponibles ; `bundle _2.4.19_ exec jekyll build` n'a donc pas pu être exécuté.
- `npm test -- --runInBand` passe 5/5.
- Les commits `727dfe8`, `14d16af`, `1c062b6`, `5f3913f` et `714254b` ajoutent Matomo (site ID 5) dans `js/analytics-consent.js`, derrière le consentement, avec invalidation du cache sur les 60 pages HTML. La collecte réelle reste à vérifier en production.
- Le SEO reste partiel dans cet export : 60 fichiers HTML, 49 descriptions et 36 valeurs uniques ; plusieurs pages historiques ont encore des métadonnées dupliquées et des hreflang génériques. Les tâches Vikunja #18, #19 et #590 restent ouvertes.
- Les contrôles `curl` vers `https://noriade.com/` et ses routes publiques ont été bloqués par la résolution DNS (HTTP 000) ; aucune conclusion de production n'est tirée de cet échec.

## Audit de cohérence — 2026-09-04
- Nettoyage publié : métadonnées canoniques/hreflang alignées sur le domaine apex, contact homepage aligné sur `/contact/`, Google Fonts passées en HTTPS, faute de grammaire des métadonnées corrigée, et ancienne identité légale retirée de `humans.txt`/`llms.txt`.
- `sitemap.xml` contient 28 URLs publiques, toutes vérifiées en HTTP `200`, avec `lastmod` cohérent avec la dernière publication sitewide du 2026-08-31.
- `/partenaires/` et `/en/partners/` restent retirées et répondent `404` ; aucune redirection artificielle n'a été ajoutée.
- Les contrôles locaux passent : Jest 4/4, `npm audit` sans vulnérabilité, parse HTML sans lien vide. Le lint PHP reste non disponible dans cet environnement.

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
