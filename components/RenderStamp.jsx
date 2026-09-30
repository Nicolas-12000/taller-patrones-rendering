import { Clock } from 'lucide-react'

// Muestra dónde y cuándo se generó lo que ves. Es la prueba visible de cada patrón.
export default function RenderStamp({ where, time }) {
  return (
    <p className="stamp">
      <span className="tag">{where}</span>
      <span className="stamp-time">
        <Clock size={16} aria-hidden="true" />
        <span className="mono">{time}</span>
      </span>
    </p>
  )
}
