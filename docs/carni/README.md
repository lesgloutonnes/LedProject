# Contenu horticole — Les Gloutonnes · Tourbière

Données et copy francophones pour le site tente + **LED Secret Jardin Cosmorrow**.  
Ce dossier n’est **pas** le site : pas de HTML ici. Le front lira ces fichiers (ou une copie dans `js/data/`).

## Fichiers

| Fichier | Variable globale | Rôle |
| --- | --- | --- |
| `species.js` | `window.TOURBIERE_SPECIES` | Fiches genres / sous-groupes (PPFD, DLI, eau, tente, projets) |
| `protocols.js` | `window.TOURBIERE_PROTOCOLS` | 7 protocoles : semis, bouturage, production, colorisation, mixte, tropical, dormance |
| `nutrients.js` | `window.TOURBIERE_NUTRIENTS` | Eau, substrats, engrais, proies |
| `diagnostic.js` | `window.TOURBIERE_DIAGNOSTIC` | Arbres de décision (symptôme → questions → gestes) |
| `calendar.js` | `window.TOURBIERE_CALENDAR` | Calendrier mensuel FR/BE (hémisphère nord) |
| `copy.md` | — | Intro espèces, mythes, glossaire PPFD / DLI / photopériode |
| `README.md` | — | Le présent fichier |

Tous les `.js` sont du vanilla (IIFE-free, assignation `window.*`) pour un `<script src>` sans bundler.

## Genres couverts (`species.js`)

- *Dionaea*
- *Sarracenia* dressées / basses
- *Drosera* tempérée / capensis-tropicale / pygmée
- *Nepenthes* lowland / highland
- *Pinguicula* tempérée / mexicaine
- *Utricularia* terrestre / épiphyte
- *Cephalotus*
- *Heliamphora*
- *Darlingtonia* (estimation Carnivero `*`)
- *Drosophyllum* (estimation `*`)
- *Byblis* (hors table Carnivero : fourchette type *Drosera*, signalée)

Champs : `id`, `latin`, `common`, `family`, `climate`, `dormancy` + `dormancyNote`, `ppfd`, `dli`, `photoperiodGrow` / `photoperiodDorm`, `humidity`, `tempDay` / `tempNight`, `water` + `waterNote`, `substrate`, `fertilizer`, `tentTips`, `traps`, `seedlingNotes`, `cuttingNotes`, `redColorNotes`, `warnings[]`, `projects[]`.

`projects` ∈ `seedling` | `cutting` | `production` | `coloring` | `mixed` | `tropical` | `dormancy`.

## Protocoles (`protocols.js`)

| id | Titre court |
| --- | --- |
| `seedling` | Germoir 14 h, 15–20 cm, 150–250 µmol, cold strat |
| `cutting` | Boutures Nepenthes HR 90–100 % + leaf pullings |
| `production` | Adultes, foliar ¼, pots justes |
| `coloring` | DLI × génotype, Growing 6500 K d’abord, FS appoint |
| `mixed` | Étage haut Sarracenia / bas Nepenthes |
| `tropical` | Extracteur, HR 60–80 %, pas de dormance |
| `dormancy` | Dehors / garage d’abord · 0–10 °C · 8–10 h · mix juste humide |

## Parti-pris (sources)

1. **PPFD par genre** — [Carnivero, *Genera Specific PPFD Recommendations*](https://www.carnivero.com/pages/grow-light-ppfd-recommendations) (expérience Florawave / serre ; viser le bas-milieu ; photopériode 12–14 h). Les `*` du tableau d’origine sont repris dans les fiches. *Byblis* n’y figure pas : fourchette indicative, jamais présentée comme une mesure Carnivero.
2. **DLI** — calcul `PPFD × heures × 0,0036`. Min ≈ PPFD min × 12 h ; cible ≈ PPFD cible × 13 h ; max ≈ PPFD max × 14 h. Ordres de grandeur, pas un labo.
3. **Nutrition** — Adamec L., 1997. *Mineral nutrition of carnivorous plants: a review.* Bot. Rev. 63: 273–299. Absorption foliaire réelle ; interaction pièges / racines. Pas une recette d’engrais : un cadre pour **ne pas** diaboliser un foliar dilué.
4. **Foliar 0,3 g/L** — dose de travail FR/BE : orchidée équilibré au quart (ou Rain Mix). Maxsea 16-16-16 ¼ c. à café / gallon US est **la même force**, pas un sésame d’import. Jamais Miracle-Gro, jamais terreau fertilisé, racinaire déconseillé (algues).
5. **Eau** — RO / pluie / distillée / ZeroWater (TDS 000). **Brita non**. Seuil de travail : **TDS < 50 ppm** (≈ 100 µS/cm). Tourbe **non amendée** (pH 3,5–4,5) : la tourbe de rayon est souvent chaulée.
6. **LED** — uniquement **Cosmorrow** (fiche constructeur COP 2023-09) : COP2065 / COP4065 Growing 6500 K ; COP20FS / COP40FS en appoint. 24 V, IP65. Pas de mélange 20 W + 40 W sur la même alim. COP40FS (70 cm) ≠ COP4065 (87 cm).
7. **Dormance** — obligatoire vs optionnelle vs none, écrit sur chaque fiche. Tempérées FR/BE : **dehors / garage d’abord** (0–10 °C, 3–4 mois). Tente Cosmorrow 8–10 h = plan B si pas de froid. Tropicales : pas d’hiver inventé.
8. **Colorisation** — pas de pic 660 obligatoire. Génotype + DLI + nuits fraîches. Growing 6500 K suffit souvent.
9. **Sécurité** — pas de conseils médicaux ; pas de chimie dangereuse ; engrais = dilutions horti nommées seulement ; nematodes / soufre horti cités comme options étiquette, jamais de recettes maison.

## Ton

Français, tutoiement professionnel, précis, jamais alarmiste. Fourchettes. Un hibernacle n’est pas une plante morte. Une LED « trop faible » est souvent une barre trop haute.
