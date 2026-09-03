(function () {
  function printZone(selector) {
    var zone = document.querySelector(selector);
    if (!zone) return;
    document.body.classList.add("is-printing");
    zone.classList.add("is-print-root");
    window.addEventListener(
      "afterprint",
      function () {
        document.body.classList.remove("is-printing");
        zone.classList.remove("is-print-root");
      },
      { once: true }
    );
    window.print();
  }

  window.TourbierePrint = { printZone: printZone };
})();
