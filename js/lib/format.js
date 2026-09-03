(function () {
  var nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  var nf2 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  var euro0 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  var euro2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

  window.TourbiereFmt = {
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
      return nf0.format(a) + "–" + nf0.format(b) + (unit ? " " + unit : "");
    },
  };
})();
