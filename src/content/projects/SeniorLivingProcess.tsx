import StackedCards from '../../components/project/StackedCards'
import DiagramPlaceholder from '../../components/project/DiagramPlaceholder'

// ── Shared primitives ─────────────────────────────────────────────────────────
function PhaseHeader({ index, title, label }: { index: number; title: string; label?: string }) {
  return (
    <div className="mb-8">
      {label !== '' && (
        <p className="text-label-12 text-muted-foreground mb-3">
          {label ?? `Phase ${String(index).padStart(2, '0')}`}
        </p>
      )}
      <h2 className="text-heading-24 md:text-heading-32 text-foreground max-w-3xl">
        {title}
      </h2>
    </div>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-copy-16 text-muted-foreground">{children}</p>
}

/** Tier 2 — a subheading inside a section. */
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-heading-20 md:text-heading-24 text-foreground mb-3">{children}</h3>
  )
}

/** Tier 3 — heads a group of items inside a subsection. */
function MinorHeading({ children, mb = 'mb-3' }: { children: React.ReactNode; mb?: string }) {
  return <h4 className={`text-heading-16 md:text-heading-20 text-foreground ${mb}`}>{children}</h4>
}

/**
 * The Figma exports sit on a large near-white canvas with the content floating in the
 * middle. Crop to the content box so it fills the width. w/h/x/y are in source pixels
 * (ffmpeg cropdetect bounds plus a little breathing room); brightness lifts #fcfcfc to white.
 *
 * These were GIFs; they're h264 now, which is ~10x smaller for the same frames.
 */
