(function () {
  "use strict";

  const unknown = "À vérifier";
  const currentPage = document.body.dataset.page || "";

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  }

  function display(value) {
    if (typeof value === "boolean") return value ? "Oui" : "Non";
    return value || unknown;
  }

  function offerUrl(bank) {
    return bank.offerUrl || (bank.slug === "boursobank" ? window.BOURSOBANK_REFERRAL_URL : bank.slug + ".html#offre");
  }

  function cardTemplate(bank) {
    const featured = bank.featuredLabel ? '<p class="card-badge">' + escapeHtml(bank.featuredLabel) + "</p>" : "";
    return '<article class="bank-card' + (bank.slug === "boursobank" ? " bank-card-featured" : "") + '">' +
      featured +
      '<h3>' + escapeHtml(bank.name) + '</h3>' +
      '<p class="offer-name">Offre comparée : <strong>' + escapeHtml(display(bank.offer)) + "</strong></p>" +
      '<dl class="bank-facts">' +
      '<div><dt>Tarif mensuel</dt><dd>' + escapeHtml(display(bank.monthlyPrice)) + "</dd></div>" +
      '<div><dt>Gratuité</dt><dd>' + escapeHtml(display(bank.freeCondition)) + "</dd></div>" +
      '<div><dt>Revenus</dt><dd>' + escapeHtml(display(bank.incomeRequirement)) + "</dd></div>" +
      '<div><dt>Paiements à l’étranger</dt><dd>' + escapeHtml(display(bank.foreignPayments)) + "</dd></div>" +
      '<div><dt>Retraits à l’étranger</dt><dd>' + escapeHtml(display(bank.foreignWithdrawals)) + "</dd></div>" +
      '<div><dt>Carte virtuelle</dt><dd>' + escapeHtml(display(bank.virtualCard)) + "</dd></div>" +
      "</dl>" +
      '<h4>Avantage principal</h4><ul><li>' + escapeHtml((bank.highlights || [unknown])[0]) + "</li></ul>" +
      '<h4>Point d’attention</h4><ul class="bank-limits"><li>' + escapeHtml((bank.limitations || [unknown])[0]) + "</li></ul>" +
      '<p class="card-actions"><a class="button button-secondary" href="' + escapeHtml(bank.slug + ".html") + '">Voir la fiche <span class="sr-only">' + escapeHtml(bank.name) + "</span></a>" +
      '<a class="button" href="' + escapeHtml(offerUrl(bank)) + '"' + (bank.slug === "boursobank" && window.BOURSOBANK_IS_REFERRAL_LINK ? ' rel="sponsored"' : "") + '>Voir l’offre <span class="sr-only">' + escapeHtml(bank.name) + "</span></a></p>" +
      "</article>";
  }

  function renderCards() {
    const container = document.getElementById("bank-cards");
    if (container) container.innerHTML = window.banques.map(cardTemplate).join("");
  }

  const tableColumns = [
    ["name", "Banque"], ["offer", "Carte / offre"], ["monthlyPrice", "Tarif"],
    ["incomeRequirement", "Condition de revenus"], ["foreignPayments", "Paiements à l’étranger"],
    ["foreignWithdrawals", "Retraits à l’étranger"], ["virtualCard", "Carte virtuelle"],
    ["jointAccount", "Compte joint"], ["minDeposit", "Dépôt minimum"],
    ["welcomeOffer", "Offre de bienvenue"], ["lastVerified", "Dernière vérification"]
  ];

  function renderTable(items) {
    const container = document.getElementById("comparison-table");
    if (!container) return;
    if (!items.length) {
      container.innerHTML = '<p class="empty-state">Aucune offre ne correspond à ces critères dans cette sélection.</p>';
      return;
    }
    const header = tableColumns.map(function (column) { return "<th scope=\"col\">" + column[1] + "</th>"; }).join("");
    const rows = items.map(function (bank) {
      return "<tr>" + tableColumns.map(function (column, index) {
        const tag = index === 0 ? "th scope=\"row\"" : "td";
        const content = index === 0 ? '<a href="' + bank.slug + '.html">' + escapeHtml(bank.name) + "</a>" : escapeHtml(display(bank[column[0]]));
        return "<" + tag + ">" + content + "</" + tag.split(" ")[0] + ">";
      }).join("") + "</tr>";
    }).join("");
    container.innerHTML = '<table><caption class="sr-only">Comparatif des quatre offres bancaires</caption><thead><tr>' + header + "</tr></thead><tbody>" + rows + "</tbody></table>";
  }

  function isFree(bank) { return /^(0 ?€|gratuite?|gratuit)/i.test(String(bank.monthlyPrice)); }
  function noIncome(bank) { return /^(aucune|sans)/i.test(String(bank.incomeRequirement)); }
  function hasJoint(bank) { return bank.jointAccount === true || /^oui\b/i.test(String(bank.jointAccount)); }
  function matchesFilter(bank, filter) {
    if (filter === "free") return isFree(bank);
    if (filter === "no-income") return noIncome(bank);
    if (filter === "travel") return bank.travel === true;
    if (filter === "premium") return bank.premium === true;
    if (filter === "joint") return hasJoint(bank);
    return true;
  }

  function initialiseFilters() {
    const form = document.getElementById("comparison-filters");
    if (!form) return;
    form.addEventListener("change", function () {
      const enabled = Array.from(form.querySelectorAll("input:checked")).map(function (input) { return input.value; });
      const items = window.banques.filter(function (bank) { return enabled.every(function (filter) { return matchesFilter(bank, filter); }); });
      renderTable(items);
      const status = document.getElementById("filter-status");
      if (status) {
        status.textContent = !items.length && enabled.includes("premium")
          ? "Aucune offre premium dans cette sélection."
          : items.length + " banque" + (items.length > 1 ? "s" : "") + " affichée" + (items.length > 1 ? "s" : "") + ".";
      }
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
    const facts = document.getElementById("bank-facts");
    if (facts) {
      facts.innerHTML = [
        ["Offre comparée", bank.offer], ["Tarif mensuel", bank.monthlyPrice],
        ["Condition de gratuité", bank.freeCondition], ["Condition de revenus", bank.incomeRequirement],
        ["Paiements à l’étranger", bank.foreignPayments], ["Retraits à l’étranger", bank.foreignWithdrawals],
        ["Carte virtuelle", bank.virtualCard], ["Compte joint", bank.jointAccount],
        ["Dépôt minimum", bank.minDeposit], ["Dernière vérification", bank.lastVerified]
      ].map(function (fact) { return "<div><dt>" + escapeHtml(fact[0]) + "</dt><dd>" + escapeHtml(display(fact[1])) + "</dd></div>"; }).join("");
    }
    const sources = document.getElementById("bank-sources");
    if (sources && bank.sourceUrls && bank.sourceUrls.length) {
      sources.innerHTML = bank.sourceUrls.map(function (source) { return '<li><a href="' + escapeHtml(source.url) + '" rel="nofollow noopener" target="_blank">' + escapeHtml(source.label) + "</a></li>"; }).join("");
    }
    const offer = document.getElementById("bank-offer-link");
    if (offer) {
      offer.href = offerUrl(bank);
      if (bank.slug === "boursobank" && window.BOURSOBANK_IS_REFERRAL_LINK) offer.rel = "sponsored";
      else offer.removeAttribute("rel");
    }
  }

  renderCards();
  renderTable(window.banques);
  initialiseFilters();
  markActiveNavigation();
  renderBankPage();
}());
