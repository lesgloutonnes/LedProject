#!/usr/bin/env python3
"""Génère les 10 pages HTML Les Gloutonnes à partir du shell UX."""
from pathlib import Path

HEAD = """<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <meta name="theme-color" content="#243a32" />
    <meta name="color-scheme" content="dark" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; upgrade-insecure-requests"
    />
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
      rel="stylesheet"
      referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="css/tokens.css" />
    <link rel="stylesheet" href="css/ui.css" />
  </head>
  <body data-page="{page}">
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    <header class="site-header">
      <div class="wrap">
        <a class="brand" href="index.html">
          <span class="brand-kicker">Les Gloutonnes</span>
          <span class="brand-name">Tente &amp; LED</span>
        </a>
        <nav class="nav-primary" aria-label="Principale">
          <a class="nav-wide" href="index.html">Accueil</a>
          <a href="assistant.html">Assistant</a>
          <a href="cosmorrow.html">Cosmorrow</a>
          <a href="especes.html">Espèces</a>
          <a class="nav-wide" href="protocoles.html">Protocoles</a>
          <details class="nav-more">
            <summary>Plus</summary>
            <ul>
              <li><a href="protocoles.html">Protocoles</a></li>
              <li><a href="tente.html">Tente</a></li>
              <li><a href="nutriments.html">Nutriments</a></li>
              <li><a href="outils.html">Outils</a></li>
              <li><a href="diagnostic.html">Diagnostic</a></li>
              <li><a href="a-propos.html">À propos</a></li>
              <li><a href="https://www.lesgloutonnes.be/pages/applications-culture.html" rel="noopener noreferrer">Toutes les applications</a></li>
            </ul>
          </details>
        </nav>
        <a class="btn-primary header-cta" href="assistant.html">Lancer l’assistant</a>
      </div>
    </header>
    <p id="store-warn" class="callout is-warn wrap store-warn" hidden role="status">Mémoire pleine ou privée : le kit reste sur cet écran seulement.</p>
    <main id="contenu" class="page-main wrap">
{main}
    </main>
{sticky}
    <footer class="site-footer wrap">
      <p>
        <a href="https://www.lesgloutonnes.be/pages/applications-culture.html" rel="noopener noreferrer">Applications de culture</a>
        · Les Gloutonnes · Cosmorrow ·
        <a href="a-propos.html">Sources</a>
        · <a href="https://www.lesgloutonnes.be/" rel="noopener noreferrer">lesgloutonnes.be</a>
      </p>
    </footer>
    <nav class="bottom-nav" aria-label="Pied">
      <a href="index.html" data-icon="home"><span class="bottom-nav-icon" aria-hidden="true"></span>Accueil</a>
      <a href="assistant.html" data-icon="wiz"><span class="bottom-nav-icon" aria-hidden="true"></span>Assistant</a>
      <a href="cosmorrow.html" data-icon="led"><span class="bottom-nav-icon" aria-hidden="true"></span>LED</a>
      <a href="especes.html" data-icon="leaf"><span class="bottom-nav-icon" aria-hidden="true"></span>Espèces</a>
      <button type="button" id="plus-open" data-icon="more" aria-haspopup="dialog" aria-controls="plus-sheet" aria-expanded="false">
        <span class="bottom-nav-icon" aria-hidden="true"></span>Plus
      </button>
    </nav>
    <dialog id="plus-sheet" aria-labelledby="plus-title">
      <button type="button" class="plus-close" id="plus-close">Fermer</button>
      <h2 id="plus-title">Plus</h2>
      <nav aria-label="Secondaire">
        <ul>
          <li><a href="protocoles.html">Protocoles</a></li>
          <li><a href="tente.html">Tente</a></li>
          <li><a href="nutriments.html">Nutriments</a></li>
          <li><a href="outils.html">Outils</a></li>
          <li><a href="diagnostic.html">Diagnostic</a></li>
          <li><a href="a-propos.html">À propos</a></li>
          <li><a href="https://www.lesgloutonnes.be/pages/applications-culture.html" rel="noopener noreferrer">Toutes les applications</a></li>
        </ul>
      </nav>
    </dialog>
{scripts}
  </body>
</html>
"""

LIBS = """
    <script src="js/lib/escape.js" defer></script>
    <script src="js/lib/storage.js" defer></script>
    <script src="js/lib/format.js" defer></script>
    <script src="js/lib/print.js" defer></script>
    <script src="js/nav.js" defer></script>
"""

