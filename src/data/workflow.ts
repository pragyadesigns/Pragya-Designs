export interface WorkflowStage {
  stage: string
  description: string
  tools: string[]
}

export const workflowStages: WorkflowStage[] = [
  {
    stage: 'Research',
    description:
      'Understand the problem space through user interviews, competitive analysis, and desk research — accelerated by AI synthesis.',
    tools: ['ChatGPT', 'Notion AI', 'Dovetail'],
  },
  {
    stage: 'Ideation',
    description:
      'Generate concepts rapidly using AI image generation and Figma AI to explore visual directions before committing to pixels.',
    tools: ['Midjourney', 'Figma AI', 'ChatGPT'],
  },
  {
    stage: 'Design',
    description:
      'Build high-fidelity prototypes in Figma, using AI to draft microcopy, check accessibility, and iterate quickly.',
    tools: ['Figma', 'Figma AI', 'Galileo AI'],
  },
  {
    stage: 'Validate',
    description:
      'Run usability tests and synthesize findings with AI tools to surface patterns and prioritize next iterations.',
    tools: ['Maze', 'Dovetail', 'ChatGPT'],
  },
]
