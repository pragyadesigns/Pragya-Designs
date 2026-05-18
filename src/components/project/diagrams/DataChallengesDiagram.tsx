import { motion } from 'framer-motion'

const challenges = [
  {
    id: '01',
    title: 'Data readiness',
    issue: 'Yardi integration incomplete at design time — some data pipelines not yet built.',
    resolution: 'Created parallel "present" and "future" page versions. Backlogged data requirements so engineering could ship incrementally.',
    tag: 'Strategy',
  },
  {
    id: '02',
    title: 'Inconsistent data entry',
    issue: 'Optional fields (e.g. call minutes) were left blank or rounded. Pipeline stage transitions were sometimes skipped by sales staff, causing incorrect funnel counts.',
    resolution: 'Removed reliance on unreliable fields as primary metrics. Added data quality caveats in the UI where relevant.',
    tag: 'Data Quality',
  },
  {
    id: '03',
    title: 'UI constraints',
    issue: 'Power BI pages: max 4–5 visuals, no vertical scroll. Every page had to tell a complete story without overwhelming users.',
    resolution: 'Treated the constraint as editorial discipline. Each page became a tight narrative unit with outlinks to deeper pages for follow-on inquiry.',
    tag: 'Design Constraint',
  },
]

export default function DataChallengesDiagram() {
  return (
    <div className="w-full space-y-3">
      <p className="text-[10px] uppercase tracking-widest text-muted mb-4">Challenges encountered & responses</p>
      {challenges.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
          className="border border-border rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Issue */}
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] text-muted">{c.id}</span>
                <span className="text-[9px] uppercase tracking-widest border border-border rounded-full px-2 py-0.5 text-muted">{c.tag}</span>
              </div>
              <p className="text-xs font-medium text-ink mb-1.5">{c.title}</p>
              <p className="text-xs text-muted leading-relaxed">{c.issue}</p>
            </div>
            {/* Resolution */}
            <div className="px-5 py-4 bg-stone-50">
              <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Response</p>
              <p className="text-xs text-ink leading-relaxed">{c.resolution}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
