import { useEffect, useRef } from 'react'

const CELL = 25
const BASE_ALPHA = 0.03
const HOVER_EXTRA_ALPHA = 0.08
const RADIUS = 160

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const buildPath = (width: number, height: number) => {
      ctx.beginPath()
      for (let y = 0; y <= height; y += CELL) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      for (let x = 0; x <= width; x += CELL) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
    }

    const draw = () => {
      const { width, height } = canvas
      const { x: mx, y: my } = mouseRef.current
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1

      // Base grid — all lines at low opacity
      buildPath(width, height)
      ctx.strokeStyle = `rgba(0,0,0,${BASE_ALPHA})`
      ctx.stroke()

      // Hover overlay — radial gradient centered on cursor, additively brightens nearby lines
      if (mx > -9000) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS)
        grad.addColorStop(0, `rgba(0,0,0,${HOVER_EXTRA_ALPHA})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        buildPath(width, height)
        ctx.strokeStyle = grad
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
