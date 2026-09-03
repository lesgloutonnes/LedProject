# Design system — Les Gloutonnes · Tourbière

Direction : **tourbière de nuit sous LED 6500 K**, pas un growshop cannabis.

À tuer dès le premier pixel : violet néon, blurple 660 nm, mylar « weed », graisse industrielle noire, scanlines cyberpunk, badges « PRO GROW ». Ici : eaux sombres, sphaigne, blanc froid, urnes ambrées (Sarracenia). Editorial, humide, précis.

Le proto actuel (`styles.css` racine) est un **thème clair mousse**. On ne le prolonge pas. On part **dark forest**, lisible en rayon (lumière crue) et en serre.

Tokens prêts à coller : `css-tokens.css`.

---

## 1. Matière

| Référent | Ce qu’on en tire | Ce qu’on n’en tire pas |
| --- | --- | --- |
| Eau de tourbière | Fond `L≈0.29`, teinte 155–165 (vert-bleu froid) | Noir `#000`, OLED crush |
| Sphaigne | Primary : vert pâle saturé **modéré** | Fluo lime, dégradés Instagram |
| LED Cosmorrow 6500 K | Texte et highlights légèrement froids, glow **blanc**, pas bleu | RGB cycling, halo violet |
| Urnes ambrées | Accent cuivre-ambre pour CTA secondaires, prix, alertes douces | Orange promo, or crypto |
| Terreau / bois flotté | Bordures mates, ombres très courtes | Glassmorphism lourd, drop-shadow 40 px |

Ambiance **forêt sombre**, jamais cave. Si on baisse `L` sous 0.24, le contraste extérieur s’effondre et on a l’air d’un site cannabis. Interdit.

---

## 2. Palette OKLCH

Couleurs **sémantiques**. Pas de `blue-500`. Hex de secours pour Safari anciens ; la source de vérité est OKLCH.

Contraste visé : **WCAG AA** texte normal (4,5:1) sur `--bg` et sur `--card`. Vérifier avec un pipette + calculateur après collage (APCA bienvenu en plus, pas un blocker).

| Token | OKLCH | Hex approx. | Rôle | Contraste visé |
| --- | --- | --- | --- | --- |
| `--bg` | `oklch(0.29 0.034 162)` | `#243a32` | Fond page | — |
| `--fg` | `oklch(0.93 0.016 108)` | `#e8ead8` | Texte | ≥ 9:1 / bg |
| `--card` | `oklch(0.34 0.030 158)` | `#2e463d` | Surfaces | — |
| `--muted` | `oklch(0.74 0.028 150)` | `#a3b8a8` | Secondaire | ≥ 4,5:1 / bg **et** / card |
| `--primary` | `oklch(0.78 0.082 155)` | `#8bc49a` | CTA, focus, liens | — |
| `--primary-fg` | `oklch(0.22 0.040 155)` | `#123026` | Texte sur primary | ≥ 7:1 / primary |
| `--accent` | `oklch(0.76 0.118 58)` | `#d9a85c` | Urnes, prix, chips « favorite » | ≥ 4,5:1 / bg |
| `--danger` | `oklch(0.72 0.145 28)` | `#e08a6a` | Brûlure, erreur | ≥ 4,5:1 / bg |
| `--ok` | `oklch(0.76 0.108 148)` | `#7dbe94` | Dans la fenêtre PPFD | ≥ 4,5:1 / bg |
| `--border` | `oklch(0.42 0.024 158)` | `#3d564c` | Filets | — |
| `--led` | `oklch(0.95 0.018 230)` | `#eef2f8` | Glow barres, heatmap haut | — |
| `--bg-elevated` | `oklch(0.32 0.032 160)` | `#2a4138` | Header sticky, bottom nav | — |

Usage :

- **Un** primary par écran (CTA Assistant). Accent = métal précieux, **pas** un 2ᵉ bouton plein.
- Danger = callout « urnes croustillantes », jamais un fond page rouge.
- Ok = pastille « dans la fenêtre », jamais un check Discord vert.
- Liens interne : `--primary` soulignés `decoration-thickness: 1px` `underline-offset: 0.2em`. Liens externes : même chose + icône « sortie » en CSS (`::after`), pas un picto PNG.

Interdits : `#7c3aed`, `#a855f7`, magenta, dégradé rainbow heatmap type cannabis YouTube. Heatmap PPFD = **forêt → ambre → terre cuite** (déjà dans le proto, à conserver).

---

## 3. Typographie

Deux familles, **pas trois**. Pas de mono partout : le mono est réservé aux SKU, µmol, cm, kWh.

