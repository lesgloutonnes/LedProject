# Architecture de l’information — Les Gloutonnes · Tourbière

Site **multi-pages**, HTML/CSS/JS vanilla, **sans npm**. Une URL = une tâche. Pas de SPA, pas de hash-router : le Wi-Fi magasin coupe, le bouton retour du téléphone doit marcher.

Arborescence cible (le chef de projet assemble) :

```
/
  index.html
  assistant.html
  cosmorrow.html
  especes.html
  protocoles.html
  tente.html
  nutriments.html
  outils.html
  diagnostic.html
  a-propos.html
  css/
    tokens.css          ← coller docs/ux/css-tokens.css
    ui.css              ← composants (travail ultérieur)
  js/
    lib/
      storage.js        ← tourbiere.* + try/catch quota
      escape.js         ← escapeHtml
      print.js          ← window.print d’une zone
    data/
      projets.js
      genres.js
      tentes.js
      cosmorrow.js
      protocoles.js
    assistant.js
    outils.js
    diagnostic.js
```

Ouvrir `index.html` ou `python3 -m http.server 8000`. Chemins **relatifs** (`css/tokens.css`, jamais `/css/…`) pour que file:// tienne encore.

---

## 1. Carte des pages

Chaque page a **un job**, **un CTA primaire**, **des sorties**. Titres uniques (voir `a11y-security.md`).

| Fichier | Job | CTA primaire | Sorties |
| --- | --- | --- | --- |
| `index.html` | Promesse + 3 chemins. Utilisateur magasin, 30 s. | Lancer l’assistant | Cosmorrow, Espèces, Protocoles |
| `assistant.html` | Wizard 4 steps → kit | Continuer / Voir le kit | Protocoles, Cosmorrow, Tente, print |
| `cosmorrow.html` | Gamme COP + alims + règles 24 V / IP65 + kits par tente | Choisir un kit | Assistant (prérempli), Outils (PPFD) |
| `especes.html` | Fiches genres : PPFD, DLI, eau, tente | Filtrer un genre | Diagnostic, Protocoles, Assistant |
| `protocoles.html` | 7 métiers (semis → dormance), pas un curseur unique | Ouvrir un protocole | Tente, Nutriments, Cosmorrow |
| `tente.html` | Dimensions, aération, hygro, plan de pose | Voir le plan de pose | Cosmorrow, Outils, Assistant |
| `nutriments.html` | Eau RO, tourbe, Maxsea ¼, alimentation | Lire la fiche eau | Espèces, Protocoles |
| `outils.html` | PPFD/DLI, kWh, hauteur | Recalculer | Cosmorrow (SKU), Heatmap |
| `diagnostic.html` | Arbre : étiole / grille / ne colore pas | Suivre l’arbre | Espèces (cibles), Protocoles |
| `a-propos.html` | Sources, prudence, qui on est | Retour accueil | Liens externes sourcés |

**Pas de page `plus.html`.** « Plus » est un **menu** (sheet mobile / overflow desktop) qui pointe vers Protocoles, Tente, Nutriments, Outils, Diagnostic, À propos.

**Pas de page comparatif multi-marques.** Cosmorrow seulement. L’ancien palmarès Florawave / Hortimol / SANlight meurt avec le proto `index.html` actuel.

---

## 2. Accueil — 3 chemins, pas un dashboard

Au-dessus de la ligne de flottaison mobile :

1. Kicker `Les Gloutonnes · Tourbière`
2. H1 display : une phrase (ex. *Une tente, des Cosmorrow, un protocole.*)
3. Lede 2 lignes max.
4. **CTA sticky** `Lancer l’assistant` (voir `mobile.md`)
5. Trois cartes-chemins, toujours dans cet ordre :

| Carte | Pour qui | Lien |
| --- | --- | --- |
| Assistant | « Par où commencer ? » | `assistant.html` |
| LED Cosmorrow | « Quelle barre, quelle alim ? » | `cosmorrow.html` |
| Espèces | « Mes plantes étirent / grillent » | `especes.html` |

