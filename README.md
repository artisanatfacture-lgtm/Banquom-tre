# Comparateur de banques en ligne

Site statique avec rendu principal en HTML, CSS léger et JavaScript vanilla pour les interactions, publié gratuitement avec GitHub Pages. Le projet ne possède ni serveur, ni base de données, ni secret côté navigateur. Le dépôt est `artisanatfacture-lgtm/Banquom-tre` et l’URL publiée et vérifiée le 2026-10-01 est `https://artisanatfacture-lgtm.github.io/Banquom-tre/`.

Le nom public du site est **Banquomètre**. Les textes de comparaison restent factuels et peuvent mentionner les établissements comparés sans présenter le nom comme une promesse de résultat.

## Architecture

- `index.html` : page d’accueil et cartes de synthèse.
- `comparatif.html` : tableau et filtres de comparaison.
- `boursobank.html`, `fortuneo.html`, `hello-bank.html`, `bforbank.html` : fiches éditoriales individuelles.
- `css/style.css` : styles partagés.
- `js/banques.js` : source centrale des données comparées.
- `js/app.js` : rendu du comparatif et comportements simples de l’interface.
- `assets/` : éventuels médias locaux, optimisés avant ajout.
- `mentions-legales.html` : informations légales, confidentialité et affiliation à compléter.
- `robots.txt`, `sitemap.xml` : fichiers SEO configurés pour l’URL Pages réelle.
- `404.html` : page d’erreur éventuelle.

Les liens entre pages doivent rester relatifs (`comparatif.html`, `css/style.css`, etc.) afin de rester valides sous un sous-répertoire GitHub Pages. Ne pas introduire de routage SPA ni de chemin commençant par `/` pour une ressource du site.

## Modifier les données

Toutes les valeurs comparées doivent être modifiées dans `js/banques.js`. Chaque banque doit conserver un `slug` stable, une date `lastVerified` et les URL des sources officielles dans `sourceUrls`. Les résumés HTML « En bref » des quatre fiches reprennent quelques chiffres essentiels pour le SEO/GEO : lors d’un changement dans `js/banques.js`, les vérifier et les mettre à jour en même temps. Après toute modification :

1. consulter la page officielle et, si nécessaire, la brochure tarifaire ou les conditions contractuelles ;
2. remplacer la valeur uniquement si elle est confirmée ; utiliser `À vérifier` lorsqu’une information manque ;
3. mettre à jour `lastVerified` au format `AAAA-MM-JJ` ;
4. vérifier le rendu de l’accueil, du tableau et de la fiche concernée ;
5. contrôler que le texte éditorial ne contredit pas la donnée centrale.

Les tarifs, conditions, frais et offres promotionnelles changent régulièrement. La date affichée indique la date de vérification, pas une garantie de validité future. Les sources officielles sont prioritaires sur les comparateurs tiers. Ne jamais inventer de tarif, de note, d’avis ou de statistique.

## Aide par priorités et critères éditoriaux

L’aide au choix doit partir d’une des cinq priorités proposées : voyage, compte à deux, carte virtuelle, revenus ou usage rare. Chaque recommandation doit expliquer le critère utilisé, citer les données visibles dans `js/banques.js` et distinguer clairement un fait sourcé d’une appréciation éditoriale. Une priorité ne constitue pas un classement universel et ne justifie pas de promesse commerciale.

Les résumés « En bref » doivent répondre rapidement à la question du lecteur avec quelques chiffres essentiels, la date de vérification et la limite principale de l’offre. Lors d’une mise à jour, contrôler ensemble le résumé HTML de la fiche, l’entrée correspondante dans `js/banques.js`, le tableau comparatif et les sources officielles.

## Lien de parrainage

Les variables globales `window.BOURSOBANK_REFERRAL_URL` et `window.BOURSOBANK_IS_REFERRAL_LINK` se trouvent dans `js/banques.js`. La valeur actuelle est l’URL officielle de la page Ultim et `window.BOURSOBANK_IS_REFERRAL_LINK` vaut `false` : cette URL n’est pas un lien de parrainage. Lorsque l’éditeur fournira son véritable lien, remplacer `window.BOURSOBANK_REFERRAL_URL` et passer `window.BOURSOBANK_IS_REFERRAL_LINK` à `true`. Le code ajoutera alors l’attribut `rel="sponsored"` aux liens concernés. Ne pas placer de secret dans ce fichier.

