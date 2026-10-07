type ProcessStep = {
  title: string
  description: string
}

type ProcessStepsProps = {
  steps: readonly ProcessStep[]
}

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="relative grid gap-7 md:grid-cols-4 md:gap-5 md:before:absolute md:before:left-[8%] md:before:right-[8%] md:before:top-5 md:before:border-t-2 md:before:border-dashed md:before:border-marino/25">
      {steps.map((step, index) => (
        <li key={step.title} className="relative border-l-2 border-dashed border-marino/25 pl-5 md:border-l-0 md:pl-0">
          <span className="relative z-10 mb-5 inline-flex h-10 min-w-10 items-center justify-center rounded-full border-2 border-senal bg-papel px-2 font-mono text-sm font-medium text-tinta">
            0{index + 1}
          </span>
          {index < steps.length - 1 && (
            <span
              className="absolute left-10 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-carton md:block"
              aria-hidden="true"
            />
          )}
          <h3 className="font-display text-xl font-bold text-marino">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-tinta/75">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
