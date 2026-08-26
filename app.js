(function () {
  const TENT = { lengthCm: 120, depthCm: 60, areaM2: 0.72 };
  const KWH = 0.2001;
  // Deux bacs à semis 60 × 40 cm : 60 cm dans le sens de la tente, 40 cm de profondeur, centrés.
  const TRAYS = [
    { id: "A", label: "Bac A", xCm: 0, yCm: 10, lengthCm: 60, depthCm: 40 },
    { id: "B", label: "Bac B", xCm: 60, yCm: 10, lengthCm: 60, depthCm: 40 },
  ];
  const VERDICT = {
    recommended: "Choix n°1",
    pertray: "1 barre / bac",
    premium: "Premium",
    good: "Solide",
    keep: "À garder",
    caution: "Prudence",
    avoid: "À éviter",
  };

  const FIXTURES = [
    {
      id: "cosmorrow-2x90",
      name: "2 × Cosmorrow Growing 90 cm",
      shortName: "2 Cosmorrow 90",
      brand: "Secret Jardin",
      kind: "bar",
      layout: "spread",
      count: 2,
      wattsEach: 40,
      lengthCm: 87,
      widthCm: 3.2,
      ppfEach: 101,
      ppe: 2.7,
      spectrum: "100 % 6500 K. Fiche COP 2023-09 : 101 µmol/s, 2,7 µmol/J, zone 120 × 60 à 15 cm.",
      dimmable: false,
      ip: "IP65",
      priceHint: "Kit 2 × COP4065 + COM2X40 ≈ 130–145 €",
      stock: "Catalogue Secret Jardin, livrable (growland, desjop, Octopus).",
      buy: "2 × COP4065 + alim COM2X40 (parfois notée COM80D). Pas le Full Spectrum 70 cm.",
      notes: "Le job des deux bacs : 202 µmol/s, 80 W, blanc froid, peu de chaleur, 15 cm au-dessus du terreau. Meilleur rapport photons / euros / géométrie.",
      verdict: "recommended",
    },
    {
      id: "hortimol-2x40-60",
      name: "2 × Hortimol TLED 40 W 60 cm",
      shortName: "2 Hortimol 60 cm",
      brand: "Hortimol",
      kind: "bar",
      layout: "split",
      count: 2,
      wattsEach: 40,
      lengthCm: 60,
      widthCm: 13,
      ppfEach: 92,
      ppe: 2.3,
      spectrum: "FSG 4000 K, fort bleu 450 nm + un peu de 660 nm + IR. Osram LM-80.",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 89 € × 2 ≈ 178 € (topgrow.be, 230 V, pas d’alim à part)",
      stock: "Hortimol Belgique, 3 ans, daisy-chain 2 par 2.",
      buy: "TLED 40 W FSG 60 cm, prise EU. Une barre centrée sur chaque bac 60 × 40.",
      notes: "Le constructeur donne 60 × 60 cm par barre. Ici : une barre = un bac. 184 µmol/s, Osram, 230 V plug & play.",
      verdict: "pertray",
    },
    {
      id: "hortimol-2x40-120",
      name: "2 × Hortimol TLED 40 W 120 cm",
      shortName: "2 Hortimol 40 W",
      brand: "Hortimol",
      kind: "bar",
      layout: "spread",
      count: 2,
      wattsEach: 40,
      lengthCm: 120,
      widthCm: 13,
      ppfEach: 92,
      ppe: 2.3,
      spectrum: "FSG 4000 K, Osram + IR. Conçu boutures / jeunes plantes.",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 115–130 € × 2 ≈ 250 €",
      stock: "Fiche hortimol.net : 92 µmol/s, footprint 120 × 45 cm par barre.",
      buy: "TLED 40 W FSG 120 cm. Deux barres sur la profondeur, 15 et 45 cm.",
      notes: "Même budget photonique que le 60 cm × 2, mais toute la longueur est couverte. Un cran au-dessus des Slim, sans le surplus des 60 W.",
      verdict: "good",
    },
    {
      id: "sanlight-4x20",
      name: "4 × SANlight FLEX II 20",
      shortName: "4 SANlight Flex",
      brand: "SANlight",
      kind: "bar",
      layout: "spread",
      count: 4,
      wattsEach: 19,
      lengthCm: 99.5,
      widthCm: 3.3,
      ppfEach: 50,
      ppe: 2.63,
      spectrum: "400–780 nm, far-red relevé. Conçu boutures, in-vitro, jeunes plantes.",
      dimmable: false,
      ip: "IP68",
      priceHint: "≈ 62 € × 4 + driver 150 W 57 € + câbles ≈ 350–400 €",
      stock: "Fiche SANlight : 50 µmol/s, 995 mm, 3 ans, L90 > 100 000 h. Le 25 (1345 mm) est trop long pour 120 cm.",
      buy: "4 × FLEX II 20 (AA2002) + driver 150 W (AI2006) + répartiteurs Y + câbles.",
      notes: "Le vrai premium : même ~200 µmol/s que 2 Cosmorrow, IP68, spectre jeunes plants. Pas plus de photons, trois fois le prix, câblage à composer.",
      verdict: "premium",
    },
    {
      id: "hortimol-2x60",
      name: "2 × Hortimol TLED 60 W 120 cm",
      shortName: "2 Hortimol 60 W",
      brand: "Hortimol",
      kind: "bar",
      layout: "spread",
      count: 2,
      wattsEach: 60,
      lengthCm: 120,
      widthCm: 13,
      ppfEach: 138,
      ppe: 2.3,
      spectrum: "FSG 4000 K, Osram LM-80 + IR.",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 115 € × 2 ≈ 230 € (microfluo.be)",
      stock: "1 barre = footprint constructeur 120 × 60. Version 2,5 µmol/J (150 µmol/s) existe, plus rare.",
      buy: "TLED 60 W FSG 2,3 µmol/J 120 cm. Si tu veux garder Sarracenia adultes dans la même tente ensuite.",
      notes: "276 µmol/s : trop punchy pour germinations à 20 cm (centre ~300 µmol). Monte à 30–35 cm, ou réserve ça à l’après-semis.",
      verdict: "good",
    },
    {
      id: "fecida-130",
      name: "Fecida actuelle 130 W",
      shortName: "Fecida 130 W",
      brand: "FECiDA",
      kind: "panel",
      layout: "spread",
      count: 1,
      wattsEach: 130,
      lengthCm: 31,
      widthCm: 21,
      ppfEach: 286,
      ppe: 2.2,
      spectrum: "3000 K + 5000 K + 660 nm + UV/IR. Dimmer 0–100 %.",
      dimmable: true,
      ip: "IP20",
      priceHint: "Déjà achetée — à conserver",
      stock: "CR600, conçue pour 60 × 60 cm, pas 120 × 60.",
      buy: "Ne rien racheter. Appoint sur un bac, jamais comme seule source des deux plateaux.",
      notes: "Assez de photons (~286 µmol/s) mais un hotspot 31 × 21 cm. Sur deux bacs, un plateau grille, l’autre étiole.",
      verdict: "keep",
    },
    {
      id: "slim-2x93",
      name: "2 × SuperFish Slim LED 93",
      shortName: "2 Slim 93",
      brand: "SuperFish",
      kind: "bar",
      layout: "spread",
      count: 2,
      wattsEach: 51,
      lengthCm: 93,
      widthCm: 2.2,
      ppfEach: 91,
      ppe: 1.78,
      spectrum: "Blanc 7000 K, CRI 96. Pas de pic 660 nm dédié.",
      dimmable: true,
      ip: "IP67",
      priceHint: "≈ 85–105 € × 2",
      stock: "Fiche actuelle : 51 W / 3025 lm / PAR 230 à 20 cm.",
      buy: "Éviter pour ce job. L’IP67 n’achète pas des photons.",
      notes: "182 µmol/s pour 102 W, moins que 2 Cosmorrow à 80 W. Le PAR 230 est un pic, pas un flux à additionner.",
      verdict: "caution",
    },
    {
      id: "florastar-2x42-6500",
      name: "2 × FloraStar TLED 42 W 6500 K",
      shortName: "2 FloraStar 6500 K",
      brand: "FloraStar",
      kind: "bar",
      layout: "spread",
      count: 2,
      wattsEach: 42,
      lengthCm: 104,
      widthCm: 4,
      ppfEach: 80,
      ppe: 1.9,
      spectrum: "6500 K. PPF boutique incohérent : 51, 62 ou 98 µmol/s.",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 95–118 € × 2",
      stock: "LED-FTL042B / LED-FTL042G selon vendeur.",
      buy: "Sans fiche PPF unique, on ne le choisit pas à la place du Cosmorrow.",
      notes: "PPF médian 80 µmol/s. Trop d’incertitude pour deux bacs de semis.",
      verdict: "caution",
    },
    {
      id: "florastar-2x42-2700",
      name: "2 × FloraStar 42 W 2700 K",
      shortName: "2 FloraStar 2700 K",
      brand: "FloraStar",
      kind: "bar",
      layout: "spread",
      count: 2,
      wattsEach: 42,
      lengthCm: 104,
      widthCm: 4,
      ppfEach: 71,
      ppe: 1.69,
      spectrum: "2700 K floraison — trop chaud, étiolement des semis.",
      dimmable: false,
      ip: "IP65",
      priceHint: "Proposition Octopus refusée",
      stock: "1,69 µmol/J.",
      buy: "Ne pas reprendre.",
      notes: "142 µmol/s à deux, spectre floraison. Inutile sur du Sarracenia / Drosera au germoir.",
      verdict: "avoid",
    },
  ];

  const SPECIES = [
    { id: "seedling", label: "Semis", ppfd: [150, 250] },
    { id: "drosera", label: "Drosera", ppfd: [200, 400] },
    { id: "dionaea", label: "Dionaea", ppfd: [250, 400] },
    { id: "sarr-young", label: "Sarracenia jeunes", ppfd: [250, 400] },
    { id: "sarr-adult", label: "Sarracenia adultes / rouge", ppfd: [300, 500] },
  ];

  const state = {
    fixtureId: "cosmorrow-2x90",
    height: 20,
    hours: 14,
    intensity: 100,
    speciesId: "seedling",
    tab: "comparer",
  };

  const nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  const euro0 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const euro2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

  function fixtureById(id) {
    return FIXTURES.find((f) => f.id === id) || FIXTURES[0];
  }
  function watts(f) {
    return f.wattsEach * f.count;
  }
  function ppf(f) {
    return f.ppfEach * f.count;
  }
  function dli(ppfd, hours) {
    return (ppfd * hours * 3600) / 1e6;
  }
  function yearlyKwh(w, hours, intensity) {
    return (w * (intensity / 100) * hours * 365) / 1000;
  }
  function yearlyCost(kwh) {
    return kwh * KWH;
  }

  function inTray(px, py, tray) {
    return px >= tray.xCm && px < tray.xCm + tray.lengthCm && py >= tray.yCm && py < tray.yCm + tray.depthCm;
  }

  function placements(fixture) {
    if (fixture.kind === "panel") {
      return [
        {
          kind: "panel",
          xCm: TENT.lengthCm / 2,
          yCm: TENT.depthCm / 2,
          lengthCm: fixture.lengthCm,
          widthCm: fixture.widthCm,
          ppf: fixture.ppfEach,
        },
      ];
    }
    const lights = [];
    if (fixture.layout === "split") {
      for (let i = 0; i < fixture.count; i += 1) {
        lights.push({
          kind: "bar",
          xCm: ((i + 0.5) * TENT.lengthCm) / fixture.count,
          yCm: TENT.depthCm / 2,
          lengthCm: fixture.lengthCm,
          widthCm: fixture.widthCm,
          ppf: fixture.ppfEach,
        });
      }
      return lights;
    }
    for (let i = 0; i < fixture.count; i += 1) {
      lights.push({
        kind: "bar",
        xCm: TENT.lengthCm / 2,
        yCm: ((i + 0.5) * TENT.depthCm) / fixture.count,
        lengthCm: fixture.lengthCm,
        widthCm: fixture.widthCm,
        ppf: fixture.ppfEach,
      });
    }
    return lights;
  }

  function contributePoint(px, py, ex, ey, h, dPpf) {
    const dx = px - ex;
    const dy = py - ey;
    const r2 = dx * dx + dy * dy + h * h;
    const r = Math.sqrt(r2);
    if (r < 0.8) return 0;
    const cos = h / r;
    if (cos < 0.5) return 0;
    const rM = r / 100;
    return (dPpf / Math.PI) * ((cos * cos) / (rM * rM));
  }

  function barContribution(px, py, light, h, segments) {
    const half = light.lengthCm / 2;
    const dPpf = light.ppf / segments;
    let sum = 0;
    for (let i = 0; i < segments; i += 1) {
      const t = (i + 0.5) / segments;
      const ex = light.xCm - half + t * light.lengthCm;
      sum += contributePoint(px, py, ex, light.yCm, h, dPpf);
    }
    return sum;
  }

  function panelContribution(px, py, light, h) {
    const nx = 6;
    const ny = 4;
    const dPpf = light.ppf / (nx * ny);
    let sum = 0;
    for (let i = 0; i < nx; i += 1) {
      for (let j = 0; j < ny; j += 1) {
        const ex = light.xCm - light.lengthCm / 2 + ((i + 0.5) / nx) * light.lengthCm;
        const ey = light.yCm - light.widthCm / 2 + ((j + 0.5) / ny) * light.widthCm;
        sum += contributePoint(px, py, ex, ey, h, dPpf);
      }
    }
    return sum;
  }

  function sample(grid, cols, rows, nx, ny) {
    const col = Math.min(cols - 1, Math.max(0, Math.floor(nx * cols)));
    const row = Math.min(rows - 1, Math.max(0, Math.floor(ny * rows)));
    return grid[row * cols + col];
  }

  function simulate(fixture, heightCm, intensity, bounce) {
    const cols = 32;
    const rows = 16;
    const cellW = TENT.lengthCm / cols;
    const cellD = TENT.depthCm / rows;
    const scale = intensity / 100;
    const lights = placements(fixture).map((l) => Object.assign({}, l, { ppf: l.ppf * scale }));
    const h = Math.max(8, heightCm);
    const grid = new Array(cols * rows).fill(0);
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const px = (col + 0.5) * cellW;
        const py = (row + 0.5) * cellD;
        let v = 0;
        for (const light of lights) {
          v += light.kind === "panel" ? panelContribution(px, py, light, h) : barContribution(px, py, light, h, 18);
        }
        grid[row * cols + col] = v;
      }
    }
    let sum = 0;
    let min = Infinity;
    let max = 0;
    for (const v of grid) {
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
    const n = grid.length;
    const bounceAdd = bounce * (sum / n);
    if (bounceAdd > 0) {
      for (let i = 0; i < n; i += 1) grid[i] += bounceAdd;
      min += bounceAdd;
      max += bounceAdd;
      sum += bounceAdd * n;
    }
    const avg = sum / n;
    const traySums = TRAYS.map(() => ({ sum: 0, n: 0 }));
    let trayAll = 0;
    let trayN = 0;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const px = (col + 0.5) * cellW;
        const py = (row + 0.5) * cellD;
        const v = grid[row * cols + col];
        TRAYS.forEach((tray, i) => {
          if (inTray(px, py, tray)) {
            traySums[i].sum += v;
            traySums[i].n += 1;
            trayAll += v;
            trayN += 1;
          }
        });
      }
    }
    return {
      grid,
      cols,
      rows,
      min,
      max,
      avg,
      trayAvg: trayN ? trayAll / trayN : 0,
      trayA: traySums[0].n ? traySums[0].sum / traySums[0].n : 0,
      trayB: traySums[1].n ? traySums[1].sum / traySums[1].n : 0,
      center: sample(grid, cols, rows, 0.5, 0.5),
      edge: 0.5 * (sample(grid, cols, rows, 0.5, 0.08) + sample(grid, cols, rows, 0.5, 0.92)),
      corner: sample(grid, cols, rows, 0.08, 0.08),
      uniformity: avg > 0 ? min / avg : 0,
      lights: placements(fixture),
    };
  }

  const STOPS = [
    { t: 0, c: [12, 26, 22] },
    { t: 80, c: [22, 56, 44] },
    { t: 150, c: [42, 106, 74] },
    { t: 250, c: [196, 160, 53] },
    { t: 400, c: [212, 101, 58] },
    { t: 550, c: [155, 45, 58] },
    { t: 750, c: [243, 234, 210] },
  ];

  function ppfdRgb(v) {
    if (v <= STOPS[0].t) return STOPS[0].c;
    for (let i = 1; i < STOPS.length; i += 1) {
      if (v <= STOPS[i].t) {
        const a = STOPS[i - 1];
        const b = STOPS[i];
        const t = (v - a.t) / (b.t - a.t);
        return [
          Math.round(a.c[0] + (b.c[0] - a.c[0]) * t),
          Math.round(a.c[1] + (b.c[1] - a.c[1]) * t),
          Math.round(a.c[2] + (b.c[2] - a.c[2]) * t),
        ];
      }
    }
    return STOPS[STOPS.length - 1].c;
  }

  function drawHeatmap(sim) {
    const canvas = document.getElementById("heatmap");
    const ctx = canvas.getContext("2d");
    canvas.width = sim.cols;
    canvas.height = sim.rows;
    const img = ctx.createImageData(sim.cols, sim.rows);
    for (let i = 0; i < sim.grid.length; i += 1) {
      const rgb = ppfdRgb(sim.grid[i]);
      const p = i * 4;
      img.data[p] = rgb[0];
      img.data[p + 1] = rgb[1];
      img.data[p + 2] = rgb[2];
      img.data[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);

    document.getElementById("trays").innerHTML = TRAYS.map(
      (tray) =>
        `<div class="tray-overlay" style="left:${(tray.xCm / TENT.lengthCm) * 100}%;top:${(tray.yCm / TENT.depthCm) * 100}%;width:${(tray.lengthCm / TENT.lengthCm) * 100}%;height:${(tray.depthCm / TENT.depthCm) * 100}%"><span>${tray.label} 60×40</span></div>`
    ).join("");

    const bars = document.getElementById("bars");
    bars.innerHTML = sim.lights
      .map((light) => {
        const left = ((light.xCm - light.lengthCm / 2) / TENT.lengthCm) * 100;
        const top = ((light.yCm - light.widthCm / 2) / TENT.depthCm) * 100;
        const w = (light.lengthCm / TENT.lengthCm) * 100;
        const h = (Math.max(light.widthCm, 2.4) / TENT.depthCm) * 100;
        return `<div class="bar-overlay" style="left:${left}%;top:${top}%;width:${w}%;height:${h}%"></div>`;
      })
      .join("");

    const probes = [
      { x: 25, y: 42, label: "Bac A", value: sim.trayA },
      { x: 75, y: 42, label: "Bac B", value: sim.trayB },
      { x: 50, y: 8, label: "Centre", value: sim.center },
    ];
    document.getElementById("probes").innerHTML = probes
      .map(
        (p) =>
          `<div class="probe" style="left:${p.x}%;top:${p.y}%"><div class="probe-box"><div class="muted">${p.label}</div><strong>${nf0.format(p.value)} µmol</strong></div></div>`
      )
      .join("");
  }

  function renderFixtures() {
    const host = document.getElementById("fixture-grid");
    host.innerHTML = FIXTURES.filter((f) => f.verdict !== "avoid")
      .map((f) => {
        const active = f.id === state.fixtureId ? " is-active" : "";
        return `<button type="button" class="fixture${active}" data-id="${f.id}">
          <div class="fixture-top"><span>${f.shortName}</span><span class="badge">${VERDICT[f.verdict]}</span></div>
          <p class="mono">${watts(f)} W · ${nf0.format(ppf(f))} µmol/s · ${nf2.format(f.ppe)} µmol/J</p>
        </button>`;
      })
      .join("");
    host.querySelectorAll(".fixture").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.fixtureId = btn.dataset.id;
        render();
      });
    });
  }

  function renderSpecies() {
    const host = document.getElementById("species");
    host.innerHTML = SPECIES.map((s) => {
      const active = s.id === state.speciesId ? " is-active" : "";
      return `<button type="button" class="chip${active}" data-id="${s.id}">${s.label}</button>`;
    }).join("");
    host.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.speciesId = btn.dataset.id;
        render();
      });
    });
  }

  function renderStats(sim, fixture, species) {
    const dliAvg = dli(sim.trayAvg, state.hours);
    const kwh = yearlyKwh(watts(fixture), state.hours, state.intensity);
    const items = [
      ["PPFD sur les bacs", `${nf0.format(sim.trayAvg)} µmol`, "moyenne des 2 × 60 × 40"],
      ["Bac A / Bac B", `${nf0.format(sim.trayA)} / ${nf0.format(sim.trayB)}`, "équilibre gauche-droite"],
      ["PPFD centre tente", `${nf0.format(sim.center)} µmol`, "hotspot"],
      ["Uniformité tente", `${nf0.format(sim.uniformity * 100)} %`, "min / moyenne 120 × 60"],
      ["DLI sur les bacs", `${nf1.format(dliAvg)} mol`, `${state.hours} h / jour`],
      ["Facture an", euro0.format(yearlyCost(kwh)), `${nf1.format(kwh)} kWh`],
    ];
    document.getElementById("stats").innerHTML = items
      .map(
        ([lbl, val, hint]) =>
          `<div class="stat"><div class="lbl">${lbl}</div><div class="val">${val}</div><p class="hint">${hint}</p></div>`
      )
      .join("");

    const low = sim.trayAvg < species.ppfd[0];
    const hot = sim.trayA > species.ppfd[1] * 1.25 || sim.trayB > species.ppfd[1] * 1.25;
    const skew = Math.abs(sim.trayA - sim.trayB) > 40;
    let title = "Dans la fenêtre utile";
    let body = `Pour ${species.label}, on vise ${species.ppfd[0]}–${species.ppfd[1]} µmol/m²/s sur les deux bacs, pas au centre de la tente.`;
    if (low) {
      title = "Un peu juste sur les plateaux";
      body = `La moyenne des bacs tombe sous ${species.ppfd[0]} µmol. Descends de 5 cm, passe à 16 h, ou prends plus de PPF — pas une 3ᵉ Slim.`;
    } else if (hot) {
      title = "Un bac trop intense";
      body = `Un plateau dépasse nettement ${species.ppfd[1]} µmol. Monte de 5 cm, surtout au germoir. Les Hortimol 60 W se pendent plus haut.`;
    } else if (skew) {
      title = "Les deux bacs ne reçoivent pas la même chose";
      body = `Écart A/B trop large. Recentre les barres, ou passe en 1 barre par bac (Hortimol 60 cm).`;
    } else {
      title = "Bonne fenêtre pour " + species.label + " sur les 2 bacs";
    }
    document.getElementById("callout").innerHTML = `<p><strong>${title}</strong></p><p class="hint">${body}</p>`;
    document.getElementById("target-label").textContent = `cible ${species.ppfd[0]}–${species.ppfd[1]} µmol`;
  }

  function renderCompare(height, hours) {
    const rows = FIXTURES.map((f) => {
      const sim = simulate(f, height, 100, 0.25);
      return { f, sim, cost: yearlyCost(yearlyKwh(watts(f), hours, 100)), day: dli(sim.trayAvg, hours) };
    });
    document.getElementById("panel-comparer").innerHTML = `
      <article class="card">
        <h3>Les options pour deux bacs 60 × 40, 20 cm, 100 %</h3>
        <p class="card-desc">Le chiffre qui compte : PPFD moyen <em>sur les plateaux</em>, pas le watt ni le PAR 230.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Setup</th><th>W</th><th>PPF</th><th>µmol/J</th><th>PPFD bacs</th><th>A / B</th><th>DLI bacs</th><th>€ / an</th></tr></thead>
          <tbody>
            ${rows
              .map(
                ({ f, sim, cost, day }) => `<tr>
                <td><strong>${f.shortName}</strong><br><span class="muted">${VERDICT[f.verdict]}</span></td>
                <td>${watts(f)}</td><td>${nf0.format(ppf(f))}</td><td>${nf2.format(f.ppe)}</td>
                <td>${nf0.format(sim.trayAvg)}</td><td>${nf0.format(sim.trayA)} / ${nf0.format(sim.trayB)}</td>
                <td>${nf1.format(day)}</td><td>${euro0.format(cost)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table></div>
        <p class="card-desc">2 Cosmorrow 202 µmol/s / 80 W. 2 Hortimol 40 W : 184 µmol/s. 4 SANlight : 200 µmol/s, trois fois le prix. 2 Slim : 182 µmol/s pour 102 W.</p>
      </article>`;
  }

  function renderPose(fixture, height) {
    const lights = placements(fixture);
    const sideGap = Math.max(0, (TENT.lengthCm - fixture.lengthCm) / 2);
    const cover = Math.min(100, (fixture.lengthCm / TENT.lengthCm) * 100);
    const rects = lights
      .map((l) => {
        const x = 24 + ((l.xCm - l.lengthCm / 2) / 120) * 232;
        const y = 18 + ((l.yCm - 2) / 60) * 116;
        const w = (l.lengthCm / 120) * 232;
        const h = Math.max((l.widthCm / 60) * 116, 6);
        return `<g>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#1f3d32"></rect>
          <text x="${x + w / 2}" y="${y - 4}" text-anchor="middle" font-size="8" fill="#5c6b62">axe ${nf1.format(l.yCm)} cm</text>
        </g>`;
      })
      .join("");
    document.getElementById("panel-poser").innerHTML = `
      <div class="pose">
        <article class="card">
          <h3>Cotes dans la tente — 2 bacs 60 × 40</h3>
          <p class="card-desc">${fixture.layout === "split" ? "Une barre au-dessus de chaque bac, parallèle aux 120 cm." : "Barres parallèles aux 120 cm, jamais bout à bout sur 60 cm."}</p>
          <svg viewBox="0 0 280 160" width="100%" height="auto">
            <rect x="24" y="18" width="232" height="116" rx="6" fill="#edf3ec" stroke="#1f3d32" stroke-width="1.5"></rect>
            <rect x="24" y="37" width="116" height="77" fill="none" stroke="#8aa090" stroke-dasharray="3 2"></rect>
            <rect x="140" y="37" width="116" height="77" fill="none" stroke="#8aa090" stroke-dasharray="3 2"></rect>
            ${rects}
            <text x="82" y="78" text-anchor="middle" font-size="8" fill="#5c6b62">Bac A</text>
            <text x="198" y="78" text-anchor="middle" font-size="8" fill="#5c6b62">Bac B</text>
            <text x="140" y="148" text-anchor="middle" font-size="10" fill="#5c6b62">120 cm</text>
            <text x="16" y="76" text-anchor="middle" font-size="10" fill="#5c6b62" transform="rotate(-90 16 76)">60 cm</text>
          </svg>
          <ul>
            <li>Chaque bac : <strong>60 × 40 cm</strong>, 10 cm de marge sur la profondeur.</li>
            <li>Recul en bout de barre : <strong>${nf1.format(sideGap)} cm</strong> (${nf0.format(cover)} % de longueur couverte).</li>
            <li>Hauteur de départ germoir : <strong>${height} cm</strong> au-dessus du terreau (15–20 cm en 6500 K).</li>
            <li>Photopériode : programmateur ON/OFF 14 h, pas de Controller+ tant que 100 % n’est pas validé.</li>
          </ul>
        </article>
        <article class="card">
          <h3>${fixture.name}</h3>
          <p class="card-desc">${fixture.brand} · ${fixture.ip} · ${fixture.priceHint}</p>
          <p>${fixture.notes}</p>
          <p><span class="muted">Spectre · </span>${fixture.spectrum}</p>
          <p><span class="muted">Dispo · </span>${fixture.stock}</p>
          <p><span class="muted">À commander · </span>${fixture.buy}</p>
        </article>
      </div>`;
  }

  function renderBill(fixture, sim) {
    const hoursList = [12, 14, 16];
    const fecidaKwh = yearlyKwh(130, state.hours, 100);
    const ownKwh = yearlyKwh(watts(fixture), state.hours, state.intensity);
    document.getElementById("panel-facture").innerHTML = `
      <div class="bill">
        <article class="card">
          <h3>DLI selon les heures</h3>
          <p class="card-desc">DLI = PPFD × secondes d’allumage / 1 000 000. C’est ça qui colore les Sarracenia.</p>
          <div class="table-wrap"><table>
            <thead><tr><th>Heures</th><th>DLI bacs</th><th>DLI centre</th><th>€ / an</th></tr></thead>
            <tbody>
              ${hoursList
                .map((h) => {
                  const kwh = yearlyKwh(watts(fixture), h, state.intensity);
                  const hl = h === state.hours ? ' style="background:var(--secondary)"' : "";
                  return `<tr${hl}><td>${h} h</td><td>${nf1.format(dli(sim.trayAvg, h))}</td><td>${nf1.format(dli(sim.center, h))}</td><td>${euro2.format(yearlyCost(kwh))}</td></tr>`;
                })
                .join("")}
            </tbody>
          </table></div>
          <p class="card-desc">Repères : semis 8–14 · Drosera 12–20 · Dionaea 14–22 · adultes rouges 16–24.</p>
        </article>
        <article class="card">
          <h3>Contre la Fecida 130 W</h3>
          <p class="card-desc">${state.hours} h / jour, ${state.intensity} %, 0,2001 €/kWh.</p>
          <p>Fecida : ${nf1.format(fecidaKwh)} kWh / an → ${euro2.format(yearlyCost(fecidaKwh))}.</p>
          <p>${fixture.shortName} : ${nf1.format(ownKwh)} kWh / an → ${euro2.format(yearlyCost(ownKwh))}.</p>
          <p class="muted">Écart : ${euro2.format(yearlyCost(ownKwh) - yearlyCost(fecidaKwh))} par an. L’intérêt n’est pas d’économiser 8 € : c’est d’étaler les photons sur 120 cm.</p>
        </article>
      </div>`;
  }

  function render() {
    const fixture = fixtureById(state.fixtureId);
    const species = SPECIES.find((s) => s.id === state.speciesId) || SPECIES[0];
    const sim = simulate(fixture, state.height, state.intensity, 0.25);
    document.getElementById("height-val").textContent = `${state.height} cm`;
    document.getElementById("hours-val").textContent = `${state.hours} h`;
    document.getElementById("intensity-val").textContent = `${state.intensity} %`;
    document.getElementById("dim-warn").classList.toggle("hidden", fixture.dimmable || state.intensity === 100);
    renderFixtures();
    renderSpecies();
    drawHeatmap(sim);
    renderStats(sim, fixture, species);
    renderCompare(state.height, state.hours);
    renderPose(fixture, state.height);
    renderBill(fixture, sim);
  }

  document.getElementById("height").addEventListener("input", (e) => {
    state.height = Number(e.target.value);
    render();
  });
  document.getElementById("hours").addEventListener("input", (e) => {
    state.hours = Number(e.target.value);
    render();
  });
  document.getElementById("intensity").addEventListener("input", (e) => {
    state.intensity = Number(e.target.value);
    render();
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.tab = tab.dataset.tab;
      document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("is-active", t === tab));
      document.querySelectorAll(".tab-panel").forEach((p) => {
        p.classList.toggle("hidden", p.id !== "panel-" + state.tab);
      });
    });
  });

  render();
})();
