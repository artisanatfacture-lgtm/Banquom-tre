# Règles de maintenance

1. Vérifier les données avant toute modification.
2. Privilégier les sources officielles de chaque banque, notamment les brochures tarifaires et conditions en vigueur.
3. Mettre à jour la date de vérification après chaque changement de donnée.
4. Ne jamais inventer de tarif, de condition, de note, d’avis ou de statistique ; afficher `À vérifier` si nécessaire.
5. Ne jamais supprimer les mentions de transparence sur l’affiliation ou le parrainage.
6. Conserver la compatibilité avec un site statique GitHub Pages publié sous un sous-répertoire.
7. Préserver les URLs existantes et ajouter une redirection ou une page de remplacement avant tout changement nécessaire.
8. Vérifier les liens internes, les chemins relatifs et les ressources après chaque ajout.
9. Mettre à jour `sitemap.xml` lorsqu’une page indexable est ajoutée, uniquement après confirmation de l’URL publique.
10. Optimiser le SEO et le GEO avec un contenu utile, sourcé et lisible, sans produire de contenu spam.

## Consignes complémentaires

- Centraliser les données bancaires dans `js/banques.js` et conserver `BOURSOBANK_REFERRAL_URL` clairement identifiable.
- Ne pas ajouter de backend, de framework obligatoire, de cookie de suivi ou de secret côté client.
- Maintenir dans `robots.txt` le sitemap `https://artisanatfacture-lgtm.github.io/Banquom-tre/sitemap.xml` et dans `sitemap.xml` les URL publiques réellement publiées.
- Toute nouvelle fiche doit avoir un titre unique, une description unique, un seul H1, une date de vérification et ses sources officielles.
- Tester les pages sur desktop, mobile, au clavier et depuis un serveur local avant livraison.
