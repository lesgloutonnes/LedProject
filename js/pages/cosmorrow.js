(function () {
  var e = escapeHtml;
  var fmt = window.LgFmt;
  var host = document.getElementById("sku-table");

  function channelColor(ch) {
    if (ch.id === "r660" || (ch.peakNm && ch.peakNm === 660)) return "#c23b4a";
    if (ch.cctK >= 6000) return "#d7e7ff";
    if (ch.cctK >= 4500) return "#f3ead2";
    if (ch.cctK >= 3500) return "#f0d7a0";
    return "#e8b56a";
  }

  function spectrumBar(f) {
    var channels = f.spectrum && f.spectrum.channels;
    if (!channels || !channels.length) return "";
    var segs = channels
      .map(function (ch) {
        var pct = Math.max(0, Math.min(100, Number(ch.pct) || 0));
        return (
          '<span style="width:' +
          pct +
          "%;background:" +
          channelColor(ch) +
          '" title="' +
          e(ch.label) +
          " · " +
          e(String(pct)) +
          '%"></span>'
        );
      })
      .join("");
    return '<div class="spectrum-bar" role="img" aria-label="' + e(f.spectrum.label) + '">' + segs + "</div>";
  }

  function ppfCell(f) {
    return fmt.ppfOf(f);
  }

  if (host) {
    var rows = (window.LG_FIXTURES || [])
      .map(function (f) {
        var zone =
          (f.footprint && f.footprint.w) +
          "×" +
          (f.footprint && f.footprint.d) +
          " @ " +
          (f.footprint && f.footprint.hCm) +
          " cm";
        return (
          '<tr id="' +
          e(f.id) +
          '"><th scope="row">' +
          e(f.sku) +
          "</th><td>" +
          e(f.name) +
          "</td><td>" +
          e(f.watts) +
          " W</td><td>" +
          e(f.lengthCm) +
          " cm</td><td>" +
          e(ppfCell(f)) +
          "</td><td>" +
          e(fmt.ppeOf(f)) +
          "</td><td>" +
          e(f.ppfdAvg != null ? fmt.ppfd(f.ppfdAvg) : "—") +
          "</td><td>" +
          e(fmt.cct(f.cct)) +
          "</td><td>" +
          e(zone) +
          "</td></tr>"
        );
      })
      .join("");
    host.innerHTML =
      '<div class="table-wrap" tabindex="0"><table><caption>Barres Cosmorrow — fiche COP 2023-09 / 2024-01. PPFD constructeur = moyenne sur la zone, en <span class="unit">' +
      e(fmt.units.ppfd) +
      '</span> (SJ écrit µmol/s/m², même grandeur).</caption><thead><tr><th scope="col">SKU</th><th scope="col">Nom</th><th scope="col">W</th><th scope="col">L</th><th scope="col">PPF (<span class="unit">' +
      e(fmt.units.ppf) +
      '</span>)</th><th scope="col">PPE (<span class="unit">' +
      e(fmt.units.ppe) +
      '</span>)</th><th scope="col">PPFD moy. (<span class="unit">' +
      e(fmt.units.ppfd) +
      '</span>)</th><th scope="col">CCT</th><th scope="col">Zone</th></tr></thead><tbody>' +
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
          "</h3>" +
          spectrumBar(f) +
          "<p>" +
          e(f.spectrumNote) +
          '</p><p class="meta-row"><span>' +
          e(ppfCell(f)) +
          "</span><span>" +
          e(fmt.ppeOf(f)) +
          "</span><span>" +
          e(f.ppfdAvg != null ? fmt.ppfd(f.ppfdAvg) : "—") +
          " moy.</span></p><p class=\"muted\">" +
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

  var glossary = document.getElementById("units-glossary");
  if (glossary && fmt.glossary) {
    glossary.innerHTML = fmt.glossary
      .map(function (g) {
        return (
          '<article class="card"><h3>' +
          e(g.term) +
          ' <span class="muted">' +
          e(g.unit) +
          "</span></h3><p>" +
          e(g.body) +
          "</p></article>"
        );
      })
      .join("");
  }

  var specHost = document.getElementById("spectrum-compare");
  if (specHost) {
    specHost.innerHTML = (window.LG_FIXTURES || [])
      .map(function (f) {
        return (
          '<article class="card stack"><h3>' +
          e(f.sku) +
          "</h3>" +
          spectrumBar(f) +
          '<p class="meta-row"><span>' +
          e(f.spectrum && f.spectrum.label) +
          "</span><span>PAR " +
          e((f.parNm && f.parNm[0] + "–" + f.parNm[1] + " nm") || fmt.units.par) +
          "</span></p><p class=\"hint\">" +
          e(f.spectrum && f.spectrum.kind === "full-spectrum"
            ? "Parts de diodes (fiche), pas une courbe spectrale mesurée. 660 nm = rouge PAR, pas du rouge lointain 730 nm. Blanc 2700 K = pompe 450 nm + luminophore ~610 nm."
            : "100 % diodes 6500 K (parts de diodes, pas une courbe spectrale mesurée). Blanc froid : internodes courts au germoir.") +
          "</p></article>"
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
        var ppeKit = k.totalWatts ? k.totalPpf / k.totalWatts : 0;
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
          e(fmt.ppf(k.totalPpf)) +
          "</span><span>" +
          e(fmt.ppe(ppeKit)) +
          "</span><span>" +
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
