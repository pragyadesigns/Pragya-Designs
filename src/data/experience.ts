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
}

export const experience: Role[] = [
  {
    index: 1,
    title: 'Designer',
    org: 'MAQ Software',
    location: 'Seattle, WA',
    period: 'Jul 2024 – Present',
    bullets: [
      'Design React web apps for BI reporting platforms',
      'Enhance traditional workflows through AI-powered solutions',
      'Create product demo videos',
    ],
  },
  {
    index: 2,
    title: 'Reporting & Analytical Data Solutions Intern (UI/UX)',
    org: 'Novartis',
    period: 'Jun 2023 – Aug 2023',
    bullets: [
      'Design React web apps for BI reporting platforms',
      'Enhance traditional workflows through AI-powered solutions',
      'Create product demo videos',
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
  },
  {
    index: 2,
    degree: 'Visual Design',
    school: 'Srishti Institute of Art, Design, and Technology',
    period: 'Jul 2018 – Jun 2022',
  },
]
