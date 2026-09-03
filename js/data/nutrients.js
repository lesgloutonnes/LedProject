/**
 * Eau, substrats, engrais, proies — Les Gloutonnes
 * Engrais : dilutions horticoles connues uniquement (Maxsea ¼, orchidée ¼).
 * Jamais Miracle-Gro, jamais terreau fertilisé.
 */
window.LG_NUTRIENTS = {
  water: {
    title: "Eau pauvre, non négociable",
    tdsMaxPpm: 50,
    targetPpm: [0, 20],
    allowed: [
      {
        id: "ro",
        label: "Osmose inverse (RO)",
        note: "Standard de tente. Vérifier le TDS en sortie de membrane (souvent 0–15 ppm). Changer les filtres selon le volume, pas selon le calendrier magique.",
      },
      {
        id: "rain",
        label: "Eau de pluie",
        note: "Excellente si la collecte est propre (pas de toit bitumé neuf, pas de gouttière rouillée qui colore). TDS souvent 5–30 ppm. Filtrer les débris. En ville, un premier jet écarte la poussière.",
      },
      {
        id: "distilled",
        label: "Eau distillée",
        note: "Propre, chère en bidon. Utile en appoint. Sans minéraux : c’est le but.",
      },
      {
        id: "zerowater",
        label: "ZeroWater (carafe / filtre ionique)",
        note: "OK tant que le TDS-mètre fourni affiche 000. Cartouche saturée = on arrête, ce n’est plus de l’eau de carnivore.",
      },
    ],
    forbidden: [
      {
        id: "tap",
        label: "Robinet non traité",
        note: "Dureté et chlore. Brûlures marginales, rhizomes qui s’affaissent en quelques mois. Même « je laisse reposer » n’enlève pas le calcaire.",
      },
      {
        id: "brita",
        label: "Brita et carafes charbon classiques",
        note: "Baissent le goût, pas assez le TDS. Souvent 150–300 ppm restants. Ce n’est pas de l’eau de tourbière.",
      },
      {
        id: "softener",
        label: "Adoucisseur au sel",
        note: "Remplace le calcaire par du sodium. Pire pour les racines. Non.",
      },
      {
        id: "mineral",
        label: "Eau minérale / source",
        note: "Marketing « pure » ≠ pauvre. Lire le résidu sec : souvent 200–400 mg/L.",
      },
    ],
    practice: [
      "Mesurer le TDS (conductimètre ~10 €), pas se fier à la transparence.",
      "Stocker à l’ombre, bidons opaques, 1–2 semaines max pour la pluie (algues, moustiques).",
      "Arroser / bac avec la même qualité toute l’année, y compris en dormance.",
      "Le bac d’eau n’est pas un engrais : on ne verse jamais de Maxsea dedans.",
    ],
  },

  substrates: [
    {
      id: "peat-perlite",
      name: "Tourbe blonde + perlite 50/50",
      uses: ["germoir", "Dionaea", "Sarracenia", "Drosera capensis / tempérées", "Byblis liniflora"],
      recipe: "Volume à volume, tourbe blonde non fertilisée + perlite horticole. Rincer à l’eau RO jusqu’à eau claire. Ne pas tasser comme une brique.",
      notes:
        "Le mix de base du site. La tourbe « horticole enrichie » du jardin discounter est un piège. Pas de vermiculite seule (retient trop, parfois un peu de poussière trop riche). Sable siliceux peut remplacer une partie de perlite (surtout pygmées, Drosophyllum).",
    },
    {
      id: "lfs",
      name: "Sphaigne longue fibre (LFS)",
      uses: ["boutures Nepenthes", "Heliamphora", "Utricularia épiphytes", "Darlingtonia (souvent en mélange)"],
      recipe: "Sphaigne longue fibre hydratée à l’eau RO, essorée (plus de filet d’eau). Vivante si tu peux : elle tamponne mieux. Morte : on rempote dès qu’elle devient boue brune.",
      notes:
        "Jamais sèche à fond (redevient hydrophobe). Jamais un pain compact au fond d’un pot sans perlite pour les plantes qui veulent de l’air (Nepenthes). Les leaf pullings aiment une LFS juste humide, pas un marais.",
    },
    {
      id: "nepenthes-mix",
      name: "Mix Nepenthes (LFS + écorce + perlite)",
      uses: ["Nepenthes lowland / highland", "parfois Heliamphora en appoint minéral"],
      recipe: "Environ 40 % sphaigne longue fibre + 40 % écorce d’orchidée moyenne + 20 % perlite. Option : une poignée de charbon horti. Paniers aérés ou pots percés.",
      notes:
        "C’est un mix d’épiphyte / lithophyte, pas une tourbière. Un bac d’eau type Sarracenia asphyxie. On rempote tous les 12–24 mois. Pas de terreau orchidée du commerce s’il est engraissé.",
    },
    {
      id: "mexi",
      name: "Mix Pinguicula mexicaine (drainant)",
      uses: ["Pinguicula mexicaines", "parfois Cephalotus en version plus tourbeuse"],
      recipe: "Perlite + vermiculite + un peu de tourbe ou sphaigne hachée (ex. 40/40/20), ou sable siliceux + pouzzolane + tourbe. Pots bas. Surface qui sèche entre deux arrosages.",
      notes: "L’opposé du bac Sarracenia. Collet au sec relatif. Feuilles d’hiver = encore moins d’eau.",
    },
    {
      id: "mineral-med",
      name: "Mix minéral méditerranéen",
      uses: ["Drosophyllum", "Drosera pygmées", "Byblis pérennes WA"],
      recipe: "Sable siliceux 60–70 % + tourbe 30–40 %. Pots terre cuite possibles pour Drosophyllum. Semis en place (Drosophyllum).",
      notes: "Jamais de bac d’eau permanent. Drainage franc. Pas de calcaire (sable de Loire / playa).",
    },
  ],

  fertilizers: {
    never: [
      "Terreau horticole « plantes vertes » ou « carnivores » pré-fertilisé — le second existe en rayon et reste trop riche.",
      "Miracle-Gro, Engrais universel, billes d’azote jardin, or brun, marc de café, lait, eau de cuisson.",
      "Arrosage racinaire concentré dans le bac d’eau (algues + sel au collet).",
    ],
    products: [
      {
        id: "maxsea",
        name: "Maxsea 16-16-16 (foliar)",
        protocol:
          "¼ cuillère à café par gallon US ≈ 1,25 ml / 3,8 L ≈ 0,3 g/L. 1–2× par mois en saison de croissance, sur feuillage sec, le matin, lumière allumée ou juste avant. Rinçage inutile si la dilution est tenue. Source de pratique : California Carnivores / culture US documentée.",
        why: "Adamec 1997 : l’absorption foliaire des carnivores est réelle et stimule aussi la prise racinaire. Un foliar dilué remplace une partie des proies en tente pauvre en insectes. Ce n’est pas « anti-nature » : c’est du minéral propre à faible dose.",
        avoid: "Ne pas monter à ½ ou 1 c. à café « pour aller plus vite ». Ne pas vaporiser les hibernacles ni les feuilles d’hiver succulentes. Ne pas mélanger à un autre NPK le même jour.",
      },
      {
        id: "orchid",
        name: "Engrais orchidée ¼ de dose (Nepenthes)",
        protocol:
          "Engrais orchidée équilibré du commerce, **un quart** de la dose étiquette, 1×/mois sur le mix (léger percolation) ou en foliar très dilué. Eau RO uniquement comme diluant.",
        why: "Les Nepenthes répondent souvent mieux à un rythme type orchidée qu’à un marais. Utile si tu n’as pas de Maxsea sous la main — un seul des deux, pas les deux à pleine cadence.",
        avoid: "Dose étiquette entière. Engrais orchidée + Osmocote + Maxsea la même semaine.",
      },
      {
        id: "osmocote",
        name: "Osmocote : 1 bille dans une urne (option Nepenthes)",
        protocol:
          "Une seule bille d’Osmocote (ou équivalent enrobé) **dans une urne mature**, pas dans chaque urne, pas dans le substrat. L’urne digère lentement. Option de pépiniériste, pas un réflexe mensuel.",
        why: "Appoint localisé, loin des racines. Complète un foliar léger sur plante adulte qui urne peu en appartement.",
        avoid: "Billes dans le mix Nepenthes ou dans le bac Sarracenia. Plusieurs billes « pour voir ». Dionaea / Drosera : non.",
      },
    ],
    algaeAlert:
      "Si le bac verdit, si la sphaigne se recouvre d’un feutre, si une pellicule irisée apparaît : tu arroses trop riche (racinaire, bac engraissé, eau de pluie de gouttière sale) ou tu éclaires l’eau stagnante. On vide, on rince à l’eau RO, on passe foliar only, on masque le bac de la LED. On ne « corrige » pas avec de l’eau de javel sur les plantes.",
    season: {
      grow: "Maxsea ¼ 1–2×/mois, ou proies, ou les deux en cadence douce.",
      dormancy: "Zéro engrais. Zéro Osmocote nouveau.",
      seedlings: "Rien avant 4–6 vraies feuilles, puis ⅛ (moitié de ¼) une fois.",
      cuttings: "Rien avant racines, puis ⅛ une fois.",
    },
  },

  feeding: {
    title: "Proies : 1–2 fois par mois, pas un buffet",
    frequency: "1–2 repas par mois et par plante adulte en croissance. Les plantules et les dormantes : rien de forcé.",
    how: [
      "Dionaea : 1 insecte vivant (ou congelé/décongelé) par piège, 1–2 pièges seulement. Le piège doit se fermer et étanchéifier ; si tu forces trop gros, il pourrit.",
      "Drosera / Byblis / Drosophyllum : drosophiles, sciarides, pucerons — elles collent. Un foliar léger remplace souvent ce geste.",
      "Sarracenia / Heliamphora / Cephalotus : 1–2 petites proies par urne mature, ou rien si foliar. Un peu d’eau RO dans l’urne Heliamphora.",
      "Nepenthes : mêmes proies, ou 1 bille Osmocote optionnelle, ou quelques ml d’engrais orchidée ¼ dans l’urne — un seul mode à la fois.",
      "Pinguicula : micro-proies, pas de pince lourde. Foliar ¼ plus sûr.",
      "Utricularia : on ne nourrit pas à la pince ; la microfaune du mix suffit.",
    ],
    never: [
      "Viande hachée, fromage, œuf, croquettes, restes de repas — graisse + pourriture de piège.",
      "Gaver tous les pièges le même jour.",
      "Nourrir un piège déjà noir ou une urne desséchée.",
      "Miel, sirop, soda dans les urnes « pour attirer » : fermentation, moisissures.",
    ],
    tentNote:
      "Une tente fermée manque d’insectes. C’est précisément pour ça que le foliar Maxsea ¼ existe. Ouvrir la tente l’été près d’une fenêtre (sans lâcher les sciarides dans le salon) aide. Les sciarides du terreau sont un buffet pour Drosera, un problème pour les semis : on les gère (pièges jaunes, surface qui sèche), on ne les « cultive » pas.",
  },
};
