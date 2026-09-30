'use client'

import { useEffect, useState } from 'react'
import PatternShell from '@/components/PatternShell'
import RenderStamp from '@/components/RenderStamp'
import SummaryView from '@/components/SummaryView'
import QuakeList from '@/components/QuakeList'
import { SummarySkeleton, ListSkeleton } from '@/components/Skeleton'
import { summarize } from '@/lib/quakes'
import { formatDateTime } from '@/lib/format'

export default function CsrPage() {
  const [state, setState] = useState({ loading: true, events: [], error: null, loadedAt: null })

  useEffect(() => {
    fetch('/api/quakes')
      .then((response) => response.json())
      .then(({ events, error }) => setState({ loading: false, events, error, loadedAt: new Date() }))
      .catch(() =>
        setState({ loading: false, events: [], error: 'No pudimos consultar el servicio de sismos.', loadedAt: new Date() })
      )
  }, [])

  const stamp = <RenderStamp where="Navegador" time={state.loadedAt ? formatDateTime(state.loadedAt) : 'Cargando…'} />

  return (
    <PatternShell slug="csr" stamp={stamp}>
      {state.loading ? (
        <>
          <SummarySkeleton />
          <ListSkeleton />
        </>
      ) : (
        <>
          <SummaryView summary={summarize(state.events)} />
          <QuakeList events={state.events} error={state.error} />
        </>
      )}
    </PatternShell>
  )
}