DATA_CORE = """
    <script src="js/data/projects.js" defer></script>
    <script src="js/data/fixtures.js" defer></script>
    <script src="js/data/psus.js" defer></script>
    <script src="js/data/tents.js" defer></script>
    <script src="js/data/kits.js" defer></script>
    <script src="js/lib/match.js" defer></script>
"""

STICKY = '    <a class="cta-sticky" href="assistant.html">Lancer l’assistant</a>\n'


def page(name, title, description, main, scripts, sticky=False):
    slug = "index" if name == "index.html" else name.replace(".html", "")
    html = HEAD.format(
        title=title,
        description=description,
        page=slug,
        main=main.rstrip() + "\n",
        sticky=STICKY if sticky else "",
        scripts=LIBS + scripts,
    )
    Path("/workspace/" + name).write_text(html, encoding="utf-8")
    print("wrote", name, "bytes", len(html.encode()))


page(
    "index.html",
    "Guide de culture en tente | Les Gloutonnes",
    "Application Les Gloutonnes : installer une tente de carnivores sous LED Cosmorrow — kits, PPFD, protocoles. Gratuit.",
    """
      <header class="page-hero stack">
        <p class="kicker">Application de culture</p>
        <h1>Guide de culture en tente</h1>
        <p class="lede">
          Un outil Les Gloutonnes, comme les guides Cephalotus, Darlingtonia et Nepenthes :
          installer ta tente sous LED Cosmorrow — semis, bouturage, production, tropicale ou dormance.
        </p>
        <p class="btn-row">
          <a class="btn-primary" href="assistant.html">Lancer l’assistant</a>
          <a class="btn-ghost" href="cosmorrow.html">Voir la gamme Cosmorrow</a>
        </p>
        <p class="hint">
          Dans les
          <a href="https://www.lesgloutonnes.be/pages/applications-culture.html" rel="noopener noreferrer">applications de culture</a>
          : Cephalotus · Darlingtonia · Nepenthes · <strong>tente &amp; LED</strong>
        </p>
      </header>

      <section class="section" aria-label="Trois chemins">
        <div class="path-grid">
          <a class="card path-card" href="assistant.html">
            <p class="kicker">Par où commencer</p>
            <h2>Assistant</h2>
            <p>Quatre questions. Un kit Cosmorrow, une liste d’achat, un protocole.</p>
            <span class="go">Configurer ma tente →</span>
          </a>
          <a class="card path-card" href="cosmorrow.html">
            <p class="kicker">Quelle barre, quelle alim</p>
            <h2>LED Cosmorrow</h2>
            <p>Growing 6500 K, Full Spectrum, alims 24 V. Jamais 20 W et 40 W sur la même prise.</p>
            <span class="go">Catalogue constructeur →</span>
          </a>
          <a class="card path-card" href="especes.html">
            <p class="kicker">Ça s’étire / ça grille</p>
            <h2>Espèces</h2>
            <p>PPFD, DLI, eau et tente par genre — Dionaea, Sarracenia, Drosera, Nepenthes…</p>
            <span class="go">Fiches carnivores →</span>
          </a>
        </div>
      </section>

      <section class="section">
        <h2>Sept métiers en tente</h2>
        <p class="hint">Pas un curseur unique. Un protocole par job.</p>
        <div class="chips mt-s4">
          <a class="chip" href="protocoles.html#germoir">Germoir</a>
          <a class="chip" href="protocoles.html#bouturage">Bouturage</a>
          <a class="chip" href="protocoles.html#collection">Collection</a>
          <a class="chip" href="protocoles.html#rouge">Colorisation</a>
          <a class="chip" href="protocoles.html#mixte">Mixte</a>
          <a class="chip" href="protocoles.html#tropicale">Tropicale</a>
          <a class="chip" href="protocoles.html#dormance">Dormance</a>
        </div>
      </section>

      <section class="section">
        <article class="card">
          <h2>Kit signature</h2>
          <p>Tente 120 × 60, deux bacs 60 × 40, <strong>2 × Cosmorrow Growing 90 cm (COP4065) + COM2X40</strong>. 80 W, 202 µmol/s, blanc 6500 K, IP65, ~130–145 €. C’est le kit Les Gloutonnes.</p>
          <p class="btn-row mt-s4">
            <a class="btn-primary" href="cosmorrow.html#kit-germoir-120x60">Détail du kit</a>
            <a class="btn-ghost" href="outils.html?kit=kit-germoir-120x60">Carte PPFD</a>
          </p>
        </article>
      </section>

      <section class="section">
        <h2>Ce que cet outil refuse</h2>
        <div class="card-grid">
          <article class="card"><h3>Le blurple Amazon</h3><p>Sans PPF publié, ce n’est pas une fiche, c’est un listing. Cosmorrow publie µmol/s et µmol/J.</p></article>
          <article class="card"><h3>Le 660 nm magique</h3><p>Le rouge des Sarracenia suit le DLI et le génotype. Growing 6500 K compacte mieux un germoir qu’un spectre floraison.</p></article>
          <article class="card"><h3>L’engrais « plantes vertes »</h3><p>Terreau fertilisé et Miracle-Gro tuent les racines. Foliar 0,3 g/L d’un orchidée propre, eau osmose, tourbe blonde non amendée.</p></article>
          <article class="card"><h3>La tente chaude toute l’année pour une dionée</h3><p>Dormance 3–4 mois, 0–10 °C. En FR/BE le dehors / garage gagne. La LED ne fait pas le froid.</p></article>
        </div>
      </section>
""",
    "",
    sticky=True,
)

