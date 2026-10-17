// Validación del formulario de solicitud (application.html), sin dependencias.
// - Valida en tiempo real: al salir de un campo y, desde entonces, a cada pulsación.
// - Cada regla devuelve un mensaje específico o '' si el valor es válido.
// - Si hay errores, impide el envío y lleva el foco a un resumen con enlaces a cada campo.
// - No hay backend todavía: el envío es simulado y no se transmite ni se guarda ningún dato.

const EMAIL_PATTERN = /^[^\s@]+@([^\s@.]+\.)+[^\s@.]{2,}$/
const PHONE_PATTERN = /^[0-9\s().+-]+$/
const COUNTRIES = ['estados-unidos', 'espana', 'ambos']
const SERVICES = ['almacenamiento', 'ultima-milla', 'devoluciones', 'atencion']
const MESSAGE_MAX = 1000

function currentMonth(today) {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
}

export const validators = {
  nombre(value) {
    const text = value.trim()
    if (!text) return 'Escribe tu nombre y apellidos.'
    if (text.length < 2) return 'El nombre debe tener al menos 2 caracteres.'
    if (text.length > 80) return 'El nombre no puede superar los 80 caracteres.'
    if (/\d/.test(text)) return 'El nombre no puede contener números.'
    return ''
  },
  email(value) {
    const text = value.trim()
    if (!text) return 'Escribe tu email de contacto.'
    if (!text.includes('@')) return 'Al email le falta la @.'
    if (!EMAIL_PATTERN.test(text)) return 'Escribe un email completo, por ejemplo nombre@tumarca.com.'
    return ''
  },
  telefono(value) {
    const text = value.trim()
    if (!text) return ''
    if (!PHONE_PATTERN.test(text) || (text.match(/\+/g) ?? []).length > 1) return 'El teléfono solo puede llevar números, espacios, guiones y el prefijo +.'
    const digits = text.replace(/\D/g, '').length
    if (digits < 6 || digits > 15) return 'El teléfono debe tener entre 6 y 15 cifras.'
    return ''
  },
  empresa(value) {
    const text = value.trim()
    if (!text) return 'Escribe el nombre de tu marca o empresa.'
    if (text.length < 2) return 'El nombre de la marca debe tener al menos 2 caracteres.'
    if (text.length > 100) return 'El nombre de la marca no puede superar los 100 caracteres.'
    return ''
  },
  web(value) {
    const text = value.trim()
    if (!text) return 'Escribe la web de tu tienda.'
    if (/\s/.test(text)) return 'La dirección web no puede contener espacios.'
    try {
      const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`)
      if (!/^[^.]+(\.[^.]+)+$/.test(url.hostname) || url.hostname.split('.').pop().length < 2) {
        return 'Escribe una dirección web completa, por ejemplo tumarca.com.'
      }
    } catch {
      return 'Escribe una dirección web completa, por ejemplo tumarca.com.'
    }
    return ''
  },
  pais(value) {
    if (!value) return 'Elige en qué país necesitas la operación.'
    if (!COUNTRIES.includes(value)) return 'Elige una de las opciones de país.'
    return ''
  },
  pedidos(value) {
    const text = String(value).trim()
    if (!text) return 'Indica cuántos pedidos envías al mes, aproximadamente.'
    const amount = Number(text)
    if (!Number.isFinite(amount)) return 'Escribe el número de pedidos solo con cifras.'
    if (!Number.isInteger(amount)) return 'Escribe un número entero de pedidos, sin decimales.'
    if (amount < 1) return 'El número de pedidos al mes debe ser al menos 1.'
    if (amount > 1000000) return 'Revisa la cifra: el máximo admitido es 1.000.000 pedidos al mes.'
    return ''
  },
  inicio(value, today = new Date()) {
    const text = value.trim()
    if (!text) return ''
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(text)) return 'Escribe el mes con el formato año-mes, por ejemplo 2027-03.'
    if (text < currentMonth(today)) return 'El mes de inicio no puede estar en el pasado.'
    return ''
  },
  servicios(values) {
    if (!values.length) return 'Elige al menos un servicio.'
    if (values.some((service) => !SERVICES.includes(service))) return 'Elige servicios de la lista.'
    return ''
  },
  mensaje(value) {
    if (value.length > MESSAGE_MAX) return `El mensaje no puede superar los ${MESSAGE_MAX} caracteres.`
    return ''
  },
  consentimiento(checked) {
    if (!checked) return 'Marca la casilla para aceptar que usemos tus datos para responder a la solicitud.'
    return ''
  },
}

// Valida un objeto de valores y devuelve solo los campos con error: { campo: mensaje }.
export function validateAll(values, today = new Date()) {
  const errors = {}
  for (const [name, validate] of Object.entries(validators)) {
    const message = name === 'inicio' ? validate(values[name] ?? '', today) : validate(values[name] ?? defaultValue(name))
    if (message) errors[name] = message
  }
  return errors
}

function defaultValue(name) {
  if (name === 'servicios') return []
  if (name === 'consentimiento') return false
  return ''
}

// ---------- Conexión con el formulario ----------

function readValue(form, name) {
  if (name === 'servicios') {
    return Array.from(form.querySelectorAll('input[name="servicios"]:checked'), (input) => input.value)
  }
  if (name === 'consentimiento') return form.elements.namedItem('consentimiento').checked
  const field = form.elements.namedItem(name)
  if (!field) return ''
  // Un campo numérico con texto no numérico llega vacío; badInput permite dar el error correcto.
  if (field.validity?.badInput) return 'NaN'
  return field.value
}

function readValues(form) {
  return Object.fromEntries(Object.keys(validators).map((name) => [name, readValue(form, name)]))
}

// Primer control de cada campo: destino del foco y de los enlaces del resumen.
function firstControl(form, name) {
  return form.querySelector(`[name="${name}"]`)
}

export function initForm(form) {
  const summary = document.getElementById('form-errors')
  const summaryTitle = document.getElementById('form-errors-title')
  const summaryList = summary.querySelector('[data-error-list]')
  const success = document.getElementById('form-success')
  const successTitle = success.querySelector('[data-success-title]')
  const successText = success.querySelector('[data-success-text]')
  const submit = form.querySelector('[data-submit]')
  const submitLabel = form.querySelector('[data-submit-label]')
  const counter = form.querySelector('[data-count-for="mensaje"]')
  const touched = new Set()
  let pending = 0

  const stopSending = () => {
    clearTimeout(pending)
    pending = 0
    submit.disabled = false
    form.removeAttribute('aria-busy')
    submitLabel.textContent = 'Enviar solicitud'
  }

  const showError = (name, message) => {
    const error = document.getElementById(`${name}-error`)
    if (error) {
      error.textContent = message
      error.hidden = !message
    }
    for (const control of form.querySelectorAll(`[name="${name}"]`)) {
      control.setAttribute('aria-invalid', message ? 'true' : 'false')
    }
    const group = form.querySelector(`[data-group="${name}"]`)
    if (group) group.toggleAttribute('data-invalid', Boolean(message))
  }

  const check = (name) => {
    if (!(name in validators)) return ''
    const message = validators[name](readValue(form, name))
    showError(name, message)
    return message
  }

  const updateCounter = () => {
    const length = form.elements.namedItem('mensaje').value.length
    counter.textContent = `${length} / ${MESSAGE_MAX} caracteres`
  }

  const renderSummary = (errors) => {
    const entries = Object.entries(errors)
    summaryList.replaceChildren(
      ...entries.map(([name, message]) => {
        const item = document.createElement('li')
        const link = document.createElement('a')
        const control = firstControl(form, name)
        link.href = `#${control.id}`
        link.textContent = message
        link.className = 'underline underline-offset-4 hover:text-crema'
        link.addEventListener('click', (event) => {
          event.preventDefault()
          control.focus()
        })
        item.append(link)
        return item
      }),
    )
    summaryTitle.textContent =
      entries.length === 1 ? 'Revisa 1 campo antes de enviar.' : `Revisa ${entries.length} campos antes de enviar.`
    summary.hidden = false
    summary.focus()
  }

  // Tiempo real: tras salir de un campo, cada cambio vuelve a validarlo.
  form.addEventListener('input', (event) => {
    const { name } = event.target
    if (name === 'mensaje') updateCounter()
    if (touched.has(name)) check(name)
  })
  form.addEventListener('change', (event) => {
    const { name, type } = event.target
    if (type === 'radio' || type === 'checkbox' || type === 'month') {
      touched.add(name)
      check(name)
    }
  })
  form.addEventListener('focusout', (event) => {
    const { name, type } = event.target
    // En grupos de opciones se valida con «change», para no marcar error al moverse entre ellas.
    if (!name || type === 'radio' || type === 'checkbox') return
    touched.add(name)
    check(name)
  })

  form.addEventListener('reset', () => {
    stopSending()
    touched.clear()
    summary.hidden = true
    success.hidden = true
    for (const name of Object.keys(validators)) showError(name, '')
    // El navegador restablece los valores después del evento «reset».
    setTimeout(updateCounter)
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    success.hidden = true
    const values = readValues(form)
    const errors = validateAll(values)
    for (const name of Object.keys(validators)) {
      touched.add(name)
      showError(name, errors[name] ?? '')
    }
    if (Object.keys(errors).length) {
      renderSummary(errors)
      return
    }
    summary.hidden = true

    // Campo trampa relleno: probablemente un bot. Se ignora sin dar pistas.
    if (form.elements.namedItem('empresa_web_2').value) return

    // Envío simulado: solo se muestra el estado de envío y el mensaje de éxito.
    submit.disabled = true
    form.setAttribute('aria-busy', 'true')
    submitLabel.textContent = 'Enviando…'
    pending = setTimeout(() => {
      const brand = values.empresa.trim()
      form.reset()
      successText.textContent = `Gracias. Hemos comprobado la solicitud de ${brand} y está completa. Como es una demostración, no se ha enviado ni guardado ningún dato.`
      success.hidden = false
      successTitle.focus()
    }, 700)
  })

  updateCounter()
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('solicitud')
  if (form) initForm(form)
}
