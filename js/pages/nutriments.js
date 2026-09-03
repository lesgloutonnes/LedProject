(function () {
  var e = escapeHtml;
  var n = window.TOURBIERE_NUTRIENTS;
  if (!n) return;

  function list(arr, ok) {
    return (arr || [])
      .map(function (x) {
        return (
          '<article class="card"><h3>' +
          (ok ? "" : "") +
          e(x.label || x.name) +
          "</h3><p>" +
          e(x.note || x.notes || x.recipe || "") +
          "</p></article>"
        );
      })
      .join("");
  }

  var waterOk = document.getElementById("water-ok");
  var waterNo = document.getElementById("water-no");
  if (waterOk) waterOk.innerHTML = list(n.water.allowed, true);
  if (waterNo) waterNo.innerHTML = list(n.water.forbidden, false);
  var practice = document.getElementById("water-practice");
  if (practice) {
    practice.innerHTML = (n.water.practice || [])
      .map(function (p) {
        return "<li>" + e(p) + "</li>";
      })
      .join("");
  }

  var subs = document.getElementById("substrates");
  if (subs) {
    subs.innerHTML = (n.substrates || [])
      .map(function (s) {
        return (
          '<article class="card stack" id="' +
          e(s.id) +
          '"><h3>' +
          e(s.name) +
          "</h3><p class=\"muted\">" +
          e((s.uses || []).join(" · ")) +
          "</p><p>" +
          e(s.recipe) +
          "</p><p>" +
          e(s.notes) +
          "</p></article>"
        );
      })
      .join("");
  }

  var fert = document.getElementById("fertilizers");
  if (fert && n.fertilizers) {
    var block = n.fertilizers;
    var html = "";
    if (block.products) {
      html += block.products
        .map(function (f) {
          return (
            '<article class="card stack"><h3>' +
            e(f.name) +
            "</h3><p>" +
            e(f.protocol) +
            "</p><p class=\"hint\">" +
            e(f.why) +
            "</p><p class=\"callout is-warn\">" +
            e(f.avoid) +
            "</p></article>"
          );
        })
        .join("");
    }
    if (block.never) {
      html +=
        "<h3>Jamais</h3><ul class=\"check-list\">" +
        block.never
          .map(function (x) {
            return "<li>" + e(x) + "</li>";
          })
          .join("") +
        "</ul>";
    }
    if (block.algaeAlert) html += '<div class="callout is-warn"><p>' + e(block.algaeAlert) + "</p></div>";
    if (block.season) {
      html +=
        "<p><strong>Saison.</strong> " +
        e(block.season.grow) +
        " · <strong>Dormance.</strong> " +
        e(block.season.dormancy) +
        " · <strong>Semis.</strong> " +
        e(block.season.seedlings) +
        " · <strong>Boutures.</strong> " +
        e(block.season.cuttings) +
        "</p>";
    }
    fert.innerHTML = html;
  }

  var pests = document.getElementById("pests");
  if (pests && n.pests) {
    pests.innerHTML =
      "<h3>" +
      e(n.pests.title) +
      "</h3><p>" +
      e(n.pests.intro || "") +
      '</p><div class="stack" style="--stack-space:0.75rem">' +
      (n.pests.items || [])
        .map(function (x) {
          return (
            '<article class="card"><h3>' +
            e(x.label) +
            "</h3><p>" +
            e(x.note) +
            "</p></article>"
          );
        })
        .join("") +
      "</div>";
  }

  var feed = document.getElementById("feeding");
  if (feed && n.feeding) {
    var f = n.feeding;
    feed.innerHTML =
      "<h3>" +
      e(f.title || "Proies") +
      "</h3><p>" +
      e(f.frequency || "") +
      '</p><ul class="check-list">' +
      (f.how || [])
        .map(function (x) {
          return "<li>" + e(x) + "</li>";
        })
        .join("") +
      '</ul><h3>Jamais</h3><ul class="check-list">' +
      (f.never || [])
        .map(function (x) {
          return "<li>" + e(x) + "</li>";
        })
        .join("") +
      '</ul><p class="hint">' +
      e(f.tentNote || "") +
      "</p>";
  }
})();
