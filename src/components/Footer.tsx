export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 px-6 md:px-10 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted">
        <span>© {year} Pragya Joshi</span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/pragyadesigns/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:pragyajoshi@example.com"
            className="hover:text-ink transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
