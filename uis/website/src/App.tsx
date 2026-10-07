import { BrandPromise } from './components/BrandPromise'
import { Button } from './components/Button'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProcessSteps } from './components/ProcessSteps'
import { RouteMap } from './components/RouteMap'
import { Section } from './components/Section'
import { ServiceCard } from './components/ServiceCard'
import { StatStrip } from './components/StatStrip'
import { siteContent } from './content/site'
import { useReveal } from './components/useReveal'
import { Headset, RotateCcw, Truck, Warehouse } from 'lucide-react'

const serviceIcons = [Warehouse, Truck, RotateCcw, Headset]

function App() {
  const { services, process, locations, carriers, contact } = siteContent
  useReveal()

  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <StatStrip />
        <BrandPromise />

        <Section id="servicios" eyebrow={services.eyebrow} title={services.title} description={services.description}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((service, index) => (
              <ServiceCard
                key={service.title}
                number={index + 1}
                total={services.items.length}
                Icon={serviceIcons[index]}
                title={service.title}
                description={service.description}
                fact={'fact' in service ? service.fact : undefined}
              />
            ))}
          </div>
        </Section>

        <ProcessSteps
          id="como-trabajamos"
          eyebrow={process.eyebrow}
          title={process.title}
          description={process.description}
          steps={process.steps}
        />

        <RouteMap
          id="donde-estamos"
          eyebrow={locations.eyebrow}
          title={locations.title}
          description={locations.description}
          locations={locations.items}
          carriers={carriers}
        />

        <section id="contacto" className="px-5 pb-24 pt-24 sm:px-8 md:pb-32 md:pt-32" aria-labelledby="contacto-title">
          <div
            className="mx-auto flex max-w-7xl flex-col items-start gap-10 border-t border-white/10 pt-16 md:flex-row md:items-end md:justify-between"
            data-reveal
          >
            <div className="max-w-3xl">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.08em] text-senal">{contact.eyebrow}</p>
              <h2
                id="contacto-title"
                className="font-display text-4xl leading-[1.04] font-extrabold text-balance text-crema md:text-[3.4rem]"
              >
                {contact.title}
              </h2>
              <p className="mt-6 max-w-[38rem] text-lg leading-8 text-niebla">{contact.description}</p>
            </div>
            <Button href="#como-trabajamos">{contact.action}</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
