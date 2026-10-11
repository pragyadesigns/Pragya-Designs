import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const LINKS = [
  { label: 'Work', to: '/', external: false },
  { label: 'About', to: '/about', external: false },
  { label: 'LinkedIn', to: 'https://www.linkedin.com/in/pragyadesigns/', external: true },
] as const

export default function Nav() {
  const { pathname } = useLocation()

  // Work covers the home page and every case study beneath it, so the nav
  // never goes stateless on a project page.
  const isActive = (to: string) =>
    to === '/' ? pathname === '/' || pathname.startsWith('/projects') : pathname === to

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-328 items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="text-label-14 font-medium text-foreground transition-opacity hover:opacity-60"
        >
          Pragya Joshi
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          {LINKS.map(({ label, to, external }) =>
            external ? (
              <a
                key={label}
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-label-14 text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
                <ArrowUpRight size={13} strokeWidth={1.8} className="shrink-0" />
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                aria-current={isActive(to) ? 'page' : undefined}
                className={`text-label-14 transition-colors hover:text-foreground ${
                  isActive(to) ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {label}
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  )
}
