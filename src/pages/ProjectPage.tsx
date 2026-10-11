import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProblemStatement from '../components/project/ProblemStatement'
import DecisionCard from '../components/project/DecisionCard'
import TocBar, { TocRail } from '../components/project/TableOfContents'

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
      ? 'bg-muted border-border'
      : tone === 'ink'
      ? 'bg-foreground border-foreground text-background'
      : 'bg-card border-border'
  return (
    <div className={`rounded-2xl border overflow-hidden ${toneClass} ${padded ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="flex h-full flex-col justify-between min-h-[96px]">
      <span className="text-heading-32 text-foreground mb-2">{value}</span>
      <span className="text-copy-13 text-muted-foreground">{label}</span>
    </Card>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-label-12 text-muted-foreground mb-5">{children}</p>
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-label-12 text-muted-foreground mb-3">{kicker}</p>
      <h2 className="text-heading-32 md:text-heading-40 text-foreground max-w-3xl">
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

  // Below xl the page is a single column exactly as before; at xl the shell widens
  // by the width of the rail so the content column keeps its original measure.
  return (
    <main className="pt-32 pb-24 px-6 md:px-10 max-w-5xl xl:max-w-328 mx-auto xl:grid xl:grid-cols-[11rem_minmax(0,1fr)] xl:gap-x-10">

      {/* Rail column — the back link heads the rail at xl, and is simply the page's
          back link below it, where the rail is hidden. */}
      <div className="xl:sticky xl:top-28 xl:self-start">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-copy-13 text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={13} /> Back to home
        </Link>
        <TocRail contentKey={project.slug} />
      </div>

      {/* Content column */}
      <div className="min-w-0">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10"
      >
        {project.company && (
          <p className="text-label-12 text-muted-foreground mb-3">{project.company}</p>
        )}
        <h1 className="text-heading-32 md:text-heading-48 text-foreground mb-4 max-w-3xl">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="text-copy-16 md:text-copy-18 text-muted-foreground max-w-2xl mb-8">{project.tagline}</p>
        )}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-copy-13 text-muted-foreground">
          <span><span className="text-label-12 text-muted-foreground/60 mr-2">Role</span><span className="text-foreground">{project.role}</span></span>
          {project.team && (
            <span><span className="text-label-12 text-muted-foreground/60 mr-2">Team</span><span className="text-foreground">{project.team}</span></span>
          )}
          <span><span className="text-label-12 text-muted-foreground/60 mr-2">Timeline</span><span className="text-foreground">{project.timeline}</span></span>
          <span><span className="text-label-12 text-muted-foreground/60 mr-2">Tools</span><span className="text-foreground">{project.tools.join(', ')}</span></span>
        </div>
        {project.metaNote && (
          <p className="mt-3 text-copy-13 italic text-muted-foreground/80">{project.metaNote}</p>
        )}
      </motion.div>

      {/* ── Hero image — spans the content column, no frame around it ───── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
        className="mb-8"
      >
        {project.heroImage ? (
          <img src={project.heroImage} alt={project.title} className="block w-full h-auto" />
        ) : (
          <div className="flex h-80 items-center justify-center bg-muted">
            <p className="text-copy-13 text-muted-foreground">Hero image coming soon</p>
          </div>
        )}
      </motion.div>

      {/* ── KPIs — one row ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-24"
      >
        {project.metrics.map((m, i) => (
          <MetricCard key={i} value={m.value} label={m.label} />
        ))}
      </motion.div>

      {/* ── Jumplinks — self-assembles from [data-toc] sections ──────────── */}
      <TocBar contentKey={project.slug} />

      {/* ── Per-project pre-context slot (e.g. TL;DR + KPIs) ─────────────── */}
      {project.preContextNode && (
        <div className="mb-24" data-toc="Overview">{project.preContextNode}</div>
      )}

      {/* ── Problem — full-width loose treatment ──────────────────────────── */}
      <section className="mb-24" data-toc="Context">
        <SectionLabel>Context</SectionLabel>
        <ProblemStatement text={project.problem} attribution={project.problemAttribution} />

        {project.problemHighlights && (
          <div className="mt-10 rounded-3xl bg-muted border border-border p-8 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {project.problemHighlights.map((h) => (
                <div key={h.title} className="flex flex-col">
                  <div className="text-foreground mb-5">{h.icon}</div>
                  <h3 className="text-heading-16 md:text-heading-20 text-foreground mb-3">
                    {h.title}
                  </h3>
                  <p className="text-copy-14 md:text-copy-16 text-muted-foreground">
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
        <section className="mb-24" data-toc="Key decisions">
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
        <section className="mb-24" data-toc="Final design">
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
      <section className="mb-20" data-toc="Outcome">
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
            className="rounded-3xl bg-muted border border-border overflow-hidden p-8 md:p-14"
          >
            <p className="text-label-12 text-muted-foreground mb-5">Outcome</p>
            {project.outcomeTitle && (
              <h2 className="text-heading-32 md:text-heading-48 text-foreground mb-10 md:mb-14 max-w-2xl">
                {project.outcomeTitle}
              </h2>
            )}

            {project.outcomeHighlights ? (
              <div className={`grid grid-cols-1 gap-8 md:gap-10 pt-2 ${
                project.outcomeHighlights.length >= 3 ? 'md:grid-cols-3' : project.outcomeHighlights.length === 2 ? 'md:grid-cols-2' : ''
              }`}>
                {project.outcomeHighlights.map((h) => (
                  <div key={h.title} className="flex flex-col">
                    <div className="text-foreground mb-5">{h.icon}</div>
                    <h3 className="text-heading-16 md:text-heading-20 text-foreground mb-3">
                      {h.title}
                    </h3>
                    <p className="text-copy-14 md:text-copy-16 text-muted-foreground">
                      {h.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-copy-16 md:text-copy-18 text-muted-foreground max-w-2xl">
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
              className="rounded-3xl bg-muted border border-border overflow-hidden p-8 md:p-14 flex flex-col"
            >
              <p className="text-label-12 text-muted-foreground mb-5">Next steps</p>
              {project.nextStepHighlights ? (
                <div className="space-y-8 md:space-y-10 pt-2">
                  {project.nextStepHighlights.map((h) => (
                    <div key={h.title} className="flex flex-col">
                      <div className="text-foreground mb-5">{h.icon}</div>
                      <h3 className="text-heading-16 md:text-heading-20 text-foreground mb-3">
                        {h.title}
                      </h3>
                      <p className="text-copy-14 md:text-copy-16 text-muted-foreground">
                        {h.body}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {project.nextSteps!.map((s) => (
                    <li key={s} className="text-copy-14 text-muted-foreground flex items-start gap-2.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
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
                  <li key={l} className="text-copy-13 text-muted-foreground flex items-start gap-2.5">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
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
          <Link to={`/projects/${prev.slug}`} className="group flex items-center gap-2 text-copy-13 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>
              <span className="block text-label-12 mb-0.5">Previous</span>
              {prev.title}
            </span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/projects/${next.slug}`} className="group flex items-center gap-2 text-copy-13 text-muted-foreground hover:text-foreground transition-colors text-right">
            <span>
              <span className="block text-label-12 mb-0.5">Next</span>
              {next.title}
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </div>

      </div>{/* /Content column */}
    </main>
  )
}
