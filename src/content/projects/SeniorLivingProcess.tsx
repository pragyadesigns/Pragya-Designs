import { useState } from 'react'
import StackedCards from '../../components/project/StackedCards'

// ── Shared primitives ─────────────────────────────────────────────────────────
function PhaseHeader({ index, title, label }: { index: number; title: string; label?: string }) {
  return (
    <div className="mb-8">
      {label !== '' && (
        <p className="text-[10px] uppercase tracking-widest text-muted mb-3">
          {label ?? `Phase ${String(index).padStart(2, '0')}`}
        </p>
      )}
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
  return <p className="text-base text-muted leading-relaxed">{children}</p>
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
type Leaf = { title: string; description: string; bgColor?: string }
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
          { title: 'Optimize Lead-to-Move-In Strategy', description: 'Accelerate the process from inquiry to move-in through better follow-ups and sales processes.', bgColor: '#f2ede4' },
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
    <div className="rounded-lg border border-border p-3" style={{ backgroundColor: leaf.bgColor ?? '#ffffff' }}>
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
export function SeniorLivingTldr() {
  return (
    <div className="rounded-3xl border border-stone-200 overflow-hidden p-8 md:p-14 flex flex-col" style={{ backgroundColor: '#f2ede4' }}>
      <p className="text-[10px] uppercase tracking-widest text-muted mb-5">TL;DR</p>
      <p className="text-base md:text-lg font-light leading-relaxed text-muted">
        A four-vertical Power BI report gave C-suite executives the <em>what</em> — but not the <em>how</em> or <em>why</em>.
        Operators couldn't act on it. We rebuilt the product as a React web app with embedded Power BI, redesigned
        60 pages under two parallel design systems, and restructured the data story around the questions operators
        actually ask. The result: 10× more users reached, and a tool the client now uses as a live demo in new
        operator onboarding.
      </p>
    </div>
  )
}

export default function SeniorLivingProcess() {
  return (
    <div className="space-y-24">

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 02 — Design
          Intro sentence, then 3-column bento with diagram + sub-text
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={2} title="Moving from a single monolithic dashboard to a custom web app" label="the process" />
        <div>
          <div className="mb-6">
            <Body>
              By stepping outside the constraints of Power BI, we could build the experience from the ground up.
              We created the pages and navigation in React, with a single Power BI dashboard embedded per page.
            </Body>
          </div>
          <div className="rounded-2xl border border-border bg-stone-50 overflow-hidden">
            <img src="/images/senior living/web-app-shell.png" alt="Custom web app shell" className="w-full h-auto" />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-base text-muted leading-relaxed mb-5">We built two parallel design systems — one for the web app, one for the embedded dashboards.</p>
          <StackedCards
            peek={44}
            minHeight={440}
            cards={[
              {
                title: 'Crafting a minimal and clean design system',
                description:
                  'The design system leveraged Material UI (MUI) as its foundation. The overall aesthetic was kept intentionally minimal and clean — a deliberate departure from the heavy, dark navigation the client had relied on previously.',
                diagram: (
                  <img
                    src="/images/senior%20living/web-app-design-system.png"
                    alt="Web app design system"
                    className="w-full h-auto rounded-xl"
                  />
                ),
              },
              {
                title: 'Using color to direct attention on dashboards',
                description:
                  'We cut visual noise by reducing the amount of color in charts, using a primary navy blue to call out data points of most criticality.',
                diagram: (
                  <img
                    src="/images/senior living/power-bi-design-system.png"
                    alt="Power BI design system"
                    className="w-full h-auto rounded-lg"
                  />
                ),
              },
            ]}
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-light text-ink leading-tight tracking-tight mb-4">React navbars and tabs replaced the duct-taped button hacks in Power BI</h3>
          <Body>In Power BI, side navigation was cobbled together using buttons and bookmarks — requiring users to manually click and expand each vertical just to reveal the subpages beneath it. We replaced this with a proper navbar featuring flyout menus that reveal sub-verticals on hover, making it effortless to grasp the full scope of the product at a glance.</Body>
          <div className="mt-6 rounded-2xl border border-border bg-stone-50 overflow-hidden">
            <img
              src="/images/senior living/working-with-design-constraint.png"
              alt="Working with design constraint"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-10"><Body>Within each vertical, the original design toggled between summary and detail pages — burying detailed views behind an extra click. Users had to first activate the toggle, then select the specific page they wanted. We eliminated that friction entirely by promoting detail pages to the same level as summary pages, with all options visible and accessible through a clean horizontal tab navigation.</Body></div>
          <div className="mt-6 rounded-2xl border border-border bg-stone-50 overflow-hidden">
            <img src="/images/senior living/horizontal-tabs.png" alt="Horizontal tab navigation" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 01 — Understanding the Business
          Two stacked sub-sections (text 1/3 + diagram 2/3)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={1} title="Using business goals to shape workflows and dashboard structure" label="" />

        {/* Sub-section: 4 pillars */}
        <div className="mb-10">
          <div className="max-w-3xl mb-6">
            <Body>
              We grounded the work in strategy first — organizing the client's goals into four core business pillars:
              Maximize Occupancy, Optimize Revenue, Minimize Expenses, and Deliver High-Quality Care and Resident Satisfaction.
            </Body>
          </div>
          <Card tone="stone" className="p-6">
            <BusinessPillarsDiagram />
          </Card>
          <div className="mt-6 max-w-3xl">
            <Body>Among them, optimizing the lead-to-move-in pipeline was a top priority. The CRM section within the People vertical was already a go-to for property teams tracking prospects through the sales funnel. Yet, the data wasn't driving timely decisions.</Body>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 03 — Active Prospects (LARGEST — multiple sub-sections)
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <PhaseHeader index={3} title="Redesigning the prospect journey" label="" />

        <p className="text-base text-muted leading-relaxed max-w-3xl mb-10">
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
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted mb-5">Operational Realities We Surfaced</p>
          <ul className="space-y-6">
            {[
              {
                header: 'Bulk-clearing inactive prospects was creating misleading spikes',
                sub: 'Sales staff had been clearing inactive prospects all at once, distorting monthly trends — but surfacing that pattern in the dashboard gave operators the visibility they needed to course correct.',
              },
              {
                header: 'Sales staff sometimes skipped marking stage transitions',
                sub: 'When we cross-filtered the data, prospects with completed tours were still showing up as new inquiries — exposing a habit of skipping stage updates that operators could now directly address.',
              },
            ].map((item) => (
              <li key={item.header}>
                <h3 className="text-lg md:text-xl font-medium text-ink leading-snug mb-2">{item.header}</h3>
                <p className="text-base text-muted leading-relaxed">{item.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 04 — Resources
          Two-column: text descriptions + diagram
      ════════════════════════════════════════════════════════════════════ */}
      <section>
        <SubLabel>Supporting adoption</SubLabel>
        <PhaseHeader index={4} title="Orienting new users with training guides" label="" />

        <p className="text-base text-muted leading-relaxed max-w-3xl mb-8">
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

        <div className="mt-10">
          <h3 className="text-xl md:text-2xl font-light text-ink leading-tight tracking-tight mb-3">Navigating the product with the Beginner Essentials guide</h3>
          <div className="mb-6"><Body>The guide introduced features like the side nav, the product-level controls, filters and more.</Body></div>
          <div className="rounded-2xl border border-border bg-stone-50 overflow-hidden">
            <img src="/images/senior living/beginner-essentials-guide.png" alt="Beginner Essentials guide" className="w-full h-auto" />
          </div>
          <p className="text-xs text-muted mt-3">A page from the Beginner Essentials guide explaining table interactions</p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl md:text-2xl font-light text-ink leading-tight tracking-tight mb-3">Unlocking deeper insights with vertical-specific guides</h3>
          <div className="mb-6"><Body>For key pages in each vertical, we authored guides that framed the key questions operators should be asking, called out interaction tips — like row sorting, conditional formatting, and cross-filtering — and outlined clear next steps to keep analysis moving.</Body></div>
          <div className="rounded-2xl border border-border bg-stone-50 overflow-hidden">
            <img src="/images/senior living/lost-leads.png" alt="Vertical-specific guide" className="w-full h-auto" />
          </div>
          <p className="text-xs text-muted mt-3">A page from the CRM guide explaining the Lost Prospects page</p>
        </div>
      </section>

    </div>
  )
}
