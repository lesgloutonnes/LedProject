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
load("js/lib/optics.js");

load("js/data/nutrients.js");

var assert = require("assert");
assert.equal(ctx.TOURBIERE_FIXTURES.length, 4);
assert.equal(ctx.TOURBIERE_PSUS.length, 8);
assert.ok(ctx.TOURBIERE_KITS.length >= 12);
assert.ok(ctx.TOURBIERE_SPECIES.length >= 12);
assert.equal(ctx.TOURBIERE_PROTOCOLS.length, 7);
assert.equal(ctx.TOURBIERE_PROJECTS.length, 7);
assert.ok(ctx.TOURBIERE_NUTRIENTS.fertilizers.products.length >= 3);
assert.ok(ctx.TOURBIERE_NUTRIENTS.pests.items.length >= 4);
assert.ok(
  ctx.TOURBIERE_DIAGNOSTIC.trees.some(function (t) { return t.id === "ravageurs"; }),
  "arbre ravageurs"
);
assert.ok(
  ctx.TOURBIERE_DIAGNOSTIC.trees.some(function (t) { return t.id === "hiver-tente"; }),
  "arbre dormance manquée"
);
assert.equal(ctx.TOURBIERE_PROJECTS.filter(function (p) { return p.id === "collection"; }).length, 1);
assert.equal(ctx.TOURBIERE_PROJECTS.filter(function (p) { return p.id === "rouge"; }).length, 1);

var sarr = ctx.TOURBIERE_SPECIES.find(function (s) { return s.id === "sarracenia-upright"; });
assert.ok(/larges/i.test(sarr.substrate), "Sarracenia : pots larges, pas profonds");
assert.ok(!/pots profonds 15/.test(sarr.substrate));

var dorm = ctx.TOURBIERE_PROTOCOLS.find(function (p) { return p.id === "dormancy"; });
assert.ok(/dehors/i.test(dorm.summary), "dormance : dehors d’abord");

var r = ctx.TourbiereMatch.matchKit({
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

var trop = ctx.TourbiereMatch.matchKit({
  projet: "tropicale",
  tenteId: "tent-90x60",
  budget: "150-300",
  hygro: "haute",
  dormance: false,
  genres: ["nepenthes"],
});
assert.ok(trop.kit.projectIds.indexOf("tropical") >= 0);

var tent = ctx.TOURBIERE_TENTS.find(function (t) { return t.id === "tent-120x60"; });
var fx = ctx.TOURBIERE_FIXTURES.find(function (f) { return f.sku === "COP4065"; });
var sim = ctx.TOURBIERE_OPTICS.simulatePpfd(fx, tent, 15, 100, { layout: "parallel-depth", count: 2, cols: 24, rows: 12 });
assert.ok(sim.avg > 50 && sim.avg < 800, "PPFD moyen raisonnable: " + sim.avg);

var kitIds = {};
ctx.TOURBIERE_KITS.forEach(function (k) {
  if (kitIds[k.id]) throw new Error("kit id dupliqué: " + k.id);
  kitIds[k.id] = true;
});

ctx.TOURBIERE_DIAGNOSTIC.trees.forEach(function (tree) {
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

var g60 = ctx.TourbiereMatch.matchKit({
  projet: "germoir",
  tenteId: "tent-60x60",
  budget: "sous-150",
  hygro: "moyenne",
  dormance: false,
  genres: ["drosera"],
});
assert.ok(g60.kit, "kit 60x60 germoir attendu");
assert.equal(g60.kit.id, "kit-germoir-60x60");

var t120 = ctx.TourbiereMatch.matchKit({
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

var tropDorm = ctx.TourbiereMatch.matchKit({
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
