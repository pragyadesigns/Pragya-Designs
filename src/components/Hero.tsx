import { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { buildPixels, drawPixels, P, type PixelData } from '@/lib/pixelHistogram'

const CANVAS_MAX_W = 960
const CANVAS_H = 250
const CANVAS_H_SM = 180
const AUTOPLAY_HOLD = 0.9 // seconds held at chaos on load before settling

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const kickRef = useRef<() => void>(() => {})

  // The slider value is state because it drives the thumb. Everything the rAF
  // loop reads lives in refs, so a frame never causes a re-render.
  const [slider, setSlider] = useState(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const sliderRef = useRef(0)
  const touchedRef = useRef(false)
  const phraseHoverRef = useRef(false)
  const hoverBarRef = useRef(-1)
  const hoverAmtRef = useRef(0)
  const sRef = useRef(0)
  const dataRef = useRef<PixelData | null>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const startRef = useRef(0)

  const nudge = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v))
    touchedRef.current = true
    sliderRef.current = clamped
    setSlider(clamped)
    kickRef.current()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      sRef.current = 1
      sliderRef.current = 1
      touchedRef.current = true
      setSlider(1)
    }

    let raf = 0
    let visible = true
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = Math.min(CANVAS_MAX_W, wrap.clientWidth)
      h = window.innerWidth < 640 ? CANVAS_H_SM : CANVAS_H
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dataRef.current = buildPixels(w, h)
    }

    const frame = (ms: number) => {
      if (!startRef.current) startRef.current = ms
      const t = (ms - startRef.current) / 1000
      const data = dataRef.current
      if (!data) return

      const autoplay = !touchedRef.current && t < AUTOPLAY_HOLD
      const target = phraseHoverRef.current
        ? 1
        : autoplay
          ? 0
          : touchedRef.current
            ? sliderRef.current
            : 1
      sRef.current += (target - sRef.current) * (touchedRef.current ? 0.06 : 0.018)

      hoverAmtRef.current += ((hoverBarRef.current >= 0 ? 1 : 0) - hoverAmtRef.current) * 0.08

      const shown = draggingRef.current ? sliderRef.current : sRef.current
      const pct = Math.min(1, Math.max(0, shown)) * 100
      if (fillRef.current) fillRef.current.style.width = pct + '%'
      if (thumbRef.current) thumbRef.current.style.left = pct + '%'

      ctx.clearRect(0, 0, w, h)
      const freeze = reduce || pausedRef.current
      drawPixels(ctx, data, sRef.current, hoverBarRef.current, hoverAmtRef.current, freeze ? 0 : t)

      const animating =
        Math.abs(target - sRef.current) > 0.001 ||
        Math.abs((hoverBarRef.current >= 0 ? 1 : 0) - hoverAmtRef.current) > 0.002 ||
        // Flicker only shows while pixels are still travelling.
        (!freeze && sRef.current < 0.999)
      if (!animating || !visible) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame)
    }
    kickRef.current = kick

    resize()
    kick()

    const ro = new ResizeObserver(() => {
      resize()
      kick()
    })
    ro.observe(wrap)

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) {
          kick()
        } else if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const data = dataRef.current
      if (!data) return
      const r = canvas.getBoundingClientRect()
      const bar = Math.floor((e.clientX - r.left) / P / 2 - data.x0 / 2)
      hoverBarRef.current = bar >= 0 && bar < data.barCount ? bar : -1
      kick()
    }
    const onLeave = () => {
      hoverBarRef.current = -1
      kick()
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section className="flex min-h-[74vh] flex-col items-center px-6 pt-[150px] pb-16 md:px-10">
      <div ref={wrapRef} className="flex w-full max-w-240 justify-center">
        <canvas ref={canvasRef} aria-hidden className="block cursor-crosshair" />
      </div>

      <div className="mt-7 flex items-center gap-3.5">
        <StepButton onClick={() => nudge(0)}>Chaos</StepButton>
        <Slider
          value={slider}
          onChange={nudge}
          fillRef={fillRef}
          thumbRef={thumbRef}
          onDragChange={(d) => {
            draggingRef.current = d
            kickRef.current()
          }}
        />
        <StepButton onClick={() => nudge(1)}>Clarity</StepButton>
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? 'Resume pixel motion' : 'Pause pixel motion'}
          title={paused ? 'Resume motion' : 'Pause motion'}
          onClick={() => {
            pausedRef.current = !pausedRef.current
            setPaused(pausedRef.current)
            kickRef.current()
          }}
          className="rounded-md border border-border bg-card p-1.5 text-muted-foreground transition-colors duration-150 hover:border-ring hover:bg-muted hover:text-foreground"
        >
          {paused ? <Play size={12} strokeWidth={1.8} /> : <Pause size={12} strokeWidth={1.8} />}
        </button>
      </div>

      <div className="mt-[60px] flex w-full max-w-160 flex-col items-center gap-7">
        <h1 className="text-center text-heading-32 text-balance text-muted-foreground">
          <span className="text-foreground">I design </span>
          {/* Hidden easter egg — hovering the phrase pulls the chart to clarity,
              deliberately with no visual affordance. */}
          <span
            className="text-foreground"
            onPointerEnter={() => {
              phraseHoverRef.current = true
              kickRef.current()
            }}
            onPointerLeave={() => {
              phraseHoverRef.current = false
              kickRef.current()
            }}
          >
            analytics platforms
          </span>
          <span> that turn complex data into clear decisions.</span>
        </h1>

        <StatusLine />
      </div>
    </section>
  )
}

function StepButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-border bg-card px-2.5 py-1.5 text-label-12 text-muted-foreground transition-colors duration-150 hover:border-ring hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  )
}

function Slider({
  value,
  onChange,
  fillRef,
  thumbRef,
  onDragChange,
}: {
  value: number
  onChange: (v: number) => void
  fillRef: React.RefObject<HTMLDivElement | null>
  thumbRef: React.RefObject<HTMLDivElement | null>
  onDragChange: (dragging: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const setFromX = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    onChange((clientX - r.left) / r.width)
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Chaos to clarity"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      tabIndex={0}
      // The whole 160x12 row is the hit area, not just the 2px track.
      className="relative h-3 w-40 cursor-pointer touch-none"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        onDragChange(true)
        setFromX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromX(e.clientX)
      }}
      onPointerUp={() => onDragChange(false)}
      onPointerCancel={() => onDragChange(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onChange(value + 0.1)
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onChange(value - 0.1)
        else if (e.key === 'Home') onChange(0)
        else if (e.key === 'End') onChange(1)
        else return
        e.preventDefault()
      }}
    >
      <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-border" />
      <div
        ref={fillRef}
        className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-ring"
        style={{ width: '0%' }}
      />
      <div
        ref={thumbRef}
        className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground transition-transform duration-150 hover:scale-120"
        style={{ left: '0%' }}
      />
    </div>
  )
}

/** Two lines in a 20px window; hovering slides the second up into view. */
function StatusLine() {
  return (
    <div className="group flex h-5 items-start gap-2 overflow-hidden">
      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-muted-foreground" />
      <div className="transition-transform duration-500 ease-[cubic-bezier(.65,0,.25,1)] group-hover:-translate-y-5">
        <p className="h-5 text-copy-14 text-muted-foreground">Currently building with AI-assisted workflows at MAQ Software</p>
        <p className="h-5 font-mono text-[12.5px] text-muted-foreground">
          Seattle, WA · 47.61° N, 122.33° W
        </p>
      </div>
    </div>
  )
}
