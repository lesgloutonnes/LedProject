# Les Gloutonnes — Guide de culture en tente

Application de culture (comme les guides Cephalotus, Darlingtonia et Nepenthes) pour **installer une tente de carnivores** sous LED **Secret Jardin Cosmorrow**.

Hub : [Applications de culture](https://www.lesgloutonnes.be/pages/applications-culture.html)

HTML / CSS / JS vanilla, sans npm. Ouvre `index.html` ou :

```bash
python3 -m http.server 8000
```

## Ce que ça fait

- **Assistant** — 4 questions → kit Cosmorrow + liste d’achat + protocole
- **Cosmorrow** — barres, alims 24 V, kits par tente (jamais 20 W + 40 W)
- **Espèces** — PPFD / DLI / eau / tente par genre
- **Protocoles** — germoir, bouturage, production, colorisation, mixte, tropicale, dormance
- **Tente** — pose, hygro, extracteur, électricité
- **Nutriments** — eau pauvre, tourbe non amendée, foliar 0,3 g/L, proies
- **Outils** — carte PPFD, DLI, kWh
- **Diagnostic** — arbres de décisions (lumière, eau, ravageurs, dormance manquée)

Marque LED unique : **Cosmorrow**. Pas de palmarès multi-marques.

## Kit signature

Tente 120 × 60, deux bacs 60 × 40 : **2 × COP4065 Growing 90 cm + COM2X40**.

## Sources

- [Fiche COP BULBS 2023-09](https://www.secretjardin.com/wp-content/uploads/2023/09/20230905-COP-BULBS-DATASHEET.pdf)
- [PPFD Carnivero](https://www.carnivero.com/pages/grow-light-ppfd-recommendations)
- Adamec 1997 (nutrition minérale des carnivores)
- Foliar 0,3 g/L (orchidée ¼ FR/BE ; Maxsea = recette US équivalente)

Cahier des charges : `docs/CAHIER_DES_CHARGES.md`.

## Intégration Shopify

Texte prêt à coller : `docs/FICHE_APPLICATION.md`.
