import { logisticaInversa as datos } from '../data/logistica-inversa'

export function LogisticaInversa() {
  return (
    <>
      <header className="max-w-3xl">
        <p className="font-mono text-xs tracking-wider text-niebla uppercase">Área</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-crema sm:text-4xl">Logística inversa</h1>
        <p className="mt-3 text-lg text-niebla">{datos.situacion}</p>
      </header>

      <dl className="mt-10 grid gap-5 sm:grid-cols-3">
        <div className="rounded-lg border border-white/5 bg-superficie p-6">
          <dt className="text-sm text-niebla">Responsable</dt>
          <dd className="mt-2 font-display text-2xl font-bold text-crema">{datos.responsable}</dd>
        </div>
        <div className="rounded-lg border border-white/5 bg-superficie p-6">
          <dt className="text-sm text-niebla">Equipo</dt>
          <dd className="mt-2 font-display text-4xl font-extrabold text-senal">
            {datos.equipo} <span className="text-lg font-bold text-crema">personas</span>
          </dd>
        </div>
        <div className="rounded-lg border border-white/5 bg-superficie p-6">
          <dt className="text-sm text-niebla">Devoluciones</dt>
          <dd className="mt-2 font-display text-4xl font-extrabold text-senal">{datos.devoluciones}</dd>
          <dd className="mt-1 text-sm text-crema/85">{datos.devolucionesDetalle}</dd>
        </div>
      </dl>

      <section aria-labelledby="decisiones" className="mt-12">
        <h2 id="decisiones" className="font-display text-2xl font-bold text-crema">
          Decisiones de cada devolución
        </h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {datos.decisiones.map((decision, index) => (
            <li key={decision.pregunta} className="rounded-lg border border-white/5 bg-superficie p-6">
              <span className="font-mono text-sm text-senal">{String(index + 1).padStart(2, '0')}</span>
              <p className="mt-2 font-display text-lg font-bold text-crema">{decision.pregunta}</p>
              <p className="mt-1 text-sm text-niebla">{decision.opciones}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-niebla">{datos.decisionesNota}</p>
      </section>

      <section aria-labelledby="problemas" className="mt-12">
        <h2 id="problemas" className="font-display text-2xl font-bold text-crema">
          Problemas actuales
        </h2>
        <ul className="mt-5 space-y-3">
          {datos.problemas.map((problema) => (
            <li key={problema} className="flex gap-3 rounded-lg border border-white/5 bg-superficie p-5 text-crema/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-senal" aria-hidden="true" />
              {problema}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="necesidades" className="mt-12">
        <h2 id="necesidades" className="font-display text-2xl font-bold text-crema">
          Qué necesita el área
        </h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {datos.necesidades.map((necesidad) => (
            <li key={necesidad.titulo} className="rounded-lg border border-white/5 bg-superficie p-6">
              <p className="font-display text-lg font-bold text-crema">{necesidad.titulo}</p>
              <p className="mt-1 text-sm text-niebla">{necesidad.descripcion}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-display text-lg font-bold text-crema">Flujo de recogida previsto</h3>
        <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          {datos.flujoRecogida.map((paso, index) => (
            <li key={paso} className="flex items-center gap-3">
              {index > 0 ? <span className="hidden h-px w-6 bg-niebla/40 sm:block" aria-hidden="true" /> : null}
              <span className="rounded-md border border-white/10 bg-superficie px-4 py-2 text-sm font-medium text-crema">
                {paso}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
