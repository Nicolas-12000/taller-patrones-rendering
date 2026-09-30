// Bloques con la misma geometría del contenido final para que nada salte al cargar.
export function SummarySkeleton() {
  return (
    <div className="metrics">
      <div className="skeleton" style={{ height: 112 }} />
      <div className="skeleton" style={{ height: 112 }} />
      <div className="skeleton" style={{ height: 112 }} />
    </div>
  )
}

export function ListSkeleton() {
  return <div className="skeleton" style={{ height: 480 }} />
}
