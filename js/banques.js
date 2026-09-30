/*
 * Données éditoriales centralisées.
 * Toute valeur qui n'a pas été confirmée dans une source officielle reste
 * volontairement indiquée « À vérifier ». Mettre à jour lastVerified et
 * sourceUrls en même temps que les données.
 */
// Remplacer cette URL officielle par le lien de parrainage personnel avant publication.
window.BOURSOBANK_REFERRAL_URL = "https://www.boursobank.com/banque/carte-bancaire-gratuite-ultim";
window.BOURSOBANK_IS_REFERRAL_LINK = false;

window.banques = [
  {
    slug: "boursobank",
    name: "BoursoBank",
    offer: "Ultim",
    monthlyPrice: "0 €",
    freeCondition: "1 paiement par mois ; sinon 9 €/mois",
    incomeRequirement: "Aucune en débit immédiat",
    foreignPayments: "Gratuits et illimités en devises",
    foreignWithdrawals: "3 retraits en devises/mois, puis 1,69 %",
    virtualCard: true,
    jointAccount: "Possible (détails à vérifier)",
    minDeposit: "À vérifier",
    welcomeOffer: "À vérifier",
    travel: true,
    premium: false,
    lastVerified: "2026-09-30",
    featuredLabel: "Offre à considérer",
    highlights: ["Paiements en devises gratuits et illimités"],
    limitations: ["Une opération mensuelle est requise pour éviter le tarif d'inactivité"],
    offerUrl: window.BOURSOBANK_REFERRAL_URL,
    sourceUrls: [
      { label: "Page officielle Ultim", url: "https://www.boursobank.com/banque/carte-bancaire-gratuite-ultim" },
      { label: "Brochure tarifaire BoursoBank (PDF)", url: "https://www.boursobank.com/content/brochure_tarifaire/boursorama_bt.pdf" }
    ]
  },
  {
    slug: "fortuneo",
    name: "Fortuneo",
    offer: "Fosfo",
    monthlyPrice: "0 €",
    freeCondition: "1 paiement par mois ; sinon 3 €/mois",
    incomeRequirement: "Aucune",
    foreignPayments: "Gratuits, hors frais éventuels du réseau ou de change",
    foreignWithdrawals: "Gratuits, hors frais éventuels du distributeur ou de change",
    virtualCard: true,
    jointAccount: true,
    minDeposit: "0 € via l’application ; 50 € via le site",
    welcomeOffer: "À vérifier",
    travel: true,
    premium: false,
    lastVerified: "2026-09-30",
    featuredLabel: "",
    highlights: ["Paiements et retraits en devises annoncés gratuits, sous réserves indiquées"],
    limitations: ["Une opération mensuelle est requise pour éviter le tarif d'inactivité"],
    offerUrl: "https://www.fortuneo.fr/compte-bancaire/decouvrir-fosfo",
    sourceUrls: [
      { label: "Page officielle Fosfo", url: "https://www.fortuneo.fr/compte-bancaire/decouvrir-fosfo" },
      { label: "Conditions d’octroi des cartes", url: "https://www.fortuneo.fr/compte-bancaire/conditions-octroi-carte-bancaire" },
      { label: "Conditions tarifaires Fortuneo (PDF)", url: "https://www.fortuneo.fr/files/fortuneo-tarifs-09022026.pdf" }
    ]
  },
  {
    slug: "hello-bank",
    name: "Hello bank!",
    offer: "Hello One",
    monthlyPrice: "0 €",
    freeCondition: "1 paiement ou retrait par mois ; sinon 6 €/mois",
    incomeRequirement: "Aucune",
    foreignPayments: "Sans frais de la banque, hors change et tiers",
    foreignWithdrawals: "Gratuits dans les réseaux indiqués ; hors réseau, frais variables",
    virtualCard: false,
    jointAccount: "Oui, avec Hello One Duo",
    minDeposit: "0 € en signature biométrique ; sinon 10 à 300 €",
    welcomeOffer: "À vérifier",
    travel: false,
    premium: false,
    lastVerified: "2026-09-30",
    featuredLabel: "",
    highlights: ["Aucune condition de revenus annoncée"],
    limitations: ["Les tarifs Hello bank! changent le 1er octobre 2026 : à recontrôler"],
    offerUrl: "https://www.hellobank.fr/fr/offre/compte-et-cartes/hello-one/",
    sourceUrls: [
      { label: "Page officielle Hello One", url: "https://www.hellobank.fr/fr/offre/compte-et-cartes/hello-one/" },
      { label: "Tarifs Hello bank! (PDF)", url: "https://www.hellobank.fr/content/dam/hellobank/rsc/contrib/document/pdf/tarifs-hellobank.pdf" },
      { label: "FAQ carte virtuelle Hello One", url: "https://www.hellobank.fr/faq/puis-je-obtenir-une-carte-virtuelle-avec-l-offre-hello-one" }
    ]
  },
  {
    slug: "bforbank",
    name: "BforBank",
    offer: "BforBASIC",
    monthlyPrice: "0 €",
    freeCondition: "1 paiement ou retrait par mois ; sinon 2 €/mois",
    incomeRequirement: "Aucune",
    foreignPayments: "1,95 % hors zone euro",
    foreignWithdrawals: "1,95 % hors zone euro",
    virtualCard: true,
    jointAccount: "À vérifier",
    minDeposit: "Aucun",
    welcomeOffer: "À vérifier",
    travel: false,
    premium: false,
    lastVerified: "2026-09-30",
    featuredLabel: "",
    highlights: ["Aucune condition de revenus annoncée"],
    limitations: ["Des frais s’appliquent aux opérations hors zone euro"],
    offerUrl: "https://www.bforbank.com/compte-bancaire/carte-bancaire-bforbasic",
    sourceUrls: [
      { label: "Page officielle BforBASIC", url: "https://www.bforbank.com/compte-bancaire/carte-bancaire-bforbasic" },
      { label: "Conditions tarifaires BforBank (PDF)", url: "https://bforbank.cdn.prismic.io/bforbank/5SgOkvNFaCOgDUsi_Conditions_tarifaires_BforBank_avantle27.10.pdf" },
      { label: "Ouverture de compte BforBank", url: "https://www.bforbank.com/compte-bancaire/ouvrir-compte-bancaire-en-ligne" }
    ]
  }
];
