(function () {
  var e = escapeHtml;
  var fmt = window.TourbiereFmt;
  var list = document.getElementById("species-list");
  var chips = document.getElementById("species-filter");
  if (!list) return;
  var species = window.TOURBIERE_SPECIES || [];
  var active = "all";

  function familyOf(id) {
    if (id.indexOf("sarracenia") === 0) return "sarracenia";
    if (id.indexOf("drosera") === 0) return "drosera";
    if (id.indexOf("nepenthes") === 0) return "nepenthes";
    if (id.indexOf("pinguicula") === 0) return "pinguicula";
    if (id.indexOf("utricularia") === 0) return "utricularia";
    return id;
  }

  function render() {
    var hash = (location.hash || "").replace("#", "");
    var filtered = species.filter(function (s) {
      if (active === "all") return true;
      return familyOf(s.id) === active;
    });
    list.innerHTML = filtered
      .map(function (s) {
        return (
          '<article class="card stack" id="' +
          e(s.id) +
          '"><div class="cluster"><span class="badge">' +
          e(s.climate) +
          '</span><span class="badge ' +
          (s.dormancy === "required" ? "is-warn" : "is-ok") +
          '">Dormance ' +
          e(s.dormancy) +
          "</span></div><h2>" +
          e(s.common) +
          "</h2><p class=\"muted\"><em>" +
          e(s.latin) +
          "</em> · " +
          e(s.family) +
          "</p><p class=\"meta-row\"><span>PPFD " +
          e(fmt.range(s.ppfd[0], s.ppfd[2], "µmol")) +
          " (cible " +
          e(s.ppfd[1]) +
          ")</span><span>DLI " +
          e(fmt.n1(s.dli[0])) +
          "–" +
          e(fmt.n1(s.dli[2])) +
          "</span><span>" +
          e(s.photoperiodGrow) +
          " h / " +
          e(s.photoperiodDorm) +
          " h</span><span>HR " +
          e(s.humidity[0]) +
          "–" +
          e(s.humidity[2]) +
          " %</span></p><p>" +
          e(s.tentTips) +
          "</p><p><strong>Eau.</strong> " +
          e(s.waterNote) +
          "</p><p><strong>Substrat.</strong> " +
          e(s.substrate) +
          "</p><p><strong>Engrais.</strong> " +
          e(s.fertilizer) +
          "</p>" +
          "<p><strong>Semis.</strong> " +
              e(s.seedlingNotes) +
              "</p><p><strong>Bouture.</strong> " +
              e(s.cuttingNotes) +
              "</p><p><strong>Rouge.</strong> " +
              e(s.redColorNotes) +
              "</p><p><strong>Pièges.</strong> " +
              e(s.traps) +
              "</p><ul class=\"check-list\">" +
              (s.warnings || [])
                .map(function (w) {
                  return "<li>" + e(w) + "</li>";
                })
                .join("") +
              "</ul>" +
          '<p class="hint">Source PPFD : Carnivero / Florawave. Cible = bas-milieu de fourchette.</p></article>'
        );
      })
      .join("");
    if (hash) {
      var el = document.getElementById(hash);
      if (el) el.scrollIntoView({ block: "start" });
    }
  }

  if (chips) {
    var families = [
      ["all", "Tous"],
      ["sarracenia", "Sarracenia"],
      ["drosera", "Drosera"],
      ["dionaea", "Dionaea"],
      ["nepenthes", "Nepenthes"],
      ["heliamphora", "Heliamphora"],
      ["cephalotus", "Cephalotus"],
      ["pinguicula", "Pinguicula"],
      ["utricularia", "Utricularia"],
    ];
    chips.innerHTML = families
      .map(function (f) {
        return (
          '<button type="button" class="chip" data-f="' +
          e(f[0]) +
          '" aria-pressed="' +
          (active === f[0]) +
          '">' +
          e(f[1]) +
          "</button>"
        );
      })
      .join("");
    chips.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-f]");
      if (!btn) return;
      active = btn.getAttribute("data-f");
      chips.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", c === btn ? "true" : "false");
      });
      render();
    });
  }

  render();
})();
