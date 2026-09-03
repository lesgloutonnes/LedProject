(function () {
  var e = escapeHtml;
  var store = window.TourbiereStore;
  var match = window.TourbiereMatch;
  var fmt = window.TourbiereFmt;
  var state = store.getProject();
  var params = new URLSearchParams(location.search);
  if (params.get("step")) {
    var q = params.get("step");
    state.step = q === "result" ? "result" : Number(q) || 1;
  }

  function firstInvalidStep() {
    var i;
    for (i = 1; i <= 4; i += 1) {
      if (!stepValid(i)) return i;
    }
    return "result";
  }

  function clampStep() {
    if (state.step === "result" || Number(state.step) === 5) {
      if (stepValid(1) && stepValid(2) && stepValid(3) && stepValid(4)) {
        state.step = "result";
      } else {
        state.step = firstInvalidStep();
      }
      return;
    }
    var n = Number(state.step) || 1;
    if (n < 1) n = 1;
    if (n > 4) n = 4;
    if (n > 1 && !stepValid(1)) n = 1;
    else if (n > 2 && !stepValid(2)) n = 2;
    else if (n > 3 && !stepValid(3)) n = 3;
    state.step = n;
  }

  var root = document.getElementById("assistant-app");
  if (!root) return;

  function persist() {
    store.setProject(state);
  }

  function go(step) {
    state.step = step;
    persist();
    var url = new URL(location.href);
    url.searchParams.set("step", String(step));
    history.replaceState(null, "", url);
    render();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function stepValid(n) {
    if (n === 1) return Boolean(state.projet);
    if (n === 2) return Array.isArray(state.genres) && state.genres.length >= 1;
    if (n === 3) return Boolean(state.tente && state.tente.id);
    if (n === 4) {
      var c = state.contraintes || {};
      return c.budget && c.hygro && c.dormance !== null && c.dormance !== undefined;
    }
    return true;
  }

  function stepLabel(n) {
    return { 1: "Projet", 2: "Genres", 3: "Surface", 4: "Contraintes", result: "Kit" }[n] || "";
  }

  function renderStepper() {
    var n = state.step === "result" ? 5 : Number(state.step);
    var labelN = n > 4 ? 4 : n;
    var html =
      '<div class="stepper"><ol aria-label="Étapes de l’assistant">';
    for (var i = 1; i <= 4; i += 1) {
      html += "<li" + (i === labelN ? ' aria-current="step"' : "") + "></li>";
    }
    html +=
      '</ol><p class="step-label">Étape ' +
      (n > 4 ? "kit" : labelN + "/4") +
      " · " +
      e(stepLabel(state.step)) +
      "</p></div>";
    return html;
  }

  function renderStep1() {
    var cards = (window.TOURBIERE_PROJECTS || [])
      .map(function (p) {
        var active = state.projet === p.id ? " is-active" : "";
        return (
          '<button type="button" class="choice' +
          active +
          '" data-id="' +
          e(p.id) +
          '" role="radio" aria-checked="' +
          (state.projet === p.id) +
          '"><strong>' +
          e(p.label) +
          "</strong><span>" +
          e(p.blurb) +
          "</span></button>"
        );
      })
      .join("");
    return (
      "<h1>Quel projet dans la tente ?</h1><p class=\"lede\">Un métier à la fois. Tu pourras mixer plus tard, pas dans le premier kit.</p>" +
      '<div class="choice-grid" role="radiogroup" aria-label="Type de projet">' +
      cards +
      "</div>"
    );
  }

  function renderStep2() {
    var notes = match.genreWarnings(state.projet, state.genres);
    var chips = (window.TOURBIERE_GENRES || [])
      .map(function (g) {
        var on = state.genres.indexOf(g.id) >= 0;
        return (
          '<button type="button" class="chip" data-id="' +
          e(g.id) +
          '" aria-pressed="' +
          on +
          '">' +
          e(g.label) +
          "</button>"
        );
      })
      .join("");
    var callout = notes.length
      ? '<div class="callout is-warn"><p>' + e(notes[0]) + "</p></div>"
      : "";
    return (
      "<h1>Quels genres ?</h1><p class=\"lede\">Multi-sélection. On calibre la lumière sur le plus exigeant, et on range les autres à l’étage ou au bord.</p>" +
      '<div class="chips">' +
      chips +
      "</div>" +
      callout
    );
  }

  function renderStep3() {
    var fav = store.getPrefs().tenteFavorite;
    var tents = window.TOURBIERE_TENTS || [];
    var cards = tents
      .map(function (t) {
        var active = state.tente && state.tente.id === t.id ? " is-active" : "";
        var badge = t.id === fav ? ' <span class="badge">Favorite</span>' : "";
        return (
          '<button type="button" class="choice' +
          active +
          '" data-tent="' +
          e(t.id) +
          '"><strong>' +
          e(t.name) +
          badge +
          "</strong><span>" +
          e(t.wCm) +
          " × " +
          e(t.dCm) +
          " × " +
          e(t.hCm) +
          " cm · " +
          e(fmt.n2(t.areaM2)) +
          " m²</span></button>"
        );
      })
      .join("");
    var customOn = state.tente && state.tente.id === "custom";
    return (
      "<h1>Quelle surface ?</h1><p class=\"lede\">Deux bacs 60 × 40 rentrent dans 120 × 60 — c’est le format signature Tourbière.</p>" +
      '<div class="choice-grid">' +
      cards +
      '<button type="button" class="choice' +
      (customOn ? " is-active" : "") +
      '" data-tent="custom"><strong>Autre</strong><span>Saisie L × l × H en cm</span></button></div>' +
      (customOn
        ? '<div class="card stack" style="--stack-space:0.75rem;margin-top:1rem"><label>Longueur cm <input id="custom-l" type="number" inputmode="numeric" min="40" max="240" value="' +
          e(state.tente.lengthCm || 120) +
          '"></label><label>Largeur cm <input id="custom-w" type="number" inputmode="numeric" min="40" max="240" value="' +
          e(state.tente.widthCm || 60) +
          '"></label><label>Hauteur cm <input id="custom-h" type="number" inputmode="numeric" min="40" max="240" value="' +
          e(state.tente.heightCm || 150) +
          '"></label></div>'
        : "") +
      (state.tente && state.tente.id !== "custom"
        ? '<p class="hint" style="margin-top:1rem"><button type="button" class="btn-ghost" id="save-fav">Enregistrer comme favorite</button></p>'
        : "")
    );
  }

  function renderStep4() {
    var c = state.contraintes || {};
    function group(name, options) {
      return options
        .map(function (o) {
          var on = String(c[name]) === String(o.id);
          return (
            '<button type="button" class="chip" data-field="' +
            e(name) +
            '" data-val="' +
            e(o.id) +
            '" aria-pressed="' +
            on +
            '">' +
            e(o.label) +
            "</button>"
          );
        })
        .join("");
    }
    return (
      "<h1>Contraintes</h1><p class=\"lede\">Budget LED seulement (barres + alim). La tente, l’extracteur et le programmateur sont à part.</p>" +
      '<p class="tiny-label kicker">Budget kit LED</p><div class="chips">' +
      group("budget", [
        { id: "sous-150", label: "Moins de 150 €" },
        { id: "150-300", label: "150–300 €" },
        { id: "peu-importe", label: "Peu importe" },
      ]) +
      '</div><p class="kicker" style="margin-top:1.25rem">Hygrométrie visée</p><div class="chips">' +
      group("hygro", [
        { id: "basse", label: "Basse < 50 %" },
        { id: "moyenne", label: "Moyenne 50–70 %" },
        { id: "haute", label: "Haute > 70 %" },
      ]) +
      '</div><p class="kicker" style="margin-top:1.25rem">Dormance dans cette tente</p><div class="chips">' +
      group("dormance", [
        { id: "true", label: "Oui" },
        { id: "false", label: "Non" },
      ]) +
      '</div><div class="callout" style="margin-top:1.25rem"><p>Ne pas mélanger 20 W et 40 W sur la même alim. <a href="cosmorrow.html">Gamme Cosmorrow</a>.</p></div>'
    );
  }

  function kitResult() {
    var tent = state.tente;
    var result = match.matchKit({
      projet: state.projet,
      tenteId: tent && tent.id !== "custom" ? tent.id : null,
      lengthCm: tent && tent.lengthCm,
      widthCm: tent && tent.widthCm,
      budget: state.contraintes.budget,
      hygro: state.contraintes.hygro,
      dormance: state.contraintes.dormance === true || state.contraintes.dormance === "true",
      genres: state.genres,
    });
    state.kit = result.kit
      ? {
          id: result.kit.id,
          bars: result.kit.bars,
          psu: result.kit.psu,
          watts: result.kit.totalWatts,
          ppf: result.kit.totalPpf,
          heightCm: result.kit.hangCm,
          hours: result.kit.hours,
          protocolId: result.protocolId,
          warnings: result.warnings,
        }
      : null;
    persist();
    return result;
  }

  function renderResult() {
    var result = kitResult();
    var kit = result.kit;
    var project = result.project;
    if (!kit) {
      return "<h1>Pas de kit calé</h1><p>Reviens sur la surface ou le projet.</p>";
    }
    var psus = match.psuList(kit);
    var shop = (kit.shopping || [])
      .map(function (s) {
        return (
          "<li><span><strong>" +
          e(String(s.qty)) +
          " × " +
          e(s.sku) +
          '</strong><br><span class="muted">' +
          e(s.role) +
          "</span></span></li>"
        );
      })
      .join("");
    var warns = (result.warnings || [])
      .map(function (w) {
        return "<li>" + e(w) + "</li>";
      })
      .join("");
    var alts = (result.alternatives || [])
      .map(function (k) {
        return (
          '<li><a href="cosmorrow.html#' +
          e(k.id) +
          '">' +
          e(k.name) +
          "</a> · " +
          e(fmt.euro0(k.estimatedEUR)) +
          "</li>"
        );
      })
      .join("");
    var hashMap = window.TOURBIERE_PROTOCOL_HASH || {};
    var hash = hashMap[result.protocolId] || result.protocolId;
    return (
      '<div id="kit-print">' +
      '<p class="kicker">Kit recommandé</p>' +
      "<h1>" +
      e(kit.name) +
      "</h1>" +
      '<div class="kit-hero stack">' +
      '<p class="sku">' +
      e(
        (kit.bars || [])
          .map(function (b) {
            return b.qty + " × " + b.sku;
          })
          .join(" + ")
      ) +
      " + " +
      e(psus.join(" + ")) +
      "</p>" +
      "<p>" +
      e(kit.why) +
      "</p>" +
      '<p class="price">' +
      e(fmt.euro0(kit.estimatedEUR)) +
      " <span class=\"muted\" style=\"font-size:1rem\">kit LED, hors tente</span></p>" +
      '<p class="meta-row"><span>' +
      e(kit.totalWatts) +
      " W</span><span>" +
      e(fmt.ppf(kit.totalPpf)) +
      "</span><span>" +
      e(kit.hangCm) +
      " cm</span><span>" +
      e(kit.hours) +
      " h</span></p></div>" +
      '<section class="section"><h2>Liste d’achat</h2><ul class="shop-list">' +
      shop +
      "</ul></section>" +
      '<section class="section"><h2>À ne pas rater</h2><ul class="check-list">' +
      warns +
      "</ul></section></div>" +
      '<div class="btn-row" style="margin-top:1.5rem">' +
      '<button type="button" class="btn-primary" id="print-kit">Imprimer la liste</button>' +
      '<a class="btn-ghost" href="protocoles.html#' +
      e(hash) +
      '">Protocole ' +
      e(project ? project.label : "") +
      "</a>" +
      '<a class="btn-ghost" href="outils.html?kit=' +
      e(kit.id) +
      '">Simuler le PPFD</a>' +
      '<a class="btn-ghost" href="tente.html">Plan de pose</a></div>' +
      (alts
        ? '<section class="section"><h2>Autres kits possibles</h2><ul class="check-list">' + alts + "</ul></section>"
        : "")
    );
  }

  function nextLabel(n, valid) {
    if (n === 4) return valid ? "Voir le kit" : "Répondre aux 3 questions";
    if (n === 1) return valid ? "Continuer" : "Choisir un projet";
    if (n === 2) return valid ? "Continuer" : "Choisir au moins un genre";
    if (n === 3) return valid ? "Continuer" : "Choisir une tente";
    return "Continuer";
  }

  function renderNav() {
    var html = '<div class="btn-row wizard-nav" style="margin-top:1.5rem">';
    if (state.step !== 1 && state.step !== "result") {
      html += '<button type="button" class="btn-ghost" id="back">Retour</button>';
    }
    if (state.step === "result") {
      html += '<button type="button" class="btn-ghost" id="restart">Recommencer</button>';
    } else {
      var n = Number(state.step);
      var valid = stepValid(n);
      html +=
        '<button type="button" class="btn-primary" id="next"' +
        (valid ? "" : " disabled aria-disabled=\"true\"") +
        ">" +
        e(nextLabel(n, valid)) +
        "</button>";
    }
    html += "</div>";
    return html;
  }

  function render() {
    var body = "";
    if (state.step === "result" || state.step === 5) {
      state.step = "result";
      body = renderResult();
    } else if (state.step === 2) body = renderStep2();
    else if (state.step === 3) body = renderStep3();
    else if (state.step === 4) body = renderStep4();
    else body = renderStep1();
    root.innerHTML = renderStepper() + '<div class="stack">' + body + "</div>" + renderNav();
    bind();
  }

  function bind() {
    root.querySelectorAll(".choice[data-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.projet = btn.getAttribute("data-id");
        if (state.projet === "dormance" && state.contraintes) state.contraintes.dormance = true;
        persist();
        render();
      });
    });
    root.querySelectorAll(".chip[data-id]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var i = state.genres.indexOf(id);
        if (i >= 0) state.genres.splice(i, 1);
        else state.genres.push(id);
        persist();
        render();
      });
    });
    root.querySelectorAll("[data-tent]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-tent");
        if (id === "custom") {
          state.tente = { id: "custom", lengthCm: 120, widthCm: 60, heightCm: 150 };
        } else {
          var t = match.tentById(id);
          state.tente = t
            ? { id: t.id, lengthCm: t.wCm, widthCm: t.dCm, heightCm: t.hCm }
            : null;
        }
        persist();
        render();
      });
    });
    ["custom-l", "custom-w", "custom-h"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", function () {
        var n = Math.max(40, Math.min(240, Number(el.value) || 40));
        if (!state.tente) state.tente = { id: "custom" };
        if (id === "custom-l") state.tente.lengthCm = n;
        if (id === "custom-w") state.tente.widthCm = n;
        if (id === "custom-h") state.tente.heightCm = n;
        persist();
      });
    });
    var fav = document.getElementById("save-fav");
    if (fav) {
      fav.addEventListener("click", function () {
        store.setPrefs({ tenteFavorite: state.tente.id });
        render();
      });
    }
    root.querySelectorAll(".chip[data-field]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var field = btn.getAttribute("data-field");
        var val = btn.getAttribute("data-val");
        if (!state.contraintes) state.contraintes = {};
        if (field === "dormance") state.contraintes.dormance = val === "true";
        else state.contraintes[field] = val;
        persist();
        render();
      });
    });
    var next = document.getElementById("next");
    if (next) {
      next.addEventListener("click", function () {
        if (!stepValid(Number(state.step))) return;
        if (Number(state.step) === 4) go("result");
        else go(Number(state.step) + 1);
      });
    }
    var back = document.getElementById("back");
    if (back) {
      back.addEventListener("click", function () {
        go(Math.max(1, Number(state.step) - 1));
      });
    }
    var restart = document.getElementById("restart");
    if (restart) {
      restart.addEventListener("click", function () {
        state = store.resetProject();
        go(1);
      });
    }
    var printBtn = document.getElementById("print-kit");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        TourbierePrint.printZone("#kit-print");
      });
    }
  }

  clampStep();
  render();
})();
