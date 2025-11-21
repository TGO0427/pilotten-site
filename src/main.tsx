import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import CaseStudies from './pages/CaseStudies'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/case-studies', element: <CaseStudies /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
