# Mobile — Les Gloutonnes

Le site se tient dans un rayon growshop, une serre, un métro. Pouce droit, soleil, Wi-Fi pourri. **375 px** est le design ; **320 px** ne casse pas (pas de scroll X de page).

Bottom nav + safe-area + CTA collant = le trio à ne pas rater. Le reste suit.

---

## 1. CTA sticky « Lancer l’assistant »

Présent sur **accueil uniquement** (et éventuellement Cosmorrow / Espèces si le fold n’a pas déjà un CTA kit). Pas sur `assistant.html` (le Continuer du wizard prend le relais).

```
┌─────────────────────────────┐
│  hero                       │
│  3 cartes chemins           │
│  …                          │
│                             │
│ ┌─────────────────────────┐ │
│ │  Lancer l’assistant     │ │  ← barre CTA
│ └─────────────────────────┘ │
│ ░░░░░ bottom nav ░░░░░░░░░ │
└─────────────────────────────┘
```

Règles :

- Lien `<a class="cta-sticky" href="assistant.html">`, pas un bouton JS.
- `position: fixed; left: 0; right: 0;`
- `bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px));`
- Padding interne ≥ 14 px. Hauteur totale ≥ 48 px. Full-width moins `--s-4` de marge (pas collé aux bords écran : 8–16 px).
- Fond `--primary`, texte `--primary-fg`. Radius `--radius-md`. **Pas** de FAB rond violet.
- `z-index: 45` (sous la nav 50, au-dessus du contenu).
- Dès **720 px** : le sticky disparaît. Le CTA vit dans le header et dans le hero.
- `padding-bottom` du `main` accueil = `--bottom-nav-space` **+ hauteur CTA** (~3.25 rem). Token suggéré `--cta-sticky-space`.

Masquer le sticky quand le hero CTA est **entièrement** visible (`IntersectionObserver`) : sinon deux boutons identiques. Si l’observer est trop cher pour v1 : laisser le sticky tout le temps sous 720 — redondant mais impossible à rater en magasin.

`prefers-reduced-motion` : pas de slide-in.

---

## 2. Bottom nav vs contenu

La nav **écrase** tout ce qui n’a pas de padding. Symptôme : dernière card, footer, Continuer wizard, stats heatmap.

Formule unique (déjà dans `css-tokens.css`) :

```css
--bottom-nav-h: 3.5rem; /* 56 px */
--bottom-nav-space: calc(
  var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + var(--s-5)
);
```

- `main.page-main` → `padding-bottom: var(--bottom-nav-space);`
- Accueil avec CTA sticky → ajouter la hauteur CTA.
- Footer : **dans** le flux, au-dessus de ce padding, pas `position: fixed`.
- ≥ **720** : bottom nav `display: none`, padding-bottom revient à `--s-8`.

Nav elle-même :

```css
.bottom-nav {
  position: fixed;
  inset: auto 0 0 0;
  z-index: 50;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  min-height: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px));
}
```

Home indicator iPhone : les labels restent **au-dessus** du safe-area (padding, pas height compressée).

Tap : pas de zoom (déjà viewport correct). `touch-action: manipulation` sur nav et chips (enlève le delay 300 ms sans casser le pinch-zoom de la page).

---

## 3. Sliders 44 px

Les `input type="range"` natifs sont trop plats. Règle :

- Le **label + valeur** tiennent sur une ligne (« Hauteur **20 cm** »).
- La zone de hit du range : `min-height: 44px` sur le wrapper `.slider`. Le track visuel peut faire 4 px, le thumb 24 px, mais le padding vertical du wrapper complète à 44.
- `accent-color: var(--primary)`.
- Pas de slider custom JS (ça casse VoiceOver). Native only.
- En paysage 320×568 : sliders full width du wrap, pas 50 % (pouce).

Même 44 px : chips, tabs, checkboxes checklist (label entier cliquable), radios projet, items bottom-nav, Continuer.

---

## 4. Chips wrap

`.cluster` / `.chips` : `flex-wrap: wrap; gap: var(--s-2);`.

- **Jamais** `overflow-x: auto` sur un groupe de genres (on rate Cephalotus à droite, on ne sait pas que ça scrolle).
- Chip : `white-space: nowrap` **à l’intérieur** du label (pas de « Sarra- » coupé), le groupe wrappe.
- Plus de 6 chips : wrap sur 2–3 lignes, c’est prévu (step 2).
- État actif lisible sans couleur seule : filet 2 px + fond primary (pas seulement un changement de teinte).

