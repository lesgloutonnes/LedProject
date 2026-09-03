#!/usr/bin/env python3
"""Génère les 10 pages HTML Tourbière à partir du shell UX."""
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
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
    />
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap"
      rel="stylesheet"
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
          <span class="brand-name">Tourbière</span>
        </a>
        <nav class="nav-primary" aria-label="Principale">
          <a href="index.html">Accueil</a>
          <a href="assistant.html">Assistant</a>
          <a href="cosmorrow.html">Cosmorrow</a>
          <a href="especes.html">Espèces</a>
          <a href="protocoles.html">Protocoles</a>
          <details class="nav-more">
            <summary>Plus</summary>
            <ul>
              <li><a href="tente.html">Tente</a></li>
              <li><a href="nutriments.html">Nutriments</a></li>
              <li><a href="outils.html">Outils</a></li>
              <li><a href="diagnostic.html">Diagnostic</a></li>
              <li><a href="a-propos.html">À propos</a></li>
            </ul>
          </details>
        </nav>
        <a class="btn-primary header-cta" href="assistant.html">Lancer l’assistant</a>
      </div>
    </header>
    <main id="contenu" class="page-main wrap">
{main}
    </main>
{sticky}
    <footer class="site-footer wrap">
      <p>
        Les Gloutonnes · Tourbière · Cosmorrow (Secret Jardin) · pas de tracking ·
        <a href="a-propos.html">Sources</a>
      </p>
    </footer>
    <nav class="bottom-nav" aria-label="Pied">
      <a href="index.html" data-icon="home"><span class="bottom-nav-icon" aria-hidden="true"></span>Accueil</a>
      <a href="assistant.html" data-icon="wiz"><span class="bottom-nav-icon" aria-hidden="true"></span>Assistant</a>
      <a href="cosmorrow.html" data-icon="led"><span class="bottom-nav-icon" aria-hidden="true"></span>LED</a>
      <a href="especes.html" data-icon="leaf"><span class="bottom-nav-icon" aria-hidden="true"></span>Espèces</a>
      <button type="button" id="plus-open" data-icon="more" aria-haspopup="dialog" aria-controls="plus-sheet">
        <span class="bottom-nav-icon" aria-hidden="true"></span>Plus
      </button>
    </nav>
    <dialog id="plus-sheet" aria-labelledby="plus-title">
      <h2 id="plus-title">Plus</h2>
      <button type="button" class="plus-close" id="plus-close">Fermer</button>
      <nav aria-label="Secondaire">
        <ul>
          <li><a href="protocoles.html">Protocoles</a></li>
          <li><a href="tente.html">Tente</a></li>
          <li><a href="nutriments.html">Nutriments</a></li>
          <li><a href="outils.html">Outils</a></li>
          <li><a href="diagnostic.html">Diagnostic</a></li>
          <li><a href="a-propos.html">À propos</a></li>
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
    "Tente carnivores + LED Cosmorrow — Les Gloutonnes · Tourbière",
    "Mettre en place une tente de carnivores sous LED Secret Jardin Cosmorrow : assistant kit, PPFD, protocoles. Les Gloutonnes · Tourbière.",
    """
      <header class="page-hero stack">
        <p class="kicker">Les Gloutonnes · Tourbière</p>
        <h1>Une tente, des Cosmorrow, un protocole.</h1>
        <p class="lede">
          Le site de référence pour installer une culture de plantes carnivores sous LED
          Secret Jardin Cosmorrow — semis, bouturage, production, tropicale ou dormance.
        </p>
        <p class="btn-row">
          <a class="btn-primary" href="assistant.html">Lancer l’assistant</a>
          <a class="btn-ghost" href="cosmorrow.html">Voir la gamme Cosmorrow</a>
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
        <div class="chips" style="margin-top:1rem">
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
          <p>Tente 120 × 60, deux bacs 60 × 40, <strong>2 × Cosmorrow Growing 90 cm (COP4065) + COM2X40</strong>. 80 W, 202 µmol/s, blanc 6500 K, IP65, ~130–145 €. C’est le panier Tourbière.</p>
          <p class="btn-row" style="margin-top:1rem">
            <a class="btn-primary" href="cosmorrow.html#kit-germoir-120x60">Détail du kit</a>
            <a class="btn-ghost" href="outils.html?kit=kit-germoir-120x60">Carte PPFD</a>
          </p>
        </article>
      </section>

      <section class="section">
        <h2>Ce que Tourbière refuse</h2>
        <div class="card-grid">
          <article class="card"><h3>Le blurple Amazon</h3><p>Sans PPF publié, ce n’est pas une fiche, c’est un listing. Cosmorrow publie µmol/s et µmol/J.</p></article>
          <article class="card"><h3>Le 660 nm magique</h3><p>Le rouge des Sarracenia suit le DLI et le génotype. Growing 6500 K compacte mieux un germoir qu’un spectre floraison.</p></article>
          <article class="card"><h3>L’engrais « plantes vertes »</h3><p>Terreau fertilisé et Miracle-Gro tuent les racines. Maxsea ¼ en foliar, eau osmose, tourbe blonde.</p></article>
          <article class="card"><h3>La tente chaude toute l’année pour une dionée</h3><p>Dormance 3–4 mois, 5–10 °C, 8–10 h. La LED ne fait pas le froid.</p></article>
        </div>
      </section>
""",
    "",
    sticky=True,
)

