(function () {
  var e = escapeHtml;
  var data = window.LG_DIAGNOSTIC;
  if (!data) return;
  var pick = document.getElementById("tree-pick");
  var panel = document.getElementById("tree-panel");
  var intro = document.getElementById("diag-intro");
  if (intro) intro.textContent = data.intro || "";

  var current = { treeId: null, nodeId: null, stack: [] };

  function treeById(id) {
    return (data.trees || []).find(function (t) {
      return t.id === id;
    });
  }

  if (pick) {
    pick.innerHTML = (data.trees || [])
      .map(function (t) {
        return (
          '<button type="button" class="choice" data-tree="' +
          e(t.id) +
          '"><strong>' +
          e(t.title) +
          "</strong></button>"
        );
      })
      .join("");
    pick.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-tree]");
      if (!btn) return;
      var tree = treeById(btn.getAttribute("data-tree"));
      if (!tree) return;
      current.treeId = tree.id;
      current.nodeId = tree.startId;
      current.stack = [];
      if (pick) pick.hidden = true;
      renderNode();
    });
  }

  function renderNode() {
    var tree = treeById(current.treeId);
    if (!tree || !panel) return;
    var node = tree.nodes[current.nodeId];
    if (!node) return;
    var answers = (node.answers || [])
      .map(function (a, i) {
        return (
          '<button type="button" class="choice" data-i="' +
          i +
          '">' +
          e(a.label) +
          "</button>"
        );
      })
      .join("");
    panel.innerHTML =
      '<article class="card"><p class="kicker">' +
      e(tree.title) +
      "</p><h2>" +
      e(node.question) +
      '</h2><div class="diag-answers">' +
      answers +
      '</div><p class="mt-s4"><button type="button" class="btn-ghost" id="diag-back">Retour</button></p></article>';
    panel.querySelectorAll("[data-i]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var a = node.answers[Number(btn.getAttribute("data-i"))];
        if (!a) return;
        current.stack.push(current.nodeId);
        if (a.nextId) {
          if (!tree.nodes[a.nextId]) return;
          current.nodeId = a.nextId;
          renderNode();
        } else if (a.result) {
          renderResult(tree, a.result);
        }
      });
    });
    var back = document.getElementById("diag-back");
    if (back) {
      back.addEventListener("click", function () {
        if (current.stack.length) {
          current.nodeId = current.stack.pop();
          renderNode();
        } else {
          panel.innerHTML = "";
          current.treeId = null;
          if (pick) pick.hidden = false;
        }
      });
    }
  }

  function renderResult(tree, result) {
    panel.innerHTML =
      '<article class="card stack"><p class="kicker">' +
      e(tree.title) +
      "</p><h2>" +
      e(result.title) +
      '</h2><ul class="check-list">' +
      (result.fix || [])
        .map(function (f) {
          return "<li>" + e(f) + "</li>";
        })
        .join("") +
      '</ul><div class="btn-row"><button type="button" class="btn-ghost" id="diag-back">Retour</button>' +
      '<a class="btn-primary" href="protocoles.html">Voir les protocoles</a>' +
      '<a class="btn-ghost" href="especes.html">Cibles par genre</a></div></article>';
    var backResult = document.getElementById("diag-back");
    if (backResult) {
      backResult.addEventListener("click", function () {
        if (current.stack.length) {
          current.nodeId = current.stack.pop();
          renderNode();
        }
      });
    }
  }
})();
