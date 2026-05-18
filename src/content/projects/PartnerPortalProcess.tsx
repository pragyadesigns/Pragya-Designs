import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Shapes, Eye, Route } from 'lucide-react'
import DiagramPlaceholder from '../../components/project/DiagramPlaceholder'
import MindmapToPriority from '../../components/MindmapToPriority'

// ── Shared primitives ─────────────────────────────────────────────────────────
function PhaseHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] uppercase tracking-widest text-muted mb-3">
        Phase {String(index).padStart(2, '0')}
      </p>
      <h3 className="text-2xl md:text-3xl font-light text-ink leading-tight tracking-tight max-w-3xl">
        {title}
      </h3>
    </div>
  )
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-widest text-muted mb-3">{children}</p>
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted leading-relaxed">{children}</p>
}

function Card({
  children,
  tone = 'white',
  className = '',
}: {
  children: React.ReactNode
  tone?: 'white' | 'stone' | 'ink'
  className?: string
}) {
  const toneClass =
    tone === 'stone'
      ? 'bg-stone-50 border-stone-200'
      : tone === 'ink'
      ? 'bg-ink border-ink text-white'
      : 'bg-white border-border'
  return (
    <div className={`rounded-2xl border overflow-hidden ${toneClass} ${className}`}>
      {children}
    </div>
  )
}

// ── Bento card for the "look and feel" grid ───────────────────────────────────
function BentoCard({
  title,
  body,
  diagramLabel,
  image,
  note,
  tag,
  className = '',
}: {
  title: string
  body: string
  diagramLabel: string
  image?: string
  note?: string
  tag?: string
  className?: string
}) {
  return (
    <Card tone="stone" className={`p-5 flex flex-col ${className}`}>
      <div className="mb-4">
        {image ? (
          <div className="w-full rounded-xl overflow-hidden bg-white border border-border aspect-[16/10] flex items-center justify-center">
            <img src={image} alt={diagramLabel} className="w-full h-full object-contain" />
          </div>
        ) : (
          <DiagramPlaceholder label={diagramLabel} aspectRatio="16/10" />
        )}
      </div>
      {tag && (
        <span className="inline-flex self-start items-center px-2 py-0.5 rounded-full bg-white border border-stone-200 text-[10px] text-muted mb-2">
          {tag}
        </span>
      )}
      <p className="text-sm font-medium text-ink mb-1.5">{title}</p>
      <p className="text-xs text-muted leading-relaxed">{body}</p>
      {note && (
        <div className="mt-3 pt-3 border-t border-stone-200">
          <p className="text-[10px] uppercase tracking-widest text-muted mb-1">
            Redesigned for accessibility
          </p>
          <p className="text-xs text-muted leading-relaxed">{note}</p>
        </div>
      )}
    </Card>
  )
}

