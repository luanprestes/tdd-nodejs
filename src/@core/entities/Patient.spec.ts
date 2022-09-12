import { expect, test } from 'vitest'
import { Patient } from './Patient'

test('To create an Patient', () => {
  const patient = new Patient({
    name: 'Fulano',
    email: 'fulano@fulano.com'
  })

  expect(patient).toBeInstanceOf(Patient)

  expect(patient).toHaveProperty('name')
  expect(patient).toHaveProperty('email')
})
