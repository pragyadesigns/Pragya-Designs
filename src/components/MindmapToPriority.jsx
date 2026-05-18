import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { FileText } from 'lucide-react'

const VIEW_W = 600
const VIEW_H = 500

const nodes = [
  { id: 'home',  label: 'Home',            mindmap: { x: 70,  y: 250 }, priorityIndex: 0, parent: null },
  { id: 'sa1',   label: 'Solution Area 1', mindmap: { x: 260, y: 100 }, priorityIndex: 1, parent: 'home' },
  { id: 'sa2',   label: 'Solution Area 2', mindmap: { x: 260, y: 250 }, priorityIndex: 2, parent: 'home' },
  { id: 'sa3',   label: 'Solution Area 3', mindmap: { x: 260, y: 400 }, priorityIndex: 3, parent: 'home' },
  { id: 'gtm',   label: 'Go to Market',    mindmap: { x: 470, y: 30  }, priorityIndex: 4, parent: 'sa1' },
  { id: 'eng',   label: 'Engagements',     mindmap: { x: 470, y: 75  }, priorityIndex: 5, parent: 'sa1' },
  { id: 'skl',   label: 'Skilling',        mindmap: { x: 470, y: 120 }, priorityIndex: 6, parent: 'sa1' },
  { id: 'blog',  label: 'Blog',            mindmap: { x: 470, y: 165 }, priorityIndex: 7, parent: 'sa1' },
  { id: 'res',   label: 'Resources',       mindmap: { x: 470, y: 210 }, priorityIndex: 8, parent: 'sa1' },
]

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]))

const PRIORITY_X = 110
const PRIORITY_Y0 = 70
const PRIORITY_ROW = 44

function priorityPos(n) {
  return { x: PRIORITY_X, y: PRIORITY_Y0 + n.priorityIndex * PRIORITY_ROW }
}

function edgePath(parent, child) {
  const midX = (parent.x + child.x) / 2
  return `M ${parent.x} ${parent.y} C ${midX} ${parent.y}, ${midX} ${child.y}, ${child.x} ${child.y}`
}

const PHASES = [
  { name: 'mindmap',    duration: 1500 },
  { name: 'fadeOut',    duration: 800  },
  { name: 'toPriority', duration: 1000 },
  { name: 'badgesIn',   duration: 700  },
  { name: 'hold',       duration: 1300 },
  { name: 'returning',  duration: 1200 },
]