page(
    "assistant.html",
    "Assistant kit Cosmorrow | Les Gloutonnes",
    "Configure ta tente de carnivores : projet, genres, surface, contraintes. Un kit Secret Jardin Cosmorrow en quatre questions.",
    """
      <noscript class="callout is-warn"><p>L’assistant a besoin de JavaScript. Le catalogue est sur <a href="cosmorrow.html">Cosmorrow</a>.</p></noscript>
      <div id="assistant-app" class="stack"></div>
""",
    DATA_CORE
    + """
    <script src="js/pages/assistant.js" defer></script>
""",
)

page(
    "cosmorrow.html",
    "Barres et alims Cosmorrow | Les Gloutonnes",
    "Gamme Secret Jardin Cosmorrow pour carnivores : COP2065, COP4065, Full Spectrum, alims 24 V, kits par tente.",
    """
      <header class="page-hero stack">
        <p class="kicker">Secret Jardin · 24 V · IP65</p>
        <h1>Cosmorrow, et seulement Cosmorrow.</h1>
        <p class="lede">Blanc 6500 K pour germer, Full Spectrum en appoint, alims calibrées 20 W ou 40 W. PPF publié, zone constructeur, pas un PAR 230 de boutique.</p>
      </header>
      <noscript class="callout is-warn"><p>Activez JavaScript pour le tableau SKU et les kits. Les règles d’or restent lisibles ci-dessus.</p></noscript>
      <section class="section">
        <h2>Règles d’or</h2>
        <div class="card-grid">
          <article class="card"><h3>Jamais 20 W + 40 W</h3><p>Port calibré. Growing et FS de même wattage : OK. COP2065 sur COM2X40 : non.</p></article>
          <article class="card"><h3>COP40FS ≠ COP4065</h3><p>70 cm vs 87 cm. Même alim 40 W, pas la même pièce, pas la même hauteur (20 cm vs 15 cm).</p></article>
          <article class="card"><h3>Alim hors tente</h3><p>Splash + extracteur. Les barres IP65 restent dedans, le driver dehors.</p></article>
          <article class="card"><h3>Pas dimmable</h3><p>Programmateur ON/OFF. On « dimme » en montant la barre de 5 cm.</p></article>
        </div>
      </section>
      <section class="section">
        <h2>Unités lumineuses</h2>
        <p class="hint">On dimensionne en PPF, PPFD et DLI. Les lumens, le « PAR 230 » et les watts marketing restent au vestiaire.</p>
        <div class="card-grid" id="units-glossary"></div>
      </section>
      <section class="section">
        <h2>Spectres Growing vs Full Spectrum</h2>
        <p class="hint">660 nm = rouge PAR. Cosmorrow n’émet pas de far-red 730 nm. Le germoir reste en 6500 K.</p>
        <div class="card-grid dense" id="spectrum-compare"></div>
      </section>
      <section class="section">
        <h2>Barres</h2>
        <div id="sku-table"></div>
        <div class="card-grid dense mt-s5" id="fixture-cards"></div>
      </section>
      <section class="section">
        <h2>Alimentations</h2>
        <div class="card-grid" id="psu-list"></div>
      </section>
      <section class="section">
        <h2>Kits par tente</h2>
        <p class="hint">Prix 2025–2026 growshop FR/BE, barres + alim + programmateur, hors tente. Fourchettes.</p>
        <div class="stack mt-s4" id="kit-list"></div>
      </section>
""",
    DATA_CORE
    + """
    <script src="js/pages/cosmorrow.js" defer></script>
""",
)

