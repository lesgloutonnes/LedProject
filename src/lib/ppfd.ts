import { TENT, type FixtureSetup, type LightKind } from "./fixtures";

export interface LightGeom {
  kind: LightKind;
  xCm: number;
  yCm: number;
  lengthCm: number;
  widthCm: number;
  ppf: number;
}

export interface SimOptions {
  fixture: FixtureSetup;
  heightCm: number;
  intensity: number;
  bounce: number;
  cols?: number;
  rows?: number;
}

export interface SimResult {
  grid: number[];
  cols: number;
  rows: number;
  cellW: number;
  cellD: number;
  min: number;
  max: number;
  avg: number;
  center: number;
  edge: number;
  corner: number;
  uniformity: number;
  lights: LightGeom[];
}

const SLIM_PEAK_TARGET = 230;
const SLIM_CAL_HEIGHT = 20;

function placements(fixture: FixtureSetup): LightGeom[] {
  const { count, kind, lengthCm, widthCm, ppfEach } = fixture;
  const lights: LightGeom[] = [];

  if (kind === "panel") {
    lights.push({
      kind,
      xCm: TENT.lengthCm / 2,
      yCm: TENT.depthCm / 2,
      lengthCm,
      widthCm,
      ppf: ppfEach,
    });
    return lights;
  }

  const x = TENT.lengthCm / 2;
  for (let i = 0; i < count; i += 1) {
    const y = ((i + 0.5) * TENT.depthCm) / count;
    lights.push({
      kind,
      xCm: x,
      yCm: y,
      lengthCm,
      widthCm,
      ppf: ppfEach,
    });
  }
  return lights;
}

function contributePoint(
  px: number,
  py: number,
  ex: number,
  ey: number,
  h: number,
  dPpf: number,
  halfAngleCos: number,
) {
  const dx = px - ex;
  const dy = py - ey;
  const r2 = dx * dx + dy * dy + h * h;
  const r = Math.sqrt(r2);
  if (r < 0.8) return 0;
  const cos = h / r;
  if (cos < halfAngleCos) return 0;
  // Lambertian: PPFD = (dPPF / π) * cos²θ / r²  with r in metres.
  const rM = r / 100;
  return (dPpf / Math.PI) * ((cos * cos) / (rM * rM));
}

function barContribution(
  px: number,
  py: number,
  light: LightGeom,
  h: number,
  segments: number,
) {
  const half = light.lengthCm / 2;
  const dPpf = light.ppf / segments;
  let sum = 0;
  for (let i = 0; i < segments; i += 1) {
    const t = (i + 0.5) / segments;
    const ex = light.xCm - half + t * light.lengthCm;
    const ey = light.yCm;
    sum += contributePoint(px, py, ex, ey, h, dPpf, 0.5);
  }
  return sum;
}

function panelContribution(
  px: number,
  py: number,
  light: LightGeom,
  h: number,
) {
  const nx = 6;
  const ny = 4;
  const dPpf = light.ppf / (nx * ny);
  let sum = 0;
  for (let i = 0; i < nx; i += 1) {
    for (let j = 0; j < ny; j += 1) {
      const ex = light.xCm - light.lengthCm / 2 + ((i + 0.5) / nx) * light.lengthCm;
      const ey = light.yCm - light.widthCm / 2 + ((j + 0.5) / ny) * light.widthCm;
      sum += contributePoint(px, py, ex, ey, h, dPpf, 0.5);
    }
  }
  return sum;
}

function peakOfCenteredBar(lengthCm: number, ppf: number, heightCm: number) {
  const light: LightGeom = {
    kind: "bar",
    xCm: TENT.lengthCm / 2,
    yCm: TENT.depthCm / 2,
    lengthCm,
    widthCm: 2.2,
    ppf,
  };
  return barContribution(light.xCm, light.yCm, light, heightCm, 24);
}

const slimScale = (() => {
  const peak = peakOfCenteredBar(93, 45, SLIM_CAL_HEIGHT);
  return peak > 0 ? SLIM_PEAK_TARGET / peak : 1;
})();

export function scaledPpfEach(fixture: FixtureSetup) {
  if (fixture.peakPpfdAt20) return fixture.ppfEach * slimScale;
  return fixture.ppfEach;
}

export function simulate(options: SimOptions): SimResult {
  const cols = options.cols ?? 32;
  const rows = options.rows ?? 16;
  const cellW = TENT.lengthCm / cols;
  const cellD = TENT.depthCm / rows;
  const intensity = options.intensity / 100;
  const ppfScale =
    options.fixture.peakPpfdAt20 != null ? slimScale * intensity : intensity;

  const lights = placements(options.fixture).map((l) => ({
    ...l,
    ppf: l.ppf * ppfScale,
  }));

  const h = Math.max(8, options.heightCm);
  const grid = new Array<number>(cols * rows).fill(0);
  const segments = 18;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const px = (col + 0.5) * cellW;
      const py = (row + 0.5) * cellD;
      let v = 0;
      for (const light of lights) {
        v +=
          light.kind === "panel"
            ? panelContribution(px, py, light, h)
            : barContribution(px, py, light, h, segments);
      }
      grid[row * cols + col] = v;
    }
  }

  const n = grid.length;
  let sum = 0;
  let min = Infinity;
  let max = 0;
  for (const v of grid) {
    sum += v;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const meanDirect = sum / n;
  const bounceAdd = options.bounce * meanDirect;
  if (bounceAdd > 0) {
    for (let i = 0; i < n; i += 1) grid[i] += bounceAdd;
    min += bounceAdd;
    max += bounceAdd;
    sum += bounceAdd * n;
  }

  const avg = sum / n;
  const center = sample(grid, cols, rows, 0.5, 0.5);
  const edge = 0.5 * (sample(grid, cols, rows, 0.5, 0.08) + sample(grid, cols, rows, 0.5, 0.92));
  const corner = sample(grid, cols, rows, 0.08, 0.08);
  const uniformity = avg > 0 ? min / avg : 0;

  return {
    grid,
    cols,
    rows,
    cellW,
    cellD,
    min,
    max,
    avg,
    center,
    edge,
    corner,
    uniformity,
    lights: placements(options.fixture),
  };
}

function sample(grid: number[], cols: number, rows: number, nx: number, ny: number) {
  const col = Math.min(cols - 1, Math.max(0, Math.floor(nx * cols)));
  const row = Math.min(rows - 1, Math.max(0, Math.floor(ny * rows)));
  return grid[row * cols + col];
}

export function dli(ppfd: number, hours: number) {
  return (ppfd * hours * 3600) / 1e6;
}

export function yearlyKwh(watts: number, hoursPerDay: number, intensityPct: number) {
  return (watts * (intensityPct / 100) * hoursPerDay * 365) / 1000;
}

export function yearlyCost(kwh: number, price = 0.2001) {
  return kwh * price;
}

export function coverageAlongLength(fixture: FixtureSetup) {
  return Math.min(100, (fixture.lengthCm / TENT.lengthCm) * 100);
}