export default function MindmapToPriority() {
  const prefersReducedMotion = useReducedMotion()
  const [phaseIdx, setPhaseIdx] = useState(0)
  const containerRef = useRef(null)
  const [size, setSize] = useState({ w: VIEW_W, h: VIEW_H })

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    const t = setTimeout(() => {
      setPhaseIdx((i) => (i + 1) % PHASES.length)
    }, PHASES[phaseIdx].duration)
    return () => clearTimeout(t)
  }, [phaseIdx, prefersReducedMotion])

  if (prefersReducedMotion) return <StaticSplitView />

  const toPx = (pt) => ({
    x: (pt.x / VIEW_W) * size.w,
    y: (pt.y / VIEW_H) * size.h,
  })

  const phase = PHASES[phaseIdx].name
  const inPriorityRegion = phase === 'toPriority' || phase === 'badgesIn' || phase === 'hold'
  const connectorsVisible = phase === 'mindmap' || phase === 'fadeOut' || phase === 'returning'
  const headerVisible = phase === 'fadeOut' || phase === 'toPriority' || phase === 'badgesIn' || phase === 'hold'
  const badgesVisible = phase === 'badgesIn' || phase === 'hold'

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-xl border border-[#E5E7EB] overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {nodes
          .filter((n) => n.parent)
          .map((child) => {
            const parent = nodeById[child.parent]
            return (
              <motion.path
                key={`${child.parent}-${child.id}`}
                d={edgePath(parent.mindmap, child.mindmap)}
                stroke="#6366F1"
                strokeWidth={1.5}
                fill="none"
                initial={false}
                animate={{ opacity: connectorsVisible ? 0.6 : 0 }}
                transition={{ duration: 0.4 }}
              />
            )
          })}
      </svg>

      <AnimatePresence>
        {headerVisible && (
          <motion.div
            key="header"
            className="absolute"
            style={{
              left: (60 / VIEW_W) * size.w,
              top: (30 / VIEW_H) * size.h,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[11px] uppercase tracking-widest text-[#6366F1] font-medium">
              Priority order
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {nodes.map((n) => {
        const cardTarget = inPriorityRegion ? toPx(priorityPos(n)) : toPx(n.mindmap)
        const hideRoot = n.id === 'home' && headerVisible
        return (
          <motion.div
            key={`card-${n.id}`}
            className="absolute"
            style={{ left: 0, top: 0 }}
            initial={false}
            animate={{
              x: cardTarget.x,
              y: cardTarget.y,
              opacity: hideRoot ? 0 : 1,
            }}
            transition={{
              x: { type: 'spring', stiffness: 100, damping: 20 },
              y: { type: 'spring', stiffness: 100, damping: 20 },
              opacity: { duration: 0.4 },
            }}
          >
            <div
              className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-3 hover:shadow-sm transition-shadow"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-400 flex items-center justify-center shrink-0">
                <FileText size={16} strokeWidth={1.75} />
              </span>
              <span className="text-[14px] font-medium text-[#111827] whitespace-nowrap">
                {n.label}
              </span>
            </div>
          </motion.div>
        )
      })}

      {nodes.map((n) => {
        const target = toPx(priorityPos(n))
        const badgeOffsetX = (44 / VIEW_W) * size.w
        return (
          <motion.div
            key={`badge-${n.id}`}
            className="absolute pointer-events-none"
            style={{ left: 0, top: 0 }}
            initial={false}
            animate={{
              x: target.x - badgeOffsetX,
              y: target.y,
              opacity: badgesVisible ? 1 : 0,
              scale: badgesVisible ? 1 : 0.6,
            }}
            transition={{
              x: { duration: 0 },
              y: { duration: 0 },
              opacity: {
                duration: 0.3,
                delay: badgesVisible ? n.priorityIndex * 0.08 : 0,
              },
              scale: {
                duration: 0.3,
                delay: badgesVisible ? n.priorityIndex * 0.08 : 0,
              },
            }}
          >
            <div
              className="w-6 h-6 rounded-full bg-indigo-500 text-white text-[11px] font-medium flex items-center justify-center"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              {n.priorityIndex + 1}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StaticSplitView() {
  return (
    <div className="relative w-full h-full rounded-xl border border-[#E5E7EB] overflow-hidden bg-white">
      <div className="flex flex-col h-full divide-y divide-[#E5E7EB]">
        <div
          className="relative flex-1"
          style={{
            backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {nodes
              .filter((n) => n.parent)
              .map((child) => {
                const parent = nodeById[child.parent]
                return (
                  <path
                    key={`${child.parent}-${child.id}`}
                    d={edgePath(parent.mindmap, child.mindmap)}
                    stroke="#6366F1"
                    strokeWidth={1.5}
                    fill="none"
                    opacity={0.6}
                  />
                )
              })}
          </svg>
          {nodes.map((n) => (
            <StaticCard key={n.id} node={n} pos={n.mindmap} />
          ))}
        </div>

        <div className="relative flex-1 overflow-auto bg-white">
          <div className="px-8 py-6">
            <p className="text-[11px] uppercase tracking-widest text-[#6366F1] font-medium mb-4">
              Priority order
            </p>
            <ul className="space-y-2">
              {nodes.map((n) => (
                <li key={n.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-[11px] font-medium flex items-center justify-center shrink-0">
                    {n.priorityIndex + 1}
                  </span>
                  <div className="flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-3">
                    <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-400 flex items-center justify-center shrink-0">
                      <FileText size={16} strokeWidth={1.75} />
                    </span>
                    <span className="text-[14px] font-medium text-[#111827] whitespace-nowrap">
                      {n.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StaticCard({ node, pos }) {
  return (
    <div
      className="absolute flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-3"
      style={{
        left: `${(pos.x / VIEW_W) * 100}%`,
        top: `${(pos.y / VIEW_H) * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-400 flex items-center justify-center shrink-0">
        <FileText size={16} strokeWidth={1.75} />
      </span>
      <span className="text-[14px] font-medium text-[#111827] whitespace-nowrap">
        {node.label}
      </span>
    </div>
  )
}
