(function () {
  var PREFIX = "tourbiere.";
  var PREFS_DEFAULT = { v: 1, kwhEur: 0.2016, tenteFavorite: "tent-120x60" };
  var PROJECT_DEFAULT = {
    v: 1,
    updatedAt: null,
    step: 1,
    projet: null,
    genres: [],
    tente: null,
    contraintes: { budget: null, hygro: null, dormance: null },
    kit: null,
  };

  function canStore() {
    try {
      var k = PREFIX + "__t";
      localStorage.setItem(k, "1");
      localStorage.removeItem(k);
      return true;
    } catch (err) {
      return false;
    }
  }

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      if (!raw) return fallback;
      var data = JSON.parse(raw);
      if (!data || data.v !== 1) return fallback;
      return data;
    } catch (err) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent("tourbiere-store", { detail: { ok: true } }));
      return true;
    } catch (err) {
      window.dispatchEvent(new CustomEvent("tourbiere-store", { detail: { ok: false } }));
      return false;
    }
  }

  function getPrefs() {
    var p = read("prefs", null);
    if (!p) return Object.assign({}, PREFS_DEFAULT);
    if (typeof p.kwhEur !== "number" || p.kwhEur < 0.05 || p.kwhEur > 0.8) {
      p.kwhEur = PREFS_DEFAULT.kwhEur;
    }
    return p;
  }

  function setPrefs(partial) {
    var next = Object.assign({}, getPrefs(), partial, { v: 1 });
    write("prefs", next);
    return next;
  }

  function getProject() {
    var p = read("project", null);
    if (!p) return Object.assign({}, PROJECT_DEFAULT, { contraintes: { budget: null, hygro: null, dormance: null } });
    if (!p.contraintes) p.contraintes = { budget: null, hygro: null, dormance: null };
    if (!Array.isArray(p.genres)) p.genres = [];
    return p;
  }

  function setProject(partial) {
    var next = Object.assign({}, getProject(), partial, {
      v: 1,
      updatedAt: new Date().toISOString(),
    });
    write("project", next);
    return next;
  }

  function resetProject() {
    var blank = Object.assign({}, PROJECT_DEFAULT, {
      contraintes: { budget: null, hygro: null, dormance: null },
      genres: [],
      updatedAt: new Date().toISOString(),
    });
    write("project", blank);
    return blank;
  }

  window.TourbiereStore = {
    canStore: canStore,
    getPrefs: getPrefs,
    setPrefs: setPrefs,
    getProject: getProject,
    setProject: setProject,
    resetProject: resetProject,
    PREFS_DEFAULT: PREFS_DEFAULT,
  };
})();
