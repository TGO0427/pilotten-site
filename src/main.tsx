import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import CaseStudies from './pages/CaseStudies'
import Demos from './pages/Demos'
import Builders from './pages/Builders'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/case-studies', element: <CaseStudies /> },
  { path: '/demos', element: <Demos /> },
  { path: '/builders', element: <Builders /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
