import { useEffect, useRef, useState } from 'react'

type Item = { id: string; label: string }

// Clears the floating Nav pill (bottoms out at 76px) plus the mobile bar's own height.
const SCROLL_OFFSET = 140

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/**
 * Collects every element on the page carrying `data-toc="Label"` and tracks which
 * one the reader is in. Sections own their own labels — nothing to keep in sync here.
 */
function useToc(contentKey?: string) {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const found: Item[] = []
    document.querySelectorAll<HTMLElement>('[data-toc]').forEach((el, i) => {
      const label = el.dataset.toc?.trim()
      if (!label) return
      if (!el.id) el.id = `${slugify(label)}-${i}`
      // Set here rather than in markup so the offset can never drift from SCROLL_OFFSET.
      el.style.scrollMarginTop = `${SCROLL_OFFSET}px`
      found.push({ id: el.id, label })
    })
    setItems(found)
    setActive(found[0]?.id ?? '')
  }, [contentKey])

  useEffect(() => {
    if (items.length === 0) return
    let frame = 0

    const measure = () => {
      const line = SCROLL_OFFSET + 24
      let current = items[0].id
      for (const { id } of items) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // Short trailing sections can never reach the line — hand them the last scroll.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = items[items.length - 1].id
      }
      setActive(current)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  // Context + Outcome alone isn't a table of contents — needs a marked-up process.
  return { items: items.length < 3 ? [] : items, active }
}

/** Left rail list. ProjectPage's rail column owns the sticky positioning. */
export function TocRail({ contentKey }: { contentKey?: string }) {
  const { items, active } = useToc(contentKey)
  if (items.length === 0) return null

  return (
    <nav
      data-toc-rail
      aria-label="On this page"
      className="hidden xl:block max-h-[calc(100vh-11rem)] overflow-y-auto"
    >
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`block text-copy-14 transition-colors ${ isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground' }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Horizontal pill bar for viewports too narrow to afford the rail. */
export default function TocBar({ contentKey }: { contentKey?: string }) {
  const { items, active } = useToc(contentKey)
  const barRef = useRef<HTMLDivElement>(null)

  // Keep the active pill visible as the bar overflows.
  useEffect(() => {
    const bar = barRef.current
    if (!bar || !active) return
    const link = bar.querySelector<HTMLElement>(`[data-toc-link="${CSS.escape(active)}"]`)
    if (!link) return
    bar.scrollTo({
      left: link.offsetLeft - (bar.clientWidth - link.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [active])

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="xl:hidden sticky top-[84px] z-30 mb-16">
      <div
        ref={barRef}
        className="flex items-center gap-1 p-1 rounded-full border border-border bg-card/85 backdrop-blur-md shadow-xs overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-toc-link={item.id}
              aria-current={isActive ? 'true' : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-copy-13 whitespace-nowrap transition-colors ${ isActive ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-muted' }`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
