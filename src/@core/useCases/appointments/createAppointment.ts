import { Appointment, AppointmentProps } from '../../entities/Appointment'
import { AppointmentRepository } from '../../repositories/appointment'

type newAppointmentDto = AppointmentProps

export class CreateAppointment {
  constructor (private readonly appointmentRepository: AppointmentRepository) {}

  async execute ({ startsDate, endsDate, patient } : newAppointmentDto): Promise<Appointment> {
    const checkOverLapping = await this.appointmentRepository.findOverlapppingAppointment(startsDate, endsDate)

    if (checkOverLapping) {
      throw new Error('Already exists appointment with dates')
    }

    const appointment = new Appointment({ startsDate, endsDate, patient })
    await this.appointmentRepository.create(appointment)

    return appointment
  }
}
