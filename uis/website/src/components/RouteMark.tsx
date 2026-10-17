type RouteMarkProps = {
  className?: string
}

// Recurso visual de TrackFlow: punto → ruta → nodo → destino.
// Se usa pequeño delante de las etiquetas de sección.
export function RouteMark({ className = '' }: RouteMarkProps) {
  return (
    <svg
      className={`h-2.5 w-14 shrink-0 ${className}`}
      viewBox="0 0 56 10"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="4" cy="5" r="3" fill="#ff6a1a" />
      <path d="M10 5H40" stroke="currentColor" strokeOpacity="0.45" strokeDasharray="2 4" strokeLinecap="round" />
      <circle cx="50" cy="5" r="3.25" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.25" />
    </svg>
  )
}
