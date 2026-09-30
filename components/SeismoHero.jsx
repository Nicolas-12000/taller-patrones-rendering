'use client'

import { useEffect, useRef } from 'react'

const WAVE_POINTS =
  '0,60 60,60 80,58 95,64 110,30 125,95 140,10 158,108 175,40 190,72 205,55 220,62 260,60 340,60 360,57 372,66 385,42 398,80 412,54 425,62 480,60 600,60'

const DURATION_MS = 2400
const DELAY_MS = 300

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export default function SeismoHero() {
  const lineRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const length = line.getTotalLength()
    line.style.strokeDasharray = String(length)
    line.style.strokeDashoffset = String(length)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      line.style.strokeDashoffset = '0'
      return
    }

    let frameId = 0
    const startAt = performance.now() + DELAY_MS

    const tick = (now) => {
      if (now < startAt) {
        frameId = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(1, (now - startAt) / DURATION_MS)
      line.style.strokeDashoffset = String(length * (1 - easeOutCubic(progress)))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <svg className="seismo" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="60" x2="600" y2="60" className="seismo-axis" />
      <polyline ref={lineRef} className="seismo-line" points={WAVE_POINTS} />
    </svg>
  )
}
