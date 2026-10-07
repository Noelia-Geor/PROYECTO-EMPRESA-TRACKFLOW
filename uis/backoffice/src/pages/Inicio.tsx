import { areas } from '../data/empresa'

export function Inicio() {
  return (
    <>
      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-crema sm:text-4xl">Panel interno</h1>
        <p className="mt-3 text-lg text-niebla">
          Las siete áreas de TrackFlow, quién las lidera y una cifra clave de cada una, según el briefing de la empresa.
        </p>
      </header>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {areas.map((area) => {
          const fila = area.nombre === 'Dirección ejecutiva'
          return (
            <li
              key={area.nombre}
              className={`flex flex-col rounded-lg border border-white/5 bg-elevada p-6 ${
                fila ? 'sm:col-span-full lg:grid lg:grid-cols-3 lg:items-center lg:gap-8' : ''
              }`}
            >
              <div>
                <h2 className="font-display text-xl font-bold text-crema">{area.nombre}</h2>
                <p className="mt-1 text-sm text-niebla">
                  {area.responsable ? (
                    <>
                      <span className="font-medium text-crema">{area.responsable}</span> · {area.cargo}
                    </>
                  ) : (
                    area.cargo
                  )}
                </p>
              </div>

              <div className={fila ? 'lg:text-center' : ''}>
                <p className={`mt-6 font-display text-4xl font-extrabold text-senal ${fila ? 'lg:mt-0' : ''}`}>
                  {area.cifra}
                </p>
                <p className="mt-1 text-sm text-crema/85">{area.cifraDetalle}</p>
              </div>

              {area.situacion ? (
                <p
                  className={`mt-5 border-t border-white/10 pt-4 text-sm text-niebla ${
                    fila ? 'lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8' : ''
                  }`}
                >
                  {area.situacion}
                </p>
              ) : null}
            </li>
          )
        })}
      </ul>
    </>
  )
}
