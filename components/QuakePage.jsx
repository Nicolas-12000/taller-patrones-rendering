import PatternShell from '@/components/PatternShell'
import RenderStamp from '@/components/RenderStamp'
import SummaryView from '@/components/SummaryView'
import QuakeList from '@/components/QuakeList'
import { getQuakes, summarize, sleep } from '@/lib/quakes'
import { formatDateTime } from '@/lib/format'

export default async function QuakePage({ slug, where, fetchOptions, delayMs = 0 }) {
  const quakesPromise = getQuakes(fetchOptions)
  // La consulta pesada y USGS corren en paralelo: el SSR espera al más lento, no a la suma.
  if (delayMs > 0) await Promise.all([quakesPromise, sleep(delayMs)])
  else await quakesPromise
  const { events, error } = await quakesPromise

  return (
    <PatternShell slug={slug} stamp={<RenderStamp where={where} time={formatDateTime(new Date())} />}>
      <SummaryView summary={summarize(events)} />
      <QuakeList events={events} error={error} />
    </PatternShell>
  )
}
