(function () {
  var page = document.body && document.body.getAttribute("data-page");
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!page) {
    page = file.replace(".html", "") || "index";
    if (page === "" || page === "index") page = "index";
  }

  document.querySelectorAll(".nav-primary a[href], .bottom-nav a[href]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("#")[0];
    var isHome = (page === "index" || page === "") && (href === "index.html" || href === "./" || href === "/");
    var isCurrent = isHome || href === file || href === page + ".html";
    if (isCurrent) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  var dialog = document.getElementById("plus-sheet");
  var openBtn = document.getElementById("plus-open");
  var closeBtn = document.getElementById("plus-close");
  if (dialog && openBtn) {
    openBtn.addEventListener("click", function () {
      openBtn.setAttribute("aria-expanded", "true");
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  }
  if (dialog && closeBtn) {
    closeBtn.addEventListener("click", function () {
      openBtn && openBtn.setAttribute("aria-expanded", "false");
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    });
  }
  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog && typeof dialog.close === "function") dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
    });
  }

  var cta = document.querySelector(".header-cta");
  if (cta && page === "assistant") {
    var stored = window.TourbiereStore && TourbiereStore.getProject();
    if (stored && stored.projet) {
      cta.textContent = "Reprendre";
      cta.setAttribute("href", "assistant.html");
    } else {
      cta.hidden = true;
    }
  }
})();
