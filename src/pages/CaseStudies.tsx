import { Link } from 'react-router-dom'

export default function CaseStudies() {
  const studies = [
    {
      title: 'Logistics Dispatch Platform',
      problem: 'Manual route planning cost a logistics startup 40% in fuel waste.',
      solution: 'Built real-time dispatch + driver tracking in 10 weeks. Integrated with PayFast for driver payouts.',
      result: '23% fuel reduction; 12 pilot customers signed pilot LOIs in week 8.',
    },
    {
      title: 'FMCG Batch Traceability',
      problem: 'FMCG distributor risked recalls—no expiry visibility across 500+ SKUs.',
      solution: 'Shipped batch-tracking MVP (QR codes → barcode reader) + compliance reports in 12 weeks.',
      result: 'Zero recalls in 6 months; secured 2.5× inventory value in additional credit lines.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <Header />
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How we built & scaled MVPs</h1>
          <p className="mt-4 text-neutral-300 text-lg">Real founders. Real timelines. Real first 10 customers.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {studies.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/[0.07]">
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">The Problem</div>
                  <p className="mt-1 text-neutral-300">{s.problem}</p>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">Our Build</div>
                  <p className="mt-1 text-neutral-300">{s.solution}</p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-neutral-400 uppercase tracking-wide font-semibold">The Win</div>
                  <p className="mt-1 text-neutral-300 font-medium text-white">{s.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-2xl font-bold">Ready to be next?</h3>
          <p className="mt-3 text-neutral-300">Apply now → 2-week validation sprint → ship with confidence.</p>
          <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-2xl bg-white text-neutral-900 font-medium">Back to home</Link>
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
          PilotTen
        </Link>
        <Link to="/" className="text-sm px-3 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:opacity-90">Back to apply</Link>
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
          <a href="mailto:hello@pilotten.africa" className="hover:text-white">hello@pilotten.africa</a>
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
