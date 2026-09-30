'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Activity } from 'lucide-react'

export default function RouteProgress() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setVisible(false)
      previousPath.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || href === pathname) return
      setVisible(true)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  if (!visible) return null

  return (
    <div className="route-progress" role="status" aria-live="polite" aria-label="Cargando página">
      <div className="route-progress-track" aria-hidden="true">
        <div className="route-progress-bar" />
      </div>
      <div className="route-progress-panel">
        <span className="route-progress-spinner" aria-hidden="true">
          <Activity size={22} />
        </span>
        <span className="route-progress-text">Consultando datos…</span>
      </div>
    </div>
  )
}