page(
    "assistant.html",
    "Assistant kit Cosmorrow — Les Gloutonnes · Tourbière",
    "Configure ta tente de carnivores : projet, genres, surface, contraintes. Un kit Secret Jardin Cosmorrow en quatre questions.",
    """
      <div id="assistant-app" class="stack"></div>
""",
    DATA_CORE
    + """
    <script src="js/pages/assistant.js" defer></script>
""",
)

page(
    "cosmorrow.html",
    "Barres et alims Cosmorrow — Les Gloutonnes · Tourbière",
    "Gamme Secret Jardin Cosmorrow pour carnivores : COP2065, COP4065, Full Spectrum, alims 24 V, kits par tente.",
    """
      <header class="page-hero stack">
        <p class="kicker">Secret Jardin · 24 V · IP65</p>
        <h1>Cosmorrow, et seulement Cosmorrow.</h1>
        <p class="lede">Blanc 6500 K pour germer, Full Spectrum en appoint, alims calibrées 20 W ou 40 W. PPF publié, zone constructeur, pas un PAR 230 de boutique.</p>
      </header>
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
        <h2>Barres</h2>
        <div id="sku-table"></div>
        <div class="card-grid dense" id="fixture-cards" style="margin-top:1.5rem"></div>
      </section>
      <section class="section">
        <h2>Alimentations</h2>
        <div class="card-grid" id="psu-list"></div>
      </section>
      <section class="section">
        <h2>Kits par tente</h2>
        <p class="hint">Prix 2025–2026 growshop FR/BE, barres + alim + programmateur, hors tente. Fourchettes.</p>
        <div class="stack" id="kit-list" style="margin-top:1rem;--stack-space:1rem"></div>
      </section>
""",
    DATA_CORE
    + """
    <script src="js/pages/cosmorrow.js" defer></script>
""",
)

page(
    "especes.html",
    "PPFD par genre carnivore — Les Gloutonnes · Tourbière",
    "Cibles PPFD, DLI, eau et tente pour Dionaea, Sarracenia, Drosera, Nepenthes et les autres carnivores sous Cosmorrow.",
    """
      <header class="page-hero stack">
        <p class="kicker">Carnivero / Florawave · fourchettes</p>
        <h1>Chaque genre a sa fenêtre de photons.</h1>
        <p class="lede">On vise d’abord le bas-milieu de fourchette, puis on monte selon la plante — pas selon un listing 660 nm. Growing 6500 K est la barre de travail.</p>
      </header>
      <div class="chips" id="species-filter" style="margin:1.5rem 0"></div>
      <div class="stack" id="species-list" style="--stack-space:1.25rem"></div>
""",
    """
    <script src="js/data/species.js" defer></script>
    <script src="js/pages/especes.js" defer></script>
""",
)

