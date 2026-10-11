import { motion } from 'motion/react'
import { Download } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export default function About() {
  return (
    <main className="pt-24 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-16">
        <h1 className="text-heading-32 md:text-heading-40 text-foreground mb-6">
          Hi, I'm Pragya.
        </h1>
        <div className="space-y-4 text-copy-14 text-muted-foreground max-w-prose">
          <p>
            At MAQ Software, I design AI-powered solutions and enterprise dashboards used by global
            teams. My role sits at the intersection of design, business, and engineering—translating
            technical workflows into interfaces people can actually use.
          </p>
        </div>
      </motion.div>

      {/* Resume */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
        {/* .docx can't render in a browser tab, so this downloads rather than opening. */}
        <a
          href="/assets/pragya-joshi-resume.docx"
          download
          className="inline-flex items-center gap-2 text-copy-14 text-foreground border border-foreground rounded-full pl-5 pr-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Resume
          <Download size={15} strokeWidth={1.8} />
        </a>
      </motion.div>
    </main>
  )
}
