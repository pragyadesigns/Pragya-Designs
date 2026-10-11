/**
 * Pixel-art histogram that scatters at "chaos" and stacks into bars at
 * "clarity". Ported from the Hero 5a handoff — the reference logic is the spec,
 * so the maths here is deliberately unchanged.
 */

/** Fixed decorative distribution (129 samples, 0..1), seeded so it never changes. */
const DIST = (() => {
  const N = 129
  const out: number[] = []
  let a = 1234567
  const rnd = () => {
    a = (a * 16807) % 2147483647
    return a / 2147483647
  }
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1)
    out.push(
      Math.min(
        1,
        0.08 +
          0.78 * Math.exp(-((x - 0.42) ** 2) / 0.018) +
          0.42 * Math.exp(-((x - 0.72) ** 2) / 0.006) +
          0.14 * Math.exp(-((x - 0.15) ** 2) / 0.004) +
          (rnd() - 0.5) * 0.12,
      ),
    )
  }
  return out.map((v) => Math.max(0.04, v))
})()

/** The three lightest stone shades the static flickers between, plus stone-500. */
const STONE = ['#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c']
const SETTLED = '#d6d3d1'
const BAR_HOVER = '#78716c'
const BAR_DIMMED = '#e7e5e4'

const hsh = (i: number, f: number) => {
  const x = Math.sin(i * 127.1 + f * 311.7) * 43758.5453
  return x - Math.floor(x)
}
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)
const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
const mix = (a: string, b: string, k: number) => {
  const A = hex(a)
  const B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`
}

/** Pitch, pixel size, bar width and gap — all in grid cells except P and C. */
export const P = 10
const C = 8
const BW = 1
const GAP = 1

type Pixel = { b: number; tx: number; ty: number; nx: number; ny: number; d: number; f: number }
type Noise = { nx: number; ny: number; f: number; d: number }
export type PixelData = {
  cols: number
  rows: number
  x0: number
  barCount: number
  pts: Pixel[]
  extra: Noise[]
}

export function buildPixels(w: number, h: number): PixelData {
  const cols = Math.floor(w / P)
  const rows = Math.floor(h / P)
  const NB = Math.floor((cols + GAP) / (BW + GAP))
  const x0 = Math.floor((cols - (NB * (BW + GAP) - GAP)) / 2)
  const maxR = rows - 2

  let a = 4242
  const rnd = () => {
    a = (a * 16807) % 2147483647
    return a / 2147483647
  }

  const pts: Pixel[] = []
  for (let b = 0; b < NB; b++) {
    const v = DIST[Math.round((b / (NB - 1)) * (DIST.length - 1))]
    const hgt = Math.max(1, Math.round(v * maxR))
    for (let r = 0; r < hgt; r++) {
      for (let c = 0; c < BW; c++) {
        pts.push({
          b,
          tx: x0 + b * (BW + GAP) + c,
          ty: rows - 1 - r,
          nx: Math.floor(rnd() * cols),
          ny: Math.floor(rnd() * rows),
          d: rnd() * 0.5,
          f: rnd(),
        })
      }
    }
  }

  const extra: Noise[] = []
  for (let i = 0; i < 520; i++) {
    extra.push({ nx: Math.floor(rnd() * cols), ny: Math.floor(rnd() * rows), f: rnd(), d: rnd() })
  }

  return { cols, rows, x0, barCount: NB, pts, extra }
}

/**
 * S: 0 (chaos) .. 1 (clarity). hoverBar: bar index or -1.
 * hoverAmt: 0..1, so the hover state fades rather than snapping. t: seconds.
 */
export function drawPixels(
  ctx: CanvasRenderingContext2D,
  data: PixelData,
  S: number,
  hoverBar: number,
  hoverAmt: number,
  t: number,
) {
  const Ns = 1 - S
  const fr = Math.floor(t * 6)

  // Background static — thins out early, and each mote has its own cutoff.
  for (let i = 0; i < data.extra.length; i++) {
    const e = data.extra[i]
    if (Ns < e.d * 0.6) continue
    const a = Math.min(1, Ns * Ns * 1.2)
    if (a < 0.02) continue
    ctx.globalAlpha = a
    ctx.fillStyle = STONE[Math.floor(hsh(i + 900, fr + Math.floor(e.f * 5)) * 3)]
    ctx.fillRect(e.nx * P, e.ny * P, C, C)
  }
  ctx.globalAlpha = 1

  for (let i = 0; i < data.pts.length; i++) {
    const p = data.pts[i]
    const k = ease(Math.max(0, Math.min(1, (S - p.d) / 0.5)))
    // Snapping to whole cells is what keeps the pixel feel.
    const x = Math.round(p.nx + (p.tx - p.nx) * k)
    const y = Math.round(p.ny + (p.ty - p.ny) * k)
    const nc = STONE[Math.floor(hsh(i, fr + Math.floor(p.f * 4)) * 3)]
    const settled =
      hoverAmt > 0.001
        ? mix(SETTLED, p.b === hoverBar ? BAR_HOVER : BAR_DIMMED, hoverAmt)
        : SETTLED
    ctx.fillStyle = k <= 0 ? nc : k >= 1 ? settled : mix(nc, settled, k)
    ctx.fillRect(x * P, y * P, C, C)
  }
}
