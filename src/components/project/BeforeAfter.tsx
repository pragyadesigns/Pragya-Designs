import { useRef, useState, useCallback } from 'react'

interface Props {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  alt?: string
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Before and after comparison',
}: Props) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100))
    setPosition(pct)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden border border-border select-none cursor-col-resize"
      onMouseMove={(e) => { if (dragging.current) move(e.clientX) }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* After (base layer) */}
      <img src={after} alt={alt} className="w-full block" draggable={false} />

      {/* Before (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img src={before} alt={alt} className="w-full block absolute inset-0 max-w-none" style={{ width: containerRef.current?.offsetWidth ?? '100%' }} draggable={false} />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-border flex items-center justify-center cursor-col-resize z-10"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => { e.preventDefault(); dragging.current = true }}
        onTouchStart={() => { dragging.current = true }}
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1 5h12M4 2L1 5l3 3M10 2l3 3-3 3" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
        {afterLabel}
      </span>
    </div>
  )
}
