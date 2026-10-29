# Redirects

## Policy
- Existing public URLs must remain stable whenever possible.
- If a permalink changes, record the old URL here before merging the change.
- Every retired URL should have an explicit redirect target and status.
- Prefer permanent redirects (`301`) for replaced content.

## Procédure obligatoire avant toute modification de permalink

Cette procédure s'applique à toute création, renommage, suppression ou modification de l'URL publique d'une page. Le contributeur qui modifie le permalink prépare la proposition et les tests ; le reviewer vérifie les correspondances et le déploiement ; la personne qui publie effectue le contrôle HTTP après mise en ligne.

### 1. Inventorier et figer la correspondance

1. Identifier l'URL source exacte qui cesse d'être publiée, avec son chemin complet et ses éventuels paramètres pertinents.
2. Identifier l'URL cible exacte, existante ou créée par le même changement, et vérifier qu'elle correspond au même contenu ou à son remplacement approuvé.
3. Ne jamais ajouter une redirection dont l'URL source ou l'URL cible est absente, vide, ambiguë ou seulement décrite par un commentaire. Une source et une cible doivent être écrites explicitement ; une redirection vers elle-même est interdite.
4. Vérifier les variantes française et anglaise, les liens internes, la canonical URL et le sitemap afin de ne pas créer de chaîne ou de boucle de redirections.

### 2. Mettre à jour `REDIRECTS.md` avant le code

Avant de modifier le front matter, le nom de fichier ou tout autre permalink :

1. Ajouter dans le journal une entrée datée indiquant chaque paire `source -> cible`, le code attendu (`301` pour un déplacement permanent, ou `302` uniquement pour un déplacement temporaire justifié), le mécanisme utilisé et la référence de suivi (issue, PR ou ticket).
2. Pour une URL retirée sans remplacement pertinent, documenter explicitement la décision de laisser répondre `404` ou `410` et sa justification ; ne pas fabriquer une cible uniquement pour éviter une erreur.
3. Refaire relire la liste source/cible. Le reviewer confirme que chaque source est l'ancienne URL publique exacte et que chaque cible est accessible, pertinente et distincte.

### 3. Choisir et configurer le mécanisme

Utiliser uniquement un mécanisme réellement pris en charge par l'hébergement de la publication (configuration de plateforme, règle du serveur ou fichier de redirections consommé par le déploiement). Ne pas supposer qu'un fichier documentaire ou `redirects.json` est automatiquement exécuté : vérifier le workflow et la documentation de l'hébergeur avant de le modifier. La règle déployée doit contenir la source, la cible et le statut explicitement ; les correspondances absentes de `REDIRECTS.md` ne doivent pas être ajoutées.

### 4. Tester avant publication

1. Construire le site avec `bundle _2.4.19_ exec jekyll build` et vérifier que le permalink cible est généré.
2. Si le mécanisme peut être servi localement, démarrer le serveur de prévisualisation puis tester chaque source avec, par exemple :
   `curl -sS -D - -o /dev/null http://127.0.0.1:4000/ancienne-url/`
   Vérifier le code attendu et l'en-tête `Location` exact ; ne pas suivre la redirection à cette étape.
3. En préproduction, répéter le test sur l'URL HTTPS publique de prévisualisation. Avec `curl -sS -L -D - -o /dev/null`, vérifier que la destination finale répond `200`, qu'il n'y a pas de boucle ni de chaîne inattendue et que l'URL finale est la cible documentée.
4. Tester au moins une URL voisine non concernée pour confirmer qu'elle n'est pas redirigée par erreur. Conserver les commandes, les codes HTTP, les en-têtes `Location` et la date du test dans la PR ou le ticket.

### 5. Publier et contrôler la production

Après approbation, déployer le changement selon le workflow du dépôt. Une fois la publication terminée, tester chaque ancienne URL avec `curl -sS -D - -o /dev/null https://noriade.com/ancienne-url/`, puis suivre la cible avec `curl -sS -L -D - -o /dev/null https://noriade.com/ancienne-url/`. Confirmer le code de redirection attendu, la cible finale, l'absence de boucle et un `200` sur la page cible. Reporter immédiatement tout écart, corriger la configuration et ajouter le résultat au suivi avant de clôturer la tâche.

