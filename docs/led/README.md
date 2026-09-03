# Données LED — Cosmorrow (Les Gloutonnes · Tourbière)

Fichiers JS consommés par le site (vanilla, sans npm). **Marque unique : Secret Jardin Cosmorrow.** Pas de palmarès multi-marques.

| Fichier | Export |
| --- | --- |
| `fixtures.js` | `window.TOURBIERE_FIXTURES` — 4 barres COP* |
| `psus.js` | `window.TOURBIERE_PSUS` — 8 alims COM* |
| `tents.js` | `window.TOURBIERE_TENTS` — 8 tentes EU |
| `kits.js` | `window.TOURBIERE_KITS` — 16 kits tente × projet |
| `optics.js` | `placements`, `simulatePpfd`, `dli`, `yearlyKwh` (+ `window.TOURBIERE_OPTICS`) |
| `install.js` | `window.TOURBIERE_INSTALL` |
| `copy.md` | Textes FR (pourquoi Cosmorrow, mythes, lire une fiche) |

Chargement type : `<script src="docs/led/fixtures.js"></script>` (ordre : fixtures / psus / tents avant kits / optics).

---

## Sources constructeur

- Fiche **COSMORROW BULBS (COP)** Secret Jardin, **2023-09** :  
  [https://www.secretjardin.com/wp-content/uploads/2023/09/20230905-COP-BULBS-DATASHEET.pdf](https://www.secretjardin.com/wp-content/uploads/2023/09/20230905-COP-BULBS-DATASHEET.pdf)
- Révision catalogue **2024-01** (COP20FS à PPE 2,85 / PPF 53 µmol/s ; la fiche 2023 listait encore COP20BL à 2,40 / 48). Le 20 W FS est donc une **fourchette** 48–53 µmol/s et 2,40–2,85 µmol/J.
- Page produit : [Bulbs & power supplies](https://www.secretjardin.com/bulbs-power-supplies/) — SKU COM20, COM40, COM2X20, COM2X40, COM3X20, COM3X40, COM5X20, COM5X40.
- Avertissement constructeur : **COP40FS n’est pas interchangeable en longueur** avec les autres 40 W (70 cm vs 87 cm).
- Tentes (cotes typiques) : fiches Secret Jardin Dark Street / Dark Propagator / Hydro Shoot.
- Cibles PPFD par genre (hors fiche SJ) : tables Carnivero — [grow-light PPFD recommendations](https://www.carnivero.com/pages/grow-light-ppfd-recommendations). À citer comme fourchettes pépiniériste, pas comme mesure Cosmorrow.

Valeurs retenues (fiche 2023-09 sauf mention). PPFD constructeur noté µmol/s/m² sur la fiche = **µmol/m²/s**.

| SKU | W | L | PPF (µmol/s) | PPE (µmol/J) | PPFD moy. (µmol/m²/s) | Zone |
| --- | --- | --- | --- | --- | --- | --- |
| COP2065 | 20 | 47 cm | 51 | 2,70 | 268 | 60×40 @ 15 cm |
| COP4065 | 40 | 87 cm | 101 | 2,70 | 205 | 120×60 @ 15 cm |
| COP20FS | 20 | 47 cm | 48–53 | 2,40–2,85 | 238 | 60×40 @ 15 cm |
| COP40FS | 40 | 70 cm | 107 | 2,85 | 240 | 90×60 @ 20 cm |

Électrique : 24 V DC, 0,78 A (20 W) / 1,56 A (40 W), IP65 barres, connecteur IEC 60130-10 5,5×2,1 mm. Largeur 3,2 cm (4,5 cm pour COP40FS), hauteur 1,6 cm.

---

## Hypothèses prix (`priceHintEUR` / `estimatedEUR`)

Fourchettes **TTC growshop FR/BE**, constatées sur catalogues 2025–2026 (growland, desjop, Hydrozone, Culture Indoor, etc.). **Pas des tarifs Secret Jardin.** La barre se vend **sans** alim.

Ordres de grandeur utilisés pour les totaux de kits (barres + alim, hors tente / extracteur) :

- COP2065 ~ 28–35 € · COP4065 ~ 42–52 € · COP20FS ~ 32–40 € · COP40FS ~ 45–55 €
- COM20 ~ 25–32 € · COM40 ~ 32–42 € · COM2X20 ~ 38–48 € · COM2X40 ~ 48–60 €
- COM3X20 ~ 50–65 € · COM3X40 ~ 60–78 € · COM5X20 ~ 65–85 € · COM5X40 ~ 80–105 €

Kit signature **2 × COP4065 + COM2X40 ≈ 130–145 €** (`estimatedEUR: 138`). Programmateur / hygromètre / bacs non détaillés dans tous les totaux : ±15–40 € selon le panier.

Anciennes refs boutique : COM2X20 ≈ COM40D, COM2X40 ≈ COM80D.

---

## Limites

- **Optique** (`optics.js`) : lambertien 120° + rebond mylar forfaitaire 0,25. Ce n’est **pas un PAR-mètre**. Sert à comparer des layouts Cosmorrow, pas à certifier un DLI.
- **Alims IP** : SJ communique IP65 ; certaines fiches revendeurs indiquent IP54. Dans tous les cas : driver **hors** tente.
- **COM3X\* / COM5X\*** : « 2/3 » et « 4/5 » = ports vides acceptés, wattage de port unique (20 **ou** 40), jamais mixte.
- **Tentes** : hauteurs typiques SJ (DP60 60 cm, DS60 158 cm, DS120W 178 cm, HS100 200 cm…). Une Vivosun 120×60×150 est plus basse : même emprise, moins d’étages.
- **Extracteurs** : débits « carnivores » (hygro), inférieurs aux préco HPS Level III des fiches tentes.
- **Tarif élec.** : 0,20 €/kWh par défaut (`TOURBIERE_EUR_PER_KWH`), paramétrable via `yearlyCost(kwh, tarif)`.
- Données arrêtées sur la fiche 2023-09 / page SJ ; un millésime barre peut bouger (voir COP20FS).
