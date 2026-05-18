import { motion } from 'framer-motion'

interface Props {
  value: string
  label: string
  index?: number
}

export default function MetricCallout({ value, label, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col gap-1 border border-border rounded-xl px-6 py-5 min-w-[120px]"
    >
      <span className="text-3xl md:text-4xl font-light text-ink tracking-tight leading-none">
        {value}
      </span>
      <span className="text-xs text-muted leading-snug max-w-[140px]">{label}</span>
    </motion.div>
  )
}
