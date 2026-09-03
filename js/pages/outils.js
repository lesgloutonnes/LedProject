(function () {
  var e = escapeHtml;
  var fmt = window.TourbiereFmt;
  var optics = window.TOURBIERE_OPTICS;
  var match = window.TourbiereMatch;
  var store = window.TourbiereStore;
  var params = new URLSearchParams(location.search);

  var state = {
    kitId: params.get("kit") || "kit-germoir-120x60",
    sku: params.get("sku") || "",
    qty: Number(params.get("qty") || 0) || 0,
    tentId: params.get("tent") || "tent-120x60",
    height: Number(params.get("h") || 20) || 20,
    hours: Number(params.get("hours") || 14) || 14,
    intensity: 100,
  };

  var kitSel = document.getElementById("kit-select");
  var tentSel = document.getElementById("tent-select");
  var heightEl = document.getElementById("height");
  var hoursEl = document.getElementById("hours");
  var kwhEl = document.getElementById("kwh-eur");

  function currentKit() {
    var kits = window.TOURBIERE_KITS || [];
    var found = kits.find(function (k) {
      return k.id === state.kitId;
    });
    if (found) return found;
    if (kits[0]) {
      state.kitId = kits[0].id;
      return kits[0];
    }
    return null;
  }

  function pct(n) {
    var x = Number(n);
    if (!isFinite(x)) return "0";
    return String(Math.max(-80, Math.min(180, Math.round(x * 100) / 100)));
  }

  function fixtureForSim(kit) {
    if (state.sku) {
      var f = match.fixtureBySku(state.sku);
      if (f) return { fixture: f, count: state.qty || 1, layout: "parallel-depth" };
    }
    if (!kit) return null;
    var primary = kit.bars && kit.bars[0];
    if (!primary) return null;
    var f2 = match.fixtureBySku(primary.sku);
    if (!f2) return null;
    return { fixture: f2, count: primary.qty, layout: primary.layout || "parallel-depth" };
  }

  function simulateKitFull(kit, tent, height, intensity) {
    if (!optics || !kit || !kit.bars || !kit.bars.length) return null;
    var groups = kit.bars;
    var first = match.fixtureBySku(groups[0].sku);
    if (!first) return null;
    var sim = optics.simulatePpfd(first, tent, height, intensity, {
      layout: groups[0].layout,
      count: groups[0].qty,
      cols: 32,
      rows: 16,
    });
    var g;
    for (g = 1; g < groups.length; g += 1) {
      var fx = match.fixtureBySku(groups[g].sku);
      if (!fx) continue;
      var extra = optics.simulatePpfd(fx, tent, height, intensity, {
        layout: groups[g].layout,
        count: groups[g].qty,
        bounce: 0,
        cols: sim.cols,
        rows: sim.rows,
      });
      var i;
      for (i = 0; i < sim.grid.length; i += 1) sim.grid[i] += extra.grid[i];
      sim.lights = sim.lights.concat(extra.lights);
    }
    var sum = 0;
    var min = Infinity;
    var max = 0;
    sim.grid.forEach(function (v) {
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    });
    sim.min = min;
    sim.max = max;
    sim.avg = sum / sim.grid.length;
    sim.center = sim.grid[Math.floor(sim.rows / 2) * sim.cols + Math.floor(sim.cols / 2)];
    sim.corner = sim.grid[0];
    return sim;
  }

  var STOPS = [
    { t: 0, c: [18, 38, 32] },
    { t: 80, c: [22, 56, 44] },
    { t: 150, c: [42, 106, 74] },
    { t: 250, c: [196, 160, 53] },
    { t: 400, c: [212, 101, 58] },
    { t: 550, c: [155, 45, 58] },
  ];

  function ppfdRgb(v) {
    if (v <= STOPS[0].t) return STOPS[0].c;
    var i;
    for (i = 1; i < STOPS.length; i += 1) {
      if (v <= STOPS[i].t) {
        var a = STOPS[i - 1];
        var b = STOPS[i];
        var t = (v - a.t) / (b.t - a.t);
        return [
          Math.round(a.c[0] + (b.c[0] - a.c[0]) * t),
          Math.round(a.c[1] + (b.c[1] - a.c[1]) * t),
          Math.round(a.c[2] + (b.c[2] - a.c[2]) * t),
        ];
      }
    }
    return STOPS[STOPS.length - 1].c;
  }

  function draw(sim, tent) {
    var canvas = document.getElementById("heatmap");
    if (!canvas || !sim) return;
    var ctx = canvas.getContext("2d");
    canvas.width = sim.cols;
    canvas.height = sim.rows;
    var img = ctx.createImageData(sim.cols, sim.rows);
    var i;
    for (i = 0; i < sim.grid.length; i += 1) {
      var rgb = ppfdRgb(sim.grid[i]);
      var p = i * 4;
      img.data[p] = rgb[0];
      img.data[p + 1] = rgb[1];
      img.data[p + 2] = rgb[2];
      img.data[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    var trays = document.getElementById("trays");
    if (trays) {
      trays.innerHTML = (tent.trays || [])
        .map(function (tray) {
          return (
            '<div class="tray-overlay" style="left:' +
            pct((tray.xCm / tent.wCm) * 100) +
            "%;top:" +
            pct((tray.yCm / tent.dCm) * 100) +
            "%;width:" +
            pct((tray.lengthCm / tent.wCm) * 100) +
            "%;height:" +
            pct((tray.depthCm / tent.dCm) * 100) +
            '%"><span>' +
            e(tray.label) +
            "</span></div>"
          );
        })
        .join("");
    }
    var bars = document.getElementById("bars");
    if (bars) {
      bars.innerHTML = (sim.lights || [])
        .map(function (light) {
          var left = ((light.xCm - light.lengthCm / 2) / tent.wCm) * 100;
          var top = ((light.yCm - Math.max(light.widthCm, 2.4) / 2) / tent.dCm) * 100;
          var w = (light.lengthCm / tent.wCm) * 100;
          var h = (Math.max(light.widthCm, 2.4) / tent.dCm) * 100;
          return (
            '<div class="bar-overlay" style="left:' +
            pct(left) +
            "%;top:" +
            pct(top) +
            "%;width:" +
            pct(w) +
            "%;height:" +
            pct(h) +
            '%"></div>'
          );
        })
        .join("");
    }
  }

  function render() {
    var kit = currentKit();
    var tent = match.tentById(state.tentId) || match.tentById("tent-120x60");
    if (kit && kit.tentId && !params.get("tent")) {
      var kt = match.tentById(kit.tentId);
      if (kt) tent = kt;
    }
    document.getElementById("height-val").textContent = state.height + " cm";
    document.getElementById("hours-val").textContent = state.hours + " h";
    var sim;
    if (kit && optics) sim = simulateKitFull(kit, tent, state.height, state.intensity);
    else {
      var pack = fixtureForSim(kit);
      if (pack && pack.fixture && optics) {
        sim = optics.simulatePpfd(pack.fixture, tent, state.height, state.intensity, {
          layout: pack.layout,
          count: pack.count,
          cols: 32,
          rows: 16,
        });
      }
    }
    var statsEl = document.getElementById("heatmap-stats");
    if (sim) {
      var frame = document.getElementById("heatmap") && document.getElementById("heatmap").parentElement;
      if (frame) frame.style.aspectRatio = Number(tent.wCm) + " / " + Number(tent.dCm);
      draw(sim, tent);
      var dliVal = optics.dli(sim.avg, state.hours);
      var watts = kit ? kit.totalWatts : (fixtureForSim(kit) && fixtureForSim(kit).fixture.watts * (state.qty || 1)) || 0;
      var kwh = optics.yearlyKwh(watts, state.hours, 100);
      var tariff = store.getPrefs().kwhEur;
      if (statsEl) {
        statsEl.textContent =
          "PPFD moyen " +
          fmt.n0(sim.avg) +
          " µmol/m²/s · centre " +
          fmt.n0(sim.center) +
          " · DLI " +
          fmt.n1(dliVal) +
          " mol/m²/j · " +
          fmt.n1(kwh) +
          " kWh/an · " +
          fmt.euro2(optics.yearlyCost(kwh, tariff));
      }
      var statsBox = document.getElementById("stats");
      if (statsBox) {
        statsBox.innerHTML = [
          ["PPFD moyen", fmt.n0(sim.avg) + " µmol", "tente entière, modèle lambertien"],
          ["Centre / coin", fmt.n0(sim.center) + " / " + fmt.n0(sim.corner), "hotspot vs bord"],
          ["DLI", fmt.n1(dliVal) + " mol", state.hours + " h / jour"],
          ["Facture an", fmt.euro2(optics.yearlyCost(kwh, tariff)), fmt.n1(kwh) + " kWh · " + fmt.n2(tariff) + " €/kWh"],
        ]
          .map(function (row) {
            return (
              '<div class="stat card"><div class="lbl">' +
              e(row[0]) +
              '</div><div class="val">' +
              e(row[1]) +
              '</div><p class="hint">' +
              e(row[2]) +
              "</p></div>"
            );
          })
          .join("");
      }
    } else if (statsEl) {
      statsEl.textContent = "Aucune simulation : choisis un kit Cosmorrow.";
    }
    var note = document.getElementById("sim-note");
    if (note && kit) {
      note.innerHTML =
        "<p><strong>" +
        e(kit.name) +
        "</strong> — " +
        e(kit.why) +
        '</p><p class="hint">Ce n’est pas un PAR-mètre. Rebonds mylar forfaitaires. Cosmorrow n’est pas dimmable : on monte la barre.</p>';
    }
  }

  if (kitSel) {
    kitSel.innerHTML = (window.TOURBIERE_KITS || [])
      .map(function (k) {
        return (
          '<option value="' +
          e(k.id) +
          '"' +
          (k.id === state.kitId ? " selected" : "") +
          ">" +
          e(k.name) +
          "</option>"
        );
      })
      .join("");
    kitSel.addEventListener("change", function () {
      state.kitId = kitSel.value;
      state.sku = "";
      var k = currentKit();
      if (k) {
        state.height = k.hangCm;
        state.hours = k.hours;
        heightEl.value = String(state.height);
        hoursEl.value = String(state.hours);
      }
      render();
    });
  }
  if (tentSel) {
    tentSel.innerHTML = (window.TOURBIERE_TENTS || [])
      .map(function (t) {
        return (
          '<option value="' +
          e(t.id) +
          '"' +
          (t.id === state.tentId ? " selected" : "") +
          ">" +
          e(t.name) +
          "</option>"
        );
      })
      .join("");
    tentSel.addEventListener("change", function () {
      state.tentId = tentSel.value;
      render();
    });
  }
  if (heightEl) {
    heightEl.value = String(state.height);
    heightEl.addEventListener("input", function () {
      state.height = Number(heightEl.value);
      render();
    });
  }
  if (hoursEl) {
    hoursEl.value = String(state.hours);
    hoursEl.addEventListener("input", function () {
      state.hours = Number(hoursEl.value);
      render();
    });
  }
  if (kwhEl) {
    kwhEl.value = String(store.getPrefs().kwhEur);
    kwhEl.addEventListener("change", function () {
      var v = Math.max(0.05, Math.min(0.8, Number(kwhEl.value) || 0.2016));
      store.setPrefs({ kwhEur: v });
      render();
    });
  }

  var kit = currentKit();
  if (kit) {
    state.height = Number(params.get("h") || kit.hangCm);
    state.hours = Number(params.get("hours") || kit.hours);
    if (heightEl) heightEl.value = String(state.height);
    if (hoursEl) hoursEl.value = String(state.hours);
  }
  render();
})();
