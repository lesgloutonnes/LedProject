# Cahier des charges — Les Gloutonnes · Tourbière

Site de référence pour **mettre en place une tente de culture** de plantes carnivores sous **LED Secret Jardin Cosmorrow**.

Marque LED retenue : **Cosmorrow** (Secret Jardin, Belgique, 24 V, IP65, PPF publié). Le comparatif multi-marques de l’ancienne appli n’est **pas** repris.

---

## 1. Intention

Devenir *le* site francophone de référence : LED horti + carnivores en tente. Un débutant sort avec un kit, un plan de pose et un protocole. Un confirmé calibre PPFD / DLI, mélange les étages, diagnostique.

Public : smartphone en rayon growshop autant que bureau. FR d’abord, unités métriques, 230 V.

## 2. Problèmes utilisateurs (et réponses du site)

| Besoin | Solution |
| --- | --- |
| « Par où commencer ? » | Assistant 4 questions → kit Cosmorrow + tente + protocole |
| « Quelle barre, combien, quelle alim ? » | Catalogue Cosmorrow + kits par tente et par projet |
| « Mes plantes étirent / grillent / ne colorent pas » | Diagnostic + cibles PPFD par genre |
| « Semis, boutures, adultes, dormance » | Protocoles dédiés, pas un seul curseur |
| « Quelle eau, quel terreau, quel engrais ? » | Fiches nutriments (RO, tourbe, Maxsea ¼) |
| « Combien ça coûte en électricité ? » | Calculateur kWh / an (tarif FR paramétrable) |
| « Comment accrocher sans se tromper ? » | Plan de pose + checklist montage |
| « Je suis dans le métro, j’ai 3 minutes » | Mobile-first, cartes, checklists, mémorisation locale |

## 3. Projets couverts

1. Germoir / semis (Sarracenia, Drosera, Dionaea, Nepenthes)
2. Bouturage & acclimatation (boutures Nepenthes, leaf-pullings, plantules)
3. Collection / production d’adultes
4. Colorisation (« rouge »)
5. Tente mixte multi-étages
6. Chambre tropicale (Nepenthes, Heliamphora, Cephalotus)
7. Dormance tempérée (Dionaea, Sarracenia, Drosera tempérées)

## 4. Périmètre technique

- HTML / CSS / JS vanilla, **sans npm**, ouverture `index.html` ou `python3 -m http.server`
- Multi-pages, CSS/JS partagés, données en `js/data/*.js`
- Pas de backend, pas de cookies tracking, localStorage uniquement pour projets / préférences
- Accessible (contraste, focus, labels, `prefers-reduced-motion`)
- Mobile d’abord (320 px → 1200 px)
- Sécurité : pas d’`innerHTML` non échappé, liens `rel="noopener"`, pas de secrets

## 5. Pages

1. Accueil — promesse, 3 chemins (assistant, Cosmorrow, espèces)
2. Assistant — wizard → fiche projet + liste d’achat + lien protocoles
3. Cosmorrow — gamme, alims, règles 24 V / IP65, kits
4. Espèces — fiches genres (PPFD, DLI, eau, tente)
5. Protocoles — 7 métiers ci-dessus
6. Tente — dimensions, aération, hygro, plan de pose
7. Nutriments — eau, substrats, engrais, alimentation
8. Outils — PPFD/DLI, électricité, hauteur
9. Diagnostic — arbre de décisions
10. À propos / sources — Carnivero PPFD, fiche COP 2023-09, Maxsea/California Carnivores

## 6. Données Cosmorrow (source constructeur 2023-09)

| SKU | Usage | L | W | PPF | PPE | Zone constructeur |
| --- | --- | --- | --- | --- | --- | --- |
| COP2065 | Grow 6500 K | 47 cm | 20 W | 51 µmol/s | 2,70 | 60×40 @ 15 cm |
| COP4065 | Grow 6500 K | 87 cm | 40 W | 101 µmol/s | 2,70 | 120×60 @ 15 cm |
| COP20FS | Full Spectrum | 47 cm | 20 W | 48–53 µmol/s | 2,40–2,85 | 60×40 @ 15 cm |
| COP40FS | Full Spectrum | 70 cm | 40 W | 107 µmol/s | 2,85 | 90×60 @ 20 cm |

Alims : COM20, COM40, COM2X20, COM2X40, COM3X20, COM3X40, COM5X20, COM5X40. 24 V DC. **Ne pas mélanger 20 W et 40 W sur la même alim.** COP40FS n’est pas interchangeable en longueur avec COP4065.

## 7. Critères de done

- Un utilisateur mobile termine l’assistant et obtient un kit + checklist
- Toutes les pages passent en 375 px sans scroll horizontal (sauf tables scrollables)
- Simulateur Cosmorrow seulement (plus de palmarès multi-marques)
- Contenu horti sourcé, prudent (fourchettes, pas de dogme)
- README à jour, CDC versionné
- Aucune dépendance runtime hors polices optionnelles
