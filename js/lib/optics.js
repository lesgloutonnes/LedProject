/**
 * Optique Cosmorrow — fonctions réutilisables (pas d’IIFE).
 *
 * Modèle : source lambertienne, faisceau 120° (coupure cos θ < 0,5),
 * irradiance E = (PPF / π) · cos²θ / r², r en mètres.
 * Rebond mylar : + 0,25 × moyenne de la grille, uniforme (pas une radiosité).
 *
 * Limites — ce n’est PAS un PAR-mètre :
 * - Pas de mesure réelle (MQ-500, Apogee, etc.) ni de carte constructeur interpolée.
 * - Les Cosmorrow n’ont pas un diagramme lambertien parfait (lentille ~115–120°).
 * - Le mylar 0,25 est un bonus forfaitaire : murs sales, portes ouvertes, filet = moins.
 * - Une barre est discrétisée en segments ; le hotspot réel dépend des 3 lignes de LED.
 * - PPFD constructeur (ex. 268 sur 60×40 @ 15 cm) cale la moyenne : le lambertien + mylar 0,25
 *   sous-estime la fiche (rebond réel + photons renvoyés depuis les parois). On multiplie le PPF
 *   simulé d’un facteur par SKU pour coller à cette moyenne, sans toucher au PPF catalogue.
 * - L’intensité % simule un éloignement / un voile, PAS un dimmer (Cosmorrow n’est pas dimmable).
 * - Comparer des kits, pas certifier un DLI de culture.
 */
var LG_EUR_PER_KWH = 0.2;
var LG_BEAM_DEG = 120;
var LG_BOUNCE_MYLAR = 0.25;
var LG_COS_CUTOFF = 0.5;
var LG_CALIB_CACHE = {};

function lgTentSize(tent) {
  var w = tent.wCm || tent.lengthCm || tent.widthCm;
  var d = tent.dCm || tent.depthCm;
  return { wCm: w, dCm: d, hCm: tent.hCm || tent.heightCm || 0 };
}

function lgBarLength(fixture) {
  return fixture.lengthCm || 47;
}

function lgBarWidth(fixture) {
  return fixture.widthCm || 3.2;
}

function lgBarPpf(fixture) {
  return fixture.ppf || fixture.ppfEach || 0;
}

/**
 * Positions des barres dans la tente.
 * layout : "parallel-depth" | "split-per-tray" | "dual-shelf"
 * count  : nombre de barres (ignoré si dual-shelf déjà décrit par fixture.count)
 */
function placements(fixture, tent, layout, count, options) {
  var size = lgTentSize(tent);
  var n = count == null ? fixture.count || 1 : count;
  var mode = layout || fixture.layout || "parallel-depth";
  var lengthCm = lgBarLength(fixture);
  var widthCm = lgBarWidth(fixture);
  var ppf = lgBarPpf(fixture);
  var lights = [];
  var i;
  var halfN;
  var opt = options || {};
  var shelfOpt = opt.shelf != null ? opt.shelf : fixture.shelf;

  if (mode === "split-per-tray") {
    var trays = tent.trays && tent.trays.length ? tent.trays : null;
    if (trays && trays.length) {
      for (i = 0; i < Math.min(n, trays.length); i += 1) {
        var t = trays[i];
        lights.push({
          kind: "bar",
          layout: mode,
          sku: fixture.sku,
          xCm: t.xCm + t.lengthCm / 2,
          yCm: t.yCm + t.depthCm / 2,
          zShelf: 1,
          lengthCm: lengthCm,
          widthCm: widthCm,
          ppf: ppf,
        });
      }
      return lights;
    }
    for (i = 0; i < n; i += 1) {
      lights.push({
        kind: "bar",
        layout: mode,
        sku: fixture.sku,
        xCm: ((i + 0.5) * size.wCm) / n,
        yCm: size.dCm / 2,
        zShelf: 1,
        lengthCm: lengthCm,
        widthCm: widthCm,
        ppf: ppf,
      });
    }
    return lights;
  }

  if (mode === "dual-shelf") {
    // shelf explicite (kit mixte : 2 × COP4065 étage 1, 2 × COP2065 étage 2)
    // → parallèle-profondeur sur CET étage, on n’additionne pas les deux plans.
    if (shelfOpt) {
      for (i = 0; i < n; i += 1) {
        lights.push({
          kind: "bar",
          layout: mode,
          sku: fixture.sku,
          xCm: size.wCm / 2,
          yCm: ((i + 0.5) * size.dCm) / n,
          zShelf: shelfOpt,
          lengthCm: lengthCm,
          widthCm: widthCm,
          ppf: ppf,
        });
      }
      return lights;
    }
    for (var shelf = 1; shelf <= 2; shelf += 1) {
      halfN = shelf === 1 ? Math.ceil(n / 2) : Math.floor(n / 2);
      if (halfN < 1 && n >= 2) halfN = 1;
      for (i = 0; i < halfN; i += 1) {
        lights.push({
          kind: "bar",
          layout: mode,
          sku: fixture.sku,
          xCm: size.wCm / 2,
          yCm: ((i + 0.5) * size.dCm) / Math.max(halfN, 1),
          zShelf: shelf,
          lengthCm: lengthCm,
          widthCm: widthCm,
          ppf: ppf,
        });
      }
    }
    return lights;
  }

  // parallel-depth : barres parallèles au grand côté, espacées sur la profondeur.
  var alongW = size.wCm >= size.dCm;
  for (i = 0; i < n; i += 1) {
    lights.push({
      kind: "bar",
      layout: "parallel-depth",
      sku: fixture.sku,
      xCm: alongW ? size.wCm / 2 : ((i + 0.5) * size.wCm) / n,
      yCm: alongW ? ((i + 0.5) * size.dCm) / n : size.dCm / 2,
      zShelf: 1,
      lengthCm: lengthCm,
      widthCm: widthCm,
      ppf: ppf,
      axis: alongW ? "w" : "d",
    });
  }
  return lights;
}

