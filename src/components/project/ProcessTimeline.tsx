import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface ProcessPhase {
  phase: string
  description: string
  detail?: string
  diagramNode?: React.ReactNode
}

interface Props {
  phases: ProcessPhase[]
}

const phaseColors: Record<string, string> = {
  Research: 'bg-stone-100',
  Define:   'bg-amber-50',
  Design:   'bg-sky-50',
  Validate: 'bg-emerald-50',
}

export default function ProcessTimeline({ phases }: Props) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-0">
      {/* Desktop: horizontal connector row */}
      <div className="hidden md:flex items-stretch gap-0 mb-0">
        {phases.map((p, i) => (
          <div key={p.phase} className="flex items-center flex-1">
            <button
              onClick={() => setOpen(open === p.phase ? null : p.phase)}
              className={`w-full text-left border rounded-xl p-5 transition-all duration-200 group
                ${open === p.phase
                  ? `${phaseColors[p.phase] ?? 'bg-stone-50'} border-ink/20`
                  : 'border-border bg-white hover:border-ink/20'}`}
            >
              <span className="text-[10px] uppercase tracking-widest text-muted block mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-ink block mb-1">{p.phase}</span>
              <span className="text-xs text-muted leading-snug">{p.description}</span>
              <span className={`block mt-3 text-[10px] text-muted transition-opacity ${open === p.phase ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
                {p.detail || p.diagramNode ? 'Click to expand ↓' : ''}
              </span>
            </button>
            {/* Arrow between cards */}
            {i < phases.length - 1 && (
              <span className="text-border text-lg px-2 shrink-0 select-none">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden divide-y divide-border border border-border rounded-xl overflow-hidden">
        {phases.map((p, i) => (
          <div key={p.phase}>
            <button
              onClick={() => setOpen(open === p.phase ? null : p.phase)}
              className={`w-full text-left px-5 py-4 flex items-center justify-between transition-colors
                ${open === p.phase ? phaseColors[p.phase] ?? 'bg-stone-50' : 'bg-white'}`}
            >
              <div>
                <span className="text-[10px] text-muted uppercase tracking-widest">{String(i + 1).padStart(2, '0')} · </span>
                <span className="text-sm font-medium text-ink">{p.phase}</span>
                <p className="text-xs text-muted mt-0.5">{p.description}</p>
              </div>
              <span className={`text-muted text-base transition-transform duration-200 ml-4 shrink-0 ${open === p.phase ? 'rotate-180' : ''}`}>⌄</span>
            </button>
          </div>
        ))}
      </div>

      {/* Expanded detail panel — shared, appears below the row */}
      <AnimatePresence>
        {open && (() => {
          const phase = phases.find(p => p.phase === open)
          if (!phase || (!phase.detail && !phase.diagramNode)) return null
          return (
            <motion.div
              key={open}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`mt-3 rounded-xl border border-border p-6 md:p-8 ${phaseColors[open] ?? 'bg-stone-50'}`}>
                {phase.diagramNode && (
                  <div className="mb-6">{phase.diagramNode}</div>
                )}
                {phase.detail && (
                  <p className="text-sm text-ink leading-relaxed">{phase.detail}</p>
                )}
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
