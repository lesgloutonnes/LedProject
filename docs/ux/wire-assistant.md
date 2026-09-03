# Wireframes assistant — 4 steps + résultat

Texte, pas Figma. Largeur de référence **375**. Desktop : colonne stepper 220 px à gauche, contenu à droite, dès **1100**.

Légende : `[ ]` bouton, `( )` radio, `[x]` multi, `────` filet, `···` chips wrap.

Persistance : à chaque Continuer, écrire `lg.tente.project`. Bouton « Recommencer » (header secondaire, pas le CTA) reset `project`, garde `prefs`.

---

## Chrome commun (tous les écrans)

```
┌─────────────────────────────────────┐
│ [Aller au contenu]                  │  skip (focus only)
├─────────────────────────────────────┤
│ Les Gloutonnes          [Recommencer]    │  header compact
├─────────────────────────────────────┤
│  ●──○──○──○                         │  Stepper
│  Étape 1/4 · Projet                 │
├─────────────────────────────────────┤
│                                     │
│  (contenu du step)                  │
│                                     │
├─────────────────────────────────────┤
│                     [ Continuer → ] │  barre sticky interne
│  padding-bottom: --bottom-nav-space │
├─────────────────────────────────────┤
│ Accueil  Assistant  LED  Espèces  + │  bottom nav (Assistant actif)
└─────────────────────────────────────┘
```

Continuer : `position: sticky; bottom: var(--bottom-nav-space)` **sous 720**, pour ne pas passer sous la nav. Disabled + `aria-disabled` tant que le step est invalide. Label exact :

| Step | Disabled | Enabled |
| --- | --- | --- |
| 1 | Choisir un projet | Continuer |
| 2 | Choisir au moins un genre | Continuer |
| 3 | Choisir une tente | Continuer |
| 4 | Répondre aux 3 questions | Voir le kit |

Retour : lien texte `← Retour` à gauche de la barre, hidden au step 1.

---

## Écran 1 — Projet

Job : un métier, pas une plante.

```
┌─────────────────────────────────────┐
│ Étape 1/4 · Projet                  │
│                                     │
│ Quel est le job de cette tente ?    │  h1 Fraunces
│ Un protocole par métier, pas un     │
│ curseur unique.                     │  lede muted
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Germoir / semis             │ │  cards radio
│ │     Sarracenia, Drosera,        │ │
│ │     Dionaea — 150–250 µmol/m²/s      │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Bouturage & acclimatation   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Collection / adultes        │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Colorisation (« rouge »)    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Tente mixte multi-étages    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Chambre tropicale           │ │  Nepenthes, Heliamphora…
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Dormance tempérée           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [ Continuer → ]                     │
└─────────────────────────────────────┘
```

Comportement : une card = un radio. Tap = sélection + anneau `--primary`. **Pas** d’avance auto (évite les tap ratés en magasin). Ordre = tableau `IA.md` (germoir en premier : c’est 80 % des débutants).

Callout bas (option, si on a déjà `lg.tente.project.projet`) : « Projet en cours · Germoir — [reprendre] ». Inutile si on est déjà au step sauvegardé.

---

## Écran 2 — Genres

Job : qui vit sous les barres. Multi.

```
┌─────────────────────────────────────┐
│ Étape 2/4 · Genres                  │
│                                     │
│ Qui entre dans la tente ?           │  h1
│ Plusieurs genres = on dimensionne   │
│ sur le plus exigeant, pas la moyenne│
│                                     │
│  [ Sarracenia ] [ Drosera ]         │  chips wrap, aria-pressed
│  [ Dionaea ]    [ Nepenthes ]       │
│  [ Heliamphora ] [ Cephalotus ]     │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Callout (si tension projet)     │ │  ex. dormance + Nepenthes
│ │ Ces genres veulent une saison   │ │
│ │ fraîche, pas une chambre chaude.│ │
│ └─────────────────────────────────┘ │
│                                     │
│ Cibles (live, 1 ligne / genre)      │  Species mini : 100–400 µmol/m²/s
│  Sarracenia  200–500  ·  DLI 16–24  │
│                                     │
│ [ ← Retour ]       [ Continuer → ]  │
└─────────────────────────────────────┘
```

Précochage d’opinion (modifiable) :