function lgContributePoint(px, py, ex, ey, h, dPpf) {
  var dx = px - ex;
  var dy = py - ey;
  var r2 = dx * dx + dy * dy + h * h;
  var r = Math.sqrt(r2);
  if (r < 0.8) return 0;
  var cos = h / r;
  if (cos < LG_COS_CUTOFF) return 0;
  var rM = r / 100;
  return (dPpf / Math.PI) * ((cos * cos) / (rM * rM));
}

function lgBarContribution(px, py, light, h, segments) {
  var alongW = light.axis !== "d";
  var half = light.lengthCm / 2;
  var dPpf = light.ppf / segments;
  var sum = 0;
  var i;
  var t;
  if (alongW) {
    for (i = 0; i < segments; i += 1) {
      t = (i + 0.5) / segments;
      sum += lgContributePoint(
        px,
        py,
        light.xCm - half + t * light.lengthCm,
        light.yCm,
        h,
        dPpf
      );
    }
  } else {
    for (i = 0; i < segments; i += 1) {
      t = (i + 0.5) / segments;
      sum += lgContributePoint(
        px,
        py,
        light.xCm,
        light.yCm - half + t * light.lengthCm,
        h,
        dPpf
      );
    }
  }
  return sum;
}

function lgInTray(px, py, tray) {
  return (
    px >= tray.xCm &&
    px < tray.xCm + tray.lengthCm &&
    py >= tray.yCm &&
    py < tray.yCm + tray.depthCm
  );
}

function lgSample(grid, cols, rows, nx, ny) {
  var col = Math.min(cols - 1, Math.max(0, Math.floor(nx * cols)));
  var row = Math.min(rows - 1, Math.max(0, Math.floor(ny * rows)));
  return grid[row * cols + col];
}

/**
 * Facteur pour coller la moyenne du modèle à la PPFD fiche (même zone, même hauteur).
 * Linéaire en PPF : applicable avant le bounce. skipCalib évite la récursion.
 */
function datasheetScale(fixture) {
  if (!fixture || fixture.ppfdAvg == null || !fixture.footprint) return 1;
  var key = fixture.sku || fixture.id || "anon";
  if (Object.prototype.hasOwnProperty.call(LG_CALIB_CACHE, key)) return LG_CALIB_CACHE[key];
  var fp = fixture.footprint;
  var tent = { wCm: fp.w, dCm: fp.d, hCm: 80, trays: [] };
  var raw = simulatePpfd(fixture, tent, fp.hCm, 100, {
    layout: "parallel-depth",
    count: 1,
    skipCalib: true,
    cols: 32,
    rows: 16,
  });
  var scale = raw.avg > 1 ? fixture.ppfdAvg / raw.avg : 1;
  LG_CALIB_CACHE[key] = scale;
  return scale;
}

