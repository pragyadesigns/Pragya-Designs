import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

const skills = {
  'Design': ['Figma', 'Prototyping', 'User Research', 'Usability Testing', 'Information Architecture', 'Design Systems'],
  'AI Tools': ['ChatGPT', 'Figma AI', 'Midjourney', 'Galileo AI', 'Dovetail', 'Maze'],
  'Technical': ['React', 'TypeScript', 'Power BI', 'HTML/CSS', 'Storybook'],
}

export default function About() {
  return (
    <main className="pt-24 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <p className="text-xs tracking-widest uppercase text-muted mb-10">About</p>
      </motion.div>

      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="mb-16">
        <h1 className="text-3xl md:text-4xl font-light text-ink leading-tight tracking-tight mb-6">
          Hi, I'm Pragya.
        </h1>
        <div className="space-y-4 text-sm text-muted leading-relaxed max-w-prose">
          <p>
            I'm a UI/UX designer based in Seattle, WA, specializing in AI-powered enterprise dashboards.
            Currently designing React web apps for BI reporting platforms at MAQ Software.
          </p>
          <p>
            I hold a Master of Science in Information from the University of Michigan,
            where I developed a deep interest in the intersection of data, AI, and human-centered design.
          </p>
          <p>
            My work focuses on turning complex data into clear, actionable interfaces — making it easier for
            businesses to make decisions without needing to be data experts.
          </p>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mb-16">
        <p className="text-xs tracking-widest uppercase text-muted mb-8">Skills</p>
        <div className="space-y-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-8 md:gap-16">
              <p className="text-xs text-muted w-20 md:w-28 shrink-0 pt-0.5">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs border border-border rounded-full px-3 py-1 text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Resume */}
      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">Resume</p>
        <a
          href="/assets/pragya-joshi-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-ink border border-ink rounded-full px-5 py-2 hover:bg-ink hover:text-white transition-colors"
        >
          Download PDF ↗
        </a>
      </motion.div>
    </main>
  )
}
