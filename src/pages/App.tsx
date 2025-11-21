import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'
const BOOK_LINK = 'https://calendly.com/tinogrdn/30min' // live Calendly link
const APPLY_LINK = '#apply'

export default function App() {
  const [openForm, setOpenForm] = useState(false)
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
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
    <header className={`sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-white/10 transition-shadow ${scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold tracking-tight">{STUDIO_NAME}</span>
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
            className="inline-block text-sm px-3 py-2 rounded-xl border border-white/15 hover:border-white/30"
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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30" aria-hidden>
        <GridBG />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            We build your MVP & your first 10 customers.
          </h1>
          <p className="mt-5 text-neutral-300 text-lg md:text-xl">
            Pay from success via equity or a capped revenue share. For selected African B2B founders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onApply} className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-medium">Apply now</button>
            <a href="#how" className="px-5 py-3 rounded-2xl border border-white/15 hover:border-white/30">How it works</a>
          </div>
          <p className="mt-6 text-sm text-neutral-400">POPIA-first • KPI-gated terms • Operator mindset</p>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = ['POPIA', 'SA legal templates (SAFE/SSA)', 'Analytics built-in', 'Weekly demos']
  return (
    <div className="border-y border-white/10 bg-black/20">
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300">
        {items.map((t) => (
          <span key={t} className="flex items-center gap-2">
            <Dot /> {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function HowItWorks() {
  const steps = [
    { title: 'Apply', desc: 'Tell us the problem, customers, and traction. We score for fit.' },
    { title: 'Validation sprint (2 weeks)', desc: 'Customer interviews, clickable prototype, KPI sheet, pilot LOIs.' },
    { title: 'Build (8–12 weeks)', desc: 'Ship core flows with QA, analytics, and security baked in.' },
    { title: 'Pilot (4–8 weeks)', desc: 'Launch with real customers; we help close the first deals.' },
    { title: 'Scale', desc: 'Stay with us as fractional CTO/PM/RevOps or transition to your team.' },
  ]
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight">How it works</h2>
      <div className="mt-10 grid md:grid-cols-5 gap-6">
        {steps.map((s, i) => (
          <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/5">
            <div className="text-xs text-neutral-400">Step {i + 1}</div>
            <div className="mt-2 font-semibold">{s.title}</div>
            <p className="mt-2 text-sm text-neutral-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhyUs() {
  const bullets = [
    { title: 'Performance-triggered terms', desc: 'Equity or royalty vests only when KPIs are hit.' },
    { title: 'Vertical modules', desc: 'Logistics, FMCG, Fintech building blocks speed up delivery.' },
    { title: 'GTM included', desc: 'We help secure pilot customers and build the sales motion.' },
    { title: 'Transparent legal', desc: 'SA-ready SAFE/SSA, IP escrow, POPIA DPA.' },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Why founders choose PilotTen</h2>
          <p className="mt-4 text-neutral-300">
            We’re operators, not just devs. We validate, build, and help sell your MVP.
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <Check />
                <div>
                  <div className="font-medium">{b.title}</div>
                  <p className="text-sm text-neutral-300">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold">Validation Sprint (2 weeks) – what you get</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300 list-disc pl-5">
            <li>Customer Problem Brief & Demand Signals report (LOIs/pilots)</li>
            <li>Clickable prototype of top 3 journeys (Figma)</li>
            <li>MVP PRD + KPI sheet + 12-week delivery plan</li>
            <li>Term sheet options (Equity / Rev-Share / Hybrid)</li>
          </ul>
          <p className="mt-4 text-sm text-neutral-400">Fixed price, credited to build if we proceed.</p>
        </div>
      </div>
    </section>
  )
}

function Offers({ onApply }: { onApply: () => void }) {
  const cards = [
    { name: 'Equity', badge: 'Venture-scale', points: ['0–40% cash','8–15% equity via SAFE','KPI-gated vesting + buy-back'] },
    { name: 'Revenue-Share (Capped)', badge: 'Bootstrapped', points: ['20–30% cash','8–12% of gross until 2.5×','2% tail for 18 months'] },
    { name: 'Hybrid', badge: 'Blend', points: ['Small retainer','4–8% equity + 4–6% gross','Cap 1.5×, no tail'] },
  ]
  return (
    <section id='offers' className='mx-auto max-w-7xl px-4 py-20'>
      <h2 className='text-2xl md:text-4xl font-bold tracking-tight'>Founder-friendly terms</h2>
      <p className='mt-3 text-neutral-300'>Transparent, POPIA-compliant, KPI-gated.</p>
      <div className='mt-10 grid md:grid-cols-3 gap-6'>
        {cards.map((c) => (
          <div key={c.name} className='rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col transition hover:border-white/20 hover:bg-white/[0.07]'>
            <div className='text-xs text-neutral-400'>{c.badge}</div>
            <div className='mt-1 text-xl font-semibold'>{c.name}</div>
            <ul className='mt-4 space-y-2 text-sm text-neutral-300 list-disc pl-5'>
              {c.points.map((p) => (<li key={p}>{p}</li>))}
            </ul>
            <div className='mt-6 pt-6 border-t border-white/10'>
              <button onClick={onApply} className='w-full px-4 py-3 rounded-xl bg-white text-neutral-900 font-medium'>Apply</button>
            </div>
          </div>
        ))}
      </div>
      <p className='mt-6 text-xs text-neutral-400'>*Exact numbers set per project; see public Terms page for caps, vesting, and buy-back formula.*</p>
    </section>
  )
}

function FocusSectors() {
  const sectors = [
    { title: 'Logistics', desc: 'Dispatch, tracking, FEFO/expiry, route ops' },
    { title: 'FMCG', desc: 'Batch/expiry, traceability, merchandising' },
    { title: 'Fintech', desc: 'Invoicing, payments, collections, risk' },
  ]
  return (
    <section id='sectors' className='mx-auto max-w-7xl px-4 py-16'>
      <h2 className='text-2xl md:text-4xl font-bold tracking-tight'>Focus sectors</h2>
      <div className='mt-8 grid md:grid-cols-3 gap-6'>
        {sectors.map((s) => (
          <div key={s.title} className='rounded-2xl border border-white/10 bg-white/5 p-6'>
            <div className='font-semibold'>{s.title}</div>
            <p className='mt-2 text-sm text-neutral-300'>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Do you take control?', a: 'No. We take a minority stake and operate alongside you for 6–9 months.' },
    { q: 'Who owns the IP?', a: 'Assigned to your company on milestone acceptance; held in escrow until then.' },
    { q: 'How do you collect revenue-share?', a: 'Payment-processor split (PayFast/Peach/Yoco/Stripe) or monthly attestation with audit rights.' },
    { q: 'Can I buy back equity?', a: 'Yes — see buy-back formula on our Terms page once you hit scale.' },
  ]
  return (
    <section id='faq' className='mx-auto max-w-5xl px-4 py-20'>
      <h2 className='text-2xl md:text-4xl font-bold tracking-tight text-center'>FAQ</h2>
      <div className='mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden'>
        {items.map((it) => (
          <details key={it.q} className='group open:bg-white/5'>
            <summary className='cursor-pointer list-none px-6 py-4 flex items-center justify-between'>
              <span className='font-medium'>{it.q}</span>
              <span className='text-neutral-400 group-open:rotate-180 transition'>⌄</span>
            </summary>
            <div className='px-6 pb-5 text-sm text-neutral-300'>{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}

function CTA({ onApply }: { onApply: () => void }) {
  return (
    <section className='mx-auto max-w-7xl px-4 py-24'>
      <div className='rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12 text-center'>
        <h3 className='text-3xl md:text-4xl font-bold tracking-tight'>
          Ready to build and sell — not just prototype?
        </h3>
        <p className='mt-3 text-neutral-300'>We take a handful of founders each quarter.</p>
        <div className='mt-6 flex flex-wrap gap-3 justify-center'>
          <button onClick={onApply} className='px-5 py-3 rounded-2xl bg-white text-neutral-900 font-medium'>Apply now</button>
          <a
            href={BOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl border border-white/15 hover:border-white/30"
          >
            Book 30-min

          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className='border-t border-white/10'>
      <div className='mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4'>
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
    const data = new FormData(e.currentTarget);

    fetch('https://formspree.io/f/xwpygadw', { method: 'POST', body: data })
      .then((r) => {
        if (!r.ok) throw new Error('bad');
        (window as any)?.plausible?.('Application Submitted');
        e.currentTarget.reset();
        setState('success');
      })
      .catch(() => setState('error'));
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
