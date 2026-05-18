import { motion } from 'framer-motion'

// Abstracted L1 → L2 → L3 information architecture tree
// Represents the restructured page hierarchy (not Welltower-specific labels)

const tree = {
  label: 'Vertical Overview',
  level: 'L1',
  children: [
    {
      label: 'Sub-vertical A',
      level: 'L2',
      children: [
        { label: 'Trend View', level: 'L3' },
        { label: 'Unit Detail', level: 'L3' },
        { label: 'Budget View', level: 'L3' },
      ],
    },
    {
      label: 'Sub-vertical B',
      level: 'L2',
      children: [
        { label: 'Pipeline Table', level: 'L3' },
        { label: 'Stage Detail', level: 'L3' },
      ],
    },
    {
      label: 'Sub-vertical C',
      level: 'L2',
      children: [
        { label: 'Activity Log', level: 'L3' },
        { label: 'Conversion View', level: 'L3' },
      ],
    },
  ],
}

const levelColors: Record<string, string> = {
  L1: 'bg-ink text-white border-ink',
  L2: 'bg-stone-100 text-ink border-border',
  L3: 'bg-white text-muted border-border',
}

const levelLabel: Record<string, string> = {
  L1: 'Vertical overview',
  L2: 'Sub-vertical summary',
  L3: 'Granular detail',
}

export default function HierarchyDiagram() {
  return (
    <div className="w-full overflow-x-auto">
      <p className="text-[10px] uppercase tracking-widest text-muted mb-6">Information architecture</p>

      {/* Legend */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {(['L1', 'L2', 'L3'] as const).map((l) => (
          <div key={l} className="flex items-center gap-2">
            <span className={`text-[9px] px-2 py-0.5 rounded border font-medium ${levelColors[l]}`}>{l}</span>
            <span className="text-[10px] text-muted">{levelLabel[l]}</span>
          </div>
        ))}
      </div>

      {/* Tree — horizontal scroll on small screens */}
      <div className="flex items-start gap-0 min-w-[560px]">

        {/* L1 */}
        <div className="flex flex-col items-center justify-center pt-[72px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`border rounded-lg px-4 py-3 text-xs font-medium text-center w-[120px] ${levelColors['L1']}`}
          >
            <span className="text-[9px] opacity-60 block mb-0.5 font-normal">L1</span>
            {tree.label}
          </motion.div>
        </div>

        {/* Connector L1→L2 */}
        <div className="flex flex-col justify-center pt-[88px]">
          <div className="w-8 h-px bg-border" />
        </div>

        {/* L2 + L3 columns */}
        <div className="flex flex-col gap-3">
          {tree.children.map((l2, l2i) => (
            <div key={l2.label} className="flex items-center gap-0">

              {/* L2 node */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: l2i * 0.1, duration: 0.4 }}
                className={`border rounded-lg px-4 py-2.5 text-xs text-center w-[120px] ${levelColors['L2']}`}
              >
                <span className="text-[9px] text-muted block mb-0.5">L2</span>
                {l2.label}
              </motion.div>

              {/* Connector L2→L3 */}
              <div className="w-6 h-px bg-border" />

              {/* L3 nodes */}
              <div className="flex flex-col gap-1.5">
                {l2.children.map((l3, l3i) => (
                  <motion.div
                    key={l3.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: l2i * 0.1 + l3i * 0.06, duration: 0.35 }}
                    className={`border rounded-md px-3 py-1.5 text-[10px] w-[110px] ${levelColors['L3']}`}
                  >
                    <span className="text-[9px] text-muted/60 block">L3</span>
                    {l3.label}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pathway label */}
      <p className="text-[10px] text-muted mt-5 flex items-center gap-2">
        <span className="text-ink font-medium">Pathway:</span>
        Spot anomaly at L1 → understand it at L2 → investigate by property at L3 → take action
      </p>
    </div>
  )
}
