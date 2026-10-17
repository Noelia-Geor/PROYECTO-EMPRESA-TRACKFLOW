import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateAll, validators } from './validation.js'

const valid = {
  nombre: 'Ana Pérez',
  email: 'ana@tumarca.com',
  telefono: '+34 600 000 000',
  empresa: 'Tu Marca',
  web: 'tumarca.com',
  pais: 'espana',
  pedidos: '1200',
  inicio: '2027-01',
  servicios: ['almacenamiento', 'devoluciones'],
  mensaje: '',
  consentimiento: true,
}
const today = new Date(2026, 9, 17)

test('una solicitud completa no tiene errores', () => {
  assert.deepEqual(validateAll(valid, today), {})
})

test('los obligatorios vacíos dan un error específico cada uno', () => {
  const errors = validateAll({}, today)
  assert.deepEqual(Object.keys(errors).sort(), ['consentimiento', 'email', 'empresa', 'nombre', 'pais', 'pedidos', 'servicios', 'web'])
  assert.equal(errors.email, 'Escribe tu email de contacto.')
  assert.equal(errors.servicios, 'Elige al menos un servicio.')
})

test('nombre', () => {
  assert.equal(validators.nombre('A'), 'El nombre debe tener al menos 2 caracteres.')
  assert.equal(validators.nombre('Ana 2'), 'El nombre no puede contener números.')
  assert.equal(validators.nombre('  María José  '), '')
})

test('email', () => {
  assert.equal(validators.email('ana.tumarca.com'), 'Al email le falta la @.')
  assert.match(validators.email('ana@tumarca'), /email completo/)
  assert.match(validators.email('ana@marca..com'), /email completo/)
  assert.match(validators.email('ana@.marca.com'), /email completo/)
  assert.equal(validators.email('ana@tu-marca.es'), '')
  assert.equal(validators.email('ana@correo.tu-marca.com'), '')
})

test('teléfono opcional', () => {
  assert.equal(validators.telefono(''), '')
  assert.match(validators.telefono('600abc'), /solo puede llevar/)
  assert.match(validators.telefono('123'), /entre 6 y 15 cifras/)
  assert.equal(validators.telefono('(+1) 213-555-0100'), '')
})

test('web con o sin https', () => {
  assert.equal(validators.web('https://tumarca.com/tienda'), '')
  assert.equal(validators.web('tumarca.es'), '')
  assert.match(validators.web('tumarca'), /dirección web completa/)
  assert.match(validators.web('tu marca.com'), /espacios/)
})

test('país solo acepta las opciones del formulario', () => {
  assert.equal(validators.pais('ambos'), '')
  assert.match(validators.pais('francia'), /opciones de país/)
})

test('pedidos al mes', () => {
  assert.match(validators.pedidos('NaN'), /solo con cifras/)
  assert.match(validators.pedidos('12.5'), /sin decimales/)
  assert.match(validators.pedidos('0'), /al menos 1/)
  assert.match(validators.pedidos('2000000'), /máximo/)
  assert.equal(validators.pedidos('350'), '')
})

test('mes de inicio opcional y no pasado', () => {
  assert.equal(validators.inicio('', today), '')
  assert.equal(validators.inicio('2026-10', today), '')
  assert.match(validators.inicio('2026-09', today), /pasado/)
  assert.match(validators.inicio('octubre', today), /formato/)
})

test('servicios, mensaje y consentimiento', () => {
  assert.match(validators.servicios(['otro']), /de la lista/)
  assert.match(validators.mensaje('x'.repeat(1001)), /1000 caracteres/)
  assert.equal(validators.mensaje('x'.repeat(1000)), '')
  assert.match(validators.consentimiento(false), /Marca la casilla/)
})
