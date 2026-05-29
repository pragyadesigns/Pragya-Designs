import { Download, Zap, Sparkles, Unlink, KeyRound, RefreshCw, Users, FileText } from 'lucide-react'
import SeniorLivingProcess, { SeniorLivingTldr } from '../content/projects/SeniorLivingProcess'
import PartnerPortalProcess from '../content/projects/PartnerPortalProcess'

export interface Metric {
  value: string
  label: string
}

export interface PhasePill {
  phase: string
}

export interface Decision {
  title: string
  problem: string
  options: string[]
  choice: string
  rationale: string
}

export interface RoleOwnership {
  owned: string[]
  collaborated: string[]
}

export interface Project {
  slug: string
  title: string
  tagline: string
  role: string
  timeline: string
  company?: string
  tools: string[]
  metaNote?: string
  heroImage?: string
  metrics: Metric[]
  problem: string
  problemAttribution?: string
  roleMap?: RoleOwnership
  processOverview?: string
  phases: PhasePill[]
  processNode: React.ReactNode
  preContextNode?: React.ReactNode
  decisions: Decision[]
  images: string[]
  problemHighlights?: { icon: React.ReactNode; title: string; body: string }[]
  outcomeTitle?: string
  outcomeImage?: string
  outcomeHighlights?: { icon: React.ReactNode; title: string; body: string }[]
  nextStepHighlights?: { icon: React.ReactNode; title: string; body: string }[]
  outcome: string
  lessons?: string[]
  nextSteps?: string[]
}