page(
    "especes.html",
    "PPFD par genre carnivore | Les Gloutonnes",
    "Cibles PPFD, DLI, eau et tente pour Dionaea, Sarracenia, Drosera, Nepenthes et les autres carnivores sous Cosmorrow.",
    """
      <header class="page-hero stack">
        <p class="kicker">Carnivero / Florawave · fourchettes</p>
        <h1>Chaque genre a sa fenêtre de photons.</h1>
        <p class="lede">On vise d’abord le bas-milieu de fourchette (PPFD en µmol/m²/s, DLI en mol/m²/j), puis on monte selon la plante — pas selon un listing 660 nm. Growing 6500 K est la barre de travail.</p>
      </header>
      <div class="chips mt-s5" id="species-filter"></div>
      <noscript class="callout is-warn"><p>Activez JavaScript pour les fiches genres. Cibles PPFD : voir Carnivero.</p></noscript>
      <div class="stack stack-loose" id="species-list"></div>
""",
    """
    <script src="js/data/species.js" defer></script>
    <script src="js/pages/especes.js" defer></script>
""",
)

page(
    "protocoles.html",
    "Protocoles semis à dormance | Les Gloutonnes",
    "Sept protocoles de tente carnivore sous Cosmorrow : germoir, bouturage, production, colorisation, mixte, tropicale, dormance.",
    """
      <header class="page-hero stack">
        <p class="kicker">Métiers de tente</p>
        <h1>Un protocole par job, pas un curseur unique.</h1>
        <p class="lede">Semis, boutures, adultes, rouge, étages, jungle ou hiver : la même Cosmorrow, des hauteurs et des heures différentes. La dormance des tempérées se joue au froid, pas au spectre.</p>
      </header>
      <noscript class="callout is-warn"><p>Activez JavaScript pour les protocoles. Le CDC est dans le README.</p></noscript>
      <nav class="anchor-nav" id="protocol-nav" aria-label="Protocoles"></nav>
      <div id="protocol-list"></div>
      <section class="section">
        <h2>Calendrier FR / BE</h2>
        <p class="hint">Hémisphère nord. Les tropicales ignorent ce rythme : 12–14 h toute l’année, tente à part.</p>
        <div class="month-grid mt-s4" id="calendar"></div>
      </section>
""",
    DATA_CORE
    + """
    <script src="js/data/protocols.js" defer></script>
    <script src="js/data/calendar.js" defer></script>
    <script src="js/pages/protocoles.js" defer></script>
""",
)

page(
    "tente.html",
    "Pose et hygro en tente | Les Gloutonnes",
    "Monter une tente carnivores : cotes, extracteur, hygrométrie, plan de pose Cosmorrow, électricité 230 V.",
    """
      <header class="page-hero stack">
        <p class="kicker">Mylar, 230 V, 24 V</p>
        <h1>La tente n’est pas un placard. C’est un climat.</h1>
        <p class="lede">Deux bacs 60 × 40 dans 120 × 60. Barres parallèles au grand côté. Alim dehors. Extracteur plus doux qu’en cannabis.</p>
      </header>
      <section class="section">
        <h2>Plan de pose signature</h2>
        <article class="card">
          <div id="pose-svg"></div>
          <p class="hint">2 × COP4065 sur la profondeur, bacs A/B 60 × 40, 10 cm de marge. Jamais bout à bout sur 60 cm.</p>
        </article>
      </section>
      <section class="section">
        <h2>Règles de pose</h2>
        <div class="card-grid" id="install-rules"></div>
      </section>
      <section class="section">
        <h2>Checklist montage</h2>
        <ol class="check-list" id="install-check"></ol>
      </section>
      <section class="section">
        <h2>Accroche et hauteurs</h2>
        <article class="card" id="hanging"></article>
      </section>
      <section class="section">
        <h2>Climat</h2>
        <article class="card" id="climate"></article>
      </section>
      <section class="section">
        <h2>Électricité</h2>
        <article class="card" id="electricity"></article>
      </section>
      <section class="section">
        <h2>Catalogue de tentes</h2>
        <div class="stack" id="tent-catalog"></div>
      </section>
""",
    """
    <script src="js/data/tents.js" defer></script>
    <script src="js/data/install.js" defer></script>
    <script src="js/pages/tente.js" defer></script>
""",
)

