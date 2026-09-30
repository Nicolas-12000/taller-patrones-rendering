import Link from 'next/link'
import { Activity, ArrowRight, Database, MapPinned } from 'lucide-react'
import PatternIcon from '@/components/PatternIcon'
import SeismoHero from '@/components/SeismoHero'
import { patterns } from '@/lib/patterns'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-kicker">
            <Activity size={16} aria-hidden="true" />
            Programación Web · Taller de patrones de rendering
          </p>
          <h1>Sismos en Colombia: ¿qué tan fresco debe ser el dato?</h1>
          <p>Cinco formas de renderizar la misma página. Compara cuándo se genera, cuánto tarda y qué tan actual es cada una.</p>
        </div>
        <SeismoHero />
      </section>

      <section className="grid two">
        <div className="card info accent-left" style={{ '--accent': '#A8395A' }}>
          <span className="mini-tile">
            <MapPinned size={18} aria-hidden="true" />
          </span>
          <p>
            Colombia está donde se juntan las placas Nazca, Caribe y Suramericana, y ciudades como Pasto conviven con el
            volcán Galeras. Consultar un sismo reciente es una necesidad real.
          </p>
        </div>
        <div className="card info accent-left" style={{ '--accent': '#2C6E91' }}>
          <span className="mini-tile">
            <Database size={18} aria-hidden="true" />
          </span>
          <p>
            Mostramos sismos de magnitud 2,5 o más de los últimos 30 días (fuente USGS). El dato envejece en minutos, y
            por eso sirve para comparar patrones.
          </p>
        </div>
      </section>

      <h2 className="section-title">Elige un patrón</h2>
      <div className="grid">
        {patterns.map((pattern) => (
          <Link key={pattern.slug} href={`/${pattern.slug}`} className="card link-card accent-top" style={{ '--accent': pattern.color }}>
            <div className="link-card-head">
              <span className="tile">
                <PatternIcon slug={pattern.slug} />
              </span>
              <div>
                <h2>{pattern.name}</h2>
                <p className="hint">{pattern.fullName}</p>
              </div>
            </div>
            <p>
              <strong>Encaja con:</strong> {pattern.fit}
            </p>
            <span className="go">
              Ver el patrón <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
