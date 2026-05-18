import { motion } from 'framer-motion'

// Shows the expansion of user access: from C-suite only → 5 user types
const before = ['C-Suite Operators']
const after = [
  { label: 'C-Suite Operators', note: 'existing' },
  { label: 'Regional Directors', note: 'new' },
  { label: 'Property Managers', note: 'new' },
  { label: 'Sales Staff', note: 'new' },
  { label: 'Maintenance Staff', note: 'new' },
]

export default function UserTypesDiagram() {
  return (
    <div className="w-full">
      <p className="text-[10px] uppercase tracking-widest text-muted mb-6">Expanding access</p>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

        {/* Before */}
        <div className="flex-1">
          <p className="text-[10px] text-muted mb-3 uppercase tracking-widest">Before</p>
          <div className="flex flex-col gap-2">
            {before.map((label) => (
              <div key={label} className="border border-border rounded-lg px-4 py-2.5 text-xs text-muted bg-white">
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-border text-2xl font-light hidden md:block">→</div>
        <div className="text-border text-xl font-light md:hidden">↓</div>

        {/* After */}
        <div className="flex-1">
          <p className="text-[10px] text-muted mb-3 uppercase tracking-widest">After</p>
          <div className="flex flex-col gap-2">
            {after.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                className={`border rounded-lg px-4 py-2.5 text-xs flex items-center justify-between gap-4
                  ${item.note === 'new'
                    ? 'border-ink/20 bg-ink text-white'
                    : 'border-border bg-white text-muted'}`}
              >
                <span>{item.label}</span>
                {item.note === 'new' && (
                  <span className="text-[9px] uppercase tracking-widest opacity-60">new</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