Les boutons et le texte d’affiliation doivent rester transparents : certains liens peuvent donner lieu à une récompense pour l’éditeur si un compte est ouvert, sans surcoût pour le visiteur. Cette mention ne doit pas être supprimée.

## Ajouter une banque ou une fiche

Pour ajouter une banque, créer d’abord une entrée complète dans `js/banques.js` avec un `slug` unique, puis ajouter la fiche HTML correspondante en réutilisant la structure et les métadonnées existantes. Ajouter les liens depuis l’accueil, `comparatif.html` et les fiches pertinentes. Vérifier les données et les sources avant de mettre en avant un établissement.

Après l’ajout d’une page publique, mettre à jour `sitemap.xml` avec l’URL canonique réelle, puis vérifier les liens internes et la balise `canonical`. Les pages doivent conserver un titre, une description, un seul H1, des rubriques H2 cohérentes et une date de vérification visible. Le JSON-LD doit décrire uniquement un contenu réellement présent.

## SEO, accessibilité et performance

Utiliser des textes factuels et utiles, des tableaux lisibles, des liens descriptifs et des attributs `alt` pertinents lorsqu’une image existe. Conserver le contraste, le focus clavier et la lecture mobile. Préférer les polices système, les images WebP/AVIF légères et le JavaScript différé ou non bloquant. Ne pas ajouter de bibliothèque externe sans nécessité.

Avant une publication, rechercher les liens cassés, les chemins absolus accidentels, les titres dupliqués et les données sans source. Les mentions d’affiliation ne doivent pas être masquées par une formulation ambiguë. Aucun outil d’analyse ou cookie de suivi n’est installé par défaut.

## URL publique, robots et sitemap

Le dépôt est confirmé : `https://github.com/artisanatfacture-lgtm/Banquom-tre`. L’URL GitHub Pages publiée et vérifiée le 2026-10-01 est `https://artisanatfacture-lgtm.github.io/Banquom-tre/`. Les fichiers SEO utilisent cette URL :

- `robots.txt` autorise l’exploration et référence le sitemap à cette adresse ;
- `sitemap.xml` liste l’accueil, le comparatif, les quatre fiches et les mentions légales ;
- les balises `canonical`, Open Graph et le JSON-LD doivent utiliser cette URL, avec des chemins relatifs pour les ressources.

Lorsqu’une nouvelle page indexable est ajoutée, ajouter son URL complète dans `sitemap.xml` et vérifier sa balise `canonical`. Exclure `404.html` et toute page non destinée à l’indexation.

## Tester localement

Le site peut être ouvert directement dans un navigateur, mais un petit serveur local permet de tester les chemins relatifs comme GitHub Pages :

```text
python -m http.server 8000
```

Depuis la racine du dépôt, ouvrir `http://localhost:8000/`. Vérifier l’accueil, le comparatif, chaque fiche, le lien de mentions légales, les filtres, les boutons d’offre et l’absence d’erreurs dans la console. Tester une fenêtre étroite et la navigation au clavier. Cette commande sert uniquement au test ; aucun serveur n’est requis en production.

## Déploiement GitHub Pages

Le site est publié avec GitHub Pages depuis la branche `main`, dossier racine (`/(root)`), sans étape de build. Pour une maintenance du dépôt, conserver cette source de publication et vérifier après chaque changement `https://artisanatfacture-lgtm.github.io/Banquom-tre/`. Le dépôt ne doit contenir aucun token, mot de passe ou identifiant privé.

## Maintenance par intervention

À chaque intervention, noter les fichiers créés ou modifiés, les contrôles réalisés et les points qui nécessitent une vérification manuelle. Les prochaines améliorations SEO/GEO doivent partir de données sourcées : approfondir les comparaisons utiles, clarifier les profils concernés et actualiser les sources avant d’ajouter des pages.
