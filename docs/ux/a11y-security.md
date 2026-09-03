# Accessibilité & sécurité — Les Gloutonnes

Site **statique**, tout client-side. On ne « sécurise » pas un backend : on évite XSS, fuites, tracking, et on reste utilisable au pouce dans une serre.

Checklist à passer **page par page** avant done. Pas de score Lighthouse comme substitut.

---

## 1. Head (chaque HTML)

Copier le squelette `html-shell.html`. Ne jamais livrer une page sans :

| Item | Règle |
| --- | --- |
| `html lang="fr"` | Toujours `fr`. Pas de `lang` vide. |
| `charset utf-8` | Premier meta. |
| `viewport` | `width=device-width, initial-scale=1`. **Pas** `user-scalable=no`, **pas** `maximum-scale=1`. |
| `title` unique | Pattern `Tâche — Les Gloutonnes`. Accueil : `Tente carnivores + LED Cosmorrow — Les Gloutonnes`. Jamais deux pages le même title. |
| `meta name="description"` | 1 phrase, unique, ≤ 160 gl. Inclure Cosmorrow / carnivores / tente selon la page. |
| `theme-color` | `#243a32` (fond forêt). `media="(prefers-color-scheme: dark)"` optionnel, on est dark-only. |
| CSS | `css/tokens.css` puis `css/ui.css`. Chemins relatifs. |
| Fonts | preconnect + Google Fonts `display=swap`. Si on retire Google : supprimer preconnect **et** adapter la CSP. |
| `script` | `defer`, en bas de `body`, `src` relatif. **Zéro** handler inline (`onclick=`). |

Titres proposés :

| Fichier | `<title>` |
| --- | --- |
| `index.html` | Tente carnivores + LED Cosmorrow — Les Gloutonnes |
| `assistant.html` | Assistant kit Cosmorrow — Les Gloutonnes |
| `cosmorrow.html` | Barres et alims Cosmorrow — Les Gloutonnes |
| `especes.html` | PPFD par genre carnivore — Les Gloutonnes |
| `protocoles.html` | Protocoles semis à dormance — Les Gloutonnes |
| `tente.html` | Pose et hygro en tente — Les Gloutonnes |
| `nutriments.html` | Eau, tourbe, Maxsea — Les Gloutonnes |
| `outils.html` | PPFD, DLI, électricité — Les Gloutonnes |
| `diagnostic.html` | Diagnostic étiolement / brûlure — Les Gloutonnes |
| `a-propos.html` | Sources et méthode — Les Gloutonnes |

---

## 2. Focus, boutons, labels, ARIA

- **Focus visible** : `:focus-visible` anneau `--primary` (déjà dans les tokens). Ne pas `outline: none` sans remplacement.
- **Ordre** : skip link → header → main → bottom nav. Le sheet Plus se piège au clavier tant qu’il est ouvert (`<dialog>` natif le fait).
- **Boutons** : interaction sans navigation = `<button type="button">`. Submit wizard = `type="submit"` dans un `<form>`. Un `div` cliquable est un bug.
- **Liens** : changement d’URL = `<a href>`. CTA Assistant du header = lien vers `assistant.html`, pas un bouton cosmétique.
- **Labels** : tout `input`/`select`/`textarea` a un `<label for>` visible. Slider : le `<span>` « Hauteur 20 cm » est **dans** le label. `aria-label` seulement si le visible n’existe vraiment pas (icône bottom-nav : le texte « LED » est visible, donc pas d’aria-label en double).
- **Stepper** : `<ol aria-label="Étapes de l’assistant">`, `li` courant `aria-current="step"`. Dots : `aria-hidden="true"` si le label textuel « Étape 2/4 · Genres » est à côté.
- **Tabs** (Outils, Cosmorrow) : `role="tablist"` / `tab` / `tabpanel`, `aria-selected`, `aria-controls`, `id` jumelés. Flèches gauche/droite. Tab inactif : `tabindex="-1"`, actif `0`.
- **Chips multi** : `aria-pressed="true|false"`.
- **Chips projet (1 choix)** : `role="radiogroup"` + `role="radio"` + `aria-checked`.
- **Dialog Plus** : `<dialog>`, titre `id`, `aria-labelledby`. Bouton fermer en premier focusable.
- **Images** : décoratives `alt=""` + `aria-hidden` si SVG de fond. Informatif : alt qui dit la même chose que l’œil (pas « image1 »).

