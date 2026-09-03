/**
 * Smoke test Node : charge les data et vérifie le matching de kits.
 */
var fs = require("fs");
var vm = require("vm");
var ctx = { window: {}, console: console };
ctx.window = ctx;
function load(p) {
  vm.runInNewContext(fs.readFileSync(p, "utf8"), ctx, { filename: p });
}
load("js/data/projects.js");
load("js/data/fixtures.js");
load("js/data/psus.js");
load("js/data/tents.js");
load("js/data/kits.js");
load("js/lib/match.js");
load("js/data/species.js");
load("js/data/protocols.js");
load("js/data/diagnostic.js");
load("js/lib/format.js");
load("js/lib/optics.js");

load("js/data/nutrients.js");

var assert = require("assert");
assert.equal(ctx.LgFmt.units.ppfd, "µmol/m²/s");
assert.equal(ctx.LgFmt.units.dli, "mol/m²/j");
assert.ok(ctx.LgFmt.ppfd(205).indexOf("µmol/m²/s") >= 0);
assert.ok(ctx.LgFmt.dli(10.08).indexOf("mol/m²/j") >= 0);
assert.equal(Math.round(ctx.LG_OPTICS.dli(200, 14) * 10) / 10, 10.1);

var fs20 = ctx.LG_FIXTURES.find(function (f) { return f.sku === "COP20FS"; });
var fs40 = ctx.LG_FIXTURES.find(function (f) { return f.sku === "COP40FS"; });
var g40 = ctx.LG_FIXTURES.find(function (f) { return f.sku === "COP4065"; });
assert.equal(fs20.ppfdAvg, 238);
assert.equal(fs40.ppfdAvg, 240);
assert.equal(g40.ppfdAvg, 205);
assert.equal(fs20.spectrum.kind, "full-spectrum");
assert.equal(fs20.spectrum.channels.length, 4);
assert.equal(g40.spectrum.channels[0].pct, 100);

ctx.LG_FIXTURES.forEach(function (f) {
  assert.ok(f.ppf > 0 && f.ppe > 0, "photométrie " + f.sku);
  assert.ok(f.parNm && f.parNm[0] === 400 && f.parNm[1] === 700, "PAR " + f.sku);
  assert.ok(f.spectrum && f.spectrum.channels.length >= 1, "spectre " + f.sku);
});
assert.equal(ctx.LG_FIXTURES.length, 4);
assert.equal(ctx.LG_PSUS.length, 8);
assert.ok(ctx.LG_KITS.length >= 12);
assert.ok(ctx.LG_SPECIES.length >= 12);
assert.equal(ctx.LG_PROTOCOLS.length, 7);
assert.equal(ctx.LG_PROJECTS.length, 7);
assert.ok(ctx.LG_NUTRIENTS.fertilizers.products.length >= 3);
assert.ok(ctx.LG_NUTRIENTS.pests.items.length >= 4);
assert.ok(
  ctx.LG_DIAGNOSTIC.trees.some(function (t) { return t.id === "ravageurs"; }),
  "arbre ravageurs"
);
assert.ok(
  ctx.LG_DIAGNOSTIC.trees.some(function (t) { return t.id === "hiver-tente"; }),
  "arbre dormance manquée"
);
assert.equal(ctx.LG_PROJECTS.filter(function (p) { return p.id === "collection"; }).length, 1);
assert.equal(ctx.LG_PROJECTS.filter(function (p) { return p.id === "rouge"; }).length, 1);

var sarr = ctx.LG_SPECIES.find(function (s) { return s.id === "sarracenia-upright"; });
assert.ok(/larges/i.test(sarr.substrate), "Sarracenia : pots larges, pas profonds");
assert.ok(!/pots profonds 15/.test(sarr.substrate));

var dorm = ctx.LG_PROTOCOLS.find(function (p) { return p.id === "dormancy"; });
assert.ok(/dehors/i.test(dorm.summary), "dormance : dehors d’abord");

var low = ctx.LG_SPECIES.find(function (s) { return s.id === "nepenthes-lowland"; });
assert.ok(!/ventricosa/i.test(low.latin), "ventricosa n’est pas une lowland");
assert.ok(/gracilis/i.test(low.latin));

var dion = ctx.LG_SPECIES.find(function (s) { return s.id === "dionaea"; });
assert.ok(/poils sensitifs/i.test(dion.traps), "dionée : massage des poils si proie morte");
assert.ok(/mai–septembre|mai-septembre/i.test(dion.tentTips), "dionée : été dehors FR/BE");

var prod = ctx.LG_PROTOCOLS.find(function (p) { return p.id === "production"; });
assert.ok(/dehors/i.test(prod.summary), "production : été dehors");

var never = ctx.LG_NUTRIENTS.fertilizers.never.join(" ");
assert.ok(/coco/i.test(never), "coco interdit");
assert.ok(/bruyère/i.test(never), "terre de bruyère rayon interdite");