| Rôle | Google Font | Fallback offline | Graisses |
| --- | --- | --- | --- |
| Display | **Fraunces** (`opsz` 9–144, wght 500–600) | `Georgia, "Palatino Linotype", Palatino, serif` | 520–600 |
| UI / corps | **Figtree** 400 / 500 / 600 | `system-ui, "Segoe UI", Roboto, sans-serif` | 400–600 |
| Données | — | `ui-monospace, "Cascadia Mono", "SF Mono", Menlo, monospace` | 400 |

Pourquoi Fraunces : serif à axe optique, un peu « herbier », zéro techno-rave. Pourquoi Figtree : déjà dans le proto, géométrique lisible à 14 px sur téléphone pas cher.

Chargement :

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet" />
```

Si Google Fonts est bloqué (Wi-Fi magasin, CSP trop serrée, offline) : les fallbacks **doivent** déjà coller (Georgia + system-ui). `display=swap` obligatoire. Ne pas self-host tant qu’on n’a pas de dossier `fonts/` versionné — option ultérieure, pas un blocker.

Échelle (mobile → desktop) :

| Token | Taille | Usage |
| --- | --- | --- |
| `--step-0` | 0.75 rem | kicker, labels, caption |
| `--step-1` | 0.875 rem | meta, chips |
| `--step-2` | 1 rem | corps |
| `--step-3` | 1.125 rem | lead card |
| `--step-4` | clamp(1.35rem, 2.2vw, 1.75rem) | h2 |
| `--step-5` | clamp(1.85rem, 4.2vw, 2.85rem) | h1 |

Corps `line-height: 1.55`. Display `1.08`, `text-wrap: balance` sur h1/h2. `max-width` du texte courant : **36rem** (`--prose`). Les grilles et tables ignorent cette mesure.

Kicker : small-caps CSS **interdites** ( saleté navigateur ). À la place : `uppercase`, `letter-spacing: 0.18em`, Figtree 600, 0.72 rem, couleur `--primary`.

---

## 4. Forme

### Rayons

Organique **court**, pas pill everywhere.

| Token | Valeur | Usage |
| --- | --- | --- |
| `--radius-sm` | 6 px | chips, inputs, badges |
| `--radius-md` | 12 px | boutons, callouts |
| `--radius-lg` | 16 px | cards, dialog Plus |
| `--radius-full` | 999 px | dots stepper, avatars aucun |

Heatmap : `--radius-md` sur le cadre, **pas** sur le canvas (sinon les coins PPFD mentent).

### Ombres

Quasi plates. La profondeur = filet `--border` + 1 ombre courte.

```
--shadow-1: 0 1px 0 oklch(0.95 0.02 108 / 0.06), 0 8px 24px oklch(0.12 0.03 162 / 0.35);
--shadow-0: 0 0 0 1px var(--border);
```

Pas d’ombre sur le header (filet bas). Glow LED : `box-shadow: 0 0 16px oklch(0.95 0.02 230 / 0.35)` **uniquement** sur `.bar-overlay` de la heatmap.

### Spacing

Base **4 px**. N’inventer aucun 13 px.

```
--s-1: 0.25rem   /* 4  */
--s-2: 0.5rem    /* 8  */
--s-3: 0.75rem   /* 12 */
--s-4: 1rem      /* 16 */
--s-5: 1.5rem    /* 24 */
--s-6: 2rem      /* 32 */
--s-7: 3rem      /* 48 */
--s-8: 4rem      /* 64 */
```

Gouttière page : `--s-4` mobile, `--s-6` ≥ 720. Empilement sections : `--s-7`. Gap cards : `--s-3`.

### Breakpoints

Trois, **et trois seulement**. Pas de 640 / 768 / 1024 en plus.

| Nom | Largeur | Intention |
| --- | --- | --- |
| `phone` | **375** | Plancher magasin. Tout passe sans scroll X (sauf `TableScroll`). |
| `tablet` | **720** | 2 colonnes cards, header compact, bottom nav off. |
| `desktop` | **1100** | Header complet, assistant en 2 cols (stepper | contenu). |

Media : `min-width`. Mobile-first. Le CDC dit 320→1200 : on **teste** 320 (pas de casse), on **design** dès 375.

Conteneur : `width: min(1120px, calc(100% - 2 * var(--page-gutter)))`.

---

## 5. Motion

- Durée unique : **`--duration: 180ms`**. Easing : `cubic-bezier(0.2, 0.7, 0.2, 1)`.
- Ce qui bouge : hover filet, stepper, ouverture dialog, chips `is-active`, sticky CTA apparition.
- Ce qui **ne** bouge pas : heatmap (recalcul brut), accordéons hauteur auto (trop cheap).
- `prefers-reduced-motion: reduce` → `duration: 0.01ms`, pas d’animation, pas de glow pulsé. Les sliders restent des sliders.

Pas d’autoplay, pas de parallax, pas de compteur qui s’incrémente.

---

## 6. Composants

Classes **courtes**, pas de BEM à 4 niveaux. États : `.is-active`, `.is-disabled`, `.is-error`, `.is-ok`. `hidden` via attribut HTML `hidden` (le reset le gère).

### Header

Sticky desktop / compact tablet. Marque à gauche, nav au centre-droit, CTA à droite. Sur `assistant.html`, CTA = « Reprendre » si projet incomplet. `z-index: 40`. `padding-top: env(safe-area-inset-top)`.

### BottomNav

5 boutons `flex: 1`. Zone tactile **≥ 44 × 44**. Label 11 px / 0.68 rem, 1 ligne, pas de truncation « Assis… ». Item Plus = `<button>` ; les 4 autres = `<a>`. Fond `--bg-elevated`, filet haut. `z-index: 50`. Voir `mobile.md`.

### Card

Fond `--card`, radius `--radius-lg`, ombre `--shadow-0`. Padding `--s-4`. Titre Fraunces step-4 ou h3. Description `.muted`. Une card cliquable = `<a class="card">` ou `<button class="card">`, **jamais** div+onclick. Hover : filet `--primary`, pas de lift 8 px.

### Chip

`<button type="button" class="chip">`. Multi : `aria-pressed`. Unique (projet) : `role="radio"` dans un `role="radiogroup"`. Wrap obligatoire (`flex-wrap`). Hauteur min 40 px, padding 8 × 12. Actif : fond `--primary`, texte `--primary-fg`.

### Stepper

4 steps. Mobile : dots + « Étape 2/4 · Genres ». Desktop : labels. `ol` + `aria-current="step"` sur le `li` courant. Les steps non atteints ne sont pas des liens. Voir `a11y-security.md`.

### KitResult

Bloc résultat assistant. Anatomie **fixe** :

1. Kicker SKU (mono)
2. Titre kit (Fraunces)
3. Stats : W, PPF, €/an, hauteur (grille 2×2)
4. Liste d’achat (`ul`)
5. Warnings (`Callout` danger ou muted)
6. Cluster CTA : protocoles / print / Cosmorrow

### SpeciesCard

H3 genre, fourchette PPFD en gros (display), DLI, eau en une ligne, lien Diagnostic. Badge « tente OK » / « dormance ». Ancre `id` = id genre.

### ProtocolStep

`<dl>` : `dt` = phase (Jours 1–7), `dt` en mono uppercase primary, `dd` en corps. Une section protocole = `header` + liste de steps + callout signaux d’arrêt.

### Heatmap

Cadre `aspect-ratio` de la tente. Canvas + overlays SVG/HTML pour bacs et barres. **Toujours** un `#heatmap-stats` adjacent (texte) : min / moy / max / A / B. Légende forêt→ambre. Full-bleed mobile (voir `mobile.md`). Ne pas mettre de texte **dans** le canvas.

