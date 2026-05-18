import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProblemStatement from '../components/project/ProblemStatement'
import DecisionCard from '../components/project/DecisionCard'

// ── Shared primitives ─────────────────────────────────────────────────────────
function Card({
  children,
  tone = 'white',
  className = '',
  padded = true,
}: {
  children: React.ReactNode
  tone?: 'white' | 'stone' | 'ink'
  className?: string
  padded?: boolean
}) {
  const toneClass =
    tone === 'stone'
      ? 'bg-stone-50 border-stone-200'
      : tone === 'ink'
      ? 'bg-ink border-ink text-white'
      : 'bg-white border-border'
  return (
    <div className={`rounded-2xl border overflow-hidden ${toneClass} ${padded ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="flex flex-col justify-between flex-1 min-h-[80px]">
      <span className="text-3xl font-light text-ink tracking-tight leading-none mb-2">{value}</span>
      <span className="text-xs text-muted leading-snug">{label}</span>
    </Card>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-widest text-muted mb-5">{children}</p>
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] uppercase tracking-widest text-muted mb-3">{kicker}</p>
      <h2 className="text-3xl md:text-4xl font-light text-ink leading-tight tracking-tight max-w-3xl">
        {title}
      </h2>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return <Navigate to="/" replace />

  const project = projects[index]
  const prev = projects[index - 1]
  const next = projects[index + 1]

  return (
    <main className="pt-20 pb-24 px-6 md:px-10 max-w-5xl mx-auto">

      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors mb-12"
      >
        <ArrowLeft size={13} /> Back to home
      </Link>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10"
      >
        {project.company && (
          <p className="text-[10px] uppercase tracking-widest text-muted mb-3">{project.company}</p>
        )}
        <h1 className="text-3xl md:text-5xl font-light text-ink leading-tight tracking-tight mb-4 max-w-3xl">
          {project.title}
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-2xl mb-8">{project.tagline}</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted">
          <span><span className="text-[10px] uppercase tracking-widest text-muted/60 mr-2">Role</span><span className="text-ink">{project.role}</span></span>
          <span><span className="text-[10px] uppercase tracking-widest text-muted/60 mr-2">Timeline</span><span className="text-ink">{project.timeline}</span></span>
          <span><span className="text-[10px] uppercase tracking-widest text-muted/60 mr-2">Tools</span><span className="text-ink">{project.tools.join(', ')}</span></span>
        </div>
        {project.metaNote && (
          <p className="mt-3 text-xs italic text-muted/80">{project.metaNote}</p>
        )}
      </motion.div>

      {/* ── Hero bento: image (2/3) + metrics (1/3) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-24"
      >
        <div className="md:col-span-3 rounded-2xl border border-border bg-stone-50 overflow-hidden flex items-center justify-center"
          style={{ minHeight: '320px' }}>
          {project.heroImage ? (
            <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <p className="text-xs text-muted">Hero image coming soon</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {project.metrics.map((m, i) => (
            <MetricCard key={i} value={m.value} label={m.label} />
          ))}
        </div>
      </motion.div>

      {/* ── Problem — full-width loose treatment ──────────────────────────── */}
      <section className="mb-24">
        <SectionLabel>The context</SectionLabel>
        <ProblemStatement text={project.problem} attribution={project.problemAttribution} />

        {project.problemHighlights && (
          <div className="mt-10 rounded-3xl bg-stone-50 border border-stone-200 p-8 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {project.problemHighlights.map((h) => (
                <div key={h.title} className="flex flex-col">
                  <div className="text-ink mb-5">{h.icon}</div>
                  <h3 className="text-lg md:text-xl font-medium text-ink leading-snug mb-3">
                    {h.title}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-relaxed text-muted">
                    {h.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── PROCESS — bespoke per-project layout ──────────────────────────── */}
      <section className="mb-24">
        {project.processNode}
      </section>

      {/* ── Key Decisions ─────────────────────────────────────────────────── */}
      {project.decisions.length > 0 && (
        <section className="mb-24">
          <SectionHeading kicker="Key decisions" title="Trade-offs that shaped the product" />
          <div className="space-y-3">
            {project.decisions.map((d, i) => (
              <DecisionCard key={d.title} {...d} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Final Design ──────────────────────────────────────────────────── */}
      {project.images.length > 0 && (
        <section className="mb-24">
          <SectionHeading kicker="Final design" title="Selected screens" />
          <div className="space-y-3">
            {project.images.map((src, i) => (
              <div key={i} className="rounded-2xl border border-border overflow-hidden">
                <img src={src} alt={`${project.title} — screen ${i + 1}`} className="w-full block" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Outcome — Resend-style dark panel ─────────────────────────────── */}
      <section className="mb-20">
        <div
          className={
            project.nextStepHighlights || project.nextSteps
              ? 'grid grid-cols-1 md:grid-cols-2 gap-3'
              : ''
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-3xl bg-stone-50 border border-stone-200 overflow-hidden p-8 md:p-14"
          >
            <p className="text-[10px] uppercase tracking-widest text-muted mb-5">Outcome</p>
            {project.outcomeTitle && (
              <h2 className="text-3xl md:text-5xl font-light leading-[1.05] tracking-tight text-ink mb-10 md:mb-14 max-w-2xl">
                {project.outcomeTitle}
              </h2>
            )}

            {project.outcomeHighlights ? (
              <div className={`grid grid-cols-1 gap-8 md:gap-10 pt-2 ${
                project.outcomeHighlights.length >= 3 ? 'md:grid-cols-3' : project.outcomeHighlights.length === 2 ? 'md:grid-cols-2' : ''
              }`}>
                {project.outcomeHighlights.map((h) => (
                  <div key={h.title} className="flex flex-col">
                    <div className="text-ink mb-5">{h.icon}</div>
                    <h3 className="text-lg md:text-xl font-medium text-ink leading-snug mb-3">
                      {h.title}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed text-muted">
                      {h.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base md:text-[17px] leading-relaxed text-muted max-w-2xl">
                {project.outcome}
              </p>
            )}
          </motion.div>

          {(project.nextStepHighlights || project.nextSteps) && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-3xl bg-stone-50 border border-stone-200 overflow-hidden p-8 md:p-14 flex flex-col"
            >
              <p className="text-[10px] uppercase tracking-widest text-muted mb-5">Next steps</p>
              {project.nextStepHighlights ? (
                <div className="space-y-8 md:space-y-10 pt-2">
                  {project.nextStepHighlights.map((h) => (
                    <div key={h.title} className="flex flex-col">
                      <div className="text-ink mb-5">{h.icon}</div>
                      <h3 className="text-lg md:text-xl font-medium text-ink leading-snug mb-3">
                        {h.title}
                      </h3>
                      <p className="text-sm md:text-[15px] leading-relaxed text-muted">
                        {h.body}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {project.nextSteps!.map((s) => (
                    <li key={s} className="text-sm text-muted flex items-start gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </div>

        {/* Lessons strip — unchanged */}
        {project.lessons && (
          <div className="mt-3">
            <Card>
              <SectionLabel>Lessons learned</SectionLabel>
              <ul className="space-y-3">
                {project.lessons.map((l) => (
                  <li key={l} className="text-xs text-muted flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-muted shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </section>

      {/* ── Prev / Next ───────────────────────────────────────────────────── */}
      <div className="border-t border-border mt-16 pt-8 flex justify-between gap-4">
        {prev ? (
          <Link to={`/projects/${prev.slug}`} className="group flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>
              <span className="block text-[10px] uppercase tracking-widest mb-0.5">Previous</span>
              {prev.title}
            </span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/projects/${next.slug}`} className="group flex items-center gap-2 text-xs text-muted hover:text-ink transition-colors text-right">
            <span>
              <span className="block text-[10px] uppercase tracking-widest mb-0.5">Next</span>
              {next.title}
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </main>
  )
}
