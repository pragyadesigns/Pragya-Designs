import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

// Replace FORM_ID with your Formspree form ID after signing up at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/FORM_ID'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="pt-24 pb-24 px-6 md:px-10 max-w-3xl mx-auto">
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <p className="text-xs tracking-widest uppercase text-muted mb-10">Contact</p>
        <h1 className="text-3xl md:text-4xl font-light text-ink leading-tight tracking-tight mb-4">
          Let's work together.
        </h1>
        <p className="text-sm text-muted mb-12 max-w-md leading-relaxed">
          I'm open to full-time roles, freelance projects, and collaborations. Drop me a message
          and I'll get back to you within a couple of days.
        </p>
      </motion.div>

      <motion.form
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md"
      >
        <div>
          <label htmlFor="name" className="block text-xs text-muted mb-2 tracking-wide">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors bg-white"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs text-muted mb-2 tracking-wide">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors bg-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs text-muted mb-2 tracking-wide">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full border border-border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors bg-white resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="text-sm border border-ink text-ink rounded-full px-6 py-2.5 hover:bg-ink hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send message'}
        </button>

        {status === 'error' && (
          <p className="text-xs text-red-500">
            Something went wrong. Try emailing me directly.
          </p>
        )}
      </motion.form>

      {/* Social links */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-16 flex gap-6"
      >
        <a
          href="https://www.linkedin.com/in/pragyadesigns/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-ink transition-colors underline underline-offset-4"
        >
          LinkedIn
        </a>
        <a
          href="mailto:pragyajoshi@example.com"
          className="text-xs text-muted hover:text-ink transition-colors underline underline-offset-4"
        >
          Email
        </a>
      </motion.div>
    </main>
  )
}
