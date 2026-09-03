(function () {
  var nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  var nf2 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  var euro0 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var euro2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

  /** Unités SI horti. Secret Jardin écrit PPFD en µmol/s/m² : même grandeur que µmol/m²/s. */
  var UNITS = {
    ppf: "µmol/s",
    ppfd: "µmol/m²/s",
    ppe: "µmol/J",
    dli: "mol/m²/j",
    cct: "K",
    par: "400–700 nm",
  };

  var GLOSSARY = [
    {
      id: "par",
      term: "PAR",
      unit: UNITS.par,
      body: "Bande photosynthétique, pas un chiffre. « PAR 230 » de boutique est presque toujours un pic de PPFD, pas un flux.",
    },
    {
      id: "ppf",
      term: "PPF",
      unit: UNITS.ppf,
      body: "Flux de photons photosynthétiques : photons 400–700 nm émis par la barre, par seconde. C’est le réservoir. Deux PPF s’additionnent. Ce n’est pas des lumens.",
    },
    {
      id: "ppfd",
      term: "PPFD",
      unit: UNITS.ppfd,
      body: "Densité à la canopée. Sans zone + distance, le chiffre ne veut rien dire. Fiche SJ : µmol/s/m² = µmol/m²/s.",
    },
    {
      id: "ppe",
      term: "PPE",
      unit: UNITS.ppe,
      body: "Efficacité : PPF / watts. µmol/s/W = µmol/J. Growing Cosmorrow : 2,70. FS : 2,40–2,85.",
    },
    {
      id: "dli",
      term: "DLI",
      unit: UNITS.dli,
      body: "Dose quotidienne. DLI (mol/m²/j) = PPFD (µmol/m²/s) × heures × 0,0036. C’est ça qui colore, pas un pic 660 nm. 200 µmol/m²/s × 14 h = 10,1 mol/m²/j.",
    },
    {
      id: "cct",
      term: "CCT",
      unit: UNITS.cct,
      body: "Blanc Growing 6500 K (froid, germoir). FS ~3500 K (mix 2700/4000/6500 + 660 nm). Les % Cosmorrow sont un mix de diodes, pas une courbe spectrale mesurée. Le 660 nm est du rouge PAR, pas du rouge lointain 730 nm.",
    },
  ];

  function joinUnit(text, unit) {
    return unit ? text + " " + unit : text;
  }

  window.LgFmt = {
    n0: function (n) {
      return nf0.format(n);
    },
    n1: function (n) {
      return nf1.format(n);
    },
    n2: function (n) {
      return nf2.format(n);
    },
    euro0: function (n) {
      return euro0.format(n);
    },
    euro2: function (n) {
      return euro2.format(n);
    },
    range: function (a, b, unit) {
      return joinUnit(nf0.format(a) + "–" + nf0.format(b), unit);
    },
    units: UNITS,
    glossary: GLOSSARY,
    ppf: function (n) {
      return joinUnit(nf0.format(n), UNITS.ppf);
    },
    ppfOf: function (f) {
      if (f && f.ppfRange) return joinUnit(nf0.format(f.ppfRange[0]) + "–" + nf0.format(f.ppfRange[1]), UNITS.ppf);
      return this.ppf(f && f.ppf);
    },
    ppfd: function (n) {
      return joinUnit(nf0.format(n), UNITS.ppfd);
    },
    ppfdRange: function (a, b) {
      return this.range(a, b, UNITS.ppfd);
    },
    ppe: function (n) {
      return joinUnit(nf2.format(n), UNITS.ppe);
    },
    ppeOf: function (f) {
      if (f && f.ppeRange) return joinUnit(nf2.format(f.ppeRange[0]) + "–" + nf2.format(f.ppeRange[1]), UNITS.ppe);
      return this.ppe(f && f.ppe);
    },
    dli: function (n) {
      return joinUnit(nf1.format(n), UNITS.dli);
    },
    dliRange: function (a, b) {
      return joinUnit(nf1.format(a) + "–" + nf1.format(b), UNITS.dli);
    },
    cct: function (n) {
      return joinUnit(nf0.format(n), UNITS.cct);
    },
  };
})();
