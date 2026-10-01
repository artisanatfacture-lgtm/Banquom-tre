(function () {
  "use strict";

  const currentPage = document.body.dataset.page || "";

  function offerUrl(bank) {
    return bank.offerUrl || (bank.slug === "boursobank" ? window.BOURSOBANK_REFERRAL_URL : bank.slug + ".html#offre");
  }

  function isFree(bank) { return /^(0 ?€|gratuite?|gratuit)/i.test(String(bank.monthlyPrice)); }
  function noIncome(bank) { return /^(aucune|sans)/i.test(String(bank.incomeRequirement)); }
  function hasJoint(bank) { return bank.jointAccount === true || /^oui\b/i.test(String(bank.jointAccount)); }
  function hasVirtualCard(bank) { return bank.virtualCard === true; }
  function matchesFilter(bank, filter) {
    if (filter === "free") return isFree(bank);
    if (filter === "no-income") return noIncome(bank);
    if (filter === "travel") return bank.travel === true;
    if (filter === "virtual") return hasVirtualCard(bank);
    if (filter === "joint") return hasJoint(bank);
    return true;
  }

  function initialiseFilters() {
    const form = document.getElementById("comparison-filters");
    const reset = document.getElementById("reset-filters");
    const status = document.getElementById("filter-status");
    const rows = Array.from(document.querySelectorAll("#comparison-table tbody tr[data-bank-slug]"));
    if (!form || !rows.length) return;

    function updateResults() {
      const enabled = Array.from(form.querySelectorAll("input:checked")).map(function (input) { return input.value; });
      let count = 0;
      rows.forEach(function (row) {
        const bank = window.banques.find(function (item) { return item.slug === row.dataset.bankSlug; });
        const visible = bank && enabled.every(function (filter) { return matchesFilter(bank, filter); });
        row.hidden = !visible;
        if (visible) count += 1;
      });
      if (status) status.textContent = count ? count + " offre" + (count > 1 ? "s" : "") + " affichée" + (count > 1 ? "s" : "") + "." : "Aucune offre ne correspond à ces critères.";
      if (reset) reset.hidden = enabled.length === 0;
    }

    form.addEventListener("change", updateResults);
    if (reset) reset.addEventListener("click", function () {
      form.querySelectorAll("input:checked").forEach(function (input) { input.checked = false; });
      updateResults();
    });
  }

  const priorityAnswers = {
    travel: {
      label: "Repère voyage",
      title: "Comparez Fortuneo Fosfo et BoursoBank Ultim",
      text: "Fosfo annonce des paiements et retraits en devises gratuits, hors frais éventuels de tiers ou de change. Ultim annonce des paiements gratuits et illimités, mais ses retraits gratuits sont limités à trois par mois.",
      limit: "Avant le départ, vérifiez toujours les frais du distributeur local et les règles de change.",
      links: '<a class="text-link" href="fortuneo.html">Fiche Fortuneo</a> <a class="text-link" href="boursobank.html">Fiche BoursoBank</a>'
    },
    joint: {
      label: "Repère compte joint",
      title: "Fortuneo et Hello One Duo sont les deux pistes documentées",
      text: "Fortuneo indique un compte joint et Hello bank! propose Hello One Duo. BoursoBank peut être envisagée, mais les détails de son compte joint restent à vérifier dans cette comparaison.",
      limit: "Regardez aussi les cartes, les titulaires autorisés et les conditions d’ouverture du compte joint.",
      links: '<a class="text-link" href="fortuneo.html">Fiche Fortuneo</a> <a class="text-link" href="hello-bank.html">Fiche Hello bank!</a>'
    },
    virtual: {
      label: "Repère carte virtuelle",
      title: "Regardez Ultim, Fosfo ou BforBASIC",
      text: "Une carte virtuelle est indiquée pour BoursoBank Ultim, Fortuneo Fosfo et BforBank BforBASIC. Hello One ne l’inclut pas selon la FAQ officielle consultée.",
      limit: "La disponibilité et les usages possibles d’une carte virtuelle peuvent dépendre de l’application et de l’offre souscrite.",
      links: '<a class="text-link" href="boursobank.html">Fiche BoursoBank</a> <a class="text-link" href="fortuneo.html">Fiche Fortuneo</a> <a class="text-link" href="bforbank.html">Fiche BforBank</a>'
    },
    income: {
      label: "Repère revenus",
      title: "Ce critère ne départage pas les quatre offres comparées",
      text: "Les quatre offres indiquent une accessibilité sans condition de revenus ; pour BoursoBank Ultim, cette indication concerne le débit immédiat. Passez au critère qui affectera réellement votre usage : voyage, carte virtuelle ou activité mensuelle.",
      limit: "L’absence de condition de revenus ne garantit pas l’acceptation du dossier ni toutes les options de carte.",
      links: '<a class="text-link" href="comparatif.html">Comparer les autres critères</a>'
    },
    rare: {
      label: "Repère usage rare",
      title: "Aucune des quatre offres ne dispense d’une condition d’activité",
      text: "Pour une carte peu utilisée, regardez le coût après inactivité : 9 € chez Ultim, 3 € chez Fosfo, 6 € chez Hello One et 2 € chez BforBASIC. Ultim et Fosfo demandent un paiement mensuel ; Hello One et BforBASIC acceptent un paiement ou un retrait.",
      limit: "Le moins cher en cas d’inactivité n’est pas nécessairement le plus adapté aux autres usages.",
      links: '<a class="text-link" href="comparatif.html">Comparer les conditions d’activité</a>'
    }
  };

  function initialisePriorityTool() {
    const buttons = Array.from(document.querySelectorAll("[data-priority]"));
    const answer = document.getElementById("priority-answer");
    const status = document.getElementById("priority-status");
    if (!buttons.length || !answer) return;
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const response = priorityAnswers[button.dataset.priority];
        if (!response) return;
        buttons.forEach(function (item) { item.setAttribute("aria-pressed", String(item === button)); });
        if (status) status.textContent = response.label + " sélectionné.";
        answer.innerHTML = '<p class="answer-label">' + response.label + "</p><h3>" + response.title + "</h3><p>" + response.text + "</p><p class=\"answer-limit\"><strong>À garder en tête :</strong> " + response.limit + "</p><p class=\"answer-links\">" + response.links + "</p>";
      });
    });
  }

  function initialiseOfferLinks() {
    document.querySelectorAll("[data-offer-link]").forEach(function (link) {
      const bank = window.banques.find(function (item) { return item.slug === link.dataset.offerLink; });
      if (!bank) return;
      link.href = offerUrl(bank);
      if (bank.slug === "boursobank" && window.BOURSOBANK_IS_REFERRAL_LINK) link.rel = "sponsored";
    });
  }

  function markActiveNavigation() {
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === currentPage) link.setAttribute("aria-current", "page");
    });
  }

  function renderBankPage() {
    const slug = document.body.dataset.bankSlug;
    if (!slug) return;
    const bank = window.banques.find(function (item) { return item.slug === slug; });
    if (!bank) return;
    const offer = document.getElementById("bank-offer-link");
    if (offer) {
      offer.href = offerUrl(bank);
      if (bank.slug === "boursobank" && window.BOURSOBANK_IS_REFERRAL_LINK) offer.rel = "sponsored";
      else offer.removeAttribute("rel");
    }
  }

  document.documentElement.classList.add("js");
  initialiseFilters();
  initialisePriorityTool();
  initialiseOfferLinks();
  markActiveNavigation();
  renderBankPage();
}());