page(
    "nutriments.html",
    "Eau, tourbe, foliar 0,3 g/L | Les Gloutonnes",
    "Eau osmose ou pluie, tourbe blonde non amendée, foliar 0,3 g/L (orchidée ¼ ou Maxsea), proies 1–2 fois par mois. Pas de Miracle-Gro.",
    """
      <header class="page-hero stack">
        <p class="kicker">TDS &lt; 50 ppm · 0,3 g/L</p>
        <h1>L’eau pauvre n’est pas négociable.</h1>
        <p class="lede">Osmose, pluie, distillée, ZeroWater. Brita ne suffit pas. La tourbe de rayon est souvent chaulée. Le foliar, c’est 0,3 g/L d’un orchidée propre — Maxsea n’est qu’une recette US du même ordre.</p>
      </header>
      <section class="section">
        <h2>Eau autorisée</h2>
        <div class="card-grid" id="water-ok"></div>
      </section>
      <section class="section">
        <h2>Eau interdite</h2>
        <div class="card-grid" id="water-no"></div>
        <ul class="check-list mt-s4" id="water-practice"></ul>
      </section>
      <section class="section">
        <h2>Substrats</h2>
        <div class="stack" id="substrates"></div>
      </section>
      <section class="section">
        <h2>Engrais</h2>
        <div class="stack" id="fertilizers"></div>
      </section>
      <section class="section">
        <h2>Proies</h2>
        <article class="card" id="feeding"></article>
      </section>
      <section class="section">
        <h2>Ravageurs</h2>
        <article class="card stack" id="pests"></article>
      </section>
""",
    """
    <script src="js/data/nutrients.js" defer></script>
    <script src="js/pages/nutriments.js" defer></script>
""",
)

page(
    "outils.html",
    "PPFD, DLI, électricité | Les Gloutonnes",
    "Simulateur PPFD Cosmorrow, DLI et coût électrique pour tente de carnivores. Modèle optique prudent, pas un PAR-mètre.",
    """
      <header class="page-hero stack">
        <p class="kicker">Lambertien 120° · mylar 0,25 · calé fiche COP</p>
        <h1>Comparer des kits, pas certifier un DLI.</h1>
        <p class="lede">Carte PPFD simplifiée pour Cosmorrow seulement. Cosmorrow n’est pas dimmable : le curseur d’intensité simule un voile, pas un Controller+.</p>
      </header>
      <noscript class="callout is-warn"><p>Activez JavaScript pour la carte PPFD. Catalogue : <a href="cosmorrow.html">Cosmorrow</a>.</p></noscript>
      <div class="sim-layout section">
        <article class="card heatmap-bleed">
          <div class="heatmap" role="img" aria-labelledby="heatmap-title heatmap-stats">
            <h2 id="heatmap-title">Carte PPFD au sommet du terreau</h2>
            <div class="heatmap-frame">
              <canvas id="heatmap" aria-hidden="true"></canvas>
              <div id="trays"></div>
              <div id="bars"></div>
            </div>
            <p id="heatmap-stats"></p>
            <div class="legend-bar" aria-hidden="true"></div>
            <div class="legend-ticks"><span>0</span><span>150</span><span>250</span><span>400</span><span>550</span></div>
            <p class="legend-unit">PPFD · µmol/m²/s</p>
          </div>
        </article>
        <div class="stack">
          <article class="card">
            <h3>Réglages</h3>
            <label for="kit-select">Kit
              <select id="kit-select"></select>
            </label>
            <label for="tent-select">Tente
              <select id="tent-select"></select>
            </label>
            <label class="slider" for="height">
              <span>Hauteur <strong id="height-val">20 cm</strong></span>
              <input id="height" type="range" min="12" max="50" value="20" />
            </label>
            <label class="slider" for="hours">
              <span>Photopériode <strong id="hours-val">14 h</strong></span>
              <input id="hours" type="range" min="8" max="18" value="14" />
            </label>
            <label class="slider" for="intensity">
              <span>Intensité <strong id="intensity-val">100 %</strong></span>
              <input id="intensity" type="range" min="40" max="100" value="100" />
            </label>
            <p id="dim-warn" class="dim-warn" hidden>Cosmorrow n’est pas dimmable. Ce curseur simule un voile, pas un Controller+.</p>
            <label for="kwh-eur">Tarif € / kWh
              <input id="kwh-eur" type="number" inputmode="decimal" step="0.0001" min="0.05" max="0.80" autocomplete="off" />
            </label>
          </article>
          <div id="stats" class="stats"></div>
          <div id="sim-note" class="callout"></div>
        </div>
      </div>
""",
    DATA_CORE
    + """
    <script src="js/lib/optics.js" defer></script>
    <script src="js/pages/outils.js" defer></script>
""",
)

