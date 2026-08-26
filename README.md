# LedProject — Les Gloutonnes

Dépôt : [github.com/lesgloutonnes/LedProject](https://github.com/lesgloutonnes/LedProject)

Projet d’éclairage LED pour une pépinière de plantes carnivores (Sarracenia, Drosera, Dionaea) sous tente **Vivosun 120 × 60 × 150 cm** (0,72 m²).

L’app **Tourbière Lab** compare des rampes réelles (Cosmorrow, Hortimol, SuperFish Slim, Fecida, FloraStar, SANlight) avec :

- un budget photonique (PPF, µmol/s) plutôt que le watt ou un PAR constructeur isolé ;
- une carte PPFD lambertienne dans la tente ;
- le DLI à 12 / 14 / 16 h ;
- le coût annuel au tarif bleu EDF d’août 2026 (0,2001 €/kWh).

## Lancer en local

```bash
npm install
npm run dev
```

L’app écoute sur [http://127.0.0.1:43147](http://127.0.0.1:43147).

## Verdict court

1. **2 × Secret Jardin Cosmorrow Growing 90 cm (COP4065) + alim COM2X40** — toujours au catalogue, ~80 W, 214 µmol/s, longueur adaptée.
2. **2 × Hortimol TLED 60 W 120 cm** si le Cosmorrow 90 cm est introuvable — le constructeur donne déjà *une* barre pour 120 × 60.
3. **Garder la Fecida 130 W** comme appoint : elle a plus de photons que 2 Slim, mais mal répartis.
4. **Ne pas remplacer la Fecida par 2 Slim 93** : le PAR 230 est un pic à 20 cm, identique sur toute la gamme Slim, pas un flux à additionner.

Le Full Spectrum Cosmorrow 90 cm a bien disparu ; son successeur est le **COP40FS 70 cm**. Ce n’est pas la même pièce que le Growing 90 cm.

## Modèle optique

Chaque rampe est une source linéaire lambertienne à 120°. Les parois mylar ajoutent un rebond forfaitaire de 25 % de la moyenne directe. Les Slim sont calées pour que le pic sous une barre à 20 cm vaille 230 µmol/m²/s (fiche Aquadistri).

C’est un outil de comparaison, pas une mesure. Un PAR-mètre (ou une app smartphone en approximation) reste utile une fois les rampes accrochées.

## Pile

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
