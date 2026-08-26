"use client";

import { useEffect, useRef } from "react";
import type { SimResult } from "@/lib/ppfd";
import { TENT } from "@/lib/fixtures";
import { fmt } from "@/lib/format";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

const STOPS: { t: number; c: string }[] = [
  { t: 0, c: "#0c1a16" },
  { t: 80, c: "#16382c" },
  { t: 150, c: "#2a6a4a" },
  { t: 250, c: "#c4a035" },
  { t: 400, c: "#d4653a" },
  { t: 550, c: "#9b2d3a" },
  { t: 750, c: "#f3ead2" },
];

export function ppfdColor(v: number) {
  if (v <= STOPS[0].t) return STOPS[0].c;
  for (let i = 1; i < STOPS.length; i += 1) {
    if (v <= STOPS[i].t) {
      const a = STOPS[i - 1];
      const b = STOPS[i];
      const t = (v - a.t) / (b.t - a.t);
      const A = hexToRgb(a.c);
      const B = hexToRgb(b.c);
      const r = Math.round(lerp(A.r, B.r, t));
      const g = Math.round(lerp(A.g, B.g, t));
      const bl = Math.round(lerp(A.b, B.b, t));
      return `rgb(${r},${g},${bl})`;
    }
  }
  return STOPS[STOPS.length - 1].c;
}

export function Heatmap({
  sim,
  target,
}: {
  sim: SimResult;
  target: readonly [number, number];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { cols, rows, grid } = sim;
    canvas.width = cols;
    canvas.height = rows;
    const img = ctx.createImageData(cols, rows);
    for (let i = 0; i < grid.length; i += 1) {
      const { r, g, b } = hexToRgb(toHex(ppfdColor(grid[i])));
      const p = i * 4;
      img.data[p] = r;
      img.data[p + 1] = g;
      img.data[p + 2] = b;
      img.data[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, [sim]);

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-xl ring-1 ring-foreground/10"
        style={{ aspectRatio: `${TENT.lengthCm} / ${TENT.depthCm}` }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ imageRendering: "pixelated" }}
        />
        {sim.lights.map((light, i) => {
          const left = ((light.xCm - light.lengthCm / 2) / TENT.lengthCm) * 100;
          const top = ((light.yCm - light.widthCm / 2) / TENT.depthCm) * 100;
          const w = (light.lengthCm / TENT.lengthCm) * 100;
          const h = (Math.max(light.widthCm, 2.4) / TENT.depthCm) * 100;
          return (
            <div
              key={`${light.kind}-${i}`}
              className="pointer-events-none absolute rounded-sm bg-[#f7f1de]/90 shadow-[0_0_12px_rgba(247,241,222,0.55)]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${w}%`,
                height: `${h}%`,
              }}
            />
          );
        })}
        <Probe x={50} y={50} label="Centre" value={sim.center} />
        <Probe x={50} y={10} label="Bord" value={sim.edge} />
        <Probe x={10} y={14} label="Coin" value={sim.corner} />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-wide text-muted-foreground uppercase">
        <span>120 cm</span>
        <span>cible {target[0]}–{target[1]} µmol</span>
        <span>60 cm</span>
      </div>
      <Legend />
    </div>
  );
}

function toHex(color: string) {
  if (color.startsWith("#")) return color;
  const m = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (!m) return "#000000";
  const r = Number(m[1]).toString(16).padStart(2, "0");
  const g = Number(m[2]).toString(16).padStart(2, "0");
  const b = Number(m[3]).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

function Probe({
  x,
  y,
  label,
  value,
}: {
  x: number;
  y: number;
  label: string;
  value: number;
}) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="rounded-md bg-background/85 px-1.5 py-0.5 text-[10px] leading-tight shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm">
        <div className="text-muted-foreground">{label}</div>
        <div className="font-mono font-medium text-foreground">{fmt(value)} µmol</div>
      </div>
    </div>
  );
}

function Legend() {
  const ticks = [0, 150, 250, 400, 550];
  return (
    <div className="mt-2">
      <div
        className="h-2 w-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg,#0c1a16 0%,#2a6a4a 20%,#c4a035 40%,#d4653a 62%,#9b2d3a 80%,#f3ead2 100%)",
        }}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