var ping = ctx.LG_SPECIES.find(function (s) { return s.id === "pinguicula-mexican"; });
assert.ok(/gypse/i.test(ping.substrate), "gypsicola : gypse, pas tourbe");

var utric = ctx.LG_SPECIES.find(function (s) { return s.id === "utricularia-terrestrial"; });
assert.notEqual(utric.climate, "temperate", "sandersonii/livida ne sont pas des tempérées à 5 °C");

var dros = ctx.LG_SPECIES.find(function (s) { return s.id === "drosophyllum"; });
assert.ok(!/terre de bruyère non fertilisée/i.test(dros.substrate));
assert.ok(/sable siliceux 70/i.test(dros.substrate));

var sarrLow = ctx.LG_SPECIES.find(function (s) { return s.id === "sarracenia-low"; });
assert.ok(!/\bminor\b/i.test(sarrLow.latin), "S. minor n’est pas une basse");
assert.ok(/\bminor\b/i.test(sarr.latin), "S. minor va avec les dressées");

var cap = ctx.LG_SPECIES.find(function (s) { return s.id === "drosera-capensis"; });
assert.ok(/binata/i.test(cap.latin), "D. binata avec les capensis, pas l’hibernacle");
var dtemp = ctx.LG_SPECIES.find(function (s) { return s.id === "drosera-temperate"; });
assert.ok(!/\bbinata\b/i.test(dtemp.latin), "binata hors latin tempérées");

var ceph = ctx.LG_SPECIES.find(function (s) { return s.id === "cephalotus"; });
assert.ok(/Céphalote/.test(ceph.common), "Céphalote, pas Céphatote");
assert.ok(!/Céphatote/.test(ceph.common));

assert.ok(/hampe/i.test(dion.warnings.join(" ")), "dionée : hampe coupée sur un jeune");
assert.ok(!/pas encore de piège/.test(dion.seedlingNotes), "dionée : les 1res feuilles ont déjà des mini-pièges");
assert.ok(/petits pièges/.test(dion.seedlingNotes), "dionée : mini-pièges dès les vraies feuilles");

assert.ok(/ssp\. purpurea/i.test(sarrLow.dormancyNote), "purpurea nord vs golfe");
assert.ok(/venosa/i.test(sarrLow.dormancyNote), "venosa moins rustique");

var high = ctx.LG_SPECIES.find(function (s) { return s.id === "nepenthes-highland"; });
assert.ok(/16–20|16-20/.test(high.dormancyNote + high.tentTips + high.warnings.join(" ")), "ventricosa : nuits intermédiaires");
assert.ok(high.tempNight[0] >= 12, "fiche highland : ne pas coller 10 °C à ventricosa");

