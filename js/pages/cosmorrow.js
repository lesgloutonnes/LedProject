(function () {
  var e = escapeHtml;
  var fmt = window.LgFmt;
  var host = document.getElementById("sku-table");
  if (host) {
    var rows = (window.LG_FIXTURES || [])
      .map(function (f) {
        return (
          "<tr id=\"" +
          e(f.id) +
          "\"><th scope=\"row\">" +
          e(f.sku) +
          "</th><td>" +
          e(f.name) +
          "</td><td>" +
          e(f.watts) +
          " W</td><td>" +
          e(f.lengthCm) +
          " cm</td><td>" +
          e(f.ppf) +
          "</td><td>" +
          e(fmt.n2(f.ppe)) +
          "</td><td>" +
          e(f.cct) +
          " K</td><td>" +
          e(f.footprint && f.footprint.w) +
          "×" +
          e(f.footprint && f.footprint.d) +
          " @ " +
          e(f.footprint && f.footprint.hCm) +
          " cm</td></tr>"
        );
      })
      .join("");
    host.innerHTML =
      '<div class="table-wrap" tabindex="0"><table><caption>Barres Cosmorrow — fiche COP 2023-09 / 2024-01</caption><thead><tr><th scope="col">SKU</th><th scope="col">Nom</th><th scope="col">W</th><th scope="col">L</th><th scope="col">PPF</th><th scope="col">PPE</th><th scope="col">CCT</th><th scope="col">Zone</th></tr></thead><tbody>' +
      rows +
      "</tbody></table></div>";
  }

  var cards = document.getElementById("fixture-cards");
  if (cards) {
    cards.innerHTML = (window.LG_FIXTURES || [])
      .map(function (f) {
        return (
          '<article class="card stack" id="fiche-' +
          e(f.id) +
          '"><p class="kicker">' +
          e(f.ip) +
          " · 24 V · " +
          e(f.diodes) +
          "</p><h3>" +
          e(f.name) +
          "</h3><p>" +
          e(f.spectrumNote) +
          "</p><p class=\"muted\">" +
          e(f.buyNote) +
          "</p><p><strong>" +
          e(f.priceHintEUR) +
          "</strong></p><p><a href=\"outils.html?sku=" +
          e(f.sku) +
          "&qty=1\">Simuler cette barre</a></p></article>"
        );
      })
      .join("");
  }

  var psus = document.getElementById("psu-list");
  if (psus) {
    psus.innerHTML = (window.LG_PSUS || [])
      .map(function (p) {
        return (
          '<article class="card" id="' +
          e(p.id) +
          '"><h3>' +
          e(p.sku) +
          " · " +
          e(p.name) +
          "</h3><p class=\"meta-row\"><span>" +
          e(p.ports) +
          " port(s) × " +
          e(p.portWatts) +
          " W</span><span>" +
          e(p.ip) +
          "</span></p><p>" +
          e(p.notes) +
          "</p></article>"
        );
      })
      .join("");
  }

  var kits = document.getElementById("kit-list");
  if (kits) {
    kits.innerHTML = (window.LG_KITS || [])
      .map(function (k) {
        var psusK = Array.isArray(k.psu) ? k.psu.join(" + ") : k.psu;
        return (
          '<article class="card stack" id="' +
          e(k.id) +
          '"><p class="kicker">' +
          e((k.tentId || "").replace("tent-", "").replace(/x/g, " × ")) +
          " · " +
          e((k.projectIds || []).join(" · ")) +
          "</p><h3>" +
          e(k.name) +
          "</h3><p>" +
          e(k.why) +
          "</p><p class=\"meta-row\"><span>" +
          e(k.totalWatts) +
          " W</span><span>" +
          e(k.totalPpf) +
          " µmol/s</span><span>" +
          e(k.hangCm) +
          " cm</span><span>" +
          e(k.hours) +
          " h</span><span class=\"badge is-warn\">" +
          e(fmt.euro0(k.estimatedEUR)) +
          "</span></p><p class=\"sku muted\">" +
          e(
            k.bars
              .map(function (b) {
                return b.qty + " × " + b.sku;
              })
              .join(" + ") +
              " + " +
              psusK
          ) +
          "</p><p><a href=\"outils.html?kit=" +
          e(k.id) +
          "\">Simuler ce kit</a> · <a href=\"assistant.html\">Lancer l’assistant</a></p></article>"
        );
      })
      .join("");
  }
})();
