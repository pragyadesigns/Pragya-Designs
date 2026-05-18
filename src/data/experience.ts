export interface Role {
  index: number
  title: string
  org: string
  location?: string
  period: string
  bullets: string[]
}

export interface EducationEntry {
  index: number
  degree: string
  school: string
  period: string
  bullets?: string[]
}

export const experience: Role[] = [
  {
    index: 1,
    title: 'Designer',
    org: 'MAQ Software',
    location: 'Seattle, WA',
    period: 'Jul 2024 – Present',
    bullets: [
      'Led a 3-month redesign of a partner-facing portal for a major technology client, delivering 10+ accessible, maintainable page templates in Microsoft Power Pages. Drove alignment across 10+ stakeholders and 13 developers to streamline partner access to go-to-market resources tied to FY26 business priorities.',
      'Redesigned a senior living analytics platform for a major real estate client — scaling an executive-only Power BI dashboard into a React web app with 60+ pages that gave property-level directors real-time, actionable operational insights.',
      'Developed an AI-powered session recommender for FabCon Community Conference 2025, used by 200+ attendees in its first week to generate personalized calendars and discover the most relevant sessions of the event.',
    ],
  },
  {
    index: 2,
    title: 'Reporting & Analytical Data Solutions Intern (UI/UX)',
    org: 'Novartis',
    period: 'Jun 2023 – Aug 2023',
    bullets: [
      'Redesigned the MicroStrategy dashboard serving 1000+ field reporting specialists, collaborating with design teams and product owners to transform complex business requirements into intuitive user interfaces.',
    ],
  },
  {
    index: 3,
    title: 'Graphic Designer',
    org: 'Fisheye Creative Solutions',
    period: 'Sep 2021 – May 2022',
    bullets: [
      'Created social media posts, digital campaigns, print collateral etc. for various national brands in India',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    index: 1,
    degree: 'Master of Science in Information (MSI)',
    school: 'University of Michigan',
    period: 'Aug 2022 – Apr 2024',
    bullets: [
      'Coursework: Contextual Inquiry and Consulting Foundations, Introduction to Interaction Design, Web Design, Pervasive Interaction Design, Usability Evaluation & Needs Assessment, Information Architecture, Building Interactive Applications, Information Visualization, AR/VR',
    ],
  },
  {
    index: 2,
    degree: 'Visual Design',
    school: 'Srishti Institute of Art, Design, and Technology',
    period: 'Jul 2018 – Jun 2022',
  },
]
