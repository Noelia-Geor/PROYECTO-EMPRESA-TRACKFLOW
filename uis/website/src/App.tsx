import { Button } from './components/Button'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LocationCard } from './components/LocationCard'
import { ProcessSteps } from './components/ProcessSteps'
import { Section } from './components/Section'
import { ServiceCard } from './components/ServiceCard'
import { StatStrip } from './components/StatStrip'
import { siteContent } from './content/site'
import { Headset, RotateCcw, Truck, Warehouse } from 'lucide-react'

const serviceIcons = [Warehouse, Truck, RotateCcw, Headset]

function App() {
  const { services, process, locations, contact } = siteContent

  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <StatStrip />

        <Section
          id="servicios"
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
          className="bg-white"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((service, index) => (
              <ServiceCard
                key={service.title}
                number={index + 1}
                Icon={serviceIcons[index]}
                title={service.title}
                description={service.description}
                detail={'detail' in service ? service.detail : undefined}
              />
            ))}
          </div>
        </Section>

        <Section
          id="como-trabajamos"
          eyebrow={process.eyebrow}
          title={process.title}
          description={process.description}
          className="bg-papel"
        >
          <ProcessSteps steps={process.steps} />
        </Section>

        <Section
          id="donde-estamos"
          eyebrow={locations.eyebrow}
          title={locations.title}
          description={locations.description}
          className="bg-white"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {locations.items.map((location, index) => (
              <LocationCard key={location.city} location={location} number={index + 1} />
            ))}
          </div>
        </Section>

        <section
          id="contacto"
          className="bg-marino px-5 py-20 text-white sm:px-8 md:py-28"
          aria-labelledby="contacto-title"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 font-mono text-xs uppercase text-senal">
                {contact.eyebrow}
              </p>
              <h2
                id="contacto-title"
                className="max-w-3xl font-display text-4xl leading-[1.04] font-extrabold text-white sm:text-5xl md:text-6xl"
              >
                {contact.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                {contact.description}
              </p>
            </div>
            <Button href="#servicios">{contact.action}</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
