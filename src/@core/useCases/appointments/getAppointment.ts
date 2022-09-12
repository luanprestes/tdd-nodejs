import { Appointment } from '../../entities/Appointment'
import { AppointmentRepository } from '../../repositories/appointment'

export class GetAppointment {
  constructor (private readonly appointmentRepository: AppointmentRepository) {}

  async execute (idAppointment: number): Promise<Appointment> {
    return await this.appointmentRepository.getbyId(idAppointment)
  }
}
