import { cache } from 'react'

// Fuente de datos: USGS (gratuita, sin API key). Zona: Colombia y alrededores.
// Fuente oficial local para consultar: Servicio Geológico Colombiano (sgc.gov.co).
const BASE_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
const FETCH_TIMEOUT_MS = 8000
const COLOMBIA_BOX = {
  minlatitude: -4.5,
  maxlatitude: 13.5,
  minlongitude: -79.5,
  maxlongitude: -66.5,
}

// Simula una consulta pesada (agregaciones, cruces de tablas, etc.)
export const HEAVY_DELAY_MS = 2000

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function buildUrl() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const params = new URLSearchParams({
    format: 'geojson',
    orderby: 'time',
    limit: '15',
    minmagnitude: '2.5',
    starttime: thirtyDaysAgo.toISOString().slice(0, 10),
    ...COLOMBIA_BOX,
  })
  return `${BASE_URL}?${params}`
}

const FETCH_PROFILES = {
  dynamic: { cache: 'no-store' },
  static: { cache: 'force-cache' },
  isr: { next: { revalidate: 60 } },
}

function toProfile(fetchOptions = {}) {
  if (fetchOptions?.next?.revalidate != null) return 'isr'
  if (fetchOptions?.cache === 'force-cache') return 'static'
  return 'dynamic'
}

async function fetchQuakesFromUsgs(fetchOptions) {
  try {
    const response = await fetch(buildUrl(), {
      ...fetchOptions,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })
    if (!response.ok) throw new Error(`USGS respondió ${response.status}`)
    const data = await response.json()
    const events = data.features.map((feature) => ({
      id: feature.id,
      place: feature.properties.place,
      magnitude: feature.properties.mag,
      time: feature.properties.time,
      depth: feature.geometry.coordinates[2],
    }))
    return { events, error: null }
  } catch {
    return { events: [], error: 'No pudimos consultar el servicio de sismos. Intenta de nuevo en un momento.' }
  }
}

// Una sola consulta a USGS por petición HTTP (evita duplicados en Streaming SSR).
const getQuakesForProfile = cache(async (profile) => {
  return fetchQuakesFromUsgs(FETCH_PROFILES[profile] ?? FETCH_PROFILES.dynamic)
})

// fetchOptions es lo único que cambia entre patrones (cache, revalidate, etc.)
export async function getQuakes(fetchOptions = {}) {
  return getQuakesForProfile(toProfile(fetchOptions))
}

export function summarize(events) {
  if (events.length === 0) return null
  const strongest = events.reduce((max, event) => (event.magnitude > max.magnitude ? event : max))
  const averageDepth = events.reduce((sum, event) => sum + event.depth, 0) / events.length
  return { total: events.length, strongest, averageDepth }
}
