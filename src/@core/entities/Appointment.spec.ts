import { expect, test } from 'vitest'
import { getFutureDate } from '../../tests/utils/get-future-date'
import { Appointment } from './Appointment'
import { Patient } from './Patient'

test('To create an appointment', () => {
  const startsDate = getFutureDate('2022-01-01')
  const endsDate = getFutureDate('2022-02-01')

  const appointment = new Appointment({
    startsDate,
    endsDate,
    patient: new Patient({
      name: 'fulano',
      email: 'fulano@fulano.com'
    })
  })

  expect(appointment).toBeInstanceOf(Appointment)

  expect(appointment).toHaveProperty('patient')
  expect(appointment).toHaveProperty('startsDate')
  expect(appointment).toHaveProperty('endsDate')

  expect(appointment.startsDate).toBeInstanceOf(Date)
  expect(appointment.endsDate).toBeInstanceOf(Date)

  expect(appointment.patient).toBeInstanceOf(Patient)
})

test("endsDate can't bigger or egual that startsDate", () => {
  const startsDate = getFutureDate('2022-02-01')
  const endsDate = getFutureDate('2022-01-01')

  expect(() => new Appointment({
    startsDate,
    endsDate,
    patient: new Patient({
      name: 'fulano',
      email: 'fulano@fulano.com'
    })
  })).toThrowError()
})

test('startsDate cannot before date now', () => {
  expect(() => new Appointment({
    startsDate: new Date(new Date().getTime() - 1),
    endsDate: new Date(new Date().getTime() + 1),
    patient: new Patient({
      name: 'fulano',
      email: 'fulano@fulano.com'
    })
  })).toThrowError()
})