// ── Main process node ─────────────────────────────────────────────────────────
export default function PartnerPortalProcess() {
  const considerations: {
    key: string
    label: string
    intro: string
    subpoints: { key: string; title: string; body: string; diagramLabel: string; image?: string }[]
  }[] = [
    {
      key: 'compact',
      label: 'Compact layouts',
      intro:
        "Users don't scroll much, so everything had to earn its vertical real estate.",
      subpoints: [
        {
          key: 'compact-components',
          title: 'Components were designed to be compact',
          body:
            'Components used tighter padding, smaller type scales, and smaller images.',
          diagramLabel: 'Compact component library',
          image: '/images/partner-portal/compact-components.png',
        },
        {
          key: 'compact-home',
          title: 'Home pages carried minimal information',
          body:
            'Home pages were designed to establish context quickly and direct partners onward by bringing the most critical pathways to the surface — such as updates, time-sensitive events, and skilling resources.',
          diagramLabel: 'Home page as launch point',
          image: '/images/partner-portal/compact-home.png',
        },
        {
          key: 'compact-accordion',
          title: 'Go-to-market pages collapsed sections using accordions',
          body:
            'Accordions reduced the vertical height of the page and let partners focus on the content block they were actually working through.',
          diagramLabel: 'Accordion — one section open at a time',
          image: '/images/partner-portal/compact-accordion.png',
        },
      ],
    },
  ]

  const active = considerations[0]
  const [activeSubKey, setActiveSubKey] = useState(active.subpoints[0].key)
  const activeSub =
    active.subpoints.find((s) => s.key === activeSubKey) ?? active.subpoints[0]

  const criticalSubpoints: { key: string; title: string; body: string; diagramLabel: string; image?: string }[] = [
    {
      key: 'critical-cta',
      title: 'CTAs pulled into hero sections',
      body:
        'We moved critical actions, such as form completion and engagement guideline reviews, into the hero section to keep them visible above the fold.',
      diagramLabel: 'Hero with primary CTA',
      image: '/images/partner-portal/critical-cta.png',
    },
    {
      key: 'critical-updates',
      title: 'Partner updates promoted to the top of home pages',
      body:
        'Returning partners come back for news — what is new, what is launching, what has changed. That belt now sits at the top of home pages so nobody has to hunt for it.',
      diagramLabel: 'Partner updates belt above the fold',
      image: '/images/partner-portal/critical-updates.png',
    },
  ]
  const [criticalSubKey, setCriticalSubKey] = useState(criticalSubpoints[0].key)
  const criticalActiveSub =
    criticalSubpoints.find((s) => s.key === criticalSubKey) ?? criticalSubpoints[0]

  return (
    <div className="space-y-24">

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 01 — Mapping the ecosystem
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={1} title="Mapping the ecosystem" />

        <div className="max-w-3xl mb-10">
          <Body>
            We mapped the full ecosystem of pages across every product area and prioritized which
            page templates needed to be designed first — the ones with the highest partner traffic
            and the ones that would unblock the most downstream work.
          </Body>
        </div>

        {(() => {
          const columns: { title: string; children?: string[] }[] = [
            {
              title: 'Go to Market',
              children: [
                'Frontier Transformation',
                'Solution Play Overview',
                'Copilot & Agents at Work',
                'Secure AI Productivity',
                'Cloud & AI Endpoints',
                'Converged Communications',
                'Low Code AI & Agents',
                'Sales Transformation',
                'Service Transformation',
                'ERP Transformation',
                'Business Central',
              ],
            },
            { title: 'Cloud Solution Provider' },
            {
              title: 'Engagements',
              children: [
                'Engagements Overview',
                'Copilot & Agents at Work',
                'Secure AI Productivity',
                'Cloud & AI Endpoints',
                'Converged Communications',
                'Low Code AI & Agents',
                'Sales Transformation',
                'Service Transformation',
                'ERP Transformation',
                'Business Central',
              ],
            },
            {
              title: 'Skilling',
              children: ['Skilling Overview', 'Events'],
            },
            { title: 'Partner Buzz' },
            {
              title: 'Resources',
              children: [
                'Resource Library',
                'Blog',
                'FastTrack',
                'Partner Success Stories',
                'Partner Directories',
              ],
            },
          ]
          const nodeClass =
            'px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center'
          return (
            <div>
              {/* Root node */}
              <div className="flex justify-center">
                <div className={nodeClass + ' px-5 py-3'}>
                  <p className="text-sm font-medium text-ink leading-snug">
                    AI Business Solutions Home Page
                  </p>
                </div>
              </div>

              {/* Connector down to bus */}
              <div className="flex justify-center" aria-hidden>
                <span className="block w-px h-6 bg-stone-300" />
              </div>

              {/* Columns */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
                {columns.map((col) => (
                  <div key={col.title} className="flex flex-col items-stretch gap-2">
                    <div className={nodeClass}>
                      <p className="text-sm font-medium text-ink leading-snug">{col.title}</p>
                    </div>
                    {col.children && (
                      <>
                        <div className="flex justify-center" aria-hidden>
                          <span className="block w-px h-3 bg-stone-300" />
                        </div>
                        <div className="flex flex-col gap-2">
                          {col.children.map((child) => (
                            <div key={child} className={nodeClass}>
                              <p className="text-sm font-medium text-ink leading-snug">{child}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 02 — Page redesign process (8-step pipeline)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={2} title="Page redesign process" />

        <p className="text-base text-ink leading-relaxed max-w-3xl mb-10">
          Every page moved from conception to deployment through a 2-3 week sprint with design,
          content, and engineering staying in sync.
        </p>

        {/* Pipeline header pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-col items-center px-6 py-3 rounded-3xl bg-stone-50 border border-stone-200 text-center">
            <span className="text-sm font-medium text-ink">
              Estimated total: ~2–3 weeks per page
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted mt-1">
              Tracked end-to-end in
              <img
                src="/images/partner-portal/Azure%20DevOps.png"
                alt="Azure DevOps"
                className="h-4 w-auto"
              />
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto">
          {[
            { n: 1, title: 'Information architecture & layout', body: 'Template, content hierarchy, component mapping', time: '~1 day' },
            { n: 2, title: 'Content acquisition', body: 'Stakeholder-supplied copy per section', time: '~2–5 days' },
            { n: 3, title: 'Initial design review', body: 'High-fidelity comp with live copy & UI specs', time: '~1 day' },
            { n: 4, title: 'Design iteration & refinement', body: 'Structured feedback cycles with stakeholders', time: '~3–5 days', loopBack: true },
            { n: 5, title: 'Development handoff', body: 'Assigned & scoped in Azure DevOps', time: '~1 day' },
            { n: 6, title: 'UX-dev collaboration', body: 'Implementation guidance & fidelity review', time: '~1–2 days' },
            { n: 7, title: 'Stakeholder acceptance', body: 'Final review & formal sign-off', time: '~1–2 days' },
            { n: 8, title: 'Production deployment', body: 'Page published to live environment', time: '' },
          ].map((step, i, arr) => (
            <div key={step.n}>
              <Card tone="stone" className="p-5 relative">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-medium text-muted shrink-0">
                    {String(step.n).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-base font-medium text-ink leading-snug">{step.title}</p>
                      {step.time && (
                        <span className="text-xs text-muted whitespace-nowrap shrink-0">
                          {step.time}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed mt-0.5">{step.body}</p>
                  </div>
                </div>
                {step.loopBack && (
                  <span
                    aria-hidden
                    className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-xs text-muted"
                    title="Loops back to step 3"
                  >
                    ↻
                  </span>
                )}
              </Card>
              {i < arr.length - 1 && (
                <div className="flex justify-center py-2" aria-hidden>
                  <span className="block w-px h-5 bg-stone-300" />
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 03 — Defining the look and feel (5-card bento grid)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={3} title="Defining the look and feel" />
        <p className="text-base text-ink leading-relaxed max-w-3xl mb-10">
          The previous site had drifted from the client's design system and used visually dated
          components. The redesign established a modular system where any new page could be
          assembled from modern Fluent-based components, keeping the ecosystem consistent as it
          grows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <BentoCard
            className="md:col-span-3"
            tag="On home pages"
            title="Featured Content Carousel"
            body="Highlights time-sensitive content such as events, announcements, and promotions."
            diagramLabel="Featured content carousel"
            image="/images/partner-portal/featured-content-carousel.png"
            note="Moved from white text over a background image to a split layout with text on white and the image to the right, resolving contrast and legibility issues."
          />
          <BentoCard
            className="md:col-span-3"
            tag="On engagement pages"
            title="Engagement Modules"
            body="Tabs keep related content grouped compactly, letting users scan and self-select into what's relevant to them. The dark card treatment creates strong visual separation from the surrounding page, while the structured layout guides the eye naturally from objective to process to action."
            diagramLabel="Engagement modules"
            image="/images/partner-portal/engagement-modules.png"
          />
          <BentoCard
            className="md:col-span-3"
            tag="On Go to Market pages"
            title="Resources"
            body="Downloadable assets with just enough context (file type, date, and a one-line description) to help users quickly identify resources relevant to them."
            diagramLabel="Resources"
            image="/images/partner-portal/resources-card.png"
          />
          <BentoCard
            className="md:col-span-3"
            tag="On Go to Market pages"
            title="Go-to-market resource accordions"
            body="Anchoring partners in the sales journey up top sets the strategic context, so the resources in the accordion sections below feel purposeful."
            diagramLabel="Go-to-market resource accordions"
            image="/images/partner-portal/gtm-resource-accordions.png"
          />
        </div>

        <p className="text-base text-ink leading-relaxed max-w-3xl mt-10">
          Built on Fluent UI components, accessibility came baked in — ensuring the design met
          WCAG Level AA standards.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 04 — Design considerations (tabs: one section at a time)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={4} title="Design considerations" />
        <p className="text-base text-ink leading-relaxed max-w-3xl mb-8">
          These were responses to friction points identified in the old experience, optimised for
          quick, purposeful visits rather than passive exploration.
        </p>

        {/* Inner accordion (left) + diagram (right) — Framer-style */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <Card className="md:col-span-2 p-5 md:p-6">
            <SubLabel>{active.label}</SubLabel>
            <p className="text-sm text-muted leading-relaxed mb-5">{active.intro}</p>

            <div className="divide-y divide-border">
              {active.subpoints.map((sp) => {
                const isOpen = sp.key === activeSubKey
                return (
                  <div key={sp.key} className="py-1">
                    <button
                      onClick={() => setActiveSubKey(sp.key)}
                      className="w-full text-left py-3 flex items-start gap-3 group"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                          isOpen ? 'bg-ink' : 'bg-muted/40 group-hover:bg-muted'
                        }`}
                      />
                      <span
                        className={`text-sm leading-snug transition-colors ${
                          isOpen ? 'text-ink font-medium' : 'text-muted group-hover:text-ink'
                        }`}
                      >
                        {sp.title}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted leading-relaxed pl-[18px] pb-4 pr-1">
                            {sp.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card tone="stone" className="md:col-span-3 p-6 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSub.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full flex"
              >
                {activeSub.image ? (
                  <div className="w-full min-h-[240px] rounded-xl overflow-hidden bg-white border border-border flex items-center justify-center">
                    <img
                      src={activeSub.image}
                      alt={activeSub.diagramLabel}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <DiagramPlaceholder label={activeSub.diagramLabel} aspectRatio="16/9" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>

        {/* Surfacing critical information — accordion + image, no outer tabs */}
        <div className="mt-16">
          <p className="text-base text-ink leading-relaxed max-w-3xl mb-8">
            The old site buried the things partners came back for. The refresh pulled them to the top.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Card className="md:col-span-2 p-5 md:p-6">
              <SubLabel>Surfacing critical information</SubLabel>
              <p className="text-sm text-muted leading-relaxed mb-5">
                Two moves to get the most important content back above the fold.
              </p>

              <div className="divide-y divide-border">
                {criticalSubpoints.map((sp) => {
                  const isOpen = sp.key === criticalSubKey
                  return (
                    <div key={sp.key} className="py-1">
                      <button
                        onClick={() => setCriticalSubKey(sp.key)}
                        className="w-full text-left py-3 flex items-start gap-3 group"
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                            isOpen ? 'bg-ink' : 'bg-muted/40 group-hover:bg-muted'
                          }`}
                        />
                        <span
                          className={`text-sm leading-snug transition-colors ${
                            isOpen ? 'text-ink font-medium' : 'text-muted group-hover:text-ink'
                          }`}
                        >
                          {sp.title}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-muted leading-relaxed pl-[18px] pb-4 pr-1">
                              {sp.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card tone="stone" className="md:col-span-3 p-6 flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={criticalActiveSub.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full flex"
                >
                  {criticalActiveSub.image ? (
                    <div className="w-full min-h-[240px] rounded-xl overflow-hidden bg-white border border-border flex items-center justify-center">
                      <img
                        src={criticalActiveSub.image}
                        alt={criticalActiveSub.diagramLabel}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full">
                      <DiagramPlaceholder label={criticalActiveSub.diagramLabel} aspectRatio="16/9" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </div>

        {/* Visual weight for resources — full-width stack */}
        <div className="mt-16">
          <p className="text-base text-ink leading-relaxed max-w-3xl mb-10">
            Resources are why partners come to the site. The refresh gave them weight that matched their importance.
          </p>

          <div className="space-y-10">
            {[
              {
                key: 'resources-icons',
                title: 'Giving resources more emphasis on Go-to-Market pages',
                body: (
                  <ul className="space-y-5 text-sm text-muted leading-relaxed max-w-2xl mt-4 mb-8 list-none p-0">
                    {[
                      {
                        Icon: Shapes,
                        heading: 'Icons do the heavy lifting',
                        text: "File type icons act as visual anchors that let partners distinguish web tools, PDFs, and documents at a glance, replacing the before version's flat wall of identical blue links.",
                      },
                      {
                        Icon: Eye,
                        heading: 'No more clicking blind',
                        text: "Each resource now includes a short description, so partners know what they're getting and in what format before committing to a download — rather than clicking and hoping for the right file.",
                      },
                      {
                        Icon: Route,
                        heading: 'A journey, not a list',
                        text: 'The numbered accordion (01–05) organizes resources around stages of the partner workflow instead of flat categories, reframing the page as a guided hub rather than a directory of links.',
                      },
                    ].map(({ Icon, heading, text }) => (
                      <li key={heading} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-ink shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <span className="font-medium text-ink">{heading}:</span> {text}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) as ReactNode,
                diagramLabel: 'Resource card — file-type icon + size',
                image: '/images/partner-portal/resources-icons.png',
                minHeight: 'min-h-[420px] md:min-h-[480px]',
              },
              {
                key: 'resources-context',
                title: 'Different treatments of resource cards for different contexts',
                body:
                  'The same resource takes three different forms depending on where it lives: a lightweight link in accordions, a descriptive card in featured sections, and a fully detailed card with tags and metadata in the resource library — each tuned to how much information the user needs in that moment.',
                diagramLabel: 'Featured vs. accordion vs. library treatments',
                image: '/images/partner-portal/resources-context.png',
                minHeight: 'min-h-[680px] md:min-h-[820px]',
              },
            ].map((item) => (
              <div key={item.key}>
                <h5 className="text-lg md:text-xl font-medium text-ink leading-snug mb-2 max-w-2xl">
                  {item.title}
                </h5>
                {typeof item.body === 'string' ? (
                  <p className="text-sm text-muted leading-relaxed max-w-2xl mb-5">
                    {item.body}
                  </p>
                ) : (
                  item.body
                )}
                <Card tone="stone" className="p-6">
                  <div className={`w-full rounded-xl overflow-hidden bg-white border border-border flex items-center justify-center ${item.minHeight}`}>
                    <img
                      src={item.image}
                      alt={item.diagramLabel}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-project pivot — emphasized callout */}
      <Card className="p-6 md:p-8 border-l-4 border-l-ink bg-white">
        <div className="flex items-start gap-4">
          <span className="text-[10px] uppercase tracking-widest text-muted mt-1.5 shrink-0">
            Mid-project pivot
          </span>
          <div className="flex-1">
            <h4 className="text-lg md:text-xl font-medium text-ink leading-snug mb-3">
              Two product areas merged into one — partway through the project.
            </h4>
            <p className="text-sm text-ink leading-relaxed max-w-3xl">
              The business combined two product areas into a single offering after design was
              already underway. We had to quickly produce a new combined landing page, re-slot it
              into the ecosystem, and reconcile the navigation across sibling product areas
              without disrupting the home page work already in flight.
            </p>
          </div>
        </div>
      </Card>

    </div>
  )
}
