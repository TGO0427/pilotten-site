import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'

export default function Portal() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-lime-300 text-black grid place-items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-4">Client Portal</h1>
          <p className="text-neutral-400 mb-6">
            Your project portal link was sent in your welcome email.
            Check your inbox for an email from PilotTen with your unique access link.
          </p>
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-4 text-sm text-neutral-400">
            <p className="mb-3">Can't find your portal link?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Portal%20Access%20Request`}
              className="inline-block px-4 py-2 rounded-lg bg-white text-neutral-900 font-medium hover:opacity-90 transition"
            >
              Email {CONTACT_EMAIL}
            </a>
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
