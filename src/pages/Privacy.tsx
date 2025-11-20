import React from 'react'
import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <main className='min-h-screen bg-neutral-950 text-neutral-100'>
      <div className='mx-auto max-w-3xl px-4 py-16'>
        <h1 className='text-3xl font-bold tracking-tight'>Privacy & POPIA</h1>
        <p className='mt-3 text-neutral-300'>We process only what we need to evaluate your application and deliver services. We honour POPIA rights (access, correction, deletion) and notify of any breach.</p>
        <ul className='list-disc pl-5 text-neutral-300 mt-6 space-y-1'>
          <li>Data we collect: application form details, product info you share, usage analytics.</li>
          <li>Storage & security: encrypted at rest/in transit, role‑based access, backups.</li>
          <li>Sub‑processors: limited to hosting, analytics, CRM; list available on request.</li>
          <li>Contact: hello@pilotten.africa for POPIA requests.</li>
        </ul>
        <Link to='/' className='inline-block mt-6 text-neutral-300 hover:text-white underline'>← Back to home</Link>
      </div>
    </main>
  )
}
