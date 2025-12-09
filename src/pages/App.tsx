import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'
const BOOK_LINK = 'https://calendly.com/tinogrdn/30min' // live Calendly link
const APPLY_LINK = '#apply'

export default function App() {
  const [openForm, setOpenForm] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newX = e.clientX - rect.left
        const newY = e.clientY - rect.top

        setMouseVelocity({
          x: (newX - lastMousePos.current.x) * 0.5,
          y: (newY - lastMousePos.current.y) * 0.5
        })

        setMousePosition({ x: newX, y: newY })
        lastMousePos.current = { x: newX, y: newY }
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Multiple animated gradient blobs with parallax */}
      {[0, 1, 2].map((i) => (
        <div
          key={`blob-${i}`}
          className="fixed pointer-events-none z-0 rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
            transform: `translate(${mousePosition.x / (15 + i * 5)}px, ${mousePosition.y / (15 + i * 5)}px) translateZ(0)`,
            background: i === 0
              ? 'radial-gradient(circle, rgba(190, 255, 0, 0.25), transparent 70%)'
              : i === 1
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.25), transparent 70%)',
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform'
          }}
          aria-hidden="true"
        />
      ))}

      {/* Animated grid with parallax */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x / 40}px, ${mousePosition.y / 40}px)`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform'
        }}
      />

      <div className="relative z-10">
        <Header onApply={() => setOpenForm(true)} mousePosition={mousePosition} scrollY={scrollY} />
        <Hero onApply={() => setOpenForm(true)} mousePosition={mousePosition} scrollY={scrollY} />
        <TrustBar />
        <HowItWorks mousePosition={mousePosition} scrollY={scrollY} />
        <WhyUs mousePosition={mousePosition} scrollY={scrollY} />
        <Offers onApply={() => setOpenForm(true)} mousePosition={mousePosition} scrollY={scrollY} />
        <FocusSectors mousePosition={mousePosition} scrollY={scrollY} />
        <FAQ />
        <CTA onApply={() => setOpenForm(true)} mousePosition={mousePosition} scrollY={scrollY} />
        <Footer />
        {openForm && <ApplyModal onClose={() => setOpenForm(false)} />}
      </div>
    </main>
  )
}

function Header({ onApply, mousePosition, scrollY }: { onApply: () => void; mousePosition: { x: number; y: number }; scrollY: number }) {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur bg-neutral-950/95 border-b border-white/10 transition-shadow ${scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.4)]' : ''}`}
      style={{
        transform: `translateY(${Math.max(0, scrollY / 50) * -1}px)`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold tracking-tight text-white">{STUDIO_NAME}</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#offers" className="hover:text-white">Terms & Offers</a>
          <a href="#sectors" className="hover:text-white">Sectors</a>
          <Link to="/demos" className="hover:text-white">Demos</Link>
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

function Hero({ onApply, mousePosition, scrollY }: { onApply: () => void; mousePosition: { x: number; y: number }; scrollY: number }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pb-40">
      {/* Digital grid background */}
      <div className="absolute inset-0 -z-10 opacity-10" aria-hidden>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="80" height="80" fill="none" stroke="#BFFF00" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: BOLD headline with vibrant accent */}
          <div className="space-y-8">
            <div className="inline-block mb-4">
              <div className="border border-lime-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-lime-300">
                → Building MVPs & Traction
              </div>
            </div>
            <h1
              className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter"
              style={{
                transform: `
                  perspective(1500px)
                  rotateX(${(mousePosition.y - 400) / 100}deg)
                  rotateY(${(mousePosition.x - 600) / 100}deg)
                  translateZ(${scrollY / 10}px)
                `,
                transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d'
              }}
            >
              We build your
              <br />
              <span className="text-lime-300 block">MVP</span>
              <span className="text-white">&amp; first</span>
              <br />
              <span className="text-lime-300">customers</span>.
            </h1>
            <p className="text-xl text-neutral-200 max-w-lg leading-relaxed font-medium">
              Pay from success. Equity or revenue-share for African B2B founders who want to build and sell—not just prototype.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <button onClick={onApply} className="px-8 py-4 rounded-none bg-lime-300 text-black font-black text-lg hover:bg-lime-200 transition active:scale-95">
                APPLY NOW
              </button>
              <Link to="/demos" className="px-8 py-4 rounded-none border-2 border-lime-300 text-lime-300 font-black text-lg hover:bg-lime-300 hover:text-black transition">
                SEE LIVE DEMOS
              </Link>
              <a href="#how" className="px-8 py-4 rounded-none border-2 border-neutral-600 text-neutral-300 font-black text-lg hover:border-neutral-400 hover:text-white transition">
                HOW IT WORKS
              </a>
            </div>
          </div>

          {/* Right: Tech-inspired visual with geometry */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Animated accent lines */}
              <div className="absolute top-0 right-0 w-1 h-32 bg-gradient-to-b from-lime-300 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-lime-300 to-transparent"></div>

              {/* Main content block */}
              <div className="bg-lime-300 text-black p-12 rounded-none space-y-6 relative z-10">
                <p className="text-sm font-black uppercase tracking-widest">What we deliver</p>
                <div className="space-y-4 text-lg font-bold">
                  <p>✓ 2-week validation sprint</p>
                  <p>✓ 8–12 week build phase</p>
                  <p>✓ Pilot support + customer launch</p>
                  <p>✓ KPI-gated equity vesting</p>
                  <p>✓ Fractional team or transition</p>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lime-300 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-lime-300 opacity-50"></div>
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

function HowItWorks({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  const steps = [
    { num: '01', title: 'Apply', desc: 'Problem, customers, traction. We score for fit.', weeks: '1 week' },
    { num: '02', title: 'Validation', desc: 'Interviews, prototype, KPI sheet, pilot LOIs.', weeks: '2 weeks' },
    { num: '03', title: 'Build', desc: 'Core flows + QA, analytics, security.', weeks: '8-12 weeks' },
    { num: '04', title: 'Pilot', desc: 'Launch with customers. We help close deals.', weeks: '4-8 weeks' },
    { num: '05', title: 'Scale', desc: 'Fractional CTO/PM or transition to your team.', weeks: 'Ongoing' },
  ]
  return (
    <section id="how" className="py-32 relative">
      {/* Subtle diagonal line accent */}
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-lime-300 opacity-10"></div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-20">
          <h2
            className="text-6xl md:text-7xl font-black"
            style={{
              transform: `
                perspective(1500px)
                rotateX(${(scrollY - 900) / 150}deg)
                rotateY(${(mousePosition.x - 400) / 150}deg)
                translateZ(${scrollY / 15}px)
              `,
              transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d'
            }}
          >
            THE PROCESS
          </h2>
          <div className="w-32 h-2 bg-lime-300 mt-6"></div>
        </div>

        <div className="space-y-12">
          {steps.map((s, i) => (
            <div key={i} className="grid md:grid-cols-12 gap-8 items-start pb-12 border-b border-neutral-800 relative">
              {/* Visual timeline dot */}
              <div className="absolute -left-6 top-0 w-4 h-4 bg-lime-300 rounded-full border-4 border-slate-950"></div>

              <div className="md:col-span-2">
                <div className="text-8xl font-black text-lime-300">{s.num}</div>
                <div className="text-xs font-black uppercase text-neutral-500 mt-4">{s.weeks}</div>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-3xl font-black mb-3 uppercase">{s.title}</h3>
                <p className="text-neutral-300 text-lg max-w-2xl font-medium">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  const bullets = [
    { title: 'PERFORMANCE-TRIGGERED', desc: 'Equity vests only when KPIs hit.' },
    { title: 'VERTICAL MODULES', desc: 'Logistics, FMCG, Fintech building blocks.' },
    { title: 'GTM INCLUDED', desc: 'We help close pilot customers.' },
    { title: 'TRANSPARENT LEGAL', desc: 'SA-ready SAFE/SSA, IP escrow, POPIA.' },
  ]
  return (
    <section className="py-32 bg-black">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-5xl md:text-6xl font-black leading-tight"
              style={{
                transform: `
                  perspective(1500px)
                  rotateX(${(scrollY - 1400) / 150}deg)
                  rotateY(${(mousePosition.x - 300) / 150}deg)
                  translateZ(${scrollY / 20}px)
                `,
                transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d'
              }}
            >
              Built for
              <br />
              <span className="text-lime-300">OPERATORS.</span>
              <br />
              Not devs.
            </h2>
            <p className="mt-6 text-neutral-200 text-lg font-medium">
              We validate, build, and help you sell. Not a code shop—a growth partner.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {bullets.map((b) => (
              <div key={b.title} className="space-y-3 bg-slate-900 p-6 border-l-4 border-lime-300">
                <h4 className="font-black text-white text-sm uppercase">{b.title}</h4>
                <p className="text-neutral-300 font-medium">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Offers({ onApply, mousePosition, scrollY }: { onApply: () => void; mousePosition: { x: number; y: number }; scrollY: number }) {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null)

  const cards = [
    { name: 'EQUITY', desc: '8–15% SAFE vesting\nKPI-gated', bg: 'bg-lime-300', text: 'text-black', accent: 'border-lime-300' },
    { name: 'REVENUE-SHARE', desc: '8–12% gross revenue\ncapped 2.5×', bg: 'bg-purple-500', text: 'text-white', accent: 'border-purple-500' },
    { name: 'HYBRID', desc: 'Equity + revenue blend\n1.5× cap', bg: 'bg-orange-500', text: 'text-white', accent: 'border-orange-500' },
  ]
  return (
    <section id='offers' className='py-32 relative'>
      {/* Geometric accent */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-lime-300 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-lime-300 opacity-20"></div>

      <div className='mx-auto max-w-7xl px-4'>
        <h2
          className='text-6xl md:text-7xl font-black mb-24'
          style={{
            transform: `
              perspective(1500px)
              rotateX(${(scrollY - 1900) / 150}deg)
              rotateY(${(mousePosition.x - 500) / 150}deg)
              translateZ(${scrollY / 20}px)
            `,
            transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d'
          }}
        >
          PICK YOUR TERMS.
        </h2>

        <div className='grid md:grid-cols-3 gap-8'>
          {cards.map((c, i) => (
            <div
              key={c.name}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className='relative group'
              style={{
                transform: hoveredCard === i ? 'perspective(1000px) scale(1.05) rotateY(-5deg)' : 'perspective(1000px) scale(1) rotateY(0deg)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 rounded-lg blur-2xl ${c.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}
              />

              <div className={`${c.bg} ${c.text} p-12 rounded-none flex flex-col justify-between min-h-80 relative overflow-hidden`}>
                {/* Animated gradient overlay */}
                <div
                  className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300'
                  style={{
                    background: hoveredCard === i ? 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.1))' : 'none'
                  }}
                />

                {/* Digital corner accent */}
                <div className='absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 opacity-40 group-hover:opacity-100 transition'></div>
                <div className='absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 opacity-40 group-hover:opacity-100 transition'></div>

                {/* Hover effect line */}
                <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 transition-all duration-300' />

                {/* Index indicator */}
                <div className='absolute top-4 left-4 text-xs font-black opacity-50'>/{String(i+1).padStart(2, '0')}</div>

                <div className='relative z-10'>
                  <h3 className='text-3xl font-black leading-tight group-hover:translate-x-2 transition-transform duration-300'>{c.name}</h3>
                  <p className='mt-6 text-lg font-bold whitespace-pre-line'>{c.desc}</p>
                </div>
                <button onClick={onApply} className='mt-8 py-3 px-6 bg-white text-black font-black uppercase hover:opacity-90 transform group-hover:translate-y-1 transition-all duration-300 relative z-10'>
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FocusSectors({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  const [hoveredSector, setHoveredSector] = React.useState<number | null>(null)

  const sectors = [
    { title: 'LOGISTICS', desc: 'Dispatch, tracking, route optimization, inventory', bg: 'bg-lime-300', text: 'text-black' },
    { title: 'FMCG', desc: 'Batch management, traceability, merchandising', bg: 'bg-purple-500', text: 'text-white' },
    { title: 'FINTECH', desc: 'Invoicing, payments, collections, risk', bg: 'bg-orange-500', text: 'text-white' },
  ]
  return (
    <section id='sectors' className='py-32'>
      <div className='mx-auto max-w-7xl px-4'>
        <h2
          className='text-6xl md:text-7xl font-black mb-20'
          style={{
            transform: `
              perspective(1500px)
              rotateX(${(scrollY - 2400) / 150}deg)
              rotateY(${(mousePosition.x - 500) / 150}deg)
              translateZ(${scrollY / 20}px)
            `,
            transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d'
          }}
        >
          WE OWN<br />THREE SECTORS.
        </h2>

        <div className='grid md:grid-cols-3 gap-8'>
          {sectors.map((s, i) => (
            <div
              key={s.title}
              onMouseEnter={() => setHoveredSector(i)}
              onMouseLeave={() => setHoveredSector(null)}
              className={`${s.bg} ${s.text} p-12 rounded-none min-h-64 flex flex-col justify-between group relative overflow-hidden`}
              style={{
                transform: hoveredSector === i ? 'perspective(1000px) scale(1.03) rotateX(-3deg)' : 'perspective(1000px) scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Animated overlay on hover */}
              <div
                className='absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300'
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)'
                }}
              />

              <div className='relative z-10'>
                <h3 className='text-3xl font-black uppercase mb-4 group-hover:translate-x-3 transition-transform duration-300'>{s.title}</h3>
                <p className='text-base font-bold group-hover:opacity-90 transition-opacity duration-300'>{s.desc}</p>
              </div>
              <p className='text-sm font-black uppercase opacity-70 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 relative z-10'>Learn more →</p>
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

function CTA({ onApply, mousePosition, scrollY }: { onApply: () => void; mousePosition: { x: number; y: number }; scrollY: number }) {
  return (
    <section className='py-32 bg-black'>
      <div className='mx-auto max-w-5xl px-4 text-center'>
        <h2
          className='text-6xl md:text-8xl font-black leading-tight'
          style={{
            transform: `
              perspective(1500px)
              rotateX(${(scrollY - 2900) / 150}deg)
              rotateY(${(mousePosition.x - 600) / 150}deg)
              translateZ(${scrollY / 20}px)
            `,
            transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d'
          }}
        >
          READY TO
          <br />
          <span className='text-lime-300'>BUILD & SELL?</span>
        </h2>
        <p className='mt-8 text-neutral-300 text-xl max-w-3xl mx-auto font-semibold'>
          We take a handful of founders each quarter. Apply if you're serious about building with operators who care.
        </p>
        <div className='mt-16 flex flex-wrap gap-6 justify-center'>
          <button onClick={onApply} className='px-10 py-5 rounded-none bg-lime-300 text-black font-black text-xl uppercase hover:bg-lime-200 transition active:scale-95'>
            APPLY NOW
          </button>
          <a
            href={BOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 rounded-none border-2 border-lime-300 text-lime-300 font-black text-xl uppercase hover:bg-lime-300 hover:text-black transition"
          >
            BOOK CALL
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
