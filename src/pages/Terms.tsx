import React from 'react'
import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <main className='min-h-screen bg-neutral-950 text-neutral-100'>
      <div className='mx-auto max-w-3xl px-4 py-16'>
        <h1 className='text-3xl font-bold tracking-tight'>Terms & Offers</h1>
        <p className='mt-3 text-neutral-300'>Summary of founder‑friendly models. For full legal terms, request our SAFE/SSA and Revenue‑Share drafts.</p>
        <div className='mt-8 space-y-6'>
          <section className='rounded-2xl border border-white/10 bg-white/5 p-6'>
            <h2 className='text-xl font-semibold'>Offer A — Equity (Venture‑scale)</h2>
            <ul className='list-disc pl-5 text-neutral-300 mt-2 space-y-1'>
              <li>0–40% cash + 8–15% equity via SAFE (cap & 20% discount)</li>
              <li>KPI‑gated vesting across Prototype, MVP, Pilot, Traction</li>
              <li>Buy‑back option post‑scale at FMV × % × 0.7 (window applies)</li>
            </ul>
          </section>
          <section className='rounded-2xl border border-white/10 bg-white/5 p-6'>
            <h2 className='text-xl font-semibold'>Offer B — Revenue‑Share (Capped)</h2>
            <ul className='list-disc pl-5 text-neutral-300 mt-2 space-y-1'>
              <li>20–30% cash + 8–12% of gross revenue until 2.5× cap</li>
              <li>2% tail for 18 months after cap</li>
              <li>Switch‑to‑cash if you raise or hit traction for 3 months</li>
            </ul>
          </section>
          <section className='rounded-2xl border border-white/10 bg-white/5 p-6'>
            <h2 className='text-xl font-semibold'>Offer C — Hybrid</h2>
            <ul className='list-disc pl-5 text-neutral-300 mt-2 space-y-1'>
              <li>Small retainer + 4–8% equity + 4–6% revenue share (cap 1.5×)</li>
              <li>Graduation on seed: retainer converts to support plan</li>
            </ul>
          </section>
        </div>
        <p className='mt-10 text-sm text-neutral-400'>POPIA‑first. IP escrow until milestones accepted. Monthly metrics pack. Jurisdiction: South Africa.</p>
        <Link to='/' className='inline-block mt-6 text-neutral-300 hover:text-white underline'>← Back to home</Link>
      </div>
    </main>
  )
}
