import { Activity, Flame, ArrowDownToLine } from 'lucide-react'
import { formatNumber } from '@/lib/format'

export default function SummaryView({ summary }) {
  if (!summary) return null

  const metrics = [
    { icon: Activity, label: 'Sismos en 30 días', value: summary.total, color: '#2C6E91' },
    {
      icon: Flame,
      label: 'Mayor magnitud',
      value: formatNumber(summary.strongest.magnitude),
      hint: summary.strongest.place,
      color: '#A8395A',
    },
    { icon: ArrowDownToLine, label: 'Profundidad media', value: `${formatNumber(summary.averageDepth, 0)} km`, color: '#52701B' },
  ]

  return (
    <div className="metrics">
      {metrics.map(({ icon: Icon, label, value, hint, color }) => (
        <div key={label} className="card metric" style={{ '--metric': color }}>
          <span className="mini-tile metric-tile">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="label">{label}</p>
            <p className="num">{value}</p>
            {hint && <p className="hint">{hint}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