| Projet | Chips on |
| --- | --- |
| germoir | sarracenia, drosera, dionaea |
| bouturage | nepenthes |
| collection | sarracenia |
| rouge | sarracenia, dionaea |
| mixte | sarracenia, nepenthes |
| tropicale | nepenthes, heliamphora |
| dormance | sarracenia, dionaea, drosera |

Ne **pas** précocher Cephalotus (trop niche, faux positif).

---

## Écran 3 — Surface (tente)

Job : géométrie. La favorite `lg.tente.prefs.tenteFavorite` porte un chip ambre « Favorite ».

```
┌─────────────────────────────────────┐
│ Étape 3/4 · Surface                 │
│                                     │
│ Quelle tente ?                      │  h1
│ On allume des plateaux, pas le      │
│ mylar. 2 bacs 60×40 → 120×60.       │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ (•) Vivosun 120 × 60 × 150      │ │
│ │     0,72 m²  [Favorite]         │ │  accent chip
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) 60 × 60 × 140               │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) 90 × 60                     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) 120 × 120                   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ( ) Autre — saisir L × l × H    │ │
│ │     [ 120 ] × [ 60 ] × [ 150 ]  │ │  apparaît si Autre
│ │     cm     cm     cm            │ │  inputmode numeric
│ └─────────────────────────────────┘ │
│                                     │
│ [ ] Enregistrer comme favorite      │  écrit prefs.tenteFavorite
│                                     │
│ Mini schéma 2:1 (120×60)            │  SVG, pas canvas
│ ┌─────────────────────────────┐     │
│ │  Bac A 60×40 │ Bac B 60×40  │     │
│ └─────────────────────────────┘     │
│                                     │
│ [ ← Retour ]       [ Continuer → ]  │
└─────────────────────────────────────┘
```

Si L < 50 ou > 240 : erreur inline, Continuer locked. Message : « Hors plage (40–240 cm). Vérifie les cotes intérieures, pas la boîte. »

---

## Écran 4 — Contraintes

Job : budget / hygro / dormance. Trois groupes **radio**, pas un slider budget (les prix boutique bougent, les paniers non).

```
┌─────────────────────────────────────┐
│ Étape 4/4 · Contraintes             │
│                                     │
│ Trois limites, ensuite le kit.      │  h1
│                                     │
│ Budget barres + alim                │  fieldset legend
│  ( ) Moins de 150 €                 │
│  ( ) 150–300 €                      │
│  ( ) Peu importe                    │
│  Hors tente, pots, extracteur.      │  hint
│                                     │
│ Hygrométrie visée                   │
│  ( ) Basse  < 50 %                  │
│  ( ) Moyenne  50–70 %               │
│  ( ) Haute  > 70 %                  │
│  IP65 Cosmorrow dans tous les cas.  │
│  Haute = alim hors tente si poss.   │
│                                     │
│ Dormance dans CETTE tente ?         │
│  ( ) Oui, saison fraîche            │
│  ( ) Non                            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Ne pas mélanger 20 W et 40 W    │ │  Callout, lien Cosmorrow
│ │ sur la même alim. COP40FS       │ │
│ │ (70 cm) ≠ COP4065 (87 cm).      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [ ← Retour ]       [ Voir le kit ]  │
└─────────────────────────────────────┘
```

Précochage hygro : tropicale → haute ; germoir → moyenne. Dormance : projet `dormance` → oui.

---

## Écran résultat — kit

Pas un 5ᵉ dot : le stepper passe en état « complet » (4 dots remplis, label « Ton kit »). H1 = nom du kit, pas « Résultat ».

