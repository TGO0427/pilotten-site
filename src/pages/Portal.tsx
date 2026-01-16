import { useState } from 'react'
import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'

export default function Portal() {
  const [portalUrl, setPortalUrl] = useState('')
  const [error, setError] = useState('')
  const [requestState, setRequestState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function handleOpenPortal(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmed = portalUrl.trim()
    if (!trimmed) {
      setError('Please enter your portal link')
      return
    }

    // Validate it's a Notion URL
    if (!trimmed.includes('notion.so') && !trimmed.includes('notion.site')) {
      setError('Please enter a valid Notion portal link')
      return
    }

    // Open in new tab
    window.open(trimmed, '_blank', 'noopener,noreferrer')
  }

  function handleRequestLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRequestState('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    fetch('https://formspree.io/f/xwpygadw', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error()
        form.reset()
        setRequestState('success')
      })
      .catch(() => setRequestState('error'))
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-lime-300 text-black grid place-items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-3">Client Portal</h1>
            <p className="text-neutral-400 text-sm">
              Track milestones, see timelines, leave feedback, and approve deliverables.
            </p>
          </div>

          {/* Portal link input */}
          <form onSubmit={handleOpenPortal} className="mb-6">
            <label className="block text-xs text-neutral-500 mb-2">Enter your portal link</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={portalUrl}
                onChange={(e) => setPortalUrl(e.target.value)}
                placeholder="https://notion.so/..."
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-300"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-lime-300 text-black font-bold hover:bg-lime-200 transition"
              >
                Open
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </form>

          {/* Security note */}
          <p className="text-xs text-neutral-500 text-center mb-8 flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Your portal is private and invite-only.
          </p>

          {/* Resend portal link form */}
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-5">
            <p className="text-sm font-medium text-white mb-4">Can't find your portal link?</p>

            {requestState === 'success' ? (
              <div className="text-center py-2">
                <p className="text-sm text-lime-300">Request received. We'll email your portal link shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestLink} className="space-y-3">
                <input type="hidden" name="_subject" value="Portal Link Request" />
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                />
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Project or company name"
                  className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                />

                {requestState === 'error' && (
                  <p className="text-xs text-red-400">Something went wrong. Please email {CONTACT_EMAIL} directly.</p>
                )}

                <button
                  type="submit"
                  disabled={requestState === 'sending'}
                  className="w-full px-4 py-2.5 rounded-lg bg-white text-neutral-900 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  {requestState === 'sending' ? 'Sending...' : 'Request portal link'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <Logo />
          {STUDIO_NAME}
        </Link>
        <Link
          to="/"
          className="text-sm px-3 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:opacity-90"
        >
          Back to site
        </Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo small />
          <span>© {new Date().getFullYear()} PilotTen</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/portal" className="hover:text-white">Client Portal</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className={`grid place-items-center rounded-xl bg-white text-neutral-900 ${small ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'}`}>
      <span className="font-black">PT</span>
    </div>
  )
}
