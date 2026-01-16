import React from 'react'
import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'

export default function Builders() {
  const [state, setState] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    fetch('https://formspree.io/f/xwpygadw', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status}`)
        form.reset()
        setState('success')
      })
      .catch(() => setState('error'))
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center">
        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-6">
          For developers — not clients
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Build with PilotTen
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          This page is for developers applying to join the PilotTen delivery network.
          We partner with exceptional builders who want to ship real products for African startups.
        </p>
      </section>

      {/* What we look for */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">What we look for</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Ship fast, iterate faster',
              desc: 'You can take a rough idea and deliver a working MVP in days, not months.',
            },
            {
              title: 'Full-stack comfort',
              desc: 'Frontend, backend, databases, deployments. You can handle the whole stack.',
            },
            {
              title: 'Landing pages + lead capture',
              desc: 'You can build conversion-focused pages with forms, tracking, and integrations (our Launch Kit work).',
            },
            {
              title: 'Notion/Airtable + automations',
              desc: 'You know your way around no-code CRMs, Zapier/Make, and workflow automations (our Lead Engine work).',
            },
            {
              title: 'Clear communicator',
              desc: 'You write clean code and cleaner messages. Async-first, no hand-holding needed.',
            },
            {
              title: 'African context',
              desc: 'Bonus if you understand building for African markets, infra constraints, and payment rails.',
            },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 rounded-xl p-6">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">How it works</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-lime-300 text-black grid place-items-center font-black text-sm shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold">Apply below</h3>
              <p className="text-sm text-neutral-400">Tell us about your experience, stack, and what kind of work excites you.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-lime-300 text-black grid place-items-center font-black text-sm shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold">Paid trial project</h3>
              <p className="text-sm text-neutral-400 mb-3">
                If there's a fit, we'll start with a small paid project (4–8 hours, typically R5k–15k). Real work, fair pay.
              </p>
              <ul className="text-sm text-neutral-500 space-y-1">
                <li>• Submit: Vercel link + Loom walkthrough + README</li>
                <li>• Payment within 5 business days of approval</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-lime-300 text-black grid place-items-center font-black text-sm shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold">Join the roster</h3>
              <p className="text-sm text-neutral-400">Crush it and you're in. We match you with projects based on your skills and availability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Our standards</h2>
        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-4 text-sm">
          <p><strong className="text-white">Code quality:</strong> Clean, typed, tested where it matters. No spaghetti.</p>
          <p><strong className="text-white">Communication:</strong> Daily async updates. Surface blockers early. No surprises.</p>
          <p><strong className="text-white">Delivery:</strong> Ship something usable, then iterate. Perfect is the enemy of shipped.</p>
          <p><strong className="text-white">Ownership:</strong> You own your work end-to-end. We trust you to figure it out.</p>
          <p><strong className="text-white">No client calls:</strong> You don't handle client communication — PilotTen manages scope, QA, and delivery.</p>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" className="mx-auto max-w-4xl px-4 py-12 pb-24">
        <h2 className="text-2xl font-bold mb-8">Apply to build with us</h2>

        {state === 'success' ? (
          <div className="bg-neutral-900 border border-lime-300/30 rounded-xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-lime-300 text-black grid place-items-center font-black">
              ✓
            </div>
            <h3 className="font-bold text-lg mb-2">Application received</h3>
            <p className="text-neutral-400 text-sm">
              We'll review and get back to you within a week if there's a fit.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <input type="hidden" name="_subject" value="Builder Application" />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Full name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">GitHub URL *</label>
                <input
                  type="url"
                  name="github"
                  required
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Portfolio / live links</label>
                <input
                  type="url"
                  name="portfolio"
                  placeholder="https://..."
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Primary stack *</label>
              <input
                type="text"
                name="stack"
                required
                placeholder="e.g. React, Node, PostgreSQL, AWS"
                className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Location / timezone *</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. Cape Town, GMT+2"
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-1">Weekly availability *</label>
                <select
                  name="availability"
                  required
                  className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
                >
                  <option value="">Select...</option>
                  <option value="10-20 hours">10-20 hours</option>
                  <option value="20-30 hours">20-30 hours</option>
                  <option value="30-40 hours">30-40 hours</option>
                  <option value="Full-time">Full-time available</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Tell us about a project you shipped *</label>
              <textarea
                name="project"
                required
                rows={4}
                placeholder="What was it? What was your role? What did you learn?"
                className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Anything else?</label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Rate expectations, preferred project types, etc."
                className="w-full rounded-xl bg-neutral-900 border border-white/10 px-4 py-3"
              />
            </div>

            {state === 'error' && (
              <p className="text-sm text-red-400">
                Something went wrong. Please email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> directly.
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full md:w-auto px-8 py-3 rounded-xl bg-lime-300 text-black font-bold hover:bg-lime-200 transition disabled:opacity-60"
            >
              {state === 'sending' ? 'Sending...' : 'Submit Application'}
            </button>
          </form>
        )}
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
          <Link to="/builders" className="hover:text-white">Builders</Link>
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
