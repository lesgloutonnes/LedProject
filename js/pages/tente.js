(function () {
  var e = escapeHtml;
  var rules = document.getElementById("install-rules");
  var install = window.LG_INSTALL || {};
  if (rules && install.rules) {
    rules.innerHTML = install.rules
      .map(function (r) {
        return (
          '<article class="card"><h3>' +
          e(r.title) +
          "</h3><p>" +
          e(r.body) +
          "</p></article>"
        );
      })
      .join("");
  }
  var check = document.getElementById("install-check");
  if (check && install.checklist) {
    check.innerHTML = install.checklist
      .map(function (c) {
        return "<li>" + e(c.item) + "</li>";
      })
      .join("");
  }
  var tents = document.getElementById("tent-catalog");
  if (tents) {
    tents.innerHTML = (window.LG_TENTS || [])
      .map(function (t) {
        return (
          '<article class="card stack" id="' +
          e(t.id) +
          '"><h3>' +
          e(t.name) +
          "</h3><p class=\"meta-row\"><span>" +
          e(t.wCm) +
          " × " +
          e(t.dCm) +
          " × " +
          e(t.hCm) +
          " cm</span><span>" +
          e(t.volumeM3) +
          " m³</span><span>" +
          e(t.areaM2) +
          " m²</span></p><p><strong>Extracteur.</strong> " +
          e(t.extracteurTypique) +
          "</p><p><strong>Projets.</strong> " +
          e((t.projetsAdaptes || []).join(", ")) +
          '</p><ul class="check-list">' +
          (t.contraintes || [])
            .map(function (c) {
              return "<li>" + e(c) + "</li>";
            })
            .join("") +
          "</ul></article>"
        );
      })
      .join("");
  }
  var hang = document.getElementById("hanging");
  if (hang && install.hanging) {
    var h = install.hanging;
    hang.innerHTML =
      "<p>" +
      e(h.orientation) +
      "</p><p>" +
      e(h.dimByRaising) +
      "</p><ul class=\"check-list\"><li>Growing : " +
      e(h.growingCm) +
      " cm</li><li>FS 40 W : " +
      e(h.fs40Cm) +
      " cm</li><li>Tropicale : " +
      e(h.tropicalCm) +
      " cm</li><li>Dormance : " +
      e(h.dormanceCm) +
      " cm</li></ul><p>" +
      e(h.clips) +
      "</p>";
  }
  var climate = document.getElementById("climate");
  if (climate && install.climate) {
    var c = install.climate;
    if (typeof c === "string") climate.innerHTML = "<p>" + e(c) + "</p>";
    else {
      var climateLabels = {
        extracteur: "Extracteur",
        intracteur: "Intracteur",
        hygrometre: "Hygromètre",
        brumisation: "Brumisation",
        chaleur: "Chaleur",
      };
      climate.innerHTML = Object.keys(c)
        .map(function (k) {
          var val = c[k];
          return (
            "<p><strong>" +
            e(climateLabels[k] || k) +
            ".</strong> " +
            e(typeof val === "string" ? val : JSON.stringify(val)) +
            "</p>"
          );
        })
        .join("");
    }
  }
  var elec = document.getElementById("electricity");
  if (elec && install.electricity) {
    var el = install.electricity;
    if (typeof el === "string") elec.innerHTML = "<p>" + e(el) + "</p>";
    else if (Array.isArray(el)) {
      elec.innerHTML =
        '<ul class="check-list">' +
        el
          .map(function (x) {
            return "<li>" + e(typeof x === "string" ? x : x.item || x.body || "") + "</li>";
          })
          .join("") +
        "</ul>";
    } else {
      var elecLabels = {
        mains: "Secteur",
        programmateur: "Programmateur",
        load: "Charge",
        dc24: "24 V",
        ip: "Indice IP",
        rcd: "Différentiel 30 mA",
      };
      elec.innerHTML = Object.keys(el)
        .map(function (k) {
          return "<p><strong>" + e(elecLabels[k] || k) + ".</strong> " + e(String(el[k])) + "</p>";
        })
        .join("");
    }
  }

  var svg = document.getElementById("pose-svg");
  if (svg) {
    svg.innerHTML =
      '<svg viewBox="0 0 280 160" width="100%" height="auto" role="img" aria-labelledby="pose-title pose-desc">' +
      '<title id="pose-title">Plan 120 × 60, deux bacs, deux Cosmorrow</title>' +
      '<desc id="pose-desc">Deux barres COP4065 parallèles au grand côté, au-dessus de deux bacs 60 × 40.</desc>' +
      '<rect x="24" y="18" width="232" height="116" rx="6" fill="#1f3d32" stroke="#8bc49a" stroke-width="1.5"></rect>' +
      '<rect x="24" y="37" width="116" height="77" fill="none" stroke="#a3b8a8" stroke-dasharray="3 2"></rect>' +
      '<rect x="140" y="37" width="116" height="77" fill="none" stroke="#a3b8a8" stroke-dasharray="3 2"></rect>' +
      '<rect x="40" y="48" width="200" height="8" rx="2" fill="#eef2f8"></rect>' +
      '<rect x="40" y="96" width="200" height="8" rx="2" fill="#eef2f8"></rect>' +
      '<text x="82" y="80" text-anchor="middle" font-size="8" fill="#a3b8a8">Bac A</text>' +
      '<text x="198" y="80" text-anchor="middle" font-size="8" fill="#a3b8a8">Bac B</text>' +
      '<text x="140" y="148" text-anchor="middle" font-size="10" fill="#a3b8a8">120 cm</text></svg>';
  }
})();
