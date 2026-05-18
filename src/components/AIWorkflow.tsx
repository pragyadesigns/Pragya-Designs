import { useState } from 'react'
import { motion } from 'framer-motion'
import { workflowStages } from '../data/workflow'

const stageColors: Record<string, string> = {
  Research: 'bg-stone-100',
  Ideation: 'bg-amber-50',
  Design: 'bg-sky-50',
  Validate: 'bg-emerald-50',
}

export default function AIWorkflow() {
  const [activeStage, setActiveStage] = useState<string | null>(null)

  return (
    <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-muted mb-10">
        What's my AI workflow?
      </p>

      {/* Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 relative">
        {workflowStages.map((stage, i) => {
          const isActive = activeStage === stage.stage
          const bg = stageColors[stage.stage] ?? 'bg-gray-50'

          return (
            <div key={stage.stage} className="flex items-stretch md:contents">
              <motion.button
                className={`relative w-full md:mx-1.5 rounded-xl border transition-all duration-200 text-left p-5 cursor-pointer
                  ${isActive ? `${bg} border-ink/20` : 'border-border hover:border-ink/20 bg-white'}`}
                whileHover={{ y: -2 }}
                onClick={() =>
                  setActiveStage(isActive ? null : stage.stage)
                }
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const }}
              >
                {/* Step number */}
                <span className="text-[10px] text-muted tracking-widest uppercase mb-3 block">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Stage name */}
                <p className="text-sm font-medium text-ink mb-3">{stage.stage}</p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5">
                  {stage.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Description — shows on active */}
                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-xs text-muted leading-relaxed mt-4">
                    {stage.description}
                  </p>
                </motion.div>
              </motion.button>

              {/* Arrow connector — desktop only, not after last item */}
              {i < workflowStages.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-4 shrink-0 text-border text-lg select-none">
                  →
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted mt-6">
        Click a stage to learn more
      </p>
    </section>
  )
}
