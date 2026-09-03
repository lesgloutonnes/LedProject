/**
 * Eau, substrats, engrais, proies — Les Gloutonnes · Tourbière
 * Engrais : 0,3 g/L foliar (orchidée ¼ FR/BE, Maxsea US). Jamais Miracle-Gro.
 * Jamais Miracle-Gro, jamais terreau fertilisé.
 */
window.TOURBIERE_NUTRIENTS = {
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
      "Mesurer le TDS (conductimètre ~10 €), pas se fier à la transparence. Seuil de travail : < 50 ppm. Cible confort : 0–20 ppm.",
      "Conversion utile : TDS (ppm, facteur 0,5) × 2 ≈ EC en µS/cm. 50 ppm ≈ 100 µS/cm. Au-delà, ce n’est plus de l’eau de tourbière.",
      "Le pH de l’eau RO est souvent 5–6,5 ; la tourbe tamponne le pot à ~3,5–4,5. On ne « corrige » jamais au calcaire, au bicarbonate ou à l’eau du robinet.",
      "Stocker à l’ombre, bidons opaques, 1–2 semaines max pour la pluie (algues, moustiques). Toiture cuivre / zinc / bitume neuf : on jette.",
      "Arroser / bac avec la même qualité toute l’année, y compris en dormance.",
      "Le bac d’eau n’est pas un engrais : on ne verse jamais de foliar dedans.",
    ],
  },

  substrates: [
    {
      id: "peat-perlite",
      name: "Tourbe blonde + perlite 50/50",
      uses: ["germoir", "Dionaea", "Sarracenia", "Drosera capensis / tempérées", "Byblis liniflora"],
      recipe:
        "Volume à volume, tourbe blonde de sphaigne non amendée + perlite horticole. Lire l’étiquette : « enrichie », « amendée », « chaux », « engrais starter » = poubelle. Rincer à l’eau RO jusqu’à eau claire. Ne pas tasser comme une brique.",
      notes:
        "La tourbe de jardinerie FR/BE est souvent chaulée (pH 5,5–6,5) : les carnivores veulent 3,5–4,5. Tourbe noire trop décomposée : asphyxie. Germoir : ébouillanter le mix (eau RO frémissante, laisser refroidir 24 h) pour casser algues et œufs de sciarides — geste de pépinière, pas de folklore. Sarracenia : pots larges (rhizome horizontal), pas des colonnes profondes. Sable siliceux peut remplacer une partie de perlite (pygmées, Drosophyllum).",
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
      "Miracle-Gro, Engrais universel, billes d’azote jardin, or brun, marc de café, lait, eau de cuisson, cendre, marc, peau de banane.",
      "Arrosage racinaire concentré dans le bac d’eau (algues + sel au collet).",
      "« Engrais spécial carnivores » en dose étiquette, surtout s’il se verse au pied.",
    ],
    products: [
      {
        id: "eu-orchid",
        name: "Engrais orchidée ¼ — le réflexe FR/BE",
        protocol:
          "Poudre ou liquide équilibré (type 20-20-20, 18-18-18, Orchid Focus Grow, Rain Mix) à 0,3 g/L, soit un quart de la dose étiquette si celle-ci vise 1,2 g/L. 1–2×/mois en saison, foliar sur feuillage sec, le matin. Diluant = eau RO uniquement. C’est la dose de travail du site : Maxsea n’est pas magique, c’est le même ordre de grandeur NPK + micros.",
        why: "Maxsea 16-16-16 se trouve mal en Europe. Un orchidée propre, sans urée brute à gogo et sans calcaire, fait le même métier. Adamec 1997 : l’absorption foliaire est réelle. En tente fermée, les insectes manquent : 0,3 g/L remplace une partie des proies, ça ne « dénature » pas la plante.",
        avoid: "Dose étiquette entière. Deux engrais + Osmocote la même semaine. Foliar sur hibernacle, feuilles d’hiver succulentes, ou plantules de moins de 4 feuilles.",
      },
      {
        id: "maxsea",
        name: "Maxsea 16-16-16 (recette US, même dose)",
        protocol:
          "California Carnivores : ¼ c. à café US par gallon (3,8 L). En massique : ≈ 1,2 g / 4 L = 0,3 g/L — on pèse, on ne convertit pas des millilitres de poudre. 1–2×/mois, foliar, feuillage sec. Identique en force à l’orchidée ¼ ci-dessus : on choisit l’un, pas les deux.",
        why: "Recette documentée, pas un sésame. L’algue du Maxsea n’est pas ce qui nourrit : c’est le 16-16-16 à très faible dose. Si tu l’as déjà, garde-le. Si tu dois commander depuis les US, prends un orchidée local.",
        avoid: "Ne pas monter à ½ ou 1 c. à café « pour aller plus vite ». Ne pas traduire ¼ de cuillère par ¼ de bouchon de liquide concentré.",
      },
      {
        id: "rainmix",
        name: "Rain Mix / Peters-type (Nepenthes, Heliamphora)",
        protocol:
          "0,3–0,4 g/L en foliar 1×/mois, ou légère percolation du mix Nepenthes (quelques dizaines de ml, puis eau claire). Jamais dans un bac de Sarracenia. Un seul mode : foliar OU percolation, pas les deux le même jour.",
        why: "Formule d’épiphytes, pauvre en urée, utilisée en collection EU. Utile si tes Nepenthes urnent peu en appartement. Ce n’est pas un engrais « plus fort » : c’est plus propre pour un mix sphaigne/écorce.",
        avoid: "Arrosage à chaque eau. Dose 1 g/L « de serre commerciale ». Rain Mix + orchidée + Osmocote en même temps.",
      },
      {
        id: "osmocote",
        name: "Osmocote : 1 bille dans une urne (option Nepenthes)",
        protocol:
          "Une seule bille d’Osmocote (ou équivalent enrobé) dans une urne mature, pas dans chaque urne, pas dans le substrat. L’urne digère lentement. Option de collection, pas un réflexe mensuel, et pas pour Dionaea / Drosera / Sarracenia (urne ouverte = sel + algues).",
        why: "Appoint localisé, loin des racines, sur adulte qui urne peu. Complète un foliar, ne le remplace pas en cadence.",
        avoid: "Billes dans le mix ou dans le bac. Plusieurs billes « pour voir ». Urnes juvéniles ou desséchées.",
      },
    ],
    algaeAlert:
      "Si le bac verdit, si la sphaigne se recouvre d’un feutre, si une pellicule irisée apparaît : tu arroses trop riche (racinaire, bac engraissé, eau de pluie de gouttière sale) ou tu éclaires l’eau stagnante. On vide, on rince à l’eau RO, on passe foliar only, on masque le bac de la LED. On ne « corrige » pas avec de l’eau de javel sur les plantes.",
    season: {
      grow: "Foliar 0,3 g/L 1–2×/mois, ou proies, ou les deux en cadence douce — un seul NPK.",
      dormancy: "Zéro engrais. Zéro Osmocote nouveau. Zéro « petit coup pour l’hiver ».",
      seedlings: "Rien avant 4–6 vraies feuilles, puis 0,15 g/L une fois (moitié de 0,3).",
      cuttings: "Rien avant racines, puis 0,15 g/L une fois.",
    },
  },

  pests: {
    title: "Ravageurs de tente — on traite l’élevage, pas le salon",
    intro:
      "Une tente chaude et humide élève les sciarides, les pucerons et les acariens plus vite que le jardin. On identifie, on sèche la surface, on isole. Pas de « insecticide plantes vertes » du rayon, pas de savon noir sur le mucilage, pas de cannelle sur un rhizome (ça ne soigne pas une pourriture).",
    items: [
      {
        id: "sciarides",
        label: "Sciarides",
        note: "Adultes = nuage. Dégât réel = larves au collet des semis. Ressuyage de surface, pièges jaunes, bacs opaques. Invasion lourde : nématodes Steinernema feltiae selon étiquette. On ne noie pas le bac « pour les tuer ».",
      },
      {
        id: "pucerons",
        label: "Pucerons (hampes, Nepenthes, Drosera)",
        note: "Jet d’eau RO, isolement, redémarrage de hampe si elle est collée de miellat. Savon noir : jamais sur mucilage ni dans les urnes. Un foliar trop riche attire souvent le puceron : on baisse la cadence, on ne « booste » pas.",
      },
      {
        id: "cochenilles",
        label: "Cochenilles farineuses (Nepenthes, surtout aisselles)",
        note: "Coton-tige + alcool à 70° sur les foyers visibles, 2–3 passages à 5–7 jours. Inspecter le dessous des feuilles. Plante trop infestée : on bouture le propre, on jette le reste. Pas d’huile de neem en saturant l’HR.",
      },
      {
        id: "acariens",
        label: "Acariens (bronzage, toile fine, face inférieure)",
        note: "Air trop sec + chaleur de tente. On remonte l’HR sans fermer hermétique, on rince le feuillage à l’eau RO le matin, on isole. Les Drosera « sèches » ne sont pas toujours un manque de lumière.",
      },
      {
        id: "botrytis",
        label: "Botrytis / mildiou gris",
        note: "HR 90 %+ sans air, tissus morts qui restent. Couper le mou, extraire, cesser le dôme. Soufre horti en poudre sur une coupe de rhizome : option étiquette, pas un bain. Javel et fongicides ménagers : non.",
      },
    ],
  },

  feeding: {
    title: "Proies : 1–2 fois par mois, pas un buffet",
    frequency: "1–2 repas par mois et par plante adulte en croissance. Les plantules et les dormantes : rien de forcé.",
    how: [
      "Dionaea : 1 insecte vivant (ou congelé/décongelé) par piège, 1–2 pièges seulement. Le piège doit se fermer et étanchéifier ; trop gros = pourriture. Pas la peine de « tout nourrir » : 2 pièges / mois sur un adulte, c’est déjà de la production.",
      "Drosera / Byblis / Drosophyllum : drosophiles, sciarides, pucerons — elles collent. Un foliar léger remplace souvent ce geste.",
      "Sarracenia / Heliamphora / Cephalotus : 1–2 petites proies par urne mature, ou rien si foliar. Un peu d’eau RO dans l’urne Heliamphora.",
      "Nepenthes : mêmes proies, ou 1 bille Osmocote optionnelle, ou quelques ml d’engrais orchidée ¼ dans l’urne — un seul mode à la fois.",
      "Pinguicula : micro-proies, pas de pince lourde. Foliar 0,3 g/L plus sûr.",
      "Utricularia : on ne nourrit pas à la pince ; la microfaune du mix suffit.",
    ],
    never: [
      "Viande hachée, fromage, œuf, croquettes, restes de repas — graisse + pourriture de piège.",
      "Gaver tous les pièges le même jour.",
      "Nourrir un piège déjà noir ou une urne desséchée.",
      "Miel, sirop, soda dans les urnes « pour attirer » : fermentation, moisissures.",
    ],
    tentNote:
      "Une tente fermée manque d’insectes. C’est précisément pour ça que le foliar 0,3 g/L existe. Ouvrir la tente l’été près d’une fenêtre (sans lâcher les sciarides dans le salon) aide. Les sciarides du terreau sont un buffet pour Drosera, un problème pour les semis : on les gère (pièges jaunes, surface qui sèche), on ne les « cultive » pas.",
  },
};
