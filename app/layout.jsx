import Link from 'next/link'
import { Activity } from 'lucide-react'
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import NavLinks from '@/components/NavLinks'
import RouteProgress from '@/components/RouteProgress'
import './globals.css'

const display = Fraunces({ subsets: ['latin'], weight: ['600'], variable: '--font-display' })
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata = {
  title: 'Sismos Colombia · Taller de rendering',
  description: 'Patrones de rendering (CSR, SSR, SSG, ISR y Streaming) aplicados a sismos en Colombia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-CO" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <RouteProgress />
        <header className="header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <span className="brand-mark">
                <Activity size={18} aria-hidden="true" />
              </span>
              Sismos Colombia
            </Link>
            <NavLinks />
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            Datos: USGS Earthquake Catalog. Para información oficial, consulta el Servicio Geológico Colombiano.
          </div>
        </footer>
      </body>
    </html>
  )
}
