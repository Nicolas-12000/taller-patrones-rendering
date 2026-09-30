'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PatternIcon from '@/components/PatternIcon'
import { patterns } from '@/lib/patterns'

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav aria-label="Patrones de rendering">
      {patterns.map((pattern) => {
        const isActive = pathname === `/${pattern.slug}`
        return (
          <Link
            key={pattern.slug}
            href={`/${pattern.slug}`}
            className={isActive ? 'pill active' : 'pill'}
            aria-current={isActive ? 'page' : undefined}
            style={{ '--accent': pattern.color }}
          >
            <PatternIcon slug={pattern.slug} size={16} />
            {pattern.name}
          </Link>
        )
      })}
    </nav>
  )
}