Sous le fold, **pas** de heatmap. Une bande « 7 protocoles » en chips vers `protocoles.html#germoir` etc. Une ligne tarif kWh (lue depuis `tourbiere.prefs`) + lien Outils.

---

## 3. Navigation

### 3.1 Mobile — barre bas, 5 items

Toujours visible. Ordre **fixe**, icône + label (jamais icône seule). Item actif = `aria-current="page"`.

| # | Label | Cible | Pourquoi lui |
| --- | --- | --- | --- |
| 1 | Accueil | `index.html` | Reset mental, 3 chemins |
| 2 | Assistant | `assistant.html` | Job n°1 du CDC |
| 3 | LED | `cosmorrow.html` | Marque unique, rayon growshop |
| 4 | Espèces | `especes.html` | Diagnostic informel en serre |
| 5 | Plus | ouvre le sheet | Le reste, sans 8 onglets |

Sheet « Plus » (dans le shell, pas une URL) :

- Protocoles
- Tente
- Nutriments
- Outils
- Diagnostic
- À propos

Le 5ᵉ item **n’est pas** une page : c’est un `<button>` qui ouvre `<dialog id="plus-sheet">`. Fermer : bouton, Escape, clic backdrop. Restaurer le focus.

Hauteur barre + `safe-area-inset-bottom` → padding-bottom de `main` (token `--bottom-nav-space`). Sinon le CTA et le footer sont écrasés.

### 3.2 Desktop (≥ 1100 px) — header sticky

Header `position: sticky; top: 0; z-index: 40`. Pas de bottom nav (`display: none` via `.bottom-nav`).

```
[marque Tourbière]   Accueil  Assistant  Cosmorrow  Espèces  Protocoles   [Plus ▾]   [CTA Assistant]
```

- Logo-texte : `Les Gloutonnes` en sans small-caps / kicker + `Tourbière` en Fraunces.
- 5 liens primaires + menu Plus (mêmes 6 secondaires).
- CTA header = `Lancer l’assistant` **sauf** sur `assistant.html` (là : « Reprendre » si `tourbiere.project.step` existe, sinon rien).
- `backdrop-filter` léger, pas de néon. Bordure basse `--border`.

Entre 720 et 1099 : header compact (liens primaires + Plus), bottom nav **cachée**. On ne montre **jamais** header complet **et** barre bas.

### 3.3 Skip link

Premier enfant de `body` : « Aller au contenu » → `#contenu`. Voir `html-shell.html`.

---

## 4. Flux assistant (4 steps + résultat)

URL unique : `assistant.html`. L’étape vit dans `tourbiere.project.step` (1–4) et dans `?step=` en query **en plus** (partage / retour). Si query absente, lire le storage. Si conflit : **query gagne** (lien partagé).

```
step 1  Projet
step 2  Genres
step 3  Surface (tente)
step 4  Contraintes
écran  Résultat kit          ← step === "result" | 5
```

Un stepper horizontal (mobile : 4 dots + label de l’étape courante). Pas de skip d’étape : Continuer désactivé tant que le step n’est pas valide. Retour toujours possible.

### Step 1 — Projet

Une seule carte sélectionnable. IDs stables (données `js/data/projets.js`) :

| id | Label UI | Protocole cible |
| --- | --- | --- |
| `germoir` | Germoir / semis | `#germoir` |
| `bouturage` | Bouturage & acclimatation | `#bouturage` |
| `collection` | Collection / adultes | `#collection` |
| `rouge` | Colorisation (« rouge ») | `#rouge` |
| `mixte` | Tente mixte multi-étages | `#mixte` |
| `tropicale` | Chambre tropicale | `#tropicale` |
| `dormance` | Dormance tempérée | `#dormance` |