### TableScroll

Wrapper `.table-wrap` `overflow-x: auto; -webkit-overflow-scrolling: touch`. `<table>` + `<caption class="visually-hidden">` ou visible. `th` sticky top optionnel. Min-width table ~640 px, **pas** la page.

### Callout

Trois tons via modificateur : `.callout` (sphaigne, info), `.callout--warn` (ambre), `.callout--danger`. Première ligne `<strong>` = titre. Pas d’icône SVG obligatoire ; un filet gauche 3 px suffit.

### Checklist

`<ul class="checklist">` de `<label>` + `<input type="checkbox">`. État coché **non persisté** (ou alors dans `tourbiere.project.kit.check[]` si on a le temps). Print : cases vides. Zone tactile 44 px.

### DiagnosticTree

Une question visible à la fois. Deux / trois `<button>` réponses. Fil d’Ariane des réponses au-dessus (chips dismiss). Feuille = Card + liens. Pas de canvas, pas de mindmap.

### Footer

Une ligne sources + « pas de tracking » + lien À propos. Compact. `padding-bottom` **en plus** du bottom-nav sur mobile. Pas de réseau social.

---

## 7. Formulaires (assistant + outils)

- Tout **client-side**. Aucun `method="post"`. `form` + `preventDefault` pour Enter = Continuer.
- Labels **visibles**. Pas de placeholder-as-label.
- Sliders : track 44 px de haut (padding), `accent-color: var(--primary)`.
- Erreur : texte `--danger` lié par `aria-describedby`.
- Bouton primaire : `--primary` / `--primary-fg`. Secondaire : ghost, filet `--border`.

---

## 8. Do / Don’t (accroche murale)

**Do**

- Fond forêt, texte LED, un ambre pour l’argent et les urnes.
- SKU en mono, titres en Fraunces, UI en Figtree.
- Un CTA par écran.
- Fourchettes PPFD, jamais un dogme 300 µmol.

**Don’t**

- Violet, blurple, « RGB grow ».
- `innerHTML` de storage.
- Bottom nav + header liens en même temps.
- Scroll horizontal de **page**.
- Dark `#0a0a0a`.
