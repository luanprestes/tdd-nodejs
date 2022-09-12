import { describe, expect, it } from 'vitest'
import { AppointmentRepositoryInMemory } from '../../../tests/repositories/appointmentRepositoryInMemory'
import { getFutureDate } from '../../../tests/utils/get-future-date'
import { Appointment } from '../../entities/Appointment'
import { Patient } from '../../entities/Patient'
import { CreateAppointment } from './createAppointment'
import { GetAppointment } from './getAppointment'

describe('UseCase Appointments', () => {
  it('should an new instance of create appointment', () => {
    const sut = new CreateAppointment(new AppointmentRepositoryInMemory())

    expect(sut).toBeInstanceOf(CreateAppointment)
    expect(sut).toHaveProperty('execute')
  })

  it('should execute and return an new appointment', async () => {
    const sut = new CreateAppointment(new AppointmentRepositoryInMemory())

    const startsDate = getFutureDate('2022-01-01')
    const endsDate = getFutureDate('2022-01-02')

    const appointment = await sut.execute({
      startsDate,
      endsDate,
      patient: new Patient({
        name: 'fulano',
        email: 'fulano@email.com'
      })
    })

    expect(appointment).toBeInstanceOf(Appointment)
  })

  it('should an new instance of get appointment', () => {
    const sut = new GetAppointment(new AppointmentRepositoryInMemory())

    expect(sut).toBeInstanceOf(GetAppointment)
    expect(sut).toHaveProperty('execute')
  })

  it('should be to get an appointment saved', async () => {
    const repositoryInMemory = new AppointmentRepositoryInMemory()
    const createAppointment = new CreateAppointment(repositoryInMemory)
    await createAppointment.execute({
      startsDate: getFutureDate('2022-01-01'),
      endsDate: getFutureDate('2022-01-20'),
      patient: new Patient({
        name: 'fulano',
        email: 'fulano@email.com'
      })
    })

    const getAppointment = new GetAppointment(repositoryInMemory)
    const appointment = await getAppointment.execute(0)

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.patient.name).toEqual('fulano')
  })

  it('not should to save appointment in date occupied', async () => {
    const startsDate = getFutureDate('2022-01-05')
    const endsDate = getFutureDate('2022-01-20')

    const repositoryInMemory = new AppointmentRepositoryInMemory()
    const createAppointment = new CreateAppointment(repositoryInMemory)
    const patient = new Patient({
      name: 'fulano',
      email: 'fulano@email.com'
    })

    await createAppointment.execute({
      startsDate,
      endsDate,
      patient
    })

    expect(createAppointment.execute({
      startsDate: getFutureDate('2022-01-01'),
      endsDate: getFutureDate('2022-01-06'),
      patient
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      startsDate: getFutureDate('2022-01-05'),
      endsDate: getFutureDate('2022-01-21'),
      patient
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointment.execute({
      startsDate: getFutureDate('2022-01-02'),
      endsDate: getFutureDate('2022-01-19'),
      patient
    })).rejects.toBeInstanceOf(Error)
  })
})