### 6. Éléments à conserver dans le suivi

Conserver dans la PR ou le ticket : la raison du changement, les URL source et cible complètes, le statut HTTP attendu, le mécanisme et le fichier/configuration modifié, le nom du reviewer, les commandes de test avec leurs résultats, l'environnement (local, préproduction ou production), la date de publication et le contrôle HTTP post-publication. Une modification de permalink n'est terminée que lorsque `REDIRECTS.md`, la configuration déployée et ces preuves concordent.

## Current Public URLs To Preserve

### Core Pages
- `/`
- `/en/`
- `/services/`
- `/en/services/`
- `/contact/`
- `/en/contact/`
- `/blog/`
- `/en/blog/`
- `/mentions-legales/`
- `/en/terms-and-conditions/`

### Services
- `/services/conseil-audit/`
- `/services/hebergement-web/`
- `/services/infogerance/`
- `/services/web-marketing/`
- `/en/services/audit-it-consulting/`
- `/en/services/web-hosting/`
- `/en/services/outsourcing/`
- `/en/services/web-marketing/`

### References
- `/references/youscribe/`
- `/references/le-bonbon/`
- `/references/orange-applications-for-business/`
- `/references/wynd/`

### Blog URL Pattern
- `/blog/:year-:month-:day-:title/`

## Change Log
- `2026-09-04`: cleaned the current static publication: canonical/hreflang links now use the apex domain, homepage contact navigation points to the dedicated contact page, Google Fonts use HTTPS, the remaining visible French metadata typo was corrected, and obsolete legal identity was removed from `humans.txt` and `llms.txt`. `sitemap.xml` lastmod values were refreshed to the last sitewide publication date. No public URL was changed.
- `2026-08-24`: corrected stale English internal links (`/en/hosting/mail/` ->
  `/en/hosting/mails/` and `/en/services/consulting/` ->
  `/en/services/audit-it-consulting/`). These were link fixes only; no public
  URL was changed and no new redirect was required. Updated `sitemap.xml`
  `lastmod` values for the cleaned public pages.
- `2026-08-24`: retired `/partenaires/` and `/en/partners/` (no 301 —
  no valid replacement target). Zero remaining SEO/link-exchange value:
  the two "Référencement" directory links had been repurposed for spam
  (offshore hosting link farm, hijacked domain serving a default admin
  template) and the six "Boutiques" links were unrelated e-commerce
  (jewelry, phone cases, sneakers). Pages deleted, footer links removed
  sitewide, entries removed from `sitemap.xml`. 404 accepted per policy
  exception: Google treats 404 and 410 near-identically for
  deindexing, and there is no legitimate content to redirect to.
- `2026-03-14`: restored legacy blog posts from production into `_posts` for:
  - `/blog/2019-01-24-nouveau-site-lebonbon/`
  - `/en/blog/2019-01-24-new-website-lebonbon/`
  - `/blog/2019-04-25-creation-site-samathi-lake/`
  - `/en/blog/2019-04-25-new-customer-samathi-lake/`
  - `/blog/2019-06-06-offres-office365/`
  - `/en/blog/2019-06-06-office365-offers/`
- `2026-03-14`: added maintained redirects for legacy aliases:
  - `/blog/2015-03-12-website-opening/` -> `/en/blog/2015-03-12-website-opening/`
  - `/blog/2015-03-18-piwik-installation/` -> `/en/blog/2015-03-18-piwik-installation/`
  - `/blog/2019-01-24-new-website-lebonbon/` -> `/en/blog/2019-01-24-new-website-lebonbon/`
  - `/blog/2019-04-25-new-customer-samathi-lake/` -> `/en/blog/2019-04-25-new-customer-samathi-lake/`
  - `/services/marketing-web/` -> `/services/web-marketing/`
  - `/en/services/it-consulting/` -> `/en/services/audit-it-consulting/`
  - `/fr/services/hebergement-web/` -> `/services/hebergement-web/`
  - `/en/legal-disclaimer/` -> `/en/terms-and-conditions/`
  - `/sitemap/` -> `/sitemap.xml`
  - `/en/sitemap/` -> `/sitemap.xml`
