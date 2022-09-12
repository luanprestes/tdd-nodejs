import { Appointment } from '../entities/Appointment'

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<void>
    getbyId(id: number): Promise<Appointment>
    findOverlapppingAppointment(startsDate: Date, endsDate: Date): Promise<Appointment | null>
}
