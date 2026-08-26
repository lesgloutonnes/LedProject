"use client";

import { useMemo, useState } from "react";
import {
  FIXTURES,
  SPECIES_TARGETS,
  TENT,
  getFixture,
  ppfTotal,
  wattsTotal,
  type FixtureSetup,
} from "@/lib/fixtures";
import { coverageAlongLength, dli, simulate, yearlyCost, yearlyKwh } from "@/lib/ppfd";
import { euro, euroExact, fmt } from "@/lib/format";
import { Heatmap } from "@/components/heatmap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VERDICT_LABEL: Record<FixtureSetup["verdict"], string> = {
  recommended: "Choix n°1",
  good: "Solide",
  hybrid: "Hybride",
  keep: "À garder",
  caution: "Prudence",
  avoid: "À éviter",
};

export function Planner() {
  const [fixtureId, setFixtureId] = useState("cosmorrow-2x90");
  const [height, setHeight] = useState(25);
  const [hours, setHours] = useState(14);
  const [intensity, setIntensity] = useState(100);
  const [speciesId, setSpeciesId] = useState<(typeof SPECIES_TARGETS)[number]["id"]>("sarr-young");

  const fixture = getFixture(fixtureId);
  const species = SPECIES_TARGETS.find((s) => s.id === speciesId) ?? SPECIES_TARGETS[0];

  const sim = useMemo(
    () => simulate({ fixture, heightCm: height, intensity, bounce: 0.25 }),
    [fixture, height, intensity],
  );

  const dliAvg = dli(sim.avg, hours);
  const kwh = yearlyKwh(wattsTotal(fixture), hours, intensity);
  const cost = yearlyCost(kwh);
  const fecidaKwh = yearlyKwh(130, hours, 100);
  const fecidaCost = yearlyCost(fecidaKwh);

  const inTarget = sim.avg >= species.ppfd[0] && sim.avg <= species.ppfd[1] * 1.15;
  const low = sim.avg < species.ppfd[0];
  const hot = sim.center > species.ppfd[1] * 1.25;

  return (
    <div className="space-y-8">
      <header className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
            Tente Vivosun 120 × 60 × 150 · 0,72 m²
          </p>
          <h1 className="font-heading max-w-3xl text-4xl leading-[1.05] text-balance sm:text-5xl">
            La lumière de ta pépinière, calculée pour de vrai.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            On arrête d’additionner les PAR constructeur. Ici, chaque option est comparée
            en budget photonique, en carte PPFD dans ta tente, en DLI, et en euros sur un
            an — au tarif bleu d’août 2026.
          </p>
        </div>
        <Card className="bg-primary text-primary-foreground ring-0">
          <CardHeader>
            <CardDescription className="text-primary-foreground/70">
              Verdict actuel
            </CardDescription>
            <CardTitle className="font-heading text-2xl text-primary-foreground">
              2 Cosmorrow Growing 90 cm, pas 2 Slim.
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-primary-foreground/85">
            Le Cosmorrow 90 cm Growing (COP4065) est toujours au catalogue Secret Jardin.
            Octopus n’en avait plus en Full Spectrum 90 cm — ce n’est pas la même référence.
            Deux Growing + alim COM2X40 restent le plan le plus cohérent pour tes bacs.
          </CardContent>
        </Card>
      </header>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-xl">Installation à simuler</h2>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Clique une carte — la carte PPFD se recalcule.
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-3 md:overflow-visible">
          {FIXTURES.filter((f) => f.verdict !== "avoid").map((f) => {
            const active = f.id === fixtureId;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFixtureId(f.id)}
                className={`min-w-[220px] shrink-0 rounded-xl p-3 text-left ring-1 transition-all md:min-w-0 ${
                  active
                    ? "bg-card ring-primary shadow-sm"
                    : "bg-card/40 ring-foreground/10 hover:ring-foreground/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-snug">{f.shortName}</span>
                  <Badge variant={active ? "default" : "outline"} className="shrink-0 text-[10px]">
                    {VERDICT_LABEL[f.verdict]}
                  </Badge>
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {wattsTotal(f)} W · {fmt(ppfTotal(f))} µmol/s · {fmt(f.ppe, 2)} µmol/J
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Carte PPFD au sommet du feuillage</CardTitle>
            <CardDescription>
              Modèle lambertien 120°, rebonds mylar ≈ 25 %. Ce n’est pas une mesure de labo
              — ça sert à comparer les géométries, pas à remplacer un PAR-mètre.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Heatmap sim={sim} target={species.ppfd} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Réglages</CardTitle>
              <CardDescription>
                Hauteur = distance rampe → sommet des plantes, pas le fond de la tente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <SliderField
                label="Hauteur"
                value={height}
                min={15}
                max={50}
                unit="cm"
                onChange={setHeight}
              />
              <SliderField
                label="Photopériode"
                value={hours}
                min={10}
                max={16}
                unit="h"
                onChange={setHours}
              />
              <SliderField
                label="Intensité"
                value={intensity}
                min={40}
                max={100}
                unit="%"
                onChange={setIntensity}
              />
              {!fixture.dimmable && intensity < 100 ? (
                <p className="text-xs text-accent">
                  Cette rampe n’est pas dimmable d’origine. Le curseur simule un éloignement
                  ou un filtrage, pas un vrai contrôleur.
                </p>
              ) : null}
              <div>
                <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Cible plantes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SPECIES_TARGETS.map((s) => (
                    <Button
                      key={s.id}
                      size="sm"
                      variant={speciesId === s.id ? "default" : "outline"}
                      onClick={() => setSpeciesId(s.id)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="PPFD moyen" value={`${fmt(sim.avg)} µmol`} hint="sur 0,72 m²" />
            <Stat label="PPFD centre" value={`${fmt(sim.center)} µmol`} hint="hotspot" />
            <Stat label="PPFD bords" value={`${fmt(sim.edge)} µmol`} hint="milieu des 60 cm" />
            <Stat label="Uniformité" value={`${fmt(sim.uniformity * 100)} %`} hint="min / moyenne" />
            <Stat label="DLI moyen" value={`${fmt(dliAvg, 1)} mol`} hint={`${hours} h / jour`} />
            <Stat label="Facture an" value={euro(cost)} hint={`${fmt(kwh, 1)} kWh`} />
          </div>

          <StatusCallout
            low={low}
            hot={hot}
            inTarget={inTarget}
            species={species.label}
            target={species.ppfd}
          />
        </div>
      </div>

      <Tabs defaultValue="comparer">
        <TabsList className="h-auto w-full flex-wrap justify-start">
          <TabsTrigger value="comparer">Comparer</TabsTrigger>
          <TabsTrigger value="poser">Plan de pose</TabsTrigger>
          <TabsTrigger value="facture">DLI & électricité</TabsTrigger>
          <TabsTrigger value="protocole">Rouge sans stress</TabsTrigger>
          <TabsTrigger value="corrections">Corrections</TabsTrigger>
        </TabsList>

        <TabsContent value="comparer" className="mt-4">
          <CompareTable height={height} hours={hours} />
        </TabsContent>
        <TabsContent value="poser" className="mt-4">
          <InstallPlan fixture={fixture} height={height} />
        </TabsContent>
        <TabsContent value="facture" className="mt-4">
          <CostPanel
            fixture={fixture}
            hours={hours}
            intensity={intensity}
            sim={sim}
            fecidaCost={fecidaCost}
            fecidaKwh={fecidaKwh}
          />
        </TabsContent>
        <TabsContent value="protocole" className="mt-4">
          <Protocol />
        </TabsContent>
        <TabsContent value="corrections" className="mt-4">
          <Corrections />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm">{label}</span>
        <span className="font-mono text-sm">
          {value} {unit}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
      />
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl bg-card p-3 ring-1 ring-foreground/10">
      <div className="text-[11px] tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className="font-heading mt-1 text-xl">{value}</div>
      <div className="text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

function StatusCallout({
  low,
  hot,
  inTarget,
  species,
  target,
}: {
  low: boolean;
  hot: boolean;
  inTarget: boolean;
  species: string;
  target: readonly [number, number];
}) {
  let title = "Dans la fenêtre utile";
  let body = `Pour ${species}, on vise ${target[0]}–${target[1]} µmol/m²/s au feuillage. La moyenne estimée est dans cette zone.`;
  if (low) {
    title = "Un peu juste pour la cible";
    body = `La moyenne tombe sous ${target[0]} µmol. Descends de 5 cm, passe à 16 h, ou choisis une option avec plus de PPF — pas une 3ᵉ Slim.`;
  } else if (hot) {
    title = "Centre trop intense";
    body = `Le hotspot dépasse nettement ${target[1]} µmol. Monte de 5 cm ou baisse l’intensité si la rampe est dimmable, et surveille le blanchiment.`;
  } else if (inTarget) {
    title = "Bonne fenêtre pour " + species;
  }
  return (
    <div className="rounded-xl bg-secondary p-4 text-sm leading-relaxed">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-muted-foreground">{body}</p>
    </div>
  );
}

function CompareTable({ height, hours }: { height: number; hours: number }) {
  const rows = FIXTURES.map((f) => {
    const sim = simulate({ fixture: f, heightCm: height, intensity: 100, bounce: 0.25 });
    const kwh = yearlyKwh(wattsTotal(f), hours, 100);
    return { f, sim, kwh, cost: yearlyCost(kwh), dli: dli(sim.avg, hours) };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Toutes les options, même hauteur, 100 %</CardTitle>
        <CardDescription>
          Le bon chiffre n’est pas le watt, ni le PAR 230. C’est le PPF total (µmol/s) que tu
          répands sur 0,72 m², puis le PPFD réel au feuillage.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[11px] tracking-wide text-muted-foreground uppercase">
            <tr className="border-b">
              <th className="py-2 pr-3 font-medium">Setup</th>
              <th className="py-2 pr-3 font-medium">W</th>
              <th className="py-2 pr-3 font-medium">PPF</th>
              <th className="py-2 pr-3 font-medium">µmol/J</th>
              <th className="py-2 pr-3 font-medium">PPFD moy.</th>
              <th className="py-2 pr-3 font-medium">Centre / bords</th>
              <th className="py-2 pr-3 font-medium">DLI</th>
              <th className="py-2 font-medium">€ / an</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ f, sim, cost, dli: day }) => (
              <tr key={f.id} className="border-b border-foreground/5 last:border-0">
                <td className="py-2.5 pr-3">
                  <div className="font-medium">{f.shortName}</div>
                  <div className="text-xs text-muted-foreground">{VERDICT_LABEL[f.verdict]}</div>
                </td>
                <td className="py-2.5 pr-3 font-mono">{wattsTotal(f)}</td>
                <td className="py-2.5 pr-3 font-mono">{fmt(ppfTotal(f))}</td>
                <td className="py-2.5 pr-3 font-mono">{fmt(f.ppe, 2)}</td>
                <td className="py-2.5 pr-3 font-mono">{fmt(sim.avg)}</td>
                <td className="py-2.5 pr-3 font-mono">
                  {fmt(sim.center)} / {fmt(sim.edge)}
                </td>
                <td className="py-2.5 pr-3 font-mono">{fmt(day, 1)}</td>
                <td className="py-2.5 font-mono">{euro(cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Fecida à 2,2 µmol/J : ~286 µmol/s, davantage de photons que 2 Slim (~90 µmol/s après
          calibration PAR). Les Slim redistribuent, mais elles n’égalent pas le budget. 2
          Cosmorrow 90 cm : 214 µmol/s pour 80 W — le meilleur rapport photons / euros / géométrie.
        </p>
      </CardContent>
    </Card>
  );
}

function InstallPlan({ fixture, height }: { fixture: FixtureSetup; height: number }) {
  const lights = simulate({ fixture, heightCm: height, intensity: 100, bounce: 0 }).lights;
  const sideGap = (TENT.lengthCm - fixture.lengthCm) / 2;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Cotes dans la tente</CardTitle>
          <CardDescription>
            Barres parallèles à la longueur de 120 cm, jamais bout à bout sur 60 cm.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <svg viewBox="0 0 280 160" className="h-auto w-full">
            <rect x="24" y="18" width="232" height="116" rx="6" fill="#edf3ec" stroke="#1f3d32" strokeWidth="1.5" />
            {lights.map((l, i) => {
              const x = 24 + ((l.xCm - l.lengthCm / 2) / 120) * 232;
              const y = 18 + ((l.yCm - 2) / 60) * 116;
              const w = (l.lengthCm / 120) * 232;
              const h = Math.max((l.widthCm / 60) * 116, 6);
              return (
                <g key={i}>
                  <rect x={x} y={y} width={w} height={h} rx="2" fill="#1f3d32" />
                  <text x={x + w / 2} y={y - 4} textAnchor="middle" fontSize="8" fill="#5c6b62">
                    axe {fmt(l.yCm, 1)} cm du bord avant
                  </text>
                </g>
              );
            })}
            <text x="140" y="148" textAnchor="middle" fontSize="10" fill="#5c6b62">
              120 cm
            </text>
            <text x="16" y="76" textAnchor="middle" fontSize="10" fill="#5c6b62" transform="rotate(-90 16 76)">
              60 cm
            </text>
          </svg>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            <li>
              Recul en bout de tente : <strong>{fmt(Math.max(0, sideGap), 1)} cm</strong> de chaque
              côté ({fmt(coverageAlongLength(fixture))}&nbsp;% de la longueur couverte).
            </li>
            <li>
              Hauteur de départ : <strong>{height} cm</strong> au-dessus du sommet, pas du plateau.
            </li>
            <li>
              Photopériode : programmateur secteur ON/OFF, pas de Controller+ tant que 100 %
              n’est pas validé sur plantes.
            </li>
            {fixture.id === "cosmorrow-2x90" ? (
              <li>
                Fixation : clips de l’alim COM2X40 sur les barres de tente, ou ridoirs. Les deux
                axes à 15 cm et 45 cm du grand côté de 60 cm.
              </li>
            ) : null}
            {fixture.id === "slim-2x93" ? (
              <li>
                Les Slim se posent avec leurs supports aquarium ou un kit de suspension. IP67 :
                la condensation n’est pas un problème.
              </li>
            ) : null}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{fixture.name}</CardTitle>
          <CardDescription>{fixture.brand} · {fixture.ip} · {fixture.priceHint}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p>{fixture.notes}</p>
          <Separator />
          <p>
            <span className="text-muted-foreground">Spectre · </span>
            {fixture.spectrum}
          </p>
          <p>
            <span className="text-muted-foreground">Dispo · </span>
            {fixture.stock}
          </p>
          <p>
            <span className="text-muted-foreground">À commander · </span>
            {fixture.buy}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function CostPanel({
  fixture,
  hours,
  intensity,
  sim,
  fecidaCost,
  fecidaKwh,
}: {
  fixture: FixtureSetup;
  hours: number;
  intensity: number;
  sim: ReturnType<typeof simulate>;
  fecidaCost: number;
  fecidaKwh: number;
}) {
  const hoursList = [12, 14, 16];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>DLI selon les heures</CardTitle>
          <CardDescription>
            DLI = PPFD × secondes d’allumage / 1&nbsp;000&nbsp;000. C’est ça, plus que le pic
            660 nm, qui colore les Sarracenia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-[11px] tracking-wide text-muted-foreground uppercase">
              <tr className="border-b">
                <th className="py-2 text-left font-medium">Heures</th>
                <th className="py-2 text-left font-medium">DLI moyen</th>
                <th className="py-2 text-left font-medium">DLI centre</th>
                <th className="py-2 text-left font-medium">€ / an</th>
              </tr>
            </thead>
            <tbody>
              {hoursList.map((h) => {
                const kwh = yearlyKwh(wattsTotal(fixture), h, intensity);
                return (
                  <tr key={h} className={h === hours ? "bg-secondary/70" : ""}>
                    <td className="py-2 font-mono">{h} h</td>
                    <td className="py-2 font-mono">{fmt(dli(sim.avg, h), 1)}</td>
                    <td className="py-2 font-mono">{fmt(dli(sim.center, h), 1)}</td>
                    <td className="py-2 font-mono">{euroExact(yearlyCost(kwh))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted-foreground">
            Repères DLI : semis 8–14 · Drosera 12–20 · Dionaea / jeunes Sarracenia 14–22 ·
            adultes bien rouges 16–24. Au-delà, on gagne surtout du stress hydrique.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contre la Fecida 130 W</CardTitle>
          <CardDescription>
            {fmt(hours)} h / jour, {intensity} %, 0,2001 €/kWh (TRV août 2026).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p>
            Fecida : {fmt(fecidaKwh, 1)} kWh / an → {euroExact(fecidaCost)}.
          </p>
          <p>
            {fixture.shortName} : {fmt(yearlyKwh(wattsTotal(fixture), hours, intensity), 1)} kWh / an
            → {euroExact(yearlyCost(yearlyKwh(wattsTotal(fixture), hours, intensity)))}.
          </p>
          <p className="text-muted-foreground">
            Écart : {euroExact(yearlyCost(yearlyKwh(wattsTotal(fixture), hours, intensity)) - fecidaCost)}{" "}
            par an. L’intérêt n’est pas d’économiser 8 € : c’est de mieux étaler les photons
            sur 120 cm au lieu de les concentrer sous 31 × 21 cm.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Protocol() {
  const steps = [
    {
      t: "Jours 1–7",
      d: "14 h, 30 cm au-dessus du sommet, ou 70 % si dimmable. Les nouveaux arrivants d’extérieur ou de reconditionnement passent d’abord ici. Pas de chasse au rouge.",
    },
    {
      t: "Semaines 2–3",
      d: "14–16 h, 25 cm. Tu cherches des gouttes de mucilage sur Drosera, des pièges qui se ferment nettement sur Dionaea, un port compact. Si les urnes pâlissent : trop haut trop vite.",
    },
    {
      t: "Semaines 4–8",
      d: "16 h en saison de croissance, 20–25 cm pour les adultes. C’est là que le rouge vient — lentement. Un cultivar peu coloré restera vert même à 500 µmol.",
    },
    {
      t: "Signaux d’arrêt",
      d: "Feuilles blanchies, urnes croustillantes, cœur qui rentre : monte de 5 cm ou coupe 2 h. Étiolement, mucilage rare, pièges mous : descends ou allonge la journée.",
    },
    {
      t: "Dormance tempérée",
      d: "Sarracenia et Dionaea : 3–4 mois frais, 8–10 h, intensité réduite. La tente n’a pas à rester en mode été toute l’année.",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monter le rouge sans griller les urnes</CardTitle>
        <CardDescription>
          La pigmentation suit le DLI cumulé et le génotype, pas un pic 660 nm obligatoire.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((s) => (
          <div key={s.t} className="grid gap-1 sm:grid-cols-[140px_1fr]">
            <p className="font-mono text-xs tracking-wide text-primary uppercase">{s.t}</p>
            <p className="text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Corrections() {
  const items = [
    {
      t: "230 + 230 ≠ 460",
      d: "Le PAR 230 est mesuré à 20 cm sous la rampe, et il est identique sur les Slim 24 W, 32 W, 40 W et 51 W. C’est un pic local, pas un flux. Deux rampes se chevauchent ; elles n’additionnent pas leurs pics partout.",
    },
    {
      t: "Les Slim sont de médiocres horticoles au watt",
      d: "3025 lm à 7000 K, CRI 96 : on est autour de 0,9 µmol/J, contre 2,7 chez Cosmorrow. 102 W de Slim envoient beaucoup moins de photons que 80 W de Cosmorrow. Redistribuer 90 µmol/s ne bat pas 214 µmol/s.",
    },
    {
      t: "La Fecida n’est pas faible — elle est mal adaptée à 120 × 60",
      d: "130 W × 2,2 µmol/J ≈ 286 µmol/s, conçue pour 60 × 60 cm. Dans ta tente, le panneau 31 × 21 cm fait un hotspot. Garde-la comme appoint, ne la jette pas pour des Slim.",
    },
    {
      t: "Le Cosmorrow 90 cm Growing n’est pas mort",
      d: "Secret Jardin liste encore COP4065, 40 W, 90 cm, PPE 2,7. C’est le Full Spectrum 90 cm qui est passé en 70 cm (COP40FS). Octopus a confondu les deux. GrowLED et d’autres avaient encore du Growing 90 cm en août 2026.",
    },
    {
      t: "Le 660 nm n’est pas un sésame",
      d: "Gemini avait tort de l’exiger pour les adultes. Le DLI et l’homogénéité commandent. Un blanc 6500–7000 K tient toute la culture des carnivores si le PPFD est là.",
    },
    {
      t: "FloraStar 6500 K : PPF contradictoire",
      d: "51, 62 ou 98 µmol/s selon les boutiques pour le même 42 W. Tant que le vendeur ne sort pas une fiche unique, on ne le choisit pas « au même prix » que Cosmorrow.",
    },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.t}>
          <CardHeader>
            <CardTitle className="text-base">{item.t}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            {item.d}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
