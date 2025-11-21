import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'
const BOOK_LINK = 'https://calendly.com/tinogrdn/30min' // live Calendly link
const APPLY_LINK = '#apply'

export default function App() {
  const [openForm, setOpenForm] = useState(false)
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header onApply={() => setOpenForm(true)} />
      <Hero onApply={() => setOpenForm(true)} />
      <TrustBar />
      <HowItWorks />
      <WhyUs />
      <Offers onApply={() => setOpenForm(true)} />
      <FocusSectors />
      <FAQ />
      <CTA onApply={() => setOpenForm(true)} />
      <Footer />
      {openForm && <ApplyModal onClose={() => setOpenForm(false)} />}
    </main>
  )
}

function Header({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`sticky top-0 z-40 backdrop-blur bg-neutral-950/95 border-b border-white/10 transition-shadow ${scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold tracking-tight text-white">{STUDIO_NAME}</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#offers" className="hover:text-white">Terms & Offers</a>
          <a href="#sectors" className="hover:text-white">Sectors</a>
          <Link to="/faq" className="hidden">FAQ</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={BOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-3 py-2 rounded-xl border border-white/15 hover:border-white/30 text-white"
          >
            Book 30-min

          </a>
          <button onClick={onApply} className="text-sm px-3 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:opacity-90">Apply</button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pb-40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Bold headline with cyan accent */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              We build your
              <br />
              <span className="text-cyan-400">MVP</span>
              <br />
              & first customers.
            </h1>
            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              Pay from success. Equity or revenue-share. For selected African B2B founders who want to build and sell, not just prototype.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <button onClick={onApply} className="px-6 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition">
                Apply now
              </button>
              <a href="#how" className="px-6 py-3 rounded-lg border border-neutral-600 hover:border-neutral-400 transition">
                How it works
              </a>
            </div>
          </div>

          {/* Right: Premium visual (can be illustration or stats later) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="inline-block px-6 py-3 rounded-lg border border-cyan-400/30 bg-cyan-400/5">
                <p className="text-cyan-400 font-semibold">POPIA • KPI-gated • Operator mindset</p>
              </div>
              <div className="text-neutral-500 text-sm space-y-2">
                <p>• Validation sprint: 2 weeks</p>
                <p>• Build phase: 8–12 weeks</p>
                <p>• Pilot & scale: ongoing support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = ['POPIA-first', 'KPI-gated vesting', 'IP escrow', 'Weekly check-ins']
  return (
    <div className="border-y border-neutral-800 py-8">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((t) => (
          <div key={t} className="text-center md:text-left">
            <p className="text-sm text-neutral-500 uppercase tracking-wide">✓ {t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Apply', desc: 'Problem, customers, traction. We score for fit.' },
    { num: '02', title: 'Validation', desc: 'Interviews, prototype, KPI sheet, pilot LOIs.' },
    { num: '03', title: 'Build', desc: 'Core flows + QA, analytics, security.' },
    { num: '04', title: 'Pilot', desc: 'Launch with customers. We help close deals.' },
    { num: '05', title: 'Scale', desc: 'Fractional CTO/PM or transition to your team.' },
  ]
  return (
    <section id="how" className="py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black">How we work</h2>
          <div className="w-12 h-1 bg-cyan-400 mt-4"></div>
        </div>

        <div className="space-y-16">
          {steps.map((s, i) => (
            <div key={i} className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="text-6xl font-black text-neutral-700">{s.num}</div>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                <p className="text-neutral-400 text-lg max-w-2xl">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const bullets = [
    { title: 'Performance-triggered', desc: 'Equity vests only when KPIs hit.' },
    { title: 'Vertical modules', desc: 'Logistics, FMCG, Fintech building blocks.' },
    { title: 'GTM included', desc: 'We help close pilot customers.' },
    { title: 'Transparent legal', desc: 'SA-ready SAFE/SSA, IP escrow, POPIA.' },
  ]
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Built for <span className="text-cyan-400">operators</span>, not just devs.
            </h2>
            <p className="mt-6 text-neutral-400 text-lg">
              We validate, build, and help you sell. Not a code shop—a growth partnership.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {bullets.map((b) => (
              <div key={b.title} className="space-y-2">
                <h4 className="font-semibold text-white">{b.title}</h4>
                <p className="text-sm text-neutral-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Offers({ onApply }: { onApply: () => void }) {
  const cards = [
    { name: 'Equity', desc: '8–15% via SAFE, KPI-gated vesting + buyback' },
    { name: 'Revenue-Share', desc: '8–12% of gross revenue, capped at 2.5×' },
    { name: 'Hybrid', desc: 'Blend of equity + revenue, 1.5× cap' },
  ]
  return (
    <section id='offers' className='py-32'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='mb-16'>
          <h2 className='text-4xl md:text-5xl font-black'>Flexible terms.</h2>
          <p className='mt-4 text-neutral-400 text-lg max-w-2xl'>Choose what works for your stage. All POPIA-compliant, transparent, KPI-gated.</p>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {cards.map((c) => (
            <div key={c.name} className='group border border-neutral-800 rounded-lg p-8 flex flex-col transition hover:border-cyan-400/50 hover:bg-slate-900/50'>
              <h3 className='text-2xl font-bold text-white group-hover:text-cyan-400 transition'>{c.name}</h3>
              <p className='mt-4 text-neutral-400'>{c.desc}</p>
              <button onClick={onApply} className='mt-8 py-2 px-4 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400 hover:text-slate-950 transition font-semibold'>
                Learn more
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FocusSectors() {
  const sectors = [
    { title: 'Logistics', desc: 'Dispatch, tracking, route optimization, inventory' },
    { title: 'FMCG', desc: 'Batch management, traceability, merchandising' },
    { title: 'Fintech', desc: 'Invoicing, payments, collections, risk' },
  ]
  return (
    <section id='sectors' className='py-32'>
      <div className='mx-auto max-w-7xl px-4'>
        <h2 className='text-4xl md:text-5xl font-black mb-16'>We focus on three sectors.</h2>

        <div className='grid md:grid-cols-3 gap-12'>
          {sectors.map((s) => (
            <div key={s.title} className='space-y-4'>
              <div className='w-16 h-1 bg-cyan-400'></div>
              <h3 className='text-xl font-bold'>{s.title}</h3>
              <p className='text-neutral-400'>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Do you take control?', a: 'No. We operate alongside you as a minority stakeholder.' },
    { q: 'Who owns the IP?', a: 'Your company. Held in escrow until milestone acceptance.' },
    { q: 'How do you collect revenue-share?', a: 'Payment processor splits (PayFast, Stripe, etc) or monthly attestation.' },
    { q: 'Can I buy back your stake?', a: 'Yes. See buyback formula on Terms once you hit scale.' },
  ]
  return (
    <section id='faq' className='py-32'>
      <div className='mx-auto max-w-4xl px-4'>
        <h2 className='text-4xl md:text-5xl font-black mb-20'>FAQ</h2>

        <div className='space-y-6'>
          {items.map((it, i) => (
            <details key={i} className='group border-b border-neutral-800 pb-6'>
              <summary className='cursor-pointer flex items-start justify-between gap-6 hover:text-cyan-400 transition'>
                <span className='font-semibold text-lg text-white'>{it.q}</span>
                <span className='text-cyan-400 group-open:rotate-180 transition flex-shrink-0 mt-1'>⌄</span>
              </summary>
              <p className='mt-4 text-neutral-400 text-base'>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ onApply }: { onApply: () => void }) {
  return (
    <section className='py-32'>
      <div className='mx-auto max-w-5xl px-4 text-center'>
        <h2 className='text-5xl md:text-6xl font-black leading-tight'>
          Ready to build and
          <br />
          <span className='text-cyan-400'>sell—not just</span>
          <br />
          prototype?
        </h2>
        <p className='mt-8 text-neutral-400 text-lg max-w-2xl mx-auto'>
          We take a handful of founders each quarter. Apply if you're serious about building with operators who care about your success.
        </p>
        <div className='mt-12 flex flex-wrap gap-4 justify-center'>
          <button onClick={onApply} className='px-8 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 transition'>
            Apply now
          </button>
          <a
            href={BOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-neutral-700 hover:border-cyan-400 hover:text-cyan-400 transition"
          >
            Book 30-min call
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className='bg-neutral-950 text-neutral-400 border-t border-white/10'>
      <div className='mx-auto max-w-7xl px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <Logo small />
          <span>© {new Date().getFullYear()} PilotTen</span>
        </div>
        <div className='flex items-center gap-4'>
          <a href='/terms' className='hover:text-white'>Terms</a>
          <a href='/privacy' className='hover:text-white'>Privacy</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className='hover:text-white'>{CONTACT_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}

function ApplyModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = React.useState<'idle'|'sending'|'success'|'error'>('idle');

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    fetch('https://formspree.io/f/xwpygadw', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then(async (r) => {
        if (!r.ok) {
          const msg = await r.text().catch(() => '');
          throw new Error(`${r.status}: ${msg}`);
        }
        const json = await r.json();
        console.log('Success response:', json);
        (window as any)?.plausible?.('Application Submitted');
        form.reset();
        setState('success');
      })
      .catch((err) => {
        console.error('Submit error:', err);
        setState('error');
      });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl h-auto max-h-[90vh] rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold">Apply to PilotTen</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>

        {state === 'success' ? (
          <div className="flex-1 overflow-y-auto p-6 text-center">
            <div className="mx-auto mb-4 h-12 w-12 grid place-items-center rounded-full bg-white text-neutral-900">✓</div>
            <h4 className="text-lg font-semibold">Application received</h4>
            <p className="mt-2 text-sm text-neutral-300">
              We'll email you within 48 hours. You can also book now:&nbsp;
              <a className="underline" href="https://calendly.com/tinogrdn/30min" target="_blank" rel="noopener noreferrer">Calendly</a>.
            </p>
            <div className="mt-6">
              <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium">Close</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <form id="apply-form" onSubmit={submit} className="flex-1 overflow-y-auto min-h-0">
              {/* Form body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <Input label="Full name" name="name" required />
                <Input label="Email" name="email" type="email" required />
                <Input label="Company" name="company" />
                <Input label="Location" name="location" />
                <div className="md:col-span-2">
                  <Label>Problem you solve</Label>
                  <textarea name="problem" required className="mt-1 w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2" rows={3} />
                </div>
                <div className="md:col-span-2">
                  <Label>Evidence of demand (LOIs, pilots, waitlist, paying users)</Label>
                  <textarea name="evidence" className="mt-1 w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2" rows={3} />
                </div>
                <div>
                  <Label>Preferred model</Label>
                  <select name="model" className="mt-1 w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2">
                    <option>Equity</option>
                    <option>Revenue-Share (Capped)</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <Label>Time commitment (hrs/week)</Label>
                  <input type="number" name="time" min={0} className="mt-1 w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2" />
                </div>
                <div className="md:col-span-2">
                  <Label>Anything else we should know?</Label>
                  <textarea name="notes" className="mt-1 w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2" rows={3} />
                </div>
                {state === 'error' && (
                  <div className="md:col-span-2 text-sm text-red-300">
                    Submission failed. Please email hello@pilotten.africa
                  </div>
                )}
              </div>
            </form>

            {/* Action bar - not scrollable */}
            <div className="flex-shrink-0 bg-neutral-950/95 backdrop-blur border-t border-white/10 px-6 py-4 flex items-center justify-end gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-white/15 hover:border-white/30">
                Cancel
              </button>
              <button
                type="submit"
                form="apply-form"
                disabled={state === 'sending'}
                className="px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium disabled:opacity-60"
              >
                {state === 'sending' ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className='block'>
      <Label>{label}</Label>
      <input type={type} name={name} required={required} className='mt-1 w-full rounded-xl bg-neutral-900 border border-white/10 px-3 py-2' />
    </label>
  )
}

function Label({ children }: { children: React.ReactNode }) { return <span className='text-xs text-neutral-400'>{children}</span> }

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className={`grid place-items-center rounded-xl bg-white text-neutral-900 ${small ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'}`}>
      <span className='font-black'>PT</span>
    </div>
  )
}

function Check() { return (<svg className='mt-1 shrink-0' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'><path d='M20 6L9 17l-5-5' /></svg>) }
function Dot() { return (<svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor' className='text-neutral-400' aria-hidden='true'><circle cx='12' cy='12' r='4' /></svg>) }
function GridBG() { return (
  <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' aria-hidden='true'>
    <defs>
      <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
        <path d='M40 0H0V40' fill='none' stroke='white' strokeOpacity='0.05' />
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#grid)' />
  </svg>) }
