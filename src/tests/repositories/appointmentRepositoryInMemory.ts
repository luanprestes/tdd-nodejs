import { areIntervalsOverlapping } from 'date-fns'
import { Appointment } from '../../@core/entities/Appointment'
import { AppointmentRepository } from '../../@core/repositories/appointment'

export class AppointmentRepositoryInMemory implements AppointmentRepository {
  public items: Appointment[] = []

  async create (appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async getbyId (id: number): Promise<Appointment> {
    return this.items[id]
  }

  async findOverlapppingAppointment (startsDate: Date, endsDate: Date): Promise<Appointment | null> {
    const overlappping = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsDate, end: endsDate },
        { start: appointment.startsDate, end: appointment.endsDate },
        { inclusive: true }
      )
    })

    if (!overlappping) {
      return null
    }

    return overlappping
  }
}
