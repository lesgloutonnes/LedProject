/**
 * Catalogue Cosmorrow (Secret Jardin, Belgique) — barres 24 V.
 * Source : fiche COP BULBS 2023-09 (et révision 2024-01 pour COP20FS).
 * Les barres se vendent SANS alimentation. Voir psus.js.
 *
 * Unités SI horti (ASABE S640) — on normalise la notation Secret Jardin :
 *   PPF  = µmol/s          (fiche : µmol/s)
 *   PPE  = µmol/J          (fiche : µmol/J ou µmol/s/W — identique)
 *   PPFD = µmol/m²/s       (fiche : µmol/s/m² — même grandeur, ordre inversé)
 *   PAR  = 400–700 nm      (bande, pas un nombre)
 *   DLI  = mol/m²/j        (pas sur la fiche ; PPFD × h × 0,0036)
 */
window.LG_FIXTURES = [
  {
    id: "cop2065",
    sku: "COP2065",
    name: "Cosmorrow Growing 20 W · 50 cm",
    watts: 20,
    lengthCm: 47,
    widthCm: 3.2,
    heightCm: 1.6,
    ppf: 51,
    ppe: 2.7,
    cct: 6500,
    parNm: [400, 700],
    spectrum: {
      kind: "growing",
      label: "100 % blanc 6500 K",
      share: "diodes",
      channels: [{ id: "w6500", label: "blanc 6500 K", pct: 100, cctK: 6500, peakNm: [450, 555] }],
    },
    spectrumNote:
      "100 % blanc 6500 K (trois lignes). Végétatif, semis, boutures. Pas de 660 nm dédié — c’est voulu : le germoir carnivore a besoin de bleu/blanc froid, pas d’un spectre floraison.",
    ip: "IP65",
    voltage: 24,
    currentA: 0.78,
    footprint: { w: 60, d: 40, hCm: 15 },
    useCases: ["germoir", "bouturage", "mixte", "dormance"],
    notFor: [
      "tente 120×60 en source unique (trop courte, un seul bac couvert)",
      "colorisation d’adultes en solo (PPF trop bas)",
      "mélange sur une alim 40 W",
    ],
    priceHintEUR: "28–35 € (barre seule)",
    buyNote:
      "EAN 5425030267127. Barre seule, alim COM*20 à part. Growshops FR/BE (growland, desjop, Hydrozone, Culture Indoor). PPFD moy. constructeur 268 µmol/m²/s sur 60×40 à 15 cm.",
    weightKg: 0.13,
    lifetimeHours: 50000,
    beamDeg: 120,
    diodes: "Edison Opto, 3 lignes 6500 K",
    connector: "IEC 60130-10 DC 5,5×2,1 mm",
    ppfdAvg: 268,
  },
  {
    id: "cop4065",
    sku: "COP4065",
    name: "Cosmorrow Growing 40 W · 90 cm",
    watts: 40,
    lengthCm: 87,
    widthCm: 3.2,
    heightCm: 1.6,
    ppf: 101,
    ppe: 2.7,
    cct: 6500,
    parNm: [400, 700],
    spectrum: {
      kind: "growing",
      label: "100 % blanc 6500 K",
      share: "diodes",
      channels: [{ id: "w6500", label: "blanc 6500 K", pct: 100, cctK: 6500, peakNm: [450, 555] }],
    },
    spectrumNote:
      "100 % blanc 6500 K. SKU signature Les Gloutonnes : zone constructeur 120×60 à 15 cm, pile deux bacs 60×40. Surface tiède → on peut coller à ~15 cm de la canopée.",
    ip: "IP65",
    voltage: 24,
    currentA: 1.56,
    footprint: { w: 120, d: 60, hCm: 15 },
    useCases: ["germoir", "production", "colorisation", "mixte"],
    notFor: [
      "tente 60×60 ou 80×80 (87 cm trop long)",
      "confondre avec COP40FS (70 cm, spectre mixte)",
      "mélange sur une alim 20 W",
    ],
    priceHintEUR: "42–52 € (barre seule)",
    buyNote:
      "EAN 5425030266656. Barre seule. Kit usuel = 2 × COP4065 + COM2X40. PPFD moy. constructeur 205 µmol/m²/s sur 120×60 à 15 cm.",
    weightKg: 0.3,
    lifetimeHours: 50000,
    beamDeg: 120,
    diodes: "Edison Opto, 3 lignes 6500 K",
    connector: "IEC 60130-10 DC 5,5×2,1 mm",
    ppfdAvg: 205,
  },
  {
    id: "cop20fs",
    sku: "COP20FS",
    name: "Cosmorrow Full Spectrum 20 W · 50 cm",
    watts: 20,
    lengthCm: 47,
    widthCm: 3.2,
    heightCm: 1.6,
    ppf: 50.5,
    ppe: 2.62,
    cct: 3500,
    parNm: [400, 700],
    spectrum: {
      kind: "full-spectrum",
      label: "2700 / 4000 / 6500 K + 660 nm",
      share: "diodes",
      channels: [
        { id: "w2700", label: "blanc 2700 K", pct: 23, cctK: 2700, peakNm: [450, 610] },
        { id: "w4000", label: "blanc 4000 K", pct: 23, cctK: 4000, peakNm: [450, 580] },
        { id: "w6500", label: "blanc 6500 K", pct: 23, cctK: 6500, peakNm: [450, 555] },
        { id: "r660", label: "rouge 660 nm", pct: 31, peakNm: 660 },
      ],
    },
    spectrumNote:
      "Mix 2700 K / 4000 K / 6500 K + 660 nm (rouge profond PAR, pas du rouge lointain 730 nm). Fiche 2023-09 (alors COP20BL) : PPF 48, PPE 2,40. Révision 2024-01 : PPF 53, PPE 2,85. On retient la fourchette 48–53 µmol/s et 2,40–2,85 µmol/J. CCT équivalente ~3500 K. PPFD moy. constructeur 238 µmol/m²/s sur 60×40 à 15 cm.",
    ip: "IP65",
    voltage: 24,
    currentA: 0.78,
    footprint: { w: 60, d: 40, hCm: 15 },
    useCases: ["colorisation", "production", "tropical"],
    notFor: [
      "germoir en source unique (le 6500 K Growing compacte mieux les plantules)",
      "remplacer un COP2065 sans recalculer le DLI (PPF du même ordre, spectre différent)",
      "mélange sur une alim 40 W",
    ],
    priceHintEUR: "32–40 € (barre seule)",
    buyNote:
      "Même longueur que COP2065 (47 cm) → interchangeable mécaniquement et sur alim 20 W. Spectre plus chaud + 660 nm : appoint colorisation, pas le germoir par défaut.",
    weightKg: 0.13,
    lifetimeHours: 50000,
    beamDeg: 120,
    diodes: "23 % 2700 K + 23 % 4000 K + 23 % 6500 K + 31 % 660 nm (fiche 2024-01)",
    connector: "IEC 60130-10 DC 5,5×2,1 mm",
    ppfRange: [48, 53],
    ppeRange: [2.4, 2.85],
    ppfdAvg: 238,
  },
  {
    id: "cop40fs",
    sku: "COP40FS",
    name: "Cosmorrow Full Spectrum 40 W · 70 cm",
    watts: 40,
    lengthCm: 70,
    widthCm: 4.5,
    heightCm: 1.6,
    ppf: 107,
    ppe: 2.85,
    cct: 3500,
    parNm: [400, 700],
    spectrum: {
      kind: "full-spectrum",
      label: "2700 / 4000 / 6500 K + 660 nm",
      share: "diodes",
      channels: [
        { id: "w2700", label: "blanc 2700 K", pct: 23, cctK: 2700, peakNm: [450, 610] },
        { id: "w4000", label: "blanc 4000 K", pct: 23, cctK: 4000, peakNm: [450, 580] },
        { id: "w6500", label: "blanc 6500 K", pct: 23, cctK: 6500, peakNm: [450, 555] },
        { id: "r660", label: "rouge 660 nm", pct: 31, peakNm: 660 },
      ],
    },
    spectrumNote:
      "Mix 2700 K / 4000 K / 6500 K + 660 nm (23 / 23 / 23 / 31 %). Rouge 660 nm = PAR, pas rouge lointain 730 nm. CCT ~3500 K. Mesure constructeur à 20 cm — pas 15 cm. Plus large (4,5 cm) que les Growing. PPFD moy. 240 µmol/m²/s sur 90×60 à 20 cm.",
    ip: "IP65",
    voltage: 24,
    currentA: 1.56,
    footprint: { w: 90, d: 60, hCm: 20 },
    useCases: ["colorisation", "production", "tropical"],
    notFor: [
      "remplacer un COP4065 « pour gagner 17 cm » : longueurs différentes, PAS interchangeable",
      "tente 120×60 en barre unique (70 cm laisse trop de bouts sombres)",
      "germoir collé à 15 cm (fiche = 20 cm ; trop de 2700 K / 660 nm pour des cotylédons)",
    ],
    priceHintEUR: "45–55 € (barre seule)",
    buyNote:
      "EAN 5425030267134. Avertissement constructeur : le COP40FS n’est pas interchangeable avec les autres 40 W (longueurs différentes). Alim 40 W (COM40 / COM2X40 / COM3X40 / COM5X40). Zone 90×60 à 20 cm.",
    weightKg: 0.3,
    lifetimeHours: 50000,
    beamDeg: 120,
    diodes: "23 % 2700 K + 23 % 4000 K + 23 % 6500 K + 31 % 660 nm",
    connector: "IEC 60130-10 DC 5,5×2,1 mm",
    ppfdAvg: 240,
    warning:
      "Longueur 70 cm ≠ 87 cm du COP4065. Même wattage, même connecteur 24 V, géométrie différente.",
  },
];
