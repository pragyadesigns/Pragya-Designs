import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-12 px-6 md:px-10 max-w-5xl mx-auto">
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-6 flex items-center gap-2 text-sm text-muted"
      >
        <MapPin size={13} className="shrink-0" />
        <span>Designer at MAQ Software in Seattle, WA</span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-6xl lg:text-5xl font-light leading-[1.15] tracking-[-0.025em] text-ink"
      >
        I design AI-powered solutions and
        <br className="hidden md:block" />{' '}
        enterprise dashboards
        <br className="hidden md:block" />
        to help businesses unlock actionable insights.
      </motion.h1>

      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-12"
      >
        <a
          href="#work"
          className="text-sm text-muted hover:text-ink transition-colors underline underline-offset-4"
        >
          See my work ↓
        </a>
      </motion.div>
    </section>
  )
}