Contraste : palette dans `design-system.md`. Re-tester `--muted` sur `--card` (le plus juste). Si ça rate AA, monter `--muted` à `L=0.76`, ne pas griser plus.

Cibles : 44 × 44 px minimum (WCAG 2.2 AAA / Apple HIG). Chips et tabs inclus.

---

## 3. Tables

- Toujours `<div class="table-wrap" tabindex="0">` autour (focus pour scroller au clavier).
- `<table>` + `<caption>` (visible ou `.visually-hidden`).
- `<thead>` / `<th scope="col">`. Première colonne d’un tableau SKU : `scope="row"` si c’est le nom du setup.
- Ne jamais transformer une table en grid de divs « pour le mobile » : on swipe (voir `mobile.md`).
- Pas de `style="background:…"` inline pour la ligne active : classe `.is-active`.

---

## 4. Canvas heatmap

Le canvas est **décoratif** pour un lecteur d’écran. Pattern obligatoire :

```html
<div class="heatmap" role="img" aria-labelledby="heatmap-title heatmap-stats">
  <h3 id="heatmap-title">Carte PPFD au sommet du terreau</h3>
  <canvas id="heatmap" aria-hidden="true"></canvas>
  <p id="heatmap-stats">
    Moyenne bacs 210 µmol/m²/s. Bac A 205, bac B 215.
    Centre 240, min 90, max 310. Uniformité 43 %.
  </p>
</div>
```

À chaque `render()` : **mettre à jour le texte** de `#heatmap-stats` (textContent, pas innerHTML). Une légende HTML (0 / 150 / 250 / 400) reste hors canvas.

Si JS meurt : afficher un `<p>` noscript / fallback « Activez JavaScript pour la carte. Tableau comparatif ci-dessous. » + table déjà dans le DOM ou lien Cosmorrow.

---

## 5. XSS — jamais `innerHTML` avec data non échappée

Règle dure : **données** (SKU, storage, query string, labels genres) → `textContent` ou `escapeHtml` **puis** template.

Interdit :

- `el.innerHTML = lg.tente.project.…`
- `innerHTML` d’un `location.search`
- `innerHTML` d’un champ tarif kWh
- `eval`, `new Function`, `document.write`
- `javascript:` dans `href`

Le proto racine `app.js` **viole** cette règle (heatmap overlays, tables). Ne pas le recopier. Réécrire en `createElement` / `textContent`, ou échapper.

Fonction à coller dans `js/lib/escape.js` :

```js
/**
 * Échappe une chaîne pour insertion HTML.
 * N’utiliser que si un template string HTML est inévitable.
 * Préférer textContent / createElement.
 */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

Sans modules ES (file:// capricieux) : même fonction en IIFE globale `window.Lg.escapeHtml`.

Attributs : échapper **aussi** les quotes. Ne pas interpoler dans `style="left:${user}%"` sans `Number()` borné.

`innerHTML` acceptable **uniquement** pour des constantes **écrites dans le repo** (SVG de pose avec cotes déjà numériques). Dès qu’un `f.name` ou un id storage entre : escape.

---

## 6. Liens externes

Tout `target="_blank"` **exige** `rel="noopener noreferrer"`. Pas l’un sans l’autre.

Sources (Carnivero, Secret Jardin COP, Maxsea) : `_blank` + rel. Liens internes : **pas** de `_blank`.

Icône « sortie » en CSS, `span.visually-hidden` « (nouvelle fenêtre) » sur le premier lien externe d’un bloc, ou `aria-label` sur chaque lien externe.

---

## 7. Tracking, analytics, handlers

- **Pas** de Google Analytics, Plausible, Matomo, pixels, fonts qui trackent hors Google Fonts.
- **Pas** de cookies.
- **Pas** de `onclick=""` / `onsubmit=""` / `onerror=` dans le HTML.
- Écouteurs : `addEventListener` dans les JS.
- `referrerpolicy="no-referrer"` sur les liens externes si on veut être parano (option, pas must).

---

## 8. CSP (statique)

Meta **raisonnable** pour pages file/http sans backend. À coller dans le head (voir shell).

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self';
    base-uri 'self';
    form-action 'none';
    frame-ancestors 'none';
    object-src 'none';
    script-src 'self';
    style-src 'self' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data:;
    connect-src 'self';
    upgrade-insecure-requests"
/>
```

