import { MapPin, ArrowDownToLine, TriangleAlert, Info } from 'lucide-react'
import { formatDateTime, formatNumber } from '@/lib/format'

// Semáforo de magnitud: verde suave, maíz, mora.
const getMagnitudeLevel = (magnitude) => (magnitude >= 4 ? 'high' : magnitude >= 3 ? 'mid' : 'low')

export default function QuakeList({ events, error }) {
  if (error)
    return (
      <p className="notice error">
        <TriangleAlert size={20} aria-hidden="true" />
        {error}
      </p>
    )
  if (events.length === 0)
    return (
      <p className="notice">
        <Info size={20} aria-hidden="true" />
        No hubo sismos de magnitud 2,5 o más en los últimos 30 días.
      </p>
    )

  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Hora (Colombia)</th>
            <th>Magnitud</th>
            <th>Profundidad</th>
            <th>Lugar</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="mono">{formatDateTime(event.time)}</td>
              <td>
                <span className={`mag ${getMagnitudeLevel(event.magnitude)}`}>{formatNumber(event.magnitude)}</span>
              </td>
              <td className="mono">
                <span className="cell-icon">
                  <ArrowDownToLine size={14} aria-hidden="true" />
                  {formatNumber(event.depth, 0)} km
                </span>
              </td>
              <td>
                <span className="cell-icon">
                  <MapPin size={14} aria-hidden="true" />
                  {event.place}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