```
┌─────────────────────────────────────┐
│ ●──●──●──●  Ton kit                 │
│                                     │
│ 2 × Cosmorrow Growing 90 cm         │  h1 Fraunces
│ + COM2X40                           │
│                                     │
│ ┌──────────┐ ┌──────────┐           │
│ │ 80 W     │ │ 202 µmol/s│           │  KitResult stats 2×2
│ │ 14 h · 20 cm au terreau│           │
│ └──────────┘ └──────────┘           │
│ │ ~18 €/an │ │ germoir   │           │  €/an depuis prefs.kwhEur
│                                     │
│ Liste d’achat                       │
│  • 2 × COP4065  Growing 6500 K      │
│  • 1 × COM2X40  alim 24 V           │
│  • Programmateur ON/OFF 14 h        │
│  • (tente déjà choisie — hors kit)  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Callout OK ou warn              │ │  ex. budget sous-150 OK
│ │ Zone constructeur 120×60 @ 15 cm│ │
│ └─────────────────────────────────┘ │
│                                     │
│ Checklist montage                   │
│  [ ] Alim hors splash / hors tente  │
│  [ ] Barres parallèles aux 120 cm   │
│  [ ] 15–20 cm au-dessus du terreau  │
│  [ ] Pas de mix 20 W / 40 W         │
│  [ ] Timer 14 h, pas Controller+    │
│                                     │
│ [ Ouvrir le protocole germoir ]     │  → protocoles.html#germoir
│ [ Imprimer / télécharger la liste ] │  → window.print #kit-print
│ [ Voir les SKU Cosmorrow ]          │  secondaire ghost
│ [ Simuler PPFD (Outils) ]           │  ghost
│                                     │
│ [ ← Modifier les contraintes ]      │  step 4, ne wipe pas le kit
│ [ Recommencer l’assistant ]         │  lien muted
└─────────────────────────────────────┘
```

### Zone print `#kit-print`

Inclure **uniquement** : titre kit, SKU + qty, watts, PPF, hauteur, heures, tente L×l×H, checklist (cases vides), tarif kWh, date du jour, disclaimer « modèle prudent, pas un PAR-mètre ».

Exclure : nav, stepper, chips, heatmap, boutons.

Déclencheur :

```js
function printKit() {
  document.body.classList.add("is-printing-kit");
  window.print();
}
window.addEventListener("afterprint", () => {
  document.body.classList.remove("is-printing-kit");
});
```

CSS :

```css
@media print {
  body.is-printing-kit * { visibility: hidden; }
  body.is-printing-kit #kit-print,
  body.is-printing-kit #kit-print * { visibility: visible; }
  body.is-printing-kit #kit-print { position: absolute; inset: 0; }
}
```

Pas de lib PDF. Sur iOS, « Imprimer » propose Enregistrer en PDF — c’est le « télécharger ». Label du bouton : **« Imprimer / enregistrer en PDF »**, pas « Télécharger » seul (sinon on cherche un fichier `.pdf` inexistant).

### Logique kit (opinion, pour le dev données)

Priorité : géométrie tente → projet (PPF) → budget.

| Tente | Projet type | Budget sous-150 | Kit |
| --- | --- | --- | --- |
| 120×60 | germoir / bouturage | oui | 2× COP4065 + COM2X40 |
| 60×60 | germoir | oui | 1× COP2065 + COM20 |
| 90×60 | germoir | oui | 1× COP40FS + COM40 **ou** 2× COP2065 + COM2X20 |
| 120×60 | rouge / adultes | 150–300 | 2× COP4065 + COM2X40, hauteur 25–30 cm, 16 h |
| 120×120 | collection | peu-importe | 4× COP4065 + 2× COM2X40 (deux circuits) |
| haute hygro | tous | — | même SKU, callout « alim hors tente » |
| dormance oui | — | — | même kit, callout « 8–10 h, baisser, 3–4 mois » |

Si budget `sous-150` et tente 120×120 : callout danger « Le budget ne couvre pas 4 barres. On propose 2× COP4065 au centre — uniformité mauvaise. Passe 150–300 ou réduis la surface utile. » Kit quand même émis, jamais un écran vide.

---

## États vides / erreurs

- Storage illisible : step 1, callout muted, on n’alerte pas.
- Query `?step=3` sans tente : clamp au premier step invalide.
- JS off : `<noscript>` « L’assistant a besoin de JavaScript. Le catalogue est sur Cosmorrow. » + lien.

---

## Desktop (≥ 1100)

```
┌──────────────┬──────────────────────────────────┐
│ Stepper vert │  H1 + cards                      │
│ 1 Projet     │                                  │
│ 2 Genres     │                                  │
│ 3 Surface    │                                  │
│ 4 Contraintes│              [ Continuer → ]     │  pas sticky bas
└──────────────┴──────────────────────────────────┘
```

Steps 1–3 cliquables **uniquement** s’ils sont déjà validés (revenir). Step 4 non validé : pas un lien.
