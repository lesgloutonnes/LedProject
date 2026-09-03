(function () {
  var page = document.body && document.body.getAttribute("data-page");
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!page) {
    page = file.replace(".html", "") || "index";
    if (page === "" || page === "index") page = "index";
  }

  var dialog = document.getElementById("plus-sheet");
  var openBtn = document.getElementById("plus-open");
  var closeBtn = document.getElementById("plus-close");

  var currentInSheet = false;
  document.querySelectorAll(".nav-primary a[href], .bottom-nav a[href], #plus-sheet a[href]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("#")[0];
    var isHome = (page === "index" || page === "") && (href === "index.html" || href === "./" || href === "/");
    var isCurrent = isHome || href === file || href === page + ".html";
    if (isCurrent) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
    if (isCurrent && a.closest("#plus-sheet")) currentInSheet = true;
  });
  if (openBtn) openBtn.classList.toggle("is-current", currentInSheet);
  if (dialog && openBtn) {
    openBtn.addEventListener("click", function () {
      openBtn.setAttribute("aria-expanded", "true");
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    });
  }
  if (dialog && closeBtn) {
    closeBtn.addEventListener("click", function () {
      if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    });
  }
  if (dialog) {
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog && typeof dialog.close === "function") dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (openBtn) {
        openBtn.setAttribute("aria-expanded", "false");
        if (typeof openBtn.focus === "function") openBtn.focus();
      }
    });
  }

  var more = document.querySelector(".nav-more");
  if (more) {
    document.addEventListener("click", function (ev) {
      if (more.open && !more.contains(ev.target)) more.open = false;
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && more.open) {
        more.open = false;
        var summary = more.querySelector("summary");
        if (summary) summary.focus();
      }
    });
  }

  var cta = document.querySelector(".header-cta");
  if (cta && page === "assistant") {
    var stored = window.LgStore && LgStore.getProject();
    if (stored && stored.projet) {
      cta.textContent = "Reprendre";
      cta.setAttribute("href", "assistant.html");
    } else {
      cta.hidden = true;
    }
  }

  function hardenExternal(a) {
    var href = a.getAttribute("href") || "";
    if (/^\s*(javascript:|data:|vbscript:)/i.test(href)) {
      a.removeAttribute("href");
      a.setAttribute("role", "link");
      a.setAttribute("aria-disabled", "true");
      return;
    }
    if (!/^https?:\/\//i.test(href)) return;
    a.setAttribute("target", "_blank");
    var rel = (a.getAttribute("rel") || "").toLowerCase();
    if (rel.indexOf("noopener") === -1 || rel.indexOf("noreferrer") === -1) {
      a.setAttribute("rel", "noopener noreferrer");
    }
    if (!a.getAttribute("referrerpolicy")) a.setAttribute("referrerpolicy", "no-referrer");
    if (!a.querySelector(".visually-hidden")) {
      var s = document.createElement("span");
      s.className = "visually-hidden";
      s.textContent = " (nouvelle fenêtre)";
      a.appendChild(s);
    }
  }

  document.querySelectorAll("a[href]").forEach(hardenExternal);

  function showStoreWarn() {
    var el = document.getElementById("store-warn");
    if (!el) return;
    el.hidden = false;
  }

  if (window.LgStore && !LgStore.canStore()) showStoreWarn();
  window.addEventListener("lg-tente-store", function (ev) {
    if (ev.detail && ev.detail.ok === false) showStoreWarn();
  });

  var sticky = document.querySelector(".cta-sticky");
  var heroCta = document.querySelector(".page-hero .btn-primary");
  if (sticky && heroCta && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        var vis = entries[0] && entries[0].isIntersecting;
        sticky.classList.toggle("is-hidden", Boolean(vis));
      },
      { threshold: 0.6 }
    );
    io.observe(heroCta);
  }
})();
