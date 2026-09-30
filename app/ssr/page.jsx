import QuakePage from '@/components/QuakePage'
import { HEAVY_DELAY_MS } from '@/lib/quakes'

export const dynamic = 'force-dynamic'

export default function SsrPage() {
  return <QuakePage slug="ssr" where="Servidor (en cada visita)" fetchOptions={{ cache: 'no-store' }} delayMs={HEAVY_DELAY_MS} />
}
