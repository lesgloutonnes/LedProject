# LedProject — Les Gloutonnes

Dépôt : [github.com/lesgloutonnes/LedProject](https://github.com/lesgloutonnes/LedProject)

Simulateur d’éclairage pour **deux bacs de semis 60 × 40 cm** de carnivores (Sarracenia, Drosera, Dionaea) sous tente **Vivosun 120 × 60 × 150 cm**.

**HTML + CSS + JavaScript, sans npm.** Double-clique `index.html`.

## Ouvrir

```bash
python3 -m http.server 8000
```

Puis http://127.0.0.1:8000

## À commander pour ce job

Cible germoir : **150–250 µmol/m²/s** sur le terreau, 14 h, 15–20 cm, IP65 (humidité).

1. **Choix n°1 — 2 × Secret Jardin Cosmorrow Growing 90 cm (COP4065) + alim COM2X40**  
   80 W, **202 µmol/s**, 100 % 6500 K, IP65, fiche 120 × 60 cm. Kit ≈ 130–145 €.  
   [Datasheet COP](https://www.secretjardin.com/wp-content/uploads/2023/09/20230905-COP-BULBS-DATASHEET.pdf)

2. **1 barre / bac — 2 × Hortimol TLED 40 W 60 cm FSG**  
   80 W, 184 µmol/s, Osram, 230 V, footprint 60 × 60 par barre. ≈ 178 €.

3. **Premium — 4 × SANlight FLEX II 20 + driver 150 W**  
   76 W, 200 µmol/s, IP68, spectre jeunes plants. ≈ 350–400 €. Pas plus de photons, beaucoup plus solide.

4. **Garder la Fecida 130 W** en appoint sur un seul bac, jamais comme seule source.

5. **Ne pas prendre 2 Slim 93** : 182 µmol/s / 102 W, PAR 230 = pic.

Hors jeu amateur : Philips GreenPower Production Module, Valoya — excellents, vendus via intégrateurs.

## Fichiers

- `index.html` — page
- `styles.css` — mise en page
- `app.js` — rampes, modèle PPFD (lambertien + 25 % mylar), deux bacs