---

## 5. Tables swipe

Page : **pas** de scroll X. Table : **oui**, dans `.table-wrap`.

```
[ PPFD bacs  A/B  DLI  €/an →  ]   ombre fade à droite
```

- `overflow-x: auto; overscroll-behavior-x: contain;`
- `tabindex="0"` + caption « Balayez horizontalement pour les colonnes ».
- Hint visuel : fade 24 px à droite (`mask-image` ou pseudo) **si** `scrollWidth > clientWidth`. Option v1 : un kicker « → glisser ».
- `-webkit-overflow-scrolling: touch`.
- Ne pas figer la 1re colonne (complexe, bug iOS). SKU assez court.
- Heatmap **n’est pas** une table : ne pas la mettre dans `.table-wrap`.

---

## 6. Heatmap full-bleed

Sur `outils.html` (seule page heatmap) :

Sous **720** : le cadre casse le `.wrap` pour occuper le viewport.

```css
@media (max-width: 719px) {
  .heatmap-bleed {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    border-radius: 0;
  }
}
```

- `aspect-ratio` = tente (120/60 = 2/1, etc.).
- Stats **sous** la carte, dans le wrap (lisibles, pas overlay illisible au soleil).
- Overlays bacs : labels 11 px minimum, fond `--card` 92 % opaque — le canvas sombre + soleil = texte perdu sinon.
- Pas de pinch-zoom custom sur le canvas (le pinch navigateur suffit). Pas de double-tap qui change la hauteur (conflit zoom).

---

## 7. Safe-area

`viewport-fit=cover` **uniquement si** on met `theme-color` et des fonds edge-to-edge (bottom nav, header). À ajouter au viewport :

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

Insets :

| Zone | Token / CSS |
| --- | --- |
| Haut (encoche) | header `padding-top: max(var(--s-3), env(safe-area-inset-top))` |
| Bas (home) | bottom nav + `--bottom-nav-space` |
| Gauche / droite (paysage) | `padding-inline: max(var(--page-gutter), env(safe-area-inset-left/right))` sur wrap **ou** sur body |

Tester : iPhone paysage, Android 3 boutons, un appareil avec encoche. Le Continuer du wizard ne doit **jamais** passer sous la nav ni sous le home indicator.

---

## 8. Gestes : ce qu’on fait / ce qu’on refuse

**On fait**

- Tap 44 px.
- Swipe horizontal **uniquement** dans `.table-wrap`.
- Scroll vertical page.
- `dialog` Plus : swipe-down **non requis** (bouton Fermer + backdrop). Si temps : `dialog` natif suffit.
- Retour navigateur = step précédent **seulement** si on a poussé `history` (option). V1 : le bouton `← Retour` du wizard suffit. Ne pas hijacker le back pour fermer le sheet sans `dialog` (le natif le gère).

**On refuse**

- Swipe entre steps de l’assistant (trop de faux positifs sur chips).
- Pull-to-refresh custom.
- Long-press menus.
- Bottom nav 6+ items, scroll de nav.
- Gestes canvas (rotate, 3D).

---

## 9. Clavier logiciel

Step 3 « Autre » : `inputmode="numeric"` + `pattern="[0-9]*"` sur L/l/H. `enterkeyhint="next"`. Le clavier ne doit pas cacher Continuer : sur iOS, `scrollIntoView` du bouton au `focus` de l’input.

Outils tarif kWh : `inputmode="decimal"`.

---

## 10. Checklist de revue mobile (avant done)

- [ ] 320, 375, 414 largeurs : pas de scroll X page
- [ ] Accueil : CTA sticky au-dessus de la nav, 3 cartes tapables
- [ ] Assistant 1→résultat au pouce, une main
- [ ] Plus sheet : 6 liens, fermeture, focus
- [ ] Table Cosmorrow : swipe, caption
- [ ] Heatmap Outils : full-bleed, stats lisibles au soleil
- [ ] Landscape : safe-area gauche/droite, nav OK
- [ ] Zoom 200 % : pas de recouvrement Continuer / nav
- [ ] `prefers-reduced-motion` : zéro animation de barre
