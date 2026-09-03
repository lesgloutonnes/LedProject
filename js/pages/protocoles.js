(function () {
  var e = escapeHtml;
  var host = document.getElementById("protocol-list");
  var nav = document.getElementById("protocol-nav");
  if (!host) return;
  var aliases = window.TOURBIERE_PROTOCOL_HASH || {};

  function diffDots(n) {
    var html = '<span class="diff" aria-label="Difficulté ' + e(n) + " sur 3\">";
    for (var i = 1; i <= 3; i += 1) html += "<span" + (i <= n ? ' class="on"' : "") + "></span>";
    return html + "</span>";
  }

  host.innerHTML = (window.TOURBIERE_PROTOCOLS || [])
    .map(function (p) {
      var alias = aliases[p.id] || p.id;
      var steps = (p.steps || [])
        .map(function (s, i) {
          return (
            "<div><dt>" +
            e(i + 1) +
            ". " +
            e(s.title) +
            "</dt><dd><p>" +
            e(s.body) +
            '</p><ul class="check-list">' +
            (s.checklist || [])
              .map(function (c) {
                return "<li>" + e(c) + "</li>";
              })
              .join("") +
            "</ul></dd></div>"
          );
        })
        .join("");
      var stops = (p.stopSignals || [])
        .map(function (s) {
          return "<li>" + e(s) + "</li>";
        })
        .join("");
      var next = (p.next || [])
        .map(function (s) {
          return "<li>" + e(s) + "</li>";
        })
        .join("");
      var light = p.light || {};
      return (
        '<span id="' +
        e(alias) +
        '" class="visually-hidden"></span><article class="card stack section" id="' +
        e(p.id) +
        '"><p class="kicker">' +
        e(p.kicker) +
        " · " +
        diffDots(p.difficulty) +
        "</p><h2>" +
        e(p.title) +
        "</h2><p>" +
        e(p.summary) +
        '</p><p class="muted">Durée : ' +
        e(p.duration) +
        "</p><p><strong>Climat.</strong> " +
        e(p.climate) +
        "</p><p><strong>Lumière Cosmorrow.</strong> " +
        e(light.sku || "") +
        " — " +
        e(light.height || "") +
        " — " +
        e(light.hours || "") +
        "</p><p class=\"hint\">" +
        e(light.note || "") +
        "</p><p><strong>Eau.</strong> " +
        e(p.water) +
        "</p><p><strong>Substrat.</strong> " +
        e(p.substrate) +
        "</p><p><strong>Engrais.</strong> " +
        e(p.fertilizer) +
        '</p><h3>Étapes</h3><dl class="dl-steps">' +
        steps +
        "</dl><h3>Signaux d’arrêt</h3><ul class=\"check-list\">" +
        stops +
        '</ul><h3>Ensuite</h3><ul class="check-list">' +
        next +
        "</ul></article>"
      );
    })
    .join("");

  if (nav) {
    nav.innerHTML = (window.TOURBIERE_PROTOCOLS || [])
      .map(function (p) {
        var alias = aliases[p.id] || p.id;
        return '<a href="#' + e(alias) + '">' + e(p.title.split("—")[0].trim()) + "</a>";
      })
      .join("");
  }

  var months = document.getElementById("calendar");
  if (months && window.TOURBIERE_CALENDAR) {
    var cal = window.TOURBIERE_CALENDAR.months || window.TOURBIERE_CALENDAR;
    var arr = Array.isArray(cal) ? cal : [];
    months.innerHTML = arr
      .map(function (m) {
        var gestures = (m.gestures || m.tasks || [])
          .map(function (g) {
            return "<li>" + e(typeof g === "string" ? g : g.text || g.title || "") + "</li>";
          })
          .join("");
        return (
          '<article class="card"><h3>' +
          e(m.name || m.label || "Mois " + m.id) +
          "</h3><p class=\"muted\">" +
          e(m.photoperiod || m.hours || "") +
          "</p><ul class=\"check-list\">" +
          gestures +
          "</ul></article>"
        );
      })
      .join("");
  }
})();
