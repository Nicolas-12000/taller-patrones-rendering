import { Activity } from 'lucide-react'
import { SummarySkeleton, ListSkeleton } from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className="page-loading" role="status" aria-live="polite" aria-label="Cargando contenido">
      <div className="page-loading-head">
        <span className="route-progress-spinner" aria-hidden="true">
          <Activity size={22} />
        </span>
        <p className="page-loading-title">Cargando patrón…</p>
        <p className="hint">El servidor está preparando la página.</p>
      </div>
      <SummarySkeleton />
      <ListSkeleton />
    </div>
  )
}