function compareDatasheet(fixture) {
  if (!fixture || !fixture.footprint) return null;
  var fp = fixture.footprint;
  var tent = { wCm: fp.w, dCm: fp.d, trays: [] };
  var raw = simulatePpfd(fixture, tent, fp.hCm, 100, {
    layout: "parallel-depth",
    count: 1,
    skipCalib: true,
    cols: 32,
    rows: 16,
  });
  var cal = simulatePpfd(fixture, tent, fp.hCm, 100, {
    layout: "parallel-depth",
    count: 1,
    cols: 32,
    rows: 16,
  });
  return {
    sku: fixture.sku,
    datasheet: fixture.ppfdAvg,
    zone: fp,
    modelRaw: raw.avg,
    modelCalibrated: cal.avg,
    scale: datasheetScale(fixture),
    ppfdUnit: "µmol/m²/s",
  };
}

/**
 * Carte PPFD simplifiée.
 * intensityPct : 0–100 (Cosmorrow n’est pas dimmable ; ça simule un voile / un recul).
 * options.layout / options.count / options.bounce / options.cols / options.rows
 */
function simulatePpfd(fixture, tent, heightCm, intensityPct) {
  var options = arguments.length > 4 && arguments[4] ? arguments[4] : {};
  var size = lgTentSize(tent);
  var cols = options.cols || Math.max(16, Math.min(48, Math.round(size.wCm / 4)));
  var rows = options.rows || Math.max(12, Math.min(32, Math.round(size.dCm / 4)));
  var bounce = options.bounce == null ? LG_BOUNCE_MYLAR : options.bounce;
  var scale = (intensityPct == null ? 100 : intensityPct) / 100;
  var calib = options.skipCalib ? 1 : datasheetScale(fixture);
  var layout = options.layout || fixture.layout || "parallel-depth";
  var count = options.count == null ? fixture.count || 1 : options.count;
  var lights = placements(fixture, tent, layout, count, options)
    .filter(function (l) {
      if (options.allShelves) return true;
      var plane = options.shelfPlane == null ? 1 : options.shelfPlane;
      return (l.zShelf || 1) === plane;
    })
    .map(function (l) {
      var copy = {};
      for (var k in l) if (Object.prototype.hasOwnProperty.call(l, k)) copy[k] = l[k];
      copy.ppf = l.ppf * scale * calib;
      return copy;
    });
  var h = Math.max(8, heightCm);
  var cellW = size.wCm / cols;
  var cellD = size.dCm / rows;
  var grid = new Array(cols * rows).fill(0);
  var row;
  var col;
  var px;
  var py;
  var v;
  var li;
  for (row = 0; row < rows; row += 1) {
    for (col = 0; col < cols; col += 1) {
      px = (col + 0.5) * cellW;
      py = (row + 0.5) * cellD;
      v = 0;
      for (li = 0; li < lights.length; li += 1) {
        v += lgBarContribution(px, py, lights[li], h, options.segments || 18);
      }
      grid[row * cols + col] = v;
    }
  }
  var sum = 0;
  var min = Infinity;
  var max = 0;
  var i;
  for (i = 0; i < grid.length; i += 1) {
    v = grid[i];
    sum += v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  var n = grid.length;
  var bounceAdd = bounce * (sum / n);
  if (bounceAdd > 0) {
    for (i = 0; i < n; i += 1) grid[i] += bounceAdd;
    min += bounceAdd;
    max += bounceAdd;
    sum += bounceAdd * n;
  }
  var avg = sum / n;
  var trays = tent.trays || [];
  var trayAvgs = trays.map(function () {
    return { sum: 0, n: 0 };
  });
  var trayAll = 0;
  var trayN = 0;
  var ti;
  for (row = 0; row < rows; row += 1) {
    for (col = 0; col < cols; col += 1) {
      px = (col + 0.5) * cellW;
      py = (row + 0.5) * cellD;
      v = grid[row * cols + col];
      for (ti = 0; ti < trays.length; ti += 1) {
        if (lgInTray(px, py, trays[ti])) {
          trayAvgs[ti].sum += v;
          trayAvgs[ti].n += 1;
          trayAll += v;
          trayN += 1;
        }
      }
    }
  }
  return {
    grid: grid,
    cols: cols,
    rows: rows,
    min: min,
    max: max,
    avg: avg,
    trayAvg: trayN ? trayAll / trayN : avg,
    trays: trayAvgs.map(function (t) {
      return t.n ? t.sum / t.n : 0;
    }),
    center: lgSample(grid, cols, rows, 0.5, 0.5),
    edge: 0.5 * (lgSample(grid, cols, rows, 0.5, 0.08) + lgSample(grid, cols, rows, 0.5, 0.92)),
    corner: lgSample(grid, cols, rows, 0.08, 0.08),
    uniformity: avg > 0 ? min / avg : 0,
    lights: placements(fixture, tent, layout, count, options).filter(function (l) {
      if (options.allShelves) return true;
      var plane = options.shelfPlane == null ? 1 : options.shelfPlane;
      return (l.zShelf || 1) === plane;
    }),
    bounce: bounce,
    heightCm: h,
    intensityPct: intensityPct == null ? 100 : intensityPct,
    model: "lambertien 120° + bounce mylar 0,25, calé sur PPFD moyen fiche — pas un PAR-mètre",
    ppfdUnit: "µmol/m²/s",
    dliUnit: "mol/m²/j",
    calib: calib,
  };
}

function applyUniformBounce(grid, bounce) {
  if (!bounce || !grid || !grid.length) return grid;
  var n = grid.length;
  var sum = 0;
  var i;
  for (i = 0; i < n; i += 1) sum += grid[i];
  var add = bounce * (sum / n);
  if (add <= 0) return grid;
  for (i = 0; i < n; i += 1) grid[i] += add;
  return grid;
}

function summarizePpfd(grid, cols, rows, tent) {
  var size = tent ? lgTentSize(tent) : { wCm: 120, dCm: 60 };
  var sum = 0;
  var min = Infinity;
  var max = 0;
  var i;
  var v;
  for (i = 0; i < grid.length; i += 1) {
    v = grid[i];
    sum += v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  var avg = grid.length ? sum / grid.length : 0;
  var trays = (tent && tent.trays) || [];
  var trayAvgs = trays.map(function () {
    return { sum: 0, n: 0 };
  });
  var trayAll = 0;
  var trayN = 0;
  var row;
  var col;
  var px;
  var py;
  var ti;
  var cellW = size.wCm / cols;
  var cellD = size.dCm / rows;
  for (row = 0; row < rows; row += 1) {
    for (col = 0; col < cols; col += 1) {
      px = (col + 0.5) * cellW;
      py = (row + 0.5) * cellD;
      v = grid[row * cols + col];
      for (ti = 0; ti < trays.length; ti += 1) {
        if (lgInTray(px, py, trays[ti])) {
          trayAvgs[ti].sum += v;
          trayAvgs[ti].n += 1;
          trayAll += v;
          trayN += 1;
        }
      }
    }
  }
  return {
    min: min,
    max: max,
    avg: avg,
    trayAvg: trayN ? trayAll / trayN : avg,
    trays: trayAvgs.map(function (t) {
      return t.n ? t.sum / t.n : 0;
    }),
    center: lgSample(grid, cols, rows, 0.5, 0.5),
    edge: 0.5 * (lgSample(grid, cols, rows, 0.5, 0.08) + lgSample(grid, cols, rows, 0.5, 0.92)),
    corner: lgSample(grid, cols, rows, 0.08, 0.08),
    uniformity: avg > 0 ? min / avg : 0,
  };
}

/** DLI en mol/m²/j. ppfd en µmol/m²/s, hours = photopériode. */
function dli(ppfd, hours) {
  return (ppfd * hours * 3600) / 1e6;
}

/**
 * kWh / an. intensity = 0–100 (fraction de puissance électrique).
 * Cosmorrow n’est pas dimmable : un voile ou un recul ne baisse pas les watts.
 * Toujours passer 100 pour une facture Cosmorrow.
 */
function yearlyKwh(watts, hours, intensity) {
  var pct = intensity == null ? 100 : intensity;
  return (watts * (pct / 100) * hours * 365) / 1000;
}

function yearlyCost(kwh, eurPerKwh) {
  var tariff = eurPerKwh == null ? LG_EUR_PER_KWH : eurPerKwh;
  return kwh * tariff;
}

window.LG_OPTICS = {
  BEAM_DEG: LG_BEAM_DEG,
  BOUNCE_MYLAR: LG_BOUNCE_MYLAR,
  EUR_PER_KWH: LG_EUR_PER_KWH,
  COS_CUTOFF: LG_COS_CUTOFF,
  PPFD_UNIT: "µmol/m²/s",
  PPF_UNIT: "µmol/s",
  PPE_UNIT: "µmol/J",
  DLI_UNIT: "mol/m²/j",
  placements: placements,
  simulatePpfd: simulatePpfd,
  datasheetScale: datasheetScale,
  compareDatasheet: compareDatasheet,
  applyUniformBounce: applyUniformBounce,
  summarizePpfd: summarizePpfd,
  dli: dli,
  yearlyKwh: yearlyKwh,
  yearlyCost: yearlyCost,
};
