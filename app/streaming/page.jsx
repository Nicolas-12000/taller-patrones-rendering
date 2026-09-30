import { Suspense } from 'react'
import PatternShell from '@/components/PatternShell'
import RenderStamp from '@/components/RenderStamp'
import SummaryView from '@/components/SummaryView'
import QuakeList from '@/components/QuakeList'
import { SummarySkeleton, ListSkeleton } from '@/components/Skeleton'
import { getQuakes, summarize, sleep, HEAVY_DELAY_MS } from '@/lib/quakes'
import { formatDateTime } from '@/lib/format'

export const dynamic = 'force-dynamic'

const fetchOptions = { cache: 'no-store' }

// Parte lenta: llega después, sin bloquear el resto.
async function SlowSummary() {
  await sleep(HEAVY_DELAY_MS)
  const { events } = await getQuakes(fetchOptions)
  return <SummaryView summary={summarize(events)} />
}

// Parte rápida.
async function QuakeSection() {
  const { events, error } = await getQuakes(fetchOptions)
  return <QuakeList events={events} error={error} />
}

export default function StreamingPage() {
  return (
    <PatternShell slug="streaming" stamp={<RenderStamp where="Servidor (esqueleto inmediato)" time={formatDateTime(new Date())} />}>
      <Suspense fallback={<ListSkeleton />}>
        <QuakeSection />
      </Suspense>
      <Suspense fallback={<SummarySkeleton />}>
        <SlowSummary />
      </Suspense>
    </PatternShell>
  )
}
