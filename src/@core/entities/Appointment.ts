import { Patient } from './Patient'

export interface AppointmentProps {
    startsDate: Date,
    endsDate: Date,
    patient: Patient
}

export class Appointment {
  constructor (private readonly props: AppointmentProps) {
    if (props.startsDate <= new Date()) {
      throw new Error('startsDate cannot before date now')
    }

    if (props.endsDate <= props.startsDate) {
      throw new Error("endsDate can't bigger that startsDate")
    }
  }

  get patient () {
    return this.props.patient
  }

  get startsDate () {
    return this.props.startsDate
  }

  get endsDate () {
    return this.props.endsDate
  }
}
