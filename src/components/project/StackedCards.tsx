import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export interface StackCard {
  title: string
  description: string
  diagram?: React.ReactNode
}

interface Props {
  cards: StackCard[]
  /** How much of each card behind peeks above the front card, in px */
  peek?: number
  /** Min height of the container — should fit front card body + (n-1)*peek */
  minHeight?: number
}

export default function StackedCards({ cards, peek = 52, minHeight = 420 }: Props) {
  // order[0] is the front card; order[1] sits behind it; order[2] behind that
  const [order, setOrder] = useState<number[]>(cards.map((_, i) => i))
  const measureRefs = useRef<(HTMLDivElement | null)[]>([])
  const [cardHeight, setCardHeight] = useState(minHeight)

  function bringToFront(cardIdx: number) {
    setOrder((prev) => {
      if (prev[0] === cardIdx) return prev
      const without = prev.filter((i) => i !== cardIdx)
      return [cardIdx, ...without]
    })
  }

  // Measure every card's natural content height and use the max so all cards
  // render at the same height — keeps cards behind from peeking out from under
  // the selected card when images have different aspect ratios.
  useLayoutEffect(() => {
    const recompute = () => {
      const heights = measureRefs.current.map((el) => el?.getBoundingClientRect().height ?? 0)
      const max = Math.max(minHeight, ...heights)
      setCardHeight(max)
    }
    recompute()
    const observer = new ResizeObserver(recompute)
    measureRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [cards, minHeight])

  const reservedHeight = cardHeight + (cards.length - 1) * peek

  return (
    <div
      className="relative w-full"
      style={{ height: reservedHeight, isolation: 'isolate' }}
    >
      {/* Offscreen mirrors — measure natural content height of each card */}
      <div className="absolute left-0 right-0 invisible pointer-events-none" aria-hidden="true">
        {cards.map((card, cardIdx) => (
          <div
            key={`measure-${cardIdx}`}
            ref={(el) => { measureRefs.current[cardIdx] = el }}
            className="absolute left-0 right-0 rounded-2xl border border-border bg-white overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border flex items-start gap-3">
              <span className="text-[10px] uppercase tracking-widest text-muted mt-0.5 shrink-0">
                {String(cardIdx + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{card.title}</p>
                <p className="text-sm text-muted leading-relaxed mt-1">{card.description}</p>
              </div>
            </div>
            <div className="p-5">
              {card.diagram && <div>{card.diagram}</div>}
            </div>
          </div>
        ))}
      </div>
      {cards.map((card, cardIdx) => {
        const stackPos = order.indexOf(cardIdx) // 0 = front, 1 = first behind, etc.
        const isFront = stackPos === 0
        // Front card sits lowest; cards behind have their tops poking up above it
        const top = (cards.length - 1 - stackPos) * peek
        const scale = 1 - stackPos * 0.015

        return (
          <motion.div
            key={cardIdx}
            initial={false}
            animate={{
              top,
              scale,
              zIndex: cards.length - stackPos,
              boxShadow: isFront
                ? '0 8px 24px -8px rgba(0,0,0,0.12)'
                : '0 2px 6px -2px rgba(0,0,0,0.08)',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            className="absolute left-0 right-0 rounded-2xl border border-border bg-white overflow-hidden"
            style={{ cursor: isFront ? 'default' : 'pointer', transformOrigin: 'top center', height: cardHeight }}
            onClick={() => !isFront && bringToFront(cardIdx)}
            whileHover={!isFront ? { y: -3 } : undefined}
          >
            {/* Title strip — always visible */}
            <div
              className={`px-5 py-4 border-b border-border flex items-start justify-between gap-4 ${
                isFront ? 'bg-stone-50' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-[10px] uppercase tracking-widest text-muted mt-0.5 shrink-0">
                  {String(cardIdx + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{card.title}</p>
                  {isFront && <p className="text-sm text-muted leading-relaxed mt-1">{card.description}</p>}
                </div>
              </div>
              {!isFront && (
                <span className="text-[10px] uppercase tracking-widest text-muted/60 shrink-0 mt-0.5">
                  Click to view
                </span>
              )}
            </div>

            {/* Body — diagram only */}
            <div className="p-5">
              {card.diagram && <div>{card.diagram}</div>}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