### Step 2 — Genres

Multi-sélection (chips), min 1. IDs :

`sarracenia` · `drosera` · `dionaea` · `nepenthes` · `heliamphora` · `cephalotus`

Règles d’opinion (afficher un callout, ne pas bloquer) :

- `tropicale` + seulement `dionaea`/`sarracenia` → « Ces genres veulent une saison fraîche, pas une chambre chaude. »
- `dormance` + seulement `nepenthes` → inverse.
- `rouge` sans `sarracenia` ni `dionaea` → « Le rouge, c’est surtout DLI + génotype, pas un spectre 660. »

### Step 3 — Surface (tente)

Catalogue `js/data/tentes.js`. Cartes + option « Autre » (L × l × H en cm, inputs `inputmode="numeric"`).

Tentes de départ (ids) :

| id | Label | L × l × H |
| --- | --- | --- |
| `vivosun-120-60-150` | Vivosun 120 × 60 × 150 | **défaut** + favorite probable |
| `60-60-140` | 60 × 60 | 1 barre 47 cm |
| `90-60-140` | 90 × 60 | COP40FS possible |
| `120-120-180` | 120 × 120 | 2 lignes de barres |
| `custom` | Saisie libre | clamp 40–240 cm |

Si `tourbiere.prefs.tenteFavorite` matche un id : précocher + badge « Favorite ». Au choix, proposer « Enregistrer comme favorite ».

Montrer l’aire en m² (`L*l/10000`) et le rappel : *2 bacs 60 × 40 rentrent dans 120 × 60*.

### Step 4 — Contraintes

Trois questions **indépendantes**, toutes obligatoires :

1. **Budget kit LED** (alims + barres, hors tente)  
   `sous-150` · `150-300` · `peu-importe`
2. **Hygrométrie visée**  
   `basse` (< 50 %) · `moyenne` (50–70) · `haute` (> 70, tropicale)
3. **Dormance dans cette tente**  
   `oui` · `non`  
   Si projet = `dormance`, précocher `oui` (modifiable).

Callout : *Ne pas mélanger 20 W et 40 W sur la même alim.* Lien Cosmorrow.

### Écran résultat

Voir `wire-assistant.md`. Persister le kit dans `tourbiere.project.kit`. CTA :

- Checklist montage (in-page)
- Protocoles (`protocoles.html#` + id projet)
- Télécharger / imprimer la liste (`window.print` d’une zone `#kit-print`)
- Affiner dans Cosmorrow / Outils

---

## 5. localStorage

Préfixe unique `tourbiere.`. **Pas** de cookies. **Pas** d’autres clés. Wrapper `try/catch` (quota, mode privé, SecurityError). API proposée dans `js/lib/storage.js`.

### `tourbiere.project`

Session de l’assistant. Écrasée à chaque « Recommencer ». Jamais de PII.

```json
{
  "v": 1,
  "updatedAt": "2026-09-03T07:00:00.000Z",
  "step": 3,
  "projet": "germoir",
  "genres": ["sarracenia", "drosera", "dionaea"],
  "tente": {
    "id": "vivosun-120-60-150",
    "lengthCm": 120,
    "widthCm": 60,
    "heightCm": 150
  },
  "contraintes": {
    "budget": "sous-150",
    "hygro": "moyenne",
    "dormance": false
  },
  "kit": null
}
```

`kit` une fois calculé :

```json
{
  "bars": [{ "sku": "COP4065", "qty": 2 }],
  "psu": { "sku": "COM2X40", "qty": 1 },
  "watts": 80,
  "ppf": 202,
  "heightCm": 20,
  "hours": 14,
  "protocolId": "germoir",
  "warnings": ["Ne pas mélanger 20 W et 40 W sur la même alim."]
}
```

### `tourbiere.prefs`

Survit aux « Recommencer ». Écran Outils + step tente.

