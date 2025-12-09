import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const STUDIO_NAME = 'PilotTen'
const CONTACT_EMAIL = 'hello@pilotten.africa'

const demos = [
  {
    id: 'logistics-dispatch',
    title: 'Logistics Dispatch Dashboard',
    tagline: 'Real-time fleet tracking and order management.',
    description:
      'Live dispatch board with route optimization, driver assignments, and delivery tracking. Built for a Cape Town logistics startup to manage their first 50 daily deliveries.',
    demoUrl: 'https://your-logistics-demo-url.com',
    type: 'MVP',
    stack: ['React', 'Maps API', 'Real-time DB'],
  },
  {
    id: 'fmcg-orders',
    title: 'FMCG Order & Inventory System',
    tagline: 'From spreadsheets to streamlined ops.',
    description:
      'Mobile-first ordering portal for distributors with batch tracking, stock alerts, and automated invoicing. Helped an FMCG client land their first 12 retail accounts.',
    demoUrl: 'https://your-fmcg-demo-url.com',
    type: 'Workflow',
    stack: ['React Native', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'fintech-invoicing',
    title: 'SMB Invoicing & Collections',
    tagline: 'Get paid faster with automated reminders.',
    description:
      'Simple invoicing tool with payment tracking, automated follow-ups, and cash flow forecasting. Built for a fintech serving African SMBs.',
    demoUrl: 'https://your-fintech-demo-url.com',
    type: 'SaaS MVP',
    stack: ['Next.js', 'Stripe', 'Webhooks'],
  },
]

export default function Demos() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newX = e.clientX - rect.left
        const newY = e.clientY - rect.top

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
      {/* Animated gradient blobs with parallax */}
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
        <Header mousePosition={mousePosition} scrollY={scrollY} />

        <section className="max-w-7xl mx-auto px-6 py-24">
          <header className="mb-16">
            <div className="inline-block mb-6">
              <div className="border border-lime-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-lime-300">
                → PilotTen Demos
              </div>
            </div>
            <h1
              className="text-6xl md:text-8xl font-black leading-tight mb-6"
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
              SEE WHAT WE
              <br />
              <span className="text-lime-300">ACTUALLY SHIP.</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl leading-relaxed font-medium">
              These are small but real examples of the kind of MVPs, funnels and workflows we build to get you from{' '}
              <span className="font-black text-lime-300">zero to your first 10 customers</span>.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo, idx) => (
              <article
                key={demo.id}
                className="relative flex flex-col rounded-none border-2 border-neutral-800 bg-neutral-900/60 p-8 shadow-lg shadow-black/40 hover:border-lime-300 transition-all duration-300 group"
              >
                {/* Index indicator */}
                <div className="absolute top-4 right-4 text-xs font-black text-neutral-600 group-hover:text-lime-300 transition">
                  /{String(idx + 1).padStart(2, '0')}
                </div>

                {/* Type & Stack */}
                <div className="mb-4 inline-flex items-center gap-2 text-xs text-neutral-400">
                  <span className="rounded-none border border-neutral-700 px-2 py-1 font-black uppercase">
                    {demo.type}
                  </span>
                </div>

                <h2 className="text-2xl font-black mb-2 group-hover:text-lime-300 transition">{demo.title}</h2>
                <p className="text-sm text-lime-300 mb-4 font-bold">{demo.tagline}</p>

                <p className="text-sm text-neutral-300 mb-6 flex-grow font-medium">
                  {demo.description}
                </p>

                <div className="text-xs text-neutral-500 mb-6 font-bold">
                  Stack: {demo.stack.join(' · ')}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={demo.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-none border-2 border-lime-300 bg-lime-300/10 px-4 py-3 text-sm font-black uppercase text-lime-200 hover:bg-lime-300 hover:text-black transition"
                  >
                    View live demo
                    <span className="ml-2">↗</span>
                  </a>

                  <Link
                    to="/#contact"
                    className="text-xs text-neutral-400 hover:text-lime-300 underline-offset-4 hover:underline font-bold text-center"
                  >
                    Want something like this?
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <footer className="mt-16 text-center">
            <p className="text-lg text-neutral-300 font-medium">
              Want a custom demo for your idea?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-lime-300 underline underline-offset-4 font-black hover:text-lime-200"
              >
                Tell us what you're building
              </a>
              .
            </p>
          </footer>
        </section>

        <Footer />
      </div>
    </main>
  )
}

function Header({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
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
        <Link to="/" className="flex items-center gap-3">
          <Logo />
          <span className="font-semibold tracking-tight text-white">{STUDIO_NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
          <Link to="/#how" className="hover:text-white">How it works</Link>
          <Link to="/#offers" className="hover:text-white">Terms & Offers</Link>
          <Link to="/#sectors" className="hover:text-white">Sectors</Link>
          <Link to="/demos" className="hover:text-white font-bold text-lime-300">Demos</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://calendly.com/tinogrdn/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm px-3 py-2 rounded-xl border border-white/15 hover:border-white/30 text-white"
          >
            Book 30-min
          </a>
          <Link to="/" className="text-sm px-3 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:opacity-90">
            Apply
          </Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo small />
          <span>© {new Date().getFullYear()} PilotTen</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
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