var pingT = ctx.LG_SPECIES.find(function (s) { return s.id === "pinguicula-temperate"; });
assert.ok(/n’en fait pas|n'en fait pas/.test(pingT.dormancyNote), "lusitanica n’est pas un hibernacle");

var utricEpi = ctx.LG_SPECIES.find(function (s) { return s.id === "utricularia-epiphytic"; });
assert.ok(/humboldtii/i.test(utricEpi.waterNote), "humboldtii : eau, pas seulement brume");

var drosDormWarn = ctx.LgMatch.genreWarnings("dormance", ["drosera"]);
assert.ok(
  drosDormWarn.some(function (w) {
    return /capensis|binata/i.test(w);
  }),
  "drosera + dormance : pas les capensis au frigo"
);

var apropos = fs.readFileSync("a-propos.html", "utf8");
assert.ok(!/infra-rouge lointain/i.test(apropos), "far-red ≠ infra-rouge lointain");
assert.ok(/rouge lointain/i.test(apropos), "660 nm ≠ rouge lointain 730 nm");
assert.ok(/feuillage/i.test(apropos), "PPFD au feuillage, pas « canopée »");

var r = ctx.LgMatch.matchKit({
  projet: "germoir",
  tenteId: "tent-120x60",
  budget: "sous-150",
  hygro: "moyenne",
  dormance: false,
  genres: ["sarracenia", "drosera", "dionaea"],
});
assert.ok(r.kit, "kit attendu");
assert.equal(r.kit.id, "kit-germoir-120x60");
assert.equal(r.protocolId, "seedling");

var trop = ctx.LgMatch.matchKit({
  projet: "tropicale",
  tenteId: "tent-90x60",
  budget: "150-300",
  hygro: "haute",
  dormance: false,
  genres: ["nepenthes"],
});
assert.ok(trop.kit.projectIds.indexOf("tropical") >= 0);

var tent = ctx.LG_TENTS.find(function (t) { return t.id === "tent-120x60"; });
var fx = ctx.LG_FIXTURES.find(function (f) { return f.sku === "COP4065"; });
var sim = ctx.LG_OPTICS.simulatePpfd(fx, tent, 15, 100, { layout: "parallel-depth", count: 2, cols: 24, rows: 12 });
assert.ok(sim.avg > 50 && sim.avg < 800, "PPFD moyen raisonnable: " + sim.avg);
assert.equal(sim.ppfdUnit, "µmol/m²/s");

ctx.LG_FIXTURES.forEach(function (f) {
  var zone = { wCm: f.footprint.w, dCm: f.footprint.d, trays: [] };
  var cal = ctx.LG_OPTICS.simulatePpfd(f, zone, f.footprint.hCm, 100, {
    layout: "parallel-depth",
    count: 1,
    cols: 32,
    rows: 16,
  });
  var err = Math.abs(cal.avg - f.ppfdAvg) / f.ppfdAvg;
  assert.ok(err < 0.05, f.sku + " calage " + cal.avg + " vs fiche " + f.ppfdAvg);
  var raw = ctx.LG_OPTICS.simulatePpfd(f, zone, f.footprint.hCm, 100, {
    layout: "parallel-depth",
    count: 1,
    skipCalib: true,
    cols: 32,
    rows: 16,
  });
  assert.ok(raw.avg < f.ppfdAvg, f.sku + " modèle brut sous la fiche");
});
assert.equal(fs20.spectrum.share, "diodes");
assert.equal(fs20.spectrum.channels[0].peakNm[0], 450);
assert.equal(Math.round(ctx.LG_OPTICS.yearlyKwh(80, 14, 100) * 10) / 10, 408.8);
assert.ok(
  ctx.LG_OPTICS.yearlyKwh(80, 14, 40) < ctx.LG_OPTICS.yearlyKwh(80, 14, 100),
  "yearlyKwh ne scale la facture que si on lui passe un % électrique"
);
var blob = JSON.stringify(ctx.LG_SPECIES) + JSON.stringify(ctx.LG_PROTOCOLS) + JSON.stringify(ctx.LG_PROJECTS) + JSON.stringify(ctx.LG_DIAGNOSTIC);
var stripped = blob
  .replace(/µmol\/m²\/s/g, "")
  .replace(/µmol\/s/g, "")
  .replace(/mol\/m²\/j/g, "");
assert.ok(stripped.indexOf("µmol") < 0, "PPFD encore en µmol nu dans espèces/protocoles/projets/diagnostic");
assert.ok(!/\d\s*mol[^/]/.test(stripped), "DLI encore en mol nu");

var mixte = ctx.LG_KITS.find(function (k) { return k.id === "kit-mixte-120x60"; });
assert.ok(mixte);
var topBar = mixte.bars[0];
var lightsTop = ctx.LG_OPTICS.placements(fx, tent, topBar.layout, topBar.qty, { shelf: topBar.shelf });
assert.equal(lightsTop.length, 2, "étage haut = 2 barres, pas un split 1+1");
assert.ok(lightsTop.every(function (l) { return l.zShelf === 1; }));
var dualFour = ctx.LG_OPTICS.placements(ctx.LG_FIXTURES[0], tent, "dual-shelf", 4);
var dualShelf1 = dualFour.filter(function (l) { return l.zShelf === 1; });
assert.equal(dualShelf1.length, 2);

var kitIds = {};
ctx.LG_KITS.forEach(function (k) {
  if (kitIds[k.id]) throw new Error("kit id dupliqué: " + k.id);
  kitIds[k.id] = true;
});

ctx.LG_DIAGNOSTIC.trees.forEach(function (tree) {
  if (!tree.nodes[tree.startId]) {
    throw new Error("startId manquant " + tree.id + " " + tree.startId);
  }
  Object.keys(tree.nodes).forEach(function (id) {
    (tree.nodes[id].answers || []).forEach(function (a) {
      if (a.nextId && !tree.nodes[a.nextId]) {
        throw new Error("nœud manquant " + tree.id + " " + a.nextId);
      }
    });
  });
});

var g60 = ctx.LgMatch.matchKit({
  projet: "germoir",
  tenteId: "tent-60x60",
  budget: "sous-150",
  hygro: "moyenne",
  dormance: false,
  genres: ["drosera"],
});
assert.ok(g60.kit, "kit 60x60 germoir attendu");
assert.equal(g60.kit.id, "kit-germoir-60x60");

var t120 = ctx.LgMatch.matchKit({
  projet: "collection",
  tenteId: "tent-120x120",
  budget: "peu-importe",
  hygro: "moyenne",
  dormance: false,
  genres: ["sarracenia"],
});
assert.ok(t120.kit, "kit 120x120 attendu");
assert.equal(t120.kit.tentId, "tent-120x120");
assert.ok(t120.kit.projectIds.indexOf("production") >= 0);

var tropDorm = ctx.LgMatch.matchKit({
  projet: "tropicale",
  tenteId: "tent-90x60",
  budget: "150-300",
  hygro: "haute",
  dormance: true,
  genres: ["nepenthes"],
});
assert.ok(
  tropDorm.warnings.some(function (w) {
    return /tropicale/i.test(w);
  }),
  "warning dormance + tropicale"
);

console.log("SMOKE OK", r.kit.name, "PPFD moy", Math.round(sim.avg));
