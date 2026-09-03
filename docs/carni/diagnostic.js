/**
 * Arbres de diagnostic — Les Gloutonnes · Tourbière
 * Chaque arbre : question → answers[{label, nextId | result{title, fix[]}}]
 */
window.TOURBIERE_DIAGNOSTIC = {
  intro:
    "Un symptôme, une question à la fois. Les carnivores en tente se trompent rarement de maladie magique : c’est presque toujours lumière, eau, HR ou saison. Cosmorrow se règle à la hauteur et aux heures, pas au spectre « urgence 660 ».",
  trees: [
    {
      id: "etiolement",
      title: "Étiolement (tiges / pièges filiformes, internodes longs)",
      startId: "etio-1",
      nodes: {
        "etio-1": {
          question: "Les nouvelles pousses sont-elles pâles et allongées vers la barre, avec des internodes nettement plus longs que le mois dernier ?",
          answers: [
            { label: "Oui, ça s’étire vraiment", nextId: "etio-2" },
            { label: "Non, c’est surtout plus vert / plus mou", nextId: "etio-vert" },
          ],
        },
        "etio-2": {
          question: "Combien d’heures la Cosmorrow est-elle allumée, et à quelle hauteur des têtes ?",
          answers: [
            {
              label: "Moins de 12 h, ou barre à plus de 30 cm sur une tempérée",
              result: {
                title: "DLI insuffisant",
                fix: [
                  "Passe à 14 h (germoir / production) avec un programmateur.",
                  "Descends la barre de 5–10 cm : COP4065 vise 15–20 cm au germoir, 15–25 cm sur adultes gourmands.",
                  "Vérifie que tu n’es pas sur une seule COP2065 pour 120×60 : trop peu de PPF. 2 × COP4065 + COM2X40 est le kit tente.",
                  "Ce n’est pas un appel au Full Spectrum : Growing 6500 K plus près suffit.",
                ],
              },
            },
            { label: "14 h et 15–25 cm, et ça s’étire encore", nextId: "etio-3" },
          ],
        },
        "etio-3": {
          question: "Les plantes sont-elles à l’étage bas d’une mixte, ou derrière / sous d’autres pots ?",
          answers: [
            {
              label: "Oui, à l’ombre d’urnes ou sous tablette",
              result: {
                title: "Ombre portée, pas « mauvaise LED »",
                fix: [
                  "Monte Sarracenia / Dionaea / Drosera de soleil à l’étage haut.",
                  "Laisse le bas aux Nepenthes et Pinguicula (60–120 µmol, c’est leur fenêtre).",
                  "Écarte les pots : une forêt d’urnes étiole ce qu’il y a au pied.",
                ],
              },
            },
            {
              label: "Non, elles sont au premier rang sous la barre",
              result: {
                title: "Soit trop peu de PPF installé, soit une pousse d’hiver",
                fix: [
                  "En novembre–février, des tempérées à 20 °C / 14 h s’étiolent : c’est une dormance manquée, pas un manque de watts. Voir protocole dormance.",
                  "En saison : ajoute la 2ᵉ COP4065, ou descends de 5 cm, ou passe 16 h deux semaines et observe.",
                  "Mesure ou compare : plantules trapues = OK ; fil de pêche = encore trop peu.",
                ],
              },
            },
          ],
        },
        "etio-vert": {
          question: "Les pièges / urnes sont-ils présents mais mous et très verts ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "PPFD bas-milieu, pas encore d’étiolement grave",
                fix: [
                  "Tu es probablement sous la cible (ex. dionée à 80 µmol). Monte le DLI d’un cran (hauteur ou heures).",
                  "Le vert n’est pas une maladie : beaucoup de clones restent verts (génotype). Voir arbre « pas de rouge ».",
                  "Tiens le foliar 0,3 g/L : une plante affamée sous LED correcte reste molle.",
                ],
              },
            },
            {
              label: "Non, vraiment filiforme sans piège",
              nextId: "etio-2",
            },
          ],
        },
      },
    },
    {
      id: "brulure",
      title: "Brûlure (blanchiment, croûtes, pointes sèches sous la LED)",
      startId: "bru-1",
      nodes: {
        "bru-1": {
          question: "Les dégâts sont-ils localisés pile sous la barre, en « halo », plutôt qu’en bord de feuille partout ?",
          answers: [
            { label: "Oui, hotspot net", nextId: "bru-2" },
            { label: "Non, pointes brunes partout, même à l’ombre", nextId: "bru-eau" },
          ],
        },
        "bru-2": {
          question: "Quelle distance tête–barre, et quel genre ?",
          answers: [
            {
              label: "Moins de 12 cm sur Nepenthes, Pinguicula ou plantules",
              result: {
                title: "Barre trop près pour ce genre",
                fix: [
                  "Remonte à 25–40 cm (Nepenthes / mexicaines) ou 15–20 cm (germoir).",
                  "Les plantules n’ont pas à prendre 300 µmol. Fenêtre 150–250.",
                  "COP40FS à 15 cm n’est pas un germoir : Growing 6500 K, plus loin.",
                ],
              },
            },
            {
              label: "15–20 cm sur Sarracenia / Dionaea adultes, et ça grille quand même",
              result: {
                title: "Soit trop d’heures d’un coup, soit feuille mouillée sous LED",
                fix: [
                  "Remonte 5 cm ou reviens à 14 h si tu étais à 16–18 h d’emblée.",
                  "Ne vaporise pas le feuillage puis n’allume pas dans la minute : gouttes = loupes.",
                  "Acclimate : +5 cm de rapprochement par semaine, pas 40 cm → 12 cm le même jour.",
                ],
              },
            },
          ],
        },
        "bru-eau": {
          question: "L’eau est-elle RO / pluie / distillée / ZeroWater à TDS < 50 ppm ?",
          answers: [
            {
              label: "Non, robinet, Brita, ou TDS inconnu",
              result: {
                title: "Brûlure saline, pas une LED trop forte",
                fix: [
                  "Passe à l’eau pauvre immédiatement. Rince le mix par le haut (percolation RO) plusieurs fois.",
                  "Stoppe tout engrais 4–6 semaines.",
                  "Brita ≠ RO. Mesure le TDS.",
                ],
              },
            },
            {
              label: "Oui, eau pauvre vérifiée",
              result: {
                title: "Sel d’engrais ou air trop sec",
                fix: [
                  "Si tu arrosais l’engrais au bac : stop, foliar only, rincer.",
                  "Pointes sèches + HR 30 % : extracteur trop violent ou tente trop loin de tout humidificateur — surtout Nepenthes.",
                  "Vieilles urnes qui croûtent en fin de saison : normal, on ne « soigne » pas au ciseau dans le vert.",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "mucilage",
      title: "Pas de mucilage (Drosera, Byblis, Drosophyllum, Pinguicula)",
      startId: "muc-1",
      nodes: {
        "muc-1": {
          question: "Les feuilles sont-elles sèches au toucher, sans gouttes, alors que la plante pousse encore ?",
          answers: [
            { label: "Oui, plus de gouttes", nextId: "muc-2" },
            { label: "La plante est surtout en pause (hiver, feuilles succulentes)", nextId: "muc-saison" },
          ],
        },
        "muc-2": {
          question: "L’air est-il sec (HR < 45 %) ou la lumière clairement faible (étiolement) ?",
          answers: [
            {
              label: "Air sec, tente qui tire fort",
              result: {
                title: "Le mucilage s’évapore plus vite qu’il ne se forme",
                fix: [
                  "Monte l’HR vers 50–65 % (tempérées) sans fermer hermétiquement.",
                  "Évite de vaporiser 6×/jour : ça « lave » le mucilage. On humidifie l’air, pas la feuille en continu.",
                  "Un plateau d’eau RO à l’étage, extracteur un cran plus doux.",
                ],
              },
            },
            {
              label: "Lumière trop faible / plante étiolee",
              result: {
                title: "Pas assez d’énergie pour sécréter",
                fix: [
                  "Rapproche Growing 6500 K, 14 h, bas-milieu Carnivero (Drosera ~200 µmol).",
                  "Un foliar 0,3 g/L après 2 semaines de bon DLI, pas avant.",
                  "Eau pauvre : une eau riche donne parfois un feuillage gras sans gouttes nettes.",
                ],
              },
            },
            {
              label: "HR et lumière OK, et ça ne colle plus",
              result: {
                title: "Engrais trop fréquent ou eau trop minérale",
                fix: [
                  "Stop foliar 3–4 semaines, rince le mix.",
                  "Vérifie TDS.",
                  "Certaines capensis « alba » ont un mucilage plus discret : génotype, pas échec.",
                ],
              },
            },
          ],
        },
        "muc-saison": {
          question: "Es-tu en feuilles d’hiver (Pinguicula mexicaine) ou en hibernacle (tempérée) ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Normal : pas de mucilage en repos",
                fix: [
                  "Ne force pas. Pinguicula mexicaine : feuilles succulentes = saison sèche, on arrose moins.",
                  "Hibernacle Drosera / Pinguicula tempérée : protocole dormance, lumière 8–10 h.",
                  "Le mucilage revient sur les nouvelles feuilles carnivores au débourrement.",
                ],
              },
            },
            { label: "Non, c’est bien la saison de chasse", nextId: "muc-2" },
          ],
        },
      },
    },
    {
      id: "urnes",
      title: "Pas d’urnes (Nepenthes, Sarracenia, Heliamphora, Cephalotus)",
      startId: "urn-1",
      nodes: {
        "urn-1": {
          question: "De quel groupe s’agit-il ?",
          answers: [
            { label: "Nepenthes", nextId: "urn-nep" },
            { label: "Sarracenia / Heliamphora / Cephalotus", nextId: "urn-sarr" },
          ],
        },
        "urn-nep": {
          question: "La plante est-elle une bouture récente, un juvénile, ou un adulte qui urnait déjà chez le vendeur ?",
          answers: [
            {
              label: "Bouture / juvénile",
              result: {
                title: "Patience : l’urne n’est pas un droit de J+15",
                fix: [
                  "HR 70–80 % (60 % mini), lumière 80–100 µmol, mix aéré humide.",
                  "Ne colle pas une COP4065 à 15 cm « pour forcer les urnes » : Carnivero note qu’un PPFD trop haut sans nutriments de piège pousse la feuille au détriment du piège.",
                  "Nourrir dès la première mini-urne (proie ou ¼ orchidée quelques ml), pas avant.",
                ],
              },
            },
            { label: "Adulte qui a perdu ses urnes", nextId: "urn-nep2" },
          ],
        },
        "urn-nep2": {
          question: "Choc récent (rempotage, colis, chute d’HR) dans les 2–4 dernières semaines ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Chute d’urnes de stress — on stabilise",
                fix: [
                  "Un seul changement à la fois. 2–3 semaines d’HR stable avant de toucher à la LED.",
                  "Acclimate les plantes « sac plastique » en 10–21 jours.",
                  "Les prochaines feuilles décideront, pas les moignons actuels.",
                ],
              },
            },
            {
              label: "Non, stagnation depuis des mois",
              result: {
                title: "Régime inadapté (HR, T° ou PPFD hors fenêtre)",
                fix: [
                  "Lowland qui passe des nuits à 12 °C, ou highland qui cuit à 30 °C : corrige le régime (protocole tropical).",
                  "HR chronique < 50 % : urnes avortées. Humidificateur eau RO + extracteur doux.",
                  "PPFD < 40 µmol : étage trop sombre. COP2065 à 30 cm.",
                ],
              },
            },
          ],
        },
        "urn-sarr": {
          question: "Vois-tu surtout des phyllodes (feuilles plates) ou des urnes de plus en plus petites ?",
          answers: [
            {
              label: "Phyllodes / feuilles plates (Cephalotus, Sarracenia en fin de saison)",
              result: {
                title: "Souvent saisonnier ou DLI un peu juste",
                fix: [
                  "Cephalotus : un peu plus de PPFD (cible 120) et nuits fraîches, sans cuire le collet.",
                  "Sarracenia en septembre–octobre : phyllodes et urnes tardives normales, puis dormance.",
                  "Sarracenia en juin tout plat : barre trop loin ou pot minuscule.",
                ],
              },
            },
            {
              label: "Urnes de plus en plus chétives",
              result: {
                title: "Pot, dormance manquée ou faim",
                fix: [
                  "Rempote au débourrement en 2–3 L (Sarracenia adulte).",
                  "Vérifie qu’un hiver froid a bien eu lieu l’an dernier.",
                  "Foliar 0,3 g/L 1–2×/mois + DLI bas-milieu (dressées ~300 µmol).",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "pourriture",
      title: "Pourriture (collet, rhizome, hampe, cœur)",
      startId: "pou-1",
      nodes: {
        "pou-1": {
          question: "La zone molle est-elle le collet / le rhizome, ou seulement de vieilles feuilles ?",
          answers: [
            { label: "Collet ou rhizome mou, odeur", nextId: "pou-2" },
            {
              label: "Seulement de vieux pièges noirs",
              result: {
                title: "Sénescence normale",
                fix: [
                  "On coupe le tissu mort, pas le vert.",
                  "Dionée en hiver : pièges noirs attendus.",
                  "Si le cœur est ferme et vert pâle, on n’arrache pas.",
                ],
              },
            },
          ],
        },
        "pou-2": {
          question: "Le pot est-il gorgé, chaud, et peu aéré (dôme, HR 90 %+ sans extracteur) ?",
          answers: [
            {
              label: "Oui, sauna chaud",
              result: {
                title: "Pourriture d’excès d’eau × chaleur",
                fix: [
                  "Sors du dôme, aère, laisse le mix ressuyer.",
                  "Coupe au tissu dur, jette le mix saturé, rempote aéré (perlite).",
                  "Cephalotus, Pinguicula mexicaine, Drosophyllum : jamais de bac permanent.",
                  "Pas de fongicide ménager ni d’eau de javel sur la plante.",
                ],
              },
            },
            {
              label: "Non, mix juste humide mais rhizome mou quand même",
              result: {
                title: "Infection après plaie ou dormance trop humide",
                fix: [
                  "Dormance : plus de bac, mix juste humide, 5–10 °C, un peu d’air.",
                  "Après division : plaie propre, on n’arrose pas à outrance 48 h.",
                  "Darlingtonia / Sarracenia : inspecter le rhizome, sectionner au dur, soufre horti en poudre optionnel sur la coupe (usage horti classique, pas un cocktail chimique).",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "algues",
      title: "Algues (bac vert, croûte sur le terreau, sphaigne glissante)",
      startId: "alg-1",
      nodes: {
        "alg-1": {
          question: "Arroses-tu ou fertilises-tu par le bac / le racinaire ?",
          answers: [
            {
              label: "Oui, engrais dans l’eau d’arrosage ou le bac",
              result: {
                title: "Algues = nutriments + lumière sur l’eau",
                fix: [
                  "Stop racinaire. Foliar 0,3 g/L seulement.",
                  "Vide le bac, rince les pots à l’eau RO, masque l’eau de la LED (bacs opaques).",
                  "Gratte la croûte en surface si elle étouffe les semis, sans arracher les plantules.",
                ],
              },
            },
            { label: "Non, seulement eau pauvre", nextId: "alg-2" },
          ],
        },
        "alg-2": {
          question: "L’eau de pluie vient-elle d’une gouttière, et le bac est-il éclairé de face ?",
          answers: [
            {
              label: "Oui / probablement",
              result: {
                title: "Charge organique + photons",
                fix: [
                  "Filtre la pluie, jette le premier jet, mesure le TDS.",
                  "Bacs opaques, moins d’eau apparente.",
                  "Un peu moins d’heures sur un germoir déjà levé ne « tue » pas les algues : c’est l’eau riche le levier.",
                ],
              },
            },
            {
              label: "RO / ZeroWater, bac opaque, et ça verdit quand même",
              result: {
                title: "Lumière forte sur un mix toujours saturé",
                fix: [
                  "Laisse le bac sécher 24 h de temps en temps (tempérées en croissance).",
                  "Surface : fine sphaigne hachée ou un peu plus d’aération.",
                  "Acceptable en film mince sur un germoir : on ne stérilise pas au javel.",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "sciarides",
      title: "Sciarides (moucherons du terreau)",
      startId: "sci-1",
      nodes: {
        "sci-1": {
          question: "Le problème est-il un nuage de moucherons, ou des plantules qui tombent (larves au collet) ?",
          answers: [
            { label: "Nuage, plantes adultes OK", nextId: "sci-adult" },
            { label: "Semis qui s’effondrent", nextId: "sci-semis" },
          ],
        },
        "sci-adult": {
          question: "As-tu des Drosera / Pinguicula dans la même tente ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Buffet pour les collantes, gêne pour toi",
                fix: [
                  "Pièges jaunes collants hors des Drosera (sinon tu les y colles pour rien… en fait si, c’est le but, mais ça ne régule pas le salon).",
                  "Laisse sécher 1 cm de surface entre deux apports.",
                  "Pas d’insecticide systémique « plantes vertes » du rayon : hors protocole, et inutilement dur.",
                ],
              },
            },
            {
              label: "Non, que des Sarracenia / Nepenthes",
              result: {
                title: "Surface trop saturée + matière organique",
                fix: [
                  "Ressuyage de surface, bacs moins profonds d’eau.",
                  "Pièges jaunes.",
                  "Nematodes Steinernema feltiae : option horticole connue si l’invasion est lourde — usage selon étiquette, pas un cocktail maison.",
                ],
              },
            },
          ],
        },
        "sci-semis": {
          question: "Les plantules sont-elles cernées au collet, mix toujours détrempé sous dôme ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Larves + fonte : on sèche et on aère",
                fix: [
                  "Retire le dôme, surface plus sèche, eau par le bas seulement.",
                  "Pièges jaunes, isole le bac.",
                  "On ne noie pas « pour tuer les larves » : on noie les plantules.",
                  "Resemer un lot propre si le tapis est perdu — plus vite que de sauver 3 tiges.",
                ],
              },
            },
            {
              label: "Non, collet sain, juste des adultes qui volent",
              nextId: "sci-adult",
            },
          ],
        },
      },
    },
    {
      id: "pas-de-rouge",
      title: "Pas de rouge (colorisation absente)",
      startId: "rog-1",
      nodes: {
        "rog-1": {
          question: "Le clone est-il réputé coloré (Red Dragon, leucophylla, Rubra, etc.) ?",
          answers: [
            { label: "Non, c’est une forme verte / inconnue", nextId: "rog-geno" },
            { label: "Oui, il devrait rougir", nextId: "rog-2" },
          ],
        },
        "rog-geno": {
          question: "Tu veux quand même « forcer » le rouge ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Le spectre ne réécrit pas le génome",
                fix: [
                  "Un pic 660 n’invente pas les anthocyanes d’une flava verte.",
                  "Tu peux monter le DLI dans la fourchette du genre : tu auras un plant plus trapu, parfois un blush, pas un cultivar rouge.",
                  "Choisis un clone coloré si le rouge est l’objectif.",
                ],
              },
            },
            {
              label: "Non, je voulais surtout savoir si ma LED était « trop faible »",
              result: {
                title: "Vert ≠ LED trop faible",
                fix: [
                  "Juge à la compacité, aux pièges, au mucilage, pas à Instagram.",
                  "Growing 6500 K n’est pas une lumière « qui ne colore pas ».",
                ],
              },
            },
          ],
        },
        "rog-2": {
          question: "As-tu monté le DLI (heures ou hauteur) et offert des nuits un peu fraîches pendant 6–8 semaines ?",
          answers: [
            {
              label: "Non, j’ai surtout ajouté du rouge / du FS en pensant que ça suffisait",
              result: {
                title: "Mauvais levier : DLI et génotype d’abord",
                fix: [
                  "Garde Growing 6500 K. 14–16 h, descends de 5 cm si tu es encore sous le max Carnivero.",
                  "Nuits 12–16 °C pour dionée / sarracène / drosera.",
                  "COP20FS = appoint de photons, pas une potion anthocyane.",
                  "Les nouvelles feuilles comptent. Photo J0 / J45.",
                ],
              },
            },
            {
              label: "Oui, DLI et fraîcheur OK, toujours vert",
              result: {
                title: "Soit encore sous la fenêtre, soit clone mal nommé",
                fix: [
                  "Vérifie que tu n’es pas à 120 µmol sur une dressée (cible ~300).",
                  "Foliar 0,3 g/L : une plante affamée colore mal.",
                  "Doute sur l’étiquette du vendeur : fréquent.",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "echec-semis",
      title: "Échec de semis (rien ne lève, ou tout tombe)",
      startId: "sem-1",
      nodes: {
        "sem-1": {
          question: "Les graines ont-elles eu leur cold strat si le genre le demande (Sarracenia, Dionaea, Drosera tempérées) ?",
          answers: [
            {
              label: "Non / je ne sais pas",
              result: {
                title: "Stratification manquante",
                fix: [
                  "4–8 semaines à 4 °C, papier ou tourbe juste humide, puis surface à 20–24 °C, 14 h, 150–250 µmol.",
                  "Capensis / spatulata / Byblis liniflora : pas de froid — si tu les as frigo 8 semaines pour rien, sème-les maintenant.",
                ],
              },
            },
            { label: "Oui, strat OK, et rien ne sort", nextId: "sem-2" },
          ],
        },
        "sem-2": {
          question: "Les graines étaient-elles enfouies, et le mix vient-il d’un terreau « semis » du jardin ?",
          answers: [
            {
              label: "Enfouies et/ou terreau fertilisé",
              result: {
                title: "Protocole de semis jardin, pas carnivore",
                fix: [
                  "Surface, tourbe/perlite 50/50 non amendée, ébouillantée, eau RO.",
                  "14 h, COP4065 ou COP2065 à 15–20 cm.",
                  "On recommence le lot s’il reste des graines.",
                ],
              },
            },
            { label: "Surface, mix pauvre, et toujours rien à 8 semaines", nextId: "sem-3" },
          ],
        },
        "sem-3": {
          question: "Le lot est-il vieux, ou as-tu de la fonte (tiges cernées) après une levée ?",
          answers: [
            {
              label: "Lot de plus d’un an / date inconnue",
              result: {
                title: "Viabilité faible",
                fix: [
                  "Graines de Sarracenia / Dionaea : fraîcheur = tout. Lot de plus d’un an au tiède = souvent mort. Racheter l’année.",
                  "Un témoin au chaud hors frigo écarte une strat trop longue ou un frigo trop sec.",
                ],
              },
            },
            {
              label: "Levée puis fonte",
              result: {
                title: "Dôme trop longtemps × chaleur",
                fix: [
                  "Aère dès 50 % de levée, retire le dôme.",
                  "20–24 °C, pas 30 °C sous la barre collée.",
                  "Moins d’eau en surface, sciarides : voir l’arbre dédié.",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "bouture-pourrit",
      title: "Bouture qui pourrit",
      startId: "bou-1",
      nodes: {
        "bou-1": {
          question: "Quel type de bouture ?",
          answers: [
            { label: "Tige Nepenthes", nextId: "bou-nep" },
            { label: "Leaf pulling Dionaea / Drosera / Pinguicula", nextId: "bou-leaf" },
          ],
        },
        "bou-nep": {
          question: "La sphaigne dégoutte-t-elle, et la barre est-elle à moins de 20 cm ?",
          answers: [
            {
              label: "Oui, mouillée et/ou LED collée",
              result: {
                title: "Cuites et noyées",
                fix: [
                  "Sphaigne essorée, plus de filet d’eau.",
                  "COP2065 à 30–40 cm, 40–80 µmol, 12–14 h.",
                  "Aère le dôme 2 min / jour. Reprends sur bois ferme.",
                ],
              },
            },
            {
              label: "Sphaigne juste humide, lumière douce, et ça fond quand même",
              result: {
                title: "Bois déjà fatigué ou T° inadaptée",
                fix: [
                  "Bouture trop molle au départ : on ne sauve pas. Recoupe au dur ou recommence.",
                  "Lowland à 18 °C ou highland à 30 °C : aligne le régime.",
                  "Hormone : optionnelle, jamais un substitut à l’hygiène de coupe.",
                ],
              },
            },
          ],
        },
        "bou-leaf": {
          question: "Le pétiole / la feuille est-il translucide et visqueux ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Pourriture de leaf pulling — on jette",
                fix: [
                  "Pas d’eau stagnante sur le pétiole. Mix essoré.",
                  "Dionaea : fragment de rhizome blanc obligatoire.",
                  "Pinguicula mexicaine : HR 70–80 %, pas 100 %, mix drainant.",
                  "Lumière 80–120 µmol (dionée/drosera) ou 40–80 (pinguicula), jamais germoir 250 collé.",
                ],
              },
            },
            {
              label: "Le limbe noircit mais le pétiole est ferme",
              result: {
                title: "Souvent normal (surtout Dionaea)",
                fix: [
                  "On attend 4–8 semaines. Les plantules partent du pétiole.",
                  "Ne pas déterrer tous les 3 jours.",
                  "Si à 10 semaines rien et pétiole sec comme du papier : échec propre, on relance.",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "ravageurs",
      title: "Pucerons, cochenilles, acariens",
      startId: "rav-1",
      nodes: {
        "rav-1": {
          question: "Que vois-tu surtout ?",
          answers: [
            { label: "Pucerons sur hampes / jeunes pousses", nextId: "rav-puc" },
            { label: "Amas cotonneux (aisselles Nepenthes, revers)", nextId: "rav-coch" },
            { label: "Bronzage, toile fine, feuilles ternes", nextId: "rav-ac" },
          ],
        },
        "rav-puc": {
          question: "La plante a-t-elle un mucilage (Drosera, Byblis, Pinguicula) que tu voudrais laver au savon ?",
          answers: [
            {
              label: "Oui, collante",
              result: {
                title: "Jet RO, pas de savon sur le mucilage",
                fix: [
                  "Douche d’eau RO, isolement, on coupe la hampe si elle est saturée de miellat.",
                  "Savon noir / insecticide rayon : ça déglace le mucilage et n’est pas un protocole carnivore.",
                  "Baisse la cadence de foliar : un NPK trop fréquent attire souvent le puceron.",
                ],
              },
            },
            {
              label: "Non, Sarracenia / Nepenthes / Dionaea",
              result: {
                title: "Isolement + eau, pas de « boost »",
                fix: [
                  "Jet RO répété 3–4 jours. Inspecter les nouvelles hampes.",
                  "Pas de systémique « plantes vertes ». Pas d’huile en saturant l’HR.",
                  "Si le foyer revient : c’est souvent trop d’azote foliar, on passe à 1×/mois.",
                ],
              },
            },
          ],
        },
        "rav-coch": {
          question: "Les foyers sont-ils localisés (quelques aisselles) ou généralisés ?",
          answers: [
            {
              label: "Localisés",
              result: {
                title: "Coton-tige + alcool 70°, 3 passages",
                fix: [
                  "Alcool à 70° sur coton, aisselles et revers, J0 / J5 / J12.",
                  "Inspecter le collet et le dessous des feuilles. Isoler le pot.",
                  "Pas d’huile de neem en jungle saturée (botrytis).",
                ],
              },
            },
            {
              label: "Toute la plante est farineuse",
              result: {
                title: "On bouture le propre, on jette le reste",
                fix: [
                  "Une Nepenthes farineuse de haut en bas se soigne mal en 1 m³ partagé.",
                  "Prélever 1–2 nœuds sains, protocole bouture. Le reste sort de la tente.",
                  "Inspecter les voisines 2 semaines.",
                ],
              },
            },
          ],
        },
        "rav-ac": {
          question: "L’air est-il sec (HR < 45 %) et la tente chaude ?",
          answers: [
            {
              label: "Oui",
              result: {
                title: "Acariens de tente sèche",
                fix: [
                  "Remonter l’HR vers 55–65 % sans fermer hermétique. Extracteur plus doux.",
                  "Rincer le feuillage à l’eau RO le matin. Isoler.",
                  "Drosera « sèches » : d’abord ça, pas une barre plus près.",
                ],
              },
            },
            {
              label: "HR OK, et ça bronze quand même",
              result: {
                title: "Foyer installé",
                fix: [
                  "Isoler, rincer 3 jours de suite, inspecter le revers à la loupe.",
                  "Pas de savon sur mucilage. Pas de cocktail ménager.",
                  "Si toile dense : plante trop atteinte, on bouture le sommet propre.",
                ],
              },
            },
          ],
        },
      },
    },
    {
      id: "hiver-tente",
      title: "Tempérée qui pousse en janvier (dormance manquée)",
      startId: "hiv-1",
      nodes: {
        "hiv-1": {
          question: "Dionaea, Sarracenia ou Drosera tempérée sous 14 h / 20 °C en novembre–février ?",
          answers: [
            { label: "Oui, tente chaude toute l’année", nextId: "hiv-2" },
            {
              label: "Non, elles sont au froid (dehors, garage, 8–10 h)",
              result: {
                title: "Alors ce n’est pas une dormance manquée",
                fix: [
                  "Pièges noirs / urnes molles au froid : normal. On ne réveille pas.",
                  "Pousses filiformes au froid : trop de lumière ou trop d’eau — on éloigne, on sèche.",
                  "Si tu visais autre chose : étiolement, pourriture, ou ravageurs.",
                ],
              },
            },
          ],
        },
        "hiv-2": {
          question: "As-tu un extérieur, un garage hors gel, ou seulement l’appartement ?",
          answers: [
            {
              label: "Châssis, balcon, garage, cave 5–10 °C",
              result: {
                title: "Sors-les. La LED ne fait pas l’hiver",
                fix: [
                  "FR/BE : Sarracenia et dionées adultes hivernent mieux dehors / garage que sous Cosmorrow à 20 °C.",
                  "Rampe : 12 h puis 8–10 h, T° vers 0–10 °C, bac retiré. Voir protocole dormance.",
                  "8 h de Growing dans un salon chaud, ce n’est pas une dormance : c’est un étiolement lent.",
                ],
              },
            },
            {
              label: "Que l’appartement",
              result: {
                title: "Plan B : pièce froide ou frigo aéré",
                fix: [
                  "Tente non chauffée contre un mur nord, 8–10 h, barre loin — si tu tiens 8–12 °C, c’est déjà mieux que 20 °C.",
                  "Quelques dionées : godet au frigo à légumes, aéré, un peu de lumière, 4–8 semaines mini, jamais un zip hermétique.",
                  "Si tu ne peux vraiment pas : assume une plante affaiblie et ne rachète pas 10 dionées « pour compenser ».",
                ],
              },
            },
          ],
        },
      },
    },
  ],
};