```json
{
  "v": 1,
  "kwhEur": 0.2016,
  "tenteFavorite": "vivosun-120-60-150"
}
```

- `kwhEur` : tarif FR paramétrable. Défaut **0,2016** (à documenter dans Outils / À propos, pas hardcodé dans 4 fichiers). Input `step="0.0001"`, min 0.05, max 0.80.
- `tenteFavorite` : id catalogue ou `null`.

Lire : `JSON.parse`. Si `v` inconnu ou JSON pourri → reset silencieux à `{ v: 1, kwhEur: 0.2016, tenteFavorite: null }`. Ne jamais `innerHTML` une valeur storage.

---

## 6. Liens croisés (règles)

- Toute mention d’un SKU (`COP4065`, `COM2X40`…) → `cosmorrow.html#cop4065` (ids kebab minuscules).
- Toute mention d’un genre → `especes.html#sarracenia`.
- Toute mention d’un métier → `protocoles.html#germoir`.
- Callout « plantes grillées / étiolement » → `diagnostic.html`.
- Tarif / DLI / hauteur → `outils.html`.
- Eau / tourbe / Maxsea → `nutriments.html`.
- Accrochage, extracteur, hygro → `tente.html`.

Ancres **obligatoires** dès le premier HTML : un confirmé scrolle, un débutant clique l’assistant.

---

## 7. Pages secondaires — contenu minimum pour assembler

### Cosmorrow

Ordre : règles (24 V, IP65, pas de mix 20/40 W, COP40FS ≠ COP4065 en longueur) → tableau SKU constructeur 2023-09 → alims COM* → kits par tente (cartes) → FAQ câblage. Heatmap **non** : ça vit dans Outils, iframe interdite. Lien « Simuler ce kit » → `outils.html?sku=COP4065&qty=2`.

### Espèces

Index chips (mêmes ids que l’assistant) + une `SpeciesCard` par genre : PPFD fourchette, DLI, photopériode, eau, notes tente. Sources en pied de carte (Carnivero). Pas de photos stock cannabis.

### Protocoles

7 sections `ProtocolStep` (dl). Nav d’ancre sticky sous le header desktop / sous le h1 mobile.

### Tente

Cotes, aération, hygro, checklist pose. Schéma SVG (pas canvas) + lien Outils pour la heatmap.

### Nutriments

Fiches courtes : osmose / pluie, tourbe blonde + sphaigne / perlite, Maxsea 16-16-16 au ¼, pas d’engrais « growbloom ».

### Outils

Trois cartes : PPFD/DLI, électricité (`kwhEur` depuis prefs), hauteur. Heatmap canvas **ici seulement**. Query `?sku=&qty=` préremplit.

### Diagnostic

`DiagnosticTree` : 3 racines (étiole / grille / ne colore pas) puis 2–3 questions. Feuilles = lien protocole + cible PPFD genre.

### À propos

Sources (Carnivero PPFD, fiche COP 2023-09, Maxsea / California Carnivores), modèle optique prudent, pas de tracking, contact éventuel en mailto. `rel="noopener noreferrer"` sur tout `_blank`.

---

## 8. Décisions d’opinion (ne pas rouvrir sans raison)

1. **FR only**, unités métriques, 230 V. Pas de toggle EN dans le header.
2. **Cosmorrow only.** Un SKU hors Secret Jardin n’entre pas, même en « alternative ».
3. **Assistant = conversion.** L’accueil ne noie pas sous les tableaux.
4. **Storage local, pas de compte.** Quota plein → message, on continue en mémoire.
5. **Plus = sheet, pas 6ᵉ page.** Les 10 URLs restent bookmarkables.
6. **Print = `window.print`** d’une zone, pas de PDF.js, pas de blob download obligatoire. Un `download` JSON du projet est un plus, pas un must.
7. Le proto actuel (`index.html` racine, palmarès multi-marques, thème clair moss) est **un labo**. Ne pas copier son IA.
