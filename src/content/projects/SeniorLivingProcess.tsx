import { useState } from 'react'
import DiagramPlaceholder from '../../components/project/DiagramPlaceholder'
import StackedCards from '../../components/project/StackedCards'

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

function Card({ children, tone = 'white', className = '' }: { children: React.ReactNode; tone?: 'white' | 'stone' | 'ink'; className?: string }) {
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

// ── Business pillars diagram ──────────────────────────────────────────────────
type Leaf = { title: string; description: string }
type SubPillar = { title: string; description: string; leaves: Leaf[] }
type Pillar = { title: string; subs: SubPillar[] }

const PILLARS: Pillar[] = [
  {
    title: 'Maximize Occupancy',
    subs: [
      {
        title: 'Increase Retention',
        description: 'Reduce move-outs by strengthening resident satisfaction, engagement, and overall quality of experience/care.',
        leaves: [
          { title: 'Diagnose Reasons for Actual Move-Outs', description: 'Understand why residents are leaving to reduce future turnover and improve operations.' },
          { title: 'Engage Upcoming Move-Outs', description: 'Proactively reach out to residents who have given notice to retain occupancy and prevent revenue loss.' },
        ],
      },
      {
        title: 'Turn Over Units',
        description: 'Minimize vacancy periods by enhancing maintenance efficiency and identifying operational issues.',
        leaves: [
          { title: 'Streamline Maintenance', description: 'Optimize maintenance processes to ensure units are completed quickly and consistently, minimizing vacancy time.' },
          { title: 'Identify Operational Bottlenecks', description: 'Flag units that exceed average turnover time but are not yet marked rent-ready to uncover and address inefficiencies.' },
        ],
      },
      {
        title: 'Sell Units',
        description: 'Refine sales strategies to increase move-in rates without sacrificing revenue.',
        leaves: [
          { title: 'Optimize Lead-to-Move-In Strategy', description: 'Accelerate the process from inquiry to move-in through better follow-ups and sales processes.' },
          { title: 'Implement Dynamic Pricing Strategies', description: 'Use data about unit location, appliances, and other factors that impact demand to optimize rates in real time.' },
          { title: 'Strategically Offer Concessions', description: 'Offer limited discounts or incentives only when necessary to fill vacant units.' },
          { title: 'Prioritize Private-Pay', description: 'Once regulatory quotas are met, direct marketing and sales strategies toward private-pay prospects.' },
        ],
      },
    ],
  },
  {
    title: 'Optimize Revenue',
    subs: [
      {
        title: 'Maximize Rent Potential',
        description: 'Ensure filled units are rented at market value to capture full revenue opportunity.',
        leaves: [
          { title: 'Review Rent Rolls for Underpriced Units', description: 'Identify units leasing below market and plan for rate adjustments to minimize loss to lease.' },
          { title: 'Check Occupancy Within Units', description: 'Ensure multi-bedroom units are fully utilized or adjust availability/pricing if under/over occupied.' },
          { title: 'Review Concessions or Discounts', description: 'Identify long-standing or expired concessions that can be phased out without impacting resident satisfaction.' },
        ],
      },
      {
        title: 'Maximize Care Revenue',
        description: 'Ensure residents are enrolled in and billed for appropriate care levels.',
        leaves: [
          { title: 'Match Care Levels to Resident Needs', description: 'Review resident assignments and adjust to the appropriate care level based on actual needs and staff hours logged.' },
        ],
      },
    ],
  },
  {
    title: 'Provide High Quality Care',
    subs: [
      {
        title: 'Reduce Risk of Falls',
        description: 'Protect residents through proactive prevention and monitoring.',
        leaves: [
          { title: 'Identify Residents at Risk', description: 'Determine which residents are most likely to fall, based on prior falls, medical conditions, mobility limitations, or other risk factors.' },
          { title: 'Effectively Respond to Alerts', description: 'Monitor staff response to alerts to ensure timely and appropriate interventions are carried out.' },
          { title: 'Ensure Timely Assessments', description: 'Ensure assessments are done regularly to detect residents that may become more risk-prone, especially after falls.' },
        ],
      },
    ],
  },
  {
    title: 'Minimize Expenses',
    subs: [
      {
        title: 'Minimize Bad Debt',
        description: 'Proactively manage accounts receivable and ensure timely collections.',
        leaves: [
          { title: 'Enforce Timely Billing', description: 'Ensure invoices are accurate and sent promptly to residents or responsible parties.' },
          { title: 'Enforce Policy Consistently', description: 'Apply late fees, penalties, or other policies fairly to encourage timely payment.' },
          { title: 'Follow Up on Overdue Payments', description: 'Reach out to residents or families early on overdue payments to prevent escalation.' },
        ],
      },
    ],
  },
]

function LeafCard({ leaf }: { leaf: Leaf }) {
  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <p className="text-xs font-medium text-ink leading-snug mb-1">{leaf.title}</p>
      <p className="text-[11px] text-muted leading-snug">{leaf.description}</p>
    </div>
  )
}

