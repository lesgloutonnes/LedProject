(function () {
  const TENT = { lengthCm: 120, depthCm: 60, areaM2: 0.72 };
  const KWH = 0.2001;
  const VERDICT = {
    recommended: "Choix n°1",
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
      count: 2,
      wattsEach: 40,
      lengthCm: 90,
      widthCm: 4.5,
      ppfEach: 107,
      ppe: 2.7,
      spectrum: "6500 K (croissance). Réf. officielle COP4065 : 100 % 6500 K.",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 42 € × 2 + 27 € d’alim COM2X40 ≈ 110 €",
      stock: "Toujours au catalogue Secret Jardin (COP4065).",
      buy: "COP4065 + alimentation COM2X40. COM3X40 pour une 3ᵉ barre plus tard.",
      notes: "Deux barres de 90 cm, 80 W, 214 µmol/s : le successeur réel du plan initial.",
      verdict: "recommended",
    },
    {
      id: "hortimol-2x60",
      name: "2 × Hortimol TLED 60 W 120 cm",
      shortName: "2 Hortimol 120",
      brand: "Hortimol",
      kind: "bar",
      count: 2,
      wattsEach: 60,
      lengthCm: 120,
      widthCm: 13,
      ppfEach: 138,
      ppe: 2.3,
      spectrum: "FSG 4000 K, fort bleu 450 nm + un peu de 660 nm + IR.",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 130 € × 2 ≈ 260 €",
      stock: "Catalogue constructeur, 3 ans de garantie.",
      buy: "Hortimol TLED 60 W FSG 120 cm, 230 V, linkable.",
      notes: "Le constructeur donne déjà 1 barre pour 120 × 60 cm. Deux barres couvrent toute la longueur.",
      verdict: "good",
    },
    {
      id: "hortimol-1x60",
      name: "1 × Hortimol TLED 60 W 120 cm",
      shortName: "1 Hortimol 120",
      brand: "Hortimol",
      kind: "bar",
      count: 1,
      wattsEach: 60,
      lengthCm: 120,
      widthCm: 13,
      ppfEach: 138,
      ppe: 2.3,
      spectrum: "FSG 4000 K",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 130 €",
      stock: "Disponible chez Hortimol et revendeurs BE/FR.",
      buy: "Une barre centrée, 20–25 cm. Suffisant pour semis.",
      notes: "Bon plan économique pour valider, puis doubler.",
      verdict: "good",
    },
    {
      id: "cosmorrow-3x70fs",
      name: "3 × Cosmorrow Full Spectrum 70 cm",
      shortName: "3 Cosmorrow 70 FS",
      brand: "Secret Jardin",
      kind: "bar",
      count: 3,
      wattsEach: 40,
      lengthCm: 70,
      widthCm: 4.5,
      ppfEach: 114,
      ppe: 2.85,
      spectrum: "31 % 660 nm + 23 % 6500 K + 23 % 4000 K + 23 % 2700 K",
      dimmable: false,
      ip: "IP65",
      priceHint: "≈ 50 € × 3 + 40 € d’alim COM3X40 ≈ 190 €",
      stock: "Successeur officiel du Full Spectrum 90 cm (COP40FS).",
      buy: "COP40FS + COM3X40. Incompatible électriquement avec les 90 cm.",
      notes: "Plus de photons, mais 70 cm laissent ~25 cm de chaque bout moins couverts.",
      verdict: "good",
    },
    {
      id: "sanlight-4x20",
      name: "4 × SANlight FLEX II 20",
      shortName: "4 SANlight Flex",
      brand: "SANlight",
      kind: "bar",
      count: 4,
      wattsEach: 19,
      lengthCm: 99.5,
      widthCm: 3.3,
      ppfEach: 50,
      ppe: 2.63,
      spectrum: "Plein spectre 400–780 nm, far-red relevé.",
      dimmable: false,
      ip: "IP68",
      priceHint: "≈ 62 € × 4 + alim 150 W ≈ 320–380 €",
      stock: "Marque autrichienne, 3 ans.",
      buy: "4 × FLEX II 20 + driver 150 W + répartiteurs Y.",
      notes: "Meilleure étanchéité et durée de vie. Budget plus élevé.",
      verdict: "good",
    },
    {
      id: "fecida-130",
      name: "Fecida actuelle 130 W",
      shortName: "Fecida 130 W",
      brand: "FECiDA",
      kind: "panel",
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
      buy: "Ne rien racheter. Appoint central ou bac gourmand.",
      notes: "Bon budget photonique (~286 µmol/s), mal réparti sous 31 × 21 cm.",
      verdict: "keep",
    },
    {
      id: "slim-2x93",
      name: "2 × SuperFish Slim LED 93",
      shortName: "2 Slim 93",
      brand: "SuperFish",
      kind: "bar",
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
      buy: "Seulement si tu tiens à l’IP67 aquarium.",
      notes: "Le PAR 230 est un pic, identique sur toute la gamme Slim. On n’additionne pas 230 + 230.",
      verdict: "caution",
    },
    {
      id: "florastar-2x42-6500",
      name: "2 × FloraStar TLED 42 W 6500 K",
      shortName: "2 FloraStar 6500 K",
      brand: "FloraStar",
      kind: "bar",
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
      stock: "LED-FTL042B 104 cm.",
      buy: "Uniquement si le vendeur confirme un PPF ≥ 90 µmol/s.",
      notes: "PPF médian simulé à 80 µmol/s. Trop d’incertitude pour commander les yeux fermés.",
      verdict: "caution",
    },
    {
      id: "florastar-2x42-2700",
      name: "2 × FloraStar 42 W 2700 K",
      shortName: "2 FloraStar 2700 K",
      brand: "FloraStar",
      kind: "bar",
      count: 2,
      wattsEach: 42,
      lengthCm: 104,
      widthCm: 4,
      ppfEach: 71,
      ppe: 1.69,
      spectrum: "2700 K floraison — trop chaud pour semis.",
      dimmable: false,
      ip: "IP65",
      priceHint: "Proposition Octopus refusée",
      stock: "1,69 µmol/J.",
      buy: "Ne pas reprendre.",
      notes: "142 µmol/s à deux, contre 214 chez Cosmorrow, pour 84 W au lieu de 80 W.",
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
    height: 25,
    hours: 14,
    intensity: 100,
    speciesId: "sarr-young",
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
    return {
      grid,
      cols,
      rows,
      min,
      max,
      avg,
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
      { x: 50, y: 50, label: "Centre", value: sim.center },
      { x: 50, y: 10, label: "Bord", value: sim.edge },
      { x: 10, y: 14, label: "Coin", value: sim.corner },
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
    const dliAvg = dli(sim.avg, state.hours);
    const kwh = yearlyKwh(watts(fixture), state.hours, state.intensity);
    const items = [
      ["PPFD moyen", `${nf0.format(sim.avg)} µmol`, "sur 0,72 m²"],
      ["PPFD centre", `${nf0.format(sim.center)} µmol`, "hotspot"],
      ["PPFD bords", `${nf0.format(sim.edge)} µmol`, "milieu des 60 cm"],
      ["Uniformité", `${nf0.format(sim.uniformity * 100)} %`, "min / moyenne"],
      ["DLI moyen", `${nf1.format(dliAvg)} mol`, `${state.hours} h / jour`],
      ["Facture an", euro0.format(yearlyCost(kwh)), `${nf1.format(kwh)} kWh`],
    ];
    document.getElementById("stats").innerHTML = items
      .map(
        ([lbl, val, hint]) =>
          `<div class="stat"><div class="lbl">${lbl}</div><div class="val">${val}</div><p class="hint">${hint}</p></div>`
      )
      .join("");

    const low = sim.avg < species.ppfd[0];
    const hot = sim.center > species.ppfd[1] * 1.25;
    let title = "Dans la fenêtre utile";
    let body = `Pour ${species.label}, on vise ${species.ppfd[0]}–${species.ppfd[1]} µmol/m²/s au feuillage.`;
    if (low) {
      title = "Un peu juste pour la cible";
      body = `La moyenne tombe sous ${species.ppfd[0]} µmol. Descends de 5 cm, passe à 16 h, ou prends plus de PPF — pas une 3ᵉ Slim.`;
    } else if (hot) {
      title = "Centre trop intense";
      body = `Le hotspot dépasse nettement ${species.ppfd[1]} µmol. Monte de 5 cm ou baisse l’intensité, et surveille le blanchiment.`;
    } else {
      title = "Bonne fenêtre pour " + species.label;
    }
    document.getElementById("callout").innerHTML = `<p><strong>${title}</strong></p><p class="hint">${body}</p>`;
    document.getElementById("target-label").textContent = `cible ${species.ppfd[0]}–${species.ppfd[1]} µmol`;
  }

  function renderCompare(height, hours) {
    const rows = FIXTURES.map((f) => {
      const sim = simulate(f, height, 100, 0.25);
      return { f, sim, cost: yearlyCost(yearlyKwh(watts(f), hours, 100)), day: dli(sim.avg, hours) };
    });
    document.getElementById("panel-comparer").innerHTML = `
      <article class="card">
        <h3>Toutes les options, même hauteur, 100 %</h3>
        <p class="card-desc">Le bon chiffre n’est pas le watt ni le PAR 230 : c’est le PPF total, puis le PPFD au feuillage.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Setup</th><th>W</th><th>PPF</th><th>µmol/J</th><th>PPFD moy.</th><th>Centre / bords</th><th>DLI</th><th>€ / an</th></tr></thead>
          <tbody>
            ${rows
              .map(
                ({ f, sim, cost, day }) => `<tr>
                <td><strong>${f.shortName}</strong><br><span class="muted">${VERDICT[f.verdict]}</span></td>
                <td>${watts(f)}</td><td>${nf0.format(ppf(f))}</td><td>${nf2.format(f.ppe)}</td>
                <td>${nf0.format(sim.avg)}</td><td>${nf0.format(sim.center)} / ${nf0.format(sim.edge)}</td>
                <td>${nf1.format(day)}</td><td>${euro0.format(cost)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table></div>
        <p class="card-desc">Fecida ~286 µmol/s, 2 Slim ~182, 2 Cosmorrow 214 µmol/s pour 80 W : meilleur rapport photons / euros / géométrie.</p>
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
          <h3>Cotes dans la tente</h3>
          <p class="card-desc">Barres parallèles aux 120 cm, jamais bout à bout sur 60 cm.</p>
          <svg viewBox="0 0 280 160" width="100%" height="auto">
            <rect x="24" y="18" width="232" height="116" rx="6" fill="#edf3ec" stroke="#1f3d32" stroke-width="1.5"></rect>
            ${rects}
            <text x="140" y="148" text-anchor="middle" font-size="10" fill="#5c6b62">120 cm</text>
            <text x="16" y="76" text-anchor="middle" font-size="10" fill="#5c6b62" transform="rotate(-90 16 76)">60 cm</text>
          </svg>
          <ul>
            <li>Recul en bout : <strong>${nf1.format(sideGap)} cm</strong> (${nf0.format(cover)} % de longueur couverte).</li>
            <li>Hauteur de départ : <strong>${height} cm</strong> au-dessus du sommet.</li>
            <li>Photopériode : programmateur ON/OFF, pas de Controller+ tant que 100 % n’est pas validé.</li>
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
            <thead><tr><th>Heures</th><th>DLI moyen</th><th>DLI centre</th><th>€ / an</th></tr></thead>
            <tbody>
              ${hoursList
                .map((h) => {
                  const kwh = yearlyKwh(watts(fixture), h, state.intensity);
                  const hl = h === state.hours ? ' style="background:var(--secondary)"' : "";
                  return `<tr${hl}><td>${h} h</td><td>${nf1.format(dli(sim.avg, h))}</td><td>${nf1.format(dli(sim.center, h))}</td><td>${euro2.format(yearlyCost(kwh))}</td></tr>`;
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