Notes d’opinion :

- **Pas** de `'unsafe-inline'` sur `script-src`. Donc : **aucun** script inline, **aucun** `javascript:` , et la CSP meta elle-même ne bloque pas les CSS fichiers.
- `style-src` **sans** `'unsafe-inline'` : **interdire** les `style="left:…"` générés. Positionner heatmap overlays via **custom properties** (`el.style.setProperty('--x', '12%')` compte comme inline style → **cassé** par cette CSP).

**Décision :** la heatmap a besoin de positions dynamiques. Deux options, choisir **A** :

**A (recommandé).** Garder la CSP stricte sur les scripts, et assouplir les styles :

```
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
```

`'unsafe-inline'` **styles** = overlays canvas + Google Fonts. Pas idéal, acceptable en static sans auth. Ne **jamais** assouplir `script-src`.

**B.** Overlays en SVG interne + attributs `x`/`width` via DOM, zéro `style=""`. Alors on peut rester sans unsafe-inline. Plus de boulot, plus propre.

`img-src data:` : légendes éventuelles, **pas** pour du HTML base64.

Si on droppe Google Fonts : retirer `fonts.googleapis.com` / `fonts.gstatic.com`.

`form-action 'none'` : aucun POST. Les `<form>` JS restent du DOM, ils n’envoient rien. Fermeture du sheet Plus : `HTMLDialogElement.close()`, pas `method="dialog"`.

---

## 9. localStorage quota

```js
const KEYS = {
  project: "lg.tente.project",
  prefs: "lg.tente.prefs",
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return fallback;
    return data;
  } catch (err) {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    // QuotaExceededError, SecurityError (iframe, privé strict)
    return false;
  }
}
```

Si `writeJson` → `false` : callout muted « Mémoire pleine ou privée : le kit reste sur cet écran seulement. » L’app **continue**. Ne pas alert().

Ne stocker que le JSON documenté dans `IA.md`. Pas de dumps de grille PPFD (trop gros).

---

## 10. Formulaires

- Aucun `method="post"`, aucun `action` vers un serveur. `action="#"` interdit (scroll jump). `action="javascript:…"` interdit.
- `<form id="assistant-form">` + `submit` → `preventDefault` → step suivant. Pas de `method="dialog"` (CSP `form-action 'none'` : fermer `#plus-sheet` avec `dialog.close()`).
- Outils : pas besoin de form global ; inputs `input` + listeners.
- Pas de captcha, pas d’email required, pas de mot de passe.
- `autocomplete="off"` sur les cotes custom (évite les adresses postales dans « longueur cm »).

---

## 11. `target="_blank"` + `rel`

Rappel court, parce qu’on oublie :

```html
<a href="https://www.secretjardin.com/…" target="_blank" rel="noopener noreferrer">Fiche COP 2023-09</a>
```

`noopener` : pas d’accès `window.opener`. `noreferrer` : pas de fuite de chemin local/`file://` vers Secret Jardin.

---

## 12. Secrets

- **Aucun** secret dans le repo : pas d’API key, pas de token Stripe, pas de `.env`.
- Tarif kWh = préférence utilisateur, pas une clé.
- Pas de webhook, pas de backend : rien à cacher, donc rien à commiter « pour plus tard ».
- `mailto:` éventuel en clair (adresse publique) — OK.
- Ne pas committer de dumps `localStorage` ni de captures avec des données perso.

---

## 13. Autres

- `prefers-reduced-motion` : tokens déjà à `0.01ms`. Pas d’animation canvas.
- Langue des nombres : `Intl.NumberFormat("fr-FR")`, `Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" })`.
- Heure / dates : ISO en storage, affichage `fr-FR`.
- Print : `@media print` cache header, bottom-nav, CTA ; montre `#kit-print`. Voir `wire-assistant.md`.
- Tests manuels : clavier only, zoom 200 %, 320 px, VoiceOver/TalkBack sur Assistant step 1→résultat.