function SubPillarBlock({ sub }: { sub: SubPillar }) {
  const leavesGrid = sub.leaves.length >= 4 ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'space-y-2'
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-ink leading-snug">{sub.title}</p>
        <p className="text-[11px] text-muted leading-snug mt-1">{sub.description}</p>
      </div>
      <div className={leavesGrid}>
        {sub.leaves.map((l) => <LeafCard key={l.title} leaf={l} />)}
      </div>
    </div>
  )
}

function PillarDiagram({ pillar, columns = 1 }: { pillar: Pillar; columns?: 1 | 2 }) {
  const gridClass = columns === 2 ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-3'
  return (
    <div className={gridClass}>
      {pillar.subs.map((s) => (
        <div key={s.title} className={columns === 2 && s.leaves.length >= 4 ? 'sm:col-span-2' : ''}>
          <SubPillarBlock sub={s} />
        </div>
      ))}
    </div>
  )
}

const PILLAR_SUMMARIES: Record<string, string> = {
  'Maximize Occupancy': '',
  'Optimize Revenue': 'Make sure existing residents are billed at the right rates for both rent and care.',
  'Provide High Quality Care': 'Protect residents through proactive fall prevention, alert response, and timely assessments.',
  'Minimize Expenses': 'Reduce bad debt by enforcing billing, policies, and overdue payment follow-up.',
}

type PageTag = 'New' | 'Redesigned' | 'Unchanged'
type PageStatus = 'Live' | 'Not Live'
type PageTab = {
  title: string
  body: React.ReactNode
  image: string
  tag?: PageTag
  status?: PageStatus
}

function PageTagPill({ tag }: { tag: PageTag }) {
  return (
    <span className="text-[10px] uppercase tracking-widest font-medium border border-ink bg-ink text-white rounded-full px-2 py-0.5">
      {tag}
    </span>
  )
}

function StatusPill({ status }: { status: PageStatus }) {
  const isLive = status === 'Live'
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-medium text-muted">
      <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-stone-400'}`} />
      {status}
    </span>
  )
}

