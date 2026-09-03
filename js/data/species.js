/**
 * Fiches genres — Les Gloutonnes
 * PPFD : Carnivero/Florawave (cibles = bas-milieu de fourchette, photopériode 12–14 h).
 * * = estimation Carnivero (non testé sous LED).
 * LED du site : Secret Jardin Cosmorrow uniquement.
 */
window.LG_SPECIES = [
  {
    id: "dionaea",
    latin: "Dionaea muscipula",
    common: "Dionée attrape-mouche",
    family: "Droseraceae",
    climate: "temperate",
    dormancy: "required",
    dormancyNote:
      "Obligatoire 3–4 mois, 0–10 °C, photopériode 8–10 h, intensité réduite. En FR/BE, un châssis / un rebord hors gel vaut mieux qu’une tente à 20 °C. Sans dormance, la plante s’épuise en 1–3 saisons. Les pièges noircissent en hiver : c’est normal, pas une maladie.",
    ppfd: [100, 200, 400],
    dli: [4.3, 9.4, 20.2],
    photoperiodGrow: 14,
    photoperiodDorm: 9,
    humidity: [40, 55, 75],
    tempDay: [20, 28],
    tempNight: [10, 18],
    water: "tray",
    waterNote:
      "Bac d’eau 1–2 cm en saison de croissance, eau RO / pluie / osmosée uniquement (TDS < 50 ppm). En dormance : substrat juste humide, plus de bac permanent.",
    substrate: "Tourbe blonde + perlite 50/50, pots 8–12 cm. Éviter la sphaigne pure (trop spongieuse au long cours).",
    fertilizer:
      "Foliar 0,3 g/L (orchidée ¼ ou Maxsea 16-16-16) 1–2×/mois en saison, feuillage sec, matin. Proies 1–2 pièges / mois suffisent souvent. Jamais Miracle-Gro, jamais terreau fertilisé, jamais d’engrais dans le bac.",
    tentTips:
      "Étage haut, 15–20 cm sous COP4065 Growing 6500 K (ou COP2065 sur une étagère 60×40). La dionée veut du photon et de l’air, pas une jungle à 90 % HR. Extraire pour rester ~50–60 %. Viser 200 µmol/m²/s, pas 400 d’emblée. Pot 8–10 cm, légèrement à l’étroit : un 3 L n’accélère pas un rhizome de 2 cm. En FR/BE, un adulte hors gel va dehors mai–septembre (soleil, pluie, proies) : la tente est le plan appartement / germoir, pas un substitut d’été.",
    traps:
      "Un insecte vivant par piège, 1–2 pièges par mois. Congelé-décongelé : seulement si tu masses les poils sensitifs après la pose — une proie morte ne déclenche pas la fermeture étanche, le piège pourrit. Pas de viande hachée, fromage, œuf. Un piège ne s’ouvre qu’une poignée de fois : ne pas « jouer » avec. Après digestion, le piège noircit : on le laisse, on ne coupe pas à vif.",
    seedlingNotes:
      "Graines noires minuscules, viables 1 an au frais/sec, plus faibles ensuite. Strat 4–6 semaines (frigo 4 °C, papier ou tourbe juste humide) utile sur lots sauvages ; beaucoup de F1 germent sans. Surface, jamais d’enfouissement. Mix ébouillanté, 14 h, 15–20 cm, 150–250 µmol/m²/s. Levée 2–6 semaines. Première vraie feuille en rosette, pas encore de piège.",
    cuttingNotes:
      "Leaf pulling : feuille entière avec un bout de rhizome blanc. À plat sur tourbe ou sphaigne, HR 80–95 %, 20–24 °C, lumière douce (COP2065 à 25–30 cm, ~80–120 µmol/m²/s). Plantules en 4–8 semaines. Ne pas trop mouiller : pourriture du pétiole = échec n°1.",
    redColorNotes:
      "Le rouge intérieur du piège est génétique (cultivars ‘Red Dragon’, ‘Akai Ryu’ vs formes vertes). Growing 6500 K + DLI ~12–16 mol/m²/j suffit souvent. Un appoint COP20FS n’est pas obligatoire. Fraîcheur nocturne (12–16 °C) aide les anthocyanes. Sans dormance, la couleur s’affadit d’année en année.",
    warnings: [
      "Dormance obligatoire : une tente chaude toute l’année n’est pas un cadeau.",
      "Eau du robinet = brûlures marginales et mort lente du rhizome.",
      "Ne pas remplir les pièges d’eau ni d’engrais liquide concentré.",
    ],
    projects: ["seedling", "cutting", "production", "coloring", "mixed", "dormancy"],
  },
  {
    id: "sarracenia-upright",
    latin: "Sarracenia (flava, leucophylla, oreophila, alata, rubra…)",
    common: "Sarracènes dressées",
    family: "Sarraceniaceae",
    climate: "temperate",
    dormancy: "required",
    dormancyNote:
      "Obligatoire 3–4 mois. Les urnes de l’année se fanent ; le rhizome reste, souvent en phyllodes. 0–10 °C, 8–10 h, substrat humide sans bac. En FR/BE, bac extérieur / châssis hors gel est le geste de pépinière ; la tente chaude est le plan B. S. purpurea et les hybrides « easy » sont plus indulgents, pas oreophila / leucophylla de collection.",
    ppfd: [200, 300, 500],
    dli: [8.6, 14.0, 25.2],
    photoperiodGrow: 14,
    photoperiodDorm: 9,
    humidity: [40, 55, 70],
    tempDay: [22, 32],
    tempNight: [12, 20],
    water: "tray",
    waterNote:
      "Bac 2–3 cm en croissance. Laisser le bac sécher presque à blanc 1 jour de temps en temps pour oxygéner, sans jamais laisser le pain de tourbe croûter.",
    substrate: "Tourbe blonde non amendée + perlite 50/50. Pots larges (15–20 cm de diamètre) : le rhizome pousse à l’horizontale, une colonne profonde ne sert à rien (ça, c’est Darlingtonia). Rempoter tous les 12–24 mois au débourrement : la tourbe s’affaisse, le rhizome bute contre la paroi d’un pot étroit. Sable siliceux possible, jamais de calcaire, jamais de coco.",
    fertilizer:
      "Foliar 0,3 g/L 1–2×/mois sur urnes et feuillage. Osmocote dans l’urne : on s’en passe (urne ouverte = sel + algues). Racinaire : non.",
    tentTips:
      "Toujours l’étage le plus haut, au plus près des COP4065 (15–20 cm du sommet des urnes, pas du pot). Deux COP4065 sur 120×60 tiennent des adultes si tu les espaces sur la profondeur. Les urnes qui touchent la barre grillent : laisse 10 cm de marge quand elles poussent. Mai–septembre en FR/BE : les adultes dressées font mieux dehors (plein soleil, bac de pluie) que sous 26 °C de tente ; on rentre le germoir et les tropicales.",
    traps:
      "Les urnes chassent seules si tu ouvres la tente. Sinon : 1–2 mouches par urne mature et par mois, ou un foliar 0,3 g/L. Ne pas remplir les urnes de bouillon ni d’Osmocote.",
    seedlingNotes:
      "Graines à stratification froide 6–8 semaines (4 semaines, c’est souvent trop court pour flava / leucophylla). Viables surtout l’année de récolte (frigo sec). Semis de surface, mix ébouillanté, 14 h, 15–20 cm, 150–250 µmol/m²/s. Première feuille = phyllode, pas encore d’urne. 2–4 ans avant un adulte. Repiquer par motte à 4–6 feuilles, pas racine nue.",
    cuttingNotes:
      "Division de rhizome au débourrement (mars–avril) : un morceau avec au moins un point de croissance. Bouture de rhizome sans feuille possible mais plus lente. Pas de bouture de feuille utile.",
    redColorNotes:
      "Leucophylla, flava var. atropurpurea, hybrides ‘Adrian Slack’ : le DLI fait plus que le spectre. 16–20 mol/m²/j (300 µmol/m²/s × 14–16 h) colore ; 8 mol/m²/j reste vert. Growing 6500 K suffit. FS en appoint si tu veux pousser le rouge sans monter le PPFD. Génotype d’abord : une flava verte ne devient pas cramoisie.",
    warnings: [
      "Dormance obligatoire. Une Sarracenia « toujours en pousse » s’affaiblit.",
      "Pots trop étroits = urnes chétives. Viser 2–3 L larges dès l’ado, pas un tube profond.",
      "Carnivero n’a testé que des semis de dressées sous LED (**) : les adultes demandent plus de hauteur utile.",
    ],
    projects: ["seedling", "production", "coloring", "mixed", "dormancy"],
  },
  {
    id: "sarracenia-low",
    latin: "Sarracenia (purpurea, rosea, psittacina, minor)",
    common: "Sarracènes basses",
    family: "Sarraceniaceae",
    climate: "temperate",
    dormancy: "required",
    dormancyNote:
      "Toujours une vraie dormance. Purpurea tient souvent dehors en FR/BE (châssis, bac, parfois hors-gel léger). En tente : 0–10 °C, 8–10 h, 3–4 mois — seulement si tu n’as pas d’extérieur.",
    ppfd: [100, 200, 400],
    dli: [4.3, 9.4, 20.2],
    photoperiodGrow: 14,
    photoperiodDorm: 9,
    humidity: [40, 60, 80],
    tempDay: [18, 28],
    tempNight: [8, 18],
    water: "wet",
    waterNote:
      "Purpurea et rosea aiment les pieds dans l’eau. Psittacina : humide à très humide, sans noyer le collet en hiver. Eau pauvre uniquement.",
    substrate: "Tourbe blonde non amendée + perlite 50/50 ; purpurea accepte un peu plus de tourbe (60/40). Pots larges et bas, pas profonds.",
    fertilizer:
      "Foliar 0,3 g/L 1–2×/mois. Les urnes basses se remplissent d’eau en nature : en tente, un rinçage RO occasionnel évite le concentré d’algues. Pas d’Osmocote dans l’urne.",
    tentTips:
      "Étage médian ou bord de tente, 20–30 cm sous COP4065 — elles n’ont pas besoin du plafond des dressées. Idéales pour « remplir » un étage mixte sous les Sarracenia hautes.",
    traps:
      "Urnes ouvertes vers le haut (purpurea) : quelques drosophiles suffisent. Pas de viande. L’eau stagnante dans l’urne n’est pas un problème tant qu’elle reste pauvre.",
    seedlingNotes:
      "Comme les dressées : cold strat 6–8 semaines, surface, mix ébouillanté, 150–250 µmol/m²/s, 14 h. Graines de l’année. Plantules plus compactes, plus rapides à faire une mini-urne.",
    cuttingNotes: "Division de rhizome au printemps. Les rosettes se séparent facilement.",
    redColorNotes:
      "Purpurea venosa et rosea colorent bien dès 200–250 µmol/m²/s en 6500 K, surtout avec nuits fraîches. Le rouge est aussi un signal de « assez de lumière + un peu de stress hydrique contrôlé », pas un pic 660.",
    warnings: [
      "Psittacina pourrit si le collet cuit dans une HR saturée sans air.",
      "Ne pas confondre « basse » et « ombre » : 100 µmol/m²/s est un plancher, pas une cible de confort.",
    ],
    projects: ["seedling", "production", "coloring", "mixed", "dormancy"],
  },
  {
    id: "drosera-temperate",
    latin: "Drosera (rotundifolia, intermedia, anglica, filiformis…)",
    common: "Droséras tempérées",
    family: "Droseraceae",
    climate: "temperate",
    dormancy: "required",
    dormancyNote:
      "Hibernacle vrai (rotundifolia, intermedia, anglica, filiformis) : 3–4 mois, 0–10 °C, 8–10 h, mix juste humide. Filiformis : ne jamais laisser sécher le hibernacle. D. binata (Australie) n’est pas dans ce groupe : pas d’hibernacle, repos frais optionnel, culture plutôt type capensis.",
    ppfd: [100, 200, 400],
    dli: [4.3, 9.4, 20.2],
    photoperiodGrow: 14,
    photoperiodDorm: 9,
    humidity: [50, 65, 85],
    tempDay: [18, 26],
    tempNight: [8, 16],
    water: "tray",
    waterNote: "Bac 1–2 cm en croissance. En dormance, juste humide. Filiformis : ne jamais laisser sécher le hibernacle.",
    substrate: "Tourbe blonde + perlite ou sable siliceux 50/50. Filiformis apprécie un mix un peu plus minéral.",
    fertilizer:
      "Foliar 0,3 g/L 1×/mois suffit : le mucilage capte déjà. Trop d’engrais = mucilage qui « fond » et algues sur le terreau.",
    tentTips:
      "Étage haut ou médian, 15–25 cm sous COP4065. Les rotundifolia restent basses : tu peux les glisser au pied des Sarracenia si le PPFD y reste ≥ 150. D. binata, si tu en as : tiges hautes, pas d’hibernacle, plutôt l’étage capensis.",
    traps:
      "Le mucilage fait le travail. Sciarides de la tente = buffet. Complément : drosophiles 1×/mois, ou foliar. Pas de viande.",
    seedlingNotes:
      "Graines très fines, viables plusieurs années au sec/frais (mieux que Sarracenia). Strat 4–6 semaines (rotundifolia, intermedia). Surface, vaporisation, jamais d’enfouissement. Mix ébouillanté : les algues gagnent sinon. 14 h, 150–250 µmol/m²/s. Filiformis récalcitrant : GA-3 500–1000 ppm 24 h — option de lot difficile, pas un réflexe.",
    cuttingNotes:
      "Leaf pulling très fiable : feuille à plat sur sphaigne, HR haute, lumière douce. Plantules au pétiole en 3–6 semaines. Root cuttings chez filiformis.",
    redColorNotes:
      "Rotundifolia et filiformis ‘Florida Red’ colorent dès 200 µmol/m²/s en 6500 K. Le mucilage brille plus que le pigment : si la feuille est rouge mais sèche, c’est trop de chaleur / trop peu d’HR, pas trop de bleu.",
    warnings: [
      "Hibernacle ≠ mort : ne pas jeter un pot « vide » en décembre.",
      "Ne pas coller D. binata dans le protocole 5 °C des rotundifolia : ce n’est pas une tempérée d’hémisphère nord.",
    ],
    projects: ["seedling", "cutting", "production", "coloring", "mixed", "dormancy"],
  },
  {
    id: "drosera-capensis",
    latin: "Drosera capensis (et spatulata, aliciae, nidiformis…)",
    common: "Droséras capensis / tropicales",
    family: "Droseraceae",
    climate: "tropical-lowland",
    dormancy: "none",
    dormancyNote:
      "Pas de dormance. Capensis est cap-méditerranéenne en nature mais, en tente, on la cultive en croissance continue 12–14 h. Un léger ralentissement hivernal (18 °C) n’est pas un protocole de froid.",
    ppfd: [100, 180, 400],
    dli: [4.3, 8.4, 20.2],
    photoperiodGrow: 13,
    photoperiodDorm: null,
    humidity: [50, 65, 85],
    tempDay: [20, 28],
    tempNight: [14, 20],
    water: "tray",
    waterNote: "Bac 1–2 cm toute l’année. Capensis pardonne un oubli, pas l’eau calcaire.",
    substrate: "Tourbe blonde + perlite 50/50. Se ressème partout : un bac dédié évite l’invasion.",
    fertilizer: "Foliar 0,3 g/L 1×/mois, ou rien si les sciarides circulent. C’est la plante la plus autonome de la tente.",
    tentTips:
      "Étage médian, 20–30 cm sous COP4065, ou COP2065 dédiée. Parfaite plante « comble-trou » d’une tente mixte. Spatulata et aliciae restent en rosette : elles tiennent au premier plan, 15–20 cm.",
    traps: "Mucilage = indicateur de santé. Si les gouttes disparaissent : air trop sec, lumière trop faible, ou eau trop riche.",
    seedlingNotes:
      "Pas de cold strat. Surface, 20–24 °C, 14 h, 150–250 µmol/m²/s. Levée 7–21 jours. Graines fraîches germent en tapis : éclaircir tôt, capensis étouffe ses voisines et les Sarracenia.",
    cuttingNotes:
      "Leaf pulling facile. Tige de capensis : bouture de hampe florale ou de feuille. Racines en 2–4 semaines.",
    redColorNotes:
      "Capensis ‘Alba’ reste verte (génotype). ‘Rubra’ / ‘Red’ demandent DLI et un peu de fraîcheur, pas un spectre rouge. Aliciae colore dès 200 µmol/m²/s.",
    warnings: [
      "Envahissante par graines : coupe les hampes si tu ne veux pas un tapis.",
      "Ne pas la coller contre des Nepenthes basses : elle vole la lumière du collet.",
    ],
    projects: ["seedling", "cutting", "production", "coloring", "mixed", "tropical"],
  },
  {
    id: "drosera-pygmy",
    latin: "Drosera (pygmées d’Australie-Occidentale)",
    common: "Droséras pygmées",
    family: "Droseraceae",
    climate: "mediterranean",
    dormancy: "optional",
    dormancyNote:
      "Rythme saisonnier plutôt qu’une dormance froide : saison fraîche/humide = croissance + gemmae ; saison chaude = ralentissement, substrat un peu moins détrempé. Pas de 5 °C type dionée.",
    ppfd: [100, 220, 400],
    dli: [4.3, 10.3, 20.2],
    photoperiodGrow: 12,
    photoperiodDorm: 10,
    humidity: [40, 55, 70],
    tempDay: [18, 27],
    tempNight: [10, 16],
    water: "moist",
    waterNote:
      "Humide en saison de croissance, jamais un marais stagnant en été chaud. Gemmae : surface juste humide, pas de bac profond.",
    substrate: "Tourbe + sable siliceux 30/70 ou 40/60, pots bas. Un peu de perlite. Drainage franc.",
    fertilizer: "Foliar 0,3 g/L très dilué, 1×/mois max. Les gemmae n’aiment pas le sel. Rien pendant la saison chaude sèche.",
    tentTips:
      "Premier plan, 15–20 cm sous COP2065 ou COP4065. Elles tiennent dans 3 cm de hauteur : une tablette basse dédiée évite qu’on les oublie sous les urnes. Air sec-modéré, pas de brumisation lourde.",
    traps: "Mucilage fin. Micro-proies (collemboles, sciarides). Rien de plus.",
    seedlingNotes:
      "On sème rarement des graines : on sème les gemmae (fin d’hiver–printemps indoor, selon cycle). Gemmae en surface, mix minéral juste humide, 15–22 °C, 12 h. Levée 1–3 semaines. Graines dures : fumée de prairie ou GA-3 1000 ppm 24 h — lot dédié, pas le germoir Sarracenia.",
    cuttingNotes: "Gemmae = bouture naturelle. Pas de leaf pulling classique.",
    redColorNotes: "PPFD élevé + nuits fraîches = rosettes compactes et rouges. Trop d’HR et trop peu de lumière = étiolement vert, gemmae molles.",
    warnings: [
      "Ne pas les cultiver comme des capensis (bac d’eau + jungle).",
      "Les gemmae pourrissent si elles baignent.",
    ],
    projects: ["production", "coloring", "mixed"],
  },
  {
    id: "nepenthes-lowland",
    latin: "Nepenthes (ampullaria, bicalcarata, mirabilis, gracilis, rafflesiana…)",
    common: "Nepenthes de basse altitude",
    family: "Nepenthaceae",
    climate: "tropical-lowland",
    dormancy: "none",
    dormancyNote: "Aucune dormance. Chute d’urnes = stress (air sec, PPFD trop bas, choc de rempotage), pas un hiver.",
    ppfd: [30, 80, 200],
    dli: [1.3, 3.7, 10.1],
    photoperiodGrow: 13,
    photoperiodDorm: null,
    humidity: [60, 75, 90],
    tempDay: [26, 32],
    tempNight: [20, 25],
    water: "moist",
    waterNote:
      "Substrat humide, jamais détrempé en continu. Vaporiser l’eau RO sur le mix, pas un bac d’eau type Sarracenia. Ampullaria tolère plus d’eau que bicalcarata.",
    substrate: "Sphaigne longue fibre + écorce d’orchidée + perlite (≈ 40/40/20), panier aéré. Jamais tourbe compacte seule.",
    fertilizer:
      "Foliar / mix 0,3 g/L 1×/mois (orchidée ou Rain Mix), ou 1 bille d’Osmocote dans une urne mature — un seul mode. Jamais de terreau horticole, jamais de bac type Sarracenia.",
    tentTips:
      "Étage bas : la lumière y tombe à 60–120 µmol/m²/s sous des COP4065 tendues en haut — c’est la fenêtre lowland. Sinon COP2065 à 30–40 cm. Extraire + hygro 60–80 %. Nuits chaudes (pas de drop 12 °C).",
    traps:
      "1–2 proies par urne et par mois, ou 1 bille Osmocote, ou un soupçon d’engrais orchidée dilué dans l’urne (quelques ml, jamais plein). Urnes vides trop longtemps + fort PPFD = plante qui « photosynthétise » au détriment du piégeage (Carnivero).",
    seedlingNotes:
      "Graines récalcitrantes : semer dans la semaine, sphaigne, 26–30 °C, HR 90 %, 40–80 µmol/m²/s. Après 1–2 mois au tiède, le taux s’effondre. In-vitro reste plus réaliste qu’un semis amateur sur un lot de voyage.",
    cuttingNotes:
      "Bouture de tige 1–2 nœuds, sphaigne pure, HR 90–100 % (sac ou dôme), 24–28 °C, lumière douce 40–80 µmol/m²/s (COP2065 à 30–40 cm ou COP4065 à 40–50 cm). Racines en 4–10 semaines. Ne pas coller la barre : brûlure + pourriture.",
    redColorNotes:
      "La couleur d’urne est surtout génétique et HR + un peu de DLI. Monter à 150–200 µmol/m²/s peut rougir mais dessèche les urnes si l’HR descend sous 60 %. Growing 6500 K suffit.",
    warnings: [
      "Bac d’eau type tourbière = asphyxie racinaire.",
      "Nuits froides de highland tuent les vraies lowland (bicalcarata, ampullaria).",
      "Une « ventricosa » ou « alata » de rayon n’est pas une lowland : c’est une intermédiaire (voir highland).",
      "Fourchette Carnivero 30–200 : commencer à 80, pas à 200.",
    ],
    projects: ["cutting", "production", "mixed", "tropical"],
  },
  {
    id: "nepenthes-highland",
    latin: "Nepenthes (ventricosa, alata / graciliflora, rajah, hamata, lowii… et hybrides highland / intermédiaires)",
    common: "Nepenthes de haute altitude",
    family: "Nepenthaceae",
    climate: "tropical-highland",
    dormancy: "none",
    dormancyNote:
      "Pas de dormance. Écart jour/nuit 8–12 °C. Sans nuits fraîches, hamata / lowii / rajah stagnent. Ventricosa, alata (souvent graciliflora en commerce) et la plupart des hybrides « easy » sont des intermédiaires : elles pardonnent une tente mixte, ce ne sont pas de vraies highland de crête, et ce ne sont pas des lowland.",
    ppfd: [50, 100, 200],
    dli: [2.2, 4.7, 10.1],
    photoperiodGrow: 13,
    photoperiodDorm: null,
    humidity: [60, 75, 90],
    tempDay: [20, 26],
    tempNight: [10, 16],
    water: "moist",
    waterNote: "Comme les lowland : humide, aéré, jamais marécage. Eau froide (RO) le soir aide le drop nocturne.",
    substrate: "Sphaigne LFS + écorce + perlite, éventuellement charbon horti. Pots aérés, rempotage dès que la sphaigne s’effondre.",
    fertilizer:
      "Plus prudentes que les lowland. Foliar 0,3 g/L 1×/mois. Osmocote : 1 bille dans une urne, rarement. Percolation très diluée seulement si le mix est lessivé.",
    tentTips:
      "Étage médian-bas, 25–40 cm sous COP4065, ou COP20FS en appoint doux. Le drop nocturne se joue à l’extracteur + pièce fraîche, pas à la LED. Éviter le plafond chaud des Sarracenia.",
    traps: "Même logique que lowland. Urnes inférieures d’abord ; les supérieures viennent avec la maturité et une HR stable.",
    seedlingNotes: "Comme lowland, mais 18–22 °C la nuit dès les plantules chez les vraies highland. Lumière 50–100 µmol/m²/s.",
    cuttingNotes:
      "Même protocole bouture, températures plus basses : 20–24 °C jour, 14–18 °C nuit. HR 90–100 % jusqu’à l’enracinement, puis acclimatation en 2–3 semaines.",
    redColorNotes:
      "Ventricosa colore facilement. Les espèces « dark » (hamata) demandent DLI + nuits fraîches + génotype. Pas un pic 660.",
    warnings: [
      "Tente lowland (30 °C nuit) = highland en sursis.",
      "Ne pas chasser le PPFD des Sarracenia : au-delà de ~200 µmol/m²/s les feuilles durcissent et les urnes avortent si l’HR n’est pas là.",
    ],
    projects: ["cutting", "production", "mixed", "tropical"],
  },
  {
    id: "pinguicula-temperate",
    latin: "Pinguicula (vulgaris, grandiflora, lusitanica…)",
    common: "Grassettes tempérées",
    family: "Lentibulariaceae",
    climate: "temperate",
    dormancy: "required",
    dormancyNote:
      "Hibernacle obligatoire. Rosette d’hiver compacte, 5–10 °C, juste humide, 8–10 h. Lusitanica est plus douce, presque annuelle en culture.",
    ppfd: [80, 150, 250],
    dli: [3.5, 7.0, 12.6],
    photoperiodGrow: 14,
    photoperiodDorm: 9,
    humidity: [50, 65, 80],
    tempDay: [16, 24],
    tempNight: [8, 14],
    water: "moist",
    waterNote: "Humide en croissance, jamais un lac. En hibernacle : à peine humide. Eau très pauvre.",
    substrate: "Tourbe + sable siliceux 50/50, pots bas. Un peu de perlite. Éviter la sphaigne trop riche qui noie le collet.",
    fertilizer: "Foliar 0,3 g/L 1×/mois en feuilles d’été. Rien en hibernacle. Les feuilles collantes pêchent seules.",
    tentTips:
      "Étage médian, 20–30 cm sous COP2065. Elles n’aiment ni le four des dressées ni la jungle des Nepenthes. Bonne candidate d’étage mixte « frais ».",
    traps: "Feuilles gluantes : sciarides, collemboles. Pas de viande. Ne pas vaporiser d’engrais concentré qui « lave » le mucilage.",
    seedlingNotes:
      "Graines fines, souvent cold strat 4–6 semaines. Surface, 18–22 °C, 150 µmol/m²/s. Lusitanica germe sans froid.",
    cuttingNotes: "Leaf pulling de feuille d’été, comme les mexicaines, mais plus lent. Hibernacle : on ne touche pas.",
    redColorNotes: "Grandiflora rougit au fort DLI et au froid. Vulgaris reste souvent vert-jaune : génotype.",
    warnings: [
      "Hibernacle pourri = trop d’eau en hiver.",
      "Fourchette Carnivero Pinguicula 30–200 : les tempérées tiennent le haut, pas le plancher 30.",
    ],
    projects: ["seedling", "cutting", "production", "mixed", "dormancy"],
  },
  {
    id: "pinguicula-mexican",
    latin: "Pinguicula (moranensis, esseriana, agnata, gypsicola, ‘Weser’…)",
    common: "Grassettes mexicaines",
    family: "Lentibulariaceae",
    climate: "tropical-highland",
    dormancy: "optional",
    dormancyNote:
      "Pas d’hiver froid : une saison sèche. Feuilles d’hiver succulentes, arrosage réduit, 12 h. Ce n’est pas la dormance 5 °C des dionées. Certaines (agnata) restent en feuilles carnivores presque toute l’année.",
    ppfd: [30, 80, 180],
    dli: [1.3, 3.7, 9.1],
    photoperiodGrow: 13,
    photoperiodDorm: 11,
    humidity: [40, 55, 70],
    tempDay: [18, 26],
    tempNight: [12, 18],
    water: "damp-never-wet",
    waterNote:
      "Arrosage par le bas, laisser sécher la surface entre deux. En feuilles d’hiver : encore plus sec. L’eau stagnante = pourriture du collet, cause n°1.",
    substrate:
      "Mix acide (moranensis, esseriana, agnata, ‘Weser’) : perlite + vermiculite + un peu de tourbe ou sphaigne hachée (ex. 40/40/20). Gypsicola et gypsophiles : mix minéral (sable siliceux + pouzzolane + gypse horti), quasi sans tourbe. Gypse (sulfate de calcium) ≠ chaux / calcaire (carbonate) : on ne chaulait pas un mix carnivore. Pots bas, très drainants.",
    fertilizer: "Foliar 0,3 g/L 1×/mois sur feuilles carnivores seulement. Rien sur les feuilles d’hiver succulentes.",
    tentTips:
      "Étage bas-médian, 25–40 cm sous COP4065, ou COP2065 à 25 cm. Elles grillent et se recroquevillent au-delà de ~180–200 µmol/m²/s. Air plutôt sec, bon extracteur.",
    traps: "Mucilage : micro-proies. Un foliar léger remplace les proies. Pas de « nourrissage » à la pince sur ces feuilles fragiles.",
    seedlingNotes: "Surface, 20–24 °C, 50–100 µmol/m²/s, pas de cold strat. Lent. Bouture de feuille souvent plus simple.",
    cuttingNotes:
      "Leaf pulling : feuille carnivore saine, posée sur mix à peine humide, HR 70–80 % (pas 100 %), lumière douce. Plantules au pétiole en 3–8 semaines. C’est LE mode de multiplication.",
    redColorNotes:
      "Moranensis et gypsicola rougissent à 80–120 µmol/m²/s + nuits fraîches. Trop de lumière = feuilles noires-rouges recroquevillées (stress, pas « belle couleur »).",
    warnings: [
      "Jamais de bac d’eau permanent.",
      "Ne pas les mettre sous le même régime hydrique que Sarracenia.",
      "Gypsicola dans un 50/50 tourbe : collet pourri ou plante molle — ce n’est pas un Weser.",
    ],
    projects: ["cutting", "production", "coloring", "mixed", "tropical"],
  },
  {
    id: "utricularia-terrestrial",
    latin: "Utricularia (subulata, livida, sandersonii, bisquamata…)",
    common: "Utriculaires terrestres",
    family: "Lentibulariaceae",
    climate: "tropical-highland",
    dormancy: "optional",
    dormancyNote:
      "Pas d’hiver à 5 °C. Livida, sandersonii, bisquamata (Afrique du Sud) et subulata croissent presque toute l’année en tente ; un palier frais est un plus, pas une dormance de dionée. Carnivero note les tempérées strictes en estimation (*) — ce n’est pas cette fiche.",
    ppfd: [100, 180, 400],
    dli: [4.3, 8.4, 20.2],
    photoperiodGrow: 13,
    photoperiodDorm: 10,
    humidity: [50, 70, 90],
    tempDay: [18, 26],
    tempNight: [10, 18],
    water: "wet",
    waterNote: "Aiment le gorgé d’eau. Bac 1–2 cm. Eau pauvre, sinon algues sur le tapis.",
    substrate: "Tourbe blonde + sable 50/50, couche fine. Se mélangent aux Drosera : bac commun possible.",
    fertilizer: "Très peu. Foliar 0,3 g/L 1×/6 semaines max. Les utricules du substrat pêchent les infusoires.",
    tentTips:
      "Premier plan, 20–30 cm sous Cosmorrow. Sandersonii fleurit bien à 150–200 µmol/m²/s. Trop fort = tapis jaunissant.",
    traps: "Utricules souterrains : pas de nourrissage à la pince. Un substrat vivant (microfaune) suffit.",
    seedlingNotes: "Graines poussière, surface, souvent sans strat. Division de tapis plus simple que le semis.",
    cuttingNotes: "Division de stolons / tapis au rempotage. C’est tout.",
    redColorNotes: "Peu concernées. La « couleur » se joue sur les fleurs (sandersonii).",
    warnings: [
      "Envahissantes (subulata). Un bac dédié si tu tiens à tes semis de Sarracenia.",
      "PPFD Carnivero tempérées (*) 100–400 : rester bas-milieu.",
    ],
    projects: ["production", "mixed", "tropical"],
  },
  {
    id: "utricularia-epiphytic",
    latin: "Utricularia (alpina, longifolia, humboldtii, nelumbifolia…)",
    common: "Utriculaires épiphytes",
    family: "Lentibulariaceae",
    climate: "tropical-highland",
    dormancy: "none",
    dormancyNote: "Croissance continue, HR haute, nuits plutôt fraîches selon espèces (humboldtii / nelumbifolia plus highland).",
    ppfd: [30, 80, 200],
    dli: [1.3, 3.7, 10.1],
    photoperiodGrow: 13,
    photoperiodDorm: null,
    humidity: [70, 85, 95],
    tempDay: [18, 26],
    tempNight: [12, 20],
    water: "moist",
    waterNote: "Sphaigne toujours humide, jamais desséchée. Vaporisations fréquentes à l’eau RO. Pas de bac d’eau stagnant au collet.",
    substrate: "Sphaigne longue fibre, panier d’orchidée ou plaque. Parfois mix sphaigne + écorce.",
    fertilizer: "Orchidée 0,3 g/L foliar 1×/mois. Très dilué. Les utricules sont dans le mix, pas en l’air.",
    tentTips:
      "Étage bas tropical, à côté des Nepenthes, COP2065 à 30–40 cm. Humidificateur + extracteur. Longifolia tolère un peu plus de lumière qu’alpina.",
    traps: "Comme les terrestres : pas de piège aérien à nourrir.",
    seedlingNotes: "Semis délicat, sphaigne, HR 90 %, lumière 40–80 µmol/m²/s. Division plus réaliste.",
    cuttingNotes: "Division de rhizomes / stolons dans la sphaigne.",
    redColorNotes: "Hors sujet. Fleurs spectaculaires si DLI et HR sont stables, pas si on « pousse le rouge ».",
    warnings: [
      "Air sec de tente à Sarracenia = feuilles croquantes en une semaine.",
      "Ne pas les coller sous 300 µmol/m²/s.",
    ],
    projects: ["cutting", "production", "mixed", "tropical"],
  },
  {
    id: "cephalotus",
    latin: "Cephalotus follicularis",
    common: "Céphatote / plante-cruche d’Albany",
    family: "Cephalotaceae",
    climate: "mediterranean",
    dormancy: "optional",
    dormancyNote:
      "Pas de dormance froide obligatoire. Méditerranéen australien : hiver doux, été chaud mais collet aéré. En tente, palier 12–16 °C l’« hiver » aide. La chaleur lourde (> 28 °C au collet) + mix saturé tue plus vite que le manque de froid. Ce n’est pas une Nepenthes lowland.",
    ppfd: [45, 120, 300],
    dli: [1.9, 5.6, 15.1],
    photoperiodGrow: 13,
    photoperiodDorm: 11,
    humidity: [50, 65, 80],
    tempDay: [18, 26],
    tempNight: [10, 16],
    water: "moist",
    waterNote:
      "Humide, jamais détrempé. Bac d’eau occasionnel par forte chaleur, pas en continu. Laisser légèrement ressuyer. Eau pauvre.",
    substrate: "Tourbe + perlite + sable siliceux 40/40/20, ou sphaigne + perlite. Pots 10–12 cm, collet aéré — pas un tube Darlingtonia, pas un godet de 5 cm. Déteste le compactage.",
    fertilizer:
      "Foliar 0,3 g/L 1×/mois, ou 1 petite proie par urne. Très sensible à l’excès racinaire. Pas d’Osmocote. Pas de régime lowland (30 °C / 90 % HR).",
    tentTips:
      "Étage médian-frais, 20–30 cm sous COP4065, viser 120 µmol/m²/s. Extracteur : Cephalotus pourrit dans une jungle saturée et chaude. Nuits 12–16 °C. Ne pas la coller aux true lowland (bicalcarata, ampullaria) dans 1 m³ à 28 °C.",
    traps:
      "Urnes à opercule : 1 petite proie / mois dans 1–2 urnes. Les feuilles plates (phyllodes) apparaissent si lumière insuffisante ou après stress — ce n’est pas grave, on corrige le DLI.",
    seedlingNotes:
      "Lent (2–4 ans). Surface, 18–22 °C, 80–150 µmol/m²/s. Stratification parfois citée, pas consensuelle. Patience.",
    cuttingNotes:
      "Leaf pulling d’urne ou de feuille plate avec un fragment de rhizome si possible. Sphaigne, HR 80–90 %, 20 °C, lumière douce. Lent et aléatoire. Division de rhizome plus sûre sur plante mature.",
    redColorNotes:
      "Urnes bordeaux = DLI + nuits fraîches + génotype. Growing 6500 K à 150–200 µmol/m²/s colore. Au-delà, brûlure de l’opercule.",
    warnings: [
      "Pourriture du collet : ennemi n°1 (chaleur + eau + nulle aération).",
      "Ne pas la cultiver en lowland Nepenthes : régime highland-cool, pas jungle 30 °C.",
    ],
    projects: ["production", "coloring", "mixed", "tropical"],
  },
  {
    id: "heliamphora",
    latin: "Heliamphora (minor, heterodoxa, nutans, hybrides…)",
    common: "Heliamphora / plantes-urnes du tepui",
    family: "Sarraceniaceae",
    climate: "tropical-highland",
    dormancy: "none",
    dormancyNote: "Aucune dormance. Nuits fraîches (10–16 °C) toute l’année. La chaleur de lowland les cuit.",
    ppfd: [100, 200, 400],
    dli: [4.3, 9.4, 20.2],
    photoperiodGrow: 13,
    photoperiodDorm: null,
    humidity: [70, 85, 95],
    tempDay: [18, 26],
    tempNight: [10, 16],
    water: "moist",
    waterNote:
      "Sphaigne toujours humide, eau RO. L’urne doit garder un peu d’eau pauvre : Heliamphora n’a pas un suc digestif type Sarracenia, c’est de l’eau de tepui dans la cruche. Urne sèche = souvent une urne perdue. Pas de bac type Sarracenia si le mix étouffe.",
    substrate: "Sphaigne longue fibre vivante de préférence, panier aéré. Parfois perlite. Rempoter dès que la sphaigne s’affaisse.",
    fertilizer:
      "Foliar 0,3 g/L 1×/mois, ou très peu d’engrais orchidée. 1 petite proie par urne de temps en temps. Racinaire : prudence, algues dans la sphaigne.",
    tentTips:
      "Tente tropicale highland dédiée, ou étage frais. COP4065 à 20–30 cm pour viser 200 µmol/m²/s (Carnivero bas-milieu ; leurs photos P85 montent à 500–600 sur des adultes — on n’y va pas d’emblée). Extracteur + hygro. Minor est la plus simple en tente.",
    traps:
      "Urnes ouvertes : quelques ml d’eau RO en permanence + micro-proies. Ne pas remplir d’engrais. Nectar et cuillère (nectar spoon) indiquent une plante à l’aise.",
    seedlingNotes: "Semis lent sur sphaigne, 18–22 °C, HR 90 %, 80–150 µmol/m²/s. Hybrides plus faciles que les espèces tepui strictes.",
    cuttingNotes: "Division de rhizome / rejets. Bouture de feuille rarement fiable.",
    redColorNotes:
      "Minor et hybrides rougissent dès 200 µmol/m²/s en 6500 K + nuits fraîches. Pousser vers 300–400 colore plus, à condition que l’HR et le drop tiennent. Pas un besoin de 660 nm.",
    warnings: [
      "Tente 30 °C = échec. Priorité au drop nocturne.",
      "Sphaigne morte compacte = pourriture. On rempote.",
    ],
    projects: ["production", "coloring", "tropical"],
  },
  {
    id: "darlingtonia",
    latin: "Darlingtonia californica",
    common: "Darlingtonia / lis cobra",
    family: "Sarraceniaceae",
    climate: "temperate",
    dormancy: "required",
    dormancyNote:
      "Dormance froide obligatoire, comme une Sarracenia. En plus : racines qui n’aiment pas la chaleur. * Estimation Carnivero (non testé sous LED).",
    ppfd: [75, 180, 400],
    dli: [3.2, 8.4, 20.2],
    photoperiodGrow: 14,
    photoperiodDorm: 9,
    humidity: [50, 65, 80],
    tempDay: [18, 26],
    tempNight: [5, 14],
    water: "wet",
    waterNote:
      "Eau froide, courante si possible (réservoir + petite pompe, ou arrosages fréquents à l’eau RO fraîche). Bac d’eau, mais le pot ne doit pas cuire. TDS < 50 ppm, non négociable.",
    substrate: "Sphaigne longue fibre + perlite, pots profonds / tubes (racines longues qui veulent du froid). L’inverse des Sarracenia : ici la profondeur sert.",
    fertilizer: "Proies et foliar 0,3 g/L, rarement. Racinaire déconseillé. Plante exigeante : on soigne l’eau froide et le fond de pot, on ne « booste » pas.",
    tentTips:
      "Mal adaptée à une tente chaude Cosmorrow sans gestion du fond de pot. Si tu tentes : étage avec extracteur fort, pots sur clayette, eau froide, COP4065 à 20–25 cm (cible 180 µmol/m²/s, pas 400). Une cave fraîche + LED bat une tente 28 °C.",
    traps: "Urnes à opercule recourbé : quelques proies par saison. Ne pas verser d’engrais dans l’urne.",
    seedlingNotes:
      "Cold strat 4–8 semaines. Surface, 15–20 °C, 100–180 µmol/m²/s. Lent. Taux d’échec élevé si l’eau n’est pas froide et pauvre.",
    cuttingNotes: "Division de stolons au printemps. C’est le seul geste réaliste.",
    redColorNotes: "Les ailes et veinules rougissent au DLI et au froid. Secondaire face à la survie racinaire.",
    warnings: [
      "* Fourchette Carnivero estimée (75–400). On reste bas-milieu.",
      "Racines chaudes = mort rapide. Ce n’est pas une Sarracenia « un peu plus difficile ».",
      "Projet tente standard : à réserver aux confirmés.",
    ],
    projects: ["production", "dormancy"],
  },
  {
    id: "drosophyllum",
    latin: "Drosophyllum lusitanicum",
    common: "Drosophyllum / droséra du Portugal",
    family: "Drosophyllaceae",
    climate: "mediterranean",
    dormancy: "none",
    dormancyNote:
      "Pas de dormance froide. Climat méditerranéen : hiver doux de croissance, été plus sec. * Estimation Carnivero (150–500+).",
    ppfd: [150, 250, 500],
    dli: [6.5, 11.7, 25.2],
    photoperiodGrow: 13,
    photoperiodDorm: 11,
    humidity: [30, 45, 60],
    tempDay: [18, 28],
    tempNight: [8, 16],
    water: "damp-never-wet",
    waterNote:
      "Jamais de bac d’eau. Arrosage par le bas, laisser sécher nettement entre deux. L’excès d’eau est l’échec n°1. Eau RO uniquement.",
    substrate: "Sable siliceux 70 % + tourbe blonde non amendée 30 %. Pots terre cuite. Semis en place : déteste le rempotage. Pas de terre de bruyère de rayon (engrais + chaux), pas de coco.",
    fertilizer: "Foliar 0,3 g/L 1×/mois. Proies volantes. Pas de racinaire, pas de rempotage « pour voir ».",
    tentTips:
      "Tente sèche, extracteur fort, COP4065 à 15–20 cm (cible 250 µmol/m²/s). Incompatible avec l’étage Nepenthes. Plutôt une étagère dédiée, HR 40–50 %.",
    traps: "Feuilles gluantes type Drosera géante. Mouches, mites. Mucilage abondant = plante à l’aise.",
    seedlingNotes:
      "Semer en place dans le pot définitif. Graines dures : scarification au papier ou 24–48 h d’eau tiède. 20 °C, lumière forte d’emblée (200 µmol/m²/s). Pas de transplant. Lots de l’année.",
    cuttingNotes: "Pas de bouture utile. Semis uniquement.",
    redColorNotes: "Peu de rouge anthocyanique spectaculaire. Le spectacle c’est le mucilage au soleil / LED froide.",
    warnings: [
      "* Estimation Carnivero. Plante de confirmé.",
      "Rempotage = risque de perte. On sème où elle vivra.",
      "HR de jungle = pourriture.",
      "Terre de bruyère Jardiland / terreau méditerranéen = sel. Sable + tourbe non amendée, rien d’autre.",
    ],
    projects: ["seedling", "production"],
  },
  {
    id: "byblis",
    latin: "Byblis (liniflora, filifolia, gigantea, lamellata…)",
    common: "Byblis / plantes arc-en-ciel",
    family: "Byblidaceae",
    climate: "tropical-lowland",
    dormancy: "none",
    dormancyNote:
      "Annuelles tropicales (liniflora, filifolia) : pas de dormance, on ressème. Pérennes WA (gigantea, lamellata) : climat méditerranéen, saison sèche — hors tente débutant. Pas dans la table Carnivero : fourchette type Drosera, à titre indicatif.",
    ppfd: [100, 220, 400],
    dli: [4.3, 10.3, 20.2],
    photoperiodGrow: 13,
    photoperiodDorm: null,
    humidity: [50, 65, 80],
    tempDay: [22, 30],
    tempNight: [16, 22],
    water: "moist",
    waterNote:
      "Annuelles : humide à très humide en croissance, comme un Drosera tropical. Pérennes : plus sec en « été ». Eau pauvre.",
    substrate: "Tourbe + sable siliceux 40/60, pots profonds. Liniflora se contente d’un 50/50 tourbe-perlite.",
    fertilizer: "Foliar 0,3 g/L 1–2×/mois : Byblis liniflora répond très bien (croissance annuelle rapide). Proies collées au mucilage.",
    tentTips:
      "Étage médian-haut, 15–25 cm sous COP4065. Liniflora est une excellente plante de tente mixte / tropicale. Tiges grêles : tuteur ou densité pour qu’elles se tiennent.",
    traps: "Mucilage dense. Sciarides et drosophiles. Foliar en appoint. Pas de viande.",
    seedlingNotes:
      "Liniflora : surface, 24–28 °C, 14 h, 150–250 µmol/m²/s, levée 1–3 semaines, graines de l’année. Gigantea / lamellata : fumée de prairie (smoke water) ou GA-3 1000 ppm 24 h, mix minéral, pas le germoir Sarracenia — lot dédié, confinement.",
    cuttingNotes: "Bouture de tige possible chez liniflora, moins classique que le semis. Pérennes : délicat.",
    redColorNotes: "Le « rainbow » est la diffraction du mucilage, pas un pigment rouge. PPFD haut = tiges courtes et gluantes.",
    warnings: [
      "Fourchette PPFD indicative (genre absent de la table Carnivero).",
      "Liniflora est annuelle : prévoir un stock de graines.",
      "Ne pas appliquer de fumée / GA-3 dans une tente partagée sans confinement : geste de semis dédié.",
    ],
    projects: ["seedling", "production", "mixed", "tropical"],
  },
];
