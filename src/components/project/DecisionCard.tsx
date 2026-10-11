import { motion } from 'motion/react'

interface Props {
  title: string
  problem: string
  options: string[]
  choice: string
  rationale: string
  index?: number
}

export default function DecisionCard({ title, problem, options, choice, rationale, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="border border-border rounded-xl overflow-hidden"
    >
      {/* Title bar */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-label-12 text-muted-foreground mb-1">Design decision</p>
        <p className="text-copy-14 text-foreground">{title}</p>
      </div>

      {/* 3-column body */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Problem */}
        <div className="px-6 py-5">
          <p className="text-label-12 text-muted-foreground mb-3">The challenge</p>
          <p className="text-copy-13 text-foreground">{problem}</p>
        </div>

        {/* Options */}
        <div className="px-6 py-5">
          <p className="text-label-12 text-muted-foreground mb-3">Options considered</p>
          <ul className="space-y-2">
            {options.map((opt) => {
              const isChosen = opt === choice
              return (
                <li
                  key={opt}
                  className={`text-copy-13 flex items-start gap-2 ${isChosen ? 'text-foreground' : 'text-muted-foreground line-through decoration-muted/50'}`}
                >
                  <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${isChosen ? 'bg-foreground' : 'bg-border'}`} />
                  {opt}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Why */}
        <div className="px-6 py-5 bg-muted">
          <p className="text-label-12 text-muted-foreground mb-3">Why this choice</p>
          <p className="text-copy-13 text-foreground">{rationale}</p>
        </div>
      </div>
    </motion.div>
  )
}