function PageTabs({ pages }: { pages: PageTab[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = pages[activeIdx]
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {pages.map((p, i) => {
          const isActive = i === activeIdx
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`text-left rounded-xl border p-4 transition-all ${
                isActive
                  ? 'border-ink bg-white shadow-md ring-1 ring-ink/10'
                  : 'border-border bg-white hover:border-ink/40 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-widest uppercase text-muted/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {p.tag && <PageTagPill tag={p.tag} />}
              </div>
              <p className={`text-sm leading-snug mb-3 ${isActive ? 'font-semibold text-ink' : 'font-medium text-ink'}`}>
                {p.title}
              </p>
              {p.status && <StatusPill status={p.status} />}
            </button>
          )
        })}
      </div>
      <div className="text-sm text-muted leading-relaxed max-w-3xl mb-5">{active.body}</div>
      <Card tone="stone" className="p-6">
        <img
          src={active.image}
          alt={active.title}
          className="w-full h-auto rounded-lg"
        />
      </Card>
    </div>
  )
}

function BusinessPillarsDiagram() {
  return (
    <StackedCards
      peek={50}
      minHeight={520}
      cards={PILLARS.map((p) => ({
        title: p.title,
        description: PILLAR_SUMMARIES[p.title] ?? '',
        diagram: <PillarDiagram pillar={p} columns={p.subs.length >= 3 ? 2 : 1} />,
      }))}
    />
  )
}

// ── Main process node ─────────────────────────────────────────────────────────
export default function SeniorLivingProcess() {
  return (
    <div className="space-y-24">

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 02 — Design
          Intro sentence, then 3-column bento with diagram + sub-text
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={2} title="From off-the-shelf dashboard to custom web app" />
        <Body>
          Power BI Service gave users a rigid experience — fixed navigation, built-in filters, no room to
          evolve. A React web app with embedded reports freed us from those constraints and opened the door
          to a real product: one that can grow to include help resources, training, changelogs, and more.
        </Body>

        <div className="mt-8">
          <StackedCards
            peek={50}
            minHeight={440}
            cards={[
              {
                title: 'Web app design system',
                description:
                  'Used customized MUI components with a minimal white and blue color theme.',
                diagram: (
                  <img
                    src="/images/senior%20living/web-app-design-system.png"
                    alt="Web app design system"
                    className="w-full h-auto rounded-xl"
                  />
                ),
              },
              {
                title: 'Power BI design system',
                description:
                  'Reduced visual noise by reducing the amount of color in charts, using a primary navy blue to call out data points of most criticality. Customized interactive Power BI components like buttons and toggles to appear more clickable, along with defining various interactive states.',
                diagram: (
                  <img
                    src="/images/senior living/power-bi-design-system.png"
                    alt="Power BI design system"
                    className="w-full h-auto rounded-lg"
                  />
                ),
              },
              {
                title: 'Working with design constraint',
                description:
                  'Pages are limited to 4–5 visuals with no vertical scroll on the page, thus every page tells a contained story or links out to another page for more details.',
                diagram: (
                  <img
                    src="/images/senior living/working-with-design-constraint.png"
                    alt="Working with design constraint"
                    className="w-full h-auto rounded-lg"
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 01 — Understanding the Business
          Two stacked sub-sections (text 1/3 + diagram 2/3)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={1} title="Using business goals to shape workflows and dashboard structure" />

        {/* Sub-section: 4 pillars */}
        <div className="mb-10">
          <div className="max-w-3xl mb-6">
            <SubLabel>Mapping the four pillars</SubLabel>
            <Body>
              We began by mapping out real estate operational objectives (within each vertical) into 4 main
              pillars — Maximize Occupancy, Optimize Revenue, Minimize Expenses, and Provide High Quality
              Care and Maintain Resident Satisfaction. These corresponded to the existing business pillars —
              Occupancy, Revenue Management, Clinical and Financials.
            </Body>
          </div>
          <Card tone="stone" className="p-6">
            <BusinessPillarsDiagram />
          </Card>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 03 — Active Prospects (LARGEST — multiple sub-sections)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={3} title="Redesigning the prospect journey" />

        <p className="text-base text-ink leading-relaxed max-w-3xl mb-10">
          We restructured the pages within the People sub-vertical — removing unused pages, redesigning
          core views, and introducing new supplementary pages to support a more complete workflow.
        </p>


        {/* Final page structure for the People vertical — tabbed page browser */}
        <div className="mb-10">
          <PageTabs
            pages={[
              {
                title: 'Summary',
                body: (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink/80 font-medium mb-3">Key questions</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Which stage are prospects getting stuck in?</li>
                      <li>How many prospects are we losing, and at what stage?</li>
                      <li>Are sales counselors engaging meaningfully through calls?</li>
                      <li>Are enough tours being scheduled to support conversion?</li>
                    </ul>
                  </div>
                ),
                image: '/images/senior living/summary.jpg',
                tag: 'Redesigned',
                status: 'Not Live',
              },
              {
                title: 'Lost Prospects',
                body: (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink/80 font-medium mb-3">Key questions</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Which stage has the highest prospect drop-off?</li>
                      <li>What are the most common reasons prospects are exiting the pipeline?</li>
                      <li>Which lost prospects are worth re-engaging — particularly those who dropped off at later stages like Deposited?</li>
                    </ul>
                  </div>
                ),
                image: '/images/senior living/lost-prospects.jpg',
                tag: 'New',
                status: 'Live',
              },
              {
                title: 'Active Prospects',
                body: (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink/80 font-medium mb-3">Key questions</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Which counselors are underperforming against expectations?</li>
                      <li>Which counselors are not spending enough time in meaningful conversations with prospects?</li>
                      <li>Which counselors are over- or under-utilized in their current workload?</li>
                      <li>Which counselors have slow response times when following up with prospects?</li>
                    </ul>
                  </div>
                ),
                image: '/images/senior living/active-prospects.jpg',
                tag: 'Redesigned',
                status: 'Live',
              },
              {
                title: 'Tours & Deposits',
                body: (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink/80 font-medium mb-3">Key questions</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>What is the tour cancellation rate?</li>
                      <li>How many tours are scheduled in the upcoming period?</li>
                      <li>Which units are currently available for touring?</li>
                    </ul>
                  </div>
                ),
                image: '/images/senior living/tours-and-deposits.jpg',
                tag: 'New',
                status: 'Not Live',
              },
              {
                title: 'Call Log',
                body: (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink/80 font-medium mb-3">Key questions</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>What is actually happening in those calls?</li>
                    </ul>
                  </div>
                ),
                image: '/images/senior living/call-log.jpg',
                tag: 'New',
                status: 'Not Live',
              },
            ]}
          />
        </div>

        {/* Challenge — Data consistency */}
        <Card className="p-6 border-l-4 border-l-ink">
          <SubLabel>Challenge — data consistency</SubLabel>
          <ul className="space-y-4">
            {[
              {
                header: 'Sales effectiveness data was unreliable',
                sub: 'Call minutes — the proxy for sales effectiveness — were often left blank or rounded by sales staff in Yardi.',
              },
              {
                header: 'Pipeline stages did not reflect reality',
                sub: 'Sales staff sometimes skipped marking stage transitions, producing incorrect funnel data downstream.',
              },
            ].map((item) => (
              <li key={item.header}>
                <p className="text-sm font-medium text-ink leading-snug">{item.header}</p>
                <p className="text-sm text-muted leading-relaxed mt-1">{item.sub}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 04 — Resources
          Two-column: text descriptions + diagram
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={4} title="Orienting new users with resources" />

        <p className="text-base text-ink leading-relaxed max-w-3xl mb-8">
          Not every user comes in as a data expert.
          <br />
          <br />
          We needed guides that could meet new users where they were — orienting them to the embedded
          Power BI experience and giving them the confidence to interpret and act on their data
          independently.
        </p>

        <Card tone="stone" className="p-6">
          <img
            src="/images/senior living/resources.png"
            alt="Resources page"
            className="w-full h-auto rounded-lg"
          />
        </Card>
      </section>

    </div>
  )
}