export const projects: Project[] = [
  {
    slug: 'senior-living-analytics',
    title: 'Passive Reporting to Proactive Insights',
    heroImage: '/images/senior living/hero.png',
    tagline: 'Modernizing senior living analytics to drive site-level adoption and operational velocity.',
    role: 'Product Designer & PM',
    timeline: 'Oct 2025 – Present',
    tools: ['Figma', 'Power BI', 'React'],
    metrics: [
      { value: '10×', label: 'more users reached — expanding from C-suite to property-level directors' },
      { value: '60', label: 'pages redesigned under a unified design system' },
      { value: '↑', label: 'engagement — used in new operator onboarding and reengagement sessions' },
    ],
    problem: "Our client managed senior living operations using Yardi — a property management platform handling accounting, leasing, maintenance, and day-to-day operations across their portfolio. Frustrated with Yardi's limited out-of-the-box analytics, they built their own reporting solution: pulling Yardi data into Snowflake, developing a custom semantic model, and surfacing insights through Power BI.\n\nThe result worked well at the executive level — but only told leadership what was happening, not how or why.\n\nFor operators trying to hit monthly targets, the data simply wasn't actionable. And with the client planning to eventually roll the solution out to hundreds of property-level directors and on-site staff, a single monolithic Power BI report wasn't going to scale.",
    roleMap: {
      owned: ['UX Research', 'Information Architecture', 'User Workflow Mapping', 'Wireframing', 'Prototyping', 'Design System', 'Power BI Theme', 'Product Management'],
      collaborated: ['Engineering', 'Data Engineering', 'Stakeholder Alignment'],
    },
    processOverview:
      'This project involved five interconnected workstreams — from understanding operational objectives across each vertical, to building two parallel design systems, to deep-diving into specific pages and surfacing actionable insights for property-level staff.',
    phases: [
      { phase: 'Using business goals to shape workflows and dashboard structure' },
      { phase: 'Design' },
      { phase: 'Redesigning the prospect journey' },
      { phase: 'Orienting new users with resources' },
    ],
    processNode: <SeniorLivingProcess />,
    preContextNode: <SeniorLivingTldr />,
    decisions: [],
    images: [],
    outcomeHighlights: [
      {
        icon: <Users size={22} strokeWidth={1.4} />,
        title: 'Driving operator adoption',
        body:
          'The redesigned dashboard — with its improved UI and sharper insights — has converted even the most resistant operators away from the legacy system.',
      },
    ],
    outcome: 'Improved operator adoption across the board. The client now uses the web app as a live demo in new operator onboarding conversations and reengagement sessions. Operators report data is easier to interpret and act on.',
    nextStepHighlights: [
      {
        icon: <FileText size={22} strokeWidth={1.4} />,
        title: 'Making invoice data actionable for property accounting teams',
        body:
          'We are integrating Yardi invoice data into the product to streamline the invoice workflow, reduce processing time, and help teams clear their backlog.',
      },
    ],
  },
  {
    slug: 'partner-website-redesign',
    title: 'A Refreshed Home for Partner Resources',
    heroImage: '/images/partner-portal/hero.png',
    tagline: "Helping a global technology company's partner network work smarter — through a full portal redesign that restructured content and cut the friction between partners and the resources they need.",
    role: 'Product Designer',
    timeline: 'Mar 2025 – May 2025',
    tools: ['Figma', 'Microsoft Power Pages'],
    metaNote: 'The client is referred to by the fictitious name "Vertex".',
    metrics: [
      { value: '3×', label: 'more resource downloads after the refresh' },
      { value: '10×', label: 'faster content updates after moving to low-code' },
      { value: '400,000+', label: 'organizations in partner network' },
    ],
    problem:
      "The partner-facing portal helps resellers and consultants access go-to-market and upskilling resources, training, funded engagements, events and more to help them sell and deploy AI and productivity products.",
    problemHighlights: [
      {
        icon: <Unlink size={22} strokeWidth={1.4} />,
        title: 'Removing dependency on an external vendor',
        body:
          'The sites had been built and maintained by a third party, which meant every change had to go through an outside dependency before it could reach partners.',
      },
      {
        icon: <KeyRound size={22} strokeWidth={1.4} />,
        title: 'A push for in-house ownership',
        body:
          'The internal org wanted full control on a low-code backend the team could extend and maintain itself — without waiting on a vendor release cycle.',
      },
      {
        icon: <RefreshCw size={22} strokeWidth={1.4} />,
        title: 'A chance to refresh the inventory',
        body:
          'The migration doubled as a content audit — an opportunity to retire stale decks, PDFs, and links in favor of newer, more relevant material.',
      },
    ],
    processOverview:
      'The work spanned four connected tracks — defining a refreshed visual language, mapping the full ecosystem of pages, designing the home page and its template siblings, and baking a set of design principles into every template so partners could find resources faster.',
    phases: [
      { phase: 'Ecosystem mapping' },
      { phase: 'Look and feel' },
      { phase: 'Home page' },
      { phase: 'Design considerations' },
    ],
    processNode: <PartnerPortalProcess />,
    decisions: [],
    images: [],
    outcomeTitle: 'Partners find more. Teams ship faster.',
    outcomeHighlights: [
      {
        icon: <Download size={22} strokeWidth={1.4} />,
        title: '3× more resource downloads',
        body:
          'A sharper information architecture and stronger visual weight on resources tripled the number of downloads partners pulled from the site after the refresh.',
      },
      {
        icon: <Zap size={22} strokeWidth={1.4} />,
        title: '10× faster content updates',
        body:
          'The low-code backend let the in-house team ship content changes in a fraction of the time, removing the external-vendor dependency that used to gate every update.',
      },
      {
        icon: <Sparkles size={22} strokeWidth={1.4} />,
        title: 'Cleaner, more modern feel',
        body:
          'Partners told client stakeholders that the sites felt cleaner and more modern, and that they appreciated the new look and how much easier it was to find what they came for.',
      },
    ],
    outcome:
      'Resource downloads tripled after the refresh. Partners told client stakeholders that the sites felt cleaner and more modern, and the in-house team could now update content in a fraction of the time it had taken on the old vendor-owned stack — unblocking future launches without external dependencies.',
  },
]

export const accordionProjects = [
  {
    id: 'senior-living-analytics',
    title: 'Passive reporting to proactive insights',
    description: 'Modernizing senior living analytics to drive site-level adoption and operational velocity.',
    slug: 'senior-living-analytics',
    image: '/images/senior living/hero.png',
    imageFit: 'contain' as const,
  },
  {
    id: 'partner-website-redesign',
    title: 'A refreshed home for partner resources',
    description: "Helping a global technology company's partner network work smarter — through a full portal redesign that restructured content and cut the friction between partners and the resources they need.",
    slug: 'partner-website-redesign',
    image: '/images/partner-portal/hero.png',
  },
]
