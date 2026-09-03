(function () {
  function projectById(id) {
    return (window.LG_PROJECTS || []).find(function (p) {
      return p.id === id;
    });
  }

  function tentById(id) {
    return (window.LG_TENTS || []).find(function (t) {
      return t.id === id;
    });
  }

  function fixtureBySku(sku) {
    return (window.LG_FIXTURES || []).find(function (f) {
      return f.sku === sku;
    });
  }

  function psuList(kit) {
    if (!kit || kit.psu == null) return [];
    return Array.isArray(kit.psu) ? kit.psu : [kit.psu];
  }

  function tentArea(t) {
    if (!t) return 0;
    return (t.wCm * t.dCm) / 10000;
  }

  function nearestTent(lengthCm, widthCm) {
    var tents = window.LG_TENTS || [];
    var area = (lengthCm * widthCm) / 10000;
    var best = tents[0];
    var bestD = Infinity;
    tents.forEach(function (t) {
      var d = Math.abs(tentArea(t) - area) + Math.abs(t.wCm - lengthCm) / 200;
      if (d < bestD) {
        bestD = d;
        best = t;
      }
    });
    return best;
  }

  /** Pénalité géométrie : ne pas truquer tentId (ça faisait matcher n’importe quel kit voisin). */
  function tentPenalty(kitTentId, userTent) {
    if (!userTent) return 0;
    if (kitTentId === userTent.id) return 0;
    var kt = tentById(kitTentId);
    if (!kt) return 40;
    var d = Math.abs(tentArea(kt) - tentArea(userTent)) + Math.abs(kt.wCm - userTent.wCm) / 100;
    return Math.min(48, 10 + d * 42);
  }

  function genreWarnings(projet, genres) {
    var notes = [];
    var set = genres || [];
    var onlyTemp =
      set.length &&
      set.every(function (g) {
        return g === "dionaea" || g === "sarracenia";
      });
    var onlyTrop =
      set.length &&
      set.every(function (g) {
        return g === "nepenthes" || g === "heliamphora";
      });
    if (projet === "tropicale" && onlyTemp) {
      notes.push("Dionaea et Sarracenia veulent une saison fraîche : une chambre chaude toute l’année n’est pas un cadeau.");
    }
    if (projet === "dormance" && onlyTrop) {
      notes.push("Nepenthes et Heliamphora n’ont pas de dormance tempérée. Garde-les dans une autre tente.");
    }
    if (projet === "rouge" && set.indexOf("sarracenia") < 0 && set.indexOf("dionaea") < 0) {
      notes.push("Le rouge, c’est surtout DLI + génotype, pas un spectre 660. Growing 6500 K suffit souvent.");
    }
    if (projet === "dormance" && set.indexOf("drosera") >= 0) {
      notes.push(
        "Seules les droséras à hibernacle (rotundifolia, intermedia, anglica, filiformis) vont au froid — dehors en FR/BE pour les natives, pas une tente. Capensis, binata et pygmées restent en croissance. Tracyi (golfe) : châssis, pas le gel nu."
      );
    }
    if (projet === "dormance" && set.indexOf("sarracenia") >= 0) {
      notes.push(
        "Purpurea ssp. purpurea dehors. Alata / leucophylla / venosa / psittacina : châssis, pas le gel nu sous la pluie. Oreophila : montagne, châssis plus sec — ce n’est pas le golfe."
      );
    }
    if (projet === "dormance" && set.indexOf("dionaea") >= 0) {
      notes.push(
        "Dionée : châssis. Le gel léger passe ; le godet détrempé sous la pluie verglaçante pourrit le rhizome."
      );
    }
    if (projet === "dormance" && set.indexOf("pinguicula") >= 0) {
      notes.push(
        "Les mexicaines n’ont pas d’hiver à 5 °C : saison sèche, pas hibernacle. Seules vulgaris / grandiflora dorment vraiment."
      );
    }
    if (projet === "tropicale" && set.indexOf("cephalotus") >= 0) {
      notes.push("Cephalotus n’est pas une lowland : étage frais, collet aéré, pas 30 °C / 90 % HR.");
    }
    return notes;
  }

  function scoreKit(kit, ctx) {
    var score = 0;
    var ids = kit.projectIds || [];
    var projectHit = ids.indexOf(ctx.kitProject) >= 0;
    if (projectHit) {
      score += 55;
      if (ids[0] === ctx.kitProject) score += 14;
    } else {
      score -= 28;
    }
    if (kit.tentId === ctx.tentId) score += 40;
    else score -= tentPenalty(kit.tentId, ctx.tent);

    if (ctx.budget === "sous-150") {
      if (kit.estimatedEUR <= 150) score += 22;
      else if (kit.estimatedEUR > 200) score -= 28;
      else score -= 8;
    } else if (ctx.budget === "150-300") {
      if (kit.estimatedEUR >= 100 && kit.estimatedEUR <= 310) score += 12;
      if (kit.estimatedEUR < 90) score -= 4;
    }

    if (ctx.hygro === "haute") {
      if (ids.indexOf("tropical") >= 0 || ids.indexOf("bouturage") >= 0) score += 16;
      if (kit.hangCm >= 22) score += 6;
      if (kit.totalWatts >= 160) score -= 10;
    } else if (ctx.hygro === "basse") {
      if (ids.indexOf("tropical") >= 0) score -= 12;
    }

    if (ctx.dormance === true) {
      if (ids.indexOf("dormance") >= 0) score += 18;
      if (ctx.kitProject === "tropical") score -= 40;
    }

    var genres = ctx.genres || [];
    if (genres.indexOf("nepenthes") >= 0 && ids.indexOf("tropical") >= 0) score += 10;
    if (genres.indexOf("sarracenia") >= 0 && kit.totalPpf >= 180) score += 8;
    if (genres.indexOf("dionaea") >= 0 && kit.hours >= 14) score += 3;
    var bars = kit.bars || [];
    if (
      ctx.kitProject === "germoir" &&
      bars.length === 1 &&
      bars.some(function (b) {
        return b.sku && b.sku.indexOf("FS") >= 0;
      })
    ) {
      score -= 6;
    }
    return score;
  }

  function matchKit(input) {
    var project = projectById(input.projet);
    var tent = tentById(input.tenteId) || nearestTent(input.lengthCm || 120, input.widthCm || 60);
    if (!tent) {
      return {
        tent: null,
        project: project,
        kit: null,
        alternatives: [],
        warnings: ["Aucune tente catalogue."],
        protocolId: project ? project.protocolId : "seedling",
      };
    }
    var kitProject = project ? project.kitProject : "germoir";
    var ctx = {
      kitProject: kitProject,
      tentId: tent && tent.id,
      tent: tent,
      budget: input.budget,
      hygro: input.hygro,
      dormance: input.dormance,
      genres: input.genres || [],
    };
    var kits = (window.LG_KITS || []).slice();
    var sameTent = kits.filter(function (k) {
      return tent && k.tentId === tent.id;
    });
    var projectKits = kits.filter(function (k) {
      return (k.projectIds || []).indexOf(kitProject) >= 0;
    });
    var sameTentProject = sameTent.filter(function (k) {
      return (k.projectIds || []).indexOf(kitProject) >= 0;
    });
    var pool = sameTentProject.length
      ? sameTentProject
      : projectKits.length
        ? projectKits
        : sameTent.length
          ? sameTent
          : kits;
    var ranked = pool
      .map(function (k) {
        return { kit: k, score: scoreKit(k, ctx) };
      })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return (a.kit.estimatedEUR || 0) - (b.kit.estimatedEUR || 0);
      });

    var best = ranked[0] && ranked[0].kit;
    var alternatives = ranked.slice(1, 4).map(function (r) {
      return r.kit;
    });
    var warnings = genreWarnings(input.projet, ctx.genres).slice();
    if (best) warnings = warnings.concat(best.warnings || []);
    if (input.dormance && (kitProject === "tropical" || input.projet === "tropicale")) {
      warnings.unshift("Dormance et chambre tropicale ne se mixent pas dans la même tente.");
    }
    if (best && input.budget === "sous-150" && best.estimatedEUR > 150) {
      warnings.unshift(
        "Le budget ne couvre pas ce kit (~" +
          Math.round(best.estimatedEUR) +
          " €). On le propose quand même — passe 150–300 € ou réduis la surface utile."
      );
    }
    warnings.push("Ne jamais mélanger 20 W et 40 W sur la même alim Cosmorrow.");
    return {
      tent: tent,
      project: project,
      kit: best || null,
      alternatives: alternatives,
      warnings: warnings,
      protocolId: project ? project.protocolId : "seedling",
    };
  }

  window.LgMatch = {
    projectById: projectById,
    tentById: tentById,
    fixtureBySku: fixtureBySku,
    psuList: psuList,
    nearestTent: nearestTent,
    genreWarnings: genreWarnings,
    matchKit: matchKit,
  };
})();
