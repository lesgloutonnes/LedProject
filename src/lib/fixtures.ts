export const TENT = {
  lengthCm: 120,
  depthCm: 60,
  heightCm: 150,
  areaM2: 0.72,
} as const;

/** Tarif Bleu EDF, option Base 6 kVA, grille du 1er août 2026. */
export const KWH_PRICE_EUR = 0.2001;

export type Verdict = "recommended" | "good" | "hybrid" | "keep" | "caution" | "avoid";

export type LightKind = "bar" | "panel";

export interface FixtureSetup {
  id: string;
  name: string;
  shortName: string;
  brand: string;
  kind: LightKind;
  count: number;
  wattsEach: number;
  lengthCm: number;
  widthCm: number;
  /** µmol/s published, or lumen-derived then PAR-calibrated for Slim. */
  ppfEach: number;
  ppe: number;
  spectrum: string;
  dimmable: boolean;
  ip: string;
  peakPpfdAt20?: number;
  priceHint: string;
  stock: string;
  buy: string;
  notes: string;
  verdict: Verdict;
  rank: number;
  /** Official Cosmorrow PPFD average on a reference footprint, if any. */
  publishedAvg?: { ppfd: number; area: string; distanceCm: number };
}

export const FIXTURES: FixtureSetup[] = [
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
    spectrum: "6500 K (croissance). Certaines fiches revendeur mélangent encore le spectre Full Spectrum (31 % 660 nm) : la référence officielle COP4065 est bien 100 % 6500 K.",
    dimmable: false,
    ip: "IP65",
    priceHint: "≈ 42 € × 2 + 27 € d’alim COM2X40 ≈ 110 €",
    stock: "Toujours au catalogue Secret Jardin (COP4065). Octopus en rupture, mais GrowLED, growland.fr et Servovendi en avaient encore en août 2026.",
    buy: "Réf. COP4065 + alimentation COM2X40. L’alim COM3X40 permet d’ajouter une 3ᵉ barre plus tard.",
    notes: "C’est le successeur réel de ton plan initial : deux barres de 90 cm pour 80 W, 214 µmol/s, longueur quasi idéale dans 120 cm.",
    verdict: "recommended",
    rank: 1,
    publishedAvg: { ppfd: 240, area: "90 × 60 cm", distanceCm: 20 },
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
    spectrum: "FSG 4000 K, fort bleu 450 nm + un peu de 660 nm + IR Sunribio. Idéal compactage et couleurs.",
    dimmable: false,
    ip: "IP65",
    priceHint: "≈ 130 € × 2 ≈ 260 €",
    stock: "Catalogue constructeur, 3 ans de garantie. Version 2,5 µmol/J (150 µmol/s) encore mieux si dispo.",
    buy: "Hortimol TLED 60 W FSG 120 cm. Branchement 230 V, linkable 2 par 2.",
    notes: "Le constructeur donne déjà 1 barre pour 120 × 60 cm. Deux barres couvrent toute la longueur, sans les 13,5 cm vides des Slim 93.",
    verdict: "good",
    rank: 2,
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
    buy: "Une seule barre centrée, à ~20–25 cm. Suffisant pour semis, juste pour Sarracenia adultes.",
    notes: "Surface conseillée constructeur : 120 × 60 cm. Bon plan économique pour valider, puis doubler.",
    verdict: "good",
    rank: 3,
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
    stock: "C’est le successeur officiel du Full Spectrum 90 cm (COP40FS, 70 cm seulement).",
    buy: "COP40FS + COM3X40. Attention : les barres 70 cm ne se mélangent pas électriquement avec les 90 cm.",
    notes: "Plus de photons et le 660 nm, mais 70 cm laissent ~25 cm de chaque bout moins couverts. Intéressant si tes deux bacs sont au centre.",
    verdict: "good",
    rank: 4,
    publishedAvg: { ppfd: 240, area: "90 × 60 cm", distanceCm: 20 },
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
    spectrum: "Plein spectre 400–780 nm, ratio far-red/rouge relevé, lumière « salon » agréable.",
    dimmable: false,
    ip: "IP68",
    priceHint: "≈ 62 € × 4 + alim 150 W + splitters ≈ 320–380 €",
    stock: "Marque autrichienne, 3 ans, LM90 > 100 000 h. Haut de gamme.",
    buy: "4 × FLEX II 20 + driver 150 W (7 barres max) + répartiteurs Y.",
    notes: "Meilleure étanchéité et durée de vie. Homogénéité excellente avec 4 lignes. Budget plus élevé.",
    verdict: "good",
    rank: 5,
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
    spectrum: "Plein spectre 3000 K + 5000 K + 660 nm + UV/IR, 584 LED Sanan. Dimmer 0–100 %.",
    dimmable: true,
    ip: "IP20",
    priceHint: "Déjà achetée — à conserver",
    stock: "CR600 / GL-CR600-130W, conçue pour 60 × 60 cm (2 × 2 ft), pas 120 × 60.",
    buy: "Ne rien racheter. La garder comme appoint central ou pour un bac gourmand.",
    notes: "Le budget photonique est bon (~286 µmol/s), mais concentré sous un panneau de 31 × 21 cm. C’est ça qui crée le hotspot et les bords sombres.",
    verdict: "keep",
    rank: 6,
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
    ppfEach: 45,
    ppe: 0.88,
    spectrum: "Blanc 7000 K, CRI 96, pic bleu ~448 nm + phosphore. Pas de pic 660 nm dédié — ce n’est pas un défaut pour des carnivores.",
    dimmable: true,
    ip: "IP67",
    peakPpfdAt20: 230,
    priceHint: "≈ 85–105 € × 2 ≈ 170–210 €",
    stock: "Fiche actuelle Aquadistri : 51 W / 3025 lm / 7000 K / PAR 230 à 20 cm. Ancienne fiche : 59 W / 3770 lm.",
    buy: "À n’acheter que si tu tiens à l’IP67 aquarium. Sinon, une horticole 2,5+ µmol/J fait mieux pour moins cher à l’usage.",
    notes: "Le PAR 230 est identique sur les Slim 45, 55, 74 et 93 W. C’est un pic sous la rampe, pas une moyenne de tente, et on n’additionne pas 230 + 230.",
    verdict: "caution",
    rank: 7,
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
    spectrum: "6500 K croissance. PPF revendeur incohérent : 51, 62 ou 98 µmol/s selon la boutique.",
    dimmable: false,
    ip: "IP65",
    priceHint: "≈ 95–118 € × 2",
    stock: "LED-FTL042B 104 cm. Ne pas confondre avec le 2700 K à 71 µmol/s (floraison, à éviter).",
    buy: "Uniquement si le vendeur confirme un PPF ≥ 90 µmol/s sur fiche. Sinon, passer.",
    notes: "On simule ici un PPF médian de 80 µmol/s (ni le 62 pessimiste ni le 98 optimiste). Trop d’incertitude pour commander les yeux fermés.",
    verdict: "caution",
    rank: 8,
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
    spectrum: "2700 K floraison — trop chaud, trop peu de bleu pour semis et pigmentation.",
    dimmable: false,
    ip: "IP65",
    priceHint: "Proposition Octopus refusée, remboursement OK",
    stock: "C’était le mauvais modèle. 1,69 µmol/J.",
    buy: "Ne pas reprendre.",
    notes: "Deux rampes = 142 µmol/s contre 214 chez Cosmorrow, pour 84 W au lieu de 80 W. Le remboursement était la bonne décision.",
    verdict: "avoid",
    rank: 9,
  },
];

export const SPECIES_TARGETS = [
  {
    id: "seedling",
    label: "Semis",
    ppfd: [150, 250] as const,
    dli: [8, 14] as const,
    hours: [14, 16] as const,
  },
  {
    id: "drosera",
    label: "Drosera",
    ppfd: [200, 400] as const,
    dli: [12, 20] as const,
    hours: [14, 16] as const,
  },
  {
    id: "dionaea",
    label: "Dionaea",
    ppfd: [250, 400] as const,
    dli: [14, 22] as const,
    hours: [14, 16] as const,
  },
  {
    id: "sarr-young",
    label: "Sarracenia jeunes",
    ppfd: [250, 400] as const,
    dli: [14, 22] as const,
    hours: [14, 16] as const,
  },
  {
    id: "sarr-adult",
    label: "Sarracenia adultes / rouge",
    ppfd: [300, 500] as const,
    dli: [16, 24] as const,
    hours: [14, 16] as const,
  },
] as const;

export function getFixture(id: string) {
  return FIXTURES.find((f) => f.id === id) ?? FIXTURES[0];
}

export function wattsTotal(f: FixtureSetup) {
  return f.wattsEach * f.count;
}

export function ppfTotal(f: FixtureSetup) {
  return f.ppfEach * f.count;
}
