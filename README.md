# LedProject — Les Gloutonnes

Dépôt : [github.com/lesgloutonnes/LedProject](https://github.com/lesgloutonnes/LedProject)

Simulateur d’éclairage pour une pépinière de carnivores (Sarracenia, Drosera, Dionaea) sous tente **Vivosun 120 × 60 × 150 cm**.

**HTML + CSS + JavaScript, sans npm.** Il suffit d’ouvrir `index.html` dans un navigateur.

## Ouvrir

Double-clique `index.html`, ou depuis un terminal :

```bash
# Python 3, optionnel
python3 -m http.server 8000
```

Puis va sur http://127.0.0.1:8000

## Verdict court

1. **2 × Secret Jardin Cosmorrow Growing 90 cm (COP4065) + alim COM2X40**
2. **2 × Hortimol TLED 60 W 120 cm** si le Cosmorrow 90 cm est introuvable
3. **Garder la Fecida 130 W** comme appoint
4. **Ne pas remplacer la Fecida par 2 Slim 93** : le PAR 230 est un pic, pas un flux à additionner

## Fichiers

- `index.html` — page
- `styles.css` — mise en page
- `app.js` — données rampes, modèle PPFD, interface
