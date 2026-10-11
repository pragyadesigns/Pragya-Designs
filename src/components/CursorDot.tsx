import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function CursorDot() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 900, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 900, damping: 40, mass: 0.4 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-9999 hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div className="h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
    </motion.div>
  )
}
