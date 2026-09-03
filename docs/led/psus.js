/**
 * Alimentations Cosmorrow 24 V DC (SKU COM*).
 * Règle d’or : ne JAMAIS mixer une barre 20 W et une barre 40 W sur la même alim.
 * Driver à l’extérieur de la tente si possible (chaleur + splash + extracteur qui aspire l’humidité).
 *
 * Anciennes refs boutique : COM2X20 ≈ COM40D, COM2X40 ≈ COM80D.
 * COM3X* = 2 ou 3 barres ; COM5X* = 4 ou 5 barres (ports vides acceptés).
 */
window.TOURBIERE_PSUS = [
  {
    id: "com20",
    sku: "COM20",
    name: "Cosmorrow Power 1×20 W",
    wattsTotal: 20,
    ports: 1,
    portWatts: 20,
    compatibleBarWatts: 20,
    ip: "IP65",
    notes:
      "Une seule barre 20 W (COP2065 ou COP20FS). Prise UE/UK/US fournie. Sortie 24 V, câble DC ~180 cm, secteur ~60 cm. Idéal germoir 60×40 / dormance. Sortir l’alim de la tente.",
  },
  {
    id: "com40",
    sku: "COM40",
    name: "Cosmorrow Power 1×40 W",
    wattsTotal: 40,
    ports: 1,
    portWatts: 40,
    compatibleBarWatts: 40,
    ip: "IP65",
    notes:
      "Une seule barre 40 W (COP4065 ou COP40FS — même alim, longueurs différentes). Clips Ø16–21 mm + crochets souvent inclus. Certaines fiches boutique indiquent IP54 : hors splash dans tous les cas.",
  },
  {
    id: "com2x20",
    sku: "COM2X20",
    name: "Cosmorrow Power 2×20 W",
    wattsTotal: 40,
    ports: 2,
    portWatts: 20,
    compatibleBarWatts: 20,
    ip: "IP65",
    notes:
      "Deux barres 20 W. Ancienne ref COM40D. Typique : 2 × COP2065 (un par bac 60×40) ou Growing + FS 20 W. Jamais de COP4065 / COP40FS.",
  },
  {
    id: "com2x40",
    sku: "COM2X40",
    name: "Cosmorrow Power 2×40 W",
    wattsTotal: 80,
    ports: 2,
    portWatts: 40,
    compatibleBarWatts: 40,
    ip: "IP65",
    notes:
      "Alim du kit signature Tourbière (2 × COP4065). Ancienne ref COM80D. Accepte 2 × COP40FS ou 1 Growing 40 W + 1 FS 40 W (wattage identique, longueurs 87 vs 70 cm à caler). Jamais de 20 W.",
  },
  {
    id: "com3x20",
    sku: "COM3X20",
    name: "Cosmorrow Power 2/3×20 W",
    wattsTotal: 60,
    ports: 3,
    portWatts: 20,
    compatibleBarWatts: 20,
    ip: "IP65",
    notes:
      "Deux ou trois barres 20 W (un port vide OK). Kit colorisation compact : 2 × COP2065 + 1 × COP20FS. Ne pas brancher de 40 W « parce qu’il reste de la marge » : le port est calibré 20 W.",
  },
  {
    id: "com3x40",
    sku: "COM3X40",
    name: "Cosmorrow Power 2/3×40 W",
    wattsTotal: 120,
    ports: 3,
    portWatts: 40,
    compatibleBarWatts: 40,
    ip: "IP65",
    notes:
      "Deux ou trois barres 40 W. Colorisation 120×60 : 2 × COP4065 + 1 × COP40FS. Production 100×100 : 3 × COP4065. Ports 40 W uniquement.",
  },
  {
    id: "com5x20",
    sku: "COM5X20",
    name: "Cosmorrow Power 4/5×20 W",
    wattsTotal: 100,
    ports: 5,
    portWatts: 20,
    compatibleBarWatts: 20,
    ip: "IP65",
    notes:
      "Quatre ou cinq barres 20 W. Tente mixte 2 étages en 20 W, ou 100×100 en grappe de 47 cm. 4 ports utilisés / 1 vide = OK. Toujours 20 W par port.",
  },
  {
    id: "com5x40",
    sku: "COM5X40",
    name: "Cosmorrow Power 4/5×40 W",
    wattsTotal: 200,
    ports: 5,
    portWatts: 40,
    compatibleBarWatts: 40,
    ip: "IP65",
    notes:
      "Quatre ou cinq barres 40 W. Production 120×120 (4 × COP4065) ou 150×150 (5 × COP4065). C’est beaucoup de photons pour des carnivores : monter les barres, pas tout coller à 15 cm.",
  },
];
