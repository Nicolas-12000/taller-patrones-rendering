import { Workflow, Zap, Hourglass, FlaskConical } from 'lucide-react'
import PatternIcon from '@/components/PatternIcon'
import { getPattern } from '@/lib/patterns'

// Encabezado común de todas las páginas: explica el patrón y muestra el sello de render.
export default function PatternShell({ slug, stamp, children }) {
  const pattern = getPattern(slug)
  const items = [
    { icon: Workflow, title: 'Cómo funciona', text: pattern.how },
    { icon: Zap, title: 'Ventaja', text: pattern.pro },
    { icon: Hourglass, title: 'Cuello de botella', text: pattern.tradeoff },
    { icon: FlaskConical, title: 'Compruébalo tú', text: pattern.check },
  ]

  return (
    <div style={{ '--accent': pattern.color }}>
      <div className="title-row">
        <span className="tile">
          <PatternIcon slug={slug} size={26} />
        </span>
        <div>
          <p className="label">{pattern.fullName}</p>
          <h1>Sismos recientes en Colombia con {pattern.name}</h1>
        </div>
      </div>

      <section className="card explain accent-top">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="explain-item">
            <span className="mini-tile">
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>

      {stamp}
      {children}
    </div>
  )
}
