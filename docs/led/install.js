/**
 * Pose Cosmorrow dans une tente carnivores — règles, checklist, accroche, climat, élec.
 */
window.LG_INSTALL = {
  rules: [
    {
      id: "hauteur-growing",
      title: "15 cm au-dessus de la canopée en Growing",
      body: "Fiche COP 2023-09 : COP2065 / COP4065 mesurés à 15 cm. Surface tiède → on peut rapprocher. Hauteur = barre → sommet des plantes (ou terreau au germoir), pas le plancher de tente.",
    },
    {
      id: "hauteur-fs40",
      title: "20 cm pour le FS 40 W",
      body: "COP40FS : mesure constructeur à 20 cm sur 90×60. Ne pas coller à 15 cm comme un Growing. COP20FS reste dans la famille 15 cm / 60×40.",
    },
    {
      id: "pas-dimmable",
      title: "Cosmorrow n’est pas dimmable d’origine",
      body: "Photopériode ON/OFF au programmateur. On « dimme » en montant la barre (5 cm = un cran), pas avec un curseur PWM. Un % dans le simulateur est un voile numérique, pas un Controller+.",
    },
    {
      id: "ip65",
      title: "IP65 ≠ submersible",
      body: "Jet d’eau, pas un bain. Brumisation et arrosage loin des connecteurs 24 V (DC 5,5×2,1). Une barre tombée dans le bac n’est pas un protocole.",
    },
    {
      id: "alim-dehors",
      title: "Driver hors tente",
      body: "Chaleur + splash + extracteur qui aspire l’humidité vers l’alim. Sortir COM* ; ne laisser dans la tente que les barres IP65 et le DC. Même si la fiche dit IP65, certaines refs boutique sont IP54.",
    },
    {
      id: "jamais-20-40",
      title: "Jamais 20 W et 40 W sur la même alim",
      body: "Port calibré. Growing et FS de même wattage : OK (COP4065 + COP40FS sur COM3X40). COP2065 sur COM2X40 : non.",
    },
    {
      id: "deux-bacs",
      title: "Deux bacs 60×40 dans 120×60",
      body: "Soit 1 barre par bac (2 × COP2065, split-per-tray), soit 2 barres 90 cm sur la profondeur (2 × COP4065, parallel-depth). Jamais deux 87 cm bout à bout sur 60 cm.",
    },
    {
      id: "pas-cop40fs-comme-90",
      title: "COP40FS n’est pas un COP4065 court",
      body: "70 cm vs 87 cm, 4,5 cm vs 3,2 cm, 20 cm vs 15 cm, spectre mixte vs 100 % 6500 K. Même alim 40 W, pas la même pièce.",
    },
  ],

  checklist: [
    { step: 1, item: "Tente montée, mylar propre, bac(s) en place, prise 230 V dédiée à portée." },
    { step: 2, item: "Vérifier les longueurs : 47 cm (20 W), 87 cm (COP4065), 70 cm (COP40FS) vs wCm de la tente." },
    { step: 3, item: "Alim COM* assortie au wattage (20 ou 40) et au nombre de ports. Pas de mélange 20/40." },
    { step: 4, item: "Alim à l’extérieur, câble DC qui entre par un passe-gaine, connecteurs vers le haut / hors splash." },
    { step: 5, item: "Accrocher : clips Ø16–25 mm sur la structure, ou crochets / ridoirs. Barres parallèles au grand côté." },
    { step: 6, item: "Régler 15 cm (Growing) ou 20 cm (FS 40 W) au-dessus du terreau / de la canopée. Mesurer au mètre, pas à l’œil." },
    { step: 7, item: "Programmateur ON/OFF sur la prise de l’alim (14 h germoir, 16 h colorisation, 8–10 h dormance)." },
    { step: 8, item: "Extracteur + intracteur, hygromètre à hauteur des plantes. Filtre charbon optionnel." },
    { step: 9, item: "Test à sec 15 min : barres tièdes, pas brûlantes ; aucun clignotement ; alim hors zone humide." },
    { step: 10, item: "Brumisation / arrosage : buses et pompes loin des jack 24 V. IP65 n’autorise pas le jet sur le connecteur ouvert." },
  ],

  hanging: {
    growingCm: 15,
    fs40Cm: 20,
    tropicalCm: 25,
    dormanceCm: 28,
    dimByRaising:
      "Pas de dimmer. +5 cm ≈ un cran plus doux ; +10 cm pour acclimater des boutures ou du tropical. Reculer n’augmente pas l’homogénéité si tu n’as qu’une barre trop courte.",
    layouts: {
      "parallel-depth":
        "Barres parallèles au grand côté, espacées régulièrement sur la profondeur. Kit signature 120×60 : 2 × COP4065 vers ~20 cm et ~40 cm de profondeur (bacs centrés avec 10 cm de marge).",
      "split-per-tray":
        "Une barre centrée sur chaque bac 60×40. 2 × COP2065 dans 120×60 : axe à 30 cm et 90 cm sur les 120 cm.",
      "dual-shelf":
        "Même logique XY à chaque étage. 20 W en bas si la hauteur sous tablette est courte. Deux alims si 20 W et 40 W cohabitent.",
    },
    orientation:
      "Le grand axe de la barre suit le grand axe de la tente (ou du bac). Dans 120×60, les 87 cm courent le long des 120 cm.",
    clips:
      "Les COM* livrent souvent clips Ø16–21 mm et crochets. Structure tente 16–22 mm. Filet SCROG : colliers, pas le poids sur le tissu.",
  },

  climate: {
    extracteur:
      "Extracteur en haut (air chaud / humide), intracteur bas opposé. Pour carnivores, viser un débit bien sous les fiches HPS des tentes : hygro 50–70 % germoir tempéré, 70–85 % tropical. Filtre charbon optionnel (spores, voisinage), ça réduit le débit réel d’~30 %.",
    intracteur:
      "Passif (grille) en petite tente 60×40 / 60×60 ; actif Ø100–125 en 80×80 et plus, plus lent que l’extracteur pour rester en légère dépression.",
    hygrometre:
      "Sonde T°/HR dans la canopée, pas collée à l’extracteur ni sous la barre. Un min/max (écran) suffit ; un data-logger aide en tropical.",
    brumisation:
      "Minuterie courte. Buses et nuage loin des connecteurs 24 V et de l’alim. IP65 = jet, pas brouillard conducteur dans un jack mal enclenché. Plateau d’eau / tourbe humide > brume permanente (fonte, pythium).",
    chaleur:
      "Cosmorrow 20–80 W chauffe peu : un plus en germoir d’appartement. En tropical, ça n’aide pas à tenir 12 °C d’écart jour/nuit — c’est le local qui fait le climat.",
  },

  electricity: {
    mains: "230 V 50 Hz FR/BE, prise Type E/F. Alim Cosmorrow 110–220 V, adaptateurs UE/UK/US souvent dans la boîte : garder le Type E.",
    programmateur:
      "Mécanique 24 h (simple, 15 min près) ou digital (plusieurs plages, réserve). Le programmateur commute le 230 V de l’alim, jamais le 24 V. Cosmorrow n’a pas de port 0–10 V.",
    load:
      "Kits 20–200 W LED : une prise 16 A largement dimensionnée. 150×150 (200 W) + extracteur 40–80 W : toujours < 2 A. Éviter les multiprises empilées dans l’humidité.",
    dc24:
      "Barres 24 V DC, 0,78 A (20 W) / 1,56 A (40 W) fiche 2023-09. Jack IEC 60130-10 5,5×2,1 mm. Ne pas alimenter en 12 V « LED ruban ».",
    ip:
      "Barres IP65. Alims souvent IP65, parfois listées IP54. Hors splash, hors flux d’extracteur, hors bac. Couper le 230 V avant de débrancher un jack mouillé.",
    rcd: "Pièce humide : circuit différentiel 30 mA. Pas de rallonge bricolée à travers une fenêtre.",
  },
};
