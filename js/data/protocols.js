/**
 * Protocoles de tente — Les Gloutonnes
 * LED exclusive : Secret Jardin Cosmorrow (Growing 6500 K en base, FS en appoint).
 */
window.LG_PROTOCOLS = [
  {
    id: "seedling",
    title: "Germoir — semis Sarracenia, Drosera, Dionaea",
    kicker: "14 h · 15–20 cm · 150–250 µmol",
    summary:
      "Un étage plat, deux bacs 60×40, barres Cosmorrow Growing 6500 K à 15–20 cm du terreau. On vise le bas de fourchette adulte : assez pour des plantules trapues, pas assez pour griller un cotylédon. Mix ébouillanté, cold strat pour les tempérées, surface, eau pauvre, graines de l’année.",
    duration: "8–16 semaines jusqu’au premier repiquage ; 2–4 ans jusqu’à un adulte Sarracenia",
    difficulty: 2,
    climate: "20–24 °C jour, 16–20 °C nuit. HR 60–80 % sous dôme les 2 premières semaines, puis aérer. Pas de 30 °C au terreau.",
    light: {
      sku: "2 × COP4065 Growing 6500 K + COM2X40 (tente 120×60) ou 1 × COP2065 par bac 60×40 + COM20 / COM2X20",
      height: "15–20 cm au-dessus du terreau (fiche constructeur : zone 120×60 @ 15 cm pour COP4065)",
      hours: "14 h ON / 10 h OFF, programmateur simple. Pas de dimmer Cosmorrow : on règle à la hauteur.",
      note: "Cible 150–250 µmol/m²/s sur le plateau. Si les hypocotyles s’étirent : descends de 5 cm. Si le terreau verdit et les plantules pâlissent : monte de 5 cm ou aère. Growing 6500 K, pas le COP40FS (70 cm, autre géométrie).",
    },
    water:
      "Eau RO / pluie / distillée / ZeroWater, TDS < 50 ppm. Brita insuffisant. Bac 0,5–1 cm ou vaporisation pour ne pas déplacer les graines. Jamais d’eau du robinet « pour voir ».",
    substrate:
      "Tourbe blonde de sphaigne non amendée + perlite 50/50, tamisée, ébouillantée à l’eau RO, refroidie 24 h, nivelée, jamais compressée. Pas de terreau « special semis » fertilisé, pas de sphaigne vivante en tapis (elle étouffe les cotylédons). Option : fine couche de sphaigne hachée morte pour Drosera.",
    fertilizer:
      "Rien jusqu’aux 4–6 vraies feuilles. Ensuite foliar 0,3 g/L (orchidée ¼ ou Maxsea) 1×/mois, brumisation légère. Jamais Miracle-Gro, jamais d’engrais dans le bac.",
    steps: [
      {
        title: "Trier les lots et la cold strat",
        body: "Sarracenia : 6–8 semaines au frigo (4 °C) — 4 semaines, c’est souvent trop court pour flava / leucophylla. Dionaea et Drosera tempérées (rotundifolia, intermedia, filiformis) : 4–6 semaines. Sachet de papier ou tourbe juste humide, pas un Tupperware étanche qui moisit. Capensis, spatulata, aliciae, Byblis liniflora : pas de froid, semis direct. D. binata : pas de cold strat type rotundifolia. Graines de Sarracenia / Dionaea : l’année de récolte. Note le nom et la date au crayon.",
        checklist: [
          "Lots tempérés au frigo, datés, pas hermétiques",
          "Sarracenia : 6–8 semaines (pas 4)",
          "Lots tropicaux à température, prêts à semer",
          "Sarracenia / Dionaea : lot de l’année (viabilité)",
          "Pas de congélateur (sauf protocole graine très spécifique, hors germoir standard)",
        ],
      },
      {
        title: "Préparer les bacs",
        body: "Bacs 60×40 transparents ou noirs, trous de drainage, soucoupe. Mix tourbe/perlite rincé à l’eau RO, puis ébouillanté (eau RO frémissante, laisser 24 h). Niveau : 4–6 cm. Surface lissée, pas damée. Étiquettes crayon (l’encre coule).",
        checklist: [
          "Mix rincé + ébouillanté, TDS < 50 ppm",
          "Étiquettes latin + date + origine du lot",
          "Dôme ou sac pour la levée, déjà à portée",
        ],
      },
      {
        title: "Semer en surface",
        body: "Les graines de carnivores sont photoblastiques ou trop fines pour l’enfouissement. Surface, on plaque, on vaporise. Sarracenia : à peine l’épaisseur de la graine, pas 5 mm. Densité : 1 graine / cm² max, mieux trop clair qu’un tapis qui fonte. Pas de sphaigne vivante par-dessus.",
        checklist: [
          "Aucune graine enterrée sous 5 mm",
          "Densité claire, pas un tapis",
          "Vaporisation RO, pas un jet",
          "Dôme posé 10–14 jours, aéré 5 min / jour",
        ],
      },
      {
        title: "Allumer Cosmorrow 14 h",
        body: "Barres parallèles à la longueur de tente, 15–20 cm au-dessus du terreau. COP4065 : ne pas les mettre bout à bout sur 60 cm. Minuterie 14 h, cycle stable (ex. 7 h–21 h). Les germinations n’ont pas besoin d’un spectre « bloom » : le 6500 K est le bon outil.",
        checklist: [
          "Hauteur 15–20 cm mesurée au terreau, pas au rebord du bac",
          "14 h programmées, testées 24 h à vide",
          "Alims 24 V : ne pas mélanger 20 W et 40 W sur la même COM",
        ],
      },
      {
        title: "Lever le dôme, tenir le cap",
        body: "Levée : 7–21 j (Drosera tropicaux), 2–6 semaines (Dionaea, Sarracenia). Dès que 50 % des graines sont sorties, on aère plus, puis on retire le dôme. Le terreau reste sombre et humide, pas fluo-vert. Si algues : plus d’air, un peu moins d’eau, on ne racle pas les plantules.",
        checklist: [
          "Dôme retiré progressivement",
          "Plantules trapues, pas filiformes",
          "Pas de foliar avant 4–6 feuilles",
          "Sciarides : surface qui ressuye, pièges jaunes — voir diagnostic",
        ],
      },
      {
        title: "Premier repiquage",
        body: "Quand les plantules se touchent ou qu’une vraie urne / un vrai piège apparaît. Touffe de tourbe, pas racine nue. Même mix, pots 5–7 cm, retour sous 14 h à 15–20 cm. On ne « sevre » pas en baissant la lumière : on garde 150–250 µmol.",
        checklist: [
          "Repiquage par motte",
          "Même eau pauvre",
          "Étiquettes recopiées",
        ],
      },
    ],
    stopSignals: [
      "Hypocotyles > 1 cm filiformes : PPFD trop bas ou dôme trop longtemps — descendre la barre.",
      "Terreau vert fluo + plantules translucides : trop d’eau / trop de lumière / trop peu d’air.",
      "Fonte des semis (tiges cernées) : trop chaud + trop humide — aérer, jeter les foyers, ne pas « sauver » au fongicide maison.",
      "Aucune levée à 8 semaines sur lot stratifié : tester un témoin à 20 °C hors frigo, vérifier la date du lot (Sarracenia > 12 mois = souvent mort).",
    ],
    next: ["cutting", "production", "dormancy"],
  },
  {
    id: "cutting",
    title: "Bouturage & acclimatation",
    kicker: "HR 90–100 % · lumière douce · sphaigne",
    summary:
      "Deux métiers dans la même tente basse : boutures de tige Nepenthes en dôme saturé, et leaf pullings Dionaea / Drosera / Pinguicula sur mix à peine humide. La LED ne fait pas raciner : elle évite l’étiolement pendant que l’humidité travaille. Cosmorrow Growing loin, pas Full Spectrum collé.",
    duration: "4–10 semaines jusqu’aux racines ; 2–4 semaines d’acclimatation ensuite",
    difficulty: 2,
    climate: "Nepenthes : 24–28 °C (lowland) ou 20–24 °C jour / 14–18 °C nuit (highland), HR 90–100 % sous dôme. Leaf pullings : 20–24 °C, HR 80–95 %. Air stagnant sans stérilité = pourriture : on aère 2 min par jour.",
    light: {
      sku: "COP2065 Growing 6500 K (étagère 60×40) ou COP4065 relevée",
      height: "30–40 cm (Nepenthes) ; 25–30 cm (leaf pullings). Cible 40–120 µmol, jamais 250.",
      hours: "12–14 h",
      note: "Lumière douce = bouture qui photosynthétise sans transpirer. Un COP40FS à 15 cm cuit le pétiole. On préfère Growing 6500 K loin.",
    },
    water:
      "Sphaigne essorée, pas dégouttante. Eau RO uniquement. Le dôme condense : si les parois ruissellent en continu, on ouvre plus longtemps.",
    substrate:
      "Nepenthes : sphaigne longue fibre pure, ou LFS + perlite. Dionaea / Drosera : tourbe/perlite ou sphaigne hachée. Pinguicula mexicaine : mix minéral à peine humide, jamais sphaigne gorgée.",
    fertilizer: "Rien tant qu’il n’y a pas de racines. Puis foliar 0,15 g/L une fois (moitié de 0,3), ensuite protocole adulte.",
    steps: [
      {
        title: "Bouture Nepenthes — le bois",
        body: "Tige saine, 1–2 nœuds, feuille coupée de moitié pour limiter la transpiration. Coupe nette sous un nœud. Pas de gel d’hormone obligatoire ; un peu d’hormone de bouturage horti (talc) est optionnel. On jette tout morceau mou ou noir.",
        checklist: [
          "1–2 nœuds, coupe sous nœud",
          "Feuille réduite de moitié",
          "Outil propre, pas de tige florale épuisée",
        ],
      },
      {
        title: "Dôme saturé, lumière loin",
        body: "Sphaigne dans un godet, bouture enterrée jusqu’au nœud, dôme ou sac zip. COP2065 à 30–40 cm, 12–14 h. On ne touche plus tous les jours. Racines blanches en 4–10 semaines. Première mini-urne = bonus, pas un objectif.",
        checklist: [
          "HR 90–100 % sous dôme",
          "40–80 µmol au feuillage",
          "Aération 2 min / jour",
        ],
      },
      {
        title: "Leaf pulling Dionaea",
        body: "Feuille entière avec un croissant de rhizome blanc. À plat, face supérieure vers le haut, sur tourbe ou sphaigne. Dôme, 20–24 °C, COP2065 à 25–30 cm. Plantules au pétiole en 4–8 semaines. Le limbe noircit souvent : tant que le pétiole est ferme, on attend.",
        checklist: [
          "Fragment de rhizome blanc présent",
          "Pas d’eau stagnante sur le pétiole",
          "Lumière ~80–120 µmol",
        ],
      },
      {
        title: "Leaf pulling Drosera",
        body: "Feuille mature, à plat ou bout de limbe, sphaigne juste humide, HR haute. Capensis et spatulata sont faciles (3–6 semaines). Tempérées : plutôt en saison de croissance, pas sur un hibernacle. Une feuille peut donner plusieurs plantules.",
        checklist: [
          "Feuille non fleurie, non sénescente",
          "Sphaigne essorée",
          "Pas de foliar",
        ],
      },
      {
        title: "Leaf pulling Pinguicula mexicaine",
        body: "Feuille carnivore saine, posée sur mix drainant à peine humide. HR 70–80 %, pas un sauna 100 % — le collet mexicain pourrit. Lumière 40–80 µmol. Plantules en 3–8 semaines. On ne tire pas les feuilles d’hiver succulentes.",
        checklist: [
          "Mix qui ressuye",
          "HR < 90 %",
          "Feuille d’été uniquement",
        ],
      },
      {
        title: "Acclimatation",
        body: "Dès les racines : on fend le dôme 1 h, puis 4 h, puis une nuit, en 10–21 jours. On ne passe pas d’un sac saturé à l’étage Sarracenia 300 µmol. Palier : même tente, étage bas, 14 h, puis on monte d’un cran de PPFD par semaine.",
        checklist: [
          "Racines visibles avant sevrage",
          "Sevrage en 10–21 jours",
          "Premier foliar ⅛ seulement après 2 semaines hors dôme",
        ],
      },
    ],
    stopSignals: [
      "Tige Nepenthes molle et brune dès J+7 : trop mouillé ou bois déjà fatigué — on recommence avec moins d’eau.",
      "Pétiole Dionaea translucide : pourriture, on jette, on n’attend pas « au cas où ».",
      "Feuille Pinguicula en gelée : HR trop haute ou mix détrempé.",
      "Bouture étiolee blanche : barre trop loin / trop peu d’heures — rapprocher de 5–10 cm, pas coller à 10 cm.",
    ],
    next: ["production", "tropical", "mixed"],
  },
  {
    id: "production",
    title: "Production d’adultes",
    kicker: "Photons stables · pots larges · 0,3 g/L",
    summary:
      "La tente n’est plus un germoir : hauteur d’urnes, pots larges, PPFD bas-milieu Carnivero, foliar 0,3 g/L. En FR/BE, les adultes tempérés (Sarracenia, Dionaea) font une meilleure saison dehors mai–septembre (soleil, pluie, proies) : la tente garde tropicales, germoir, et l’appartement sans extérieur. Cosmorrow Growing en plafond, FS seulement si tu manques de DLI sans descendre les barres.",
    duration: "Saison de croissance 7–8 mois (tempérées) ou continu (tropicales)",
    difficulty: 1,
    climate:
      "Tempérées : 20–28 °C jour, nuits 12–18 °C, HR 45–65 %. Tropicales : voir protocole tropical. On ne mélange pas les deux sans étages (protocole mixed).",
    light: {
      sku: "2 × COP4065 + COM2X40 en plafond de tente 120×60×150 ; appoint possible 1 × COP20FS sur une zone à colorer",
      height: "15–25 cm du sommet du feuillage (Sarracenia, Dionaea, Drosera) ; 25–40 cm (Nepenthes, Pinguicula)",
      hours: "13–14 h en saison ; 12 h en palier d’automne avant dormance",
      note: "Cibles : Dionaea / Sarracenia basses / Drosera ~200 µmol ; Sarracenia dressées ~300 ; Nepenthes ~80–100. On mesure à la hauteur des têtes, pas au sol.",
    },
    water:
      "Tempérées : bac 1–3 cm, eau RO, on laisse parfois le bac presque à sec 24 h. Tropicales : mix humide, pas de lac. Toujours TDS < 50 ppm.",
    substrate:
      "Tourbe/perlite 50/50 non amendée pour le groupe tourbière. LFS + écorce + perlite pour Nepenthes. Pots : 8–10 cm Dionaea (un peu à l’étroit), 2–3 L larges Sarracenia adulte (rhizome horizontal), paniers aérés Nepenthes. Darlingtonia seule a besoin d’un tube profond.",
    fertilizer:
      "Foliar 0,3 g/L (orchidée ¼ ou Maxsea), 1–2×/mois, feuillage sec, matin. Proies 1–2×/mois. Un seul NPK. Jamais de terreau fertilisé, jamais Miracle-Gro, jamais d’engrais dans le bac. Racinaire = algues.",
    steps: [
      {
        title: "Installer le plafond Cosmorrow",
        body: "Deux COP4065 dans le sens des 120 cm, écartées sur les 60 cm (tiers). Alim COM2X40, 24 V, IP65 : les connecteurs restent hors d’eau stagnante. Programmateur 14 h. On ne mélange pas une 20 W et une 40 W sur la même alim.",
        checklist: [
          "Barres parallèles, pas bout à bout",
          "COM2X40 dédiée aux 40 W",
          "Hauteur réglable (cables / barres transversales)",
        ],
      },
      {
        title: "Rempoter juste",
        body: "Fin d’hiver / débourrement pour les tempérées ; n’importe quand hors canicule pour les tropicales. Rhizome Sarracenia à fleur de mix, point de croissance libre, pot large : il avance à l’horizontale et bute en 12–24 mois si le pot est étroit (la tourbe s’affaisse aussi). Dionaea : ne pas enterrer le collet. Nepenthes : collet au niveau, mix aéré, pas de tourbe brique, pas de coco.",
        checklist: [
          "Mix non fertilisé, rincé — pas de coco, pas de terre de bruyère de rayon",
          "Pots larges pour Sarracenia (2–3 L), pas un tube, pas « 10 L pour plus tard »",
          "Eau RO dès le premier arrosage",
        ],
      },
      {
        title: "Caler PPFD et heures",
        body: "On commence bas-milieu Carnivero. Dressées trop vertes et molles : on descend la barre de 5 cm ou on passe à 16 h. Nepenthes sans urnes : souvent HR ou jeunesse, pas un manque de 300 µmol — on ne les hisse pas au plafond.",
        checklist: [
          "14 h stables",
          "Têtes dans la fenêtre du genre",
          "Extracteur pour la chaleur de tente, pas pour « sécher » les Nepenthes",
        ],
      },
      {
        title: "Nourrir sans gaver",
        body: "Adamec 1997 : le foliar et les proies stimulent aussi l’absorption racinaire. 1–2 repas / mois ou un foliar 0,3 g/L, pas les deux tous les 3 jours. Pièges Dionaea : 1 insecte vivant, 1–2 pièges ; congelé seulement si tu masses les poils sensitifs (sinon le piège ne scelle pas et pourrit). Urnes Nepenthes : 1–2 proies ou 1 bille Osmocote — pas les Sarracenia.",
        checklist: [
          "Calendrier foliar 1–2×/mois, 0,3 g/L pesé",
          "Dionaea : proie vivante, ou massage des poils si décongelée",
          "Pas de viande hachée, pas d’engrais dans le bac",
        ],
      },
      {
        title: "Été FR/BE : dehors si tu as le soleil",
        body: "Sarracenia et Dionaea adultes : plein soleil, bac d’eau de pluie, mai–septembre. C’est le geste de pépinière — DLI, proies, puis dormance naturelle. La tente garde Nepenthes, Heliamphora, germoir, Cephalotus, et l’appartement sans extérieur. On ne « sort pas les tropicales pour leur donner de l’air » : un lowland au vent sec de juin grille.",
        checklist: [
          "Adultes tempérés dehors dès que les gelées sont derrière",
          "Tropicales et semis restent sous Cosmorrow",
          "Rentrée progressive en septembre (protocole dormance)",
        ],
      },
      {
        title: "Entretenir le rythme",
        body: "Couper le sec (urnes vides, pièges noirs) au tissu mort, pas au vert. Hampes de dionée / Sarracenia : on coupe sur un jeune, on laisse seulement un adulte dont on veut les graines — une floraison n’« accélère » pas un rhizome de 2 cm. Surveiller TDS si tu stockes l’eau de pluie (gouttières = pollen + poussière). Prévoir la dormance dès septembre pour les tempérées : on ne « pousse » pas jusqu’à Noël.",
        checklist: [
          "Nettoyage mensuel des feuilles mortes",
          "Hampes des jeunes coupées, sauf lot de graines",
          "TDS vérifié",
          "Photo mensuelle : le meilleur capteur de DLI",
        ],
      },
    ],
    stopSignals: [
      "Urnes / pièges de plus en plus petits : pot trop petit, lumière trop faible, ou absence de dormance l’hiver précédent.",
      "Pointes brunes : TDS, sel d’engrais, ou barre trop près.",
      "Algues dans le bac : racinaire ou lumière sur l’eau — on vide, on rince, on passe foliar only.",
    ],
    next: ["coloring", "mixed", "dormancy", "tropical"],
  },
  {
    id: "coloring",
    title: "Colorisation — le rouge sans magie 660",
    kicker: "DLI × génotype · Growing 6500 K d’abord",
    summary:
      "Le rouge des carnivores, c’est surtout des anthocyanes sous un DLI suffisant, un génotype qui les a, et souvent des nuits un peu fraîches. Ce n’est pas un pic 660 nm obligatoire. Cosmorrow Growing 6500 K colore déjà Sarracenia, Dionaea et Drosera. Le Full Spectrum (COP20FS / COP40FS) est un appoint si tu veux plus de DLI sans coller les barres, pas un sésame.",
    duration: "3–8 semaines pour voir un delta ; une saison pour juger un cultivar",
    difficulty: 2,
    climate: "Nuits 12–16 °C aident (Dionaea, Sarracenia, Drosera, Heliamphora, Cephalotus). HR modérée : 50–65 % pour les tempérées. Un sauna chaud lave souvent la couleur.",
    light: {
      sku: "Base : COP4065 Growing 6500 K. Appoint optionnel : COP20FS sur une zone, jamais à la place du Growing au germoir",
      height: "12–20 cm des têtes pour viser 250–350 µmol sur les genres qui le supportent (dressées, dionées adultes, Drosera de soleil)",
      hours: "14–16 h pour monter le DLI sans forcément coller la barre. 16 h × 250 µmol ≈ 14,4 mol — déjà une fenêtre « rouge ».",
      note: "Formule : DLI = PPFD × heures × 0,0036. Colorer = monter le DLI dans la fourchette du genre, pas saturer un pic rouge. Au-delà du max Carnivero, tu brûles avant de « plus rougir ».",
    },
    water: "Inchangé : eau pauvre. Un léger ressuyage (pas un séchage de cactus) peut intensifier les pigments chez Drosera et Sarracenia basses — on reste prudent.",
    substrate: "Le mix ne colore pas. Un pot trop gros et trop humide dilue la croissance : on reste dans des volumes justes.",
    fertilizer:
      "Un foliar régulier 0,3 g/L aide le métabolisme (Carnivero : plus de lumière = plus de besoin via les pièges). Une carence affadit. Un excès fait du vert mou. On ne « stresse à l’azote zéro ».",
    steps: [
      {
        title: "Trier le génotype",
        body: "Une Sarracenia flava typique reste citron. ‘Adrian Slack’, leucophylla, ‘Red Dragon’, Drosera ‘Rubra’, Heliamphora minor : là, le DLI se voit. Photographier avant, même angle, même heure d’allumage.",
        checklist: [
          "Cultivar noté",
          "Photo J0",
          "On n’attend pas de rouge d’un clone vert connu",
        ],
      },
      {
        title: "Monter le DLI, pas le mythe",
        body: "Option A : descendre Growing de 5 cm. Option B : passer de 14 à 16 h. Option C : ajouter un COP20FS en appoint sur la zone, 20–30 cm. On change un levier à la fois pendant 2 semaines. Le 6500 K contient déjà du rouge photosynthétique ; il n’est pas « trop bleu pour colorer ».",
        checklist: [
          "Un seul levier à la fois",
          "PPFD encore dans le max du genre",
          "FS = appoint, pas remplacement du Growing",
        ],
      },
      {
        title: "Fraîcheur nocturne",
        body: "Extracteur la nuit, tente contre un mur frais, ou simple baisse de la pièce. 12–16 °C au terreau pour les tempérées. Les anthocyanes s’expriment mieux. Pas de vent glacial sur des Nepenthes lowland.",
        checklist: [
          "Drop nocturne mesuré 2–3 nuits",
          "Pas de condensation glacée sur les barres (IP65, mais les plantes n’aiment pas le goutte-à-goutte froid)",
        ],
      },
      {
        title: "Nourrir le métabolisme",
        body: "À 300 µmol, une Sarracenia qui ne mange jamais jaunit mal, elle ne « rougit pas mieux ». Foliar 0,3 g/L 2×/mois ou proies. Observer mucilage, nectar, fermeté des urnes : la couleur sans vigueur n’est pas un succès.",
        checklist: [
          "Foliar ou proies tenus",
          "Pas d’engrais racinaire « pour rougir »",
        ],
      },
      {
        title: "Juger à 6–8 semaines",
        body: "Les nouvelles feuilles comptent, pas les anciennes. Si brûlure (blanchiment, croûtes) : on remonte 5 cm, on revient à 14 h. Si toujours vert sur un clone réputé rouge : lumière encore juste, ou clone mal nommé.",
        checklist: [
          "Photo J45",
          "Décision : maintenir, pousser 1 cran, ou arrêter",
        ],
      },
    ],
    stopSignals: [
      "Blanchiment / papier de verre sur les opercules : trop de PPFD, on remonte.",
      "Feuilles recroquevillées noires-rouges (Pinguicula) : stress, pas une belle colorisation.",
      "Urnes Nepenthes qui avortent : tu es hors fenêtre, on redescend.",
    ],
    next: ["production", "mixed"],
  },
  {
    id: "mixed",
    title: "Tente mixte multi-étages",
    kicker: "Haut = Sarracenia · bas = Nepenthes",
    summary:
      "Une seule tente 120×60×150 peut servir deux climats photoniques, pas deux climats thermiques. On empile : plafond COP4065 pour les tourbières à fort PPFD, tablette à mi-hauteur avec COP2065 ou simple reliquat de lumière pour Nepenthes / Pinguicula. L’eau et la HR restent le vrai casse-tête : bac d’eau en haut, mix aéré en bas, extracteur unique.",
    duration: "Installation 1 week-end ; réglages 2–4 semaines",
    difficulty: 3,
    climate:
      "Compromis : 22–26 °C jour, 16–20 °C nuit, HR 55–70 %. Trop froid pour de vraies lowland strictes, trop doux pour un hibernacle. Les highland easy (ventricosa) et capensis s’y plaisent. Darlingtonia / Heliamphora strictes : non.",
    light: {
      sku: "Plafond : 2 × COP4065 + COM2X40. Étage bas : 1–2 × COP2065 + COM20 ou COM2X20, ou rien si le reliquat fait 60–100 µmol",
      height: "Haut : 15–20 cm des têtes Sarracenia / Dionaea. Bas : 30–40 cm au-dessus des Nepenthes, ou tablette à 50–60 cm du sol",
      hours: "14 h pour tout le monde en saison. En automne, les tempérées devront sortir vers la dormance : la tente mixte n’est pas un hivernage.",
      note: "Ne pas mélanger 20 W et 40 W sur la même alim. COP40FS (70 cm) n’aligne pas avec COP4065 (87 cm) : on ne fait pas un « damier » FS/Growing en croyant uniformiser.",
    },
    water:
      "Deux régimes. Haut : soucoupes / bac. Bas : arrosage à la pompe, jamais le trop-plein des Sarracenia qui ruisselle dans les Nepenthes (sel, tourbe, algues).",
    substrate: "Chaque genre son mix. Pas de « terreau universel carnivore » du commerce fertilisé. Étiqueter les pots : à 23 h sous LED, tout se ressemble.",
    fertilizer: "Foliar par étage, 0,3 g/L. On ne vaporise pas les Pinguicula mexicaines le même jour à la même dose que les Sarracenia si elles sont en feuilles d’hiver.",
    steps: [
      {
        title: "Poser la tablette",
        body: "Tablette filet ou caillebotis à ~60–70 cm, pour que l’air passe. L’étage haut garde 70–80 cm de hauteur d’urne. Charge : pots + eau, on ne sous-dimensionne pas.",
        checklist: [
          "Tablette aérée, pas une planche pleine qui coupe l’extracteur",
          "Goutte-à-goutte du haut canalisé (bacs, pas le vide)",
        ],
      },
      {
        title: "Plafond Growing pour les gourmandes",
        body: "Sarracenia dressées (y compris minor), Dionaea, Drosera de soleil, Byblis : étage haut, 15–20 cm sous COP4065, 200–300 µmol. Les basses (purpurea, psittacina, pygmées) au bord, un peu plus loin du hotspot. Minor n’est pas une « petite » : urne dressée à opercule.",
        checklist: [
          "Dressées au centre-haut",
          "Basses en périphérie",
          "Rien qui touche les barres",
        ],
      },
      {
        title: "Étage bas pour les ombragées",
        body: "Nepenthes easy, Utricularia épiphytes, Pinguicula mexicaines : 60–120 µmol. Si le reliquat du plafond suffit (mesure), pas besoin de COP2065. Sinon une barre 20 W à 30–40 cm. Lowland strictes seulement si tu tiens 24 °C la nuit — rare en mixte.",
        checklist: [
          "PPFD bas mesuré, pas deviné",
          "COP2065 si < 50 µmol au feuillage Nepenthes",
          "Pinguicula hors bac d’eau",
        ],
      },
      {
        title: "Air et HR de compromis",
        body: "Extracteur en haut, entrée d’air basse. HR 55–70 % : un peu sec pour une bouture Nepenthes, un peu humide pour Drosophyllum. On n’y met ni l’un ni l’autre. Un petit plateau d’eau RO peut localement monter l’HR du bas sans asperger le haut.",
        checklist: [
          "Extracteur 24 V / 230 V hors d’eau",
          "HR lue à chaque étage 3 jours de suite",
        ],
      },
      {
        title: "Sortir les dormantes",
        body: "En octobre, Dionaea et Sarracenia quittent la mixte vers le protocole dormance. Laisser les tropicales en 13–14 h. Une tente qui reste à 14 h et 24 °C « pour tout le monde » l’hiver sacrifie les tempérées.",
        checklist: [
          "Date de sortie des dormantes notée",
          "Photopériode tropicale maintenue à part",
        ],
      },
    ],
    stopSignals: [
      "Nepenthes criblées de points secs : HR trop basse ou trop-plein de tourbe du haut.",
      "Sarracenia étiolement : tablette trop proche des barres (têtes dans l’ombre des pots ? on inverse le diagnostic) ou PPFD volé par un étage trop chargé.",
      "Mouches du terreau partout : bac d’eau + chaleur — on sèche en surface, on piège, on ne « arrose plus pour noyer ».",
    ],
    next: ["production", "tropical", "dormancy", "coloring"],
  },
  {
    id: "tropical",
    title: "Chambre tropicale",
    kicker: "Extracteur · HR 60–80 % · pas de dormance",
    summary:
      "Nepenthes, Heliamphora, Drosera capensis, Byblis liniflora, Utricularia épiphytes : croissance continue, 12–14 h, jamais 5 °C. Cephalotus n’est pas une lowland : étage frais, collet aéré, pas 30 °C / 90 % HR. L’extracteur empêche botrytis et collet mou. Cosmorrow Growing en doux, PPFD bas-milieu Carnivero.",
    duration: "Année complète ; palier d’acclimatation 2–3 semaines pour les nouvelles",
    difficulty: 2,
    climate:
      "Lowland : 26–32 °C jour, 20–25 °C nuit, HR 70–85 %. Highland / Heliamphora : 20–26 °C jour, 10–16 °C nuit, HR 65–85 %. Cephalotus : plutôt le second, jamais le premier. On choisit UN régime par tente. HR 60–80 % utile ; 100 % fermé sans air est un piège.",
    light: {
      sku: "2 × COP4065 en plafond pour une tente haute, ou 2–4 × COP2065 sur étagères. COP20FS possible en appoint highland",
      height: "25–40 cm des têtes Nepenthes / Heliamphora ; 20–30 cm Cephalotus / capensis",
      hours: "12–14 h toute l’année. Pas de descente à 8 h « pour leur faire un hiver ».",
      note: "Cibles : Nepenthes 80–100 µmol, Heliamphora 200, Cephalotus 120, capensis 180. Le plafond Sarracenia 300 µmol n’est pas un objectif tropical.",
    },
    water:
      "Pas de bac unique type tourbière. Arrosage RO du mix, soucoupes vidées. Heliamphora : un peu d’eau RO dans l’urne en permanence (pas un suc digestif : de l’eau). Cephalotus : ressuyage, étage frais, pas la jungle 30 °C. Stock d’eau à température de pièce pour les lowland, plus frais pour highland.",
    substrate:
      "Nepenthes / Heliamphora / Utric épiphytes : LFS + écorce + perlite. Cephalotus : tourbe/perlite/sable aéré. Capensis / Byblis : tourbe/perlite 50/50. Sphaigne vivante : on la change quand elle brunit en anaérobie.",
    fertilizer:
      "Foliar 0,3 g/L 1×/mois (orchidée ou Rain Mix sur Nepenthes). 1 bille Osmocote dans une urne mature (option Nepenthes). Proies 1–2×/mois. Racinaire rare.",
    steps: [
      {
        title: "Choisir lowland ou highland",
        body: "Deux étiquettes, deux tentes, ou on se limite aux « easy » (ventricosa et intermédiaires, capensis, hybrides alata/graciliflora). Ventricosa n’est pas une lowland : elle veut un drop nocturne, elle pardonne une mixte, elle cuit moins vite qu’hamata mais elle n’est pas bicalcarata. Bicalcarata à côté d’hamata dans 1 m³ : l’un des deux souffre. Note jour/nuit cibles sur un papier collé à la tente.",
        checklist: [
          "Régime thermique unique écrit",
          "Liste de genres compatibles",
          "Thermomètre min/max à hauteur des pots",
        ],
      },
      {
        title: "Air d’abord",
        body: "Extracteur + entrée opposée. On vise un renouvellement doux, pas un mistral. HR 60–80 % : humidificateur à vapeur froide eau RO si tu descends sous 55 %, jamais d’huile essentielle. Condensation sur les parois = trop ; feuilles molles = trop peu d’air.",
        checklist: [
          "Extracteur en place avant les plantes",
          "HR lue 3×/j pendant une semaine à vide",
          "Pas de brumisateur calcaire",
        ],
      },
      {
        title: "LED douce, étagères possibles",
        body: "Étagères + COP2065 = parfait tropical (chaque tablette 40–80 µmol à 30 cm, on rapproche si besoin). Plafond COP4065 : plantes hautes au milieu, jeunes en périphérie. 13 h, cycle stable.",
        checklist: [
          "Aucune barre à 10 cm d’une urne",
          "20 W et 40 W sur alims séparées",
          "IP65 : on vaporise les plantes, pas les alims",
        ],
      },
      {
        title: "Remplir sans entasser",
        body: "Les Nepenthes veulent de la canopée et de l’air au collet. On ne plaque pas 20 pots. Tuteurs pour les tiges. Première urne : on la laisse, même imparfaite. Chute d’urnes 2 semaines après achat : choc d’HR, on attend avant de changer lumière ET mix.",
        checklist: [
          "Espace entre pots",
          "Acclimatation 2 semaines (sac ouvert progressivement si plante sac plastique)",
          "Un seul changement de culture à la fois",
        ],
      },
      {
        title: "Tenir l’année",
        body: "Pas de dormance. Rempotage quand la sphaigne s’effondre (12–24 mois). Foliar mensuel. Si tu veux des Sarracenia, elles vivent ailleurs l’hiver (protocole dormance), pas ici à 14 h / 26 °C.",
        checklist: [
          "Calendrier rempotage sphaigne",
          "Foliar mensuel noté",
          "Tempérées absentes de cette tente l’hiver",
        ],
      },
    ],
    stopSignals: [
      "Botrytis gris, tiges molles : HR 90 %+ sans air — on ouvre, on coupe le mou, on ne « booste pas l’humidité pour rattraper ».",
      "Urnes qui avortent en masse : air trop sec ou PPFD trop bas, ou plante juvénile — on corrige HR avant de coller la LED.",
      "Collet Cephalotus noir : trop chaud / trop mouillé, on dessèche et on fraîchit.",
    ],
    next: ["cutting", "production", "mixed"],
  },
  {
    id: "dormancy",
    title: "Dormance tempérée",
    kicker: "3–4 mois · froid réel · 8–10 h · mix juste humide",
    summary:
      "Dionaea, Sarracenia, Drosera tempérées, Pinguicula tempérées, Darlingtonia : sans cet hiver, la plante pousse un an puis s’épuise. En FR/BE, le geste de pépinière c’est le dehors (châssis, bac, garage hors gel) — pas une tente Cosmorrow à 20 °C avec un programmateur à 9 h. La tente n’est que le plan B si tu n’as pas de froid. On baisse photopériode, intensité et température ensemble, on cesse le foliar, on retire le bac. Ce n’est pas une mort.",
    duration: "3–4 mois (typiquement novembre–février en FR/BE)",
    difficulty: 2,
    climate:
      "Cible 0–10 °C. Sarracenia et dionées adultes supportent le gel léger dehors (châssis, vent moins desséchant qu’un balcon nu). En tente / garage : 5–10 °C, hors gel de préférence. HR 40–60 %. Air qui bouge. Un salon à 19 °C n’est pas une dormance, même à 8 h de LED.",
    light: {
      sku: "1 × COP2065 ou 1 × COP4065 relevée très haut ; éventuellement la même rampe qu’en saison, simple minuterie plus courte",
      height: "30–50 cm, ou intensité perçue ~30–50 % de la saison (on n’a pas de dimmer : on éloigne)",
      hours: "8–10 h. On descend progressivement en octobre (14 → 12 → 10 → 8–9 h) sur 3–4 semaines.",
      note: "Dehors : la photopériode naturelle FR/BE suffit, pas besoin de Cosmorrow. Tente / garage : 8–10 h, Growing loin. Pas de Full Spectrum « pour les réveiller ». Pas de 16 h en janvier « elles sont tristes ». Pièges noirs et urnes molles : attendus.",
    },
    water:
      "Substrat juste humide, plus de bac permanent. Un glaçage du pot n’est pas un arrosage. Eau RO, rare. Le dessèchement complet du rhizome, en revanche, tue : on pèse le pot une fois par semaine.",
    substrate: "On ne rempote pas à l’entrée d’hiver (sauf urgence pourriture). Rempotage au débourrement, mars–avril.",
    fertilizer: "Zéro foliar, zéro proie forcée. Les pièges restants ne se nourrissent plus.",
    steps: [
      {
        title: "Choisir le lieu : dehors d’abord",
        body: "FR/BE : Sarracenia et Dionaea adultes hivernent mieux dans un châssis, un bac contre un mur nord, ou un garage hors gel que dans une tente chauffée. La LED ne fait pas le froid. On réserve Cosmorrow 8–10 h au plan B (appartement sans extérieur) et aux quelques pots de frigo (dionées en godet, jamais un sac zip hermétique). Les tropicales ne vont nulle part ici.",
        checklist: [
          "Lieu noté : dehors / garage / tente froide / frigo (quelques dionées)",
          "Tropicales déjà dans une autre tente à 13–14 h",
          "Châssis : pots rentrés si dessiccation de foehn, pas si « il gèle un peu »",
        ],
      },
      {
        title: "Préparer dès septembre",
        body: "On arrête le foliar. On laisse les dernières urnes / pièges travailler. On ne force plus la colorisation. Photopériode 14 h encore. Les plantes d’intérieur « au chaud » doivent déjà viser une pièce plus fraîche ou la sortie.",
        checklist: [
          "Foliar stoppé",
          "Inventaire : qui DOIT dormir vs qui reste en tropical",
        ],
      },
      {
        title: "Rampe de descente",
        body: "Octobre : 12 h, barre +10 cm, ou sortie progressive dehors. Novembre : 8–10 h et 0–10 °C. On ne plonge pas de 26 °C à 5 °C en une nuit. Frigo : godet dans un bac aéré, un peu de lumière (COP2065 loin ou lumière du bac), jamais un Tupperware fermé.",
        checklist: [
          "Palier 12 h puis 8–10 h (tente) ou alignement au jour naturel (dehors)",
          "T° suivie min/max",
          "Tropicales sorties de cette zone",
        ],
      },
      {
        title: "Hiverer proprement",
        body: "Couper le tissu vraiment mort, laisser les bases et les phyllodes. Bac retiré. Contrôle pourriture (odeur, rhizome mou). Dehors : vent desséchant = un arrosage RO de temps en temps, pas un lac. Tente : Cosmorrow loin, 8–10 h. Frigo : aérer 1×/semaine.",
        checklist: [
          "Pots pesés / humidité contrôlée 1×/semaine",
          "Pas de dôme hermétique (mildiou)",
          "8–10 h stables",
        ],
      },
      {
        title: "Débourrement",
        body: "Février–mars : allonger à 10 puis 12 puis 14 h sur 3 semaines, remonter un peu la T°, bac d’eau qui revient, rempotage si besoin. Premier foliar seulement après 3–4 semaines de vraie pousse. Les premiers pièges sont petits : normal.",
        checklist: [
          "Remontée photopériode étalée",
          "Rempotage au débourrement si prévu",
          "Foliar reporté",
        ],
      },
    ],
    stopSignals: [
      "Rhizome mou, noir, odeur : pourriture — on coupe au dur, soufre horti optionnel, on sèche, on ne noie pas.",
      "Pousses filiformes en janvier à 20 °C : ce n’est pas une dormance, c’est un salon trop chaud — dehors, garage, ou plante que tu assumes affaiblie.",
      "Pot poids plume, mix clair : trop sec, un arrosage RO, on surveille.",
    ],
    next: ["production", "seedling", "coloring"],
  },
];