page(
    "protocoles.html",
    "Protocoles semis à dormance — Les Gloutonnes · Tourbière",
    "Sept protocoles de tente carnivore sous Cosmorrow : germoir, bouturage, production, colorisation, mixte, tropicale, dormance.",
    """
      <header class="page-hero stack">
        <p class="kicker">Métiers de tente</p>
        <h1>Un protocole par job, pas un curseur unique.</h1>
        <p class="lede">Semis, boutures, adultes, rouge, étages, jungle ou hiver : la même Cosmorrow, des hauteurs et des heures différentes.</p>
      </header>
      <nav class="anchor-nav" id="protocol-nav" aria-label="Protocoles"></nav>
      <div id="protocol-list"></div>
      <section class="section">
        <h2>Calendrier FR / BE</h2>
        <p class="hint">Hémisphère nord. Les tropicales ignorent ce rythme : 12–14 h toute l’année, tente à part.</p>
        <div class="month-grid" id="calendar" style="margin-top:1rem"></div>
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
    "Pose et hygro en tente — Les Gloutonnes · Tourbière",
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
        <div class="stack" id="tent-catalog" style="--stack-space:1rem"></div>
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
    "Eau, tourbe, Maxsea — Les Gloutonnes · Tourbière",
    "Eau osmose ou pluie, tourbe blonde, Maxsea 16-16-16 au quart, proies 1–2 fois par mois. Pas de Miracle-Gro.",
    """
      <header class="page-hero stack">
        <p class="kicker">TDS &lt; 50 ppm</p>
        <h1>L’eau pauvre n’est pas négociable.</h1>
        <p class="lede">Osmose, pluie, distillée, ZeroWater. Brita ne suffit pas. Le terreau « plantes vertes » est un poison. Le foliar Maxsea ¼ est un outil, pas un dogme.</p>
      </header>
      <section class="section">
        <h2>Eau autorisée</h2>
        <div class="card-grid" id="water-ok"></div>
      </section>
      <section class="section">
        <h2>Eau interdite</h2>
        <div class="card-grid" id="water-no"></div>
        <ul class="check-list" id="water-practice" style="margin-top:1rem"></ul>
      </section>
      <section class="section">
        <h2>Substrats</h2>
        <div class="stack" id="substrates" style="--stack-space:1rem"></div>
      </section>
      <section class="section">
        <h2>Engrais</h2>
        <div class="stack" id="fertilizers" style="--stack-space:1rem"></div>
      </section>
      <section class="section">
        <h2>Proies</h2>
        <article class="card" id="feeding"></article>
      </section>
""",
    """
    <script src="js/data/nutrients.js" defer></script>
    <script src="js/pages/nutriments.js" defer></script>
""",
)

page(
    "outils.html",
    "PPFD, DLI, électricité — Les Gloutonnes · Tourbière",
    "Simulateur PPFD Cosmorrow, DLI et coût électrique pour tente de carnivores. Modèle optique prudent, pas un PAR-mètre.",
    """
      <header class="page-hero stack">
        <p class="kicker">Lambertien 120° · mylar 0,25</p>
        <h1>Comparer des kits, pas certifier un DLI.</h1>
        <p class="lede">Carte PPFD simplifiée pour Cosmorrow seulement. Cosmorrow n’est pas dimmable : le curseur d’intensité simule un voile, pas un Controller+.</p>
      </header>
      <div class="sim-layout section">
        <article class="card">
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
          </div>
        </article>
        <div class="stack">
          <article class="card">
            <h3>Réglages</h3>
            <label>Kit
              <select id="kit-select"></select>
            </label>
            <label>Tente
              <select id="tent-select"></select>
            </label>
            <label class="slider">
              <span>Hauteur <strong id="height-val">20 cm</strong></span>
              <input id="height" type="range" min="12" max="50" value="20" />
            </label>
            <label class="slider">
              <span>Photopériode <strong id="hours-val">14 h</strong></span>
              <input id="hours" type="range" min="8" max="18" value="14" />
            </label>
            <label>Tarif € / kWh
              <input id="kwh-eur" type="number" step="0.0001" min="0.05" max="0.80" />
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
    "Diagnostic étiolement / brûlure — Les Gloutonnes · Tourbière",
    "Arbre de décisions : étiolement, brûlure, mucilage, urnes, pourriture, algues, sciarides, rouge, semis, boutures.",
    """
      <header class="page-hero stack">
        <p class="kicker">Une question à la fois</p>
        <h1>Ce n’est presque jamais une maladie magique.</h1>
        <p class="lede" id="diag-intro"></p>
      </header>
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
    "Sources et méthode — Les Gloutonnes · Tourbière",
    "Méthode Tourbière : Cosmorrow only, PPFD Carnivero, fiche Secret Jardin 2023-09, Maxsea / California Carnivores. Pas de tracking.",
    """
      <header class="page-hero stack">
        <p class="kicker">Les Gloutonnes</p>
        <h1>Un labo de tente, pas un growshop.</h1>
        <p class="lede">Tourbière aide à installer des carnivores sous LED Cosmorrow. Fourchettes, sources, prudence. Pas de compte, pas de cookies, pas de pub.</p>
      </header>
      <section class="section prose">
        <h2>Pourquoi Cosmorrow</h2>
        <p>Secret Jardin (Belgique) publie un PPF en µmol/s, un PPE en µmol/J, une zone, un IP65, du 24 V et du 230 V livrable en FR/BE. Growing 6500 K est le spectre de germoir. Le Full Spectrum est un appoint. On ne tient plus de palmarès multi-marques : le site est un compagnon de pose, pas un comparateur.</p>
        <h2>Sources</h2>
        <ul>
          <li><a href="https://www.secretjardin.com/wp-content/uploads/2023/09/20230905-COP-BULBS-DATASHEET.pdf" rel="noopener noreferrer" target="_blank">Fiche Cosmorrow COP BULBS 2023-09</a> (Secret Jardin)</li>
          <li><a href="https://www.secretjardin.com/bulbs-power-supplies/" rel="noopener noreferrer" target="_blank">Barres et alims Cosmorrow</a></li>
          <li><a href="https://www.carnivero.com/pages/grow-light-ppfd-recommendations" rel="noopener noreferrer" target="_blank">PPFD par genre — Carnivero / Florawave</a></li>
          <li>Adamec, L. (1997). Mineral nutrition of carnivorous plants. <em>Botanical Review</em> 63.</li>
          <li>California Carnivores / Maxsea : foliar ¼ c. à café / gallon, feuilles seulement.</li>
        </ul>
        <h2>Limites</h2>
        <p>Le simulateur est un modèle lambertien 120° + rebond mylar forfaitaire. Ce n’est pas un PAR-mètre. Les prix sont des fourchettes growshop. Les cibles PPFD sont des fourchettes d’expérience, pas une ordonnance.</p>
        <h2>Vie privée</h2>
        <p>Aucune mesure d’audience. Tes projets restent dans <code>localStorage</code> (<code>tourbiere.project</code>, <code>tourbiere.prefs</code>). Tu peux tout effacer dans les outils du navigateur.</p>
      </section>
""",
    "",
)

print("done")