function CroppedClip({
  src, alt, srcW, w, h, x, y,
}: { src: string; alt: string; srcW: number; w: number; h: number; x: number; y: number }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <video
        src={src}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute max-w-none h-auto brightness-[1.012]"
        style={{
          width: `${(srcW / w) * 100}%`,
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      />
    </div>
  )
}

/** One page of the sales counselor dashboard: name, write-up, then the screen. */
function DashboardPage({ name, image, children }: { name: string; image: string; children: React.ReactNode }) {
  return (
    <div className="mt-16">
      <div className="max-w-3xl">
        <SubHeading>{name}</SubHeading>
        <div className="space-y-5">{children}</div>
      </div>
      <div className="mt-8">
        <img src={image} alt={`${name} — sales counselor dashboard`} className="w-full h-auto block" />
      </div>
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
          { title: 'Optimize Lead-to-Move-In Strategy', description: 'Accelerate the process from inquiry to move-in through better follow-ups and sales processes.', bgColor: 'var(--secondary)' },
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
    <div className="rounded-lg border border-border p-3" style={{ backgroundColor: leaf.bgColor ?? 'var(--card)' }}>
      <p className="text-copy-13 text-foreground mb-1">{leaf.title}</p>
      <p className="text-label-12 text-muted-foreground">{leaf.description}</p>
    </div>
  )
}

function SubPillarBlock({ sub }: { sub: SubPillar }) {
  const leavesGrid = sub.leaves.length >= 4 ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'space-y-2'
  return (
    <div className="space-y-3">
      <div>
        <p className="text-copy-14 text-foreground">{sub.title}</p>
        <p className="text-label-12 text-muted-foreground mt-1">{sub.description}</p>
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
    <div className="rounded-3xl border border-border bg-secondary overflow-hidden p-8 md:p-14 flex flex-col">
      <p className="text-label-12 text-muted-foreground mb-5">Overview</p>
      <p className="text-copy-16 md:text-copy-18 text-muted-foreground">
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
      <section data-toc="Building the web app">
        <PhaseHeader index={2} title="Moving from a single monolithic dashboard to a custom web app" label="Building the web app" />
        <div>
          <div className="mb-6">
            <Body>
              By stepping outside the constraints of Power BI, we could build the experience from the ground up.
              We created the pages and navigation in React, with a single Power BI dashboard embedded per page.
            </Body>
          </div>
          <div className="rounded-2xl border border-border bg-muted overflow-hidden">
            <img src="/images/senior living/web-app-shell.png" alt="Custom web app shell" className="w-full h-auto" />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-copy-16 text-muted-foreground mb-5">We built two parallel design systems — one for the web app, one for the embedded dashboards.</p>
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
          <SubHeading>React navbars and tabs replaced the duct-taped button hacks in Power BI</SubHeading>
          <Body>In Power BI, side navigation was cobbled together using buttons and bookmarks — requiring users to manually click and expand each vertical just to reveal the subpages beneath it. We replaced this with a proper navbar featuring flyout menus that reveal sub-verticals on hover, making it effortless to grasp the full scope of the product at a glance.</Body>
          <div className="mt-8 rounded-2xl border border-border bg-muted overflow-hidden">
            <img
              src="/images/senior living/working-with-design-constraint.png"
              alt="Working with design constraint"
              className="w-full h-auto"
            />
          </div>
          <div className="mt-8"><Body>Within each vertical, the original design toggled between summary and detail pages — burying detailed views behind an extra click. Users had to first activate the toggle, then select the specific page they wanted. We eliminated that friction entirely by promoting detail pages to the same level as summary pages, with all options visible and accessible through a clean horizontal tab navigation.</Body></div>
          <div className="mt-8 rounded-2xl border border-border bg-muted overflow-hidden">
            <img src="/images/senior living/horizontal-tabs.png" alt="Horizontal tab navigation" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 01 — Understanding the Business
          Two stacked sub-sections (text 1/3 + diagram 2/3)
      ════════════════════════════════════════════════════════════════════ */}
      <section data-toc="Grounding in business goals">
        <PhaseHeader index={1} title="Using business goals to shape workflows and dashboard structure" label="Grounding in business goals" />

        {/* Sub-section: 4 pillars */}
        <div className="mb-10">
          <div className="max-w-3xl mb-6">
            <Body>
              We grounded the work in strategy first — organizing the client's goals into four core business pillars:
              Maximize Occupancy, Optimize Revenue, Minimize Expenses, and Deliver High-Quality Care and Resident Satisfaction.
            </Body>
          </div>
          <BusinessPillarsDiagram />
          <div className="mt-8 max-w-3xl">
            <Body>Among them, optimizing the lead-to-move-in pipeline was a top priority. The CRM section within the People vertical was already a go-to for property teams tracking prospects through the sales funnel. Yet, the data wasn't driving timely decisions.</Body>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          Prioritizing prospects — replaces the hidden prospect-journey section
      ════════════════════════════════════════════════════════════════════ */}
      <section data-toc="Designing the sales pages">
        <PhaseHeader index={3} title="Helping sales staff prioritize prospects" label="Designing the sales pages" />

        <div className="max-w-3xl">
          <Body>
            Stakeholders wanted the platform to be worth opening for sales counselors too. Yardi
            already covered most of their day — a calendar of callbacks and tours, a detail page for
            every prospect — but it never told them who to call first.
          </Body>
        </div>

        <DashboardPage name="Summary Page" image="/images/senior%20living/Summary.png">
          <Body>
            Yardi had a to-do list, but it only surfaced what was already scheduled: today's tours
            and calls, and new inquiries waiting on a reply. That left the most common ways a
            prospect goes cold unaccounted for — the follow-up nobody booked, the overdue item that
            quietly passed its date, the prospect still being called after they'd stopped answering,
            the lead written off for a waitlist that has since opened up. None of these produce a
            task, so none of them ever appeared. We found them by working backward from the activity
            data, asking what patterns meant a prospect was slipping.
          </Body>
        </DashboardPage>

        <DashboardPage name="Today's Activities: Respond" image="/images/senior%20living/Respond.png">
          <Body>
            Prospects who made the last move and are still waiting. Unlike a new inquiry, these
            people have a history, so the list gives a counselor what to open the conversation with:
            how far along they are, what they last said, and how long they've been waiting on a
            reply.
          </Body>
          <Body>
            Something already on the calendar doesn't take a prospect off this list. A callback six
            days out isn't an answer to a message sent today, and the page keeps both visible so a
            counselor can see that the scheduled activity isn't covering the silence.
          </Body>
        </DashboardPage>

        <DashboardPage name="Today's Activities: Complete Activities" image="/images/senior%20living/Complete%20Activities.png">
          <Body>
            The day's scheduled work — the one list Yardi already had. What it couldn't say was which
            item to pick up first when there were more than a counselor could get through.
          </Body>
          <Body>
            So the list carries the two things that decide it: how far along a prospect is, and how
            many attempts have gone unanswered since they last responded. A tour outranks a call, a
            toured prospect outranks one still in conversation, and among the rest, the people still
            answering come before the ones who have gone quiet. Overdue work sits behind a toggle
            rather than mixed in, so falling behind doesn't bury today.
          </Body>
        </DashboardPage>

        <DashboardPage name="Today's Activities: Process New Inquiries" image="/images/senior%20living/Process%20New%20Inquiries.png">
          <Body>
            The people who reached out and haven't heard back yet. There's no history to weigh on a
            new lead, so the list gives a counselor only what shapes the first call: where the
            inquiry came from, and how long it's been sitting. Speed matters most here, so the wait
            is what stands out.
          </Body>
        </DashboardPage>

        <DashboardPage name="Today's Activities: Schedule Activities" image="/images/senior%20living/Schedule%20Activities.png">
          <Body>
            Prospects with nothing on the calendar and no task anywhere in Yardi to say so. This is
            the gap the old to-do list couldn't see: work only appears once someone books it, so a
            prospect nobody scheduled simply stops surfacing.
          </Body>
          <Body>
            Two numbers decide what to do with each one. How long since they last responded, and how
            many attempts have gone unanswered in that time. Together they separate someone worth
            another call from someone who has stopped answering — and the page asks for a decision
            either way, since closing a prospect out is as much a resolution as booking the next
            call.
          </Body>
        </DashboardPage>

        <DashboardPage name="Active Prospects Page" image="/images/senior%20living/Active%20Prospects.png">
          <Body>
            Every prospect in one place, filterable by whatever a counselor happens to be asking —
            care level, stage, engaged or unresponsive, or just a name they're trying to find. Counts
            and outreach totals sit above the list so the shape of the pipeline is visible before any
            filtering starts.
          </Body>
        </DashboardPage>

        <DashboardPage name="Lost Prospects Page" image="/images/senior%20living/Lost%20Prospects.png">
          <Body>
            Everyone who dropped out, and why. Losses break down by reason, source, and stage, so a
            counselor can tell the difference between leads that were never going to convert and
            ones that were lost somewhere in the process.
          </Body>
        </DashboardPage>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          Explore Page
      ════════════════════════════════════════════════════════════════════ */}
      <section data-toc="Helping users explore">
        <PhaseHeader index={0} title="Explore Page" label="Helping users explore" />

        <div className="max-w-3xl">
          <Body>
            Right now, only multi-property operators were on the platform. But a few months later,
            property directors, regional directors and sales counselors would also be onboarded.
          </Body>
        </div>


        <div className="mt-16">
          <div className="max-w-3xl">
            <SubHeading>
              Exploration 01: A searchable dynamic list
            </SubHeading>
            <Body>
              An easy way for users to filter to any vertical and take it piece by piece, or search
              for a page they might be trying to find again.
            </Body>
          </div>

          <div className="mt-8">
            <CroppedClip
              src="/images/senior%20living/ExplorePageIterations.mp4"
              alt="Searchable dynamic list"
              srcW={2810} w={2088} h={1156} x={286} y={216}
            />
          </div>

          <div className="mt-12">
            <MinorHeading mb="mb-8">List interactions</MinorHeading>

            <div className="space-y-10">
              {([
                {
                  title: 'Filtering by vertical',
                  body: 'Placeholder — describe how users narrow the list down to a single vertical.',
                  image: '/images/senior%20living/Chips%20and%20Filters.mp4',
                  crop: { srcW: 1920, w: 1780, h: 400, x: 140, y: 336 },
                },
                {
                  title: 'Searching for a known page',
                  body: 'Placeholder — describe how search gets users back to a page they have seen before.',
                  image: '/images/senior%20living/Card%20Iterations.mp4',
                  crop: { srcW: 1920, w: 1176, h: 528, x: 132, y: 372 },
                },
              ] as {
                title: string
                body: string
                image?: string
                crop?: { srcW: number; w: number; h: number; x: number; y: number }
              }[]).map((row) => (
                <div key={row.title} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                  {row.image && row.crop ? (
                    <CroppedClip src={row.image} alt={row.title} {...row.crop} />
                  ) : (
                    <DiagramPlaceholder label={row.title} aspectRatio="4/3" />
                  )}
                  <div>
                    <h5 className="text-copy-16 md:text-copy-18 text-foreground mb-2">{row.title}</h5>
                    <Body>{row.body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl">
            <SubHeading>
              Exploration 02: Vertical sections
            </SubHeading>
            <Body>
              Users weren't able to get a sense of the overall product, and the list felt too long to
              scroll through. So we tried to take a more sitemap-ish approach.
            </Body>
          </div>

          <div className="mt-8">
            <CroppedClip
              src="/images/senior%20living/Sitemap%20Approach%20-%20Exportable.mp4"
              alt="Sitemap approach with vertical sections"
              srcW={2786} w={2444} h={1336} x={172} y={116}
            />
            <p className="text-copy-13 text-muted-foreground mt-3">
              One or two sections went below the fold, making it missable and also leaving a lot of
              white space on the page
            </p>
          </div>

          <div className="mt-16">
            <div className="max-w-3xl">
              <SubHeading>Final design: Horizontal sections</SubHeading>
            </div>
            <CroppedClip
              src="/images/senior%20living/Final%20Explore%20Page.mp4"
              alt="Explore page with sections laid out horizontally"
              srcW={2786} w={2444} h={1336} x={172} y={116}
            />
            <p className="text-copy-13 text-muted-foreground mt-3">
              Sections with the lists laid out horizontally helped capture the entirety of one
              section at a time, and the scroll wasn't too long
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <Body>
            Instead of filtering the page, the search was now used to directly navigate to a page.
          </Body>
        </div>

        {/* This crop is near-square while the other gifs are ~1.83:1. Capping the width at
            1.233/1.829 of the column makes it render the same height as they do, at any width. */}
        <div className="mt-8 max-w-[67.4%]">
          <CroppedClip
            src="/images/senior%20living/Search-%20Exportable.mp4"
            alt="Search used to navigate directly to a page"
            srcW={2786} w={1840} h={1492} x={592} y={38}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 03 — Active Prospects (LARGEST — multiple sub-sections)
      ════════════════════════════════════════════════════════════════════ */}
      {/* Hidden — a new section is replacing this. Flip to `true` to bring it back. */}

      {/* ════════════════════════════════════════════════════════════════════
          PHASE 04 — Resources
          Two-column: text descriptions + diagram
      ════════════════════════════════════════════════════════════════════ */}
      <section data-toc="Writing user guides">
        <PhaseHeader index={4} title="Orienting new users with training guides" label="Writing user guides" />

        <p className="text-copy-16 text-muted-foreground max-w-3xl mb-8">
          Not every user comes in as a data expert.
          <br />
          <br />
          We needed guides that could meet new users where they were — orienting them to the embedded
          Power BI experience and giving them the confidence to interpret and act on their data
          independently.
        </p>

        <img
          src="/images/senior living/resources.png"
          alt="Resources page"
          className="w-full h-auto block"
        />

        <div className="mt-16">
          <SubHeading>Navigating the product with the Beginner Essentials guide</SubHeading>
          <div className="mb-6"><Body>The guide introduced features like the side nav, the product-level controls, filters and more.</Body></div>
          <div className="rounded-2xl border border-border bg-muted overflow-hidden">
            <img src="/images/senior living/beginner-essentials-guide.png" alt="Beginner Essentials guide" className="w-full h-auto" />
          </div>
          <p className="text-copy-13 text-muted-foreground mt-3">A page from the Beginner Essentials guide explaining table interactions</p>
        </div>

        <div className="mt-16">
          <SubHeading>Unlocking deeper insights with vertical-specific guides</SubHeading>
          <div className="mb-6"><Body>For key pages in each vertical, we authored guides that framed the key questions operators should be asking, called out interaction tips — like row sorting, conditional formatting, and cross-filtering — and outlined clear next steps to keep analysis moving.</Body></div>
          <div className="rounded-2xl border border-border bg-muted overflow-hidden">
            <img src="/images/senior living/lost-leads.png" alt="Vertical-specific guide" className="w-full h-auto" />
          </div>
          <p className="text-copy-13 text-muted-foreground mt-3">A page from the CRM guide explaining the Lost Prospects page</p>
        </div>
      </section>

    </div>
  )
}