page(
    "diagnostic.html",
    "Diagnostic étiolement / brûlure | Les Gloutonnes",
    "Arbre de décisions : étiolement, brûlure, mucilage, urnes, pourriture, algues, sciarides, ravageurs, dormance manquée, rouge, semis, boutures.",
    """
      <header class="page-hero stack">
        <p class="kicker">Une question à la fois</p>
        <h1>Ce n’est presque jamais une maladie magique.</h1>
        <p class="lede" id="diag-intro"></p>
      </header>
      <noscript class="callout is-warn"><p>Activez JavaScript pour l’arbre de décisions. Protocoles : <a href="protocoles.html">ici</a>.</p></noscript>
      <div class="choice-grid tree-pick section" id="tree-pick"></div>
      <div id="tree-panel" class="section"></div>
""",
    """
    <script src="js/data/diagnostic.js" defer></script>
    <script src="js/pages/diagnostic.js" defer></script>
""",
)

page(
    "a-propos.html",
    "Sources et méthode | Les Gloutonnes",
    "Méthode Les Gloutonnes : Cosmorrow only, PPFD Carnivero, fiche Secret Jardin 2023-09, foliar 0,3 g/L. Pas de tracking.",
    """
      <header class="page-hero stack">
        <p class="kicker">Les Gloutonnes</p>
        <h1>Un labo de tente, pas un growshop.</h1>
        <p class="lede">Cet outil aide à installer des carnivores sous LED Cosmorrow. Fourchettes, sources, prudence. Pas de compte, pas de cookies, pas de pub.</p>
      </header>
      <section class="section prose">
        <h2>Pourquoi Cosmorrow</h2>
        <p>Secret Jardin (Belgique) publie un PPF en µmol/s, un PPE en µmol/J, une zone, un IP65, du 24 V et du 230 V livrable en FR/BE. Growing 6500 K est le spectre de germoir. Le Full Spectrum est un appoint. On ne tient plus de palmarès multi-marques : le site est un compagnon de pose, pas un comparateur.</p>
        <h2>Unités</h2>
        <p>PPF en µmol/s, PPFD en µmol/m²/s, PPE en µmol/J, DLI en mol/m²/j. La fiche Cosmorrow écrit le PPFD en µmol/s/m² : même grandeur, on normalise. PAR est une bande (400–700 nm), pas un nombre. Le 660 nm du Full Spectrum est du rouge PAR, pas du far-red 730 nm.</p>
        <h2>Sources</h2>
        <ul>
          <li><a href="https://www.secretjardin.com/wp-content/uploads/2023/09/20230905-COP-BULBS-DATASHEET.pdf" rel="noopener noreferrer" target="_blank" referrerpolicy="no-referrer">Fiche Cosmorrow COP BULBS 2023-09</a> (Secret Jardin)</li>
          <li><a href="https://www.secretjardin.com/bulbs-power-supplies/" rel="noopener noreferrer" target="_blank" referrerpolicy="no-referrer">Barres et alims Cosmorrow</a></li>
          <li><a href="https://www.carnivero.com/pages/grow-light-ppfd-recommendations" rel="noopener noreferrer" target="_blank" referrerpolicy="no-referrer">PPFD par genre — Carnivero / Florawave</a></li>
          <li>Adamec, L. (1997). Mineral nutrition of carnivorous plants. <em>Botanical Review</em> 63.</li>
          <li>Foliar 0,3 g/L : orchidée ¼ (FR/BE) ; Maxsea 16-16-16 = recette California Carnivores équivalente, pas un sésame d’import.</li>
        </ul>
        <h2>Limites</h2>
        <p>Le simulateur est un modèle lambertien 120° + rebond mylar forfaitaire. Ce n’est pas un PAR-mètre. Les prix sont des fourchettes growshop. Les cibles PPFD sont des fourchettes d’expérience, pas une ordonnance.</p>
        <h2>Vie privée</h2>
        <p>Aucune mesure d’audience. Tes projets restent dans <code>localStorage</code> (<code>lg.tente.project</code>, <code>lg.tente.prefs</code>). Tu peux tout effacer dans les outils du navigateur.</p>
      </section>
""",
    "",
)

print("done")
