import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${
        scrolled ? 'border-b border-border' : ''
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium text-ink hover:opacity-60 transition-opacity"
        >
          Pragya Joshi
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm transition-opacity ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
            }
          >
            About
          </NavLink>
          <a
            href="https://www.linkedin.com/in/pragyadesigns/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-ink transition-transform duration-200 ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-transform duration-200 ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 flex flex-col gap-4">
          <NavLink
            to="/about"
            className="text-sm text-muted hover:text-ink"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <a
            href="https://www.linkedin.com/in/pragyadesigns/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink"
            onClick={() => setMenuOpen(false)}
          >
            LinkedIn
          </a>
        </div>
      )}
    </header>
  )
}
